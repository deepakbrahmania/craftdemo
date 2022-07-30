import classNames from "classnames";
import React from "react";
import styles from './Button.module.css';

export const Button = ({ text, onClick, customRender, primary }) => {
  return (
    <button className={classNames({
        [styles.buttonWrapper]: !customRender,
        [styles.buttonPrimary]: primary
    })} onClick={onClick}>{customRender ? customRender() : text}</button>
  );
};
