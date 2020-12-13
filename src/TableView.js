import './TableView.css'

const TableView = ({ data, onDeleteClick,
    sortableHeaders, onSortClick }) => {
    if (!data || data.length === 0)
        return null
    const headers = Object.keys(data[0])
    return <table className='table'>
        <thead>
            <Header onSortClick={onSortClick} sortableHeaders={sortableHeaders} headers={headers} />
        </thead>
        <tbody>
            {data.map(d => <Body onDeleteClick={onDeleteClick} key={d.id} headers={headers} values={d} />)}
        </tbody>

    </table>
}

const Header = ({ headers, sortableHeaders, onSortClick }) => {

    function showArrow(type, sortableHeader) {
        if (!sortableHeader)
            return false
        if (!sortableHeader.sortOrder)
            return true
        return sortableHeader.sortOrder === type
    }

    return <tr>
        {headers.map(h => <th onClick={() => { onSortClick(h, sortableHeaders[h].type, sortableHeaders[h].sortOrder) }}
            key={h}
        >{h}
            <span className='arrowBox'>
                {showArrow('down', sortableHeaders[h]) && <i class="arrow down"></i>}
                {showArrow('up', sortableHeaders[h]) && <i class="arrow up"></i>}
            </span></th>)}
        <th>Actions</th>
    </tr>
}

const Body = ({ headers, values, onDeleteClick }) => (<tr className='table-body'>
    {headers.map(h => <td key={h}>{values[h]}</td>)}
    <td><a>Open</a>
        <a onClick={() => {
            onDeleteClick(values.id)
        }}>Delete</a></td>
</tr>)

export { TableView }