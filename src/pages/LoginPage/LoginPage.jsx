import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { login, logout } from '@/util/NetService';
import Head from '@/components/common/Head';

export default function () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            id: username,
            password: password,
        }
        login(loginData);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <>
            <Head
                pageName='Login'
                dscr='This is a login page'
            />
            <div className="d-flex justify-content-center align-items-center">
                <div className='container rounded text-center mt-4 mb-4' style={{ backgroundColor: 'rgb(235, 235, 200)' }}>
                    <div>
                        <TextField
                            label="Username"
                            variant="standard"
                            className='mt-4'
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            variant="standard"
                            type="password"
                            className='mt-4'
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>

                    <div>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            className='mt-4 mb-2'
                        >Continue</Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={handleLogout}
                            className='mt-2 mb-4'
                        >Logout</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
