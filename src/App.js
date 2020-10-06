import React, { useState, useCallback, useEffect } from 'react'
import './App.css'

import MyHeader from './components/Header'
import AddInput from './components/AddInput'
import TodoItem from './components/TodoItem'
import CheckModal from './components/Modal/CheckModal'
import EditModal from './components/Modal/EditModal'
import NoDataTip from './components/NoDataTip'

function App() {
  const [isInputShow, setIsInputShow] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [isShowCheckModal, setIsShowCheckModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [currentData, setCurrentData] = useState({})

  const openInput = (isInputShow) => {
    setIsInputShow(!isInputShow)
  }

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]')
    setTodoList(todoData)
  }, [])

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [todoList])

  const addItem = useCallback((value) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false,
    }
    setTodoList((todoList) => [...todoList, dataItem])
    setIsInputShow(false)
  }, [])

  const closeModal = () => {
    setIsShowCheckModal(false)
  }

  const checkItem = useCallback(
    (id) => {
      _setCurrentData(id)
      setIsShowCheckModal(true)
    },
    [todoList]
  )

  const editItem = useCallback(
    (id) => {
      _setCurrentData(id)
      setIsShowEditModal(true)
    },
    [todoList]
  )

  const submitEdit = useCallback((data, id) => {
    setTodoList((todoList) =>
      todoList.map((item) => {
        if (item.id === id) {
          item = data
        }
        return item
      })
    )
    setIsShowEditModal(false)
  }, [])

  const completeItem = useCallback((id) => {
    setTodoList((todoList) =>
      todoList.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed
        }
        return item
      })
    )
  }, [])

  const removeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== id))
  }, [])

  function _setCurrentData(id) {
    setCurrentData(() => todoList.filter((item) => item.id === id)[0])
  }

  return (
    <div className="App">
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        data={currentData}
        closeModal={closeModal}
      ></CheckModal>
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      ></EditModal>
      <MyHeader
        openInput={() => {
          openInput(isInputShow)
        }}
      ></MyHeader>
      <AddInput isInputShow={isInputShow} addItem={addItem}></AddInput>
      {!todoList || todoList.length === 0 ? (
        <NoDataTip></NoDataTip>
      ) : (
        <ul className="todo-list">
          {todoList.map((item, index) => {
            return (
              <TodoItem
                data={item}
                key={index}
                completeItem={() => completeItem(item.id)}
                checkItem={() => checkItem(item.id)}
                editItem={() => editItem(item.id)}
                removeItem={() => removeItem(item.id)}
              ></TodoItem>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App
