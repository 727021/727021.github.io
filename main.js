// const DEBUG = false;

// function compare(a, b) {
//     let dA = Date.parse(a.updated_at);
//     let dB = Date.parse(b.updated_at);
//     if (dA > dB) return -1;
//     if (dB > dA) return 1;
//     return 0;
// }

// function sendAjax() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var repos = JSON.parse(this.responseText);
//             if (DEBUG) console.log(this.responseText);
//             repos.sort(function(a, b) {
//                 return Date.parse(b.updated_at) - Date.parse(a.updated_at);
//             }); // Sort by updated_at
//             var main = document.getElementsByTagName("main")[0];
//             while (main.firstChild != null)
//                 main.removeChild(main.firstChild);
//             repos.forEach(repo => {
//                 var section = document.createElement("section");
//                 var repoName = document.createElement("span");
//                 repoName.appendChild(document.createTextNode(repo.name))
//                 repoName.classList.add("repoName");
//                 repoName.onclick = function() {
//                     window.location = repo.html_url;
//                 }
//                 section.appendChild(repoName);
//                 section.onclick = function(e) {
//                     if (e.target != this) return;
//                     window.location = repo.html_url;
//                 }
//                 var star = document.createElement("i");
//                 star.classList.add("fas");
//                 star.classList.add("fa-star");
//                 star.classList.add("gitStar");
//                 star.onclick = function() {
//                     window.location = `${repo.html_url}/stargazers`;
//                 }
//                 star.title = "Stargazers";
//                 var sg = document.createElement("sub");
//                 sg.appendChild(document.createTextNode(repo.stargazers_count));
//                 star.appendChild(sg);
//                 section.appendChild(star);
//                 var fork = document.createElement("i");
//                 fork.classList.add("fas");
//                 fork.classList.add("fa-code-branch");
//                 fork.classList.add("gitFork");
//                 fork.onclick = function() {
//                     window.location = `${repo.html_url}/network/members`;
//                 }
//                 fork.title = "Forks";
//                 var f = document.createElement("sub");
//                 f.appendChild(document.createTextNode(repo.forks_count));
//                 fork.appendChild(f);
//                 section.appendChild(fork);
//                 main.appendChild(section);
//             });
//         }
//     }
//     xhttp.open("GET", "https://api.github.com/users/727021/repos", true);
//     xhttp.send();
// }
// sendAjax();