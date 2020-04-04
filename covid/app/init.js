var citiesArr = [
    "morocco",
    "china",
    "france",
    "italy",
    "spain",
    "germany",
    "algeria",
    "usa",
    "iran",
    "japan",
    "uk",
    "korea",
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

var isDarkTheme = false;
var chosenCountry = 'morocco';
getHistoryChart();
getTodayChart();
getCountryInfo();