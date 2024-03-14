import './style.css';
import { fetchStudents, addNewStudent, updateStudentEmail, deleteStudentByID } from './events';

function applyEventListeners() {
    const get_students_button = document.querySelector('.get-all-students-button');
    const add_student_button = document.querySelector('.add-student-button');
    const update_student_button = document.querySelector('.update-student-button');
    const delete_student_button = document.querySelector('.delete-student-button');

    get_students_button.addEventListener('click', (event) => {
        event.preventDefault();
        fetchStudents();
    });

    add_student_button.addEventListener('click', (event) => {
        event.preventDefault();
        addNewStudent();
    });

    update_student_button.addEventListener('click', (event) => {
        event.preventDefault();
        updateStudentEmail();
    });

    delete_student_button.addEventListener('click', (event) => {
        event.preventDefault();
        deleteStudentByID();
    });
}

function main() {
    applyEventListeners();
}

main();

