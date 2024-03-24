import React, { useCallback, useContext, useState } from "react";
import Button from "../Button";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";
import { ToastActionsContext } from "../ToastProvider/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  return (
    <div className={styles.wrapper}>
      <PureHeader />

      <ToastShelf />

      <PureForm />
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

const Form = () => {
  const { addToast } = useContext(ToastActionsContext);
  const [messageCtrl, setMessageCtrl] = useState("");
  const [variantCtrl, setVariantCtrl] = useState(VARIANT_OPTIONS[0]);

  const onMessageChange = useCallback((e) => {
    const value = e.target.value;
    setMessageCtrl(value);
  }, []);

  const onVariantChange = useCallback((newVariant) => {
    setVariantCtrl(newVariant);
  }, []);

  const onSubmit = useCallback(
    (message, variant) => {
      if (!message) return;

      addToast({ message, variant });
      setMessageCtrl("");
      setVariantCtrl(VARIANT_OPTIONS[0]);
    },
    [addToast]
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(messageCtrl, variantCtrl);
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
            value={messageCtrl}
            onChange={onMessageChange}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Variant</div>
        <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
          {VARIANT_OPTIONS.map((variant) => (
            <label key={variant} htmlFor={`variant-${variant}`}>
              <input
                id={`variant-${variant}`}
                type="radio"
                name="variant"
                value={variant}
                checked={variantCtrl === variant}
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

const PureHeader = React.memo(Header);

const PureForm = React.memo(Form);

export default ToastPlayground;
