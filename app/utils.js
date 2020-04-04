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

function appendInside(txt, id) {
    var elem = document.getElementById(id);
    elem.innerHTML += txt;
}

async function getJSONData(apiLink) {
    // await response of fetch call
    let response = await fetch(apiLink);
    // only proceed once promise is resolved
    let data = await response.json();
    return data;
}

function setTheme(theme) {
console.log('theme:'+theme);
    var btn = document.getElementById('btnTheme'); 
    var linkTheme = document.getElementById('linkTheme'); 
    switch (theme) {
        case 'dark':
            linkTheme.href = "assets/css/dark.min.css";
            btn.src='assets/img/light.png';
            btn.addEventListener('click', function() {
                setTheme('light')
            }, false);
            break;
        case 'light':
            linkTheme.href = "assets/css/bootstrap.min.css";
            btn.src='assets/img/dark.png';
            btn.addEventListener('click', function() {
                setTheme('dark')
            }, false);
            break;
    }
}