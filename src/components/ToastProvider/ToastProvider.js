import React, { useCallback, useMemo, useState } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext({});
export const ToastActionsContext = React.createContext({});

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState({});

  const addToast = useCallback(({ message, variant }) => {
    const id = crypto.randomUUID();
    const newToast = { message, variant };
    setToasts((currentToasts) => ({ ...currentToasts, [id]: newToast }));
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => {
      const newToasts = { ...currentToasts };
      delete newToasts[id];
      return newToasts;
    });
  }, []);

  const clearAllToasts = useCallback(() => setToasts({}), []);

  const toastActions = useMemo(
    () => ({
      addToast,
      removeToast,
      clearAllToasts,
    }),
    [addToast, removeToast, clearAllToasts]
  );

  const toastValue = useMemo(
    () => ({
      toasts,
    }),
    [toasts]
  );

  useEscapeKey(clearAllToasts);

  return (
    <ToastActionsContext.Provider value={toastActions}>
      <ToastContext.Provider value={toastValue}>
        {children}
      </ToastContext.Provider>
    </ToastActionsContext.Provider>
  );
}

export default ToastProvider;
