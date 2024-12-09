import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkAuth } from '@/util/NetService';

export default function () {
    const [hasAuth, setHasAuth] = useState(false);

    useEffect(() => {
        checkAuth()
            .then(response => {
                setHasAuth(response);
            });
    }, []);

    return (
        <div className="container h-100 mt-4">
            {!hasAuth ? (
                <p>Please login. Go to <Link to="/login">login</Link></p>
            ) : (
                <>
                    <p className='fs-2 fw-bold'>403</p>
                    <p>Access denied. Go to <Link to="/">home</Link></p>
                </>
            )}
        </div>
    );
}