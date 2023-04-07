/*!--Функции для получения--!*/

const getNotesDay = async (URL, plansContainer, remindersContainer) => {
    await fetch(URL, {
        method: 'GET',
        headers: {
            "Content": 'application/json', 
            "Accept": 'application/json'
        }
    })
    .then((notes) => notes.json())
    .then((notes) => {
        for (let plan of notes["plans"]) {
            plansContainer.push(plan)
        }
        for (let reminder of notes["reminders"]) {
            remindersContainer.push(reminder)
        }
    })
}

export { getNotesDay }