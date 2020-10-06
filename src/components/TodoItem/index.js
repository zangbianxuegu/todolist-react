import React from 'react'

import './index.scss'

function TodoItem(props) {
  const { data, checkItem, editItem, completeItem, removeItem } = props

  return (
    <li className="todo-item">
      <div className="check-box">
        <input
          type="checkbox"
          checked={data.completed}
          onChange={completeItem}
        />
      </div>
      <span
        className="content"
        style={{ textDecoration: data.completed ? 'line-through' : 'none' }}
      >
        {data.content}
      </span>
      <div className="btn-group">
        <button onClick={checkItem} className="btn btn-primary">
          查看
        </button>
        <button onClick={editItem} className="btn btn-warning">
          编辑
        </button>
        <button onClick={removeItem} className="btn btn-danger">
          删除
        </button>
      </div>
    </li>
  )
}

export default TodoItem
