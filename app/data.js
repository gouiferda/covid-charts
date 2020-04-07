

async function getDataCovid(dataType, country) {

    var apiLink = '';

    //https://coronavirus-19-api.herokuapp.com/countries
    //https://corona.lmao.ninja/countries



    if (dataType == 'history')
        apiLink = 'https://corona.lmao.ninja/v2/historical';
    if (dataType == 'today')
        apiLink = 'https://corona.lmao.ninja/countries';
    apiLink += '/' + country;
    
    return getJSONData(apiLink);
}

async function getDataCountry(country) {

    var apiLink = '';
    apiLink = 'https://restcountries.eu/rest/v2/name';
    apiLink += '/' + country;

    return getJSONData(apiLink);
}
