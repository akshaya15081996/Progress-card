import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Button, Spinner } from "reactstrap";
import DataTable from "react-data-table-component";
import {
  ViewQuestionsTitle,
  QuestionsTitle,
  ViewQuestionstitle,
  Add,
} from "../../../Utils/Constants";
import Breadcrumbs from "../../../CommonElements/Breadcrumbs";
import axios from "axios";
import { baseUrl, mediaUrl } from "../../../Utils/FileUpload";
import { Questions } from "../../../Types/Tables.type";
import FilterComponent from "../../../Components/Tables/DataTables/Common/FilterComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Btn } from "../../../AbstractElements";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewQuestions() {
  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState<Questions[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}questions/findWithCategoryAndSubcategory`
        );
        const data: Questions[] = response.data;
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleAdd = () => {
    navigate("/admiro/questions/addquestions");
  };

  const filteredData = filteredItems.filter((item) => {
    return (
      (item.title &&
        item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.categoryid.name &&
        item.categoryid.name
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.subcategoryid.subcategory &&
        item.subcategoryid.subcategory
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.file && item.file.toLowerCase().includes(filterText.toLowerCase()))
    );
  });

  const handleEdit = (id: string) => {
    navigate("/admiro/questions/editquestions", { state: { id: id } });
  };

  const handleDelete = (id: string) => {
    const confirmToast = () =>
      toast.warn(
        <div>
          <div>Are you sure you want to delete this questions?</div>
          <div className="d-flex justify-content-end mt-2">
            <Button color="danger" onClick={() => confirmDelete(id)}>
              Yes
            </Button>
            <Button
              color="secondary"
              onClick={() => toast.dismiss()}
              className="ms-2"
            >
              Cancel
            </Button>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          draggable: false,
        }
      );

    const confirmDelete = async (id: string) => {
      toast.dismiss();
      try {
        await axios.post(
          `${baseUrl}questions/deletequestion`,
          { id },
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success(`Questions Deleted Successfully`, {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
        });
        setRefresh((prev) => prev + 1);
      } catch (error) {
        console.error("Error deleting questions:", error);
        toast.error("An error occurred while deleting the questions", {
          position: "top-right",
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    };

    confirmToast();
  };

  // Define columns with actions
  const questionsTableColumns = [
    {
      name: "Question",
      selector: (row: Questions) => row.title,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: Questions) => row.categoryid.name,
      sortable: true,
    },
    {
      name: "Subcategory",
      selector: (row: Questions) => row.subcategoryid.subcategory,
      sortable: true,
    },
    {
      name: "Questions File",
      cell: (row: Questions) => {
        const file = row.file;

        // Determine the file type and render accordingly
        if (
          file.startsWith("http://") ||
          file.startsWith("https://") ||
          file.startsWith("www")
        ) {
          // Handle URL link
          return (
            <Link to={file} target="_blank" rel="noopener noreferrer">
              Click Link
            </Link>
          );
        } else if (
          /\.(png|jpg|jpeg|bmp|tiff|tif|webp|heif|heic|svg|ico|cr2|nef|arw|orf|jfif|raw|dcm|cur|avif|gif)$/i.test(
            file
          )
        ) {
          // Handle image files
          return (
            <img
              src={`${mediaUrl}/${file}`}
              alt={file}
              width={100}
              height={100}
            />
          );
        } else if (
          /\.(mp4|avi|mov|mkv|wmv|flv|webm|mpeg|mpg|3gp|rm|m4v|ts|asf|vob|ogv|mpv|mkv|divx|xvid|f4v|svi|mts|m2ts|mod|tod|m2v|dav|iso|ogg)$/i.test(
            file
          )
        ) {
          // Handle video files
          let videoType = "";

          if (/\.(mp4)$/i.test(file)) {
            videoType = "video/mp4";
          } else if (/\.(webm)$/i.test(file)) {
            videoType = "video/webm";
          } else if (/\.(ogg)$/i.test(file)) {
            videoType = "video/ogg";
          } else if (/\.(avi)$/i.test(file)) {
            videoType = "video/x-msvideo";
          } else if (/\.(mov)$/i.test(file)) {
            videoType = "video/quicktime";
          } else if (/\.(mkv)$/i.test(file)) {
            videoType = "video/x-matroska";
          } else if (/\.(wmv)$/i.test(file)) {
            videoType = "video/x-ms-wmv";
          } else if (/\.(flv)$/i.test(file)) {
            videoType = "video/x-flv";
          } else if (/\.(mpeg|mpg)$/i.test(file)) {
            videoType = "video/mpeg";
          } else if (/\.(3gp)$/i.test(file)) {
            videoType = "video/3gpp";
          } else if (/\.(rm)$/i.test(file)) {
            videoType = "application/vnd.rn-realmedia";
          } else if (/\.(m4v)$/i.test(file)) {
            videoType = "video/x-m4v";
          } else if (/\.(ts)$/i.test(file)) {
            videoType = "video/mp2t";
          } else if (/\.(asf)$/i.test(file)) {
            videoType = "video/x-ms-asf";
          } else if (/\.(vob)$/i.test(file)) {
            videoType = "video/dvd";
          } else if (/\.(ogv)$/i.test(file)) {
            videoType = "video/ogg";
          } else if (/\.(mpv)$/i.test(file)) {
            videoType = "video/mpv";
          } else if (/\.(divx)$/i.test(file)) {
            videoType = "video/divx";
          } else if (/\.(xvid)$/i.test(file)) {
            videoType = "video/xvid";
          } else if (/\.(f4v)$/i.test(file)) {
            videoType = "video/x-f4v";
          } else if (/\.(svi)$/i.test(file)) {
            videoType = "video/x-sgi-movie";
          } else if (/\.(mts|m2ts)$/i.test(file)) {
            videoType = "video/MP2T";
          } else if (/\.(mod)$/i.test(file)) {
            videoType = "video/mpeg";
          } else if (/\.(tod)$/i.test(file)) {
            videoType = "video/mpeg";
          } else if (/\.(m2v)$/i.test(file)) {
            videoType = "video/mpeg";
          } else if (/\.(dav)$/i.test(file)) {
            videoType = "video/dav";
          } else if (/\.(iso)$/i.test(file)) {
            videoType = "application/x-iso9660-image";
          } else if (/\.(ogg)$/i.test(file)) {
            videoType = "video/ogg";
          }

          return (
            <video width={100} height={100} controls>
              <source src={`${mediaUrl}/${file}`} type={videoType} />
              Your browser does not support the video tag.
            </video>
          );
        } else {
          return <span>{file}</span>;
        }
      },
      sortable: false,
    },

    {
      name: "Actions",
      cell: (row: Questions) => (
        <div className="d-flex justify-content-end">
          <Button color="primary" size="sm" onClick={() => handleEdit(row._id)}>
            <i className="icon-pencil-alt" />
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => handleDelete(row._id)}
            className="ms-2"
          >
            <i className="icon-trash" />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

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
        pageTitle={ViewQuestionstitle}
        parent={QuestionsTitle}
        title={ViewQuestionsTitle}
      />
      <Col xl={12} className="mb-lg-3">
        <Card>
          <CardBody>
            <Col xs={12} className="mt-2 d-flex justify-content-end mb-3">
              <Btn color="primary" onClick={handleAdd}>
                {Add}
              </Btn>
            </Col>
            <FilterComponent
              onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
              filterText={filterText}
            />
            <div className="table-responsive">
              <DataTable
                data={filteredData}
                columns={questionsTableColumns}
                pagination
                highlightOnHover
                striped
              />
            </div>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </>
  );
}
