import { Link } from 'react-router-dom';

export default function() {
    return (
        <div className="container h-100 mt-4">
            <p className='fs-2 fw-bold'>403</p>
            <p>Access denied. Go to <Link to="/">home</Link></p>
        </div>
    )
}