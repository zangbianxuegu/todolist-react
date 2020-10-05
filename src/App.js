import React, { useState, useCallback } from 'react'
import './App.css'

import MyHeader from './components/Header'
import AddInput from './components/AddInput'
import TodoItem from './components/TodoItem'

function App() {
  const [isInputShow, setIsInputShow] = useState(false)
  const [todoList, setTodoList] = useState([])

  const openInput = (isInputShow) => {
    setIsInputShow(!isInputShow)
  }

  const addItem = useCallback((value) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false,
    }
    setTodoList((todoList) => [...todoList, dataItem])
    setIsInputShow(false)
  }, [])

  return (
    <div className="App">
      <MyHeader
        openInput={() => {
          openInput(isInputShow)
        }}
      ></MyHeader>
      <AddInput isInputShow={isInputShow} addItem={addItem}></AddInput>
      <ul className="todo-list">
        {todoList.map((item, index) => {
          return <TodoItem data={item} key={index}></TodoItem>
        })}
      </ul>
    </div>
  )
}

export default App
