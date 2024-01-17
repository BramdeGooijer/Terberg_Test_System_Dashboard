import { useEffect, useState } from 'react';
import FilterButton from '../../components/FilterButton/FilterButton';
import NavBar from '../../components/navBar/NavBar';
import PageHeader from '../../components/pageHeader/PageHeader';
import TestFailureChart from '../../components/testFailureChart/TestFailureChart';
import TestResults from '../../components/testResults/TestResults';
import TestSuccessionChart from '../../components/testSuccessionChart/TestSuccessionChart';
import config from '../../config.json';
import './App.css'

function App() {
  const [testData, setTestData] = useState();

  const [filterValue, setFilterValue] = useState("All");
  const [fromDateValue, setFromDateValue] = useState("dd-mm-jjjj");
  const [tillDateValue, setTillDateValue] = useState("dd-mm-jjjj");

  const handleFilterChange = (newFilterValue) => {
    // console.log(newFilterValue);
    setFilterValue(newFilterValue);
  }

  const handleFromDateChange = (newFromDateValue) => {
    // console.log(newFromDateValue);
    setFromDateValue(newFromDateValue);
  }

  const handleTillDateChange = (newTillDateValue) => {
    // console.log(newTillDateValue);
    setTillDateValue(newTillDateValue);
  }

  useEffect(() => {
    fetch(`${config.ENVIRONMENT}/report`, {
      headers: {
        'Authorization': "Bearer " + config.TEMPSTATICKEY
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
    }).then(data => {
      setTestData(<TestResults 
                    results={data}
                    type={filterValue}
                    from={fromDateValue}
                    till={tillDateValue}>
                  </TestResults>);
    }).catch(err => {
      console.log(err);
    })
  }, [filterValue, fromDateValue, tillDateValue]);

  return (
    <div className='app-container'>
      <PageHeader></PageHeader>
      <div className='main-item-container'>
        <NavBar></NavBar>
        <div className='data-container'>
          <div className='test-succession container'>
            <p className='item-title'>Test succession rate</p>
            <TestSuccessionChart></TestSuccessionChart>
          </div>

          <div className='test-results'>
            <div className='results-header'>
              <p className='item-title'>Test results</p>
              <div className='filter-items'>
                <FilterButton 
                  filter="type" 
                  filterValue={filterValue} 
                  onFilterChange={handleFilterChange}>
                </FilterButton>
                <FilterButton 
                  filter="from" 
                  fromDateValue={fromDateValue} 
                  onFromDateChange={handleFromDateChange}>
                </FilterButton>
                <FilterButton 
                  filter="till" 
                  tillDateValue={tillDateValue} 
                  onTillDateChange={handleTillDateChange}>
                </FilterButton>
              </div>
            </div>

            <div className={`result-items container ${testData === undefined && "result-flex"}`}>
              {testData ? testData : <p className='chart-data-not-found'>No test data found!</p>}
            </div>
          </div>

          <div className='container'>
            <p className='item-title'>Test failure rate</p>
            <TestFailureChart></TestFailureChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
