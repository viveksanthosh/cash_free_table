import { useEffect, useState } from 'react';
import { TableView } from './TableView'
import './App.css';

function App() {
  const [data, setData] = useState([])
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
  //console.log(data);
  return (
    <main>
        <TableView data={data} />
    </main>
  );
}

export default App;
