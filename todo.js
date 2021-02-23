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
document.addEventListener("DOMContentLoaded", setLsColor);
//functions

function addItem(event) {
    event.preventDefault();

    if (textInput.value != "" && textInput.value.trim() !== "") {

        const newItemLi = document.createElement("li");
        newItemLi.classList.add("item");

        const newItemLiP = document.createElement("pre")
        newItemLiP.innerText = textInput.value;//.trim()

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
    } else {
        textInput.value = "";
    }
}
function deletecheck(e) {
    const clickedTarget = e.target;
    if (clickedTarget.classList[0] === "delete") {
        clickedTarget.parentElement.classList.add("fade");
        removeLocalTodos(clickedTarget.parentElement);
        clickedTarget.parentElement.addEventListener("transitionend", function () {//eventListener
            clickedTarget.parentElement.remove();
        })
    }
    if (clickedTarget.classList[0] === "checked") {
        clickedTarget.parentElement.classList.toggle("completed");
        //add to ls
        let comp;
        if (localStorage.getItem("completed") === null) {
            comp = [];
        } else {
            comp = JSON.parse(localStorage.getItem("completed"));
        }
        if (comp.includes(clickedTarget.parentElement.childNodes[0].innerText)) {
            comp.splice(comp.indexOf(clickedTarget.parentElement.childNodes[0].innerText), 1);
        } else {
            comp.push(clickedTarget.parentElement.childNodes[0].innerText);
        }
        localStorage.setItem("completed", JSON.stringify(comp));
    }
}
function filterTodo(e) {
    const todos = todoListUl.childNodes;
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

function pickColor() {// apply to bg and store in ls
    const boDy = document.querySelector(".body");
    boDy.style.backgroundColor = colorPicker.value;

    if (localStorage.getItem("cpVal") === null) {
        let newColorPickerValue;
        newColorPickerValue = [];
    } else {
        newColorPickerValue = JSON.parse(localStorage.getItem("cpVal"));
    }
    newColorPickerValue = colorPicker.value;

    localStorage.setItem("cpVal", JSON.stringify(newColorPickerValue));
}

function setLsColor() {
    const boDy = document.querySelector(".body");
    let newColorPickerValue;
    if (localStorage.getItem("cpVal") === null) {

        newColorPickerValue = ["#000000"];
    } else {
        newColorPickerValue = JSON.parse(localStorage.getItem("cpVal"));
    }
    colorPicker.value = newColorPickerValue;
    boDy.style.backgroundColor = newColorPickerValue;
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

        retrieveCheckedItems(newItemLi, todo);

        const newItemLiP = document.createElement("pre")
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
function retrieveCheckedItems(newitemli, tod) {
    let comp;
    if (localStorage.getItem("completed") === null) {
        comp = [];
    } else {
        comp = JSON.parse(localStorage.getItem("completed"));
    }
    if (comp.includes(tod)) {
        newitemli.classList.add("completed");
    }

}
function removeLocalTodos(todo) {
    let all;
    if (localStorage.getItem("all") === null) {
        all = [];
    } else {
        all = JSON.parse(localStorage.getItem("all")); //can remove if else statement and only keep this line
    }
    todo.children[0].innerText;
    all.splice(all.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem("all", JSON.stringify(all));

    let comp;
    if (localStorage.getItem("completed") === null) {
        comp = [];
    } else {
        comp = JSON.parse(localStorage.getItem("completed"));
    }

    comp.splice(comp.indexOf(todo.children[0].innerText), 1);

    localStorage.setItem("completed", JSON.stringify(comp));
}




