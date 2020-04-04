

async function getData(dataType, country) {

    var apiLink = '';

    if (dataType == 'history')
        apiLink = 'https://corona.lmao.ninja/v2/historical';
    if (dataType == 'today')
        apiLink = 'https://corona.lmao.ninja/countries';

    apiLink += '/' + country;

    // await response of fetch call
    let response = await fetch(apiLink);
    // only proceed once promise is resolved
    let data = await response.json();
    return data;
}

async function getDataCountry(country) {

    var apiLink = '';

    apiLink = 'https://restcountries.eu/rest/v2/name';

    apiLink += '/' + country;

    // await response of fetch call
    let response = await fetch(apiLink);
    // only proceed once promise is resolved
    let data = await response.json();
    return data;
}
