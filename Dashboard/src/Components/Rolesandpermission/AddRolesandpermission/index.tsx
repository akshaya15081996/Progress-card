import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardBody, Col, Form, Spinner } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import axios from "axios";
import { baseUrl } from "../../../Utils/FileUpload";
import {
  AddRolesandpermissiontitle,
  RolesandpermissionTitle,
} from "../../../Utils/Constants";
import { useNavigate, useLocation } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";
import { ToastContainer } from "react-toastify";

// Define permission structure
interface PermissionItem {
  _id: string;
  permission: string;
  rolename: string;
  canAdd: number;
  canView: number;
  canEdit: number;
  canDelete: number;
}


export default function AddRolesandpermission() {
  const { handleSubmit, register, setValue, getValues } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const location = useLocation();
  const [permissions, setPermissions] = useState<PermissionItem[]>([]);
  const [role, setRole] = useState<any>(null); 
  const [rolesandpermission, setRolesandpermission] = useState<any>(null); 


  // Fetch role and permission details
  useEffect(() => {
    const fetchPermissionDetails = async () => {
      setLoading(true);
      try {
        const roleResponse = await axios.post(`${baseUrl}roles/findrolesbyid`, {
          id: location.state.id,
        });
        setRole(roleResponse.data); // Set role data

        const permissionResponse = await axios.get(
          `${baseUrl}permission/findallpermission`
        );
        setPermissions(permissionResponse.data); // Set permissions
      } catch (error) {
        console.error("Error fetching permission details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPermissionDetails();
  }, []);
  
  useEffect(() => {
    const fetchRolesandpermissionDetails = async () => {
      setLoading(true);
      try {
        const result = await axios.post(`${baseUrl}rolesandpermission/findrolesandpermissionbyid`, {
          roles: location.state.id,
        });
  
        if (result.data) {
          // Set the role data
          setRolesandpermission(result.data);
  
          // Set permissions in the form
          result.data.permissions.forEach((permission: any, index: number) => {
            setValue(`permissions[${index}].canAdd`, permission.canAdd === 1);
            setValue(`permissions[${index}].canView`, permission.canView === 1);
            setValue(`permissions[${index}].canEdit`, permission.canEdit === 1);
            setValue(`permissions[${index}].canDelete`, permission.canDelete === 1);
          });
        }
      } catch (error) {
        console.error("Error fetching roles and permission details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRolesandpermissionDetails();
  }, [setValue]); // Include setValue in dependencies


const onSubmit = async (data: any) => {
  const formData = {
    roles: role?._id,  // Use the existing role ID if editing
    permissions: data.permissions.map((permissionData: any, index: number) => {
      const permission = permissions[index]; // Match permission by index
      if (permission) {
        return {
          permission: permission._id, // Use the permission ID
          canAdd: permissionData.canAdd ? "1" : "0", // Convert to "1" or "0"
          canView: permissionData.canView ? "1" : "0",
          canEdit: permissionData.canEdit ? "1" : "0",
          canDelete: permissionData.canDelete ? "1" : "0",
        };
      }
      return null;
    }).filter(Boolean), // Filter out any null values
  };

  try {
    if (rolesandpermission?._id) {
      // Update existing role
      const response = await axios.post(`${baseUrl}rolesandpermission/updaterolesandpermission`, formData);
      if (response.data) {
        SuccessToast("Roles and Permission updated successfully"); 
        setTimeout(() => {
          navigate("/admiro/rolesandpermission/viewrolesandpermission");
        }, 1000);
      }
    } else {
      // Add new role
      const response = await axios.post(`${baseUrl}rolesandpermission/addrolesandpermission`, formData);
      if (response.data) {
        SuccessToast("Roles and Permission added successfully");
        
        setTimeout(() => {
          navigate("/admiro/rolesandpermission/viewrolesandpermission");
        }, 1000);
      }
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    ErrorToast("An error occurred while submitting the form");
  }
};



  // Loading state
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
      <Breadcrumbs
        pageTitle={AddRolesandpermissiontitle}
        parent={RolesandpermissionTitle}
        title={AddRolesandpermissiontitle}
      />
      <Col xl={12} className="mb-lg-3">
        <Card>
          <CardBody className="custom-input form-validation">
            <Form onSubmit={handleSubmit(onSubmit)} className="row g-3">
              {permissions.map((item, index) => (
                <div key={item._id} className="col-12">
                  <div className="card-wrapper border rounded-3 checkbox-checked">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p className="sub-title">
                          Permission Category: {item.permission}
                        </p>
                      </div>
                      <div>
                        <p className="sub-title">Roles: {role?.rolename}</p>
                      </div>
                    </div>

                    {/* Hidden input to store permission ID */}
                    <input
                      type="hidden"
                      {...register(`permissions[${index}].permission`)}
                      value={item._id} // Set item._id as the value for permission
                    />

                    <div
                      className="form-check-size"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="form-check form-check-inline checkbox checkbox-dark mb-0"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <input
                          type="checkbox"
                          id={`canAdd_${index}`}
                          {...register(`permissions[${index}].canAdd`)}
                          value='1'
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`canAdd_${index}`}
                        >
                          Can Add
                        </label>
                      </div>
                      <div className="form-check form-check-inline checkbox checkbox-dark mb-0">
                        <input
                          type="checkbox"
                          id={`canView_${index}`}
                          {...register(`permissions[${index}].canView`)}
                          value='1'
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`canView_${index}`}
                        >
                          Can View
                        </label>
                      </div>
                      <div className="form-check form-check-inline checkbox checkbox-dark mb-0">
                        <input
                          type="checkbox"
                          id={`canEdit_${index}`}
                          {...register(`permissions[${index}].canEdit`)}
                          value='1'
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`canEdit_${index}`}
                        >
                          Can Edit
                        </label>
                      </div>
                      <div className="form-check form-check-inline checkbox checkbox-dark mb-0">
                        <input
                          type="checkbox"
                          id={`canDelete_${index}`}
                          {...register(`permissions[${index}].canDelete`)}
                          value='1'
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`canDelete_${index}`}
                        >
                          Can Delete
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12">
                <Btn type="submit" color="primary" size="lg">
                  Submit
                </Btn>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer/>
    </>
  );
}


