function openCloseWidget() {
  let cards = document.querySelectorAll(".widget-card");
  let fullModels = document.querySelectorAll(".fullscreen-models");
  let closebtn = document.querySelectorAll(".close-btn");

  cards.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullModels[elem.id].style.display = "block";
    });
  });

  closebtn.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      fullModels[index].style.display = "none";
    });
  });
}
openCloseWidget();

function renderTask() {
  localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
  var taskList = document.querySelector(".task-list");
  var taskSum = "";

  const activeFilterID = document.querySelector(".category-filter .active").id;

  currentTasks.forEach((task, idx) => {
    // Only render if filter is ALL (-1) or matches task category
    if (activeFilterID == "-1" || task.category_id == activeFilterID) {
      taskSum += `
       <div class="task-item">
        <div class="task-check ${task.completed ? "checked" : ""}" id="${idx}"></div>
          <div class="task-details">
              <span class="task-text ${task.completed ? "completed" : ""}">${task.title}</span>
              <p class="task-desc ${task.completed ? "completed" : ""}">
                  ${task.desc}
              </p>
              <span class="task-cat-badge">${categoryArr[task.category_id]}</span>
          </div>
          <i class="ri-delete-bin-line delete-icon" id=${idx}></i>
      </div>`;
    }
  });

  // Check if the list is empty after filtering
  if (taskSum === "") {
    taskSum = `<h3 class="empty-tasks-msg">THERE ARE NO TASKS HERE</h3>`;
  }

  taskList.innerHTML = taskSum;
  updateStats();
}

function errorHandle(errorMsg) {
  let errorText = document.querySelector(".title-error-msg");
  let errorInput = document.querySelector(".task-title");
  let submitBtn = document.querySelector(".todoTask-submit-btn");
  errorText.style.display = "block";
  errorText.textContent = errorMsg;
  errorInput.classList.add("has-error");
  submitBtn.classList.add("btn-error");
  submitBtn.textContent = "ERROR -- CAN'T SUBMIT";
}
function hideError() {
  let errorText = document.querySelector(".title-error-msg");
  let errorInput = document.querySelector(".task-title");
  let submitBtn = document.querySelector(".todoTask-submit-btn");
  errorText.style.display = "none";
  errorInput.classList.remove("has-error");
  submitBtn.classList.remove("btn-error");
  submitBtn.textContent = "ADD TASK";
}

let categoryArr = ["WORK", "PERSONAL", "LEARNING", "HEALTH"];
let currentTasks = [];

// Load tasks from localStorage if available
if (localStorage.getItem("currentTasks")) {
  currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
}

function setupTaskForm() {
  let form = document.querySelector(".full-todo form");
  let taskTitle = document.querySelector(".task-form input");
  let taskDesc = document.querySelector(".task-form textarea");
  let categorySelector = document.querySelectorAll(
    ".category-selector .cat-pill",
  );
  let categorySelectorID = document.querySelector(
    ".category-selector .active",
  ).id;

  categorySelector.forEach((elem) => {
    elem.addEventListener("click", () => {
      categorySelector.forEach((elem) => {
        elem.classList.remove("active");
      });
      elem.classList.add("active");
      categorySelectorID = elem.id;
    });
  });

  //when user starts typing something, remove the error
  taskTitle.addEventListener("input", () => {
    const currentTitle = taskTitle.value.trim();
    if (currentTitle.length > 25) {
      errorHandle("TITLE CAN'T BE MORE THAN 25 CHARACTERS");
    } else {
      hideError();
    }
  });

  //on submission if everyting is fine then add the task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    const description = taskDesc.value.trim();

    if (title.length <= 0) {
      errorHandle("TITLE CAN'T BE EMPTY");
      return;
    }
    if (title.length < 5) {
      errorHandle("TITLE CAN'T BE LESS THAN 5 CHARACTERS");
      return;
    }
    if (title.length > 25) {
      errorHandle("TITLE CAN'T BE MORE THAN 25 CHARACTERS");
      return;
    }
    currentTasks.unshift({
      title: title,
      desc: description,
      category_id: categorySelectorID,
      completed: false,
    });
    renderTask();
    taskTitle.value = "";
    taskDesc.value = "";
    categorySelector.forEach((elem) => {
      elem.classList.remove("active");
    });
    categorySelector[0].classList.add("active");
  });
}

function deleteTask() {
  const taskListContainer = document.querySelector(".task-list");
  taskListContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
      currentTasks.splice(e.target.id, 1);
      renderTask();
    }
  });
}

function completeTask() {
  const taskListContainer = document.querySelector(".task-list");
  taskListContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("task-check")) {
      currentTasks[e.target.id].completed = true;
      renderTask();
    }
  });
}
function filterTasks() {
  let categoryFilter = document.querySelectorAll(".category-filter .cat-pill");
  let categoryFilterID = document.querySelector(".category-filter .active").id;

  categoryFilter.forEach((elem) => {
    elem.addEventListener("click", () => {
      categoryFilter.forEach((elem) => {
        elem.classList.remove("active");
      });
      elem.classList.add("active");
      categoryFilterID = elem.id;
      renderTask();
    });
  });
}

renderTask();
setupTaskForm();

deleteTask();
completeTask();
filterTasks();





function updateStats() {
  const incompleteTasks = currentTasks.filter((task) => !task.completed);

  let previewList = document.querySelector(".preview-list");
  let previewHTML = "";
  
  incompleteTasks.forEach((task)=>{
    previewHTML += `
    <li class="preview-item">
      <div class="dot-check"></div>
      <span>${task.title}</span>
    </li>`;
  });
  
  previewList.innerHTML = previewHTML;
  
  const countDisplay = document.getElementById("todo-count-display");
  if (countDisplay) {
    countDisplay.textContent = incompleteTasks.length.toString().padStart(2, "0");
  }
  
  // Calculate and update the progress bar
  const progressBar = document.getElementById("todo-progress-bar");
  if (progressBar) {
    let percentage = 0;
    // Prevent dividing by zero if there are no tasks
    if (currentTasks.length > 0) {
      const completedTasksCount = currentTasks.length - incompleteTasks.length;
      percentage = (completedTasksCount / currentTasks.length) * 100;
    }
    progressBar.style.width = `${percentage}%`;
  }
}

