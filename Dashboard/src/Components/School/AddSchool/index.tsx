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
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import axios, { AxiosError } from "axios";
import { baseUrl, handleFileUpload } from "../../../Utils/FileUpload";
import {
  ChooseFile,
  Submit,
  ContactNumber,
  Email,
  Address,
  Password,
  SchoolTitle,
  AddSchoolTitle,
  SchoolName,

} from "../../../Utils/Constants";
import { useNavigate } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";
import { ToastContainer } from "react-toastify";

interface FormValues {
  schoolname: string;
  email: string;
  address: string;
  contactno: string;
  password: string;
  file: FileList;
}
interface ErrorResponse {
  message: string;
}

export default function AddSchool() {
  const navigate = useNavigate();
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const fileData = await handleFileUpload({ target: { files: data.file } });
  
      data.file = fileData;
 
      const response = await axios.post(`${baseUrl}school/saveschool`, data);

      console.log(response.data, "response");
  
      if (response.status === 200) {
        SuccessToast("School added successfully", "/admiro/school/viewschool");
      } else {
        ErrorToast("Failed to add school");
      }
    } catch (err) {
      // Type assertion to AxiosError
      const axiosError = err as AxiosError;
      // Extract error message from AxiosError
      const errorMessage =
      (axiosError.response?.data as ErrorResponse)?.message || "An unexpected error occurred";
  

      console.error("Error:", errorMessage);
      ErrorToast(errorMessage);
    }
  };

  return (
    <>
      <Breadcrumbs
        pageTitle={AddSchoolTitle}
        parent={SchoolTitle}
        title={AddSchoolTitle}
      />
      <Col xl={12} className="mb-lg-3">
        <Card>
          <CardBody className="custom-input form-validation">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="g-3">
                <Col xs={12}>
                  <Label htmlFor="school-name">{SchoolName}</Label>
                  <Controller
                    name="schoolname"
                    control={control}
                    rules={{
                      required: "School name is required",
                      pattern: {
                        value: /^[A-Za-z0-9\s.'-]{2,50}$/,
                        message:
                          "Invalid school name. Only letters,dots, numbers, spaces, hyphens (-), and apostrophes (') are allowed.",
                      },
                      validate: (value) => {
                        // Ensure it's not all numbers or just special characters

                        if (/^\d+$/.test(value)) {
                          return "School name cannot be all numbers.";
                        }
                        if (/^[^A-Za-z]+$/.test(value)) {
                          return "School name must include letters.";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="school-name"
                          type="text"
                          placeholder="School name"
                          {...field}
                          invalid={!!errors.schoolname}
                          style={{
                            color: "black",
                            borderColor: errors.schoolname ? "red" : "",
                          }}
                        />
                        {errors.schoolname && (
                          <FormFeedback>
                            {errors.schoolname.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>

                <Col xs={12}>
                  <Label htmlFor="email">{Email}</Label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message:
                          "Invalid email address. Please enter a valid email.",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          {...field}
                          invalid={!!errors.email}
                          style={{
                            color: "black",
                            borderColor: errors.email ? "red" : "",
                          }}
                        />
                        {errors.email && (
                          <FormFeedback>{errors.email.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>

                <Col xs={12}>
                  <Label htmlFor="contactno">{ContactNumber}</Label>
                  <Controller
                    name="contactno"
                    control={control}
                    rules={{
                      required: "Contact Number is required",
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]*$/,
                        message:
                          "Invalid contact number. Please enter a valid number.",
                      },
                      minLength: {
                        value: 10,
                        message: "Contact Number should be at least 10 digits.",
                      },
                      maxLength: {
                        value: 15,
                        message: "Contact Number should not exceed 15 digits.",
                      },
                      validate: {
                        isTenDigits: (value) => {
                          const digitsOnly = value.replace(/\D/g, '');
                          return digitsOnly.length >= 10 || "Contact number must have at least 10 digits.";
                        },
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="contactno"
                          type="text"
                          placeholder="Contact Number"
                          {...field}
                          invalid={!!errors.contactno}
                          style={{
                            color: "black",
                            borderColor: errors.contactno ? "red" : "",
                          }}
                        />
                        {errors.contactno && (
                          <FormFeedback>
                            {errors.contactno.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>

                <Col xs={12}>
                  <Label htmlFor="address">{Address}</Label>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="address"
                          type="text"
                          placeholder="Address"
                          {...field}
                          invalid={!!errors.address}
                          style={{
                            color: "black",
                            borderColor: errors.address ? "red" : "",
                          }}
                        />
                        {errors.address && (
                          <FormFeedback>{errors.address.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>


                <Col xs={12}>
                  <Label htmlFor="formFile">{ChooseFile}</Label>
                  <Controller
                    name="file"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field: { onChange, onBlur, ref } }) => (
                      <>
                        <Input
                          id="formImage"
                          type="file"
                          onChange={(e) => onChange(e.target.files)}
                          onBlur={onBlur}
                          innerRef={ref}
                          invalid={!!errors.file}
                          style={{ borderColor: errors.file ? "red" : "" }}
                        />
                        {errors.file && (
                          <FormFeedback>{errors.file.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>

                <Col xs={12}>
                  <Label htmlFor="password">{Password}</Label>
                  <InputGroup>
                    <Col xs={11}>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long.",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              {...field}
                              invalid={!!errors.password}
                              style={{
                                color: "black",
                                borderColor: errors.password ? "red" : "",
                              }}
                            />
                            {errors.password && (
                              <FormFeedback>
                                {errors.password.message}
                              </FormFeedback>
                            )}
                          </>
                        )}
                      />
                    </Col>
                    <Col xs={1}>
                      <InputGroupText style={{backgroundColor:'#308e87',color:'white',justifyContent:'center'}} onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </InputGroupText>
                    </Col>
                  </InputGroup>
                </Col>

                <Col xs={12} className="mt-2">
                  <Btn color="primary">{Submit}</Btn>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </>
  );
}
