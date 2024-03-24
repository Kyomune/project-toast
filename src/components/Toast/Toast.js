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

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

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
      <p className={styles.content}>{content}</p>
      <button onClick={handleDismiss} className={styles.closeButton}>
        <X size={24} />
        <VisuallyHidden>{alt}</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
