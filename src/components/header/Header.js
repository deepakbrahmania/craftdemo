import classNames from 'classnames';
import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as UserIcon } from '../../assets/images/user.svg'


export const Header = ({ title, user }) => {
    return <div className={classNames(styles.header)}>
        <h2 className={styles.title}>{title}</h2>
        <div className={classNames(styles.userWrapper)}>
            <div>Welcome {user}</div>
            <div className={classNames(styles.icon)}><UserIcon height={24} width={24}/></div>
        </div>
    </div>
}