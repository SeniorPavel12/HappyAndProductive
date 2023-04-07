/*--Функция для вывода заметки в Detail--*/

import { deleteNotesDetail } from "../delete/deleteDetail.js";
/*!--Функция для удаления заметки из детального окна--!*/

import { inputTitleNotes, inputTextNotes, selectStatus, buttonSave } from "../variable/variable.js";


import { startDisplay, mainDisplay } from "../variable/variable.js";


function saveDetail(button, infoForms) {
    button.addEventListener('click', async () => {
        const inputTitle = infoForms.title;
        const inputText = infoForms.text;
        const selectStatus = infoForms.status;
        /*Запрос на обновление статуса заметки*/
    })
}


// Функция для вывода всей информации о заметке
function printInfoDetail(note, inputTitle, inputText, selectStatus) {
    inputTitle.value = note.title;
    inputText.value = note.info.description;
    // selectStatus.value = note.info.status;

    saveDetail(buttonSave, {title: inputTitle, text: inputText, status: selectStatus});
}

// Функция активации
function buttonActive(button, note) {
    button.addEventListener('click', async () => {
        mainDisplay.style.cssText = `display: inherit`;
        startDisplay.style.cssText = `display: none`;
        printInfoDetail(note, inputTitleNotes, inputTextNotes, selectStatus);
    })
}


function activePrintDetail(mainContainer, status, containerNotes) {
    for (let i = 0; i < mainContainer.length; i++) {
        const buttonNotes = document.querySelectorAll(`.title_notes-${status}`)[i];

        const note = containerNotes[i];

        buttonActive(buttonNotes, note)
    }
}

export { activePrintDetail }