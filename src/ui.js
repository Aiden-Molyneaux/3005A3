// database UI generator
export function updateDBPanelUI(data) {
    const current_database_ui = document.querySelector('.current-database');
    current_database_ui.innerHTML = ''; // empty the current UI

    // for each student entry in the database, create a database UI entry
    for (const student of data) {
        const entry = createStudentEntry(student);
        current_database_ui.appendChild(entry);
    }
}

function createStudentEntry(student) {
    const entry = document.createElement('div');
    entry.classList.add('database-entry');

    // create a line in the entry for each attribute of the student
    for (const [key, value] of Object.entries(student)) {
        const entry_text = document.createElement('p');
        
        // if key is enrollment date, format the date
        entry_text.textContent = key == 'enrollment_date' ? `${key}: ${value.split('T')[0]}` : `${key}: ${value}`;
        entry.appendChild(entry_text);
    }

    return entry;
}