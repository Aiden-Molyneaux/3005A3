import { getStudents, postStudent, patchStudentEmail, deleteStudent } from "./http";
import { updateDBPanelUI } from "./ui";
import { getNewStudentAttrs, getUpdatedStudentAttrs, getDeletedStudentAttrs } from "./utils";

export function fetchStudents() {
    getStudents((data) => {
        updateDBPanelUI(data);
    });
}

export function addNewStudent() {
    const values = getNewStudentAttrs();

    postStudent(...values, () => {
        getStudents((data) => {
            updateDBPanelUI(data);
        });
    });
}

export function updateStudentEmail() {
    const values = getUpdatedStudentAttrs();

    patchStudentEmail(...values, () => {
        getStudents((data) => {
            updateDBPanelUI(data);
        });
    });
}

export function deleteStudentByID() {
    const values = getDeletedStudentAttrs();

    deleteStudent(...values, () => {
        getStudents((data) => {
            updateDBPanelUI(data);
        });
    });
}