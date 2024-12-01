import React, { useState } from 'react';
import AccessDeniedPage from '../../pages/AccessDeniedPage';

export default function() {
    const [isAccessDenied, setIsAccessDenied] = useState(false);
    const getBody = (body) => {
        if (isAccessDenied) {
            return <AccessDeniedPage />;
        }
        return body;
    }

    return [isAccessDenied, setIsAccessDenied, getBody];
}