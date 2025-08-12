import {FilterTypes, Task} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {useRef} from "react";

type todolistitemProps = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterTypes) => void
  createTask: (title: string) => void
}

export const TodolistItem = (props: todolistitemProps) => {
  const {title, tasks, deleteTask, changeFilter, createTask} = props
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={inputRef}/>
        <Button title={'+'} onclick={() => {
          const inp = inputRef.current
          if (inp) {
            createTask(inp.value)
            inp.value = ''
          }
        }
        }
        />
      </div>
        {tasks.length === 0 ? (
          <p>There are not tasks</p>
        ) :
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <input type={"checkbox"} checked={task.isDone} onChange={() => {}}/>
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