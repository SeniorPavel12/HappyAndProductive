/*!--Функция для отрисовки тегов в главном окне--!*/

function printTegMain (containerStatus, content, printMain, status) {     // Функция для создания заметки и вывода её на экран
    for (let i = 0; i < containerStatus.length; i++) {
        const id = containerStatus[i].id;
        let noteTeg = document.createElement('button');
        noteTeg.classList.add(`${status}`);
        noteTeg.setAttribute('id', id);
        noteTeg.setAttribute('group', containerStatus[i].group[0]);
        content.append(noteTeg);
        let note = document.querySelectorAll(`.${status}`)[i];
        printMain.push(note);
        note.innerHTML = `
            <button class="button-complete_main__btn-${status}">
                <svg id="icon_complete__main" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                </svg>
            </button>
            <div class="title_notes-${status}">${containerStatus[i].title}</div>
            <button class="button-delete_main__btn-${status}">
                <svg id="icon_delete__main" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        `
    }
}

function getOnDelete (container) { // Функция для очистки тега от лишних пробелов
    for (let i = 0; i < container.length; ++i) {
        container[i] = container[i].textContent.split(' ').join('').replace(/\n/g, '')
    }
}

export { printTegMain /*getOnDelete*/}