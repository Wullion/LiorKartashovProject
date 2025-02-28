document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();  


    const nameField = document.querySelector('input[type="text"]');
    const emailField = document.querySelector('input[type="email"]');
    const phoneField = document.querySelector('input[type="tel"]');
    const messageField = document.querySelector('input[type="text"]:nth-of-type(2)');
    
    let valid = true;

    if (nameField.value.trim() === '') {
        valid = false;
        showError(nameField, 'הכנס שם מלא');
    } else {
        clearError(nameField);
    }

    if (!emailField.value.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        valid = false;
        showError(emailField, 'הכנס דוא"ל תקני');
    } else {
        clearError(emailField);
    }


    if (!phoneField.value.match(/^\d{10}$/)) {
        valid = false;
        showError(phoneField, 'הכנס טלפון תקני');
    } else {
        clearError(phoneField);
    }

    if (valid) {
        alert('הטופס נשלח בהצלחה!');

    }
});

function showError(field, message) {
    let error = field.nextElementSibling;
    if (!error || !error.classList.contains('error')) {
        error = document.createElement('p');
        error.classList.add('error');
        field.parentNode.appendChild(error);
    }
    error.textContent = message;
    error.style.color = 'red';
}


function clearError(field) {
    let error = field.nextElementSibling;
    if (error && error.classList.contains('error')) {
        error.textContent = '';
    }
}
});