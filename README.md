# @vaxadnpm/use-polling

A lightweight React library that provides context-based polling capabilities for APIs. Use this library to start and stop polling API endpoints easily, with options for both global and local polling.

## Installation

Install the package via npm:

```bash
npm install @vaxadnpm/use-polling
```

## Usage

You can use `usePolling` locally within a component for component-specific polling needs, or wrap your app in `GlobalPollingProvider` for shared, persistent polling functionality.

### 1. **Using `usePolling` in a Single Component**

This is useful for component-specific polling without needing a global context.

```tsx
import React, { useEffect } from 'react';
import usePolling from '@vaxadnpm/use-polling';

const MyComponent = () => {
  const { poll, stopPolling } = usePolling();

  useEffect(() => {
    poll({
      url: 'https://api.example.com/data',
      pollingKey: 'myComponentPollingKey',
      callback: (data) => {
        console.log('Received data:', data);
      },
      delay: 5000, // Poll every 5 seconds
    });

    // Clean up polling when component unmounts
    return () => stopPolling('myComponentPollingKey');
  }, [poll, stopPolling]);

  return <div>Polling data; check console for results.</div>;
};

export default MyComponent;
```

### 2. **Using Global Polling with `GlobalPollingProvider`**

For application-wide polling needs, wrap your app with `GlobalPollingProvider`. Use the `persist` option to keep polling active until manually stopped.

In your root layout file (e.g., `pages/_app.tsx` in Next.js):

```tsx
import React from 'react';
import { GlobalPollingProvider } from '@vaxadnpm/use-polling';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalPollingProvider>
      <Component {...pageProps} />
    </GlobalPollingProvider>
  );
}

export default MyApp;
```

Within any component:

```tsx
import React, { useEffect } from 'react';
import { useGlobalPolling } from '@vaxadnpm/use-polling';

const MyComponent = () => {
  const { poll, stopPolling } = useGlobalPolling();

  useEffect(() => {
    poll({
      url: 'https://api.example.com/data',
      pollingKey: 'globalPollingKey',
      callback: (data) => {
        console.log('Received data:', data);
      },
      delay: 5000,
      persist: true, // Keeps polling until manually stopped
    });

    // Optionally stop polling later
    return () => stopPolling('globalPollingKey');
  }, [poll, stopPolling]);

  return <div>Polling data; check console for results.</div>;
};

export default MyComponent;
```

## API

### `poll`

Starts polling a specified endpoint at a defined interval.

#### Parameters

- **`url`** *(string)*: API endpoint to poll.
- **`pollingKey`** *(string)*: Unique identifier for each polling instance.
- **`callback`** *(function)*: Function to handle data from each successful poll.
- **`delay`** *(number, optional)*: Interval in milliseconds between each poll (default: `2000`).
- **`persist`** *(boolean, optional)*: Determines whether polling continues until manually stopped (only applies in global polling contexts, default: `true`).
- **`reqOptions`** *(object, optional)*: Custom options for the fetch request.

### `stopPolling`

Stops an active polling request based on the `pollingKey`.

#### Parameters

- **`pollingKey`** *(string)*: Key for the polling instance to stop.

## License

This project is licensed under the MIT License.