import Button from "./Button";
import MenuCard from "./MenuCard";
import greekSaladImg from '../Images/greek-salad.jpg';
import bruschettaImg from '../Images/bruschetta.jpg';
import lemonDessertImg from '../Images/lemon-dessert.jpg';

function Specials() {
    const greekSalad = {
        dishName: "Greek Salad",
        price: "$12.99",
        desc: "The famous Greek salad of crispy lettuce, pepers, olives, and our Chicago-style feta cheese, garnished with cruchy garlic and rosemary croutons.",
        img: greekSaladImg,
        alt: "close-up shot of a greek salad"
    }
    const bruschetta = {
        dishName: "Bruschetta",
        price: "$5.99",
        desc: "Our bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
        img: bruschettaImg,
        alt: "bruschetta on a wooden platter"
    }
    const lemonDessert = {
        dishName: "Lemon Dessert",
        price: "$4.99",
        desc: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        img: lemonDessertImg,
        alt: "a slice of lemon cake with a fork in front of it"
    }

    return (
        <article className="specials">
            <header>
                <h1>Specials</h1>
                <Button label="Online Menu" />
            </header>
            <div className="card-group">
                <MenuCard info={greekSalad} />
                <MenuCard info={bruschetta} />
                <MenuCard info={lemonDessert} />
            </div>
        </article>
    );
}

export default Specials;