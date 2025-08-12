import {Task} from "./App.tsx";

type todolistitemProps = {
  title: string
  tasks: Task[]
}

export const TodolistItem = (props: todolistitemProps) => {
  const {title, tasks} = props
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
        {tasks.length === 0 ? (
          <p>There are not tasks</p>
        ) :
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <input type={"checkbox"} checked={task.isDone}/>
                  <span>{task.title}</span>
                </li>
              )
            })}
          </ul>
        }
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}