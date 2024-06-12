import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container h-100 mt-4">
            <p className='fs-2 fw-bold'>This is HomePage.</p>
            <p>Go to <Link to="/users">Users</Link></p>
        </div>
    )
}

export default HomePage;