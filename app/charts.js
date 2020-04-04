

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function getLineChartConfig(labelsGot,titleGot,datasetsGot)
{
    var configLine = {
        type: 'line',
        data: {
            labels: labelsGot,
            datasets: datasetsGot
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontColor: "grey",
                    fontSize: 18
                }
            },
            title: {
                display: true,
                text: titleGot,
                fontSize: 18
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Cases'
                    }
                }]
            }
        }
    };
    return configLine;

}

function getPieChartConfig(dataGot,labelGot,labelsGot,titleGot)
{
    var configPie = {
        type: 'pie',
        data: {
            datasets: [{
                data: dataGot,
                backgroundColor: [
                    window.chartColors.orange,
                    window.chartColors.green,
                    window.chartColors.red
                ],
                label: labelGot
            }],
            labels: labelsGot
        },
        options: {
            responsive: true,
            cutoutPercentage: 50,
            legend: {
                labels: {
                    fontColor: "grey",
                    fontSize: 18
                }
            },
            title: {
                display: true,
                text: titleGot,
                fontSize: 18
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                        return " " + data.labels[tooltipItem.index] + " (" + percentage + "%)";
                    }
                }
            }
        }
    };
    return configPie;
}

function drawChart(chartType, data, canvasId) {
    var ctx = document.getElementById(canvasId).getContext('2d');

    if (chartType == 'today') {
        var configPie = getPieChartConfig(
            [
                data.active,
                data.recovered,
                data.deaths
            ],
            'Total cases: ' + data.cases,
            [
                'Active cases: ' + data.active,
                'Recovered cases: ' + data.recovered,
                'Deaths cases: ' + data.deaths
            ],
            'Total cases: ' + betterNumbers(data.cases)
        );
        if (window.myPie) window.myPie.destroy();
        window.myPie = new Chart(ctx, configPie);
    }
    else if(chartType == 'history')
    {
        var deathCases = Object.values(data.timeline.deaths);
        var recoveredCases = Object.values(data.timeline.recovered);

        var activeCases = [];
        var totalCases = Object.values(data.timeline.cases);

        var currentActiveCase = 0;
        for (var i = 0; i < totalCases.length; i++) {
            currentActiveCase = parseInt(totalCases[i]) - (parseInt(recoveredCases[i]) + parseInt(deathCases[i]));
            // console.log(currentActiveCase);
            activeCases.push(currentActiveCase);
        }

        var newCases = [];
        var prevDayTotalCases = 0;
        var newCasesThatDay = 0;
        for (var i = 0; i < totalCases.length; i++) {
            newCasesThatDay = parseInt(totalCases[i]) - prevDayTotalCases;
            // console.log(currentActiveCase);
            newCases.push(newCasesThatDay);
            prevDayTotalCases = parseInt(totalCases[i]);
        }


        var configLine = getLineChartConfig(
            Object.keys(data.timeline.cases),
            'Progress of cases',
            [
                {
                    label: 'Total cases',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: totalCases, //
                    fill: false,
                },
                {
                    label: 'Active cases',
                    backgroundColor: window.chartColors.orange,
                    borderColor: window.chartColors.orange,
                    data: activeCases, //
                    fill: false,
                },
                {
                    label: 'Death cases',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: deathCases, //
                    fill: false,
                },
                {
                    label: 'Recovered cases',
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: recoveredCases, //
                    fill: false,
                },
                {
                    label: 'New cases',
                    backgroundColor: window.chartColors.yellow,
                    borderColor: window.chartColors.yellow,
                    data: newCases, //
                    fill: false,
                }
            ],

        );
        if (window.myLine) window.myLine.destroy();
        window.myLine = new Chart(ctx, configLine);
    }
}