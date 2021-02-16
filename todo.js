//selectors
const textInput = document.querySelector(".textinput");
const addButton = document.querySelector(".addbutton");


const todoListUl = document.querySelector(".todolist");

//eventListeners
addButton.addEventListener("click", addItem);


//functions

function addItem(event) {
    event.preventDefault();

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
    newItemLi.appendChild(newButtonDel);
    newItemLi.appendChild(newButtonChecked);

    todoListUl.appendChild(newItemLi);

    textInput.value = "";

    newItemLi.addEventListener("click", deletecheck);
}
function deletecheck(e) {
    const clickedTarget = e.target;
    if (clickedTarget.classList[0] === "delete") {
        const clickedTargetParent = clickedTarget.parentElement;
        clickedTargetParent.classList.add("fade");
        clickedTargetParent.addEventListener("transitionend", function () {
            clickedTargetParent.remove();
        })
    }
    if (clickedTarget.classList[0] === "checked") {
        const clickedTargetParent = clickedTarget.parentElement;
        clickedTargetParent.classList.toggle("completed");
    }
}









    //     const newDelete = document.createElement("button");
    //     newDelete.classList.add("delete");
    //     newDelete.innerHTML = (`<i class="fa fa-trash" aria-hidden="true"></i>`);
    //     newItem.appendChild(newDelete);

    //     const newChecked = document.createElement("button");
    //     newChecked.classList.add("checked");
    //     newChecked.innerHTML = (`<i class="fa fa-check" aria-hidden="true"></i>`);
    //     newItem.appendChild(newChecked);
    //     todoList.appendChild(newTodo);
    //     textInput.value = "";
    //     
    // 
