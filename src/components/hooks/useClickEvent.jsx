import React, { useEffect, useRef } from 'react';

export default function (action) {
    const ref = useRef(null);
    useEffect(() => {
        const handle = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                action();
            }
        }
        document.addEventListener('pointerdown', handle);
        return () => {
            document.removeEventListener('pointerdown', handle)
        }
    }, []);
    return [ref];
}