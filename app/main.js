var citiesArr = [
    "morocco",
    "china",
    "usa",
    "italy",
    "spain",
    "germany",
    "iran",
    "japan",
    "uk",
    "algeria",
    "france",
];

var selectCountry = document.getElementById('selectCountry');
for (var i = 0; i < citiesArr.length; i++) {
    var option = document.createElement("option");
    option.text = ucf(citiesArr[i]);
    option.value = citiesArr[i];
    if (citiesArr[i] == 'morocco')
        option.selected = 'selected';
    selectCountry.appendChild(option);
}

var chosenCountry = 'morocco';

getHistoryChart();
getTodayChart();

function setCountry(val) {
    chosenCountry = val;

    getHistoryChart();
    getTodayChart();
}

function getDate(unix_timestamp) {
    var date = new Date(unix_timestamp);
    return date.toLocaleString();
}

// async function
async function getData(dataType, country) {

    var apiLink = '';

    if (dataType == 'history')
        apiLink = 'https://corona.lmao.ninja/v2/historical';
    if (dataType == 'today')
        apiLink = 'https://corona.lmao.ninja/countries';

    apiLink += '/' + country;

    // await response of fetch call
    let response = await fetch(apiLink);
    // only proceed once promise is resolved
    let data = await response.json();
    return data;
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
                    text: 'Total cases: ' + data.cases
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

        var countryInfo = document.getElementById('countryInfo');
        var countryInfoText = '';

        var countryImg = document.getElementById('countryImg');
        countryImg.src = data.countryInfo.flag;

        countryInfoText += '<ul class="list-group list-group-flush">';
        countryInfoText += '<li class="list-group-item">'+ucf(chosenCountry)+'</li> ';
        // countryInfoText += '<li class="list-group-item">Dapibus ac facilisis in</li> ';
        // countryInfoText += '<li class="list-group-item">Vestibulum at eros</li> ';
        countryInfoText += '</ul> ';
       

        countryInfo.innerHTML = countryInfoText;

    });
} 

function ucf(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function getHistoryChart() {
    getData('history', chosenCountry).then(data => {


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
