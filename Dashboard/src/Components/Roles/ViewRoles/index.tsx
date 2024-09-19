import React, { useState, useEffect } from "react";
import { Col, Card, CardBody, Button } from "reactstrap";
import {
    ViewRoletitle,
    RoleTitle,
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
import { Item } from "react-photoswipe-gallery";

interface RoleData {
    id: string;
    rolename: string;
}


export default function ViewRoles() {

    const [role, setRole] = useState("");
    const [data, setData] = useState<RoleData[]>([]);
    const [filterText, setFilterText] = useState("");
    const location = useLocation();
    const [refresh, setRefresh] = useState(0);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}roles/findAllroles`);
console.log(response.data,'res')
            const formattedData = response.data.map((item: any) => (
                {

                id: item._id,
                rolename: item.rolename,
            })

            );
            console.log(formattedData, 'fd')

            setData(formattedData);
            console.log(formattedData, "rd");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const handleDelete = (id: string) => {
        toast.warn(
            <div>
                <div>Are you sure you want to delete this role?</div>
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
                `${baseUrl}roles/deleteroles`,
                { id },
                { headers: { "Content-Type": "application/json" } }
            );
            // Show success notification
            toast.success("Role deleted successfully", {
                position: "top-right",
                autoClose: 1000,
                closeOnClick: true,
            });
            setRefresh((prev) => prev + 1); // Increment refresh to trigger re-fetching
        } catch (error) {
            console.error("Error deleting role:", error);
            toast.error("An error occurred while deleting the role", {
                position: "top-right",
                autoClose: 1000,
                closeOnClick: true,
            });
        }
    };

    const columns: TableColumn<RoleData>[] = [
        {
            name: "Role",
            selector: (row: RoleData) => row.rolename,
            sortable: true,
            center: false,
        },

        {
            name: "Action",
            cell: (row: RoleData) => (
                <ul className="action simple-list flex-row">
                    <li className="edit">
                        <Link
                            to={`/admiro/role/editrole`}
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

    const filteredItems = data.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(filterText.toLowerCase())
        )
      );

    return (
        <>
      <Breadcrumbs
        pageTitle={ViewRoletitle}
        parent={RoleTitle}
        title={ViewRoletitle}
      />
       <Col sm={12}>
        <Card>
          <CardBody>
          <Col>
        <div className="text-end">
        <Btn color="primary" className="me-2 mb-5 btn-square" style={{ borderRadius: "5px" }}>
  <Link to="/admiro/roles/addroles" style={{ color: "inherit", textDecoration: "none" }}>
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
    )
}