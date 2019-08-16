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
            repos.sort(function(a, b) {
                return Date.parse(b.updated_at) - Date.parse(a.updated_at);
            }); // Sort by updated_at
            repos.forEach(repo => {
                // Some of this is temporary
                var section = document.createElement("section");
                var a = document.createElement("a");
                a.setAttribute("href", repo.html_url);
                a.appendChild(document.createTextNode(repo.name));
                section.appendChild(a);
                document.getElementsByTagName("main")[0].appendChild(section);
            });
        }
    }
    xhttp.open("GET", "https://api.github.com/users/727021/repos", true);
    xhttp.send();
}
sendAjax();