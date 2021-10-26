const toDoContainer = document.querySelector('.toDo-container');
const Todo = document.querySelector('.toDoIcon');
const toDay = document.querySelector('.toDay').children[0];
const done = document.querySelector('.done').children[0];
const todoInput = document.querySelector('.todoInput');
const selectTodo = document.querySelector('.toDayorDone');
let isOpenTodo = false;
let countActive;
let toDayObj;
let doneObj;

if (localStorage.getItem('countActive') == null) {
  countActive = 0;
} else {
  countActive = localStorage.getItem('countActive');
}
if (localStorage.getItem('toDayObj') == null) {
  toDayObj = {};
} else {
  let toDayList = localStorage.getItem('toDayObj');
  toDayObj = JSON.parse(toDayList);
}

if (localStorage.getItem('doneObj') == null) {
  doneObj = {};
} else {
  let doneList = localStorage.getItem('doneObj');
  doneObj = JSON.parse(doneList);
}

function openTodo() {
  if (isOpenTodo == false) {
    isOpenTodo = true;
    toDoContainer.className = 'toDo-container';
    toDoContainer.classList.add('toDo-container-open');
  } else {
    isOpenTodo = false;
    toDoContainer.className = 'toDo-container';
  }
}

function swapList() {
  if (this.value == 'done') {
    toDay.parentElement.className = 'today';
    done.parentElement.classList.add('onList');
  } else if (this.value == 'today') {
    done.parentElement.className = 'done';
    toDay.parentElement.classList.add('onList');
  }
}

function delList() {
  this.parentElement.remove();
  delete toDayObj[this.parentElement.id];
  delete doneObj[this.parentElement.id];
}

function crossOutTheWord() {
  let li = this.parentElement;
  if (this.nextSibling.className == 'todo-item-title') {
    this.nextSibling.classList.add('crossOut');
    done.append(li);
    doneObj[this.parentElement.id] = this.nextSibling.textContent;
    delete toDayObj[this.parentElement.id];
  } else {
    this.nextSibling.className = 'todo-item-title';
    toDay.append(li);
    toDayObj[this.parentElement.id] = this.nextSibling.textContent;
    delete doneObj[this.parentElement.id];
  }
}

function addTodo(event) {
  if (event.code == 'Enter') {
    let textInInput = todoInput.value;
    const li = document.createElement('li');
    li.classList.add('styleForLi');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('check-item');
    input.addEventListener('click', crossOutTheWord);
    const spanText = document.createElement('span');
    spanText.classList.add('todo-item-title');
    spanText.textContent = textInInput;
    const spanDel = document.createElement('span');
    spanDel.textContent = 'x';
    spanDel.classList.add('delTodo');
    spanDel.addEventListener('click', delList)
    li.append(input)
    li.append(spanText)
    li.append(spanDel)
    li.id = countActive;
    toDay.append(li);
    toDayObj[countActive] = textInInput;
    countActive++;
    todoInput.value = '';
  }
}

function addafterLoading(obj, list) {
  for (let key in obj) {
    let textInInput = obj[key];
    const li = document.createElement('li');
    li.classList.add('styleForLi');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('check-item');
    input.addEventListener('click', crossOutTheWord);
    const spanText = document.createElement('span');
    spanText.classList.add('todo-item-title');
    if (list == done)  {
      spanText.classList.add('crossOut');
      input.checked = 'checked';
    }
    spanText.textContent = textInInput;
    const spanDel = document.createElement('span');
    spanDel.textContent = 'x';
    spanDel.classList.add('delTodo');
    spanDel.addEventListener('click', delList)
    li.append(input)
    li.append(spanText)
    li.append(spanDel)
    li.id = key;
    list.append(li);
  }
}

addafterLoading(toDayObj, toDay);
addafterLoading(doneObj, done);

selectTodo.addEventListener('change', swapList)
todoInput.addEventListener('keydown', addTodo);
Todo.addEventListener('click', openTodo);

console.log('Самопроверка \n Все пункты выполнены. Набрал 160 баллов из 150. \n Если найдете ошибки, пишите в дискорд k1ndum#3452. Спасибо за проверку ;)')