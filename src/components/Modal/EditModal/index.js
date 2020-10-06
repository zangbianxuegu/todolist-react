import React, { useRef } from 'react'

import './index.scss'

import Modal from '../'

import { formatDate } from '../../../libs/utils'

function EditModal(props) {
  const { isShowEditModal, data, submitEdit } = props
  const inputRef = useRef()
  const checkRef = useRef()
  const submit = () => {
    const val = inputRef.current.value.trim()
    if (val.length === 0) {
      return
    }
    const newData = {
      id: new Date().getTime(),
      content: val,
      completed: checkRef.current.checked,
    }
    submitEdit(newData, data.id)
  }
  return (
    <Modal isShowModal={isShowEditModal} modalTitle="事件编辑">
      <p className="topic">时间：{formatDate(data.id)}</p>
      <p className="topic">
        <textarea
          cols="30"
          rows="10"
          className="text-area"
          ref={inputRef}
          defaultValue={data.content}
        ></textarea>
      </p>
      <p className="topic">
        状态：
        <input
          type="checkbox"
          defaultChecked={data.completed ? true : false}
          ref={checkRef}
        />
      </p>
      <button className="btn btn-primary confirm-btn" onClick={submit}>
        提交
      </button>
    </Modal>
  )
}

export default EditModal
