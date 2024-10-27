# @vaxadnpm/use-polling

A lightweight React hook to handle polling functionality within your components. This hook allows you to start and stop polling, with an option to persist polling even after component unmount.

## Installation

Install the package via npm:

```bash
npm install @vaxadnpm/use-polling
```

or with yarn:

```bash
yarn add @vaxadnpm/use-polling
```

## Usage

Wrap your app in the `PollingProvider` to provide polling context across components. Then, use the `usePolling` hook to initiate polling functionality within your component.

### Basic Example

```tsx
import React from 'react';
import { PollingProvider, usePolling } from '@vaxadnpm/use-polling';

const ExampleComponent = () => {
  const { poll, stopPolling } = usePolling({
    callback: () => {
      console.log('Polling data...');
    },
    interval: 5000,
    persist: false,  // Set to true if you want polling to continue after unmount
  });

  return (
    <div>
      <button onClick={poll}>Start Polling</button>
      <button onClick={stopPolling}>Stop Polling</button>
    </div>
  );
};

const App = () => (
  <PollingProvider>
    <ExampleComponent />
  </PollingProvider>
);

export default App;
```

### Options

The `usePolling` hook takes an options object with the following properties:

- **callback** (required): A function to be called at each interval.
- **interval** (required): Interval time in milliseconds between each callback execution.
- **persist** (optional): When `true`, polling will continue even if the component unmounts. Defaults to `false`.

### API

- `poll()`: Starts polling based on the specified interval and callback function.
- `stopPolling()`: Stops the polling.

## Parameters

- `PollingProvider`: A context provider component that should wrap the parts of your app that use the polling functionality.
- `usePolling`: A custom React hook that provides the `poll` and `stopPolling` functions for managing polling.

## License

This project is licensed under the MIT License.