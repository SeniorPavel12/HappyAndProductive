/*!--Функция для вывода заметки на экран--start--!*/

const titleDetail = document.querySelectorAll('.title__detail_notes')[0]; // Получаем контейнер(тег Html), в котором будет храниться заголовок заметки

// const textDetail = document.querySelectorAll('.text__detail_notes')[0]; // Получаем контейнер(тег Html), в котором будет храниться содержимое заметки

let contentDetailTitle = []; // Создаём массив в котором будет храниться уже выведенный заголовок

// let contentDetailText = []; // Создаём массив в котором будет храниться уже выведенное содержимое

function printTegDetail (what, wherever, alreadyPrint, classAdd) {     // Функция для создания заметки и вывода её на экран
    let detailTeg = document.createElement('div');
    detailTeg.classList.add(`${classAdd}`);
    wherever.append(detailTeg);
    let detail = document.querySelectorAll(`.${classAdd}`)[0];
    alreadyPrint.push(detail);
    detail.textContent = `${what}`
}

function buttonActive (button, what, wherever, alreadyPrint, classAdd, container) { // Функция для активации кнопки
    button.addEventListener('click', async () => {
        if (alreadyPrint.length === 0) {
            printTegDetail(what, wherever, alreadyPrint, classAdd);
            deleteNotesDetail(/*container, */alreadyPrint, 'button__complete');
        } else {
            alreadyPrint[0].remove();
            alreadyPrint.length = 0;
            printTegDetail(what, wherever, alreadyPrint, classAdd);
            deleteNotesDetail(/*container, */alreadyPrint, 'button__complete');
        }
    })
}

function printTitlePlan(container) { // Функция для вывода названия плана на экран
    const myContainer = container;
    for (let i = 0; i < container.length; ++i) {
        const buttonNotes = document.querySelectorAll('.plan')[i];
        const child = container[i];
        const notes = child.children[1];
        const printNotes = notes.textContent;

        buttonActive(buttonNotes, printNotes, titleDetail, contentDetailTitle, 'title__detail', myContainer);
    }
}

function printTitleReminder(container) { // Функция для вывода названия напоминания на экран
    for (let i = 0; i < container.length; ++i) {
        const buttonNotes = document.querySelectorAll('.reminder')[i];
        const child = container[i];
        const notes = child.children[1];
        const printNotes = notes.textContent;
    
        buttonActive(buttonNotes, printNotes, titleDetail, contentDetailTitle, 'title__detail')
    }
}

/*!--Функция для вывода заметки на экран--end--!*/


/*!--Функция для удаления заметки из detail--start--!*/

function buttonActiveDeletedDetail (button, /*tegFromMain,*/ tegContent) {
    button.addEventListener('click', () => {
        // tegFromMain.remove();
        tegContent.remove();
    })
}

function deleteNotesDetail (/*container, */alreadyPrint, classButton) {
    const button = document.querySelectorAll(`.${classButton}`)[0];
    console.log(button);

    // function log (container, alreadyPrint) {
    //     for (let i = 0; i < container.length; ++i) {
    //         if (container[i] === alreadyPrint[0].textContent) {
    //             return container[i];
    //         }
    //     }
    // }

    // const tegFromMain = log(container, alreadyPrint);

    const tegContent = alreadyPrint[0];

    buttonActiveDeletedDetail(button, /*tegFromMain,*/ tegContent);
}

/*!--Функция для удаления заметки из detail--end--!*/

export {printTitlePlan, printTitleReminder}