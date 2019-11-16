import React, { Component } from 'react'
import Chart from "chart.js";

let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
//--Chart Style Options--//

export default class LineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }



    buildChart = () => {
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        const myChartRef = this.chartRef.current.getContext("2d");
        const { revenue, type, labels, title } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            plugins: [{
                beforeInit: function(chart) {
                    let data = chart.config.data;
                    for (let key in revenue) {
                        if (revenue.hasOwnProperty(key) && key !== 'total') {
                            data.datasets.push({
                                label: key,
                                data: [0,0,0,0,0,0,0,0,0,0,0,0],
                                fill: false,
                                borderColor: getRandomColor()
                            });
                            for(let month in revenue[key]){
                                if(revenue[key].hasOwnProperty(month)){
                                    data.datasets.forEach(dataset => {
                                        if(dataset.label === key){
                                            dataset.data[month] = revenue[key][month]
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }],
            type: type,
            data: {
                //Bring in data
                labels: labels,
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: title,
                    fontSize: 20,
                    fontFamily: 'Nunito',
                },
                tooltips: {
                    displayColors: false,
                    titleFontSize: 16,
                    bodyFontSize: 14,
                    xPadding: 10,
                    yPadding: 10,
                    callbacks: {
                        label: (tooltipItem, data) => {
                            return `${data.datasets[tooltipItem.datasetIndex].label}: $ ${tooltipItem.value}`
                        },

                    }
                },
            }
        });

    }

    render() {

        return (
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
        )
    }
}