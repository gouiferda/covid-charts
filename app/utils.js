function betterNumbers(x) {
    if (parseInt(x) <= 0) return 'N/A';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function getDate(unix_timestamp) {
    var date = new Date(unix_timestamp);
    var dd = date.getDate();

    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var fullDate = yyyy + '-' + mm + '-' + dd;
    var fullTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return fullDate + ' ' + fullTime;
}

function ucf(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function appendInside(txt, id) {
    var elem = document.getElementById(id);
    elem.innerHTML += txt;
}

function replaceInside(txt, id) {
    var elem = document.getElementById(id);
    elem.innerHTML = txt;
}

function replaceImg(src, id) {
    var elem = document.getElementById(id);
    elem.src = src;
    // elem.style.height = '50px';
    // elem.style.width = '50px';
}

async function getJSONData(apiLink) {
    // await response of fetch call
    let response = await fetch(apiLink);
    // only proceed once promise is resolved
    let data = await response.json();
    return data;
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function getPercentage(nb, total, ad = 2) {
    if (total <= 0 || nb <= 0) return 'N/A%';
    var result = (parseInt(nb) * 100) / parseInt(total);
    return result.toFixed(ad) + '%';
}

function issetObj(val) {
    return (val != null && (typeof val !== 'undefined'));
}

function issetElem(elemId) {
    return issetObj(document.getElementById(elemId));
}


function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}



function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}