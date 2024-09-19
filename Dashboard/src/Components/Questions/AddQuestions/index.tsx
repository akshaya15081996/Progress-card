import React, { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";


import {
  Container,
  Row,
  FormGroup,
  Col,
  Form,
  Input,
  Label,
  CardBody,
  FormFeedback,
} from "reactstrap";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import {
  AddQuestionsTitle,
  QuestionsTitle,
  Submit,
  Title,
  Category,
  Video,
  Image,
  gif as gifLabel,
  textLabel,
  linkLabel,
} from "../../../Utils/Constants";
import { Btn } from "../../../AbstractElements";

import axios from "axios";
import { baseUrl, handleFileUpload } from "../../../Utils/FileUpload";
import { useNavigate } from "react-router-dom";
import useCustomToasts from "../../../hooks/useCustomToast";
import "./AddQuestions.css";
import { toast } from "react-toastify";

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  _id: string;
  subcategory: string;
  parentcategory: string;
}

interface FormValues {
  Category: string;
  Subcategory: string;
  Title: string;
  Video?: FileList;
  Image?: FileList;
  gif?: FileList;
  link?: string;
  text?: string;
}



// Allowed Image MIME Types
const allowedImageTypes = [
  "image/png", "image/jpeg", "image/jpg", "image/bmp", "image/tiff",
"image/webp",
  "image/heif", "image/heic", "image/svg+xml", "image/vnd.microsoft.icon",
  "image/x-canon-cr2", "image/x-nikon-nef", "image/x-sony-arw",
"image/x-olympus-orf",
  "image/x-fuji-raf", "image/jfif", "image/x-adobe-dng", "image/x-dcraw",
  "image/x-dcm", "image/x-win-bitmap", "image/avif"
];


// Allowed Image Extensions
const allowedImageExtensions = [
  "png", "jpg", "jpeg", "bmp", "tiff", "tif", "webp", "heif", "heic",
  "svg", "ico", "cr2", "nef", "arw", "orf", "jfif", "raw", "dcm",
  "cur", "avif"
];

// Allowed Video MIME Types
const allowedVideoTypes = [
  "video/mp4", "video/x-msvideo", "video/quicktime", "video/x-matroska",
  "video/x-ms-wmv", "video/x-flv", "video/webm", "video/mpeg",
  "video/3gpp", "video/x-pn-realmedia", "video/x-m4v", "video/mp2t",
  "video/x-ms-asf", "video/vob", "video/ogg", "video/mpv",
  "video/x-matroska", "video/divx", "video/xvid", "video/x-f4v",
  "video/x-sgi-movie", "video/mts", "video/m2ts", "video/x-mod",
  "video/tod", "video/m2v", "video/dav", "application/x-iso9660-image"
];

// Allowed Video Extensions
const allowedVideoExtensions = [
  "mp4", "avi", "mov", "mkv", "wmv", "flv", "webm", "mpeg", "mpg",
  "3gp", "rm", "m4v", "ts", "asf", "vob", "ogv", "mpv", "divx",
  "xvid", "f4v", "svi", "mts", "m2ts", "mod", "tod", "m2v", "dav",
  "iso", "ogg"
];
const allowedGifExtensions = ["gif"];


const allowedGifTypes = ["image/gif"];

const AddQuestions = () => {
  const navigate = useNavigate();
  const { SuccessToast, ErrorToast } = useCustomToasts(navigate);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);


  const [filteredSubcategories, setFilteredSubcategories] = useState<
    Subcategory[]
  >([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<FormValues>({
    mode: "onBlur",

  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const video = useWatch({ name: "Video", control });
  const image = useWatch({ name: "Image", control });
  const gif = useWatch({ name: "gif", control });
  const link = useWatch({ name: "link", control });
  const text = useWatch({ name: "text", control });

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const [categoriesRes, subcategoriesRes] = await Promise.all([
          axios.get(`${baseUrl}category/findAll`),
          axios.get(`${baseUrl}subcategory/findsubcat`),
        ]);

        setCategories(categoriesRes.data);
        setSubcategories(subcategoriesRes.data);
      } catch (error) {
        console.error("Error fetching categories and subcategories:", error);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  const handleCategoryChange = (id: string) => {

    const filtered = subcategories.filter(
      (subcat) => subcat.parentcategory === id
    );

    setFilteredSubcategories(filtered);
    setValue("Subcategory", "");
  };

  const validateFileType = (
    file: File,
    allowedTypes: string[],
    allowedExtensions: string[]
  ) => {
    const isValidType = allowedTypes.includes(file.type);
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidExtension = allowedExtensions.includes(fileExtension || "");


    return isValidType && isValidExtension;
  };


  // Update the handleFileChange function to use allowedExtensions
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormValues,
    allowedTypes: string[],
    allowedExtensions: string[]
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const fileExtension = file.name.split(".").pop()?.toLowerCase();


      // Validate by type and extension
      if (validateFileType(file, allowedTypes, allowedExtensions)) {
        setValue(fieldName, files);
        clearErrors(fieldName);
      } else {
        setError(fieldName, {
          message: `Invalid file type. Only ${allowedExtensions.join(
            ", "
          )} are allowed.`,
        });
      }
    } else {
      setValue(fieldName, undefined);
    }
  };

  const validateAtLeastOneMediaField = (data: FormValues) => {
    const isVideoEmpty = !data.Video || data.Video.length === 0;
    const isImageEmpty = !data.Image || data.Image.length === 0;
    const isGifEmpty = !data.gif || data.gif.length === 0;
    const isTextEmpty = !data.text || data.text.trim() === "";
    const isLinkEmpty = !data.link || data.link.trim() === "";


    return !(
      isVideoEmpty &&
      isImageEmpty &&
      isGifEmpty &&
      isTextEmpty &&
      isLinkEmpty
    );

  };

  const handleFormSubmit = async (data: FormValues) => {
    // Check if at least one field is filled
    const hasAtLeastOneField = [
      data.Video && data.Video.length > 0,
      data.Image && data.Image.length > 0,
      data.gif && data.gif.length > 0,
      data.text && data.text.trim() !== "",
      data.link && data.link.trim() !== "",
    ].some(Boolean);

    if (!hasAtLeastOneField) {
      setErrorMessage(
        "At least one of the following fields is required: video, image, gif, text, or link."
      );
      return;
    } else {
      setErrorMessage(null);
      clearErrors();
    }

    // Check if more than one field is selected
    const selectedFields = [
      data.Video && data.Video.length > 0,
      data.Image && data.Image.length > 0,
      data.gif && data.gif.length > 0,
      data.text && data.text.trim() !== "",
      data.link && data.link.trim() !== "",
    ].filter(Boolean).length;

    if (selectedFields > 1) {
      setErrorMessage(
        "Only one field can be selected at a time: video, image, gif, text, or link."
      );
      return;
    }

    try {
      setErrorMessage(null);

      let videoUrl = "";
      let imageUrl = "";
      let gifUrl = "";

      if (data.Video && data.Video.length > 0) {
        videoUrl = await handleFileUpload({ target: { files: data.Video } });
      }

      if (data.Image && data.Image.length > 0) {
        imageUrl = await handleFileUpload({ target: { files: data.Image } });
      }

      if (data.gif && data.gif.length > 0) {
        gifUrl = await handleFileUpload({ target: { files: data.gif } });
      }

      const addQuestions = {
        categoryid: data.Category,
        subcategoryid: data.Subcategory,
        title: data.Title,
        file: videoUrl || imageUrl || gifUrl || data.link || data.text,
      };


      console.log(addQuestions, "aq");

      const response = await axios.post(
        `${baseUrl}questions/savequestion`,
        addQuestions
      );
      console.log(response, "rsp");


      if (response.status === 200) {
        toast.success("Questions edited successfully", {
          onClose: () => navigate("/admiro/questions/viewquestions"),
          autoClose: 1000,
      });
      } else {
        ErrorToast("Error adding question");
      }
    } catch (error) {
      console.error("Form submission error", error);
      ErrorToast("Failed to add question");
    }
  };

  // Disable other fields when one of the following fields is selected
  const shouldDisableFields = video || image || gif;

  const isFieldDisabled = (fieldName: keyof FormValues) => {
    return shouldDisableFields && !watch(fieldName);
  };
  // Clear error if conditions collapse
  useEffect(() => {

    const selectedFields = [
      video,
      image,
      gif,
      text?.trim(),

      link?.trim(),
    ].filter(Boolean).length;

    if (selectedFields <= 1) {
      setErrorMessage(null);
    }
  }, [video, image, gif, text, link]);

  return (
    <>
      <Breadcrumbs
        pageTitle={AddQuestionsTitle}
        parent={QuestionsTitle}
        title={AddQuestionsTitle}
      />
      <CardBody className="basic-form">
        <Form
          className="theme-form flat-form"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="title">{Title}</Label>
                <Controller
                  name="Title"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter the title"
                      {...field}
                      invalid={!!errors.Title}
                      style={{
                        borderColor: errors.Title ? "red" : "",
                      }}
                    />
                  )}
                />
                <FormFeedback>{errors.Title?.message}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="category">{Category}</Label>
                <Controller
                  name="Category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      type="select"
                      id="category"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleCategoryChange(e.target.value);
                      }}
                      invalid={!!errors.Category}
                    >
                      <option value="" disabled>
                        Choose...
                      </option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                <FormFeedback>{errors.Category?.message}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label htmlFor="Subcategory">Subcategory</Label>
                <Controller
                  name="Subcategory"
                  control={control}
                  rules={{ required: "Subcategory is required" }}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      type="select"
                      id="subcategory"
                      {...field}
                      invalid={!!errors.Subcategory}
                    >
                      <option value="" disabled>
                        Choose a subcategory...
                      </option>
                      {filteredSubcategories.map((subcat) => (
                        <option key={subcat._id} value={subcat._id}>
                          {subcat.subcategory}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                <FormFeedback>{errors.Subcategory?.message}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <FormGroup>
                <Label htmlFor="video">{Video}</Label>
                <Input


                  id="video"
                  type="file"
                  name="Video"
                  accept={allowedVideoTypes.join(", ")}
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "Video",
                      allowedVideoTypes,
                      allowedVideoExtensions
                    )
                  }
                  disabled={isFieldDisabled("Video")}
                  invalid={!!errors.Video}
                />
                <FormFeedback>{errors.Video?.message}</FormFeedback>

              </FormGroup>
            </Col>

            <Col xs={6}>
              <FormGroup>
                <Label htmlFor="image">{Image}</Label>
                <Input

                  id="image"
                  type="file"
                  name="Image"
                  accept={allowedImageTypes.join(", ")}
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "Image",
                      allowedImageTypes,
                      allowedImageExtensions
                    )
                  }
                  disabled={isFieldDisabled("Image")}
                  invalid={!!errors.Image}
                />
                <FormFeedback>{errors.Image?.message}</FormFeedback>

              </FormGroup>
            </Col>

            <Col xs={6}>
              <FormGroup>
                <Label htmlFor="gif">{gifLabel}</Label>
                <Input

                  id="gif"
                  type="file"
                  name="gif"
                  accept={allowedGifTypes.join(", ")}
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      "gif",
                      allowedGifTypes,
                      allowedGifExtensions
                    )
                  }
                  disabled={isFieldDisabled("gif")}
                  invalid={!!errors.gif}
                />
                <FormFeedback>{errors.gif?.message}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <FormGroup>
                <Label htmlFor="text">{textLabel}</Label>
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="text"
                      type="textarea"
                      placeholder="Enter your text"
                      {...field}
                      disabled={isFieldDisabled("text")}
                    />
                  )}
                />
              </FormGroup>
            </Col>

            <Col xs={6}>
              <FormGroup>
                <Label htmlFor="link">{linkLabel}</Label>
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="link"
                      type="url"
                      placeholder="Enter a link"
                      {...field}
                      disabled={isFieldDisabled("link")}
                    />
                  )}
                />
              </FormGroup>
            </Col>
          </Row>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Row>
            <Col>
              <Btn
                attrBtn={{
                  color: "primary",
                  type: "submit",
                  className: "me-2",
                }}
              >
                {Submit}
              </Btn>

            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
};

export default AddQuestions;
