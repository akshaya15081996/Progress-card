import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Button,Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { ViewRolesandpermissiontitle, RolesandpermissionTitle, Add,RolesName } from '../../../Utils/Constants';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import axios from 'axios';
import { baseUrl, } from '../../../Utils/FileUpload';
import { Rolesandpermission } from '../../../Types/Tables.type';
import FilterComponent from '../../Tables/DataTables/Common/FilterComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Btn } from "../../../AbstractElements";
import { useNavigate } from "react-router-dom";


export default function ViewRolesandpermission() {
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Rolesandpermission[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}roles/findAllroles`);
        const data: Rolesandpermission[] = response.data; 
        setFilteredItems(data);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);


  const filteredData = filteredItems.filter(item => {
    return (
      (item.rolename && item.rolename.toLowerCase().includes(filterText.toLowerCase()))
    );
  });
  
  const handleAddEdit = (id: string) => {
    navigate("/admiro/rolesandpermission/addrolesandpermission", { state: { id: id } });
  };



  // Define columns with actions
const rolesandpermissionTableColumns = [
    {
      name: 'Roles Name',
      selector: (row: Rolesandpermission) => row.rolename,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: Rolesandpermission) => (
        <div className="d-flex justify-content-end">
          <Button color="primary" size="sm" onClick={() => handleAddEdit(row._id)}><i className="icon-pencil-alt" /></Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  // Show a loading spinner while data is being fetched
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs pageTitle={ViewRolesandpermissiontitle} parent={RolesandpermissionTitle} title={ViewRolesandpermissiontitle} />
      <Col xl={12} className='mb-lg-3'>
        <Card>
          <CardBody>
            <FilterComponent
              onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
              filterText={filterText}
            />
            <div className="table-responsive">
              <DataTable
                data={filteredData}
                columns={rolesandpermissionTableColumns}
                pagination
                highlightOnHover
                striped
              />
            </div>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </>
  );
}
