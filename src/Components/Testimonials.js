import TestimonialCard from "./TestimonialCard";
import personImg1 from "../Images/person-1.jpg";
import personImg2 from "../Images/person-2.jpg";
import personImg3 from "../Images/person-3.jpg";
// import personImg4 from "../Images/person-4.jpg";

function Testimonials() {
    const person1 = {
        personName: "Ethan Mitchell",
        rating: "4.9/5",
        quote: "Little Lemon's authentic flavors transport me to the Mediterranean. Creamy hummus, crispy falafel—every bite is a delight!",
        image: personImg1,
        alt: "white man with peppered hair and stubble looking into camera"
    }
    const person2 = {
        personName: "Olivia Harper",
        rating: "4.8/5",
        quote: "Little Lemon nails Mediterranean perfection. Grilled kebabs, friendly staff—satisfying, flavorful, and my go-to spot for a fantastic meal.",
        image: personImg2,
        alt: "white woman with long, straight brown hair looking into camera"
    }
    const person3 = {
        personName: "Jordan Reynolds",
        rating: "5/5",
        quote: "Little Lemon, a must-try for a Mediterranean journey. Exceptional grilled octopus, cozy ambiance—culinary delight with lasting charm.",
        image: personImg3,
        alt: "black man with peppered hair looking into camera"
    }
    // const person4 = {
    //     personName: "Mason Turner",
    //     rating: "4.9/5",
    //     quote: "Mediterranean magic at Little Lemon. Savory kebabs, warm ambiance—a top choice for an exquisite, flavorful dining experience.",
    //     image: personImg4,
    //     alt: "white man with grey hair looking into camera"
    // }

    return (
        <article className="testimonials">
            <header>
                <h1>Testimonials</h1>
            </header>
            <div className="card-group">
                <TestimonialCard person={person1} />
                <TestimonialCard person={person2} />
                <TestimonialCard person={person3} />
                {/* <TestimonialCard person={person4} /> */}
            </div>
        </article>
    );
}

export default Testimonials;