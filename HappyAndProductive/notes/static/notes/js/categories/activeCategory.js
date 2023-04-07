/*!--Функция для кнопок категорий--!*/

import { contentPlans, contentReminders } from '../variable/variable.js'
/*!--Получаем теги Html, в которых будут выводится заметки--!*/


// Функция активации
function buttonActiveCategory(button, mainContainer) {
    button.addEventListener('click', () => {
        const copyContainer = [];
        for (let el of mainContainer) {
            console.log(el);
            if (el.getAttribute('group') !== button.id) {
                copyContainer.push(el);
                el.remove()
            }
        }

        for (let el of copyContainer) {
            mainContainer.push(el);
        }

        button.addEventListener('click', () => {
            console.log('click 2');
            for (let el of copyContainer) {
                if (el.getAttribute('class') === 'plan') {
                    contentPlans.append(el);
                } else if (el.getAttribute('class') === 'reminder') {
                    contentReminders.append(el);
                }
            }
        })
    })
}



// Функция для кнопок категорий
function activeCategory(titlesCategories, mainContainer) {
    for (let i = 0; i < titlesCategories.length; i++) {
        const button = document.querySelectorAll('.button__category')[i];
        
        buttonActiveCategory(button, mainContainer)
    }
}

export { activeCategory }