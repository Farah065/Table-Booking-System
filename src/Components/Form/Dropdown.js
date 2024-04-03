import React, {useRef, useState} from 'react';
import {ReactComponent as ArrowDown} from '../../SVGs/down-arrow.svg';
import {ReactComponent as ArrowUp} from '../../SVGs/up-arrow.svg';

function Dropdown(props) {
    const [open, setOpen] = useState(false);
    const time = useRef();

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(!open);
        if(open){
            if(props.value === "--:--"){
                time.current.classList.add("invalid");

                if(props.type === "From"){
                    props.setFilled(prevState => ({
                        ...prevState,
                        from: false
                    }));
                }
                else if(props.type === "To"){
                    props.setFilled(prevState => ({
                        ...prevState,
                        to: false
                    }));
                }
            }
        }
    };

    const handleMenu = (item) => {
        props.valSetter(item);
        setOpen(false);
        var invalid = props.checkTimeRange(item, props.type);
        if(!invalid)
            time.current.classList.remove("invalid");

        if(props.type === "From"){
            props.setFilled(prevState => ({
                ...prevState,
                from: true
            }));
        }
        else if(props.type === "To"){
            props.setFilled(prevState => ({
                ...prevState,
                to: true
            }));
        }
    };

    const options = () => {
        return props.options.map(item => (
            <li key={item} className="menu-item">
                <button type="button" onClick={() => handleMenu(item)}>{item}</button>
            </li>
        ));
    }

    return (
    <div className="dropdown">
        {!open && <ArrowDown className="dropdown-arrow" onClick={handleOpen} />}
        {open && <ArrowUp className="dropdown-arrow" onClick={handleOpen} />}
        <button ref={time} className={((props.type === "From" && props.invalid[0]) || (props.type === "To" && props.invalid[1])) ? "dropdown-btn invalid" : "dropdown-btn"} onClick={handleOpen} style={{color: props.value === "--:--" ? '#33333366' :'#333333'}}>{props.value}</button>
        {open ? (
            <ul className="menu">
                {options()}
            </ul>
        ) : null}
    </div>
    );
}

export default Dropdown;