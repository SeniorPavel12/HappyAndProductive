/*!--Функция для удаления заметки из детального окна--!*/

import { printCount } from "../print/printCount.js";
/*--Функция для вывода количества заметок--*/

import { startDisplay, mainDisplay } from "../variable/variable.js";
/*--Стартовый и основной экраны в Detail--*/

const arr = [];

let onePlay = true;

// Функция активации
function buttonActiveDeleted(button, teg, alredyPrint, notesContainer) {
    button.addEventListener('click', () => {

        // console.log(teg);
        
        teg.remove();

        // Удаляем заметку из контейнеров с остальными заметками
        for (let el of alredyPrint) {
            if (teg.getAttribute('id') === el.getAttribute('id')) {
                el.remove();
            }
        }

        for (let el of notesContainer) {
            if (teg.getAttribute('id') === el.id) {
                notesContainer.splice(notesContainer.indexOf(el), 1);
            }
        }

        // Убираем основное окно и возвращаем начальное (в Detail)
        mainDisplay.style.cssText = `display: none`;
        startDisplay.style.cssText = `display: inherit`;

        // Обновляем счётчик заметок
        printCount();

        /*<!--Функция для обновления статуса заметки--!>*/
    })   
}

// Функция для удаления заметок из детального окна
function deleteNotesDetail(mainContainer, method, notesContainer) {
    const child = document.querySelectorAll('.title__detail')[0];
    const buttonDelete = document.getElementById(`icon_${method}__detail`);

    // console.log(notesContainer);

    buttonActiveDeleted(buttonDelete, child, mainContainer, notesContainer)
}

export { deleteNotesDetail }