import classNames from 'classnames';
import {ReactComponent as CloseIcon } from '../../assets/images/xmark.svg'
import React from 'react'
import styles from './Notification.module.css';

export const Notification = ({type, dismissible, onRequestClose, children}) => {
  return (
    <div
        className={classNames(styles.alert, {
            [styles.info]: type === 'info',
            [styles.success]: type === 'success',
            [styles.error]: type === 'error',
            [styles.warning]: type === 'warning',
            [styles.isDismissible]: !!dismissible
        })}
    >
        {
            dismissible && <span className={styles.closeIconWrapper} onClick={() => onRequestClose()}>
                <CloseIcon height={"100%"} width="100%"/>
            </span>
        }
        {
            children
        }
    </div>
  )
};
