import { plansDayContainer, remindersDayContainer, plansWeekContainer,
        remindersWeekContainer, plansMonthContainer, remindersMonthContainer
} from "../variable/variable.js";


/*!--Функция для подсчёта количества заметок--!*/
function Count(len, status) {
    const teg = document.querySelectorAll(`#count__${status}`)[0];
    teg.innerHTML = `${len}`;
}


/*--Функция для вывода количества заметок--*/
function printCount() { 
    let lenDay = plansDayContainer.length + remindersDayContainer.length; // Контейнер в котором будут хранится и планы и напоминания c периудом: day
    Count(lenDay, 'day'); // Функция для вывода количества заметок c периудом: day

    let lenWeek = plansWeekContainer.length + remindersWeekContainer.length; // Контейнер в котором будут хранится и планы и напоминания c периудом: week
    Count(lenWeek, 'week'); // Функция для вывода количества заметок c периудом: week

    let lenMonth = plansMonthContainer.length + remindersMonthContainer.length; // Контейнер в котором будут хранится и планы и напоминания c периудом: month
    Count(lenMonth, 'month'); // Функция для вывода количества заметок c периудом: month
}

export { printCount }