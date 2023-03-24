const buttonCreatePlans = document.querySelector('.button_create__plans');
const inputCreatePlans = document.querySelector('.input_create__plans');
const inputDataPlans = document.querySelector('.input_data__plans');
const selectImportantPlans = document.querySelector('.select_important__plans');
const URLPlans = 'api/create_records/create_plan/';

function createPlans(URL, button, input, inputData, selectImportant) {
    button.addEventListener('click', function() {
        const valueInput = input.value
        const valueInputDataPlans = inputData.value
        const valueSelectImportant = selectImportant.value.toUpperCase()
        console.log(valueInput, valueInputDataPlans, valueSelectImportant);
        sendPlans(URL, valueInput, valueInputDataPlans, valueSelectImportant);
    })
}

const sendPlans =  async (URL, title, completion, important) => {
    await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
        },
        body: JSON.stringify({title: `${title}`, info: {
            date_completion: `${completion}`,
            importance: `${important}`
        }})
    })
}

// function getPlansDay(URL) {
//     return fetch(URL, {
//         method: 'POST',
//         headers: {
//             "Content-type": 'application/json',
//         },
//         body: JSON.stringify({period: "day"})
//     })
//     .then((data) => data.json())
//     .then((plans) => console.log(plans))
//     .then((plans) => {
//         for (let obj of plans) {
//             if (obj.status == "day") {
//                 plansDayContainer.push(obj)
//             }
//         }
//     })
// }

export { createPlans, URLPlans, buttonCreatePlans, inputCreatePlans, inputDataPlans, selectImportantPlans }