import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";

export type Task = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  const tasks1 = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
  ]
  const tasks2 = []

  return (
      <div className="app">
        <TodolistItem title={'What to learn'} tasks={tasks1}/>
        <TodolistItem title={'What to song'} tasks={tasks2}/>
      </div>
  )
}

export default App
