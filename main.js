function sendAjax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            var repos = JSON.parse(this.responseText);
            repos.forEach(repo => {
                // This is temporary
                var a = document.createElement("a");
                a.setAttribute("href", repo.html_url);
                a.appendChild(document.createTextNode(repo.name));
                document.getElementsByTagName("main")[0].appendChild(a);
                document.getElementsByTagName("main")[0].appendChild(document.createElement("br"));
            });
        }
    }
    xhttp.open("GET", "https://api.github.com/users/727021/repos", true);
    xhttp.send();
}
sendAjax();