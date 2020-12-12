import { useEffect, useState } from 'react';
import { TableView } from './TableView'
import './App.css';

function App() {
  let [data, setData] = useState([])
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
  //console.log(data);
  return (
    <main>
        <TableView onDeleteClick={onDeleteClick} data={data} />
    </main>
  );
}

export default App;
