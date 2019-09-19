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
            populateTab("cs", cs);
            populateTab("cpp", cpp);
            populateTab("java", java);
            populateTab("web", web);
            populateTab("other", other);

            $('[data-toggle="tooltip"]').tooltip();
        }
    }
    xhttp.open("GET", "https://api.github.com/users/727021/repos", true);
    xhttp.send();
}
sendAjax();

function populateTab(tabId, arr) {
    if (DEBUG) {
        console.log(`In populateTab(${tabId}, arr):`);
        console.log(arr);
    }

    if (arr.length == 0) {
        $(`#${tabId}`).html("No projects.")
        return;
    }

    var tabList = $(`#${tabId} #list-tab`);
    var tabContent = $(`#${tabId} #nav-tabContent`);
    tabList.html("");
    tabContent.html("");
    arr.forEach(repo => {
        id = String(repo.id);

        tabList.append(`<a class="list-group-item list-group-item-action" id="list-${id}-list" data-toggle="list" href="#list-${id}" role="tab" aria-controls="${id}">${repo.name}</a>`);

        tabContent.append(
            `<div class="tab-pane fade" id="list-${id}" role="tabpanel" aria-labelby="list-${id}-list">
            <div class="row">
                <div class="col-8">
                    <h3>${repo.name} <small class="text-muted"><small>Updated ${new Date(repo.updated_at).toLocaleDateString("en-US", {day: "numeric", year: "numeric", month: "short"})}</small></small></h3>
                    </div>
                    <div class="col-4">
                        <div class="btn-toolbar float-right" role="toolbar">
                            <div class="btn-group mr-2" role="group">
                                <a target="_blank" data-toggle="tooltip" data-placement="top" title="Stargazers" role="button" class="btn btn-secondary" href="${repo.html_url}/stargazers"><i class="fas fa-star"><sub>${repo.stargazers_count}</sub></i></a>
                                <a target="_blank" data-toggle="tooltip" data-placement="top" title="Forks" role="button" class="btn btn-secondary" href="${repo.html_url}/network/members"><i class="fas fa-code-branch"><sub>${repo.forks_count}</sub></i></a>
                                <a target="_blank" data-toggle="tooltip" data-placement="top" title="Source" role="button" class="btn btn-primary" href="${repo.html_url}"><i class="fas fa-code"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                ${(repo.description == null) ? "" : repo.description}
            </div>`
        );
    });
}