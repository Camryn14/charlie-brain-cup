// Form.js - Authentication, Data Management, and Form Handling

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();

    // Initialize form
    initializeForm();
});

/**
 * Check if user is authenticated
 * Redirects to auth page if not logged in
 */
function checkAuthentication() {
    const isAuthN = sessionStorage.getItem('sessionAuthN');

    if (isAuthN !== 'true') {
        window.location.assign('../pages/auth.html');
    }
}

/**
 * Initialize form elements and event listeners
 */
function initializeForm() {
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
        event.preventDefault();

        if (!contentForm.checkValidity()) {
            event.stopPropagation();
        }

        contentForm.classList.add('was-validated');

        if (contentForm.checkValidity()) {
            const formData = collectFormData();
            saveToLocalStorage(formData);
            resetForm();
            showSuccessMessage();
        }
    });
}

/**
 * Add a new link input to the form
 */
function addLinkInput() {
    const linksContainer = document.getElementById('linksContainer');
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

/**
 * Collect form data from all inputs
 * @returns {Object} Form data object
 */
function collectFormData() {
    const imageFile = document.getElementById('image').files[0];
    let imageData = null;

    // Convert image to base64 if present
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageData = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    }

    const formData = {
        id: generateUniqueId(),
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        date: document.getElementById('date').value,
        image: imageData,
        description: document.getElementById('description').value,
        links: collectLinks(),
        createdAt: new Date().toISOString(),
    };

    return formData;
}

/**
 * Collect all links from the form
 * @returns {Array} Array of link objects
 */
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

/**
 * Save form data to localStorage
 * @param {Object} formData - The form data to save
 */
function saveToLocalStorage(formData) {
    let contentItems = JSON.parse(localStorage.getItem('contentItems')) || [];

    // Add new item to array
    contentItems.push(formData);

    // Save back to localStorage
    localStorage.setItem('contentItems', JSON.stringify(contentItems));

    console.log('Content saved successfully:', formData);
}

/**
 * Reset the form to initial state
 */
function resetForm() {
    const contentForm = document.getElementById('contentForm');
    const dateInput = document.getElementById('date');
    const linksContainer = document.getElementById('linksContainer');

    contentForm.reset();
    contentForm.classList.remove('was-validated');

    // Reset date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    // Reset links to single default input
    linksContainer.innerHTML = `
        <div class="link-item mb-3">
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
        </div>
    `;

    // Re-attach remove button listener
    const removeButtons = linksContainer.querySelectorAll('.remove-link-btn');
    removeButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            btn.closest('.link-item').remove();
        });
    });
}

/**
 * Show success message after form submission
 */
function showSuccessMessage() {
    const formCard = document.querySelector('.card');
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success alert-dismissible fade show';
    successAlert.role = 'alert';
    successAlert.innerHTML = `
        <i class="bi bi-check-circle me-2"></i>
        <strong>Success!</strong> Your content has been saved.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    formCard.parentElement.insertBefore(successAlert, formCard);

    // Auto-dismiss after 5 seconds
    setTimeout(function() {
        successAlert.remove();
    }, 5000);
}

/**
 * Generate a unique ID for each content item
 * @returns {string} Unique ID
 */
function generateUniqueId() {
    return 'content_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
