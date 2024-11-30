import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { formatDate } from '../util/Util';
import NotFoundPage from './NotFoundPage';
import AccessDeniedPage from './AccessDeniedPage';
import '../css/UserDetailsPage.scss';
import {apiServerUrl} from '../res/prop.jsx';

export default function() {
    const {id} = useParams();
    const [errorNotFound, setErrorNotFound] = useState(false);
    const [accessDenied, setAccessDenied] = useState(false);
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

    useEffect(() => {
        const fetchData = async () => {
            return new Promise((resolve, reject) => {
                fetch(`${apiServerUrl}/api/user?id=${id}`)
                .then(response => {
                    if (response.status === 404) {
                        setErrorNotFound(true);
                        reject('Not found');
                    }
                    if (response.status === 403) {
                        setAccessDenied(true);
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
                    reject(error);
                });
            });
        };
        
        fetchData();
    }, [id]);

    if (errorNotFound) {
        return <NotFoundPage />
    }
    if (accessDenied) {
        return <AccessDeniedPage />
    }

    return (
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
                <span className="value">{ formatDate(data.birthDate, 'dd.MM.yyyy') }</span>
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
                <img className='profileImage' src={`${apiServerUrl}/api/res/img/${data.profileImageUrl}`}/>
            </div>
            <div className="user-details-item">
                <Link to={`/setup/user/${id}`}>Edit</Link>
            </div>
        </div>
    )
}