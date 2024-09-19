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
import { baseUrl, handleFileUpload } from "../../../Utils/FileUpload";
import {
  ChooseFile,
  Submit,
  AddSubCategorytitle,
  SubCategoryTitle,
  AddSubCategoryTitle,
  SubCategoryName,
  ParentCategory,
} from "../../../Utils/Constants";
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";

interface Category {
  _id: string;
  name: string;
}

interface FormValues {
  subcategoryName: string;
  parentCategory: string;
  file: FileList;
}

export default function AddSubCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const [category, setCategory] = useState<Category[]>([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}category/findall`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const fileData = await handleFileUpload({ target: { files: data.file } });

      const addSubcategory = {
        subcategory: data.subcategoryName,
        parentcategory: data.parentCategory,
        file: fileData,
      };

      const response = await axios.post(
        `${baseUrl}subcategory/savesubcat`,
        addSubcategory
      );
      console.log(response.data, "response");
      if (response.status === 200) {
        SuccessToast("Subcategory added successfully","/admiro/subcategory/subcategoryview");
        setTimeout(() => {
          navigate("/admiro/subcategory/subcategoryview");
        }, 1000); 
        // toast.success("Subcategory added successfully", {
        //   onClose: () => navigate("/admiro/subcategory/subcategoryview"),  
        //   autoClose: 1000  
        // });
        
      } else {
        ErrorToast("Failed to add subcategory");
        // toast.error("Failed to add subcategory");
      }
    } catch (err) {
      console.error("Error:", err);
      ErrorToast("An unexpected error occurred");
      // toast.error("An unexpected error occurred");

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
        pageTitle={AddSubCategorytitle}
        parent={SubCategoryTitle}
        title={AddSubCategoryTitle}
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
                    defaultValue=""
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
                          </option>{" "}
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
                    rules={{ required: "File is required" }}
                    render={({ field: { onChange, onBlur, ref } }) => (
                      <>
                        <Input
                          id="formFile"
                          type="file"
                          onChange={(e) => onChange(e.target.files)} // handle file change
                          onBlur={onBlur}
                          innerRef={ref}
                          invalid={!!errors.file}
                          style={{borderColor: errors.file ? "red" : "",}}
                        />
                        {errors.file && (
                          <FormFeedback>{errors.file.message}</FormFeedback>
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
