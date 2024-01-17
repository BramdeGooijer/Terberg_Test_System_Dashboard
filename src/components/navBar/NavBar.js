import NavBarItem from '../navBarItem/NavBarItem';
import './NavBar.css';

function NavBar() {
    const handleDashboardOnClick = () => {
        console.log("dashboard")
    }
    const handleSignOutOnClick = () => {
        console.log("sign out")
    }

    return (
        <div className='nav-bar-container'>
            <div className='nav-bar-section'>
                <NavBarItem 
                    icon="dashboard"
                    buttonText='Dashboard' 
                    isSelected="true" 
                    handleOnClick={handleDashboardOnClick}>
                </NavBarItem>
            </div>
            <div className="nav-bar-footer">
                <NavBarItem 
                    icon="logout" 
                    buttonText='Sign out' 
                    isSelected="false" 
                    handleOnClick={handleSignOutOnClick}>
                </NavBarItem>
            </div>
        </div>
    )
}

export default NavBar;