import React, { useState } from "react";

import Button from "../Button";
import Toast from "../Toast";

import styles from "./ToastPlayground.module.css";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "react-feather";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function ToastPlayground() {
  const [messageCtrl, setMessageCtrl] = useState("");
  const [variantCtrl, setVariantCtrl] = useState(VARIANT_OPTIONS[0]);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const onMessageChange = (e) => {
    const value = e.target.value;
    setMessageCtrl(value);
  };

  const onVariantChange = (newVariant) => {
    setVariantCtrl(newVariant);
  };

  const showToast = () => {
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      {isToastVisible && (
        <Toast
          content={messageCtrl}
          variant={variantCtrl}
          icon={ICONS_BY_VARIANT[variantCtrl]}
          handleDismiss={hideToast}
        />
      )}

      <Form
        msgValue={messageCtrl}
        onMsgChange={onMessageChange}
        variantValue={variantCtrl}
        onVariantChange={onVariantChange}
        onSubmit={showToast}
      />
    </div>
  );
}

const Header = () => {
  return (
    <header>
      <img alt="Cute toast mascot" src="/toast.png" />
      <h1>Toast Playground</h1>
    </header>
  );
};

const Form = ({
  msgValue,
  onMsgChange,
  onVariantChange,
  variantValue,
  onSubmit,
}) => {
  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.row}>
        <label
          htmlFor="message"
          className={styles.label}
          style={{ alignSelf: "baseline" }}
        >
          Message
        </label>
        <div className={styles.inputWrapper}>
          <textarea
            id="message"
            className={styles.messageInput}
            value={msgValue}
            onChange={onMsgChange}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Variant</div>
        <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
          {VARIANT_OPTIONS.map((variant) => (
            <label htmlFor={`variant-${variant}`}>
              <input
                id={`variant-${variant}`}
                type="radio"
                name="variant"
                value={variant}
                checked={variantValue === variant}
                onChange={() => onVariantChange(variant)}
              />
              {variant}
            </label>
          ))}

          {/* TODO Other Variant radio buttons here */}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label} />
        <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
          <Button onClick={onSubmit}>Pop Toast!</Button>
        </div>
      </div>
    </div>
  );
};

export default ToastPlayground;
