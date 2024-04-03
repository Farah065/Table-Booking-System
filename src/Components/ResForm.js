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
    const [filled, setFilled] = useState({location: null, date: null, to: null, from: null, occasion: null, other: null,
                                            name: null, email: null, phone: null, code: null});
    const [invalid, setInvalid] = useState([false, false]);
    const [personalInfo, setPersonalInfo] = useState({name: "", email: "", phone: ""});
    const [validInfo, setValidInfo] = useState({email: true, phone: true, code: true});
    const [code, setCode] = useState("");

    const occasionText = useRef();
    const top = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const codeRef = useRef();

    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPhone = /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g;
    const isValidCode = /^\d{3}-\d{3}-\d{3}$/;


    const [state, dispatch] = useReducer(reducer, {
        from: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        to: ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
    });

    function reducer(state, action){
        var times;
        switch(action.type){
            case "weekday":
                times = {
                    from: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
                    to: ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
                };
                break;
            case "weekend":
                times = {
                    from: ["18:00", "19:00", "20:00", "21:00"],
                    to: ["19:00", "20:00", "21:00", "22:00"]
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

    const onNameChange = e => {
        nameRef.current.classList.remove("invalid-txt");
        setPersonalInfo(prevState => ({
            ...prevState,
            name: e.target.value
        }));

        if(e.target.value !== ""){
            setFilled(prevState => ({
                ...prevState,
                name: true
            }));
        }
    }
    const onNameBlur = e => {
        if(personalInfo.name === ""){
            nameRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                name: false
            }));
        }
    }

    const onEmailChange = e => {
        emailRef.current.classList.remove("invalid-txt");
        setPersonalInfo(prevState => ({
            ...prevState,
            email: e.target.value
        }));
        setValidInfo(prevState => ({
            ...prevState,
            email: true
        }));

        if(e.target.value !== ""){
            setFilled(prevState => ({
                ...prevState,
                email: true
            }));
        }
    }
    const onEmailBlur = e => {
        if(personalInfo.email === ""){
            emailRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                email: false
            }));
        }
        else if(!personalInfo.email.match(isValidEmail)){
            emailRef.current.classList.add("invalid-txt");
            setValidInfo(prevState => ({
                ...prevState,
                email: false
            }));
        }
        else{
            setValidInfo(prevState => ({
                ...prevState,
                email: true
            }));
        }
    }

    const onPhoneChange = e => {
        phoneRef.current.classList.remove("invalid-txt");
        setPersonalInfo(prevState => ({
            ...prevState,
            phone: e.target.value
        }));
        setValidInfo(prevState => ({
            ...prevState,
            phone: true
        }));

        if(e.target.value !== ""){
            setFilled(prevState => ({
                ...prevState,
                phone: true
            }));
        }
    }
    const onPhoneBlur = e => {
        if(personalInfo.phone === ""){
            phoneRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                phone: false
            }));
        }
        else if(!personalInfo.phone.match(isValidPhone)){
            phoneRef.current.classList.add("invalid-txt");
            setValidInfo(prevState => ({
                ...prevState,
                phone: false
            }));
        }
        else{
            setValidInfo(prevState => ({
                ...prevState,
                phone: true
            }));
        }
    }

    const onCodeChange = e => {
        codeRef.current.classList.remove("invalid-txt");
        setCode(e.target.value);
        setValidInfo(prevState => ({
            ...prevState,
            code: true
        }));

        if(e.target.value !== ""){
            setFilled(prevState => ({
                ...prevState,
                code: true
            }));
        }
    }
    const onCodeBlur = e => {
        if(code === ""){
            codeRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                code: false
            }));
        }
        else if(!code.match(isValidCode)){
            codeRef.current.classList.add("invalid-txt");
            setValidInfo(prevState => ({
                ...prevState,
                code: false
            }));
        }
        else{
            setValidInfo(prevState => ({
                ...prevState,
                code: true
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


        if(filled.location === true && filled.date === true && filled.from === true && filled.to === true && filled.occasion === true){
            if((occasion === "Other" && filled.other === true) || occasion !== "Other"){
                scrollToTop(0);
                handleClick();
            }
        }
        else{
            scrollToTop(90);
        }
    }

    function checkPersonalDetails(e){
        e.preventDefault();
        if(filled.name === null){
            nameRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                name: false
            }));
        }
        if(filled.email === null){
            emailRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                email: false
            }));
        }
        if(filled.phone === null){
            phoneRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                phone: false
            }));
        }

        if(filled.name === true && filled.email === true && filled.phone === true &&
            personalInfo.email.match(isValidEmail) && personalInfo.phone.match(isValidPhone)){
            scrollToTop(0);
            handleClick();
        }
        else{
            scrollToTop(90);
        }
    }

    function checkCode(e){
        e.preventDefault();
        if(filled.code === null){
            codeRef.current.classList.add("invalid-txt");
            setFilled(prevState => ({
                ...prevState,
                code: false
            }));
        }

        if(code.match(isValidCode)){
            scrollToTop(0);
            handleClick();
        }
        else{
            scrollToTop(90);
        }
    }

    function handleClick(){
        props.setStep(props.step + 1);
    }

    function scrollToTop(val){
        if(val !== 0){
            const scrollPosition = top.current.offsetTop - val;
            if(window.scrollY > scrollPosition){
                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth',
                });
            }
        }
        else{
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    }

    return (
        <>
            { props.step === 1 &&
                <form className="res-form">
                    <div ref={top}>
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
                <form ref={top} className="res-form" id="personal-info">
                    <div>
                        <label className="required" id="name">Name</label>
                        <input ref={nameRef} htmlFor="name" type="text" placeholder="Type here..." value={personalInfo.name} onChange={onNameChange} onBlur={onNameBlur} />
                        {filled.name === false &&
                        <div className="error">
                            <ErrorSVG/>
                            <p className="error-msg">Please enter your name</p>
                        </div>}
                    </div>
                    <div>
                        <label className="required" id="email">Email</label>
                        <input ref={emailRef} htmlFor="email" type="text" placeholder="Type here..." value={personalInfo.email} onChange={onEmailChange} onBlur={onEmailBlur} />
                        {(filled.email === false || validInfo.email === false) &&
                        <div className="error">
                            <ErrorSVG/>
                            {filled.email === false && <p className="error-msg">Please enter your email</p>}
                            {validInfo.email === false && <p className="error-msg">Invalid email</p>}
                        </div>}
                    </div>
                    <div>
                        <label className="required" id="phone">Phone</label>
                        <input ref={phoneRef} htmlFor="phone" type="text" placeholder="Type here..." value={personalInfo.phone} onChange={onPhoneChange} onBlur={onPhoneBlur} />
                        {(filled.phone === false || validInfo.phone === false) &&
                        <div className="error">
                            <ErrorSVG/>
                            {filled.phone === false && <p className="error-msg">Please enter your phone number</p>}
                            {validInfo.phone === false && <p className="error-msg">Invalid phone number</p>}
                        </div>}
                    </div>
                    <div className="btn-group">
                        <button className="btn primary-btn" onClick={() => props.setStep(props.step - 1)}>Back</button>
                        <button className="btn primary-btn" onClick={checkPersonalDetails}>Next</button>
                    </div>
                </form>
            }
            { props.step === 3 &&
                <form ref={top} className="res-form" id="confirmation">
                    <div>
                        <img src={Lemon} alt="Little Lemon's lemon icon" />
                        <h3>Enter the code<br/>sent to your email</h3>
                        <input ref={codeRef} type="text" placeholder="XXX-XXX-XXX" value={code} onChange={onCodeChange} onBlur={onCodeBlur} />
                        {(filled.code === false || validInfo.code === false) &&
                        <div className="error">
                            <ErrorSVG/>
                            {filled.code === false && <p className="error-msg">Please enter the code</p>}
                            {validInfo.code === false && <p className="error-msg">Invalid code</p>}
                        </div>}
                    </div>
                    <button className="btn primary-btn" onClick={checkCode}>Submit</button>
                </form>
            }
            { props.step > 3 &&
                <div className="res-form" id="confirmation">
                    <div>
                        <img src={Lemon} alt="Little Lemon's lemon icon" />
                        <h3>Your reservation has been confirmed, thank you!</h3>
                        <CheckmarkSVG />
                    </div>
                    <button className="btn link-btn" onClick={() => scrollToTop(0)}>
                        <Link to="/" className="btn-link">Home</Link>
                    </button>
                </div>
            }
        </>
    );
}

export default ResForm;