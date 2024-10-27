import React, { ReactNode } from 'react';
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
export declare const usePolling: (global?: boolean) => {
    poll: <T>({ url, pollingKey, callback, delay, persist, reqOptions }: PollingOptions<T>) => (() => void) | undefined;
    stopPolling: (pollingKey: string) => void;
};
export declare const GlobalPollingProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element;
export declare const useGlobalPolling: () => PollingContextType;
export default usePolling;
