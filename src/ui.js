export function updateDBPanelUI(data) {
    const current_database_ui = document.querySelector('.current-database');
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