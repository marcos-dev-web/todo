const todoContainer = document.querySelector(".list_todo_items");
const buttonDone = document.querySelector("#done_make");
const inputText = document.querySelector("input#todo_name");

const ce = (e) => {
  const element = document.createElement(e);
  return {
    addClass(className) {
      element.classList.add(className);
    },
    append(el) {
      element.appendChild(el);
    },
    listen(eventName, func) {
      element.addEventListener(eventName, func);
    },
    text(txt) {
      element.textContent = txt;
    },
    el: element,
  };
};

const todo = {
  create(text) {
    let containerTodo = ce("li"); // li.item_todo
    let containerText = ce("p"); // p.text
    let containerButtons = ce("div"); // div.buttons
    let buttonTrash = ce("button"); // button.done.trash
    let tagTrash = ce("i"); // i.fas.fa-trash

    //add classes
    containerTodo.addClass("item_todo");
    containerText.addClass("text");
    containerButtons.addClass("buttons");
    buttonTrash.addClass("done");
    buttonTrash.addClass("trash");
    tagTrash.addClass("fas");
    tagTrash.addClass("fa-trash");

    //add content
    containerText.text(text);

    //encapsulation
    //container buttons
    buttonTrash.append(tagTrash.el);
    containerButtons.append(buttonTrash.el);
    //container li item_todo
    containerTodo.append(containerText.el);
    containerTodo.append(containerButtons.el);

    //add Event
    function del() {
      todo.remove(containerTodo.el);
    }
    buttonTrash.listen("click", del);
    return containerTodo.el;
  },
  render(todo) {
    todoContainer.append(todo);
  },
  remove(todoDiv) {
    todoDiv.style.transform = "rotate(10deg)";
    todoDiv.style.opacity = "0.5";
    todoDiv.style.left = "10px";
    setTimeout(() => {
      const parent = todoDiv.parentNode;
      parent.removeChild(todoDiv);
      todo.downCounter();
    }, 250);
  },
  upCounter() {
    const divNumber = document.querySelector("#tot_number");
    const currentValue = Number.parseInt(divNumber.textContent);
    divNumber.innerText = currentValue + 1;
  },
  downCounter() {
    const divNumber = document.querySelector("#tot_number");
    const currentValue = Number.parseInt(divNumber.textContent);
    divNumber.innerText = currentValue - 1;
  },
  alertMsg(text) {
    const alertDiv = document.querySelector(".alert");
    alertDiv.querySelector(".msg").innerText = text;
    alertDiv.style.top = 0;
    setTimeout(() => {
      alertDiv.removeAttribute("style");
    }, 3000);
  },
};

function newTd() {
  const inputText = document.querySelector("input#todo_name");
  const inputValue = inputText.value;
  if (inputValue) {
    const newTodo = todo.create(inputValue);
    todo.render(newTodo);
    inputText.value = "";
    todo.upCounter();
    inputText.focus();
  } else {
    todo.alertMsg("field todo is empty");
  }
}

const actions = {
  Enter: newTd,
};

buttonDone.addEventListener("click", newTd);
inputText.addEventListener("keydown", (event) => {
  actions[event.key] && actions[event.key]();
});
