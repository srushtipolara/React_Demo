
import React from 'react'
import { Button, Table } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'; 
import array from './array';
import { Link, useNavigate } from 'react-router-dom';
import FilterComponent from './FilterComponent';
import DataTable from 'react-data-table-component'

function Home() {

    let history = useNavigate()

    const [filterText, setFilterText] = React.useState('');
    // {console.log("filterText",filterText)}
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = array.filter(
        item => item.Name && item.Name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const columns = [
        {
            name: 'Name',
            selector: row => row.Name,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.Age,
            sortable: true,
        },
        {
            name: 'Edit',
            cell: row => <Link to={`/edit`}><Button onClick={(e) =>
                setID(row.id, row.Name, row.Age)} variant="info">
                Update</Button></Link>
        },
        {
            name: 'Delete',
            cell: row => <Button onClick={e => deleted(row.id)}
                variant="danger">Delete</Button>
        }
    ];
    // You may skip this part if you're
    // using react-context api or redux
    function setID(id, name, age) {
        localStorage.setItem('id', id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Age', age);
    }

    // Deleted function - functionality 
    // for deleting the entry
    function deleted(id) {

        var index = array.map(function (e) { return e.id; }).indexOf(id);

        // deleting the entry with index
        array.splice(index, 1)

        // We need to re-render the page for getting 
        // the results so redirect to same page.
        history('/')
    }

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);


    return (
        <div style={{ margin: '10rem' }}>
            <DataTable
                title="Contact List"
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                selectableRows
                persistTableHead
            />
            <Link className="d-grid gap-2" to='/create'>
                <Button variant="warning" size="lg">Create</Button>
            </Link>
        </div>
    )
}

export default Home