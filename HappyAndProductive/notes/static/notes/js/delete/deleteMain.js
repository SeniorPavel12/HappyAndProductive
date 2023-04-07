/*!--Функция для удаления заметки из главного окна--!*/

import { printCount } from "../print/printCount.js";

// Функция активации
function buttonActiveDeleted(button, teg, alredyPrint, notesContainers, newContainer) {
    button.addEventListener('click', () => {
        teg.remove();

        // Удаляем заметку из контейнера с остальными заметками
        const dayContainer = notesContainers.dayContainer;
        const weekContainer = notesContainers.weekContainer;
        const monthContainer = notesContainers.monthContainer;

        for (let el of dayContainer) {
            if (el.id === teg.getAttribute('id')) {
                dayContainer.splice(dayContainer.indexOf(el), 1);
            }
        }

        for (let el of weekContainer) {
            if (el.id === teg.getAttribute('id')) {
                weekContainer.splice(weekContainer.indexOf(el), 1);
            }
        }

        for (let el of monthContainer) {
            if (el.id === teg.getAttribute('id')) {
                monthContainer.splice(monthContainer.indexOf(el), 1);
            }
        }

        // Удаляем заметку из контейнера с уже выведенными заметками
        alredyPrint.splice(alredyPrint.indexOf(button), 1);

        // Обновляем счётчик заметок
        printCount();

        /*<!--Функция для обновления статуса заметки--!>*/
    })
}

// Функция для удаления заметок из главного окна
function deleteNotesMain(mainContainer, status, method, notesContainers, newContainer) {
    for (let i = 0; i < mainContainer.length; ++i) {
        const child = document.querySelectorAll(`.${status}`)[i];
        const buttonDelete = document.querySelectorAll(`.button-${method}_main__btn-${status}`)[i];

        buttonActiveDeleted(buttonDelete, child, mainContainer, notesContainers, newContainer);
    }
}


export { deleteNotesMain }