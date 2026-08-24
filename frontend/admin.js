const API_URL = 'http://localhost:5000/api/projects';

document.addEventListener('DOMContentLoaded', () => {
    fetchAdminProjects();

    const form = document.getElementById('addProjectForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const projectData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            image_url: document.getElementById('image_url').value,
            live_demo_url: document.getElementById('live_demo_url').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });

            if (response.ok) {
                form.reset();
                fetchAdminProjects();
            } else {
                alert('Failed to save project.');
            }
        } catch (error) {
            console.error('Error adding project:', error);
        }
    });
});

async function fetchAdminProjects() {
    const listContainer = document.getElementById('adminProjectsList');
    try {
        const response = await fetch(API_URL);
        const projects = await response.json();

        if (projects.length === 0) {
            listContainer.innerHTML = '<p style="grid-column: 1/-1; color: #888; text-align: center;">No projects added yet.</p>';
            return;
        }

        listContainer.innerHTML = projects.map(proj => `
            <div class="admin-card">
                <img class="card-thumb" src="${proj.image_url}" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/300x140?text=No+Image+Found'">
                <div class="card-body">
                    <h4>${proj.title}</h4>
                    <p>${proj.description}</p>
                    <div class="card-footer">
                        ${proj.live_demo_url ? `<a href="${proj.live_demo_url}" target="_blank" class="demo-link"><i class="fa-solid fa-up-right-from-square"></i> Live Demo</a>` : '<span></span>'}
                        <button class="btn-delete" onclick="deleteProject(${proj.id})">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching admin projects:', error);
        listContainer.innerHTML = '<p style="grid-column: 1/-1; color: red;">Failed to connect to backend server.</p>';
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
            fetchAdminProjects();
        } else {
            alert('Failed to delete project.');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
    }
}