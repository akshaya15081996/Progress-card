import React, { useState, useEffect } from "react";
import { Col, Card, CardBody, Button } from "reactstrap";
import {
  ViewCategoryTitle,
  CategoryTitle,
  Add,
} from "../../../Utils/Constants";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, mediaUrl } from "../../../Utils/FileUpload";
import FilterComponent from "../../../Components/Tables/DataTables/Common/FilterComponent";
import DataTable, { TableColumn } from "react-data-table-component";
import { Btn } from "../../../AbstractElements";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface CategoryData {
  id: string; // Changed to string to match ObjectId format
  name: string;
  image?: string;
}

export default function ViewCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState<CategoryData[]>([]);
  const [filterText, setFilterText] = useState("");
  const location = useLocation();
  const [refresh, setRefresh] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}category/findAll`);
      // Map backend _id to id to align with frontend usage
      const formattedData = response.data.map((item: any) => ({
        id: item._id, // Assuming backend returns _id
        name: item.name,
        image: item.image,
      }));
      setData(formattedData);
      console.log(formattedData, "rd"); // Check if IDs are properly formatted
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]); // Adding refresh as a dependency

  const handleDelete = (id: string) => {
    toast.warn(
      <div>
        <div>Are you sure you want to delete this category?</div>
        <div className="d-flex justify-content-end mt-2">
          <Button
            color="danger"
            onClick={async () => {
              // Call confirmDelete only after the user confirms
              await confirmDelete(id);
            }}
          >
            Yes
          </Button>
          <Button
            color="secondary"
            onClick={() => toast.dismiss()}
            className="ms-2"
          >
            Cancel
          </Button>
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
  };

  const confirmDelete = async (id: string) => {
    toast.dismiss(); // Dismiss the confirmation toast
    try {
      // Make the delete API request
      await axios.post(
        `${baseUrl}category/deletecategory`,
        { id },
        { headers: { "Content-Type": "application/json" } }
      );
      // Show success notification
      toast.success("Category deleted successfully", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
      setRefresh((prev) => prev + 1); // Increment refresh to trigger re-fetching
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  };

  const filteredItems = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  // Define columns using the CategoryData interface
  const columns: TableColumn<CategoryData>[] = [
    {
      name: "Name",
      selector: (row: CategoryData) => row.name,
      sortable: true,
      center: false,
    },
    {
      name: "Image",
      cell: (row: CategoryData) =>
        row.image ? (

          <img src={`${mediaUrl}${row.image}`} alt="Category" width={100} height={100}  />
        ) : (
          "No Image"
        ),
      sortable: false,
      center: true,
    },
    {
      name: "Action",
      cell: (row: CategoryData) => (
        <ul className="action simple-list flex-row">
          <li className="edit">
            <Link
              to={`/admiro/category/editcategory`}
              state={{ id: row.id }}
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="delete" onClick={() => handleDelete(row.id)}>
            <a href="#">
              <i className="icon-trash" />
            </a>
          </li>
        </ul>
      ),
      sortable: false,
      center: true,
    },
  ];

  return (
    <>
      <Breadcrumbs
        pageTitle={ViewCategoryTitle}
        parent={CategoryTitle}
        title={ViewCategoryTitle}
      />
      {/* <Col>
        <div className="text-end">
          <Btn color="primary" className="me-2 mb-5 btn-square">
            <Link
              to="/admiro/category/addcategory"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {AddCategory}
            </Link>
          </Btn>
        </div>
      </Col> */}

      <Col sm={12}>
        <Card>
          <CardBody>
          <Col>
        <div className="text-end">
        <Btn color="primary" className="me-2 mb-5 btn-square" style={{ borderRadius: "5px" }}>
  <Link to="/admiro/category/addcategory" style={{ color: "inherit", textDecoration: "none" }}>
    {Add}
  </Link>
</Btn>

        </div>
      </Col>
            <FilterComponent
              onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
              filterText={filterText}
            />
            <div className="table-responsive">
              <DataTable
                data={filteredItems}
                columns={columns}
                pagination
                highlightOnHover
                striped
              />
            </div>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer/>
    </>
  );
}
