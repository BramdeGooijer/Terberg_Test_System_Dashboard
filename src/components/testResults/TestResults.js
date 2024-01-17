import "./TestResults.css";
import TestInfo from '../../components/TestInfo/TestInfo';
import { useEffect, useState } from "react";

function TestResults({type, from, till, results}) {
    const [resultsData, setResultsData] = useState(results);
    const [resultItems, setResultItems] = useState();

    useEffect(() => {
        if (resultsData) {
            const monthNames = [
                "Januari", 
                "Februari", 
                "Maart", 
                "April", 
                "Mei", 
                "Juni", 
                "Juli", 
                "Augustus", 
                "September", 
                "Oktober", 
                "November", 
                "December"];

            // Sort by date
            resultsData.sort((a, b) => {
                return new Date(b.testDate) - new Date(a.testDate);
            });

            // Map through tests and group them by date
            let currentDate;
            setResultItems(resultsData.map((test) => {
                // Get all needed date objects
                const testDateObject = new Date(test.testDate);
                const fromDate = new Date(from);
                const tillDate = new Date(till);
                tillDate.setDate(tillDate.getDate() + 1);

                // Guard clause for from filter
                if (fromDate > testDateObject) {
                    return;
                }

                // Guard clause for till filter
                if (tillDate < testDateObject) {
                    return;
                }
               
                
                let totalTimeInMilliseconds = 0;
                let totalSubTestAmount = 0;
                let totalSuccessAmount = 0;
        
                // Count time, success and amount of tests
                test.tests.map((subTest) => {
                    totalTimeInMilliseconds += subTest.testDurationInMilliseconds;
    
                    if (subTest.successful) {
                        totalSuccessAmount++;
                    }
    
                    totalSubTestAmount++;
                });

                // Guard clause for failed and successful tests
                if (type === "Failed" && totalSubTestAmount === totalSuccessAmount) {
                    return;
                }

                if (type === "Successful" && totalSubTestAmount !== totalSuccessAmount) {
                    return;
                }

                // Create a group if the test has a new date
                if (currentDate !== `${testDateObject.getDate()} ${monthNames[testDateObject.getMonth()]} ${testDateObject.getFullYear()}`) {
                    currentDate = `${testDateObject.getDate()} ${monthNames[testDateObject.getMonth()]} ${testDateObject.getFullYear()}`;
                    return(
                        <>
                            <p className="test-group-title">{currentDate}</p>
                            <TestInfo
                            key={test.id}
                            type="test"
                            testId={test.id}
                            testDate={test.testDate}
                            testTime={totalTimeInMilliseconds}
                            subtestAmount={totalSubTestAmount}
                            subtestSuccessValue={totalSuccessAmount}
                            subtestValue={test.tests}
                            >
                            </TestInfo>
                        </>
                    )
                }

                // Add test info to group
                return(
                    <TestInfo
                        key={test.id}
                        type="test"
                        testId={test.id}
                        testDate={test.testDate}
                        testTime={totalTimeInMilliseconds}
                        subtestAmount={totalSubTestAmount}
                        subtestSuccessValue={totalSuccessAmount}
                        subtestValue={test.tests}
                    >
                    </TestInfo>
                );
            }));
        }
    }, [type, from, till])

    return (
        <div className="results-container">
            <div className="test-group-container">
                {resultItems}
            </div>
        </div>
    )
}

export default TestResults;