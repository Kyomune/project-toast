import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

function Toast({
  icon: Icon,
  content,
  alt,
  variant = "notice",
  handleDismiss,
}) {
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        {Icon ? <Icon size={24} /> : null}
      </div>
      <p className={styles.content}>
        <VisuallyHidden>
          {variant} - {content}
        </VisuallyHidden>
        {content}
      </p>
      <button
        aria-label="Dismiss message"
        aria-live="off"
        onClick={handleDismiss}
        className={styles.closeButton}
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
