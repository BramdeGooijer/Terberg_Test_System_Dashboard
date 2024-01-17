import UserProfile from '../userProfile/UserProfile';
import './PageHeader.css'

function PageHeader() {
    return (
        <div className='page-header-container'>
            <div className='header-items-container'>
                <div className='brand-title-container'>
                    <img className='brand-image' src="/images/logos/BrandImage.svg" alt='brand logo' />
                    <img className='brand-image-no-text' src="/images/logos/BrandImageNoText.svg" alt='brand logo' />
                    <p className='page-header-title'>TCM Test Results</p>
                </div>
                <UserProfile></UserProfile>
            </div>
        </div>
    )
}

export default PageHeader;