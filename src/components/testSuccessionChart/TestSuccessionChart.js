import './TestSuccessionChart.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import config from '../../config.json'

ChartJS.register(ArcElement, Tooltip, Legend);

function TestSuccessionChart() {
    const [successionChart, setSuccessionChart] = useState();

    useEffect(() => {
        // Get all test reports from API
        fetch(`${config.ENVIRONMENT}/report`, {
            headers: {
                'Authorization': 'Bearer ' + config.TEMPSTATICKEY
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((data) => {
            // Count passed/failed tests
            let passedTests = 0;
            let failedTests = 0;
            data.map(report => {
                report.tests.map(test => {
                    if (test.successful === true) {
                        passedTests++;
                    } else if (test.successful === false) {
                        failedTests++;
                    }
                })
            })

            // Set chartData for passed/failure rate
            const chartData = {
                labels: [
                    'Failed',
                    'Completed'
                  ],
                  datasets: [{
                    label: 'Amount',
                    data: [failedTests, passedTests],
                    backgroundColor: [
                      '#EA3354',
                      '#357AF6'
                    ],
                    borderWidth: 5,
                    hoverBorderWidth: 0
                  }
                ]
            };

            // Set Chart plugins for center text
            const chartPlugins = [{
                afterDraw: function(chart) {
                    var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
        
                    ctx.restore();
                    var titleFontSize = (height / 17).toFixed(2);
                    ctx.font = titleFontSize + "px roboto-regular";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "#8C8C8C"
        
                    var titleText = "Total tests";
                    var titleX = Math.round((width - ctx.measureText(titleText).width) / 2);
                    var titleY = height / 2 - 10;
        
                    ctx.fillText(titleText, titleX, titleY);
        
                    var amountFontSize = (height / 10).toFixed(2);
                    ctx.font = amountFontSize + "px roboto-bold";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "black"
        
                    var amountText = data.length;
                    var amountX = Math.round((width - ctx.measureText(amountText).width) / 2);
                    var amountY = height / 2 + 15;
        
                    ctx.fillText(amountText, amountX, amountY);
                    ctx.save();
                }
            }];

            // Create the Doughnut chart
            setSuccessionChart(
                <Doughnut data={chartData} options={chartOptions} plugins={chartPlugins} />
            )
        })
        .catch(err => {
            setSuccessionChart(
                <p className='chart-data-not-found'>No test data found!</p>
            )
        })
    }, [])

    const chartOptions = {
        cutout: '65%',
        plugins: {
            legend: {
                display: false
            }
        },
        aspectRatio: 1
    }

    return (
        <div className='chart-container'>
            <div className='chart-wrapper'>
                {successionChart}
            </div>
            <div className='chart-legend'>
                <div className='completed legenda-item'>
                    <div className='completed-square'></div>
                    <p className='legend-text'>Completed</p>
                </div>
                <div className='failed legenda-item'>
                <div className='failed-square'></div>
                    <p className='legend-text'>Failed</p>
                </div>
            </div>
        </div>
    )
}

export default TestSuccessionChart;