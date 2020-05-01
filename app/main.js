
var loadingTxt = '<p class="text-center">Loading...</p>';
var loadingImgSrc = 'assets/img/gifs/placeholder.gif';



var gotCountry = findGetParameter('country');
if (getCountryByCode(gotCountry) == 'N/A') gotCountry = null;

//var gotLang = findGetParameter('lang');


var chosenCountry = (gotCountry != null) ? gotCountry : 'ma'; //
getHistoryAndNewCasesCharts();
getTodayCasesAndCountryData();
setChartLoading(loadingTxt);
setCountryName(chosenCountry);

var selectCountry = document.getElementById('selectCountry');

// for (var i = 0; i < citiesArr.length; i++) {
//     var option = document.createElement("option");
//     option.text = ucf(citiesArr[i]);
//     option.value = citiesArr[i];
//     if (citiesArr[i] == 'morocco')
//         option.selected = 'selected';
//     selectCountry.appendChild(option);
// }


for(var c in countriesList)
{
     //console.log(c + "=" + countriesList[c]);
   var option = document.createElement("option");
    option.text = c;
    option.value = countriesList[c];
    if (countriesList[c] == 'ma')
        option.selected = 'selected';
    selectCountry.appendChild(option);
}


selectElement('selectCountry', chosenCountry);

function setCountry(val) {
    chosenCountry = val;

    getHistoryAndNewCasesCharts();
    getTodayCasesAndCountryData();
    setChartLoading(loadingTxt);
    setCountryName(chosenCountry);
}


function getCountryByCode(code) {
    for(var c in countriesList)
    {
        if (code == countriesList[c]) return c;
         //console.log(c + "=" + countriesList[c]);
    }
    return 'N/A';
    
}

function setCountryName(val) {
    var countryName = getCountryByCode(val);
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

    ret += '<small>';
    ret += text;

    ret += '</small>';
    ret += '<span>';
    ret += '<small>';
    ret += nb;
    ret += '</small>';
    ret += '</span>';
    ret += '</li>';
    return ret;
}

function showToDateStats(data, elemId) {

    if (!issetObj(data) || !issetElem(elemId)) return;


    replaceInside(getDate(data.updated), 'updated');

    replaceImg(data.countryInfo.flag, 'countryImg');

    replaceInside(ucf(chosenCountry), 'countryName');


    var totalCases = parseInt(data.cases);
    var deathsCases = parseInt(data.deaths);
    var recoveredCases = parseInt(data.recovered);
    var activeCases = totalCases - (deathsCases + recoveredCases);


    var criticalCases = parseInt(data.critical);

    //toDateStats 
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
    countryInfoText += getListItem('Total cases', betterNumbers(totalCases), secClass);
    countryInfoText += getListItem('Active cases (' + getPercentage(activeCases, totalCases, 2) + ')', betterNumbers(activeCases), orangeClass);
    countryInfoText += getListItem('Total deaths (' + getPercentage(deathsCases, totalCases, 2) + ')', betterNumbers(deathsCases), redClass);
    countryInfoText += getListItem('Total recovered (' + getPercentage(recoveredCases, totalCases, 2) + ')', betterNumbers(recoveredCases), greenClass);
    countryInfoText += getListItem('Total critical (' + getPercentage(criticalCases, totalCases, 2) + ')', betterNumbers(criticalCases), greenClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';

    countryInfoText += '</div>';
    replaceInside(countryInfoText, elemId);
    setChartLoading('');
}

function showTestsStats(data, elemId) {

    if (!issetObj(data) || !issetElem(elemId)) return;


    replaceInside(getDate(data.updated), 'updated');

    replaceImg(data.countryInfo.flag, 'countryImg');

    replaceInside(getCountryByCode(chosenCountry), 'countryName');


    var totalCases = parseInt(data.cases);
    var totalTests = parseInt(data.tests);
    var negativeTests = parseInt(data.tests) - parseInt(data.cases);

    //toDateStats 
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
    countryInfoText += getListItem('Total tests', betterNumbers(totalTests), secClass);
    countryInfoText += getListItem('Positive tests (' + getPercentage(totalCases, totalTests, 2) + ')', betterNumbers(totalCases), lightClass);
    countryInfoText += getListItem('Negative tests (' + getPercentage(negativeTests, totalTests, 2) + ')', betterNumbers(negativeTests), lightClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';



    countryInfoText += '</div>';
    replaceInside(countryInfoText, elemId);
    setChartLoading('');
}

function showTodayStats(data, elemId) {

    if (!issetObj(data) || !issetElem(elemId)) return;

    var todayDeaths = parseInt(data.todayDeaths);
    var todayCases = parseInt(data.todayCases);


    //toDateStats 
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
    countryInfoText += getListItem('Today cases', betterNumbers(todayCases), lightClass);
    countryInfoText += getListItem('Today deaths', betterNumbers(todayDeaths), lightClass);
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

        var population = d.population;
        var totalCases = parseInt(data.cases);
        var totalTested = parseInt(data.tests);
        var countryInfoText2 = '';

        var casesPerOneMillion = parseInt(data.casesPerOneMillion);
        var deathsPerOneMillion = parseInt(data.deathsPerOneMillion);

        countryInfoText2 += '<ul class="list-group">';
        countryInfoText2 += getListItem('Population', abbreviate(population, 2, false, false), 'secondary');
        countryInfoText2 += getListItem('Cases', betterNumbers(totalCases), '');
        countryInfoText2 += getListItem('Tested percentage', getPercentage(totalTested, population, 4), '');
        countryInfoText2 += getListItem('Affected percentage', getPercentage(totalCases, population, 4), '');
        countryInfoText2 += getListItem('Cases per 1M', betterNumbers(casesPerOneMillion), '');
        countryInfoText2 += getListItem('Deaths per 1M', betterNumbers(deathsPerOneMillion), '');
        countryInfoText2 += '</ul>';

        replaceInside(countryInfoText2, elemId);

    });

}

function getTodayCasesAndCountryData() {
    replaceInside(loadingTxt, 'toDateStats');
    replaceInside(loadingTxt, 'countryInfo');
    replaceImg(loadingImgSrc, 'countryImg');

    getDataCovid('today', chosenCountry).then(data => {

        drawChart('today', data, 'canvasPieToDate');
        drawChart('tests', data, 'canvasPieTests');
        showToDateStats(data, 'toDateStats');
        showTodayStats(data, 'todayStats');
        showTestsStats(data, 'testsStats');
        showCountryInfoAndData(data, 'countryInfo');
        setChartLoading('');
    });
}



function getHistoryAndNewCasesCharts() {
    getDataCovid('history', chosenCountry).then(data => {
        drawChart('historyCases', data, 'historyCasesChart');
        drawChart('historyNewCases', data, 'historyNewCasesChart');
        drawChart('historygrowthHistory', data, 'growthHistoryChart');
        
    });
}

