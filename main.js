const DEBUG = false;

/**
 * html_url
 * description?
 * updated_at
 * stargazers_count
 * forks_count
 * html_url /network/members
 * html_url /stargazers
 */

function compare(a, b) {
    let dA = Date.parse(a.updated_at);
    let dB = Date.parse(b.updated_at);
    if (dA > dB) return -1;
    if (dB > dA) return 1;
    return 0;
}

function sendAjax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var repos = JSON.parse(this.responseText);
            if (DEBUG) console.log(this.responseText);
            repos.sort(function(a, b) {
                return Date.parse(b.updated_at) - Date.parse(a.updated_at);
            }); // Sort by updated_at
            var cs = [];
            var cpp = [];
            var java = [];
            var web = [];
            var other = [];
            for (let i = 0; i < repos.length; i++) {
                switch (repos[i].language) {
                    case "C#":
                        cs.push(repos[i]);
                        break;
                    case "C++":
                        cpp.push(repos[i]);
                        break;
                    case "Java":
                        java.push(repos[i]);
                        break;
                    case "HTML":
                    case "CSS":
                    case "PHP":
                    case "JavaScript":
                    case "Hack":
                        web.push(repos[i]);
                        break;
                    default:
                        other.push(repos[i]);
                        break;
                }
            }
        }
    }
    xhttp.open("GET", "https://api.github.com/users/727021/repos", true);
    xhttp.send();
}
sendAjax();

function popCsharp(arr) {

}

function popCplusplus(arr) {

}

function popJava(arr) {

}

function popWeb(arr) {

}

function popOther(arr) {

}