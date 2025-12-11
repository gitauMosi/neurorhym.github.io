document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects-container');

    fetch('assets/data/projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(projects => {
            renderProjects(projects);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = `
                <div class="col-12 text-center text-danger">
                    <p>Failed to load projects. Please try again later.</p>
                </div>
            `;
        });

    function renderProjects(projects) {
        projectsContainer.innerHTML = '';

        projects.forEach((project, index) => {
            // Create column col-lg-4 col-md-6
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 d-flex align-items-stretch';
            col.style.animationDelay = `${index * 100}ms`;

            // Create card
            const card = document.createElement('div');
            card.className = 'card project-card bg-dark-soft text-white h-100 border-0 shadow-sm fade-in';

            // Image Wrapper
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'project-img-wrapper';

            if (project.image) {
                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.title;
                img.className = 'card-img-top project-img';

                // Robust error handling
                img.onerror = function () {
                    const placeholder = createPlaceholder();
                    imgWrapper.innerHTML = ''; // Remove broken image
                    imgWrapper.appendChild(placeholder);
                };

                imgWrapper.appendChild(img);
            } else {
                imgWrapper.appendChild(createPlaceholder());
            }

            // Card Body
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body d-flex flex-column p-4';

            // Title
            const title = document.createElement('h5');
            title.className = 'card-title fw-bold mb-3';
            title.textContent = project.title;

            // Description
            const desc = document.createElement('p');
            desc.className = 'card-text text-light-soft mb-4 flex-grow-1';
            desc.textContent = project.description;

            // Tags
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'mb-3';
            project.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'badge bg-dark-soft border border-secondary text-light-soft me-1';
                span.textContent = tag;
                tagsDiv.appendChild(span);
            });

            // Link
            const link = document.createElement('a');
            link.href = project.link;
            link.className = 'btn btn-outline-primary btn-sm stretched-link mt-auto btn-hover-glow';
            link.innerHTML = 'View Details <i class="bi bi-arrow-right ms-1"></i>';

            // Assemble
            cardBody.appendChild(title);
            cardBody.appendChild(desc);
            cardBody.appendChild(tagsDiv);
            cardBody.appendChild(link);

            card.appendChild(imgWrapper);
            card.appendChild(cardBody);
            col.appendChild(card);

            projectsContainer.appendChild(col);
        });

        // Trigger animations
        setTimeout(() => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => card.classList.add('visible'));
        }, 100);
    }

    function createPlaceholder() {
        const div = document.createElement('div');
        div.className = 'placeholder-img bg-gradient-primary';
        div.innerHTML = '<i class="bi bi-code-slash fs-1 text-white opacity-50"></i>';
        return div;
    }
});
