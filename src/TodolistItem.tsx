import {FilterTypes, Task} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type todolistitemProps = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterTypes) => void
  createTask: (title: string) => void
  changeTaskStatus: (taskId:string, newStatus:boolean) => void
}

export const TodolistItem = (props: todolistitemProps) => {
  const {title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus} = props
  const [taskTitle, setTaskTitle] = useState('')
  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== '') {
      createTask(taskTitle)
      setTaskTitle('')
    }
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(task.id, newStatusValue)
              }
              return (
                <li key={task.id}>
                  <input type={"checkbox"} checked={task.isDone} onChange={changeTaskStatusHandler}/>
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