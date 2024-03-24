import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "react-feather";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function ToastShelf({ toasts = {}, onRemove }) {
  return (
    <ol className={styles.wrapper}>
      <li className={styles.toastWrapper}>
        {Object.entries(toasts).map(([id, toast]) => (
          <Toast
            key={id}
            content={toast.message}
            variant={toast.variant}
            icon={ICONS_BY_VARIANT[toast.variant]}
            handleDismiss={() => onRemove(id)}
          />
        ))}
      </li>
    </ol>
  );
}

export default ToastShelf;
