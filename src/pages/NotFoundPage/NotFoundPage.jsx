import { Link } from 'react-router-dom';

export default function() {
    return (
        <div className="container h-100 mt-4">
            <p className='fs-2 fw-bold'>404</p>
            <p>This page doesn't exist. Go <Link to="/">home</Link></p>
        </div>
    )
}