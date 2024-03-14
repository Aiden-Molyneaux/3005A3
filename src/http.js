import axios from 'axios';

export function getStudents(callback) {
    axios.get('http://localhost:3000/students')
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.error('Axios error:', error);
        callback([]);
    });
}

export function postStudent(first_name, last_name, email, enrollment_date, callback) {
    const values = [first_name, last_name, email, enrollment_date];

    axios.post('http://localhost:3000/students', values)
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.error('Axios error:', error);
        callback(null, error);
    });
}

export function patchStudentEmail(new_email, student_id, callback) {
    const values = [new_email, student_id];
    
    axios.patch(`http://localhost:3000/students/${student_id}`, values)
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.error('Axios error:', error);
        callback(null, error);
    });
}

export function deleteStudent(student_id, callback) {
    axios.delete(`http://localhost:3000/students/${student_id}`)
    .then(response => {
        callback(response.data);
    })
    .catch(error => {
        console.error('Axios error:', error);
        callback(null, error);
    });
}