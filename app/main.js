

function setCountry(val) {
    chosenCountry = val;

    getHistoryChart();
    getTodayChart();
}



function getTodayChart() {
    getDataCovid('today', chosenCountry).then(data => {

        drawChart('pie',data,'canvasPie');
        
        var updated = document.getElementById('updated');
        updated.innerHTML = getDate(data.updated);

        var countryImg = document.getElementById('countryImg');
        countryImg.src = data.countryInfo.flag;

        var countryName = document.getElementById('countryName');
        countryName.innerHTML = ucf(chosenCountry);
        

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


        drawChart('line',data,'canvasLine');

    });
}
