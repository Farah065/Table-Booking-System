import Button from './Button';
import HeroImage from '../Images/hero-image.jpg';

function Hero() {
    return (
        <article className="hero">
            <div className="hero-text">
                <header>
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                </header>
                <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                <Button label="Reserve a Table" />
            </div>
            <img src={HeroImage} alt="chef holding a tray with four sandwiches" width={330} height={374} />
        </article>
    );
}

export default Hero;