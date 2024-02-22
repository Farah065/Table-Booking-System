import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as LogoSVG} from '../SVGs/logo.svg';

function Navbar() {
    const navbar = useRef();
    useEffect(() => {
        let lastScrollY = window.scrollY;
    
        const handleScroll = () => {
          if (lastScrollY < window.scrollY) {
            navbar.current.classList.add("nav-shrink");
          } else if (window.scrollY === 0) {
            navbar.current.classList.remove("nav-shrink");
          }
    
          lastScrollY = window.scrollY;
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    return (
        <div className="nav-container" ref={navbar}>
            <LogoSVG />
            <nav className="nav">
                <Link to="/" className="nav-item">HOME</Link>
                <Link to="/about" className="nav-item">ABOUT</Link>
                <Link to="/menu" className="nav-item">MENU</Link>
                <Link to="/reservations" className="nav-item">RESERVATIONS</Link>
                <Link to="/order-online" className="nav-item">ORDER ONLINE</Link>
                <Link to="/login" className="nav-item">LOGIN</Link>
            </nav>
        </div>
    );
}

export default Navbar;