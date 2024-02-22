import { useState } from "react";
import {ReactComponent as LeftArrowSVG} from '../SVGs/left-arrow.svg';
import {ReactComponent as RightArrowSVG} from '../SVGs/right-arrow.svg';

function Calendar() {
    const allDays = Array.from({length: 31}, (_, i) => i + 1);
    
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
    const [currDays, setCurrDays] = useState([getDays(currMonth - 1), getDays(currMonth), getDays(currMonth + 1)]);
    const [currWeekDay, setCurrWeekDay] = useState(getFirstWeekDay(currMonth, currYear));
    const [currSelected, setCurrSelected] = useState([-1, -1, -1]);
    
    function getDays(month) { // returns an array containing all days in a specific month
        var year = currYear;
        if (month === 0){
            year = year - 1;
            month = 12;
        }
        else if(month === -1) {
            year = year - 1;
            month = 11;
        }
        else if (month === 13) {
            month = 1;
            year = year + 1;
        }
        else if (month === 14) {
            month = 2;
            year = year + 1;
        }
        const days = month === 2 && year % 4 !== 0 ? allDays.slice(0, 28) :
                 month === 2 ? allDays.slice(0, 29) :
                 month === 4 || month === 6 || month === 9 || month === 11 ? allDays.slice(0, 30) :
                 allDays;
        return days;
    }

    function getFirstWeekDay(month, year) { // gets the weekday on which the first day of a specific month falls
        var d = new Date();
        d.setMonth(month - 1);
        d.setDate(1);
        d.setFullYear(year);
        const weekDay = d.getDay() === 0 ? 7 - 1 : d.getDay() - 1;
        // Monday - Sunday : 0 - 6
        return weekDay;
    }

    function getMonthName(month) { // gets the name of a month
        const date = new Date();
        date.setMonth(month - 1);
        const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
        const monthName = formatter.format(date);
        return monthName;
    }
    
    // generates the days that will show from the previous month
    const generatePrevDays = currWeekDay === 0 ? <></> :
        currDays[0].slice(-currWeekDay).map((day, index) => {
            return (
                <div key={index} className="calendar-day" id="out-of-range">
                    <p>{day}</p>
                </div>
            );
        });
    
    var future = new Date();
    future.setDate(future.getDate() + 30);

    // generates the days for this month
    const generateDays = currDays[1].map((day, index) => {
        var m = new Date().getMonth() + 1;
        var y = new Date().getFullYear();
        var d = new Date().getDate();
        
        return ( currSelected[0] === day && currSelected[1] === currMonth && currSelected[2] === currYear ?
            <div key={index} className="calendar-day" id="selected">
                <p>{day}</p>
            </div> :
            ((currMonth === m && currYear === y && day <= d) || (currMonth < m && currYear === y) || (currYear < y)
                || (day > future.getDate() && currMonth >= future.getMonth() + 1 && currYear >= future.getFullYear())
                || (currMonth > future.getMonth() + 1 && currYear === y) || (currYear > y) ?
            <div key={index} className="calendar-day" id="out-of-range">
                <p>{day}</p>
            </div> :
            <div key={index} className="calendar-day" id="" onClick={() => selectDay(day)}>
                <p>{day}</p>
            </div>)
        );
    });

    // generates the days that will show from the next month
    const generateNextDays = 42 - currDays[1].length - currWeekDay === 0 ? <></> :
        currDays[2].slice(0, 42 - currDays[1].length - currWeekDay).map((day, index) => {
            return (
                <div key={index} className="calendar-day" id="out-of-range">
                    <p>{day}</p>
                </div>
            );
        });

    const [mIndex, setMIndex] = useState(0);
    // handles navigating to the next month
    function incMonth() {
        if (mIndex === 1)
            return;
        if (currMonth === 12) {
            setCurrYear(currYear + 1);
            setCurrWeekDay(getFirstWeekDay(currMonth + 1, currYear + 1));
        }
        else {
            setCurrWeekDay(getFirstWeekDay(currMonth + 1, currYear));
        }
        setCurrMonth(currMonth === 12 ? 1 : currMonth + 1);
        setCurrDays([getDays(currMonth), getDays(currMonth + 1), getDays(currMonth + 2)]);
        setMIndex(1);
    }

    // handles navigating to the previous month
    function decMonth() {
        if (mIndex === 0)
            return;
        if (currMonth === 1){
            setCurrYear(currYear - 1);
            setCurrMonth(12);
            setCurrWeekDay(getFirstWeekDay(currMonth - 1, currYear - 1));
        }
        else {
            setCurrMonth(currMonth - 1);
            setCurrWeekDay(getFirstWeekDay(currMonth - 1, currYear));
        }
        setCurrDays([getDays(currMonth - 2), getDays(currMonth - 1), getDays(currMonth)]);
        setMIndex(0);
    }

    // handles selecting a reservation day
    function selectDay(day) {
        setCurrSelected([day, currMonth, currYear]);
    }

    return(
        <div className="calendar">
            <div className="month-select">
                <div onClick={decMonth}>
                    {mIndex === 0 ? <LeftArrowSVG className="arrow arrow-disabled" /> : <LeftArrowSVG className="arrow" /> }
                </div>
                <h3>{getMonthName(currMonth) + " " + currYear}</h3>
                <div onClick={incMonth}>
                    {mIndex === 1 ? <RightArrowSVG className="arrow arrow-disabled" /> : <RightArrowSVG className="arrow" /> }
                </div>
            </div>
            <div className="week-days">
                <p>M</p>
                <p>T</p>
                <p>W</p>
                <p>T</p>
                <p>F</p>
                <p>S</p>
                <p>S</p>
            </div>
            <div className="calendar-bg">
                {generatePrevDays}
                {generateDays}
                {generateNextDays}
            </div>
        </div>
    );
}

export default Calendar;