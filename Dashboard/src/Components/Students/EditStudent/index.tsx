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
  Spinner,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import axios, { AxiosError } from "axios";

import { baseUrl, handleFileUpload, mediaUrl } from "../../../Utils/FileUpload";
import {
  ChooseFile,
  Submit,
  ContactNumber,
  Email,
  Address,
  Password,
  Image,
  StudentTitle,
  EditStudenttitle,
  StudentNameTitle,
  ParentCategory,
} from "../../../Utils/Constants";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate, useLocation } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";

interface FormValues {
  studentname: string;
  email: string;
  address: string;
  contactno: string;
  password: string;
  class: string;
  dob: string;
  file: FileList | string;
}
interface ErrorResponse {
  message: string;
}
export default function EditStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      studentname: "",
      email: "",
      address: "",
      contactno: "",
      class: "",
      dob: "",
      file: "",
    },
  });
  const [existingFile, setExistingFile] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        const result = await axios.post(`${baseUrl}student/findstudentbyid`, {
          id: location.state.id,
        });

        // Populate the form with fetched data
        setValue("studentname", result.data.studentname);
        setValue("email", result.data.userid?.email);
        setValue("address", result.data.address);
        setValue("contactno", result.data.contactno);
        setValue("dob", result.data.dob);
        setValue("class", result.data.class);
        setExistingFile(result.data.image);
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [ setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      let filename = existingFile;

      // Check if a new file is provided
      if (data.file && data.file instanceof FileList && data.file.length > 0) {
        const fileEvent = { target: { files: data.file } };
        filename = await handleFileUpload(fileEvent);
        setExistingFile(filename);
      }

      const editStudent = {
        studentname: data.studentname,
        email: data.email,
        address: data.address,
        contactno: data.contactno,
        dob: data.dob,
        class: data.class,
        image: filename,
        id: location.state.id,
      };
      console.log(editStudent, "response");

      const response = await axios.post(
        `${baseUrl}student/updatestudent`,
        editStudent
      );

      if (response.status === 200) {
        SuccessToast(
          "Student updated successfully",
          "/admiro/student/viewstudent"
        );
        setTimeout(() => {
          navigate("/admiro/student/viewstudent");
        }, 1000);
      } else {
        ErrorToast("Failed to update student");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorResponse = axiosError.response?.data as ErrorResponse;
      const errorMessage =
        errorResponse?.message || "An unexpected error occurred";
      console.error("Error:", errorMessage);
      ErrorToast(errorMessage);
    }
  };

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
        pageTitle={EditStudenttitle}
        parent={StudentTitle}
        title={EditStudenttitle}
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
                        value: /^[A-Za-z\s.'-]{2,50}$/, // Updated to exclude numbers
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
                  <Label htmlFor="ContactNumber">{ContactNumber}</Label>
                  <Controller
                    name="contactno"
                    control={control}
                    rules={{
                      required: "Please enter a valid number.",
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
                          // Remove all non-numeric characters and check length
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
                          id="ContactNumber"
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
                  <Label htmlFor="Address">{Address}</Label>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="Address"
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

                <Col xs={12}>
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
                    name="file"
                    control={control}
                    render={({ field: { onChange, onBlur, ref } }) => (
                      <>
                        <Input
                          id="formFile"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(e.target.files);
                              // Update the image preview immediately
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setExistingFile(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          onBlur={onBlur}
                          innerRef={ref}
                        />
                        {errors.file && (
                          <FormFeedback>{errors.file.message}</FormFeedback>
                        )}
                        {existingFile && (
                          <img
                            src={
                              existingFile.startsWith("data:")
                                ? existingFile
                                : `${mediaUrl}${existingFile}`
                            }
                            alt="Preview"
                            width="100"
                            height="100"
                          />
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
      <ToastContainer />
    </>
  );
}
