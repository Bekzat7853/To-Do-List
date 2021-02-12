window.addEventListener("DOMContentLoaded", () => {
  // Variables
  const InputTitle = document.querySelector("#inputTitle");
  const textArea = document.querySelector("textarea");
  const form = document.querySelector("form");
  const taskParent = document.querySelector(".tasks");
  const deletebtn = document.querySelector(".modal-content__delete-btn");

  class ToDo {
    constructor(title, text) {
      this.title = title;
      this.text = text;
    }

    createToDo() {
      const todo = document.createElement("div");
      const success = document.createElement("div");

      success.classList.add("success");
      success.textContent = "Задача добавлена";

      todo.classList.add("col-5");
      todo.classList.add("tasks__item");

      todo.innerHTML = `
        <h3 class="tasks__item-title">${InputTitle.value}</h3>
        <p class="tasks__item-text">
          ${textArea.value}
        </p>
        <input class="tasks__item-checkbox" type="checkbox" />
        <a href="#" class="tasks__item-deletebtn" data-bs-toggle="modal" data-bs-target="#deleteModal">
          <img class="remove" src="image/delete.svg" alt="" />
        </a>
      `;

      taskParent.append(todo);
      form.append(success);

      setTimeout(() => {
        success.remove();
      }, 2000);
    }

    deleteToDo(parentElement) {
      parentElement.addEventListener("click", (event) => {
        deletebtn.addEventListener("click", () => {
          let target = event.target;

          if (target && target.classList.contains("remove")) {
            event.preventDefault();
            target.parentElement.parentElement.remove();
          }
        });
      });
    }
  }

  // Events On Submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (inputTitle.value === "") {
      const div = document.createElement("div");
      div.classList.add("error");
      div.textContent = "Ошибка! Заголовок задачи пуст";
      form.append(div);

      setTimeout(() => {
        div.remove();
      }, 2000);
    } else {
      let todo = new ToDo(inputTitle.value, textArea.value);

      todo.createToDo();
      todo.deleteToDo(taskParent);
    }
  });

  taskParent.addEventListener("click", (e) => {
    let target = e.target;

    if (target && target.classList.contains("tasks__item-checkbox")) {
      target.parentElement.firstElementChild.classList.toggle("lineThrough");
    }
  });

});
