import React, { useState, useEffect, useRef } from 'react';
import { UPDATE_INTERVAL } from '../../constants';

// This hook will cause any component that uses it to rerender periodically. This is useful to display the real-time
// value of properties of the Room object that don't emit events when they update.
export function useIntervalUpdate() {
  const [, setState] = useState(0);
  const intervalIdRef = useRef<number>();

  useEffect(() => {
    intervalIdRef.current = window.setInterval(() => setState((count) => count + 1), UPDATE_INTERVAL);
    return () => {
      window.clearInterval(intervalIdRef.current);
    };
  }, []);
}

// This higher-order component returns a new component that will rerender periodically.
export function withIntervalUpdate<T extends object>(Component: React.ComponentType<T>) {
  return (props: T) => {
    useIntervalUpdate();
    return <Component {...props} />;
  };
}
