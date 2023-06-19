import Model from './model.js';
import View from './view.js';

const model = new Model();
const view = new View(model.tasks);

// Находим форму на странице и слушем у нее событие сабмит
view.elements.form.addEventListener("submit", function(event){
    event.preventDefault(); // Метод preventDefault() используется для того чтобы отменить событие отправки формы 
    
    // Создаем новую задачу
    const newTask = model.addTask(view.elements.input.value);
    // Рендер задачи на странице
    view.renderTask(newTask);
    view.clearInput();
})

// Нажали на чекбох, или кнопку удалить
view.elements.tasksList.addEventListener("click", function(e){
    // Проверяем клик по checkbox на наличие type
    if(e.target.getAttribute('type') === 'checkbox') {
        const id = e.target.closest('.todo-item').dataset.id;
        const task = model.findTask(id);
        model.changeStatus(task);
        view.changeStatus(task);
    }
    // Клик по кнопке удалить
    if(e.target.hasAttribute('data-delete')) {
        const id = e.target.closest('.todo-item').dataset.id;
        const task = model.findTask(id);
        model.removeTask(task);
        view.removeTask(task);
    }
})
