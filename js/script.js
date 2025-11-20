/*
 * ===================================================
 * This single file controls interactivity for all 3 pages:
 * 1. Home Page: (No custom JS needed, handled by Bootstrap)
 * 2. Destinations Page: Filtering logic
 * 3. Contact Page: Form validation
 * ===================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Travel Explorer custom script loaded.");

    /*
     * -------------------------
     * 2. DESTINATIONS PAGE: Interactive Filter
     * -------------------------
     */
    
    // Select the button container and all package cards
    const filterContainer = document.querySelector("#filter-buttons");
    const packageCards = document.querySelectorAll(".package-card");

    // Only run this code IF the filter buttons exist on the current page
    if (filterContainer && packageCards.length > 0) {
        
        const filterButtons = filterContainer.querySelectorAll(".filter-btn");

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the filter value (e.g., "all", "beijing", "datong")
                const filterValue = this.getAttribute('data-filter');

                // Remove 'btn-primary' from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline-secondary'); 
                });
                // Add 'btn-primary' only to the clicked button
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline-secondary');

                // --- Show/Hide Cards ---
                packageCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // Check if the card should be shown
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block'; 
                    } else {
                        card.style.display = 'none';  
                    }
                });
            });
        });
    } // end if(filterContainer)

    /*
     * -------------------------
     * 3. CONTACT US PAGE: Form Validation
     * -------------------------
     */
    
    // Select the form
    const contactForm = document.getElementById('contactForm');

    // Only run this code IF the contact form exists on the current page
    if (contactForm) {
        
        // Get all form inputs and feedback messages
        const formFirstName = document.getElementById('formFirstName');
        const formLastName = document.getElementById('formLastName');
        const formEmail = document.getElementById('formEmail');
        const formQuery = document.getElementById('formQuery');
        const formMessage = document.getElementById('formMessage');
        
        const successMessage = document.getElementById('form-success-message');
        const errorMessage = document.getElementById('form-error-message');

        // Add a 'submit' event listener to the form
        contactForm.addEventListener('submit', function(event) {
            
            // Prevent the form from submitting to a server
            event.preventDefault();
            
            // Hide global success/error messages on a new attempt
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';

            // Run the main validation function
            const isValid = validateForm();
            
            // Show feedback based on validation
            if (isValid) {
                // SUCCESS 
                successMessage.style.display = 'block'; // Show success alert
                contactForm.reset(); // Clear the form
                clearAllValidation(); 
            } else {
                // FAILURE 
                errorMessage.style.display = 'block'; // Show main error alert
            }
        });

        // --- Main Validation Function ---
        function validateForm() {
            let valid = true; // Assume the form is valid
            const minMessageLength = 10; 

            // 1. Validate First Name (Required) 
            if (formFirstName.value.trim() === '') {
                showError(formFirstName, 'Your first name is required.');
                valid = false;
            } else {
                clearError(formFirstName); 
            }
            
            // 2. Validate Last Name (Required) 
            if (formLastName.value.trim() === '') {
                showError(formLastName, 'Your last name is required.');
                valid = false;
            } else {
                clearError(formLastName);
            }

            // 3. Validate Email (Required + Format)
            if (formEmail.value.trim() === '') {
                showError(formEmail, 'Email address is required.');
                valid = false;
            } else if (!isValidEmail(formEmail.value.trim())) {
                // Check email format
                showError(formEmail, 'Please provide a valid email address.');
                valid = false;
            } else {
                clearError(formEmail);
            }
            
            // 4. Validate Query Type (Required) 
            if (formQuery.value === '') {
                showError(formQuery, 'Please select a query type.');
                valid = false;
            } else {
                clearError(formQuery);
            }

            // 5. Validate Message (Required + Min Length) 
            if (formMessage.value.trim() === '') {
                showError(formMessage, 'A message is required.');
                valid = false;
            } else if (formMessage.value.trim().length < minMessageLength) {
                // Check minimum length
                showError(formMessage, `Message must be at least ${minMessageLength} characters long.`);
                valid = false;
            } else {
                clearError(formMessage);
            }
            
            return valid; 
        }
        
        // This function shows an error message
        function showError(input, message) {
            input.classList.remove('is-valid'); 
            input.classList.add('is-invalid'); 
            
            // Find the next sibling element with class .invalid-feedback
            const feedback = input.nextElementSibling; 
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = message; 
            }
        }

        // This function clears an error (marks as valid)
        function clearError(input) {
            input.classList.remove('is-invalid'); 
            input.classList.add('is-valid'); 
        }
        
        // This function resets all borders after successful submission
        function clearAllValidation() {
            const fields = contactForm.querySelectorAll('.form-control, .form-select');
            fields.forEach(field => {
                field.classList.remove('is-valid');
                field.classList.remove('is-invalid');
            });
        }

        // This function uses regex to validate email format 
        function isValidEmail(email) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return regex.test(email);
        }
        
    } // end if(contactForm)

}); // end DOMContentLoaded