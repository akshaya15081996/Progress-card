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
  ChooseFile,
  Submit,
  EditSubCategorytitle,
  SubCategoryTitle,
  EditSubCategoryTitle,
  SubCategoryName,
  ParentCategory,
} from "../../../Utils/Constants";

import { useNavigate, useLocation } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";
import { ToastContainer } from "react-toastify";

interface Category {
  _id: string;
  name: string;
}

interface FormValues {
  subcategoryName: string;
  parentCategory: string;
  file: FileList | string;
}

export default function EditSubCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const [category, setCategory] = useState<Category[]>([]);
  const [existingFile, setExistingFile] = useState<string>("");
  const location = useLocation();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      subcategoryName: "",
      parentCategory: "",
      file: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}category/findall`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      setLoading(true);
      try {
        const result = await axios.post(`${baseUrl}subcategory/findbyid`, {
          id: location.state.id,
        });

        // Populate the form with fetched data
        setValue("subcategoryName", result.data.subcategory);
        setValue("parentCategory", result.data.parentcategory);
        setExistingFile(result.data.file);

      } catch (error) {
        console.error("Error fetching subcategory details:", error);
      }finally {
        setLoading(false); 
      }
    };
    fetchSubcategoryDetails();
  }, [setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      let filename = existingFile;

      // Check if a new file is provided
      if (data.file && data.file instanceof FileList && data.file.length > 0) {
        const fileEvent = { target: { files: data.file } };
        filename = await handleFileUpload(fileEvent);
        setExistingFile(filename);
      }

      const editSubcategory = {
        subcategory: data.subcategoryName,
        parentcategory: data.parentCategory,
        file: filename,
        id: location.state.id,
      };

      const response = await axios.post(`${baseUrl}subcategory/updatesubcat`, editSubcategory);

      if (response.status === 200) {
        SuccessToast("Subcategory edited successfully");
        setTimeout(() => {
          navigate("/admiro/subcategory/subcategoryview");
        }, 1000);
      } else {
        ErrorToast("Failed to edit subcategory");
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
        pageTitle={EditSubCategorytitle}
        parent={SubCategoryTitle}
        title={EditSubCategoryTitle}
      />
      <Col xl={12} className="mb-lg-3">
        <Card>
          <CardBody className="custom-input form-validation">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="g-3">
                <Col xs={12}>
                  <Label htmlFor="subcategory-name">{SubCategoryName}</Label>
                  <Controller
                    name="subcategoryName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Subcategory name is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          id="subcategory-name"
                          type="text"
                          placeholder="Subcategory name"
                          {...field}
                          invalid={!!errors.subcategoryName}
                          style={{ color: 'black' ,borderColor: errors.subcategoryName ? "red" : "",}}
                        />
                        {errors.subcategoryName && (
                          <FormFeedback>
                            {errors.subcategoryName.message}
                          </FormFeedback>
                        )}
                      </>
                    )}
                  />
                </Col>
                <Col xs={12}>
                  <Label htmlFor="parentcategory">{ParentCategory}</Label>
                  <Controller
                    name="parentCategory"
                    control={control}
                    rules={{ required: "Parent category is required" }}
                    render={({ field }) => (
                      <>
                        <Input
                          type="select"
                          id="parentcategory"
                          {...field}
                          invalid={!!errors.parentCategory}
                        >
                          <option value="" disabled>
                            Choose...
                          </option>
                          {category.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </Input>
                        {errors.parentCategory && (
                          <FormFeedback>
                            {errors.parentCategory.message}
                          </FormFeedback>
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
                            src={existingFile.startsWith("data:")
                              ? existingFile
                              : `${mediaUrl}${existingFile}`}
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
      <ToastContainer/>
    </>
  );
}




























