// /*!--Тестовый JSON--!*/
//
// let categoryJSON = ['develop', 'sport', 'friends']
//
// let mainJSON = [
//     {
//         "id": '1',
//         "note": "plan",
//         "status": "day",
//         "category": "develop",
//         "title": "JavaScript",
//         "content": "Learning JavaScript 2 hours",
//     },
//
//     {
//         "id": '2',
//         "note": "plan",
//         "status": "day",
//         "category": "sport",
//         "title": "run 5km",
//         "content": "I run 5km every day",
//     },
//
//     {
//         "id": '3',
//         "note": "plan",
//         "status": "month",
//         "category": "sport",
//         "title": "Sport every day",
//         "content": "I do sport exemple every day",
//     },
//
//     {
//         "id": '1',
//         "note": "reminder",
//         "status": "day",
//         "category": "sport",
//         "title": "Html and Css",
//         "content": "Dont remind for Html and Css",
//     },
//
//     {
//         "id": '2',
//         "note": "reminder",
//         "status": "day",
//         "category": "friends",
//         "title": "Pasha",
//         "content": "Give Pasha 10$",
//     },
//
//     {
//         "id": '3',
//         "note": "reminder",
//         "status": "completed",
//         "category": "friends",
//         "title": "Dima",
//         "content": "Give me 10 cookies",
//     },
//
//     {
//         "id": '4',
//         "note": "plan",
//         "status": "trash",
//         "category": "develop",
//         "title": "Learn C#",
//         "content": "I do sport exemple every day",
//     }
// ]

const mainJSON = 'api/initial_window/get_all_category/?format=json'


// let myArr = getNotesOnCategory(mainJSON, categoryJSON);
// console.log(getNotesOnCategory(mainJSON, categoryJSON));

import { printTitlePlan, printTitleReminder } from './logDisplay.js';
/*!--Функция для вывода заметки на экран--!*/

import { deleteNotes } from './deleted.js';
/*!--Функция для удаления заметки из главного окна--!*/

/*!--Rest api--!*/
const requesURL = 'https://jsonplaceholder.typicode.com/comments?_limit=10';

import { createPlans, URLPlans, buttonCreatePlans, inputCreatePlans, inputDataPlans, selectImportantPlans } from './addNotes.js';

createPlans(URLPlans, buttonCreatePlans, inputCreatePlans, inputDataPlans, selectImportantPlans)
console.log('asdfas');


/*!--Основной код--start--!*/

const contentPlans = document.querySelectorAll('#content__plans')[0]; // Получаем контейнер(тег Html), в котором будут храниться все планы

const contentReminders = document.querySelectorAll('#content__reminders')[0]; // Получаем контейнер(тег Html), в котором будут храниться все напоминания

let contentMainPlans = []; // Создаём массив в котором будут храниться уже выведенные планы

let plansTitle = [];

let remindersTitle = [];

let contentMainReminders = []; // Создаём массив в котором будут храниться уже выведенные напоминания

function printTegMain (containerStatus, content, printMain, status) {     // Функция для создания заметки и вывода её на экран
    for (let i = 0; i < containerStatus.length; ++i) {
        const id = containerStatus[i].id;
        let noteTeg = document.createElement('button');
        noteTeg.classList.add(`${status}`);
        noteTeg.setAttribute('id', id);
        content.append(noteTeg);
        let note = document.querySelectorAll(`.${status}`)[i];
        printMain.push(note);
        note.innerHTML = `
            <button class="button_complete__main">
                <svg id="icon_complete__main" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                </svg>
            </button>
            <div class="title_notes">${containerStatus[i].title}</div>
            <button class="button_delete__main">
                <svg id="icon_delete__main" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
        `
    }
}

/*Функция для кнопки Day-start-*/

const buttonDay = document.querySelectorAll('#button__day')[0];

let plansDayContainer = []; // Создаём контейнер куда будут отсортированы только планы со status: day

let remindersDayContainer = []; // Создаём контейнер куда будут отсортированы только напоминания со status: day

let onePlayFunctionDayPlans = false;

let onePlayFunctionDayReminders = false;

function getOnDelete (container) {
    for (let i = 0; i < container.length; ++i) {
        container[i] = container[i].textContent.split(' ').join('').replace(/\n/g, '')
    }
}

buttonDay.addEventListener('click', async () => {   // Основная функция, вызывающаяся при клике
    if (!onePlayFunctionDayPlans) { // Функция для получения планов
        await getPlansDay(mainJSON);

        onePlayFunctionDayPlans = true;
    }
    if (contentMainPlans.length === 0) { // Функция для вывода планов
        printTegMain(plansDayContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansDayContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    }


    if (!onePlayFunctionDayReminders) { // Функция для получения напоминаний
        await getRemindersDay(mainJSON);

        onePlayFunctionDayReminders = true;
    }

    if (contentMainReminders.length === 0) { // Функция для вывода напоминаний
        printTegMain(remindersDayContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    } else {
        for (let i = 0; i < contentMainReminders.length; ++i) {
            contentMainReminders[i].remove();
        }
        contentMainReminders.length = 0;
        printTegMain(remindersDayContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    }


    console.log('1', plansDayContainer);
    console.log('2', myArr);

    const buttons__cat = document.querySelectorAll('.button__category');
    console.log('arr', buttons__cat);
    categoriesNotes(plansDayContainer, myArr, buttons__cat);

    deleteNotes(plansTitle, 0);
    deleteNotes(remindersTitle, 0);

    deleteNotes(plansTitle, 2);
    deleteNotes(remindersTitle, 2);

    printTitlePlan(plansTitle);
    printTitleReminder(remindersTitle);

    getOnDelete(plansTitle);
    getOnDelete(remindersTitle);
});

function getPlansDay(URL) {
    return fetch(URL, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify({period: "day"})
    })
    .then((data) => data.json())
    .then((plans) => console.log(plans))
    .then((plans) => {
        for (let obj of plans) {
            if (obj.status == "day") {
                plansDayContainer.push(obj)
            }
        }
    })
}


// `function getPlansDay(JSON) {  // Функция для отправки планов со status: day     !!!Замена
//     for (let obj of JSON) {
//         if (obj.note == "plan" && obj.status == "day") {
//             plansDayContainer.push(obj)
//         }
//     }
// }`

function getRemindersDay(JSON) {  // Функция для отправки напоминаний со status: day     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "reminder" && obj.status == "day") {
            remindersDayContainer.push(obj)
        }
    }
}

let notesDayContainer = [];

function getCountNotesDay(JSON) {
    for (let obj of JSON) {
        if (obj.status == "day") {
            notesDayContainer.push(obj)
        }
    }
}

getCountNotesDay(mainJSON);

// printCount(notesDayContainer, 'day');

/*Функция для кнопки Day-end-*/


/*Функция для кнопки Week-start-*/

const buttonWeek = document.querySelectorAll('#button__week')[0];

let plansWeekContainer = []; // Создаём контейнер куда будут отсортированы только планы со status: week

let remindersWeekContainer = []; // Создаём контейнер куда будут отсортированы только напоминания со status: week

let onePlayFunctionWeekPlans = false;

let onePlayFunctionWeekReminders = false;

buttonWeek.addEventListener('click', async () => {     // Основная функция, вызывающаяся при клике
    if (!onePlayFunctionWeekPlans) { // Функция для получения планов
        await getPlansWeek(mainJSON);

        onePlayFunctionWeekPlans = true;
    }

    if (contentMainPlans.length === 0) { // Функция для вывода планов
        printTegMain(plansWeekContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansWeekContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    }


    if (!onePlayFunctionWeekReminders) { // Функция для получения напоминаний
        await getRemindersWeek(mainJSON);

        onePlayFunctionWeekReminders = true;
    }

    if (contentMainReminders.length === 0) { // Функция для вывода напоминаний
        printTegMain(remindersWeekContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    } else {
        for (let i = 0; i < contentMainReminders.length; ++i) {
            contentMainReminders[i].remove();
        }
        contentMainReminders.length = 0;
        printTegMain(remindersWeekContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    }

    deleteNotes(plansTitle, 0);
    deleteNotes(remindersTitle, 0);

    deleteNotes(plansTitle, 2);
    deleteNotes(remindersTitle, 2);

    printTitlePlan(plansTitle)
    printTitleReminder(remindersTitle)

    getOnDelete(plansTitle);
    getOnDelete(remindersTitle);
});

function getPlansWeek(JSON) { // Функция для отправки планов со status: week     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "plan" && obj.status == "week") {
            plansWeekContainer.push(obj)
        }
    }
}

function getRemindersWeek(JSON) {  // Функция для отправки напоминаний со status: week     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "reminder" && obj.status == "week") {
            remindersWeekContainer.push(obj)
        }
    }
}

let notesWeekContainer = [];

function getCountNotesWeek(JSON) {
    for (let obj of JSON) {
        if (obj.status == "week") {
            notesWeekContainer.push(obj)
        }
    }
}

getCountNotesWeek(mainJSON);

// printCount(notesWeekContainer, 'week');

/*Функция для кнопки Week-end-*/


/*Функция для кнопки Month-start-*/

const buttonMonth = document.querySelectorAll('#button__month')[0];

let plansMonthContainer = []; // Создаём контейнер куда будут отсортированы только планы со status: month

let remindersMonthContainer = []; // Создаём контейнер куда будут отсортированы только напоминания со status: month

let onePlayFunctionMonthPlans = false;

let onePlayFunctionMonthReminders = false;

buttonMonth.addEventListener('click', async () => {    // Основная функция, вызывающаяся при клике
    if (!onePlayFunctionMonthPlans) {
        await getPlansMonth(mainJSON);

        onePlayFunctionMonthPlans = true;
    }

    if (contentMainPlans.length === 0) {
        printTegMain(plansMonthContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansMonthContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    }

    if (!onePlayFunctionMonthReminders) {
        await getRemindersMonth(mainJSON);

        onePlayFunctionMonthReminders = true;
    }

    if (contentMainReminders.length === 0) {
        printTegMain(remindersMonthContainer, contentReminders, contentMainReminders, 'reminder');
        plansTitle = contentMainPlans.slice(0);
        remindersTitle = contentMainReminders.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainReminders[i].remove();
        }
        contentMainReminders.length = 0;
        printTegMain(remindersMonthContainer, contentReminders, contentMainReminders, 'reminder');
        plansTitle = contentMainPlans.slice(0);
        remindersTitle = contentMainReminders.slice(0);
    }

    deleteNotes(plansTitle, 0);
    deleteNotes(remindersTitle, 0);

    deleteNotes(plansTitle, 2);
    deleteNotes(remindersTitle, 2);

    printTitlePlan(plansTitle);
    printTitleReminder(remindersTitle);

    getOnDelete(plansTitle);
    getOnDelete(remindersTitle);
});

function getPlansMonth(JSON) { // Функция для отправки планов со status: month     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "plan" && obj.status == "month") {
            plansMonthContainer.push(obj)
        }
    }
}

function getRemindersMonth(JSON) {  // Функция для отправки напоминаний со status: week     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "reminder" && obj.status == "month") {
            remindersMonthContainer.push(obj)
        }
    }
}

let notesMonthContainer = [];

function getCountNotesMonth(JSON) {
    for (let obj of JSON) {
        if (obj.status == "month") {
            notesMonthContainer.push(obj)
        }
    }
}

getCountNotesMonth(mainJSON);

// printCount(notesMonthContainer, 'month');

/*Функция для кнопки Month-end-*/


/*Функция для кнопки Completed-start-*/

const buttonCompleted = document.querySelectorAll('#button__completed')[0];

let plansCompletedContainer = []; // Создаём контейнер куда будут отсортированы только планы со status: completed

let remindersCompletedContainer = []; // Создаём контейнер куда будут отсортированы только напоминания со status: completed

let onePlayFunctionCompletedPlans = false;

let onePlayFunctionCompletedReminders = false;

buttonCompleted.addEventListener('click', async () => {
    if (!onePlayFunctionCompletedPlans) {
        await getPlansCompleted(mainJSON);

        onePlayFunctionCompletedPlans = true;
    }

    if (contentMainPlans.length === 0) {
        printTegMain(plansCompletedContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansCompletedContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    }


    if (!onePlayFunctionCompletedReminders) {
        await getRemindersCompleted(mainJSON);

        onePlayFunctionCompletedReminders = true;
    }

    if (contentMainReminders.length === 0) {
        printTegMain(remindersCompletedContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainReminders[i].remove();
        }
        contentMainReminders.length = 0;
        printTegMain(remindersCompletedContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    }

    deleteNotes(plansTitle, 0);
    deleteNotes(remindersTitle, 0);

    deleteNotes(plansTitle, 2);
    deleteNotes(remindersTitle, 2);

    printTitlePlan(plansTitle);
    printTitleReminder(remindersTitle);

    getOnDelete(plansTitle);
    getOnDelete(remindersTitle);
})

function getPlansCompleted(JSON) { // Функция для отправки планов со status: completed     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "plan" && obj.status == "completed") {
            plansCompletedContainer.push(obj)
        }
    }
}

function getRemindersCompleted(JSON) {  // Функция для отправки напоминаний со status: completed     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "reminder" && obj.status == "completed") {
            remindersCompletedContainer.push(obj)
        }
    }
}

/*Функция для кнопки Completed-end-*/


/*Функция для кнопки Trash-start-*/

const buttonTrash = document.querySelectorAll('#button__trash')[0];

let plansTrashContainer = []; // Создаём контейнер куда будут отсортированы только планы со status: trash

let remindersTrashContainer = []; // Создаём контейнер куда будут отсортированы только напоминания со status: trash

let onePlayFunctionTrashPlans = false;

let onePlayFunctionTrashReminders = false;

buttonTrash.addEventListener('click', async () => {
    if (!onePlayFunctionTrashPlans) {
        await getPlansTrash(mainJSON);

        onePlayFunctionTrashPlans = true;
    }

    if (contentMainPlans.length === 0) {
        printTegMain(plansTrashContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansTrashContainer, contentPlans, contentMainPlans, 'plan');
        plansTitle = contentMainPlans.slice(0);
    }


    if (!onePlayFunctionTrashReminders) {
        await getRemindersTrash(mainJSON);

        onePlayFunctionTrashReminders = true;
    }

    if (contentMainReminders.length === 0) {
        printTegMain(remindersTrashContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainReminders[i].remove();
        }
        contentMainReminders.length = 0;
        printTegMain(remindersTrashContainer, contentReminders, contentMainReminders, 'reminder');
        remindersTitle = contentMainReminders.slice(0);
    }

    deleteNotes(plansTitle, 0);
    deleteNotes(remindersTitle, 0);

    deleteNotes(plansTitle, 2);
    deleteNotes(remindersTitle, 2);

    printTitlePlan(plansTitle);
    printTitleReminder(remindersTitle);

    getOnDelete(plansTitle);
    getOnDelete(remindersTitle);
})

function getPlansTrash(JSON) { // Функция для отправки планов со status: trash     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "plan" && obj.status == "trash") {
            plansTrashContainer.push(obj)
        }
    }
}

function getRemindersTrash(JSON) {  // Функция для отправки напоминаний со status: trash     !!!Замена
    for (let obj of JSON) {
        if (obj.note == "reminder" && obj.status == "trash") {
            remindersTrashContainer.push(obj)
        }
    }
}

/*Функция для кнопки Trash-end-*/

/*!--Основной код--end--!*/