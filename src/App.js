import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()).then(d => {
      d = d.map(({ name, username, email, id, phone, website, company, address }) => {
        return ({
          name, username, email, id, phone, website,
          company: company.name, address: `${address.suite}, ${address.street}, ${address.city}`
        })
      })
      setData(d)
    })
  }, [])
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">


      </header>
    </div>
  );
}

export default App;
