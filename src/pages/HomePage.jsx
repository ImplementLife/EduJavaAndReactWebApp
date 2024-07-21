import { Link } from 'react-router-dom';
import Head from '../components/page/Head';

const HomePage = () => {
    return (
        <div className="container h-100 mt-4">
            <Head 
                pageName='Home'
                dscr='This is a home page'
            />
            <p className='fs-2 fw-bold'>This is HomePage.</p>
            <p>Go to <Link to="/users">Users</Link></p>
        </div>
    )
}

export default HomePage;