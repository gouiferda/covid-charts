

function setCountry(val) {
    chosenCountry = val;

    getHistoryChart();
    getTodayChart();
}



function getTodayChart() {
    getData('today', chosenCountry).then(data => {

        var ctx = document.getElementById('canvasPie').getContext('2d');

        var configPie = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        data.active,
                        data.recovered,
                        data.deaths
                    ],
                    backgroundColor: [
                        window.chartColors.orange,
                        window.chartColors.green,
                        window.chartColors.red
                    ],
                    label: 'Total cases: ' + data.cases
                }],
                labels: [
                    'Active cases (' + data.active + ')',
                    'Recovered cases (' + data.recovered + ')',
                    'Deaths cases (' + data.deaths + ')'
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Total cases: ' + betterNumbers(data.cases)
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

                            return " " + data.labels[tooltipItem.index] + " : " + percentage + "%";
                        }
                    }
                }
            }
        };

        if (window.myPie) window.myPie.destroy();
        window.myPie = new Chart(ctx, configPie);

        var updated = document.getElementById('updated');
        updated.innerHTML = getDate(data.updated);



        var countryImg = document.getElementById('countryImg');
        countryImg.src = data.countryInfo.flag;

        var countryName = document.getElementById('countryName');
        countryName.innerHTML = ucf(chosenCountry);

        //     countryInfoText += '<ul class="list-group list-group-flush">';
        //    // countryInfoText += '<li class="list-group-item">'+ucf(chosenCountry)+'</li> ';
        //      countryInfoText += '<li class="list-group-item">Dapibus ac facilisis in</li> ';
        //     // countryInfoText += '<li class="list-group-item">Vestibulum at eros</li> ';
        //     countryInfoText += '</ul> ';
        

    });

}


function getCountryInfo() {

    getDataCountry(chosenCountry).then(data => {
        // console.log(data[0].population);
        var population = data[0].population;

        var countryInfoText = '';
        countryInfoText += 'Population: ' + betterNumbers(population);
        appendInside(countryInfoText,'countryInfo');

    });

}


function getHistoryChart() {
    getDataCovid('history', chosenCountry).then(data => {


        var ctx = document.getElementById('canvasLine').getContext('2d');

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

        var configLine = {
            type: 'line',
            data: {
                labels: Object.keys(data.timeline.cases),
                datasets: [
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
                        backgroundColor: window.chartColors.black,
                        borderColor: window.chartColors.black,
                        data: newCases, //
                        fill: false,
                    }
                ]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Progress of cases'
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

        if (window.myLine) window.myLine.destroy();
        window.myLine = new Chart(ctx, configLine);
    });
}
