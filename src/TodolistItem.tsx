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
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type={"checkbox"} checked={task.isDone}/>
              <span>{task.title}</span>
            </li>
          )
        })}
        {/*<li>*/}
        {/*  <input type="checkbox" checked={true}/> <span>HTML&CSS</span>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <input type="checkbox" checked={true}/> <span>JS</span>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <input type="checkbox" checked={false}/> <span>React</span>*/}
        {/*</li>*/}
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}