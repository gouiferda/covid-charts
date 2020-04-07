
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

var selectCountry = document.getElementById('selectCountry');
for (var i = 0; i < citiesArr.length; i++) {
    var option = document.createElement("option");
    option.text = ucf(citiesArr[i]);
    option.value = citiesArr[i];
    if (citiesArr[i] == 'morocco')
        option.selected = 'selected';
    selectCountry.appendChild(option);
}

var loadingTxt = '<p class="text-center">Loading...</p>';

var loadingImgSrc = 'assets/img/gifs/placeholder.gif';

var isDarkTheme = false;
var chosenCountry = 'morocco';
getHistoryAndNewCasesCharts();
getTodayCasesAndCountryData();
setChartLoading(loadingTxt);
setCountryName(chosenCountry);

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
    ret += '<li class="list-group-item d-flex justify-content-between align-items-center">';
    ret += text;
    //ret += '<span class="badge badge-'+className+'">';
    ret += '<span>';
    ret += nb;
    ret += '</span>';
    ret += '</li>';
    return ret;
}

function showTodayStats(data, elemId) {
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
    var lightClass = ' light';

    countryInfoText += '<div class="row">';

    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Today cases', betterNumbers(todayCases), lightClass);
    countryInfoText += getListItem('Today deaths', betterNumbers(todayDeaths), lightClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';

    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Total tests', betterNumbers(totalTests), lightClass);
    countryInfoText += getListItem('Positive tests (' + getPercentage(totalCases, totalTests, 2) + ')', betterNumbers(totalCases), lightClass);
    countryInfoText += getListItem('Negative tests (' + getPercentage(negativeTests, totalTests, 2) + ')', betterNumbers(negativeTests), lightClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';


    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Total cases', betterNumbers(totalCases), darkClass);
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

    getDataCountry(chosenCountry).then(d => {


        var population = d[0].population;
        var totalCases = parseInt(data.cases);
        var countryInfoText2 = '';

        var casesPerOneMillion = parseInt(data.casesPerOneMillion);
        var deathsPerOneMillion = parseInt(data.deathsPerOneMillion);

        countryInfoText2 += '<ul class="list-group">';
        countryInfoText2 += getListItem('Population', betterNumbers(population), '');
        countryInfoText2 += getListItem('Cases', betterNumbers(totalCases), '');
        countryInfoText2 += getListItem('Percentage', getPercentage(totalCases, population, 4), '');
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



// function getTodayChart() {

//     replaceInside(loadingTxt, 'countryStats');

//     getDataCovid('today', chosenCountry).then(data => {

//         drawChart('today', data, 'canvasPie');

//         var updated = document.getElementById('updated');
//         updated.innerHTML = getDate(data.updated);

//         var countryImg = document.getElementById('countryImg');
//         countryImg.src = data.countryInfo.flag;

//         var countryName = document.getElementById('countryName');
//         countryName.innerHTML = ucf(chosenCountry);

//         var totalCases = parseInt(data.cases);
//         var deathsCases = parseInt(data.deaths);
//         var recoveredCases = parseInt(data.recovered);
//         var activeCases = totalCases - (deathsCases + recoveredCases);

//         var totalTests = parseInt(data.tests);
//         var negativeTests = parseInt(data.tests) - parseInt(data.cases);
//         var todayDeaths = parseInt(data.todayDeaths);
//         var todayCases = parseInt(data.todayCases);

//         var criticalCases = parseInt(data.critical);




//         var countryInfoText = '';
//         var redClass = 'danger';
//         var orangeClass = 'warning';
//         var greenClass = 'success';
//         var blueClass = 'primary';
//         var darkClass = 'dark';
//         var lightClass = ' light';

//         countryInfoText += '<div class="row">';

//         countryInfoText += '<div class="col">';
//         countryInfoText += '<ul class="list-group">';
//         countryInfoText += getListItem('Today cases', betterNumbers(todayCases), lightClass);
//         countryInfoText += getListItem('Today deaths', betterNumbers(todayDeaths), lightClass);
//         countryInfoText += '</ul>';
//         countryInfoText += '</div>';

//         countryInfoText += '<div class="col">';
//         countryInfoText += '<ul class="list-group">';
//         countryInfoText += getListItem('Total tests', betterNumbers(totalTests), lightClass);
//         countryInfoText += getListItem('Positive tests (' + getPercentage(totalCases, totalTests, 2) + ')', betterNumbers(totalCases), lightClass);
//         countryInfoText += getListItem('Negative tests (' + getPercentage(negativeTests, totalTests, 2) + ')', betterNumbers(negativeTests), lightClass);
//         countryInfoText += '</ul>';
//         countryInfoText += '</div>';


//         countryInfoText += '<div class="col">';
//         countryInfoText += '<ul class="list-group">';
//         countryInfoText += getListItem('Total cases', betterNumbers(totalCases), darkClass);
//         countryInfoText += getListItem('Active cases (' + getPercentage(activeCases, totalCases, 2) + ')', betterNumbers(activeCases), orangeClass);
//         countryInfoText += getListItem('Deaths (' + getPercentage(deathsCases, totalCases, 2) + ')', betterNumbers(deathsCases), redClass);
//         countryInfoText += getListItem('Recovered (' + getPercentage(recoveredCases, totalCases, 2) + ')', betterNumbers(recoveredCases), greenClass);
//         countryInfoText += getListItem('Critical (' + getPercentage(criticalCases, totalCases, 2) + ')', betterNumbers(criticalCases), greenClass);
//         countryInfoText += '</ul>';
//         countryInfoText += '</div>';


//         countryInfoText += '</div>';


//         replaceInside(countryInfoText, 'countryStats');


//     });

// }


// function getCountryInfo() {

//     replaceInside(loadingTxt, 'countryInfo');

//     getDataCountry(chosenCountry).then(data => {
//         // console.log(data[0].population);
//         var population = data[0].population;

//         var countryInfoText = '';

//         getDataCovid('today', chosenCountry).then(d => {
//             var totalCases = d.cases;
//             var casesPerOneMillion = parseInt(d.casesPerOneMillion);
//             var deathsPerOneMillion = parseInt(d.deathsPerOneMillion);

//             countryInfoText += '<ul class="list-group">';
//             countryInfoText += getListItem('Population', betterNumbers(population), '');
//             countryInfoText += getListItem('Cases', betterNumbers(totalCases), '');
//             countryInfoText += getListItem('Percentage', getPercentage(totalCases, population, 4), '');
//             countryInfoText += getListItem('Cases per 1M', betterNumbers(casesPerOneMillion), '');
//             countryInfoText += getListItem('Deaths per 1M', betterNumbers(deathsPerOneMillion), '');
//             countryInfoText += '</ul>';


//             replaceInside(countryInfoText, 'countryInfo');
//         });


//     });

// }