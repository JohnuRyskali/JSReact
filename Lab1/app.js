function createTask(name){
  let count = 0;
  let status = 'Idle';
  let lastTime = 0;

    return {
      getName: () => name,
      getCount: () => count,
      getStatus: () => status,
      getLastTime: () => lastTime,

      reset: function() {
      count = 0;
      status = 'Idle';
      lastTime = 0;
    },

    run: function() {
      count++;
      status = 'Loading';
      updateUI();

      return new Promise((resolve, reject) => {  
        const duration = Math.floor(Math.random() * 1500) + 500;
        
        setTimeout(() => {
          lastTime = duration;

          const isSuccess = Math.random() < 0.3;
          if (isSuccess) {
            status = 'Success';
            updateUI();
            resolve(`Task "${name}" completed successfully in ${duration} ms.`);
          } else {
            status = 'Failed';
            updateUI();
            reject(`Task "${name}" failed after ${duration} ms.`);
          }
        }, duration);
      });
    }

  };
}

const tasks = [
  createTask("Load Users"),
  createTask("Load Posts"),
  createTask("Load Comments")
];

const tasksContainer = document.getElementById("tasks-container");
const tasksStatusDiv = document.getElementById("tasks-status");

function updateUI() {
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task-row";

    let badgeClass = "idle";
    if (task.getStatus() === "Loading") badgeClass = "loading";
    if (task.getStatus() === "Completed") badgeClass = "success";
    if (task.getStatus() === "Failed") badgeClass = "error";

    div.innerHTML = `
      <div>
        <strong>${task.getName()}</strong>
        <span class="badge ${badgeClass}">${task.getStatus()}</span>
      </div>
      <div>
        Запусков: <strong>${task.getCount()}</strong> | 
        Время: <strong>${task.getLastTime()} ms</strong>
        <button onclick="runSingleTask(${index})" style="margin-left: 10px;">Запуск</button>
      </div>
    `;
    tasksContainer.appendChild(div);
  });
}

async function runSingleTask(index) {
  try{
    await tasks[index].run();
  } catch (e) {

  }
}

document.getElementById("btn-run-all").addEventListener("click", async () => {
  tasksStatusDiv.textContent = "Выполняются задачи...";
  const promises = tasks.map(t => t.run());
  await Promise.allSettled(promises);
  
  tasksStatusDiv.textContent = "All tasks finished";
});

document.getElementById("btn-reset-all").addEventListener("click", () => {
  tasks.forEach(t => t.reset());
  tasksStatusDiv.textContent = "All tasks reset";
  updateUI();
});

// 2. SEQUENTIAL VS CONCURRENT

document.getElementById("btn-compare").addEventListener("click", async () => {
  const output = document.getElementById("benchmark-output");
  output.textContent = "Тестирование...\n";

  const startSeq = performance.now();
  for (const task of tasks) {
    try {
      await task.run();
    } catch (e) {

    }
  }
  const endSeq = performance.now();
  const timeSeq = (endSeq - startSeq).toFixed(0);

// --- Concurrent

  const startConc = performance.now();
  await Promise.allSettled(tasks.map(t => t.run()));
  const endConc = performance.now();
  const timeConc = (endConc - startConc).toFixed(0);

  output.textContent = 
`1. Последовательное выполнение (Sequential):
   Время: ${timeSeq} ms
   Объяснение: Каждая задача ждет завершения предыдущей (Время = T1 + T2 + T3).

2. Параллельное выполнение (Concurrent):
   Время: ${timeConc} ms
   Объяснение: Все задачи стартуют одновременно (Время = MAX(T1, T2, T3)).`;
});

