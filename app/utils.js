function betterNumbers(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function getDate(unix_timestamp) {
    var date = new Date(unix_timestamp);
    return date.toLocaleString();
}

function ucf(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function appendInside(txt,id) {
    var elem = document.getElementById(id);
    elem.innerHTML += txt;
}
