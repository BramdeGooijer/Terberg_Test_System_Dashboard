import { useEffect, useState } from 'react';
import './TestInfo.css';
import TestDetails from '../testDetails/TestDetails';

function TestInfo(props) {
    // Type: "test" states
    const [testIdValue, setTestIdValue] = useState(props.testId);
    const [subtestSuccessValue, setSubtestSuccessValue] = useState();
    const [subtestAmount, setSubtestAmount] = useState();
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    // Type: "subtest" states
    const [testTitle, setTestTitle] = useState(props.testTitle);
    const [subtestDescription, setSubtestDescription] = useState(props.testDescription);
    
    // Global states
    const [testIsSuccess, setTestIsSuccess] = useState();
    const [testTimeValue, setTestTimeValue] = useState();

    useEffect(() => {
        // Run checks for type test
        if (props.type === "test") {
            // Check all edge cases for invalid values and set the value of the states properly
            const totalTests = parseInt(props.subtestAmount);
            const successValue = parseInt(props.subtestSuccessValue);
            const testDuration = parseInt(props.testTime);
    
            // Check for invalid values
            if (
                totalTests < 0 || 
                successValue < 0 || 
                totalTests < successValue ||
                testDuration < 0) {
                throw console.error("Invalid values");
            } else {
                setSubtestAmount(totalTests);
                setSubtestSuccessValue(successValue);
                setTestTimeValue(parseInt(testDuration / 60000) + " min");
            }
            
            // Check for passed test
            if (successValue < totalTests) {
                setTestIsSuccess(false);
            } else {
                setTestIsSuccess(true);    
            }
        } else if (props.type === "subtest") {
            const testDuration = parseInt(props.testTime);

            // Check for invalid values
            if (testDuration < 0) {
                throw console.error("Invalid values");
            } else {
                setTestTimeValue(parseInt(testDuration / 60000) + " min");
            }

            if (props.success) {
                setTestIsSuccess(true);
            } else {
                setTestIsSuccess(false);
            }
        }
    },[]);

    // render "test" component
    if (props.type === "test") {
        const handleDetailsOnClick = () => {
            setIsDetailsVisible(!isDetailsVisible);
        }
    
        return (
            <div className='test-info-container'>
                <div className='test-id'>
                    <p>TCM {testIdValue.substring(0, 8) + "..."}</p>
                </div>
                <div className='test-time'>
                    <img src='/images/icons/TimerIcon.svg' alt="test time icon" />
                    <p>{testTimeValue}</p>
                </div>
                <div className='subtest-success'>
                    <img src='/images/icons/FlagIcon.svg' alt="subtest success rate icon" />
                    <p>{subtestSuccessValue} / {subtestAmount}</p>
                </div>
                <div className='test-success'>
                    {testIsSuccess === true ? (
                        <>
                            <p className='success-text state-text'>Success</p>
                            <img src='/images/icons/CheckRingIcon.svg' alt="test success icon" />
                        </>
                    ) : (
                        <>
                            <p className='failed-text state-text'>Failed</p>
                            <img src='/images/icons/FailedRingIcon.svg' alt="test success icon" />
                        </>
                    )}
                </div>
                <div className='details-button' onClick={handleDetailsOnClick}>
                    <p className='details-text'>Details</p>
                    <img src='/images/icons/Expand_right_stop.svg' alt={`${testIdValue} details`} />
                </div>
    
                {isDetailsVisible && <TestDetails
                                        idValue={testIdValue}
                                        dateValue={props.testDate}
                                        testTimeValue={testTimeValue}
                                        successValue={`${subtestSuccessValue}/${subtestAmount}`}
                                        subtestsValue={props.subtestValue}
                                        handleOnClick={handleDetailsOnClick}>
                                     </TestDetails>}
            </div>
        );
    } else if (props.type === "subtest") {
        return(
            <div className='sub-test-container'>
                <div className='main-items-wrapper'>
                    <div className='test-title'>
                        <p>{testTitle}</p>
                    </div>
                    <div className='test-time'>
                        <img src='/images/icons/TimerIcon.svg' alt="test time icon" />
                        <p>{testTimeValue}</p>
                    </div>
                    <div className='test-success'>
                        {testIsSuccess === true ? (
                            <>
                                <p className='success-text state-text'>Success</p>
                                <img src='/images/icons/CheckRingIcon.svg' alt="test success icon" />
                            </>
                        ) : (
                            <>
                                <p className='failed-text state-text'>Failed</p>
                                <img src='/images/icons/FailedRingIcon.svg' alt="test success icon" />
                            </>
                        )}
                    </div>
                </div>
                <div className='description-wrapper'>
                    <p className='description-text'>{subtestDescription}</p>
                </div>
            </div>
        )
    }
}

export default TestInfo;