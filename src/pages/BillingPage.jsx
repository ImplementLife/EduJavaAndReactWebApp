import { TextField } from '@mui/material';
import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function () {
    const [value, setValue] = useState('1');

    return (
        <div className="App">
            <center>
                <div>
                    <TextField
                        label="Value of Qr-code"
                        variant="standard"
                        className='mt-4'
                        onChange={(e) => setValue(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                <div>
                    {value && (
                        <QRCode
                            title="GeeksForGeeks"
                            value={value}
                            // bgColor='#FFA600'
                            fgColor='#684080'
                            className='mt-4'
                        />
                    )}
                </div>
            </center>
        </div>
    );
}