import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
  FormFeedback,Spinner
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import axios from "axios";
import { baseUrl, handleFileUpload, mediaUrl } from "../../../Utils/FileUpload";
import {
  Submit,
  EditPermissiontitle,
  PermissionTitle,
  PermissionName,
  Shortcode,
} from "../../../Utils/Constants";

import { useNavigate, useLocation } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";
import { ToastContainer } from "react-toastify";

interface FormValues {
  permissionName: string;
  shortcode:string
}

export default function EditPermission() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const location = useLocation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      permissionName: "",
      shortcode:"",
    },
  });

  useEffect(() => {
    const fetchPermissionDetails = async () => {
      setLoading(true);
      try {
        const result = await axios.post(`${baseUrl}permission/findpermissionbyid`, {
          id: location.state.id,
        });

        // Populate the form with fetched data
        setValue("permissionName", result.data.permission);
        setValue("shortcode", result.data.shortcode);

      } catch (error) {
        console.error("Error fetching permission details:", error);
      }finally {
        setLoading(false); 
      }
    };
    fetchPermissionDetails();
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    try {

      const editPermission = {
        permission: data.permissionName,
        shortcode: data.shortcode,
        id: location.state.id,
      };

      const response = await axios.post(`${baseUrl}permission/updatepermission`, editPermission);

      if (response.status === 200) {
        SuccessToast("Permission edited successfully","/admiro/permission/viewpermission");
        setTimeout(() => {
          navigate("/admiro/permission/viewpermission");
        }, 1000);
      } else {
        ErrorToast("Failed to edit permission");
      }
    } catch (err) {
      console.error("Error:", err);
      ErrorToast("An unexpected error occurred");
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs
        pageTitle={EditPermissiontitle}
        parent={PermissionTitle}
        title={EditPermissiontitle}
      />
      <Col xl={12} className="mb-lg-3">
        <Card>
          <CardBody className="custom-input form-validation">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="g-3">
                <Col xs={12}>
                  <Label htmlFor="permission-name">{PermissionName}</Label>
                  <Controller
                    name="permissionName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Permission name is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="permission-name"
                          type="text"
                          placeholder="Permission name"
                          {...field}
                          invalid={!!errors.permissionName}
                          style={{ color: 'black' ,borderColor: errors.permissionName ? "red" : "",}}
                        />
                        {errors.permissionName && (
                          <FormFeedback>
                            {errors.permissionName.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>
                <Col xs={12}>
                  <Label htmlFor="shortcode">{Shortcode}</Label>
                  <Controller
                    name="shortcode"
                    control={control}
                    rules={{ required: "Shortcode is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="shortcode"
                          type="text"
                          placeholder="Short code"
                          {...field}
                          invalid={!!errors.shortcode}
                          style={{ color: 'black' ,borderColor: errors.shortcode ? "red" : "",}}
                        />
                        {errors.shortcode && (
                          <FormFeedback>
                            {errors.shortcode.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>
                <Col xs={12} className="mt-2">
                  <Btn color="primary">{Submit}</Btn>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer/>
    </>
  );
}




























