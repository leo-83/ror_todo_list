import { useState } from 'react';

const ListForm = ({ addList }) => {
  const [list, setList] = useState({ title: '', desc: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    addList(list)
    setList({ title: '', desc: '' })
  }

  return (
    <>
      <h1>Create List</h1>
      <form onSubmit={handleSubmit}>
        <input 
          name='title'
          value={list.title}
          onChange={(e) => setList({ ...list, title: e.target.value })}
          required
          placeholder='List name'
        />
        <textarea
          name='desc'
          value={list.desc}
          onChange={(e) => setList({ ...list, desc: e.target.value })}
          required
          placeholder='description'
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default ListForm;