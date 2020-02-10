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

        $('[data-toggle="tooltip"]').tooltip()
    }

    fetch('projects.json')
    .then(response => { return response.json() })
    .then(myJSON => {
        myJSON.forEach(project => {
            if (project.publish) {
                project.id = project.title.replace(/ /g, '-')

                fetch(`https://api.github.com/repos/727021/${project.repoName}`)
                .then(response => { return response.json() })
                .then(json => {
                    $('#projectsAccordion').append(`
                    <div class="card">
                        <div class="card-header" role="tab" id="${project.id}-Header">
                            <div class="row">
                                <div class="col">
                                    <h5 class="mb-0"><a data-toggle="collapse" data-parent="#projectsAccordion" href="#${project.id}" aria-expanded="true" aria-controls="${project.id}"><i id="angle" class="fas fa-plus"></i> ${project.title}</a></h5>
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
                                ${marked(project.description)}
                            </div>
                        </div>
                    </div>
                    `)
                    bindEvents()
                })
            }
        })
    })
})