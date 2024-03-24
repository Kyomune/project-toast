import React, { useMemo, useState } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext({});

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState({});

  const addToast = ({ message, variant }) => {
    const id = crypto.randomUUID();

    const newToast = {
      message,
      variant,
    };

    setToasts((currentToasts) => ({ ...currentToasts, [id]: newToast }));
  };

  const removeToast = (id) => {
    const newToasts = { ...toasts };
    delete newToasts[id];
    setToasts(newToasts);
  };

  const clearAllToasts = () => setToasts({});

  const props = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      clearAllToasts,
    }),
    [toasts]
  );

  useEscapeKey(clearAllToasts);

  return (
    <ToastContext.Provider value={props}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
