import { useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Form/Calendar';
import Dropdown from './Form/Dropdown';
import Counter from './Form/Counter';
import Location from './Form/Location';
import Loc1 from '../Images/branch-1.jpg';
import Loc2 from '../Images/branch-2.jpg';
import Loc3 from '../Images/branch-3.jpg';
import Lemon from '../Images/lemon.png';
import {ReactComponent as CheckmarkSVG} from '../SVGs/circled-checkmark.svg';
import {ReactComponent as ErrorSVG} from '../SVGs/error.svg';

function ResForm(props) {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState([-1, -1, -1]);
    const [to, setTo] = useState("--:--");
    const [from, setFrom] = useState("--:--");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [occasion, setOccasion] = useState("");
    const [occasionOther, setOccasionOther] = useState("");
    const [filled, setFilled] = useState({location: null, date: null, to: null, from: null, occasion: null, other: null});
    const [invalid, setInvalid] = useState([false, false]);

    const occasionText = useRef();

    const [state, dispatch] = useReducer(reducer, {
        from: ["18:00", "19:00", "20:00", "21:00", "22:00"],
        to: ["19:00", "20:00", "21:00", "22:00", "23:00"]
    });

    function reducer(state, action){
        var times;
        switch(action.type){
            case "weekday":
                times = {
                    from: ["18:00", "19:00", "20:00", "21:00", "22:00"],
                    to: ["19:00", "20:00", "21:00", "22:00", "23:00"]
                };
                break;
            case "weekend":
                times = {
                    from: ["19:00", "20:00", "21:00"],
                    to: ["20:00", "21:00", "22:00"]
                };
                break;
            default:
                times = state;
        }

        if(!times.from.includes(from))
            setFrom("--:--");
        if(!times.to.includes(to))
            setTo("--:--");

        return times;
    }

    const loc1 = {
        src: Loc1,
        alt: "Outdoor seating at Little Lemon's Olive Street branch",
        branch: "Olive Street",
        stars: [true, true, true, true, true]
    }

    const loc2 = {
        src: Loc2,
        alt: "Indoor seating at Little Lemon's Grape Boulevard branch",
        branch: "Grape Boulevard",
        stars: [true, true, true, true, true]
    }

    const loc3 = {
        src: Loc3,
        alt: "Outdoor seating at Little Lemon's Fig Lane branch",
        branch: "Fig Lane",
        stars: [true, true, true, true, false]
    }

    const onOptionChange = e => {
        setOccasion(e.target.value);
        setFilled(prevState => ({
            ...prevState,
            occasion: true
        }));
        if(e.target.value !== "Other"){
            setFilled(prevState => ({
                ...prevState,
                other: null
            }));
            occasionText.current.classList.remove("invalid-txt");
        }
    }

    const occasionOtherChange = e => {
        setOccasionOther(e.target.value);
        occasionText.current.classList.remove("invalid-txt");
        if(filled.other === null || filled.other === false){
            setFilled(prevState => ({
                ...prevState,
                other: true
            }));
        }
    }

    function occasionOtherBlur() {
        if(occasion === "Other" && occasionOther === ""){
            occasionText.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                other: false
            }));
        }
    }

    function checkTimeRange(item, type){
        if((type === "To" && from !== "--:--") || (type === "From" && to !== "--:--")){
            if(type === "To" && parseInt(item.substring(0, 2)) <= parseInt(from.substring(0, 2))){
                setInvalid([true, true]);
                return true;
            }
            else if(type === "From" && parseInt(to.substring(0, 2)) <= parseInt(item.substring(0, 2))){
                setInvalid([true, true]);
                return true;
            }
            else{
                setInvalid([false, false]);
                return false;
            }
        }
    }

    function checkResDetails(e){
        e.preventDefault();
        if(filled.location === null){
            setFilled(prevState => ({
                ...prevState,
                location: false
            }));
        }
        if(filled.date === null){
            setFilled(prevState => ({
                ...prevState,
                date: false
            }));
        }
        if(filled.to === null){
            setFilled(prevState => ({
                ...prevState,
                to: false
            }));
            setInvalid(([v, _]) => [v, true]);
        }
        if(filled.from === null){
            setFilled(prevState => ({
                ...prevState,
                from: false
            }));
            setInvalid(([_, v]) => [true, v]);
        }
        if(filled.occasion === null){
            setFilled(prevState => ({
                ...prevState,
                occasion: false
            }));
        }
        else if(occasion === "Other" && filled.other === null){
            setFilled(prevState => ({
                ...prevState,
                other: false
            }));
            occasionText.current.classList.add("invalid-txt");
        }
        scrollToTop();

        if(filled.location === true && filled.date === true && filled.from === true && filled.to === true && filled.occasion === true){
            if((occasion === "Other" && filled.other === true) || occasion !== "Other"){
                handleClick();
            }
        }
    }

    function handleClick(){
        props.setStep(props.step + 1);
    }

    function scrollToTop(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            { props.step === 1 &&
                <form className="res-form">
                    <div>
                        <label className="required">Branch</label>
                        <div className="locations">
                            <Location loc={loc1} setter={setLocation} val={location} setFilled={setFilled} />
                            <Location loc={loc2} setter={setLocation} val={location} setFilled={setFilled} />
                            <Location loc={loc3} setter={setLocation} val={location} setFilled={setFilled} />
                        </div>
                        {filled.location === false &&
                        <div className="error">
                            <ErrorSVG/>
                            <p className="error-msg">Please select a branch</p>
                        </div>}
                    </div>
                    <div>
                        <label className="required">Date & Time</label>
                        <div className="date-and-time">
                            <div>
                                <Calendar currSelected={date} setCurrSelected={setDate} dispatch={dispatch} setFilled={setFilled} />
                                {filled.date === false && <div className="error">
                                    <ErrorSVG/>
                                    <p className="error-msg">Please select a date</p>
                                </div>}
                            </div>
                            <div className="times">
                                <div className="dropdowns">
                                    <div>
                                        <h4>From</h4>
                                        <Dropdown options={state.from} valSetter={setFrom} value={from} setFilled={setFilled} type="From" checkTimeRange={checkTimeRange} invalid={invalid} />
                                    </div>
                                    <div>
                                        <h4>To</h4>
                                        <Dropdown options={state.to} valSetter={setTo} value={to} setFilled={setFilled} type="To" checkTimeRange={checkTimeRange} invalid={invalid} />
                                    </div>
                                </div>
                                {(filled.from === false || filled.to === false || invalid[0] || invalid[1]) && <div className="error">
                                    <ErrorSVG/>
                                    <p className="error-msg">
                                        {(filled.from === false || filled.to === false) ? "Please select a time" : "End time must be after start time"}
                                    </p>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="required">Number of Guests</label>
                        <div className="counters-container">
                            <Counter val={adults} setter={setAdults} title="Adults" />
                            <Counter val={children} setter={setChildren} title="Children" />
                        </div>
                    </div>
                    <div>
                        <label className="required">Occasion</label><br />
                        <div className="center">
                            <input type="radio" id="birthday" name="occasion" value="Birthday" checked={occasion === "Birthday"} onChange={onOptionChange} />
                            <label htmlFor="birthday" className="option">Birthday</label><br />
                            <input type="radio" id="business" name="occasion" value="Business" checked={occasion === "Business"} onChange={onOptionChange} />
                            <label htmlFor="business" className="option">Business</label><br />
                            <input type="radio" id="friends-family" name="occasion" value="Friends & Family" checked={occasion === "Friends & Family"} onChange={onOptionChange} />
                            <label htmlFor="friends-family" className="option">Friends & Family</label><br />
                            <input type="radio" id="other" name="occasion" value="Other" checked={occasion === "Other"} onChange={onOptionChange} />
                            <label htmlFor="other" className="option">Other: </label>
                            <input ref={occasionText} type="text" placeholder="Please specify..." value={occasionOther} onChange={occasionOtherChange} onBlur={occasionOtherBlur} />
                            {((filled.occasion === false) || (occasion === "Other" && filled.other === false)) && <div className="error">
                                <ErrorSVG/>
                                {filled.occasion === false && <p className="error-msg">Please select an occasion</p>}
                                {(occasion === "Other" && filled.other === false) && <p className="error-msg">Please specify the occasion</p>}
                            </div>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="special-requests">Special Requests</label><br />
                        <div className="scrollbar-clip">
                            <textarea id="special-requests" placeholder="Type here..." />
                        </div>
                    </div>
                    <button className="btn primary-btn" onClick={checkResDetails}>Next</button>
                </form>
            }
            { props.step === 2 &&
                <form className="res-form" id="personal-info">
                    <div>
                        <label className="required" id="name">Name</label>
                        <input htmlFor="name" type="text" placeholder="Type here..."/>
                    </div>
                    <div>
                        <label className="required" id="email">Email</label>
                        <input htmlFor="email" type="text" placeholder="Type here..."/>
                    </div>
                    <div>
                        <label className="required" id="phone">Phone</label>
                        <input htmlFor="phone" type="text" placeholder="Type here..."/>
                    </div>
                    <button className="btn primary-btn" onClick={handleClick}>Next</button>
                </form>
            }
            { props.step === 3 &&
                <form className="res-form" id="confirmation">
                    <div>
                        <img src={Lemon} alt="Little Lemon's lemon icon" />
                        <h3>Enter the code<br/>sent to your email</h3>
                        <input type="text" placeholder="XXX-XXX-XXX"/>
                    </div>
                    <button className="btn primary-btn" onClick={handleClick}>Submit</button>
                </form>
            }
            { props.step > 3 &&
                <div className="res-form" id="confirmation">
                    <div>
                        <img src={Lemon} alt="Little Lemon's lemon icon" />
                        <h3>Your reservation has been confirmed, thank you!</h3>
                        <CheckmarkSVG />
                    </div>
                    <button className="btn link-btn" onClick={handleClick}>
                        <Link to="/" className="btn-link">Home</Link>
                    </button>
                </div>
            }
        </>
    );
}

export default ResForm;