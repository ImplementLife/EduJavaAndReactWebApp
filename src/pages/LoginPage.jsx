import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { login } from '../util/NetService';

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

    return (
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

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className='mt-4 mb-4'
                >Contained</Button>
            </div>
        </div>
    );
};
