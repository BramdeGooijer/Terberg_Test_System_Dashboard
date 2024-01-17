import './FilterButton.css';

function FilterButton({filter, filterValue, fromDateValue, tillDateValue, onFilterChange, onFromDateChange, onTillDateChange }) {
    
    
    if (filter === "type") {
        const handleFilterOptionsClick = (event) => {
            onFilterChange(event.target.innerText)
        }

        return (
            <div className='filter-button-container'>
                <div className='filter-button'>
                    <p className='button-text'>{filterValue}</p>
                    <img className='expand-icon' src='/images/icons/Expand_down_black.svg' alt="open filter button" />
                </div>
                <div className='filter-options'>
                    <p className='options-text' onClick={handleFilterOptionsClick}>All</p>
                    <p className='options-text' onClick={handleFilterOptionsClick}>Failed</p>
                    <p className='options-text' onClick={handleFilterOptionsClick}>Successful</p>
                </div>
            </div>
        )
    }

    if (filter === "from") {
        const handleFromDateChange = (event) => {
            onFromDateChange(event.target.value);
        }

        return (
            <div className='filter-button-container'>
                <div className='filter-button'>
                    <p className='button-text'>Van:</p>
                    <input className='date-picker' type="date" onChange={handleFromDateChange}></input>
                </div>
            </div>
        )
    }

    if (filter === "till") {
        const handleTillDateChange = (event) => {
            onTillDateChange(event.target.value);
        }

        return (
            <div className='filter-button-container'>
                <div className='filter-button'>
                    <p className='button-text'>Tot:</p>
                    <input className='date-picker' type="date" onChange={handleTillDateChange}></input>
                </div>
            </div>
        )
    }

}

export default FilterButton;