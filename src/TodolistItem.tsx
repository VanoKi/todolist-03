import {FilterTypes, Task} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {type ChangeEvent, useState} from "react";

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
  const changeTaskTitleHandler = (event: changeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }
  const createTaskOnEnterHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
    if (event.key === 'Escape') {
      setTaskTitle('')
    }}

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={'+'} onclick={createTaskHandler}/>
      </div>
        {tasks.length === 0 ? (
          <p>There are not tasks</p>
        ) :
          <ul>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTask(task.id)
              }
              return (
                <li key={task.id}>
                  <input type={"checkbox"} checked={task.isDone} onChange={() => {}}/>
                  <span>{task.title}</span>
                  <Button title={'x'} onclick={deleteTaskHandler}/>
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