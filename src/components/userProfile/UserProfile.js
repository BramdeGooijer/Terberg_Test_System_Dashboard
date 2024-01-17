import './UserProfile.css';

function UserProfile() {
    return (
        <div className='user-profile-container'>
            <img src='/images/icons/UserCircle.svg' alt="profile" />
            <p className='username-text'>Terberg Control Systems</p>
        </div>
    )
}

export default UserProfile;