import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { locateKeys as lk } from '@/res/locate_keys';
import useClickOutside from '@/components/hooks/useClickOutside';
import './styles.scss';

export default function ChooseLocate() {
    const { t, i18n } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [containerRef] = useClickOutside(() => setIsExpanded(false));

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsExpanded(false);
    };

    return (
        <div className="choose-locate" ref={containerRef}>
            <button className="toggle-locate" onClick={() => setIsExpanded(!isExpanded)}>{t(lk.header.key_language)}</button>
            {isExpanded && (
                <div className="locate-options">
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('uk')}>Українська</button>
                </div>
            )}
        </div>
    );
}