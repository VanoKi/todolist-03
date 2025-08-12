import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {nanoid} from '@reduxjs/toolkit'

export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type FilterTypes = 'All' | "Completed" | 'Active'

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: nanoid(5), title: 'HTML&CSS', isDone: true },
    { id: nanoid(5), title: 'JS', isDone: true },
    { id: nanoid(5), title: 'ReactJS', isDone: false },
  ])

  const [filter, setFilter] = useState<FilterTypes>('All')

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  let filteredTasks = tasks
  if (filter === 'Active') {
    filteredTasks = tasks.filter(task => task.isDone === false)
  }
  if (filter === 'Completed') {
    filteredTasks = tasks.filter(task => task.isDone === true)
  }

  const changeFilter = (filter: FilterTypes) => {
    setFilter(filter)
  }
  const createTask = (title:string) => {
    setTasks([{id:nanoid(5), title, isDone: false}, ...tasks])
  }
  const changeTaskStatus = (taskId:string, isDone:boolean) => {
    setTasks(tasks.map( task => task.id === taskId ? {...task, isDone} : task))
  }

  return (
      <div className="app">
        <TodolistItem
          title={'What to learn'}
          tasks={filteredTasks}
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          createTask={createTask}
          changeTaskStatus={changeTaskStatus}
          filter={filter}
        />
      </div>
  )
}

export default App
