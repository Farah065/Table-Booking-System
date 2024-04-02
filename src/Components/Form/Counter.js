import { useRef } from 'react';

function Counter(props) {
    const add = useRef();
    const sub = useRef();

    const min = props.title === "Adults" ? 1 : 0;

    function dec() {
        if(props.val > min){
            var val = props.val;
            val--;
            props.setter(val);

            add.current.classList.remove("disable");
            if(val === min){
                sub.current.classList.add("disable");
            }
        }
    }
    
    function inc() {
        if(props.val < 5){
            var val = props.val;
            val++;
            props.setter(val);

            sub.current.classList.remove("disable");
            if(val === 5){
                add.current.classList.add("disable");
            }
        }
    }

    return (
        <div className="counter">
            <h4>{props.title}</h4>
            <div>
                <p ref={sub} className="change-counter disable" onClick={dec}>−</p>
                <p>{props.val}</p>
                <p ref={add} className="change-counter" onClick={inc}>+</p>
            </div>
        </div>
    );
}

export default Counter;