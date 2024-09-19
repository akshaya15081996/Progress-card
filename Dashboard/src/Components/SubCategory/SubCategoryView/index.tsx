import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Button,Spinner } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { ViewSubCategorytitle, SubCategoryTitle, ViewSubCategoryTitle, Add } from '../../../Utils/Constants';
import Breadcrumbs from '../../../CommonElements/Breadcrumbs';
import axios from 'axios';
import { baseUrl, mediaUrl } from '../../../Utils/FileUpload';
import { Subcategory } from '../../../Types/Tables.type';
import FilterComponent from '../../../Components/Tables/DataTables/Common/FilterComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Btn } from "../../../AbstractElements";
import { useNavigate } from "react-router-dom";


export default function SubCategoryView() {
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState<Subcategory[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}subcategory/findwithcategory`);
        const data: Subcategory[] = response.data; 
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

  const handleAdd = () => {
    navigate("/admiro/subcategory/addsubcategory");
  };

  // const filteredData = filteredItems.filter(item =>
  //   Object.values(item).some(value =>
  //     value && value.toString().toLowerCase().includes(filterText.toLowerCase())
  //   )
  // );
  const filteredData = filteredItems.filter(item => {
    return (
      (item.subcategory && item.subcategory.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.parentcategory.name && item.parentcategory.name.toLowerCase().includes(filterText.toLowerCase()))
    );
  });
  
  const handleEdit = (id: string) => {
    navigate("/admiro/subcategory/editsubcategory", { state: { id: id } });
  };

  const handleDelete = (id: string) => {
    const confirmToast = () =>
      toast.warn(
        <div>
          <div>Are you sure you want to delete this subcategory?</div>
          <div className="d-flex justify-content-end mt-2">
            <Button color="danger" onClick={() => confirmDelete(id)}>Yes</Button>
            <Button color="secondary" onClick={() => toast.dismiss()} className="ms-2">Cancel</Button>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false,
        }
      );

    const confirmDelete = async (id: string) => {
      toast.dismiss();
      try {
        await axios.post(
          `${baseUrl}subcategory/deletesubcat`,
          { id },
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success(`Subcategory Deleted Successfully`, {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
        });
        setRefresh(prev => prev + 1);
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        toast.error("An error occurred while deleting the subcategory", {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    };

    confirmToast();
  };

  // Define columns with actions
const subcategoryTableColumns = [
    {
      name: 'Subcategory Name',
      selector: (row: Subcategory) => row.subcategory,
      sortable: true,
    },
    {
      name: 'Category Name',
      selector: (row: Subcategory) => row.parentcategory.name,
      sortable: true,
    },
    {
      name: 'Subcategory Image',
      cell: (row: Subcategory) => (
        <img src={`${mediaUrl}/${row.file}`} alt={row.file} width={100} height={100} />
      ),
      sortable: false,
    },
    {
      name: 'Actions',
      cell: (row: Subcategory) => (
        <div className="d-flex justify-content-end">
          <Button color="primary" size="sm" onClick={() => handleEdit(row._id)}><i className="icon-pencil-alt" /></Button>
          <Button color="danger" size="sm" onClick={() => handleDelete(row._id)} className="ms-2"><i className="icon-trash" /></Button>
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
      <Breadcrumbs pageTitle={ViewSubCategorytitle} parent={SubCategoryTitle} title={ViewSubCategoryTitle} />
      <Col xl={12} className='mb-lg-3'>
        <Card>
          <CardBody>
            <Col xs={12} className="mt-2 d-flex justify-content-end mb-3">
              <Btn color="primary" onClick={handleAdd}>{Add}</Btn>
            </Col>
            <FilterComponent
              onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
              filterText={filterText}
            />
            <div className="table-responsive">
              <DataTable
                data={filteredData}
                columns={subcategoryTableColumns}
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
