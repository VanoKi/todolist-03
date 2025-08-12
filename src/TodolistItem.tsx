import {FilterTypes, Task} from "./App.tsx";
import {Button} from "./components/Button.tsx";

type todolistitemProps = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterTypes) => void
}

export const TodolistItem = (props: todolistitemProps) => {
  const {title, tasks, deleteTask, changeFilter} = props
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <Button title={'+'} onclick={() => {}}/>
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
                  <Button title={'x'} onclick={() => deleteTask(task.id)}/>
                </li>
              )
            })}
          </ul>
        }
      <div>
        <Button title={'All'} onclick={() => changeFilter('All')}/>
        <Button title={'Active'} onclick={() => changeFilter('Active')}/>
        <Button title={'Completed'} onclick={() => changeFilter('Completed')}/>
      </div>
    </div>
  )
}