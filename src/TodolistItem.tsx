import {FilterTypes, Task, Todolist} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type todolistProps = {
  todolist: Todolist
  title: string
  tasks: Task[]
  deleteTask: (todolistId:string, taskId: string) => void
  changeFilter: (todolistId:string, filter: FilterTypes) => void
  createTask: (todolistId:string, title: string) => void
  changeTaskStatus: (todolistId:string, taskId:string, newStatus:boolean) => void
  // filter: FilterTypes
}

export const TodolistItem = (props: todolistProps) => {
  const {todolist: {id, title, filter}, tasks, deleteTask, changeFilter, createTask, changeTaskStatus} = props
  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== '') {
      createTask(id, taskTitle)
      setTaskTitle('')
    }else{
      setError('Title is required')
    }
  }
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }
  const createTaskOnEnterHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
    if (event.key === 'Escape') {
      setTaskTitle('')
    }}
  const changeFilterHandler = (filter:FilterTypes) => {
    changeFilter(id, filter)
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={'+'} onclick={createTaskHandler}/>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
        {tasks.length === 0 ? (
          <p>There are not tasks</p>
        ) :
          <ul>
            {tasks.map((task) => {
              const deleteTaskHandler = () => {
                deleteTask(id, task.id)
              }
              const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(id, task.id, newStatusValue)
              }
              return (
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                  <input type={"checkbox"} checked={task.isDone} onChange={changeTaskStatusHandler}/>
                  <span>{task.title}</span>
                  <Button title={'x'} onclick={deleteTaskHandler}/>
                </li>
              )
            })}
          </ul>
        }
      <div>
        <Button title={'All'} onclick={() => changeFilterHandler('All')} className={filter === 'All' ? 'active-filter' : ''}/>
        <Button title={'Active'} onclick={() => changeFilterHandler('Active')} className={filter === 'Active' ? 'active-filter' : ''}/>
        <Button title={'Completed'} onclick={() => changeFilterHandler('Completed')} className={filter === 'Completed' ? 'active-filter' : ''}/>
      </div>
    </div>
  )
}