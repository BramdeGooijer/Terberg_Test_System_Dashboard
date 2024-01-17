import { useEffect, useState } from 'react';
import './NavBarItem.css';

function NavBarItem(props) {
    const [iconValue, setIconValue] = useState();
    const [buttonText, setButtonText] = useState("Dashboard");

    useEffect(() => {
        if (props.icon === "dashboard") {
            setIconValue("/images/icons/PieChartIconBlue.svg")
        } else if (props.icon === "logout") {
            setIconValue("/images/icons/SignOutIconGrey.svg")
        } else {
            setIconValue("/images/icons/PieChartIconBlue.svg")
        }

        setButtonText(props.buttonText);
    }, [])

    return (
        <div onClick={props.handleOnClick} className='nav-bar-item-container'>
            <img src={iconValue} alt="dashboard icon" type='image/svg+xml' />
            <p className='nav-bar-item-text' data-selected={props.isSelected}>{buttonText}</p>
        </div>
    )
}

export default NavBarItem;