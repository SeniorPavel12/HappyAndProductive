/*!--Функция для получения категорий --!*/

const getCategories = async (URL, categoriesContainer, titlesCategories) => {
    await fetch(URL, {
        method: 'GET',
        headers: {
            "Content": 'application/json', 
            "Accept": 'application/json'
        }
    })
    .then((categories) => categories.json())
    .then((categories) => {
        for (let cat of categories) {
            categoriesContainer.push(cat)
            titlesCategories.push(cat.title)
        }
    })
}

export { getCategories }