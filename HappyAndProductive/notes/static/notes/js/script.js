/*!--Импорт модулей--start--!*/

import {
    contentPlans, contentReminders, contentMainPlans, contentMainReminders, buttonDay,  plansDayContainer, 
    remindersDayContainer, plansWeekContainer, remindersWeekContainer, plansMonthContainer, remindersMonthContainer, 
    plansCompletedContainer, remindersCompletedContainer, plansTrashContainer, remindersTrashContainer, 
    buttonWeek, buttonMonth, buttonCompleted, buttonTrash, titlesCategories, categoriesContainer, contentCategories
} from './variable/variable.js'
/*!--Переменные--!*/

import { funcUrl, URLCategories } from "./variable/urls.js";
/*!--URLs--!*/

import { printTegMain } from './print/printTegMain.js';
/*!--Функция для отрисовки тегов в главном окне--!*/

import { getNotesDay } from './getNotes.js';
/*--Функция для получения заметок--*/

import { printCount } from './print/printCount.js';
/*--Функция для вывода количества заметок--*/

import { deleteNotesMain } from './delete/deleteMain.js';
/*!--Функция для удаления заметки из главного окна--!*/

import { activePrintDetail } from './print/printTegDetail.js'; 


import { getCategories } from './categories/getCategories.js';
/*!--Функция для получения категорий --!*/

import { printTegCategories } from './categories/printTegCategories.js';
/*!--Функция для вывода тегов для категорий--!*/

import { activeCategory } from './categories/activeCategory.js';
/*!--Функция для кнопок категорий--!*/


let plansTitle = []; // Универсальные контейнера
let remindersTitle = [];

/*!--Импорт модулей--end--!*/


/*!--При загрузке страницы--start--!*/

const loading = async () => { // Функция подгружения 
    // Функции для получения данных
    await getNotesDay(funcUrl('day'), plansDayContainer, remindersDayContainer);
    await getNotesDay(funcUrl('week'), plansWeekContainer, remindersWeekContainer);
    await getNotesDay(funcUrl('month'), plansMonthContainer, remindersMonthContainer);

    await getCategories(URLCategories, categoriesContainer, titlesCategories);


    // Начальный экран <-------->

    // Функции для отрисовки тегов в главном окне
    printTegMain(plansDayContainer, contentPlans, contentMainPlans, 'plan');
    printTegMain(remindersDayContainer, contentReminders, contentMainReminders, 'reminder')

    // Функция для вывода количества заметок
    printCount()

    // Базовые функции
    deleteNotesMain(contentMainPlans, 'plan', 'complete',
     {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
     plansCompletedContainer);   
    deleteNotesMain(contentMainPlans, 'plan', 'delete', 
     {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
     plansTrashContainer);

    deleteNotesMain(contentMainReminders, 'reminder', 'complete',
    {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer},
     remindersCompletedContainer);   
    deleteNotesMain(contentMainReminders, 'reminder', 'delete', 
     {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer}, 
     remindersTrashContainer);

     activePrintDetail(contentMainPlans, 'plan', plansDayContainer);
     activePrintDetail(contentMainReminders, 'reminder', remindersDayContainer);

    // Функции для категорий
    printTegCategories(titlesCategories, contentCategories, categoriesContainer);
    activeCategory(titlesCategories, contentMainPlans);
    activeCategory(titlesCategories, contentMainReminders);
}

loading()

/*!--При загрузке страницы--end--!*/


/*--Основной код--start--*/

// Функция для кнпоки Day
buttonDay.addEventListener('click', () => {

    // Функция для вывода планов
    if (contentMainPlans.length === 0) {
        printTegMain(plansDayContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов из главного окна
        deleteNotesMain(contentMainPlans, 'plan', 'complete',
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansCompletedContainer);   
        deleteNotesMain(contentMainPlans, 'plan', 'delete', 
        {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
        plansTrashContainer);   
 
        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);

    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansDayContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        deleteNotesMain(contentMainPlans, 'plan', 'complete',
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansCompletedContainer);   
        deleteNotesMain(contentMainPlans, 'plan', 'delete', 
        {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
        plansTrashContainer);   
        
        // Для вывода планов в Detail
        printTitleNote(contentMainPlans, 'plan', plansDayContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);
    }

    // Функция для вывода напоминаний
    if (contentMainReminders.length === 0) {
        printTegMain(remindersDayContainer, contentReminders, contentMainReminders, 'reminder');

        // Для удаления напоминаний
        deleteNotesMain(contentMainReminders, 'reminder', 'complete',
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer},
          remindersCompletedContainer);   
        deleteNotesMain(contentMainReminders, 'reminder', 'delete', 
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer}, 
         remindersTrashContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);

    } else {
        for (let i = 0; i < contentMainReminders.length; ++i) {
            contentMainReminders[i].remove();
        }
        contentMainReminders.length = 0;
        printTegMain(remindersDayContainer, contentReminders, contentMainReminders, 'reminder');

        // Для удаления напоминаний
        deleteNotesMain(contentMainReminders, 'reminder', 'complete',
        {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer},
         remindersCompletedContainer);   
       deleteNotesMain(contentMainReminders, 'reminder', 'delete', 
        {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer}, 
        remindersTrashContainer);

        // Для вывода напоминаний в Detail
        printTitleNote(contentMainReminders, 'reminder', remindersDayContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);
    }
})


// Функция для кнпоки Week
buttonWeek.addEventListener('click', () => {

    // Функция для вывода планов
    if (contentMainPlans.length === 0) {
        printTegMain(plansWeekContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        deleteNotesMain(contentMainPlans, 'plan', 'complete',
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansCompletedContainer);   
        deleteNotesMain(contentMainPlans, 'plan', 'delete', 
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansTrashContainer); 
        
        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);
        
    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansWeekContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        deleteNotesMain(contentMainPlans, 'plan', 'complete',
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansCompletedContainer);   
        deleteNotesMain(contentMainPlans, 'plan', 'delete', 
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansTrashContainer);   
        
        // Для вывода планов в Detail
        printTitleNote(contentMainPlans, 'plan', plansWeekContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);
    }

    // Функция для вывода напоминаний
    if (contentMainReminders.length === 0) {
        printTegMain(remindersWeekContainer, contentReminders, contentMainReminders, 'reminder');

        // Для удаления напоминаний
        deleteNotesMain(contentMainReminders, 'reminder', 'complete',
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer},
          remindersCompletedContainer);   
        deleteNotesMain(contentMainReminders, 'reminder', 'delete', 
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer}, 
         remindersTrashContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);


    } else {
        for (let i = 0; i < contentMainReminders.length; ++i) {
            contentMainReminders[i].remove();
        }
        contentMainReminders.length = 0;
        printTegMain(remindersWeekContainer, contentReminders, contentMainReminders, 'reminder');

        // Для удаления напоминаний
        deleteNotesMain(contentMainReminders, 'reminder', 'complete',
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer},
          remindersCompletedContainer);   
        deleteNotesMain(contentMainReminders, 'reminder', 'delete', 
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer}, 
         remindersTrashContainer);

        // Для вывода напоминаний в Detail
        printTitleNote(contentMainReminders, 'reminder', remindersWeekContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);
    }
})


// Функция для кнпоки Month
buttonMonth.addEventListener('click', () => {

    // Функция для вывода планов
    if (contentMainPlans.length === 0) {
        printTegMain(plansMonthContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        deleteNotesMain(contentMainPlans, 'plan', 'complete',
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansCompletedContainer);   
        deleteNotesMain(contentMainPlans, 'plan', 'delete', 
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansTrashContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);

    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansMonthContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        deleteNotesMain(contentMainPlans, 'plan', 'complete',
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansCompletedContainer);   
        deleteNotesMain(contentMainPlans, 'plan', 'delete', 
         {dayContainer: plansDayContainer, weekContainer: plansWeekContainer, monthContainer: plansMonthContainer}, 
         plansTrashContainer);
        
        // Для вывода планов в Detail
        printTitleNote(contentMainPlans, 'plan', plansMonthContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);
    }

    // Функция для вывода напоминаний
    if (contentMainReminders.length === 0) {
        printTegMain(remindersMonthContainer, contentReminders, contentMainReminders, 'reminder');
        
        // Для удаления напоминаний
        deleteNotesMain(contentMainReminders, 'reminder', 'complete',
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer},
          remindersCompletedContainer);   
        deleteNotesMain(contentMainReminders, 'reminder', 'delete', 
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer}, 
         remindersTrashContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);


    } else {
        for (let i = 0; i < contentMainReminders.length; ++i) {
            contentMainReminders[i].remove();
        
        }
        contentMainReminders.length = 0;
        printTegMain(remindersMonthContainer, contentReminders, contentMainReminders, 'reminder');

        // Для удаления напоминаний
        deleteNotesMain(contentMainReminders, 'reminder', 'complete',
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer},
          remindersCompletedContainer);   
        deleteNotesMain(contentMainReminders, 'reminder', 'delete', 
         {dayContainer: remindersDayContainer, weekContainer: remindersWeekContainer, monthContainer: remindersMonthContainer}, 
         remindersTrashContainer);

        // Для вывода напоминаний в Detail
        printTitleNote(contentMainReminders, 'reminder', remindersMonthContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);
    }
})


// Функция для кнопки Completed
buttonCompleted.addEventListener('click', () => {

    // Функция для вывода планов
    if (contentMainPlans.length === 0) {
        printTegMain(plansCompletedContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        // deleteNotesMain(contentMainPlans, 'plan', 'complete', plansCompletedContainer, []);   
        // deleteNotesMain(contentMainPlans, 'plan', 'delete', plansCompletedContainer, []);

        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);

    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansCompletedContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        // deleteNotesMain(contentMainPlans, 'plan', 'complete', plansCompletedContainer, []);   
        // deleteNotesMain(contentMainPlans, 'plan', 'delete', plansCompletedContainer, []);   
        
        // Для вывода планов в Detail
        printTitleNote(contentMainPlans, 'plan', plansCompletedContainer);

        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);
    }

    // Функция для вывода напоминаний
    if (contentMainReminders.length === 0) {
        printTegMain(remindersCompletedContainer, contentReminders, contentMainReminders, 'reminder');
        
        // Для удаления напоминаний
        deleteNotesMain(contentMainReminders, 'reminder', 'complete', remindersCompletedContainer, []);
        deleteNotesMain(contentMainReminders, 'reminder', 'delete', remindersCompletedContainer, []);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);


    } else {
        for (let i = 0; i < contentMainReminders.length; ++i) {
            contentMainReminders[i].remove();
        
        }
        contentMainReminders.length = 0;
        printTegMain(remindersCompletedContainer, contentReminders, contentMainReminders, 'reminder');

        // Для удаления напоминаний
        // deleteNotesMain(contentMainReminders, 'reminder', 'complete', remindersCompletedContainer, []);
        // deleteNotesMain(contentMainReminders, 'reminder', 'delete', remindersCompletedContainer, []);

        // Для вывода напоминаний в Detail
        printTitleNote(contentMainReminders, 'reminder');

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);
    }
})


// Функция для кнопки Trash
buttonTrash.addEventListener('click', () => {

    // Функция для вывода планов
    if (contentMainPlans.length === 0) {
        printTegMain(plansTrashContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        // deleteNotesMain(contentMainPlans, 'plan', 'complete', plansTrashContainer, []);   
        // deleteNotesMain(contentMainPlans, 'plan', 'delete', plansTrashContainer, []);

        // Для категорий
        activeCategory(titlesCategories, contentMainPlans);

    } else {
        for (let i = 0; i < contentMainPlans.length; ++i) {
            contentMainPlans[i].remove();
        }
        contentMainPlans.length = 0;
        printTegMain(plansTrashContainer, contentPlans, contentMainPlans, 'plan');

        // Для удаления планов
        // deleteNotesMain(contentMainPlans, 'plan', 'complete', plansTrashContainer, []);   
        // deleteNotesMain(contentMainPlans, 'plan', 'delete', plansTrashContainer, []);   
        
        // Для вывода планов в Detail
        printTitleNote(contentMainPlans, 'plan');

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);
    }

    // Функция для вывода напоминаний
    if (contentMainReminders.length === 0) {
        printTegMain(remindersTrashContainer, contentReminders, contentMainReminders, 'reminder');
        
        // Для удаления напоминаний
        // deleteNotesMain(contentMainReminders, 'reminder', 'complete', remindersTrashContainer, []);
        // deleteNotesMain(contentMainReminders, 'reminder', 'delete', remindersTrashContainer, []);

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);


    } else {
        for (let i = 0; i < contentMainReminders.length; ++i) {
            contentMainReminders[i].remove();
        
        }
        contentMainReminders.length = 0;
        printTegMain(remindersTrashContainer, contentReminders, contentMainReminders, 'reminder');

        // Для удаления напоминаний
        // deleteNotesMain(contentMainReminders, 'reminder', 'complete', remindersTrashContainer, []);
        // deleteNotesMain(contentMainReminders, 'reminder', 'delete', remindersTrashContainer, []);

        // Для вывода напоминаний в Detail
        printTitleNote(contentMainReminders, 'reminder');

        // Для категорий
        activeCategory(titlesCategories, contentMainReminders);
    }
})

/*--Основной код--end--*/