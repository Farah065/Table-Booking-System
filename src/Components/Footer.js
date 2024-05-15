import { Link } from 'react-router-dom';
import Logo from '../Images/logo-large.png';

function Footer() {
    function scrollToTop() {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    
    return (
        <footer>
            <div className="footer-contents">
                <img src={Logo} alt="a large version of the little lemon logo" width={96} />
                <section>
                    <header>
                        <h3>Navigation</h3>
                    </header>
                    <nav className="footer-nav">
                        <Link to="/" className="nav-item" onClick={scrollToTop}>Home</Link>
                        <Link to="/about" className="nav-item" onClick={scrollToTop}>About</Link>
                        <Link to="/menu" className="nav-item" onClick={scrollToTop}>Menu</Link>
                        <Link to="/reservations" className="nav-item" onClick={scrollToTop}>Reservations</Link>
                        <Link to="/order-online" className="nav-item" onClick={scrollToTop}>Order Online</Link>
                        <Link to="/login" className="nav-item" onClick={scrollToTop}>Login</Link>
                    </nav>
                </section>
                <section>
                    <header>
                        <h3>Contact</h3>
                    </header>
                    <ul>
                        <li>123 Olive Street, Citrus Grove, Mediterra City, FL 33123</li>
                        <li>(555) 123-4567</li>
                        <li>info@little-lemon.com</li>
                    </ul>
                </section>
                <section>
                    <header>
                        <h3>Social Media</h3>
                    </header>
                    <ul className="social-media">
                        <a href="https://www.facebook.com" target="_blank"><li>Facebook</li></a>
                        <a href="https://www.instagram.com" target="_blank"><li>Instagram</li></a>
                        <a href="https://www.twitter.com" target="_blank"><li>Twitter</li></a>
                    </ul>
                </section>
            </div>
        </footer>
    );
}

export default Footer;