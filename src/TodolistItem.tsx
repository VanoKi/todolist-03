import {FilterTypes, Task, Todolist} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {type ChangeEvent} from "react";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import {EditableSpan} from "./components/EditableSpan.tsx";

type todolistProps = {
  todolist: Todolist
  title: string
  tasks: Task[]
  deleteTask: (todolistId:string, taskId: string) => void
  changeFilter: (todolistId:string, filter: FilterTypes) => void
  createTask: (todolistId:string, title: string) => void
  changeTaskStatus: (todolistId:string, taskId:string, newStatus:boolean) => void
  deleteTodolist: (todolistId: string) => void
  changeTaskTitle: (todolistId:string, taskId:string, title:string) => void
  changeTodolistTitle: (todolistId:string, title:string) => void
}

export const TodolistItem = (props: todolistProps) => {
  const {todolist: {id, title, filter}, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, deleteTodolist, changeTaskTitle, changeTodolistTitle} = props

  const changeFilterHandler = (filter:FilterTypes) => {
    changeFilter(id, filter)
  }
  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }
  const createTaskHandler = (title:string) => {
    createTask(id, title)
  }
  const changeTodolistTitleHandler = (title:string) => {
    changeTodolistTitle(id, title)
  }

  return (
    <div>
      <div className={'container'}>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
        <Button title={'x'} onclick={deleteTodolistHandler}/>
      </div>
      <CreateItemForm onCreateItem={createTaskHandler}/>
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
              const changeTaskTitleHandler = (title: string) => {
                changeTaskTitle(id, task.id, title)
              }
              return (
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                  <input type={"checkbox"} checked={task.isDone} onChange={changeTaskStatusHandler}/>
                  <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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