import React, { useEffect, useState }   from 'react';
import { useParams }                    from 'react-router-dom';
import { formatDate }                   from '@/util/Util';
import NotFoundPage                     from '@/pages/NotFoundPage/NotFoundPage';
import Head                             from '@/components/common/Head';
import { apiServerUrl }                 from '@/res/prop';
import                                       './styles.scss';

export default function() {
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
        phoneNumber: '',
        profileImageUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${apiServerUrl}/api/user?id=${id}`);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        // Create a preview URL for the selected image
        const previewUrl = file ? URL.createObjectURL(file) : null;
        setImagePreview(previewUrl);
    };

    const handleImageUpload = async () => {
        if (!imageFile) return;

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch(`${apiServerUrl}/api/res/img`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Image upload failed');
            }
            const t = await response.text();
            // setData(prevData => ({ ...prevData, profileImageUrl: t }));
            data.profileImageUrl = t;

        } catch (error) {
            console.error('Image upload error:', error);
            alert('Error uploading image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (imageFile) {
            await handleImageUpload();
        }

        const url = `${apiServerUrl}/api/user`;
        const method = isNew ? 'POST' : 'PUT';
        const fetchParams = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        console.log(data.profileImageUrl)
        try {
            const response = await fetch(url, fetchParams);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('complete');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('error');
        }
    };

    return (
        <div className="user-form">
            <Head
                pageName={isNew ? 'Registration' : 'Update'}
                dscr={isNew ? 'This is a registration page' : 'This is an update profile page'}
            />
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
                <div>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="profile-image-preview">
                            <img src={imagePreview} alt="Profile Preview" />
                        </div>
                    )}
                    {data.profileImageUrl && !imagePreview && (
                        <div className="profile-image-preview">
                            <img src={data.profileImageUrl} alt="Profile" />
                        </div>
                    )}
                </div>
                <button type="submit">{isNew ? 'Create' : 'Update'}</button>
            </form>
        </div>
    );
};