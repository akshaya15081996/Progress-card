import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Row,
  FormGroup,
  Col,
  Form,
  Input,
  Label,
  CardBody,
  FormFeedback,
  Button,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import {
  EditQuestionsTitle,
  QuestionsTitle,
  EditQuestionstitle,
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
import { baseUrl, handleFileUpload, mediaUrl } from "../../../Utils/FileUpload";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  _id: string;
  subcategory: string;
  parentcategory: {
    _id: string;
  };
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

export default function EditQuestions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    Subcategory[]
  >([]);
  const [existingFiles, setExistingFiles] = useState<{
    image: string | null;
    video: string | null;
    gif: string | null;
  }>({
    image: null,
    video: null,
    gif: null,
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const gifInputRef = useRef<HTMLInputElement>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      Category: "",
      Subcategory: "",
      Title: "",
    },
  });
  
  //For displaying File type validation error message
  const [image, video, gif, link, text, selectedCategory] = watch([
    "Image",
    "Video",
    "gif",
    "link",
    "text",
    "Category",
  ]);
  useEffect(() => {
    const selectedFields = [image, video, gif, link, text];
    const nonEmptyFields = selectedFields.filter(
      (field) => field !== undefined && field !== ""
    );
    if (nonEmptyFields.length > 1) {
      setValidationError(
        "Please select only one of Image, Video, GIF, Text, or Link."
      );
    } else if (nonEmptyFields.length < 1) {
      setValidationError(
        "Please select one option: Image, Video, GIF, Text, or Link."
      );
    } else {
      setValidationError(null);
    }
  }, [image, video, gif, link, text]);

  //Fetching questions details based on edit id
  useEffect(() => {
    const fetchQuestionsDetails = async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          `${baseUrl}questions/findquestionbyid`,
          {
            id: location.state.id,
          }
        );
        const data = result.data;
        reset({
          Title: data.title,
          Category: data.categoryid,
          Subcategory: data.subcategoryid,
        });
        setFilteredSubcategories(
          subcategories.filter(
            (sub) => sub.parentcategory._id === data.categoryid
          )
        );
        // Determine file type and set the its field
        const file = data.file;
        const isValidUrl = (file: string) => {
          return /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d-]*)*\/?$/.test(file);
        };
       if (
          /\.(png|jpg|jpeg|bmp|tiff|tif|webp|heif|heic|svg|ico|cr2|nef|arw|orf|jfif|raw|dcm|cur|avif)$/i.test(
            file
          )
        ) {
          setExistingFiles((prev) => ({ ...prev, image: file }));
          setValue("Image", file);
        } else if (/\.gif$/i.test(file)) {
          setExistingFiles((prev) => ({ ...prev, gif: file }));
          setValue("gif", file);
        } else if (
          /\.(mp4|avi|mov|mkv|wmv|flv|webm|mpeg|mpg|3gp|rm|m4v|ts|asf|vob|ogv|mpv|mkv|divx|xvid|f4v|svi|mts|m2ts|mod|tod|m2v|dav|iso|ogg)$/i.test(
            file
          )
        ) {
          setExistingFiles((prev) => ({ ...prev, video: file }));
          setValue("Video", file);
        } else if (isValidUrl(file)) {
          setValue("link", file);
        }else {
          setValue("text", file);
        }
      } catch (error) {
        console.error("Error fetching questions details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestionsDetails();
  }, [ reset, subcategories, setValue]);

  //For fetching category details
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}category/findall`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}subcategory/findwithcategory`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  //For fetching subcategory details
  useEffect(() => {
    if (selectedCategory) {
      setValue("Subcategory", "");
      const filtered = subcategories.filter(
        (sub) => sub.parentcategory._id === selectedCategory
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, subcategories]);

  //Reset the input file
  const handleFileReset = (type: "image" | "video" | "gif") => {
    if (type === "image" && imageInputRef.current) {
      imageInputRef.current.value = "";
      setValue("Image", undefined);
      clearErrors("Image");
    }
    if (type === "video" && videoInputRef.current) {
      videoInputRef.current.value = "";
      clearErrors("Video");
      setValue("Video", undefined);
    }
    if (type === "gif" && gifInputRef.current) {
      gifInputRef.current.value = "";
      clearErrors("gif");
      setValue("gif", undefined);
    }
    setExistingFiles((prev) => ({ ...prev, [type]: null }));
  };

  //Handling form submit function
  const handleFormSubmit = async (data: FormValues) => {
    let imagefilename: string | null = existingFiles.image;
    if (data.Image && data.Image instanceof FileList && data.Image.length > 0) {
      const fileEvent = { target: { files: data.Image } };
      const uploadedImage = await handleFileUpload(fileEvent);
      imagefilename = uploadedImage;
      setExistingFiles((prev) => ({ ...prev, image: imagefilename }));
    }

    let giffilename: string | null = existingFiles.gif;
    if (data.gif && data.gif instanceof FileList && data.gif.length > 0) {
      const fileEvent = { target: { files: data.gif } };
      const uploadedGif = await handleFileUpload(fileEvent);
      giffilename = uploadedGif;
      setExistingFiles((prev) => ({ ...prev, gif: giffilename }));
    }

    let videofilename: string | null = existingFiles.video;
    if (data.Video && data.Video instanceof FileList && data.Video.length > 0) {
      const fileEvent = { target: { files: data.Video } };
      const uploadedVideo = await handleFileUpload(fileEvent);
      videofilename = uploadedVideo;
      setExistingFiles((prev) => ({ ...prev, video: videofilename }));
    }
    const selectedFields = [
      imagefilename,
      videofilename,
      giffilename,
      data.link,
      data.text,
    ].filter(Boolean);
    console.log(selectedFields);

    if (selectedFields.length > 1) {
      setValidationError(
        "Please select only one of Image, Video, GIF, Text, or Link."
      );
      return;
    } else if (selectedFields.length < 1) {
      setValidationError(
        "Please select one option: Image, Video, GIF, Text, or Link."
      );
      return;
    } else {
      setValidationError(null);
    }


    try {
      const editQuestions = {
        categoryid: data.Category,
        subcategoryid: data.Subcategory,
        title: data.Title,
        file:
          imagefilename ||
          videofilename ||
          giffilename ||
          data.text ||
          data.link,
        id: location.state.id,
      };

      const response = await axios.post(
        `${baseUrl}questions/updatequestion`,
        editQuestions
      );

      if (response.status === 200) {
        toast.success("Question edited successfully", {
          onClose: () => navigate("/admiro/questions/viewquestions"),
          autoClose: 1000,
        });
      } else {
        toast.error("Failed to edit question");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  //for displaying image/video/gif
  const renderFilePreview = (type: "image" | "video" | "gif") => {
    const file = existingFiles[type];
    if (!file) return null;

    // Check if the file is a initial files or newly updated files
    const mimeTypeMatch = file.match(/^data:(image|video|gif)\/[^;]+/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[0] : "";

    // For initial files
    const isImageExt =
      /\.(png|jpg|jpeg|bmp|tiff|tif|webp|heif|heic|svg|ico|cr2|nef|arw|orf|jfif|raw|dcm|cur|avif)$/i.test(
        file
      );
    const isGifExt = /\.gif$/i.test(file);
    const isVideoExt =
      /\.(mp4|avi|mov|mkv|wmv|flv|webm|mpeg|mpg|3gp|rm|m4v|ts|asf|vob|ogv|mpv|mkv|divx|xvid|f4v|svi|mts|m2ts|mod|tod|m2v|dav|iso|ogg)$/i.test(
        file
      );

    // For newly updated files
    const isImageMime =
      mimeType.startsWith("data:image") &&
      !mimeType.startsWith("data:image/gif");
    const isGifMime = mimeType.startsWith("data:image/gif");
    const isVideoMime = mimeType.startsWith("data:video");

    // Combine checks for both initial and updated files
    const isImage = type === "image" && (isImageExt || isImageMime);
    const isGif = type === "gif" && (isGifExt || isGifMime);
    const isVideo = type === "video" && (isVideoExt || isVideoMime);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {isImage && (
          <img
            src={file.startsWith("data:") ? file : `${mediaUrl}${file}`}
            alt="Preview"
            width="100"
            height="100"
            style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "10px" }}
          />
        )}
        {isGif && (
          <img
            src={file.startsWith("data:") ? file : `${mediaUrl}${file}`}
            alt="Preview"
            width="100"
            height="100"
            style={{ maxWidth: "100%", maxHeight: "100%", marginTop: "10px" }}
          />
        )}
        {isVideo && (
          <div style={{ width: "160px", height: "100px", overflow: "hidden" }}>
            <video
              src={file.startsWith("data:") ? file : `${mediaUrl}${file}`}
              controls
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                marginTop: "10px",
              }}
              onError={(e) => {
                console.error("Video failed to load", e);
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <Button
          type="button"
          color="secondary"
          onClick={() => handleFileReset(type)}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </Button>
      </div>
    );
  };

  // Show a loading spinner while data is being fetched
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
        pageTitle={EditQuestionstitle}
        parent={QuestionsTitle}
        title={EditQuestionsTitle}
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
                {errors.Title && (
                  <FormFeedback>{errors.Title.message}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          {/* Category Select Box */}
          <Row>
            <Col>
              <FormGroup>
                <Label for="Category">Category</Label>
                <Controller
                  name="Category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => {
                    return (
                      <Input
                        type="select"
                        {...field}
                        invalid={!!errors.Category}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          field.onChange(e);
                          if (!selectedValue) {
                            setValue("Subcategory", "");
                          }
                        }}
                        style={{ borderRadius: "5px" }}
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </Input>
                    );
                  }}
                />
                {errors.Category && (
                  <FormFeedback>{errors.Category.message}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          {/* Subcategory Select Box */}
          <Row>
            <Col>
              <FormGroup>
                <Label for="Subcategory">Subcategory</Label>

                <Controller
                  name="Subcategory"
                  control={control}
                  rules={{
                    required: "Subcategory is required",
                  }}
                  render={({ field }) => {
                    return (
                      <Input
                        type="select"
                        {...field}
                        invalid={!!errors.Subcategory}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        style={{ borderRadius: "5px" }}
                      >
                        <option value="">Select a subcategory</option>
                        {filteredSubcategories.map((subcategory) => (
                          <option key={subcategory._id} value={subcategory._id}>
                            {subcategory.subcategory}
                          </option>
                        ))}
                      </Input>
                    );
                  }}
                />
                {errors.Subcategory && (
                  <FormFeedback>{errors.Subcategory.message}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Col>
            <FormGroup>
              <Label for="Subcategory">File Type</Label>
              <Row
                style={{
                  border: "1px solid #D3D3D3",
                  padding: "15px",
                  borderRadius: "5px",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <Col xs={6}>
                  <FormGroup>
                    <Label htmlFor="Video">{Video}</Label>
                    <Controller
                      name="Video"
                      control={control}
                      rules={{
                        validate: (value) => {
                          if (!value?.[0]) {
                            return true;
                          }
                          if (typeof value === "string") {
                            return true;
                          }
                          return [
                            "video/mp4",
                            "video/avi",
                            "video/quicktime",
                            "video/x-matroska",
                            "video/x-ms-wmv",
                            "video/x-flv",
                            "video/webm",
                            "video/mpeg",
                            "video/mpeg",
                            "video/3gpp",
                            "video/vnd.rn-realvideo",
                            "video/mp4",
                            "video/x-m4v",
                            "video/ts",
                            "video/x-ms-asf",
                            "video/x-ms-vob",
                            "video/ogg",
                            "video/mpv",
                            "video/x-divx",
                            "video/x-xvid",
                            "video/x-f4v",
                            "video/x-svi",
                            "video/x-mts",
                            "video/x-m2ts",
                            "video/x-mod",
                            "video/x-tod",
                            "video/x-m2v",
                            "video/x-dav",
                            "video/x-iso",
                          ].includes(value[0].type)
                            ? true
                            : "Invalid video format";
                        },
                      }}
                      render={({ field: { onChange, onBlur, ref } }) => (
                        <Input
                          id="video"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(e.target.files);
                              const reader = new FileReader();
                              reader.onloadend = () =>
                                setExistingFiles((prev) => ({
                                  ...prev,
                                  video: reader.result as string,
                                }));
                              reader.readAsDataURL(file);
                            }
                          }}
                          onBlur={onBlur}
                          invalid={!!errors.Video}
                          innerRef={videoInputRef}
                        />
                      )}
                    />
                    {errors.Video && (
                      <FormFeedback>{errors.Video.message}</FormFeedback>
                    )}
                    {renderFilePreview("video")}
                  </FormGroup>
                </Col>

                <Col xs={6}>
                  <FormGroup>
                    <Label for="image">{Image}</Label>
                    <Controller
                      name="Image"
                      control={control}
                      rules={{
                        validate: (value) => {
                          if (!value?.[0]) {
                            return true;
                          }
                          if (typeof value === "string") {
                            return true;
                          }
                          return [
                            "image/png",
                            "image/jpeg",
                            "image/bmp",
                            "image/tiff",
                            "image/webp",
                            "image/heif",
                            "image/heic",
                            "image/svg+xml",
                            "image/x-icon",
                            "image/cr2",
                            "image/x-canon-cr2",
                            "image/x-nikon-nef",
                            "image/x-sony-arw",
                            "image/x-olympus-orf",
                            "image/jfif",
                            "image/x-raw",
                            "image/dicom",
                            "image/cur",
                            "image/avif",
                          ].includes(value[0].type)
                            ? true
                            : "Invalid image format";
                        },
                      }}
                      render={({ field: { onChange, onBlur, ref } }) => (
                        <Input
                          id="image"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(e.target.files);
                              const reader = new FileReader();
                              reader.onloadend = () =>
                                setExistingFiles((prev) => ({
                                  ...prev,
                                  image: reader.result as string,
                                }));
                              reader.readAsDataURL(file);
                            }
                          }}
                          onBlur={onBlur}
                          invalid={!!errors.Image}
                          innerRef={imageInputRef}
                        />
                      )}
                    />
                    {errors.Image && (
                      <FormFeedback>{errors.Image.message}</FormFeedback>
                    )}
                    {renderFilePreview("image")}
                  </FormGroup>
                </Col>

                <Col xs={6}>
                  <FormGroup>
                    <Label for="gif">{gifLabel}</Label>
                    <Controller
                      name="gif"
                      control={control}
                      rules={{
                        validate: (value) => {
                          if (!value?.[0]) {
                            return true;
                          }
                          if (typeof value === "string") {
                            return true;
                          }
                          return ["image/gif"].includes(value[0].type)
                            ? true
                            : "Invalid GIF format";
                        },
                      }}
                      render={({ field: { onChange, onBlur, ref } }) => (
                        <Input
                          id="gif"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(e.target.files);
                              const reader = new FileReader();
                              reader.onloadend = () =>
                                setExistingFiles((prev) => ({
                                  ...prev,
                                  gif: reader.result as string,
                                }));
                              reader.readAsDataURL(file);
                            }
                          }}
                          onBlur={onBlur}
                          invalid={!!errors.gif}
                          innerRef={gifInputRef}
                        />
                      )}
                    />
                    {errors.gif && (
                      <FormFeedback>{errors.gif.message}</FormFeedback>
                    )}
                    {renderFilePreview("gif")}
                  </FormGroup>
                </Col>

                <Col xs={6}>
                  <FormGroup>
                    <Label htmlFor="link">{linkLabel}</Label>
                    <Controller
                      name="link"
                      control={control}
                      rules={{
                        validate: (value) => {
                          // Check if the URL is empty or a valid URL
                          if (
                            value &&
                            !/^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d-]*)*\/?$/.test(
                              value
                            )
                          ) {
                            return "Please enter a valid URL";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          id="link"
                          type="text"
                          {...field}
                          invalid={!!errors.link}
                        />
                      )}
                    />
                    {errors.link && (
                      <FormFeedback>{errors.link.message}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>

                <Col xs={6}>
                  <FormGroup>
                    <Label htmlFor="text">{textLabel}</Label>
                    <Controller
                      name="text"
                      control={control}
                      rules={{
                        validate: (value) => {
                          if (value && value.trim() === "") {
                            return "Text cannot be empty";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          id="text"
                          type="text"
                          {...field}
                          invalid={!!errors.text}
                        />
                      )}
                    />
                    {errors.text && (
                      <FormFeedback>{errors.text.message}</FormFeedback>
                    )}
                  </FormGroup>
                </Col>

                {validationError && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {validationError}
                  </div>
                )}
              </Row>
            </FormGroup>
          </Col>

          <Row>
            <Col className="text-center">
              <Btn type="submit" color="primary">
                {Submit}
              </Btn>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <ToastContainer />
    </>
  );
}
