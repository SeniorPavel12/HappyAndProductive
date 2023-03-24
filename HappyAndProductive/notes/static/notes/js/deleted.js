/*!--Функция для удаления заметки из главного окна--!*/

function buttonActiveDeleted (button, teg) {
    button.addEventListener('click', () => {
        teg.remove();
    })
}

function deleteNotes (container, index) {
    for (let i = 0; i < container.length; ++i) {
        const child = container[i];
        const buttonComplete = child.children[index];

        buttonActiveDeleted(buttonComplete, child);
    }
}

export {deleteNotes}