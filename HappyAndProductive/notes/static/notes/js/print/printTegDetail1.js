/*!--Функция для вывода заметки на экран--start--!*/

import { deleteNotesDetail } from "../delete/deleteDetail.js";
/*!--Функция для удаления заметки из детального окна--!*/

import { inputTextNotes, selectStatus } from "../variable/variable.js";


const startDisplay = document.querySelectorAll('.start_display')[0];
const mainDisplay = document.querySelectorAll('.main_display')[0];

const titleDetail = document.querySelectorAll('.title__detail_notes')[0]; // Получаем контейнер(тег Html), в котором будет храниться заголовок заметки

const contentDetailTitle = []; // Создаём массив в котором будет храниться уже выведенный заголовок

// Функция для вывода заголовка замеки
function printTegDetail (what, wherever, alreadyPrint, classAdd, id, mainContainer, containerNotes) {     // Функция для создания заметки и вывода её на экран
    let detailTeg = document.createElement('div');
    detailTeg.classList.add(`${classAdd}`);
    wherever.append(detailTeg);
    let detail = document.querySelectorAll(`.${classAdd}`)[0];
    detail.setAttribute('id', id);
    alreadyPrint.push(detail);
    detail.textContent = `${what}`




    deleteNotesDetail(mainContainer, 'complete', containerNotes);
    deleteNotesDetail(mainContainer, 'delete', containerNotes);
}

// Функция для вывода всей информации заметки
function printInfoDetail(note, inputText) {
    inputText.value = note.info.description;
}

// Функция активации 
function buttonActive (button, what, wherever, alreadyPrint, classAdd, id, mainContainer, containerNotes, note) { // Функция для активации кнопки
    button.addEventListener('click', async () => {
        mainDisplay.style.cssText = `display: inherit`;
        startDisplay.style.cssText = `display: none`;
        if (alreadyPrint.length === 0) {
            printTegDetail(what, wherever, alreadyPrint, classAdd, id, mainContainer, containerNotes);
            printInfoDetail(note, inputTextNotes);
        } else {
            alreadyPrint[0].remove();
            alreadyPrint.length = 0;
            printTegDetail(what, wherever, alreadyPrint, classAdd, id, mainContainer, containerNotes);
            printInfoDetail(note, inputTextNotes);
        }
    })
}

// Функция для вывода всей информации о замектке в Detail
function printTitleNote(mainContainer, status, containerNotes) { // Функция для вывода названия плана на экран
    for (let i = 0; i < mainContainer.length; ++i) {
        const buttonNotes = document.querySelectorAll(`.title_notes-${status}`)[i];
        const child = mainContainer[i].children[1];
        const id = mainContainer[i].getAttribute('id');
        const printNotes = child.textContent;

        const note = containerNotes[i];

        console.log(note);

        buttonActive(buttonNotes, printNotes, titleDetail, contentDetailTitle, 'title__detail', id, mainContainer, containerNotes, note);
    }
}

/*!--Функция для вывода заметки на экран--end--!*/

export { printTitleNote, startDisplay, mainDisplay }