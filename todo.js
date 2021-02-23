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
document.addEventListener("DOMContentLoaded", setLsColor);//eventListener
//functions

function addItem(event) {
    event.preventDefault();
    if (localStorage.getItem("all") === null) {
        all = [];
    } else {
        all = JSON.parse(localStorage.getItem("all"));
    }
    if (all.includes(textInput.value)) {
        alert("you already have that item");
        textInput.value = "";
    }
    else if (textInput.value != "" && textInput.value.trim() !== "") {

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

    hexToHslAndCheckSL(newColorPickerValue);

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

    hexToHslAndCheckSL(newColorPickerValue);

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
function removeLocalTodos(todo) { //from all and comp
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
    if (comp.includes(todo.children[0].innerText)) {
        comp.splice(comp.indexOf(todo.children[0].innerText), 1);
        localStorage.setItem("completed", JSON.stringify(comp));
    }


}

function hexToHslAndCheckSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);


    let con1 = document.querySelector(".con1");
    let tdl = document.querySelector(".tdl")

    if ((l > 40) && (l > 40 && (s <= 100 || s >= 80))) {

        con1.style.backgroundColor = "rgb(0 0 0 / 40%)";
        con1.style.border = "2px solid rgb(0 0 0 / 40%)";
        tdl.style.backgroundColor = "rgb(0 0 0 / 64%)";
    } else {
        con1.style.backgroundColor = "rgb(255 255 255 / 40%)";
        con1.style.border = "2px solid rgb(255 255 255 / 40%)";
        tdl.style.backgroundColor = "rgb(255 255 255 / 64%)";
    }
}


