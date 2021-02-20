//selectors
const textInput = document.querySelector(".textinput");
const addButton = document.querySelector(".addbutton");
const filterOption = document.querySelector(".filter-todo");
const colorPicker = document.querySelector(".cp");

const todoListUl = document.querySelector(".todolist");

//eventListeners
addButton.addEventListener("click", addItem);//eventListener
filterOption.addEventListener("change", filterTodo);//eventListener
colorPicker.addEventListener("change", pickColor);//eventListener
document.addEventListener("DOMContentLoaded", getTodos);//eventListener

//functions

function addItem(event) {
    event.preventDefault();

    if (textInput.value != "") {

        const newItemLi = document.createElement("li");
        newItemLi.classList.add("item");

        const newItemLiP = document.createElement("p")
        newItemLiP.innerText = textInput.value;

        const newButtonDel = document.createElement("button");
        newButtonDel.classList.add("delete");
        newButtonDel.innerHTML = (`<i class="fa fa-trash" aria-hidden="true"></i>`);

        const newButtonChecked = document.createElement("button");
        newButtonChecked.classList.add("checked");
        newButtonChecked.innerHTML = (`<i class="fa fa-check" aria-hidden="true"></i>`);

        newItemLi.appendChild(newItemLiP);
        saveLocalTodos(newItemLiP.innerText);
        newItemLi.appendChild(newButtonDel);
        newItemLi.appendChild(newButtonChecked);

        todoListUl.appendChild(newItemLi);

        textInput.value = "";

        newItemLi.addEventListener("click", deletecheck);//eventListener
    }
}
function deletecheck(e) {
    const clickedTarget = e.target;
    if (clickedTarget.classList[0] === "delete") {
        const clickedTargetParent = clickedTarget.parentElement;
        clickedTargetParent.classList.add("fade");
        removeLocalTodos(clickedTargetParent);
        clickedTargetParent.addEventListener("transitionend", function () {
            clickedTargetParent.remove();//eventListener
        })
    }
    if (clickedTarget.classList[0] === "checked") {
        const clickedTargetParent = clickedTarget.parentElement;
        clickedTargetParent.classList.toggle("completed");
    }
}
function filterTodo(e) {
    const todos = todoListUl.childNodes;
    console.log(todos);
    todos.forEach(function (item) {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                if (item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
        }
    })
}

function pickColor() {
    const boDy = document.querySelector(".body");
    console.log(boDy);
    boDy.style.backgroundColor = colorPicker.value;
}


function saveLocalTodos(todo) {
    let all;
    if (localStorage.getItem("all") === null) {
        all = [];
    } else {
        all = JSON.parse(localStorage.getItem("all"));
    }
    all.push(todo);
    localStorage.setItem("all", JSON.stringify(all));
}
function getTodos() {
    let all;
    if (localStorage.getItem("all") === null) {
        all = [];
    } else {
        all = JSON.parse(localStorage.getItem("all"));
    }
    all.forEach(function (todo) {
        const newItemLi = document.createElement("li");
        newItemLi.classList.add("item");

        const newItemLiP = document.createElement("p")
        newItemLiP.innerText = todo;

        const newButtonDel = document.createElement("button");
        newButtonDel.classList.add("delete");
        newButtonDel.innerHTML = (`<i class="fa fa-trash" aria-hidden="true"></i>`);

        const newButtonChecked = document.createElement("button");
        newButtonChecked.classList.add("checked");
        newButtonChecked.innerHTML = (`<i class="fa fa-check" aria-hidden="true"></i>`);

        newItemLi.appendChild(newItemLiP);
        newItemLi.appendChild(newButtonDel);
        newItemLi.appendChild(newButtonChecked);

        todoListUl.appendChild(newItemLi);
        newItemLi.addEventListener("click", deletecheck);//eventListener

    });
}
function removeLocalTodos(todo) {
    let all;
    if (localStorage.getItem("all") === null) {
        all = [];
    } else {
        all = JSON.parse(localStorage.getItem("all"));
    }
    console.log();
    const allIndex = todo.children[0].innerText;
    all.splice(all.indexOf(allIndex), 1);
    localStorage.setItem("all", JSON.stringify(all));
}




