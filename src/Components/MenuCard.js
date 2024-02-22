import {ReactComponent as MotorcycleSVG} from '../SVGs/motorcycle.svg';

function MenuCard(props) {
    return (
        <section className="menu-card">
            <img src={props.info.img} alt={props.info.alt} width={220} height={172} />
            <div className="card-contents">
                <div>
                    <header>
                        <h3>{props.info.dishName}</h3>
                        <h4>{props.info.price}</h4>
                    </header>
                    <p>{props.info.desc}</p>
                </div>
                <button className="order">
                    <p>Order a delivery</p>
                    <MotorcycleSVG width={20} height={20} />
                </button>
            </div>
        </section>
    );
}

export default MenuCard;