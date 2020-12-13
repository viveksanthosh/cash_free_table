import { useEffect, useState } from 'react'
import './TableView.css'

const TableView = ({ data, onDeleteClick,
    sortableHeaders, onSortClick }) => {

    const [rows, setRows] = useState(null);
    const [page, setPage] = useState(null);

    useEffect(() => {
        const paginationNeeded = (rows && rows < data.length)
        if (!paginationNeeded) {
            setPage(null); return;
        }
        else if (paginationNeeded && page === null) {
            setPage(1); return;
        }
        setPage(1);
    }, [data, rows])

    const onRowNumberChange = (e) => {
        const row = Number(e.target.value)
        if (!Number.isNaN(row))
            setRows(row)
    }

    const onPageIncrement = () => { setPage(page + 1) }
    const onPageDecrement = () => { setPage(page - 1) }

    if (!data || data.length === 0)
        return null

    const headers = Object.keys(data[0])

    let displayData = data;
    if (page) {
        displayData = data.slice((page - 1) * rows, page * rows)
    }

    return <section className='tableView'>

        <label className='numberOrRows'>Number of rows to display
            <input value={rows ? rows : ''} onChange={onRowNumberChange} />
        </label>

        <table className='table'>
            <thead>
                <Header onSortClick={onSortClick}
                    sortableHeaders={sortableHeaders}
                    headers={headers} />
            </thead>
            <tbody>
                {displayData.map(d => <Body
                    onDeleteClick={onDeleteClick}
                    key={d.id}
                    headers={headers}
                    values={d} />)}
            </tbody>
        </table>

        {page && <div className='pagination'>
            <span onClick={onPageDecrement} className={`${page === 1 ? 'disabled' : ''} pagination-button`}>Prev</span>
            <span className={`pagination-number`}>{page}</span>
            <span onClick={onPageIncrement} className={`${(page * rows) >= data.length ? 'disabled' : ''} pagination-button`}>Next</span>
        </div>}
    </section>
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
                {showArrow('down', sortableHeaders[h]) && <i className="arrow down"></i>}
                {showArrow('up', sortableHeaders[h]) && <i className="arrow up"></i>}
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