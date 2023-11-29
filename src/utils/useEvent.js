import React from "react";

/**
 * Suppress the warning when using useLayoutEffect with SSR. (https://reactjs.org/link/uselayouteffect-ssr)
 * Make use of useInsertionEffect if available.
 */
const useInsertionEffect =
  typeof window !== "undefined"
    ? // useInsertionEffect is available in React 18+
      React.useInsertionEffect || React.useLayoutEffect
    : () => {};

/**
 * Similar to useCallback, with a few subtle differences:
 * - The returned function is a stable reference, and will always be the same between renders
 * - No dependency lists required
 * - Properties or state accessed within the callback will always be "current"
 */
export function useEvent(callback) {
  // Keep track of the latest callback:
  const latestRef = React.useRef(callback);
  useInsertionEffect(() => {
    latestRef.current = callback;
  }, [callback]);

  // Create a stable callback that always calls the latest callback:
  const stableRef = React.useRef();
  if (!stableRef.current) {
    stableRef.current = function () {
      return latestRef.current.apply(this, arguments);
    };
  }

  return stableRef.current;
}

/**
 * Render methods should be pure, especially when concurrency is used,
 * so we will throw this error if the callback is called while rendering.
 */
function useEvent_shouldNotBeInvokedBeforeMount() {
  throw new Error(
    "INVALID_USEEVENT_INVOCATION: the callback from useEvent cannot be invoked before the component has mounted.",
  );
}
