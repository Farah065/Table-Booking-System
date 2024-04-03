import {ReactComponent as FilledStar} from '../../SVGs/star-filled.svg';
import {ReactComponent as UnfilledStar} from '../../SVGs/star-unfilled.svg';

function Location(props) {
    function selectLocation() {
        props.setter(props.loc.branch);
        props.setFilled(prevState => ({
            ...prevState,
            location: true
        }));
    }

    const stars = () => {
        return props.loc.stars.map((item, index) => (
            item ? <FilledStar key={index} /> : <UnfilledStar key={item} />
        ));
    }

    return(
        <section>
            <div className={props.val === props.loc.branch ? "selected-branch branch" : "branch"}>
                <img src={props.loc.src} alt={props.loc.alt} onClick={selectLocation} />
            </div>
            <h4 onClick={selectLocation}>{props.loc.branch}</h4>
            <div className="stars">  
                {stars()}
            </div>
        </section>
    );
}

export default Location;