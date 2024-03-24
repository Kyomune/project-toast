import React, { useContext, useEffect } from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "react-feather";
import { ToastContext } from "../ToastProvider/ToastProvider";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function ToastShelf() {
  const { toasts = {}, removeToast, clearAllToasts } = useContext(ToastContext);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;
      clearAllToasts();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [clearAllToasts]);

  return (
    <ol
      role="region"
      aria-live="polite"
      aria-label="Notification"
      className={styles.wrapper}
    >
      <li className={styles.toastWrapper}>
        {Object.entries(toasts)?.map(([id, toast]) => (
          <Toast
            key={id}
            content={toast.message}
            variant={toast.variant}
            icon={ICONS_BY_VARIANT[toast.variant]}
            handleDismiss={() => removeToast(id)}
          />
        ))}
      </li>
    </ol>
  );
}

export default ToastShelf;
