import React, { useState } from 'react';

export default function() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const getBody = (loaderBody, originBody) => {
        if (isContentLoaded) {
            return originBody;
        }
        return loaderBody;
    }
    return [setIsContentLoaded, getBody];
}