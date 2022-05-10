let btn = document.querySelector(".btn");
let inp1 = document.querySelector(".input-item1");
let inp2 = document.querySelector(".input-item2");
let inp3 = document.querySelector(".input-item3");
let inputs = document.querySelectorAll(".inputs");
let list = document.querySelector(".task-list");
render();

btn.addEventListener("click", () => {
  if (inp1.value === "") {
    alert("Заполните поле!");
    return;
  }
  if (inp2.value === "") {
    alert("Заполните поле!");
    return;
  }
  if (inp3.value === "") {
    alert("Вставьте URL!");
    return;
  }

  let obj = { name: inp1.value, email: inp2.value, image: inp3.value };
  setItemToStorage(obj);
  render();
  inputs.value = ""; //очистка поля ввода
});

function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(task);
  localStorage.setItem("task-data", JSON.stringify(data));
}
function render() {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", JSON.stringify([]));
  }

  let newData = JSON.parse(localStorage.getItem("task-data"));
  list.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");

    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerText = item.name;
    li2.innerText = item.email;
    li3.src = item.image;
    li3.style.width = "300px";
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    list.append(li);
    list.append(li2);
    list.append(li3);
    list.append(btnDelete);
    list.append(btnEdit);
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
  });
}

// Функция для удаления таска
function deleteElement(id) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(id, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  render();
}

//функция для редактирования таска
let mainModal = document.querySelector(".main-modal");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");
let inpEdit = document.querySelector(".inp-edit");
function editElement(id) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("task-data"));
  inpEdit.setAttribute("id", id);
}
//событие на кнопку save
btnSave.addEventListener("click", () => {
  if (inputs.value.trim() === "") {
    alert("Заполните поле!");
    return;
  }

  let data = JSON.parse(localStorage.getItem("task-data"));
  let editTask = {
    task: inpEdit.value,
  };
  let index = inpEdit.id;
  data.splice(index, 1, editTask);
  localStorage.setItem("task-data", JSON.stringify(data));
  mainModal.style.display = "none";
  render();
});

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
