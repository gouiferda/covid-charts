

function setCountry(val) {
    chosenCountry = val;

    getHistoryChart();
    getTodayChart();

getCountryInfo();
}

function getListItem(text,nb,className)
{
    var ret = '';
    ret += '<li class="list-group-item d-flex justify-content-between align-items-center">';
    ret += text;
    ret += '<span class="badge badge-'+className+'">';
    ret += nb;
    ret += '</span>';
    ret += '</li>';
    return ret;
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
        var redClass = 'danger';
        var orangeClass = 'warning';
        var greenClass = 'success';
        var blueClass = 'primary';
        var darkClass = 'dark';
        var lightClass = ' light';

        countryInfoText += '<div class="row">';
        countryInfoText += '<div class="col">';
        countryInfoText += '<ul class="list-group">';
        countryInfoText += getListItem('Total positive cases',betterNumbers(totalCases),darkClass);
        countryInfoText += getListItem('Active cases',betterNumbers(activeCases),orangeClass);
        countryInfoText += getListItem('Deaths',betterNumbers(deathsCases),redClass);
        countryInfoText += getListItem('Recovered',betterNumbers(recoveredCases),greenClass);
        countryInfoText += '</ul>';
        countryInfoText += '</div>';
        countryInfoText += '<div class="col">';
        countryInfoText += '<ul class="list-group">';
        countryInfoText += getListItem('Total tests','N/A',lightClass);
        countryInfoText += getListItem('Negative tests','N/A',lightClass);
        countryInfoText += '</ul>';
        countryInfoText += '</div>';
        countryInfoText += '</div>';


        replaceInside(countryInfoText,'countryStats');
        

    });

}


function getCountryInfo() {

    getDataCountry(chosenCountry).then(data => {
        // console.log(data[0].population);
        var population = data[0].population;

        var countryInfoText = '';
        countryInfoText += 'Population: ' + betterNumbers(population);
        replaceInside(countryInfoText,'countryInfo');

    });

}


function getHistoryChart() {
    getDataCovid('history', chosenCountry).then(data => {
        drawChart('history',data,'canvasLine');
    });
}
