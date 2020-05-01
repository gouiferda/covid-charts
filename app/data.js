

async function getDataCovid(dataType, country) {

    var apiLink = '';


    if (dataType == 'history')
        apiLink = 'https://disease.sh/v2/historical';
    if (dataType == 'today')
        apiLink = 'https://disease.sh/v2/countries';
    apiLink += '/' + country;

    return getJSONData(apiLink);
}

async function getDataCountry(country) {

    var apiLink = '';
    apiLink = 'https://restcountries.eu/rest/v2/alpha';
    apiLink += '/' + country;

    return getJSONData(apiLink);
}
