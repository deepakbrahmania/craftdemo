import React from 'react';
import classNames from 'classnames';
import styles from './NavigationLink.module.css';
import { NAV_LINKS } from '../../constants';
import { NavLink } from 'react-router-dom';

const renderLinks = (linkObj) => <NavLink
        to={linkObj.link}
        className={({isActive}) => classNames(styles.link, {[styles.active]: isActive })}
    >
        {
            linkObj.name
        }
    </NavLink>;

export const NavigationLinks = () => {
    return <div className={classNames(styles.navigationContainer)}>
        <ul>
            {
                NAV_LINKS.map((link, index) => <li className={classNames(styles.linkWrapper)} key={index}>{renderLinks(link)}</li>)
            }
        </ul>
    </div>
}