import './TableView.css'

const TableView = ({ data }) => {
    if (!data || data.length === 0)
        return null
    const headers = Object.keys(data[0])
    return <table class='table'>
        <thead>
            <Header headers={headers} />
        </thead>
        <tbody>
            {data.map(d => <Body key={d.id} headers={headers} values={d} />)}
        </tbody>

    </table>
}

const Header = ({ headers }) => (<tr>
    {headers.map(h => <th key={h}>{h}</th>)}
    <th>Actions</th>
</tr>)

const Body = ({ headers, values }) => (<tr className='table-body'>
    {headers.map(h => <td key={h}>{values[h]}</td>)}
    <td><a>Open</a><a>Delete</a></td>
</tr>)

export { TableView }