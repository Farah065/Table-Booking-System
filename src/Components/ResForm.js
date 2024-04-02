import { useState } from 'react';
import Calendar from './Form/Calendar';
import Dropdown from './Form/Dropdown';
import Counter from './Form/Counter';
import Location from './Form/Location';
import Loc1 from '../Images/branch-1.jpg';
import Loc2 from '../Images/branch-2.jpg';
import Loc3 from '../Images/branch-3.jpg';
import Lemon from '../Images/lemon.png';
import {ReactComponent as CheckmarkSVG} from '../SVGs/circled-checkmark.svg';

function ResForm(props) {
    const fromOptions = ["18:00", "19:00", "20:00", "21:00", "22:00"];
    const toOptions = ["19:00", "20:00", "21:00", "22:00", "23:00"];

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

    const [to, setTo] = useState("--:--");
    const [from, setFrom] = useState("--:--");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [location, setLocation] = useState("");

    return (
        <>
            { props.step === 1 &&
                <form className="res-form">
                    <div>
                        <label>Branch</label>
                        <div className="locations">
                            <Location loc={loc1} setter={setLocation} val={location} />
                            <Location loc={loc2} setter={setLocation} val={location} />
                            <Location loc={loc3} setter={setLocation} val={location} />
                        </div>
                    </div>
                    <div>
                        <label>Date & Time</label>
                        <div className="date-and-time">
                            <Calendar />
                            <div className="dropdowns">
                                <div>
                                    <h4>From</h4>
                                    <Dropdown options={fromOptions} valSetter={setFrom} value={from} />
                                </div>
                                <div>
                                    <h4>To</h4>
                                    <Dropdown options={toOptions} valSetter={setTo} value={to} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Number of Guests</label>
                        <div className="counters-container">
                            <Counter val={adults} setter={setAdults} title="Adults" />
                            <Counter val={children} setter={setChildren} title="Children" />
                        </div>
                    </div>
                    <div>
                        <label>Occasion</label><br />
                        <div className="center">
                            <input type="radio" id="birthday" name="occasion" value="Birthday" />
                            <label htmlFor="birthday" className="option">Birthday</label><br />
                            <input type="radio" id="business" name="occasion" value="Business" />
                            <label htmlFor="business" className="option">Business</label><br />
                            <input type="radio" id="friends-family" name="occasion" value="Friends & Family" />
                            <label htmlFor="friends-family" className="option">Friends & Family</label><br />
                            <input type="radio" id="other" name="occasion" value="other" />
                            <label htmlFor="other" className="option">Other: </label>
                            <input type="text" placeholder="Please specify..."/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="special-requests">Special Requests</label><br />
                        <div className="scrollbar-clip">
                            <textarea id="special-requests" placeholder="Type here..." />
                        </div>
                    </div>
                </form>
            }
            { props.step === 2 &&
                <form className="res-form" id="personal-info">
                    <div>
                        <label id="name">Name</label>
                        <input htmlFor="name" type="text" placeholder="Type here..."/>
                    </div>
                    <div>
                        <label id="email">Email</label>
                        <input htmlFor="email" type="text" placeholder="Type here..."/>
                    </div>
                    <div>
                        <label id="phone">Phone</label>
                        <input htmlFor="phone" type="text" placeholder="Type here..."/>
                    </div>
                </form>
            }
            { props.step === 3 &&
                <form className="res-form" id="confirmation">
                    <div>
                        <img src={Lemon} alt="Little Lemon's lemon icon" />
                        <h3>Enter the code<br/>sent to your email</h3>
                        <input type="text" placeholder="XXX-XXX-XXX"/>
                    </div>
                </form>
            }
            { props.step > 3 &&
                <div className="res-form" id="confirmation">
                    <div>
                        <img src={Lemon} alt="Little Lemon's lemon icon" />
                        <h3>Your reservation has been confirmed, thank you!</h3>
                        <CheckmarkSVG />
                    </div>
                </div>
            }
        </>
    );
}

export default ResForm;