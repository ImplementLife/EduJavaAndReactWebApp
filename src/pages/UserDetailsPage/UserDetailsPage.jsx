import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiServerUrl } from '@/res/prop.jsx';
import { formatDate } from '@/util/Util.js';
import useAuth from '@/components/hooks/useAuth.jsx';
import { getUserDetails } from '@/util/NetService.js';
import './styles.scss';

export default function () {
    const { id } = useParams();
    const [data, setData] = useState({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        birthDate: 0,
        address: '',
        phoneNumber: '',
        profileImageUrl: ''
    });

    const [setIsNotFound, setIsAccessDenied, getAuthBody] = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            return new Promise((resolve, reject) => {
                getUserDetails(id)
                    .then(response => {
                        if (response.status === 404) {
                            setIsNotFound(true);
                            reject('Not found');
                        }
                        if (response.status === 403) {
                            setIsAccessDenied(true);
                            reject('Access denied');
                        }
                        return response.json();
                    })
                    .then(result => {
                        console.log(result);
                        setData(result);
                        resolve();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        };

        fetchData();
    }, [id]);

    return getAuthBody(
        <div className="user-details-card">
            <h1>User Details</h1>
            <div className="user-details-item">
                <span className="label">ID:</span>
                <span className="value">{data.id}</span>
            </div>
            <div className="user-details-item">
                <span className="label">Email:</span>
                <span className="value">{data.email}</span>
            </div>
            <div className="user-details-item">
                <span className="label">First Name:</span>
                <span className="value">{data.firstName}</span>
            </div>
            <div className="user-details-item">
                <span className="label">Last Name:</span>
                <span className="value">{data.lastName}</span>
            </div>
            <div className="user-details-item">
                <span className="label">Birth Date:</span>
                <span className="value">{formatDate(data.birthDate, 'dd.MM.yyyy')}</span>
            </div>
            <div className="user-details-item">
                <span className="label">Address:</span>
                <span className="value">{data.address}</span>
            </div>
            <div className="user-details-item">
                <span className="label">Phone Number:</span>
                <span className="value">{data.phoneNumber}</span>
            </div>
            <div className="user-details-item">
                <img className='profileImage' src={`${apiServerUrl}/api/res/img/${data.profileImageUrl}`} />
            </div>
            <div className="user-details-item">
                <Link to={`/setup/user/${id}`}>Edit</Link>
            </div>
        </div>
    )
}