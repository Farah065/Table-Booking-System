import HeroImage from '../Images/hero-image.webp';
import { Link } from 'react-router-dom';

function Hero() {
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return (
        <article className="hero-container">
            <div className="hero">
                <div className="hero-text">
                    <header>
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                    </header>
                    <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <button className="btn link-btn" aria-label="On Click" onClick={scrollToTop}>
                        <Link to="/reservations" className="btn-link">Reserve a Table</Link>
                    </button>
                </div>
                <img src={HeroImage} alt="chef holding a tray with four sandwiches" width={330} height={374} />
            </div>
        </article>
    );
}

export default Hero;