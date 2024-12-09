import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { locateKeys as lk } from '@/res/locate_keys';
import { siteName } from '@/res/prop';
import useClickOutside from '@/components/hooks/useClickOutside';
import LocateChooser from './children/LocateChooser/LocateChooser';
import './styles.scss';

export default function () {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [navRef] = useClickOutside(() => setIsOpen(false));

    return (
        <nav className="nav" ref={navRef}>
            <div className="logo">{siteName}</div>
            <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>☰</button>
            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                <Link onClick={() => setIsOpen(false)} to="/">{t(lk.header.key_home)}</Link>
                <Link onClick={() => setIsOpen(false)} to="/users">{t(lk.header.key_users)}</Link>
                <Link onClick={() => setIsOpen(false)} to="/login">{t(lk.header.key_login)}</Link>
                <Link onClick={() => setIsOpen(false)} to="/logout">{t(lk.header.key_logout)}</Link>
                <Link onClick={() => setIsOpen(false)} to="/setup/user">{t(lk.header.key_register)}</Link>
                <LocateChooser />
            </div>
        </nav>
    );
};
