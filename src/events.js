import { getStudents, postStudent, patchStudentEmail, deleteStudent } from "./http";
import { updateDBPanelUI } from "./ui";
import { getNewStudentAttrs, getUpdatedStudentAttrs, getDeletedStudentAttrs } from "./utils";

// get all student data, then update the UI
export function fetchStudents() {
    getStudents((data) => { updateDBPanelUI(data); });
}

// add new student, then get all student data, then update the UI
export function addNewStudent() {
    const values = getNewStudentAttrs();
    postStudent(...values, () => { fetchStudents(); });
}

// update student email, then get all student data, then update the UI
export function updateStudentEmail() {
    const values = getUpdatedStudentAttrs();
    patchStudentEmail(...values, () => { fetchStudents(); });
}

// delete student, then get all student data, then update the UI
export function deleteStudentByID() {
    const values = getDeletedStudentAttrs();
    deleteStudent(...values, () => { fetchStudents(); });
}