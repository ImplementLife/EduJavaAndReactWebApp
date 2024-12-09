import React, { useState } from 'react';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

export default function() {
    const [isNotFound, setIsNotFound] = useState(false);
    const getBody = (body) => {
        if (isNotFound) {
            return <NotFoundPage />;
        }
        return body;
    }

    return [isNotFound, setIsNotFound, getBody];
}