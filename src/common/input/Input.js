import React, { useEffect, useState } from "react";
import styles from "./Input.module.css";
import classNames from "classnames";


export const Input = ({ type, label, value, onUpdate, isDisabled=false }) => {
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    setInputVal(value);
  }, [value]);

  const onHandleChange = (val) => {
    if (onUpdate) {
      onUpdate(val);
    }
    setInputVal(val);
  };

  return (
    <div
      className={classNames(styles.inputWrapper, {
        [styles.withLabel]: !!label,
      })}
    >
      {label && (
        <label className={classNames(styles.label)} htmlFor="textField">
          {label}:
        </label>
      )}

      <input
        id="textField"
        disabled={isDisabled}
        type={type || "text"}
        className={classNames(styles.input)}
        value={inputVal}
        onChange={(e) => onHandleChange(e.target.value)}
      />
    </div>
  );
};
