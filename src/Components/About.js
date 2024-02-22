import Image1 from '../Images/mario-adrian-1.jpg';
import Image2 from '../Images/mario-adrian-2.jpg';

function About() {
    return (
        <article className="about">
            <div className="about-text">
                <header>
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                </header>
                <p>
                    We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. Little Lemon invites you to savor 
                    authentic dishes crafted from time-honored recipes, delivering a culinary experience that blends the warmth of family traditions with the 
                    excitement of contemporary gastronomy.
                    <br /> <br />
                    Join us for a journey through the Mediterranean, where each bite tells a story, and every moment is a celebration of flavor and connection.
                </p>
            </div>
            <div className="images">
                <img src={Image1} alt="adrian and mario chatting with bowls of food in front of them" width={216} height={232} id="img1" />
                <img src={Image2} alt="adrian and mario laughing together in the kitchen" width={216} height={232} id="img2" />
            </div>
        </article>
    );
}

export default About;