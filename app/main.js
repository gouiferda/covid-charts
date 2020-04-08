


var loadingTxt = '<p class="text-center">Loading...</p>';
var loadingImgSrc = 'assets/img/gifs/placeholder.gif';


var citiesArr = [
    "morocco",
    "china",
    "france",
    "italy",
    "spain",
    "germany",
    "usa",
    "algeria",
    "tunisia",
    "mauritania",
    "libya",
    "egypt",
    "iran",
    "japan",
    "uk",
    "korea",
    "switzerland",
    "turkey",
    "belgium",
    "netherlands",
    "canada",
    "russia",
    "portugal"
];


var gotCountry = findGetParameter('country');
if (!(citiesArr.includes(gotCountry))) gotCountry = null;

//var gotLang = findGetParameter('lang');


var chosenCountry = (gotCountry != null) ? gotCountry : 'morocco';
getHistoryAndNewCasesCharts();
getTodayCasesAndCountryData();
setChartLoading(loadingTxt);
setCountryName(chosenCountry);

var selectCountry = document.getElementById('selectCountry');
for (var i = 0; i < citiesArr.length; i++) {
    var option = document.createElement("option");
    option.text = ucf(citiesArr[i]);
    option.value = citiesArr[i];
    if (citiesArr[i] == 'morocco')
        option.selected = 'selected';
    selectCountry.appendChild(option);
}

selectElement('selectCountry',chosenCountry);

function setCountry(val) {
    chosenCountry = val;

    getHistoryAndNewCasesCharts();
    getTodayCasesAndCountryData();
    setChartLoading(loadingTxt);
    setCountryName(chosenCountry);
}

function setCountryName(val) {
    var countryName = ucf(val);
    var elements = document.getElementsByClassName("countryName");
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = countryName;
    }
}

function setChartLoading(txt) {
    var elements = document.getElementsByClassName("chartLoading");
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = txt;
    }
}

function getListItem(text, nb, className) {
    var ret = '';
    ret += '<li class="list-group-item d-flex justify-content-between align-items-center ';
    if (className == 'secondary') {
        ret += 'bg-' + className;
    }
    ret += ' ">';
    ret += text;

    ret += '<span>';

    ret += nb;
    ret += '</span>';
    ret += '</li>';
    return ret;
}

function showTodayStats(data, elemId) {

    if (!issetObj(data) || !issetElem(elemId)) return;

    
    replaceInside(getDate(data.updated), 'updated');

    replaceImg(data.countryInfo.flag, 'countryImg');

    replaceInside(ucf(chosenCountry), 'countryName');


    var totalCases = parseInt(data.cases);
    var deathsCases = parseInt(data.deaths);
    var recoveredCases = parseInt(data.recovered);
    var activeCases = totalCases - (deathsCases + recoveredCases);

    var totalTests = parseInt(data.tests);
    var negativeTests = parseInt(data.tests) - parseInt(data.cases);
    var todayDeaths = parseInt(data.todayDeaths);
    var todayCases = parseInt(data.todayCases);

    var criticalCases = parseInt(data.critical);

    //countryStats 
    var countryInfoText = '';
    var redClass = 'danger';
    var orangeClass = 'warning';
    var greenClass = 'success';
    var blueClass = 'primary';
    var darkClass = 'dark';
    var lightClass = 'light';
    var secClass = 'secondary';

    countryInfoText += '<div class="row">';


    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Total tests', betterNumbers(totalTests), lightClass);
    countryInfoText += getListItem('Positive tests (' + getPercentage(totalCases, totalTests, 2) + ')', betterNumbers(totalCases), lightClass);
    countryInfoText += getListItem('Negative tests (' + getPercentage(negativeTests, totalTests, 2) + ')', betterNumbers(negativeTests), lightClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';


    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Today cases', betterNumbers(todayCases), lightClass);
    countryInfoText += getListItem('Today deaths', betterNumbers(todayDeaths), lightClass);
    countryInfoText += getListItem('Total cases', betterNumbers(totalCases), secClass);
    countryInfoText += getListItem('Active cases (' + getPercentage(activeCases, totalCases, 2) + ')', betterNumbers(activeCases), orangeClass);
    countryInfoText += getListItem('Deaths (' + getPercentage(deathsCases, totalCases, 2) + ')', betterNumbers(deathsCases), redClass);
    countryInfoText += getListItem('Recovered (' + getPercentage(recoveredCases, totalCases, 2) + ')', betterNumbers(recoveredCases), greenClass);
    countryInfoText += getListItem('Critical (' + getPercentage(criticalCases, totalCases, 2) + ')', betterNumbers(criticalCases), greenClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';

    countryInfoText += '</div>';
    replaceInside(countryInfoText, elemId);
    setChartLoading('');
}

function showCountryInfoAndData(data, elemId) {
    if (!issetObj(data) || !issetElem(elemId)) return;

    getDataCountry(chosenCountry).then(d => {

        if (!issetObj(d)) return;

        var population = d[0].population;
        var totalCases = parseInt(data.cases);
        var totalTested = parseInt(data.tests);
        var countryInfoText2 = '';

        var casesPerOneMillion = parseInt(data.casesPerOneMillion);
        var deathsPerOneMillion = parseInt(data.deathsPerOneMillion);

        countryInfoText2 += '<ul class="list-group">';
        countryInfoText2 += getListItem('Population', betterNumbers(population), '');
        countryInfoText2 += getListItem('Tested percentage', getPercentage(totalTested, population, 4), '');
        countryInfoText2 += getListItem('Cases', betterNumbers(totalCases), 'secondary');
        countryInfoText2 += getListItem('Affected percentage', getPercentage(totalCases, population, 4), '');
        countryInfoText2 += getListItem('Cases per 1M', betterNumbers(casesPerOneMillion), '');
        countryInfoText2 += getListItem('Deaths per 1M', betterNumbers(deathsPerOneMillion), '');
        countryInfoText2 += '</ul>';

        replaceInside(countryInfoText2, elemId);

    });

}

function getTodayCasesAndCountryData() {
    replaceInside(loadingTxt, 'countryStats');
    replaceInside(loadingTxt, 'countryInfo');
    replaceImg(loadingImgSrc, 'countryImg');

    getDataCovid('today', chosenCountry).then(data => {

        drawChart('today', data, 'canvasPie');
        showTodayStats(data, 'countryStats');

        showCountryInfoAndData(data, 'countryInfo');
        setChartLoading('');
    });
}



function getHistoryAndNewCasesCharts() {
    getDataCovid('history', chosenCountry).then(data => {
        drawChart('historyCases', data, 'historyCasesChart');
        drawChart('historyNewCases', data, 'historyNewCasesChart');
    });
}

