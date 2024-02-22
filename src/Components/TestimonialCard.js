import {ReactComponent as QuotationSVG} from '../SVGs/quotation.svg';
import {ReactComponent as StarSVG} from '../SVGs/star.svg';

function TestimonialCard(props) {
    return (
        <section className="testimonial-card">
            <img src={props.person.image} alt={props.person.alt} />
            <div className="review">
                <QuotationSVG width={20} height={20} id="quotation" />
                <p>{props.person.quote}</p>
                <div>
                    <h3>{props.person.personName}</h3>
                    <div className="stars">
                        <StarSVG width={20} height={20} />
                        <StarSVG width={20} height={20} />
                        <StarSVG width={20} height={20} />
                        <StarSVG width={20} height={20} />
                        <StarSVG width={20} height={20} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialCard;