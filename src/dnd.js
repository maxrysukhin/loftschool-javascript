/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let el = document.createElement('div');
    let width;

    do {
        width = Math.floor(Math.random() * Math.floor(300));
    } while (width < 150);

    let red = Math.floor(Math.random() * Math.floor(255));
    let green = Math.floor(Math.random() * Math.floor(255));
    let blue = Math.floor(Math.random() * Math.floor(255));
    
    let yPos = Math.floor(Math.random() * (Math.floor(screen.height - width)));
    let xPos = Math.floor(Math.random() * (Math.floor(screen.width - width)));
    
    el.className = 'draggable-div';
    el.style.width = width + 'px';
    el.style.height = width + 'px';
    el.style.background = 'rgb(' + red + ',' + green + ',' + blue + ')';
    el.style.top = yPos + 'px';
    el.style.left = xPos + 'px';
    el.style.position = 'fixed';

    return el;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let active = false;
    let startX,
        startY,
        originX,
        originY;

    target.addEventListener('mousedown', (e) => {
        let rect = target.getBoundingClientRect();
        
        target.style.zIndex = 5;

        startX = e.clientX;
        startY = e.clientY;
        originX = rect.left;
        originY = rect.top;
        active = true;
    });
    target.addEventListener('mousemove', (e) => {
        if (active) {

            target.style.left = originX + (e.clientX - startX) + 'px';
            target.style.top = originY + (e.clientY - startY) + 'px';
        }
    });
    target.addEventListener('mouseup', () => {
        target.style.zIndex = 0;
        active = false;
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
