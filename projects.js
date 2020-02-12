// Load projects from 'projects.json' and GitHub
$(function() {
    function bindEvents() {
        // prevent multiple bindings
        $('.collapse').unbind('show.bs.collapse').unbind('hide.bs.collapse')

        // Only open one project at a time
        $(".collapse").on('show.bs.collapse', function() {
            $(`#${$(this).attr("aria-labelledby")} #angle`).removeClass("fa-plus").addClass("fa-minus")
            $collapse = $(this)
            $(".collapse").each(function() {
                if ($(this) != $collapse)
                    $(this).collapse('hide')
            })
        })

        $(".collapse").on('hide.bs.collapse', function() {
            $(`#${$(this).attr("aria-labelledby")} #angle`).removeClass("fa-minus").addClass("fa-plus")
        })

        // Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip()
    }

    function getGitInfo(projects, currentIndex = 0) {
        if (currentIndex >= projects.length) return $('#projectsAccordion').children().first().remove()
        let project = projects[currentIndex]
        project.id = project.title.replace(/ /g, '-')
        if (project.repoName) {
            fetch(`https://api.github.com/repos/727021/${project.repoName}`)
            .then(response => { return response.json() })
            .then(json => {
                $('#projectsAccordion').append(`
                <div class="card">
                    <div class="card-header" role="tab" id="${project.id}-Header">
                        <div class="row">
                            <div class="col">
                                <h5 class="mb-0"><a data-toggle="collapse" data-parent="#projectsAccordion" href="#${project.id}" aria-expanded="false" aria-controls="${project.id}"><i id="angle" class="fas fa-plus"></i> ${project.title}</a></h5>
                                <small class="text-muted">${project.subtitle}</small>
                            </div>
                            <div class="col-2 text-right">
                                ${json.homepage ? `<a target="_blank" href="${json.homepage}" class="btn btn-secondary" role="button" data-toggle="tooltip" title="Website"><i class="fas fa-desktop"></i></a>` : ''}
                                <a target="_blank" href="${json.html_url}" class="btn btn-primary" role="button" data-toggle="tooltip" title="Github"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                    <div id="${project.id}" class="collapse in" role="tabpanel" aria-labelledby="${project.id}-Header">
                        <div class="card-body">
                            ${marked(`${project.description}\n\n---\n\nTechnologies used:\n\n- ${project.technologies.join('\n- ')}`)}
                        </div>
                    </div>
                </div>
                `)
                bindEvents()

                console.log(`Loaded project '${project.title}' (${currentIndex + 1}/${projects.length})`)
                return currentIndex + 1
            })
            .then(index => { getGitInfo(projects, index) })
        } else { // No Github repo
            $('#projectsAccordion').append(`
            <div class="card">
                <div class="card-header" role="tab" id="${project.id}-Header">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0"><a data-toggle="collapse" data-parent="#projectsAccordion" href="#${project.id}" aria-expanded="false" aria-controls="${project.id}"><i id="angle" class="fas fa-plus"></i> ${project.title}</a></h5>
                            <small class="text-muted">${project.subtitle}</small>
                        </div>
                    </div>
                </div>
                <div id="${project.id}" class="collapse in" role="tabpanel" aria-labelledby="${project.id}-Header">
                    <div class="card-body">
                        ${marked(`${project.description}${(project.technologies.length == 0) ? "" : `\n\n---\n\nTechnologies used:\n\n- ${project.technologies.join('\n- ')}`}`)}
                    </div>
                </div>
            </div>
            `)
            bindEvents()

            console.log(`Loaded project '${project.title}' (${currentIndex + 1}/${projects.length})`)
            getGitInfo(projects, currentIndex + 1)
        }
    }

    fetch('projects.json')
    .then(response => { return response.json() })
    .then(myJSON => {
        getGitInfo(myJSON)
    })
})