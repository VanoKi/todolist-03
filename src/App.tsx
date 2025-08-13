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
export type Todolist = {
  id: string
  title: string
  filter: FilterTypes
}

function App() {
  const todolistId1 = nanoid(6)
  const todolistId2 = nanoid(6)
  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ])
  const [tasks, setTasks] = useState({
    [todolistId1]: [
      {id: nanoid(5), title: 'HTML&CSS', isDone: true},
      {id: nanoid(5), title: 'JS', isDone: true},
      {id: nanoid(5), title: 'ReactJS', isDone: false},
    ],
    [todolistId2]:[
      { id: nanoid(5), title: 'Rest API', isDone: true },
      { id: nanoid(5), title: 'GraphQL', isDone: false },
    ]
  })

  const deleteTask = (todolistId:string, taskId: string) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t => t.id !== taskId)})
  }
  const changeFilter = (todolistId:string, filter: FilterTypes) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
  }
  const createTask = (todolistId:string, title:string) => {
    const newTask = {id: nanoid(5), title, isDone: false}
    setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
  }
  const changeTaskStatus = (todolistId:string, taskId:string, isDone:boolean) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  return (
      <div className="app">
        {todolists.map(todolist => {
          const todolistTasks = tasks[todolist.id]
          let filteredTasks = todolistTasks
          if (todolist.filter === 'Active') {
            filteredTasks = todolistTasks.filter(task => task.isDone === false)
          }
          if (todolist.filter === 'Completed') {
            filteredTasks = todolistTasks.filter(task => task.isDone === true)
          }

          return (
            <TodolistItem
              key={todolist.id}
              todolist={todolist}
              title={todolist.title}
              tasks={filteredTasks}
              deleteTask={deleteTask}
              changeFilter={changeFilter}
              createTask={createTask}
              changeTaskStatus={changeTaskStatus}
              deleteTodolist={deleteTodolist}
            />
          )
        })}
      </div>
  )
}

export default App
