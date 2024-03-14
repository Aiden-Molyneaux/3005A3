export function getNewStudentAttrs() {
    const first_name = document.querySelector('.first-name-input').value;
    const last_name = document.querySelector('.last-name-input').value;
    const email = document.querySelector('.email-input').value;
    const enrollment_date = document.querySelector('.enrollment-date-input').value; 

    return [first_name, last_name, email, enrollment_date];
}

export function getUpdatedStudentAttrs() {
    const student_id = document.querySelector('.update-student-id-input').value;
    const email = document.querySelector('.update-email-input').value; 

    return [email, student_id];
}

export function getDeletedStudentAttrs() {
    const student_id = document.querySelector('.delete-student-id-input').value;

    return [student_id];
}