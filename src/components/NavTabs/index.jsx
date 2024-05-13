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
                    <img className="footer-img" src="bubble-icon.svg" alt="Home Page" />
                    <h2 className="footer-text">BUBBLES</h2>
                </Link>
            </li>
            <li className="profile-icon">
                <Link
                    to={isLoggedIn ? "/profile" : '/'}
                    state={{ from: loggedInUserID }}
                    className={currentPage === '/profile' ? 'nav-link-active' : 'nav-link'}
                >
                    <img className="footer-img" src="profile-icon.svg" alt="My Profile" />
                    <h2 className="footer-text">PROFILE</h2>
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
                    <img className="footer-img" src="friends-icon.svg" alt="My Friends" />
                    <h2 className="footer-text">FRIENDS</h2>
                </Link>
            </li>
            <li className="login-icon">
                <Link
                    to="/"
                    className={currentPage === '/login' ? 'nav-link-active' : 'nav-link'}
                >
                    {isLoggedIn ? <><img className="footer-img" src="logout-icon.svg" alt="Logout" onClick={() => Auth.logout()} /><h2 className="footer-text" onClick={() => Auth.logout()} >LOGOUT</h2></> 
                    : <><img className="footer-img" src="login-icon.svg" alt="Login" /><h2 className="footer-text">LOGIN</h2></>}
                </Link>
            </li>
        </ul>
    );
}

export default NavTabs;
