// Form Handler - Dynamic Link Management

document.addEventListener('DOMContentLoaded', function() {
    const addLinkBtn = document.getElementById('addLinkBtn');
    const linksContainer = document.getElementById('linksContainer');
    const contentForm = document.getElementById('contentForm');
    const dateInput = document.getElementById('date');

    // Set date input to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    // Add new link input
    addLinkBtn.addEventListener('click', function() {
        addLinkInput();
    });

    // Remove link when remove button clicked
    linksContainer.addEventListener('click', function(event) {
        if (event.target.closest('.remove-link-btn')) {
            const linkItem = event.target.closest('.link-item');
            linkItem.remove();
        }
    });

    // Form validation and submission
    contentForm.addEventListener('submit', function(event) {
        if (!contentForm.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        contentForm.classList.add('was-validated');

        if (contentForm.checkValidity()) {
            const formData = collectFormData();
            console.log('Form Data:', formData);
            // TODO: Send data to server or process as needed
        }
    });

    // Helper function to add a new link input
    function addLinkInput() {
        const linkItem = document.createElement('div');
        linkItem.className = 'link-item mb-3';
        linkItem.innerHTML = `
            <div class="mb-2">
                <input
                    type="url"
                    class="form-control link-input"
                    placeholder="https://example.com"
                    aria-label="Link URL">
            </div>
            <div class="input-group">
                <input
                    type="text"
                    class="form-control link-description"
                    placeholder="Link description (optional)"
                    aria-label="Link description">
                <button
                    type="button"
                    class="btn btn-outline-danger remove-link-btn"
                    aria-label="Remove this link">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        linksContainer.appendChild(linkItem);
    }

    // Helper function to collect form data
    function collectFormData() {
        const formData = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            date: document.getElementById('date').value,
            image: document.getElementById('image').files[0] || null,
            description: document.getElementById('description').value,
            links: collectLinks(),
        };

        return formData;
    }

    // Helper function to collect all links
    function collectLinks() {
        const linkItems = document.querySelectorAll('.link-item');
        const links = [];

        linkItems.forEach(function(item) {
            const urlInput = item.querySelector('.link-input');
            const descInput = item.querySelector('.link-description');
            const url = urlInput.value.trim();

            if (url) {
                links.push({
                    url: url,
                    description: descInput.value.trim() || null,
                });
            }
        });

        return links;
    }
});
