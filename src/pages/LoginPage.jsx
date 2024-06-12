import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

export default function () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let identification_key = username;
        axios.post('http://localhost:8080/login', { identification_key, password })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className='container rounded text-center mt-4 mb-4' style={{ backgroundColor: 'rgb(235, 235, 200)' }}>
                <div>
                    <TextField
                        label="Username"
                        variant="standard"
                        className='mt-4'
                        value={username}
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
                        value={password}
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
