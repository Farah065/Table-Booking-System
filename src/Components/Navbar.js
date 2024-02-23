import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LogoSmall from '../Images/logo-small.png';
import {ReactComponent as HamburgerMenuSVG} from '../SVGs/hamburger-menu.svg';

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

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    
    return (
      <div className="navbar" ref={navbar}>
        <div className="nav-container nav-container-large">
            <img src={LogoSmall} alt="small version of the little lemon logo" width={140} />
            <nav className="nav">
                <Link to="/" className="nav-item" onClick={scrollToTop}>HOME</Link>
                <Link to="/about" className="nav-item" onClick={scrollToTop}>ABOUT</Link>
                <Link to="/menu" className="nav-item" onClick={scrollToTop}>MENU</Link>
                <Link to="/reservations" className="nav-item" onClick={scrollToTop}>RESERVATIONS</Link>
                <Link to="/order-online" className="nav-item" onClick={scrollToTop}>ORDER ONLINE</Link>
                <Link to="/login" className="nav-item" onClick={scrollToTop}>LOGIN</Link>
            </nav>
        </div>
        <div className="nav-container nav-container-small">
            <img src={LogoSmall} alt="small version of the little lemon logo" width={140} />
            <HamburgerMenuSVG />
        </div>
      </div>
    );
}

export default Navbar;