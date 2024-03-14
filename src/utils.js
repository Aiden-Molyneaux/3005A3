export function getNewStudentAttrs() {
    const first_name_input = document.querySelector('.first-name-input');
    const last_name_input = document.querySelector('.last-name-input');
    const create_email_input = document.querySelector('.email-input');
    const enrollment_date_input = document.querySelector('.enrollment-date-input');
    const first_name = first_name_input.value;
    const last_name = last_name_input.value;
    const email = create_email_input.value;
    const enrollment_date = enrollment_date_input.value; 

    return [first_name, last_name, email, enrollment_date];
}

export function getUpdatedStudentAttrs() {
    const update_student_id_input = document.querySelector('.update-student-id-input');
    const update_email_input = document.querySelector('.update-email-input');
    const student_id = update_student_id_input.value;
    const email = update_email_input.value; 

    return [email, student_id];
}

export function getDeletedStudentAttrs() {
    const delete_student_id_input = document.querySelector('.delete-student-id-input');
    const student_id = delete_student_id_input.value;

    return [student_id];
}