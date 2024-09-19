import React, { useState, useEffect } from "react";
import { Col, Card, CardBody, Button } from "reactstrap";
import {
  ViewCategoryTitle,
  CategoryTitle,
  AddCategory,
  ViewStudentTitle,
  StudentTitle,Add
} from "../../../Utils/Constants";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl, mediaUrl } from "../../../Utils/FileUpload";
import FilterComponent from "../../Tables/DataTables/Common/FilterComponent";
import DataTable, { TableColumn } from "react-data-table-component";
import { Btn } from "../../../AbstractElements";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface StudentData {
  _id: string; 
  studentname: string;
  image?: string;
  address:string;
  userid: {
    email: string;
  }; 
  password:string;
  contactno:string;
  class:string;
  dob:string

}

export default function ViewStudent() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contactno, setContactno] = useState("");
  const [classdiv, setClassdiv] = useState("");
  const [dob, setdob] = useState("");






  const [data, setData] = useState<StudentData[]>([]);
  const [filterText, setFilterText] = useState("");
  const location = useLocation();
  const [refresh, setRefresh] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}student/findAllstudent`);
      console.log(response,'res')
      // Map backend _id to id to align with frontend usage
      // const formattedData = response.data.map((item: any) => ({
      //   id: item._id, // Assuming backend returns _id
      //   studentname: item.studentname,
      //   image: item.image,
      //   email:item.userid?.email || "No Email",
      //   password:item.password,
      //   address:item.address,
      //   contactno:item.contactno,
      //   class:item.class,
      //   dob:item.dob
      // }));

      setData(response.data);
      console.log(response.data, "rd"); // Check if IDs are properly formatted
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
        <div>Are you sure you want to delete this student?</div>
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
        `${baseUrl}student/deletestudent`,
        { id },
        { headers: { "Content-Type": "application/json" } }
      );
      // Show success notification
      toast.success("Student deleted successfully", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
      setRefresh((prev) => prev + 1); // Increment refresh to trigger re-fetching
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("An error occurred while deleting the student", {
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
      });
    }
  };

  const filteredItems = data.filter((item) => {
    const valuesToSearch = [
      item.studentname,
      item.class,
      item.userid?.email, 
      item.contactno,
      item.dob,
      item.address
    ]
      .filter(Boolean) // Remove null or undefined values
      .map((value) => value.toString().toLowerCase()); // Convert all to lowercase strings
  
    return valuesToSearch.some((value) =>
      value.includes(filterText.toLowerCase())
    );
  });
  

  // Define columns using the StudentData interface
  const columns: TableColumn<StudentData>[] = [
    {
      name: "Name",
      selector: (row: StudentData) => row.studentname || "No Name",
      sortable: true,
      center: false,
    },
    {
      name: "Class",
      selector: (row: StudentData) => row.class,
      sortable: true,
      center: false,
    },
    {
      name: "Email",
      selector: (row: StudentData) => row.userid?.email || "No Email", 
      sortable: true,
      center: false,
    },
    
    {
      name: "contactno",
      selector: (row: StudentData) => row.contactno,
      sortable: true,
      center: false,
    },
{
      name: "dob",
      selector: (row: StudentData) => row.dob,
      sortable: true,
      center: false,
    },

    {
      name: "Image",
      cell: (row: StudentData) =>
        row.image ? (

          <img src={`${mediaUrl}${row.image}`} alt="Student" width={100} height={100}  />
        ) : (
          "No Image"
        ),
      sortable: false,
      center: true,
    },
    {
      name: "Action",
      cell: (row: StudentData) => (
        <ul className="action simple-list flex-row">
          <li className="edit">
            <Link
              to={`/admiro/student/editstudent`}
              state={{ id: row._id }}
            >
              <i className="icon-pencil-alt" />
            </Link>
          </li>
          <li className="delete" onClick={() => handleDelete(row._id)}>
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
        pageTitle={ViewStudentTitle}
        parent={StudentTitle}
        title={ViewStudentTitle}
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
            <Link
              to="/admiro/student/addstudent"
              style={{ color: "inherit", textDecoration: "none" }}
            >
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
