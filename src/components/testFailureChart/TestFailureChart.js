import { useEffect, useState } from 'react';
import './TestFailureChart.css';
import { BarController, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import config from '../../config.json';

ChartJS.register(LinearScale, CategoryScale, BarElement)

function TestFailureChart() {
    const [failureChart, setFailureChart] = useState();

    useEffect(() => {
        // Get all reports from API
        fetch(`${config.ENVIRONMENT}/report`, {
            headers: {
                'Authorization': "Bearer " + config.TEMPSTATICKEY
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            let failedTestsMap = {};

            // Count all different test failures
            data.map(report => {
                report.tests.map(test => {
                    if (!test.successful) {
                        if (failedTestsMap[test.name] === undefined) {
                            failedTestsMap[test.name] = 1;
                        } else {
                            failedTestsMap[test.name]++;
                        }
                    }
                })
            })

            let chartLabels = [];
            let chartValues = [];
            
            Object.keys(failedTestsMap).map(key => {
                chartLabels.push(key);
                chartValues.push(failedTestsMap[key]);
            })

            // Set chartData
            const chartData = {
                labels: chartLabels,
                datasets: [{
                    label: "Amount",
                    backgroundColor: '#EA3354',
                    borderColor: '#EA3354',
                    borderWidth: 1,
                    hoverBackgroundColor: '#EA3354',
                    hoverBorderColor: '#EA3354',
                    data: chartValues,
                }]
            }

            // Make chart scalable
            const chartOptions = {
                maintainAspectRatio: false
            }
    
            // Create Bar chart
            setFailureChart(
                <Bar data={chartData} options={chartOptions}></Bar>
            )
        }).catch(err => {
            setFailureChart(
                <p className='chart-data-not-found'>No test data found!</p>
            )
        })
    }, []);

    return (
        <div className='failure-chart-container'>
            {failureChart}
        </div>
    )
}

export default TestFailureChart;