"use client";
import React, { createContext, useRef, useCallback, useContext, useEffect, ReactNode } from 'react';

interface PollingOptions<T> {
  url: string;
  pollingKey: string;
  callback: (data: T | null) => void;
  delay?: number;
  persist?: boolean;
  reqOptions?: RequestInit;
}

interface PollingContextType {
  poll: <T>(options: PollingOptions<T>) => void;
  stopPolling: (pollingKey: string) => void;
}

const PollingContext = createContext<PollingContextType | undefined>(undefined);

export const usePolling = (global = false) => {
  const pollingRequestsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const stopPolling = useCallback((pollingKey: string) => {
    const intervalId = pollingRequestsRef.current.get(pollingKey);
    if (intervalId) {
      clearInterval(intervalId);
      pollingRequestsRef.current.delete(pollingKey);
    }
  }, []);

  const poll = useCallback(
    <T,>({ url, pollingKey, callback, delay = 2000, persist = global, reqOptions }: PollingOptions<T>) => {
      if (pollingRequestsRef.current.has(pollingKey)) {
        return;
      }

      const fetchData = async () => {
        try {
          const resp = await fetch(url, reqOptions);
          const data = await resp.json();
          callback(data);
        } catch (error: any) {
          console.error(`Polling error for ${pollingKey}: ${error}`);
          if (error?.statusCode === 404) {
            stopPolling(pollingKey);
          }
        }
      };

      fetchData();
      const intervalId = setInterval(fetchData, delay);
      pollingRequestsRef.current.set(pollingKey, intervalId);

      if (!persist) {
        return () => {
          clearInterval(intervalId);
          pollingRequestsRef.current.delete(pollingKey);
        };
      }
    },
    [stopPolling]
  );

  useEffect(() => {
    return () => {
      pollingRequestsRef.current.forEach((intervalId) => clearInterval(intervalId));
      pollingRequestsRef.current.clear();
    };
  }, []);

  return { poll, stopPolling };

}

export const GlobalPollingProvider = ({ children }: { children: ReactNode }) => {
  const { poll, stopPolling } = usePolling(true);
  return (
    <PollingContext.Provider value={{ poll, stopPolling }}>
      {children}
    </PollingContext.Provider>
  );
};

export const useGlobalPolling = (): PollingContextType => {
  const context = useContext(PollingContext);
  if (!context) {
    throw new Error('usePolling must be used within a PollingProvider');
  }
  return context;
};

export default usePolling;
