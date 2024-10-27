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
export declare const PollingProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element;
declare const usePolling: () => PollingContextType;
export default usePolling;
