import React, { useContext, useState } from "react";
import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { addToast } = useContext(ToastContext);
  const [messageCtrl, setMessageCtrl] = useState("");
  const [variantCtrl, setVariantCtrl] = useState(VARIANT_OPTIONS[0]);

  const onMessageChange = (e) => {
    const value = e.target.value;
    setMessageCtrl(value);
  };

  const onVariantChange = (newVariant) => {
    setVariantCtrl(newVariant);
  };

  const onSubmit = () => {
    addToast({ message: messageCtrl, variant: variantCtrl });
    setMessageCtrl("");
    setVariantCtrl(VARIANT_OPTIONS[0]);
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      <ToastShelf />

      <Form
        msgValue={messageCtrl}
        onMsgChange={onMessageChange}
        variantValue={variantCtrl}
        onVariantChange={onVariantChange}
        onSubmit={onSubmit}
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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className={styles.controlsWrapper}
    >
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
          <Button type="submit">Pop Toast!</Button>
        </div>
      </div>
    </form>
  );
};

export default ToastPlayground;
