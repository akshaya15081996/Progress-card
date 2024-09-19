import React, { useState } from "react";
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
  StudentTitle,
  AddStudentTitle,
  StudentNameTitle,
} from "../../../Utils/Constants";
import { useNavigate } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";
import { ToastContainer } from "react-toastify";

interface FormValues {
  studentname: string;
  email: string;
  address: string;
  contactno: string;
  password: string;
  class: string;
  dob: string;
  image: FileList;
}
interface ErrorResponse {
  message: string;
}

export default function AddStudent() {
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
      const fileData = await handleFileUpload({
        target: { files: data.image },
      });

      data.image = fileData;

      const response = await axios.post(`${baseUrl}student/savestudent`, data);
      console.log(response.data, "response");

      if (response.status === 200) {
        SuccessToast(
          "Student added successfully",
          "/admiro/student/viewstudent"
        );
      } else {
        ErrorToast("Failed to add student");
      }
    } catch (err) {
      // Type assertion to AxiosError
      const axiosError = err as AxiosError;
      // Extract error message from AxiosError
      const errorMessage =
        (axiosError.response?.data as ErrorResponse)?.message ||
        "An unexpected error occurred";

      console.error("Error:", errorMessage);
      ErrorToast(errorMessage);
    }
  };

  return (
    <>
      <Breadcrumbs
        pageTitle={AddStudentTitle}
        parent={StudentTitle}
        title={AddStudentTitle}
      />
      <Col xl={12} className="mb-lg-3">
        <Card>
          <CardBody className="custom-input form-validation">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="g-3">
                <Col xs={12}>
                  <Label htmlFor="student-name">{StudentNameTitle}</Label>
                  <Controller
                    name="studentname"
                    control={control}
                    rules={{
                      required: "Student name is required",
                      pattern: {
                        value: /^[A-Za-z\s.'-]{2,50}$/, 
                        message:
                          "Invalid student name. Only letters, spaces, dots, hyphens (-), and apostrophes (') are allowed.",
                      },
                      validate: (value) => {
                        if (/^\d+$/.test(value)) {
                          return "Student name cannot be all numbers.";
                        }
                        if (/^[^A-Za-z]+$/.test(value)) {
                          return "Student name must include at least one letter.";
                        }
                        return true;
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="student-name"
                          type="text"
                          placeholder="Student name"
                          {...field}
                          invalid={!!errors.studentname}
                          style={{
                            color: "black",
                            borderColor: errors.studentname ? "red" : "",
                          }}
                        />
                        {errors.studentname && (
                          <FormFeedback>
                            {errors.studentname.message}
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
                          const digitsOnly = value.replace(/\D/g, "");
                          return (
                            digitsOnly.length >= 10 ||
                            "Contact number must have at least 10 digits."
                          );
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
                  <Label htmlFor="class">Class</Label>
                  <Controller
                    name="class"
                    control={control}
                    rules={{ required: "Class is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="class"
                          type="select"
                          {...field}
                          invalid={!!errors.class}
                          style={{
                            borderColor: errors.class ? "red" : "",
                            color: field.value ? "black" : "#6c757d",
                          }}
                        >
                          <option value="" style={{ color: "#6c757d" }}>
                            Select Class
                          </option>
                          <option value="I">I</option>
                          <option value="II">II</option>
                          <option value="III">III</option>
                          <option value="IV">IV</option>
                          <option value="V">V</option>
                          <option value="VI">VI</option>
                          <option value="VII">VII</option>
                          <option value="VIII">VIII</option>
                          <option value="IX">IX</option>
                        </Input>
                        {errors.class && (
                          <FormFeedback>{errors.class.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>

                {/* <Col xs={12}>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{ required: "Date of Birth is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="dob"
                          type="date"
                          {...field}
                          invalid={!!errors.dob}
                          style={{
                            borderColor: errors.dob ? "red" : "",
                            color: field.value ? "black" : "#6c757d", 
                          }}
                        />
                        {errors.dob && (
                          <FormFeedback>{errors.dob.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col> */}
                <Col xs={12}>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{
                      required: "Date of Birth is required",
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="dob"
                          type="date"
                          {...field}
                          invalid={!!errors.dob}
                          min="1900-01-01"
                          max={new Date().toISOString().split("T")[0]} // Set max date to today
                          style={{
                            borderColor: errors.dob ? "red" : "",
                            color: field.value ? "black" : "#6c757d",
                          }}
                        />
                        {errors.dob && (
                          <FormFeedback>{errors.dob.message}</FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>

                <Col xs={12}>
                  <Label htmlFor="formFile">{ChooseFile}</Label>
                  <Controller
                    name="image"
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
                          invalid={!!errors.image}
                          style={{ borderColor: errors.image ? "red" : "" }}
                        />
                        {errors.image && (
                          <FormFeedback>{errors.image.message}</FormFeedback>
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
                      <InputGroupText
                        style={{
                          backgroundColor: "#308e87",
                          color: "white",
                          justifyContent: "center",
                        }}
                        onClick={togglePasswordVisibility}
                      >
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
