import { User } from './User.js';

const drawTableRows = (users) => {
    const tableBody = document.querySelector('#users-table-body');

    tableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.isLogedIn ? 'מחובר' : 'מנותק'}</td>
        `;
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'התנתקות';
        logoutBtn.addEventListener('click', () => {
            User.logout(user.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'מחיקה';
        deleteBtn.addEventListener('click', () => {
            User.removeUser(user.id);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'עריכה';
        editButton.addEventListener('click', () => {
        showEditPopup(user);
        });

        row.appendChild(logoutBtn);
        row.appendChild(deleteBtn);
        row.appendChild(editButton);
        tableBody.appendChild(row);
    });
};

const showEditPopup = (user) => {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    popup.innerHTML = `
    <div class="popup-content">
        <h2>עריכת פרטי משתמש</h2>
        <label for="edit-firstName">שם פרטי:</label>
        <input type="text" id="edit-firstName" value="${user.firstName}" />
        <label for="edit-lastName">שם משפחה:</label>
        <input type="text" id="edit-lastName" value="${user.lastName}" />
        <label for="edit-password">סיסמא:</label>
        <input type="password" id="edit-password" value="${user.password}" />
        <button id="save-changes">שמור שינויים</button>
        <button id="cancel">בטל</button>
    </div>`;

    document.body.appendChild(popup);

    const saveButton = popup.querySelector('#save-changes');
    saveButton.addEventListener('click', () => {
        const newFirstName = document.querySelector('#edit-firstName').value;
        const newLastName = document.querySelector('#edit-lastName').value;
        const newPassword = document.querySelector('#edit-password').value;

        user.firstName = newFirstName;
        user.lastName = newLastName;
        user.password = newPassword;

        localStorage.setItem('users', JSON.stringify(User.usersList));
        
        document.body.removeChild(popup);
        drawTableRows(User.usersList);
    });

    const cancelButton = popup.querySelector('#cancel');
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });
};

const registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const users = User.usersList;

    if (users.find((user) => user.email === email)) {
        alert('משתמש עם כתובת דוא"ל זו כבר קיים');
        return;
    }
    new User(firstName, lastName, email, password);
    e.target.reset();
});

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const user = User.usersList.find((user) => user.email === email);
    if (user && user.password === password) {
        User.login(user.id);
        e.target.reset();
    } else {
        alert('שם משתמש או סיסמה לא נכונים');
    }
});

export { drawTableRows, registerForm, loginForm };