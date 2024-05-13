import { Link, useLocation } from 'react-router-dom';
import './style.css'
import Auth from '../../utils/auth'

function NavTabs() {
    const currentPage = useLocation().pathname;
    let isLoggedIn = Auth.loggedIn();
    let loggedInUserID
    if (isLoggedIn) {
        loggedInUserID = Auth.getProfile().data._id;
    }

    return (
        <ul className="nav-tabs">
            <li className="home-icon">
                <Link
                    to={isLoggedIn ? "/home" : '/'}
                    className={currentPage === '/' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="bubble-icon.svg" alt="Home Page" />
                </Link>
            </li>
            <li className="profile-icon">
                <Link
                    to={isLoggedIn ? "/profile" : '/'}
                    state={{ from: loggedInUserID }}
                    className={currentPage === '/profile' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="profile-icon.svg" alt="My Profile" />
                </Link>
            </li>
            <li className="new-post-icon">
                <Link
                    to={isLoggedIn ? "/newpost" : '/'}
                    className={currentPage === '/newpost' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="bubble-wand-icon.svg" alt="Create New Post" />
                </Link>
                <ul className='floating-bubbles'>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
            <li className="friends-icon">
                <Link
                    to={isLoggedIn ? "/friends" : '/'}
                    className={currentPage === '/friends' ? 'nav-link-active' : 'nav-link'}
                >
                    <img src="friends-icon.svg" alt="My Friends" />
                </Link>
            </li>
            <li className="login-icon">
                <Link
                    to="/"
                    className={currentPage === '/login' ? 'nav-link-active' : 'nav-link'}
                >
                    {isLoggedIn ? <img src="logout-icon.svg" alt="Logout" onClick={() => Auth.logout()} /> : <img src="login-icon.svg" alt="Login" />}
                </Link>
            </li>
        </ul>
    );
}

export default NavTabs;
