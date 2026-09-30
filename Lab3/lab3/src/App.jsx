import { useState } from 'react'
import './App.css'

function TaskCard({ title }){
    const [isChecked, setIsChecked] = useState(false);

    return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "4px 0" }}>
      <label>
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => setIsChecked(e.target.checked)} 
        />
        {title}
      </label>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(10);

  const handleClick = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    console.log('Текущее значение счетчика:', nextCount);
  }

  return (
    <div>
      <span>Счетчик: {count}</span>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

function App() {
  const [resetToken, setResetToken] = useState(0);

  const handleReset = () => {
        setResetToken(prevToken => prevToken + 1);
        console.log('Счетчик был сброшен. Новый токен:', resetToken);
      }

  return(
    <div>
      <Counter key={resetToken} />

      <br />
      
      <button onClick={handleReset}>Сбросить счетчик</button>

    </div>
  )



  // const [tasks, setTasks] = useState([
  //   { id: 1, title: 'Task 1' },
  //   { id: 2, title: 'Task 2' },
  //   { id: 3, title: 'Task 3' },
  // ]);

  // const removeFirstTask = () => {
  //   setTasks((prevTasks) => prevTasks.slice(1));
  //   console.log('Удален первый элемент. Текущий список задач:', tasks)
  // };

  // return (
  //   <div>
  //     <button onClick={removeFirstTask}>Удалить первый элемент</button>
      
  //     <h3>Опасно: key={"{index}"}</h3>
  //     {tasks.map((task, index) => (
  //       <TaskCard key={index} title={task.title} />
  //     ))}

  //     {/* 
  //       💡 Попробуй:
  //       1. Отметь галочкой "Купить хлеб"
  //       2. Нажми "Удалить первый элемент"
  //       3. Результат: "Купить хлеб" исчезнет, но ГАЛОЧКА останется у "Помыть машину"!
  //       Почему? Позиция [0] осталась, React думает, что компонент не менялся, а изменились только его props.
  //     */}

  //     <h3>Правильно: key={"{task.id}"}</h3>
  //     {tasks.map((task) => (
  //       <TaskCard key={task.id} title={task.title} />
  //     ))}
  //   </div>
  // );
}

export default App
