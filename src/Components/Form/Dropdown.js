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
            }
        }
    };

    const handleMenu = (item) => {
        props.valSetter(item);
        setOpen(false);
        time.current.classList.remove("invalid");
    };

    const options = () => {
        return props.options.map(item => (
            <li key={item} className="menu-item">
                <button type="button" onClick={() => handleMenu(item)}>{item}</button>
            </li>
        ));
    }

    return (
    <div className='dropdown'>
        {!open && <ArrowDown className='dropdown-arrow' onClick={handleOpen} />}
        {open && <ArrowUp className='dropdown-arrow' onClick={handleOpen} />}
        <button ref={time} className='dropdown-btn' onClick={handleOpen} style={{color: props.value === "--:--" ? '#33333366' :'#333333'}}>{props.value}</button>
        {open ? (
            <ul className="menu">
                {options()}
            </ul>
        ) : null}
    </div>
    );
}

export default Dropdown;