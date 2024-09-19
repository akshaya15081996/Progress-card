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
  FormFeedback,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import axios from "axios";
import { baseUrl} from "../../../Utils/FileUpload";
import {
  Submit,
  AddPermissiontitle,
  PermissionTitle,
  PermissionName,
  Shortcode,
} from "../../../Utils/Constants";
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";



interface FormValues {
  permissionName: string;
  shortcode:string;
}

export default function AddPermission() {
  const navigate = useNavigate();
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();



  const onSubmit = async (data: FormValues) => {
    try {

      const addPermission = {
        permission: data.permissionName,
        shortcode: data.shortcode,
      };

      const response = await axios.post(
        `${baseUrl}permission/savepermission`,
        addPermission
      );
      console.log(response.data, "response");
      if (response.status === 200) {
        SuccessToast("Permission added successfully","/admiro/permission/permissionview");
        setTimeout(() => {
          navigate("/admiro/permission/viewpermission");
        }, 1000);        
      } else {
        ErrorToast("Failed to add permission");
      }
    } catch (err) {
      console.error("Error:", err);
      ErrorToast("An unexpected error occurred");
    }
  };


  return (
    <>
      <Breadcrumbs
        pageTitle={AddPermissiontitle}
        parent={PermissionTitle}
        title={AddPermissiontitle}
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
