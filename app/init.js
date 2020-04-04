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
getCountryInfo();