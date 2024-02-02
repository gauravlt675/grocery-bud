import React, { useState } from 'react'
import List from './List';
import Alert from './Alert';

const App = () => {

  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: 'high voltage', type: 'danger' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      // display alert
      showAlert(true, 'danger', 'Please Enter Value')
    } else if (name && isEditing) {
      // deal with edit
      setList(list.map((item) => {
        if (item.id == editId) {
          return { ...item, title: name }
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Item Edited')
    } else {
      // show alert
      showAlert(true, 'success', 'Item added')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name
      };
      setList([...list, newItem])
      setName('');
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'success', 'List Cleared')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item removed')
    setList(list.filter((item) => item.id != id))
  }

  const editItem = (id) => {
    const item = list.find((item) => item.id == id)
    setIsEditing(true);
    setEditId(id);
    setName(item.title);
  }

  return (
    <section className='section-center'>
      <form className="grocery-form" onSubmit={handleSubmit} action="submit">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g. Whey Protein' value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className='submit-btn'>
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} />
        {list.length > 0 && <button className="clear-btn" onClick={clearList}>
          clear items
        </button>}
      </div>
    </section>
  )
}

export default App
