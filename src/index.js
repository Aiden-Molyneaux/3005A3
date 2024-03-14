import './style.css';

// CONTAINERS
const current_database_ui = document.querySelector('.current-database');

// INPUTS
const first_name_input = document.querySelector('.first-name-input');
const last_name_input = document.querySelector('.last-name-input');
const create_email_input = document.querySelector('.email-input');
const enrollment_date_input = document.querySelector('.enrollment-date-input');
const update_student_id_input = document.querySelector('.update-student-id-input');
const update_email_input = document.querySelector('.update-email-input');
const delete_student_id_input = document.querySelector('.delete-student-id-input');

// BUTTONS
const get_students_button = document.querySelector('.get-all-students-button');
const add_student_button = document.querySelector('.add-student-button');
const update_student_button = document.querySelector('.update-student-button');
const delete_student_button = document.querySelector('.delete-student-button');

get_students_button.addEventListener('click', (event) => {
    event.preventDefault();
    
    fetchStudents((data) => {
        updateDBPanelUI(data);
    });
});

add_student_button.addEventListener('click', (event) => {
    event.preventDefault();
    const values = getNewStudentAttrs();

    addStudent(...values, () => {
        fetchStudents((data) => {
            updateDBPanelUI(data);
        });
    });
});

update_student_button.addEventListener('click', (event) => {
    event.preventDefault();
    const values = getUpdatedStudentAttrs();

    updateStudentEmail(...values, () => {
        fetchStudents((data) => {
            updateDBPanelUI(data);
        });
    }); 
});

delete_student_button.addEventListener('click', (event) => {
    event.preventDefault();
    const values = getDeletedStudentAttrs();

    deleteStudent(...values, () => {
        fetchStudents((data) => {
            updateDBPanelUI(data);
        });
    });
});

function fetchStudents(callback) {
    let req = null;
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            let data = JSON.parse(req.responseText);

            callback(data);
        } else if (this.readyState == 4 && this.status == 500) {
            alert("The server broke.");

            callback([]);
        }
    }
    
    req.open("GET", 'http://localhost:3000/students', true);
    req.send();
}

function addStudent(first_name, last_name, email, enrollment_date, callback) {
    const values = [first_name, last_name, email, enrollment_date];

    let req = null;
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            console.log('POST returned');
            callback();
        } else if (this.readyState == 4 && this.status == 500) {
            alert("The server broke.");
            callback();
        }
    }
    
    req.open("POST", 'http://localhost:3000/students');
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(values));
}

function updateStudentEmail(new_email, student_id, callback) {
    const values = [new_email, student_id];
    
    let req = null;
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            console.log('PATCH returned');
            callback();
        } else if (this.readyState == 4 && this.status == 500) {
            alert("The server broke.");
            callback();
        }
    }
    
    req.open("PATCH", `http://localhost:3000/students/${student_id}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(values));
}

function deleteStudent(student_id, callback) {
    const values = [student_id];

    let req = null;
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            console.log('DELETE returned');
            callback();
        } else if (this.readyState == 4 && this.status == 500) {
            alert("The server broke.");
            callback();
        }
    }
    
    req.open("DELETE", `http://localhost:3000/students/${student_id}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(values));
}

function getNewStudentAttrs() {
    const first_name = first_name_input.value;
    const last_name = last_name_input.value;
    const email = create_email_input.value;
    const enrollment_date = enrollment_date_input.value; 

    return [first_name, last_name, email, enrollment_date];
}

function getUpdatedStudentAttrs() {
    const student_id = update_student_id_input.value;
    const email = update_email_input.value; 

    return [email, student_id];
}

function getDeletedStudentAttrs() {
    const student_id = delete_student_id_input.value;

    return [student_id];
}

function updateDBPanelUI(data) {
    current_database_ui.innerHTML = '';

    for (const student of data) {
        const entry = createStudentEntry(student);
        current_database_ui.appendChild(entry);
    }
}

function createStudentEntry(student) {
    const entry = document.createElement('div');
    entry.classList.add('database-entry');

    for (const [key, value] of Object.entries(student)) {
        const entry_text = document.createElement('p');
        
        entry_text.textContent = key == 'enrollment_date' ? `${key}: ${value.split('T')[0]}` : `${key}: ${value}`;
        entry.appendChild(entry_text);
    }

    return entry;
}