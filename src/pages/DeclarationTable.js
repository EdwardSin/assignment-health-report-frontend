import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import "../css/styles.scss";
import "../css/DeclarationTable.scss";
import axios from 'axios';
import _ from 'lodash';
import TimeHelper from '../helpers/time.helper';

function DeclarationTable() {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [data, setData] = useState([{
    _id: '1',
    name: '1',
    temperature: 1,
    hasSymptoms: true,
    hasContactInLast14Days: true,
    createdAt: new Date()
  }]);
  const [keyword, setKeyword] = useState('');
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({'name': 1});
  const columns = [
    {
      id: '_id',
      name: "ID",
      sortable: true,
      selector: (row) => row._id,
    },
    { id: 'name', name: "Name", sortable: true, selector: (row) => row.name },
    { name: "Temperature(°C)", id: 'temperature', sortable: true, selector: (row) => row.temperature },
    {
      id: 'hasSymptoms',
      name: "Has Symptoms",
      sortable: true,
      selector: (row) => (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={row.hasSymptoms ? "text-green" : "text-black-50"}
        />
      ),
    },
    {
      id: 'hasContactInLast14Days',
      name: "Has Contact In Last 14 Days",
      sortable: true,
      selector: (row) => (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={
            row.hasContactInLast14Days ? "text-green" : "text-black-50"
          }
        />
      ),
    },
    {
      id: 'createdAt',
      name: "Created At",
      sortable: true,
      selector: (row) => TimeHelper.getFormattedDateFromDB(row.createdAt),
    }
  ];
  const handleKeywordDebounce = useCallback(
    _.debounce((event) => {
      setKeyword(event.target.value);
    }, 500),
    []
  )
  const handleSort = useCallback(_.debounce((event, ordering) => {
    const obj = {};
    obj[event.id] = ordering === 'asc' ? 1 : -1;
    setSort(obj);
  }, 500), []);
  const handlePageChange = useCallback(_.debounce((event) => {
    setPage(event);
  }, 500), []);
  const handlePerRowsChange = useCallback(_.debounce((event) => {
    setPage(1);
    setLimit(event);
  }, 500), []);
  const queryList = async () => {
    setLoading(true);
    const result = await axios.get('/api/list', {
      params: {
        keyword,
        sort: sort || {name: 1},
        skip: (page - 1) * limit,
        limit
      }
    })
    setLoading(false);
    if (result.status === 200) {
      setData(result.data.result);
      setTotalRows(result.data.total);
    }
  }
  useEffect(() => {
    queryList();
  }, [keyword, sort, page, limit]);

  return (
    <div>
      <div className={"justify-content-end d-flex me-3 py-3"} style={{marginBottom: '-4.5rem', zIndex: 999, position: 'relative'}}>
        <input className={"form-control me-2"} style={{ width: "300px" }} onChange={handleKeywordDebounce} />
      </div>
      <DataTable
        title={'Health Covid-19 Declaration List'}
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<Loading className={"my-5"}/>}
        onSort={handleSort}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationPerPage={50}
        paginationRowsPerPageOptions={[50, 100, 200]}
        paginationTotalRows={totalRows}
        fixedHeader
        pagination
        paginationServer
        highlightOnHover
        sortServer
      />
    </div>
  );
}
export default DeclarationTable;
