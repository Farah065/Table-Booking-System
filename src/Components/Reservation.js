import { useState } from "react";
import { Link } from 'react-router-dom';
import ResForm from './ResForm';
import {ReactComponent as CheckmarkSVG} from '../SVGs/checkmark.svg';

function Reservation() {
    const [step, setStep] = useState(1);

    function handleClick() {
        setStep(step + 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return (
        <section className="reservation">
            <header className="res-header-container">
                <div className="res-header">
                    <h1>Reserve a Table</h1>
                    <div className="steps">
                        <div id={step === 1 ? "on" : "complete"}>
                            {step <= 1 ? <h2>1</h2> : <CheckmarkSVG />}
                        </div>
                        <div id={step === 2 ? "on" : step > 2 ? "complete" : ""}>
                            {step <= 2 ? <h2>2</h2> : <CheckmarkSVG />}
                        </div>
                        <div id={step === 3 ? "on" : step > 2 ? "complete" : ""}>
                            {step <= 3 ? <h2>3</h2> : <CheckmarkSVG />}
                        </div>
                        <hr className="hr-bg" />
                        <hr className={step === 1 ? "step-1 hr-fill" : step === 2 ? "step-2 hr-fill" : "step-3 hr-fill"} />
                    </div>
                    <div className="step-names">
                        <p>Resrvation<br />Details</p>
                        <p>Personal<br />Info</p>
                        <p>Confirmation</p>
                    </div>
                </div>
            </header>
            <ResForm step={step} />
            <div className="btn-container">
                {step <= 3 && <button className="btn primary-btn" onClick={handleClick}>{step === 3 ? "Submit" : "Next"}</button>}
                {step > 3 && <button className="btn link-btn" onClick={handleClick}>
                    <Link to="/" className="btn-link">Home</Link>
                </button>}
            </div>
        </section>
    );
}

export default Reservation;