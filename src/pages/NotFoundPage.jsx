import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container h-100 mt-4">
            <p className='fs-2 fw-bold'>404</p>
            <p>This page doesn't exist. Go <Link to="/">home</Link></p>
        </div>
    )
}
export default NotFoundPage;
