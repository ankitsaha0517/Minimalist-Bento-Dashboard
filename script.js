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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(taskTitle.value, taskDesc.value, categorySelectorID);

  currentTasks.unshift({
    title: taskTitle.value,
    desc: taskDesc.value,
    category_id: categorySelectorID,
    completed: false,
  });
  taskTitle.value="";
  taskDesc.value="";
  console.log(currentTasks);
  renderTask();
});

