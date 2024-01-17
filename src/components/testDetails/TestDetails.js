import { useEffect, useState } from 'react';
import './TestDetails.css';
import TestInfo from '../TestInfo/TestInfo';

function TestDetails({ idValue, dateValue, testTimeValue, successValue, subtestsValue, handleOnClick }) {
    const [subtests, setSubtests] = useState(null);
    const [dateObject, setDateObject] = useState(new Date(dateValue));

    useEffect(() => {
        if (typeof subtestsValue === "object") {
            setSubtests(
                subtestsValue.map(subtest => {
                    return(
                        <TestInfo
                            key={subtest.id}
                            type="subtest"
                            testTitle={subtest.name}
                            testTime={subtest.testDurationInMilliseconds}
                            success={subtest.successful}
                            testDescription={subtest.description}
                        ></TestInfo>
                    )
                })
            )
        }
    }, [])

    return (
        <div className='test-details-container'>
            <div className='test-details-wrapper'>
                <img className='close-icon' onClick={handleOnClick} src='/images/icons/Close_round.svg' alt='close details' />
                <p className='details-title'>TCM Details</p>
                <div className='details-info'>
                    <div className='info-set'>
                        <p className='info-tag'>ID:</p>
                        <p className='info-result'>{idValue}</p>
                    </div>
                    <div className='info-set'>
                        <p className='info-tag'>Date:</p>
                        <p className='info-result'>{`${dateObject.getDate()}-${dateObject.getMonth()}-${dateObject.getFullYear()}`}</p>
                    </div>
                    <div className='info-set'>
                        <p className='info-tag'>Time:</p>
                        <p className='info-result'>{`${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`}</p>
                    </div>
                    <div className='info-set'>
                        <p className='info-tag'>Test took:</p>
                        <p className='info-result'>{testTimeValue}</p>
                    </div>
                    <div className='info-set'>
                        <p className='info-tag'>Success:</p>
                        <p className='info-result'>{successValue} tests</p>
                    </div>
                </div>

                <p className='subtests-title'>Tests</p>
                <div className='subtest-wrapper'>
                    {subtests}
                </div> 
            </div>
        </div>
    )
}

export default TestDetails;