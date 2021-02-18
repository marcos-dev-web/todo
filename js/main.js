const todoContainer = document.querySelector('.list_todo_items');
const buttonDone = document.querySelector('#done_make');
const inputText = document.querySelector('input#todo_name');

const todo = {
  create(text) {
    let containerTodo = document.createElement('li'); // li.item_todo
    let containerText = document.createElement('p'); // p.text
    let containerButtons = document.createElement('div') // div.buttons
    let buttonTrash = document.createElement('button') // button.done.trash
    let tagTrash = document.createElement('i') // i.fas.fa-trash

    //add classes
    containerTodo.classList.add('item_todo');
    containerText.classList.add('text');
    containerButtons.classList.add('buttons');
    buttonTrash.classList.add('done');
    buttonTrash.classList.add('trash');
    tagTrash.classList.add('fas');
    tagTrash.classList.add('fa-trash');

    //add content
    containerText.textContent = text;

    //encapsulation
      //container buttons
      buttonTrash.appendChild(tagTrash);
      containerButtons.appendChild(buttonTrash);
      //container li item_todo
      containerTodo.appendChild(containerText);
      containerTodo.appendChild(containerButtons);
    
    //add Event
    function del() {
      todo.remove(containerTodo);
    }
    buttonTrash.addEventListener('click', del)
    return containerTodo;
  },
  render(todo) {
    todoContainer.appendChild(todo);
  },
  remove(todoDiv) {
    const parent = todoDiv.parentNode;
    parent.removeChild(todoDiv);
    todo.minCounter()
  },
  plusCounter() {
    const divNumber = document.querySelector('#tot_number');
    const currentValue = Number.parseInt(divNumber.textContent);
    divNumber.innerText = currentValue + 1;
  },
  minCounter() {
    const divNumber = document.querySelector('#tot_number');
    const currentValue = Number.parseInt(divNumber.textContent);
    divNumber.innerText = currentValue - 1;
  },
  error(text) {
    const alertDiv = document.querySelector('.alert');
    alertDiv.querySelector('.msg').innerText = text;
    alertDiv.style.top = 0;
    setTimeout(() => {
      alertDiv.removeAttribute('style');
    }, 3000)
  }
}

function newTd() {
  const inputText = document.querySelector('input#todo_name');
  const inputValue = inputText.value;
  if (inputValue) {
    const newTodo = todo.create(inputValue);
    todo.render(newTodo);
    inputText.value = '';
    todo.plusCounter();
    inputText.focus()
  } else {
    todo.error('field todo is empty')
  }
}

buttonDone.addEventListener('click', newTd);
inputText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    newTd();
  }
})