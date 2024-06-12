import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../util/Util';
import NotFoundPage from './NotFoundPage';

const UserSetupPage = () => {
    const { id } = useParams();
    const [isNew, setIsNew] = useState(true);
    const [errorNotFound, setErrorNotFound] = useState(false);
    const [data, setData] = useState({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        birthDate: 0,
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/user?id=${id}`);
                    if (response.status === 404) {
                        setErrorNotFound(true);
                        throw new Error('Not found');
                    }
                    const result = await response.json();
                    console.log(result);
                    setData(result);
                    setIsNew(false);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [id]);

    if (errorNotFound) {
        return <NotFoundPage />;
    }

    const handleChange = (e) => {
        let { name, value, valueAsNumber } = e.target;
        if (valueAsNumber) value = valueAsNumber;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/api/user`;
        const method = isNew ? 'POST' : 'PUT';
        const fetchParams = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch(url, fetchParams);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('complete')
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('error')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="text-center">{isNew ? "New User" : "Edit User"}</div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Birth Date:</label>
                <input
                    type="date"
                    name="birthDate"
                    value={formatDate(data.birthDate, 'yyyy-MM-dd')}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={data.phoneNumber}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">{isNew ? 'Create' : 'Update'}</button>
        </form>
    );
};

export default UserSetupPage;
