import {FilterTypes, Task} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {useRef, useState} from "react";

type todolistitemProps = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterTypes) => void
  createTask: (title: string) => void
}

export const TodolistItem = (props: todolistitemProps) => {
  const {title, tasks, deleteTask, changeFilter, createTask} = props
  const [taskTitle, setTaskTitle] = useState('')
  const createTaskHandler = () => {
    createTask(taskTitle)
    setTaskTitle('')
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={event => setTaskTitle(event.currentTarget.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              createTaskHandler()
          }
            if (event.key === 'Escape') {
              setTaskTitle('')
          }}}
        />
        <Button title={'+'} onclick={createTaskHandler}/>
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