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
  var taskList = document.querySelector(".task-list");
  var taskSum = "";
  currentTasks.forEach((task) => {
    taskSum += `
     <div class="task-item">
  <div class="task-check ${task.completed ? "checked" : ""}"></div>
        <div class="task-details">
            <span class="task-text ${task.completed ? "completed" : ""}">${task.title}</span>
            <p class="task-desc ${task.completed ? "completed" : ""}">
                ${task.desc}
            </p>
            <span class="task-cat-badge">${categoryArr[task.category_id]}</span>
        </div>
        <i class="ri-delete-bin-line delete-icon"></i>
    </div>`;
  });
  taskList.innerHTML = taskSum;
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

let categoryArr = ["WORK", "PERSONAL", "LEARNING", "HEALTH"];
let currentTasks = [
  {
    title: "Finalize Nothing OS design system",
    desc: "",
    category_id: "0",
    completed: false,
  },
  {
    title: "Plan weekend getaway",
    desc: "Research cabins in the mountains and make a reservation before Friday.",
    category_id: "1",
    completed: false,
  },
  {
    title: "Integrate GSAP animations",
    desc: "Go through the ScrollTrigger documentation and apply it to the main landing page hero section.",
    category_id: "2",
    completed: true,
  },
  {
    title: "Morning 5km Run",
    desc: "",
    category_id: "3",
    completed: false,
  },
  {
    title: "Integrate GSAP animations",
    desc: "Go through the ScrollTrigger documentation and apply it to the main landing page hero section.",
    category_id: "2",
    completed: true,
  },
  {
    title: "Integrate GSAP animations",
    desc: "Go through the ScrollTrigger documentation and apply it to the main landing page hero section.",
    category_id: "2",
    completed: true,
  },
];
renderTask();

//when user starts typing something, remove the error
taskTitle.addEventListener("input", () => {
  const currentTitle = taskTitle.value.trim();  
  if (currentTitle.length > 0 && currentTitle.length < 5) {
    errorHandle("TITLE CAN'T BE LESS THAN 5 CHARACTERS");
  } else if (currentTitle.length > 25) {
    errorHandle("TITLE CAN'T BE MORE THAN 25 CHARACTERS");
  } else {
    hideError();
  }
});


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
  taskTitle.value = "";
  taskDesc.value = "";
  renderTask();
});
