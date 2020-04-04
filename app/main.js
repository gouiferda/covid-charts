

function setCountry(val) {
    chosenCountry = val;

    getHistoryChart();
    getTodayChart();
}



function getTodayChart() {
    getDataCovid('today', chosenCountry).then(data => {

        drawChart('today',data,'canvasPie');
        
        var updated = document.getElementById('updated');
        updated.innerHTML = getDate(data.updated);

        var countryImg = document.getElementById('countryImg');
        countryImg.src = data.countryInfo.flag;

        var countryName = document.getElementById('countryName');
        countryName.innerHTML = ucf(chosenCountry);

        var totalCases = parseInt(data.cases);
        var deathsCases = parseInt(data.deaths);
        var recoveredCases = parseInt(data.recovered);
        var activeCases = totalCases - (deathsCases + recoveredCases);

        var countryInfoText = '';
        countryInfoText += '<br><br>';
        countryInfoText += 'Total cases: ' + betterNumbers(totalCases);
        countryInfoText += '<br>';
        countryInfoText += 'Active cases: ' + betterNumbers(activeCases);
        countryInfoText += '<br>';
        countryInfoText += 'Deaths: ' + betterNumbers(deathsCases);
        countryInfoText += '<br>';
        countryInfoText += 'Recovered: ' + betterNumbers(recoveredCases);
        replaceInside(countryInfoText,'countryStats');
        

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
        drawChart('history',data,'canvasLine');
    });
}
