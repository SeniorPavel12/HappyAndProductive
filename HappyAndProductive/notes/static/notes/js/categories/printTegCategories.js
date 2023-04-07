/*!--Функция для вывода тегов для категорий--!*/

function printTegCategories(titlesCategories, where, containerCat) {
    for (let i = 0; i < titlesCategories.length; i++) {
        let catTeg = document.createElement('div');
        catTeg.classList.add('category');
        where.append(catTeg);
        catTeg.innerHTML = `
            <button id="${containerCat[i].id}" class="button__category">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
            </button>
            <div class="title__category">${titlesCategories[i]}</div>
        `
    }
}

export { printTegCategories }