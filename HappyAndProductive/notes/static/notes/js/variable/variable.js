/*!--Основные переменные--start--!*/

const contentPlans = document.querySelectorAll('#content__plans')[0]; // Получаем контейнер(тег Html), в котором будут храниться все планы
const contentReminders = document.querySelectorAll('#content__reminders')[0]; // Получаем контейнер(тег Html), в котором будут храниться все напоминания

let contentMainPlans = []; // Создаём массив в котором будут храниться уже выведенные планы
let contentMainReminders = []; // Создаём массив в котором будут храниться уже выведенные напоминания

const titlesCategories = []; // Массив с заголовками всех категорий
const categoriesContainer = []; // Массив со всеми категориями
const contentCategories = document.getElementById('category_body'); // Получаем контейнер(тег Html), в котором будут храниться все категории 

const inputTitleNotes = document.getElementById('titleNotes');
const inputTextNotes = document.getElementById('textNotes');
const selectStatus = document.getElementById('selectStatus');

const startDisplay = document.querySelectorAll('.start_display')[0];
const mainDisplay = document.querySelectorAll('.main_display')[0];

const buttonSave = document.getElementById('buttonSave');

/*!--Основные переменные--end--!*/


/*!--Переменные для Day--start--!*/

const buttonDay = document.querySelectorAll('#button__day')[0];

const plansDayContainer = []; // Создаём контейнера куда будут отсортированы только планы
const remindersDayContainer = []; // и напоминания со status: day

let onePlayFunctionDayPlans = false; // Переменные для однократного вызова функции
let onePlayFunctionDayReminders = false;

/*!--Переменные для Day--end--!*/


/*!--Переменные для Week--start--!*/

const buttonWeek = document.querySelectorAll('#button__week')[0];

const plansWeekContainer = []; // Создаём контейнера куда будут отсортированы только планы
const remindersWeekContainer = []; // и напоминания со status: week

let onePlayFunctionWeekPlans = false;
let onePlayFunctionWeekReminders = false;

/*!--Переменные для Week--end--!*/


/*!--Переменные для Month--start--!*/

const buttonMonth = document.querySelectorAll('#button__month')[0];

const plansMonthContainer = []; // Создаём контейнера куда будут отсортированы только планы
const remindersMonthContainer = []; // и напоминания со status: month

let onePlayFunctionMonthPlans = false;
let onePlayFunctionMonthReminders = false;

/*!--Переменные для Month--end--!*/


/*!--Переменные для Completed--start--!*/

const buttonCompleted = document.querySelectorAll('#button__completed')[0];

const plansCompletedContainer = []; // Создаём контейнера куда будут отсортированы только планы
const remindersCompletedContainer = []; // и напоминания со status: completed

let onePlayFunctionCompletedPlans = false;
let onePlayFunctionCompletedReminders = false;

/*!--Переменные для Completed--end--!*/


/*!--Переменные для Trash--start--!*/

const buttonTrash = document.querySelectorAll('#button__trash')[0];

const plansTrashContainer = []; // Создаём контейнера куда будут отсортированы только планы
const remindersTrashContainer = []; // и напоминания со status: trash

let onePlayFunctionTrashPlans = false;
let onePlayFunctionTrashReminders = false;

/*!--Переменные для Trash--end--!*/

export { contentPlans, contentReminders, contentMainPlans, contentMainReminders,
        buttonDay, plansDayContainer, remindersDayContainer, plansWeekContainer,
        remindersWeekContainer, plansMonthContainer, remindersMonthContainer, plansCompletedContainer,
        remindersCompletedContainer, plansTrashContainer, remindersTrashContainer, buttonWeek, buttonMonth, 
        buttonCompleted, buttonTrash, titlesCategories, categoriesContainer, contentCategories,
        inputTitleNotes, inputTextNotes, selectStatus, startDisplay, mainDisplay, buttonSave
}