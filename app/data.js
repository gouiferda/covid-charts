

async function getDataCovid(dataType, country) {

    var apiLink = '';


    if (dataType == 'history')
        apiLink = 'https://corona.lmao.ninja/v2/historical';
    if (dataType == 'today')
        apiLink = 'https://corona.lmao.ninja/countries';
    apiLink += '/' + country;

    return getJSONData(apiLink);
}

async function getDataCountry(country) {

    var apiLink = '';
    apiLink = 'https://restcountries.eu/rest/v2/alpha';
    apiLink += '/' + country;

    return getJSONData(apiLink);
}
