import React, { useMemo, useState } from "react";

export const ToastContext = React.createContext({});

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState({});

  const addToast = ({ message, variant }) => {
    const id = crypto.randomUUID();

    const newToast = {
      message,
      variant,
    };

    setToasts({ ...toasts, [id]: newToast });
  };

  const removeToast = (id) => {
    const newToasts = { ...toasts };
    delete newToasts[id];
    setToasts(newToasts);
  };

  const props = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts]
  );

  return (
    <ToastContext.Provider value={props}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
