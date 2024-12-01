import React, { useEffect, useState } from 'react';
import { logout } from '../util/NetService';
import Head from '../components/common/Head';

export default function() {
    const [isHaveAuth, setIsHaveAuth] = useState(true);

    useEffect(() => {
        logout()
            .then(res => {
                console.log('Complete logout');
                setIsHaveAuth(false);
            })
            .catch(err => {
                console.error('Fail logout');
            })
    }, []);
    return (
        <>
            <Head
                pageName='Logout'
                dscr='This is a logout page'
            />
            {isHaveAuth ? (
                <div>
                    {/* Render this section if user has authentication */}
                    <p>Authenticated content here</p>
                </div>
            ) : (
                <div>
                    {/* Render this section if user does not have authentication */}
                    <p>Please log in to access this content.</p>
                </div>
            )}
        </>
    );
};