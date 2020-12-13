import { useEffect, useState } from 'react';
import { TableView } from './TableView'
import './App.css';

const initialSortableHeaders = { name: { type: 'string', sortOrder: null }, email: { type: 'string', sortOrder: null } }

function App() {
  let [data, setData] = useState([])
  let [sortableHeaders, setSortableHeaders] = useState(initialSortableHeaders)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()).then(d => {
      d = d.map(({ name, username, email, id, phone, website, company, address }) => {
        return ({
          id, name, username, email, phone, website,
          company: company.name, address: `${address.suite}, ${address.street}, ${address.city}`
        })
      })
      setData(d)
    })
  }, [])

  const onDeleteClick = (id) => {
    data = data.filter(d => d.id !== id)
    setData(data)
  }

  const onSortClick = (header, type, previousOrder) => {
    if (type === 'string') {
      data = data.sort((a, b) => {
        const modification = previousOrder === 'down' ? 1 : -1
        return modification * a[header].localeCompare(b[header])
      })
      sortableHeaders[header].sortOrder = sortableHeaders[header].sortOrder === 'down' ? 'up' : 'down';
      Object.keys(sortableHeaders).filter(h => h !== header).forEach(h => {
        sortableHeaders[h].sortOrder = null
      })
      setSortableHeaders({ ...sortableHeaders })
      setData([...data])
    }
  }

  return (
    <main>
      <TableView onDeleteClick={onDeleteClick}
        sortableHeaders={sortableHeaders}
        onSortClick={onSortClick}
        data={data} />
    </main>
  );
}

export default App;
