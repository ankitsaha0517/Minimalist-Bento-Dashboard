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

function FeaturesTODO() {
  function renderTask() {
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
    var taskList = document.querySelector(".task-list");
    var taskSum = "";

    const activeFilterID = document.querySelector(
      ".category-filter .active",
    ).id;

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
    let categoryFilter = document.querySelectorAll(
      ".category-filter .cat-pill",
    );
    let categoryFilterID = document.querySelector(
      ".category-filter .active",
    ).id;

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

    incompleteTasks.forEach((task) => {
      previewHTML += `
    <div class="preview-item">
      <div class="dot-check"></div>
      <span>${task.title}</span>
    </div>`;
    });

    previewList.innerHTML = previewHTML;

    const countDisplay = document.getElementById("todo-count-display");
    if (countDisplay) {
      countDisplay.textContent = incompleteTasks.length
        .toString()
        .padStart(2, "0");
    }

    if (incompleteTasks.length == 0) {
      document
        .querySelector(".widget-todo .action-tag-pill")
        .classList.remove("red-pill");
      previewList.innerHTML = `<h3 class="empty-tasks-msg">NO PENDING TASKS YET </h3>
      <h5 class="empty-tasks-msg">Click For Add Task</h5>`;
    } else {
      document
        .querySelector(".widget-todo .action-tag-pill")
        .classList.add("red-pill");
    }

    // Calculate and update the progress bar
    const progressBar = document.getElementById("todo-progress-bar");
    if (progressBar) {
      let percentage = 0;
      // Prevent dividing by zero if there are no tasks
      if (currentTasks.length > 0) {
        const completedTasksCount =
          currentTasks.length - incompleteTasks.length;
        percentage = (completedTasksCount / currentTasks.length) * 100;
      }
      progressBar.style.width = `${percentage}%`;
    }
  }
}

FeaturesTODO();

function FeaturesDailyPlanner() {
  let dalyPlannerData =
    JSON.parse(localStorage.getItem("dayPlannerData")) || [];
  function renderPlanner() {
    let timeTable = Array.from(
      { length: 18 },
      (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
    );

    let plannerList = document.querySelector(".planner-grid-wrapper");
    let plannerSum = "";

    timeTable.forEach((elem, idx) => {
      var saveValue = dalyPlannerData[idx] || "";
      let hasTask = saveValue.trim().length > 0;

      plannerSum += `<div class="planner-slot ${hasTask ? "has-task" : ""}" id="${6 + idx}">
              <div class="slot-header">
                <span class="slot-time ndot-number">${elem}</span>
                <span class="dot-red-small" style="display:${hasTask ? "block" : "none"}"></span>
              </div>
              <input type="text" id="${idx}" class="slot-title" value="${saveValue}" placeholder="..." />
            </div>`;
    });
    plannerList.innerHTML = plannerSum;
  }

  function handlePlannerInput() {
    let dayPlanner = document.querySelectorAll(".planner-slot");
    let dayPlannerInput = document.querySelectorAll(".planner-slot input");
    let dotRedSmall = document.querySelectorAll(".dot-red-small");

    dayPlannerInput.forEach((elem, idx) => {
      elem.addEventListener("input", () => {
        if (elem.value.trim().length > 0) {
          dayPlanner[idx].classList.add("has-task");
          dotRedSmall[idx].style.display = "block";
        } else {
          dayPlanner[idx].classList.remove("has-task");
          dotRedSmall[idx].style.display = "none";
        }

        dalyPlannerData[idx] = elem.value;
        localStorage.setItem("dayPlannerData", JSON.stringify(dalyPlannerData));
      });
    });
  }
  function currentSlotMarker() {
    const IST = new Date().toLocaleString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    let plannerSlot = document.querySelectorAll(".planner-slot");

    plannerSlot.forEach((slot) => {
      slot.classList.remove("current-slot");
      if (Number(IST) == 1) {
        localStorage.clear("dayPlannerData");
      }
      if (slot.id == Number(IST)) {
        slot.classList.add("current-slot");
      }
    });
  }

  renderPlanner();
  currentSlotMarker();
  handlePlannerInput();

  setInterval(
    () => {
      renderPlanner();
      currentSlotMarker();
    },
    1000 * 60 * 60,
  );
}
FeaturesDailyPlanner();

function FeaturesMotivationalQuotes() {
  function getRandomQuotes() {
    return fetch("https://dummyjson.com/quotes/random").then((res) => {
      if (!res.ok) throw new Error("Unable to fetch quotes");
      return res.json();
    });
  }
  function renderQuote(quoteData) {
    let quoteDisplay = document.querySelector(".quote-main-display");
    let quoteSum = "";
    quoteSum += `
     <i class="ri-double-quotes-r quote-watermark-glyph"></i>
              <blockquote class="quote-primary-text" id="modal-active-quote">
                "${quoteData.quote}"
              </blockquote>
              <div class="quote-author-block">
                <span class="author-dash">—</span>
                <h3 class="author-name" id="modal-active-author">${quoteData.author}</h3>
              </div>
    `;

    quoteDisplay.innerHTML = quoteSum;
  }

  function outerQuote(quoteData) {
    let outerQuoteDisplay = document.querySelector(".course-preview");
    let outerQuoteSum = "";

    // Jab tak full stop (.) na aaye tab tak show karo, full stop ke baad "..."
    let quoteText = quoteData.quote.trim();
    let dotIndex = quoteText.indexOf(".");
    if (dotIndex !== -1) {
      quoteText = quoteText.substring(0, dotIndex) + "...";
    }

    outerQuoteSum += ` <span class="ndot-number module-code">Quote of The Day</span>
            <h3 class="quote-headline" id="widget-quote-display">
              <span class="text-animate-line">${quoteText}</span>
            </h3>
            <div class="author-tag">— ${quoteData.author}</div>`;

    outerQuoteDisplay.innerHTML = outerQuoteSum;
  }

  function retryBtnFeature() {
    let retryBtn = document.querySelector("#btn-next-quote");

    retryBtn.addEventListener("click", () => {
      copyBtnFeature();
      retryBtn.textContent = "Loding";
      setTimeout(() => {
        getRandomQuotes()
          .then((data) => {
            renderQuote(data);
            outerQuote(data);
            retryBtn.textContent = "NEXT QUOTES";
          })
          .catch((err) => (retryBtn.textContent = err.message));
      }, 1000);
    });
  }

  function copyBtnFeature() {
    let copyBtn = document.getElementById("btn-copy-quote");
    copyBtn.classList.remove("copied", "failed");
    copyBtn.innerHTML = `<i class="ri-file-copy-line"></i> COPY`;
    copyBtn.addEventListener("click", async () => {
      let quoteElement = document.getElementById("modal-active-quote");
      let authorName = document.querySelector(".author-tag");
      let copyText = quoteElement
        ? quoteElement.textContent.trim() + authorName.textContent.trim()
        : "";
      try {
        await navigator.clipboard.writeText(copyText);
        copyBtn.innerHTML = `<i class="ri-check-line"></i> COPIED`;
        copyBtn.classList.add("copied");
      } catch (err) {
        copyBtn.innerHTML = `<i class="ri-close-line"></i> FAILED`;
        copyBtn.classList.add("failed");
      }
    });

    let crossBtn = document.querySelector(".full-motivational .close-btn");
    crossBtn.addEventListener("click", () => {
      copyBtn.classList.remove("copied", "failed");
      copyBtn.innerHTML = `<i class="ri-file-copy-line"></i> COPY`;
    });
  }

  getRandomQuotes()
    .then((data) => {
      renderQuote(data);
      outerQuote(data);
    })
    .catch((err) => console.log(err));

  retryBtnFeature();
  copyBtnFeature();
}

// FeaturesMotivationalQuotes();

let focusSecond =
  Number(
    document.querySelector(".timing-pills-focus-row .active").dataset.time,
  ) * 60;
let breakSecond =
  Number(
    document.querySelector(".timing-pills-break-row .active").dataset.time,
  ) * 60;
let isFocusMode = true;

let cycleCount = 0;

let timerCycle = document.querySelector("#timer-cycle");

let startBtn = document.querySelector("#pomodoro-start-btn");
let pauseBtn = document.querySelector("#pomodoro-pause-btn");
let resetBtn = document.querySelector(".btn-reset");
let timerCountdownVal = document.querySelector(".timer-countdown-val");

function upDateTime() {
  let minutes = Math.floor((isFocusMode ? focusSecond : breakSecond) / 60);
  let seconds = (isFocusMode ? focusSecond : breakSecond) % 60;

  // Format with leading zeros (e.g., 25:00)
  timerCountdownVal.innerHTML = `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
  timerCycle.innerHTML = `CYCLE // ${String(cycleCount).padStart(2, "0")} OF 04 ${cycleCount > 3 ? "   >>> Time completed" : ""}`;
}
let activeInterval = null;
upDateTime();
pauseBtn.style.display = "none";

// start button
startBtn.addEventListener("click", () => {
  timerCountdownVal.classList.remove("blink-digital");
  activeInterval = setInterval(() => {
    upDateTime();
    if (isFocusMode) {
      startBtn.style.display = "none";
      pauseBtn.style.display = "block";
      focusSecond--;
      if (focusSecond < 0) {
        clearInterval(activeInterval);
        console.log(" Timer Completed");
        isFocusMode = false;
        breakSecond =
          Number(
            document.querySelector(".timing-pills-break-row .active").dataset
              .time,
          ) * 60;
        upDateTime();
        timerCountdownVal.classList.add("blink-digital");
        pauseBtn.style.display = "none";
        startBtn.style.display = "block";
        startBtn.innerHTML = `Now go to brack Time`;
      }
    } else if (!isFocusMode) {
      breakSecond--;
      if (breakSecond < 0) {
        clearInterval(activeInterval);
        console.log(" Break complete ");
        isFocusMode = true;
        focusSecond =
          Number(
            document.querySelector(".timing-pills-focus-row .active").dataset
              .time,
          ) * 60;
        cycleCount++;
        upDateTime();
        startBtn.style.display = "block";
        startBtn.innerHTML = `Start`;
      }
    }
  }, 10);
});

// pause button
pauseBtn.addEventListener("click", () => {
  clearInterval(activeInterval);
  timerCountdownVal.classList.add("blink-digital");
  pauseBtn.style.display = "none";
  startBtn.style.display = "block";
  startBtn.innerHTML = `Resume`;
});

// reset button
resetBtn.addEventListener("click", () => {
  clearInterval(activeInterval);
  pauseBtn.style.display = "none";
  startBtn.style.display = "block";
  startBtn.innerHTML = `Start`;
  isFocusMode = true;
  focusSecond =
    Number(
      document.querySelector(".timing-pills-focus-row .active").dataset.time,
    ) * 60;
  breakSecond =
    Number(
      document.querySelector(".timing-pills-break-row .active").dataset.time,
    ) * 60;
  upDateTime();
});

// timing pills feature
function timingPillsFeature() {
  let focusTime = document.querySelectorAll(
    ".timing-pills-focus-row .cat-pill",
  );
  let breakTime = document.querySelectorAll(
    ".timing-pills-break-row .cat-pill",
  );

  focusTime.forEach((elem) => {
    elem.addEventListener("click", () => {
      focusTime.forEach((e) => {
        e.classList.remove("active");
      });
      elem.classList.add("active");
      focusSecond = parseInt(elem.dataset.time) * 60;
      upDateTime();
    });
  });

  breakTime.forEach((elem) => {
    elem.addEventListener("click", () => {
      breakTime.forEach((e) => {
        e.classList.remove("active");
      });
      elem.classList.add("active");
      breakSecond = parseInt(elem.dataset.time) * 60;
      upDateTime();
    });
  });
}

timingPillsFeature();
