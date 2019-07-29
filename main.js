function sendAjax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var repos = JSON.parse(this.responseText);
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