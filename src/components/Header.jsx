import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3" to="/">IL Bank Mock</Link>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item fs-5"><Link className='nav-link' to="/">Home</Link></li>
                            <li className="nav-item fs-5"><Link className='nav-link' to="/login">Login</Link></li>
                            <li className="nav-item fs-5"><Link className='nav-link' to="/users">Users</Link></li>
                            <li className="nav-item fs-5"><Link className='nav-link' to="/setup/user">Register</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header;