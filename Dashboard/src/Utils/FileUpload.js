import axios from "axios";

export const baseUrl = "http://localhost:4000/";
export const mediaUrl = "http://localhost:4000/uploads/";

export const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${baseUrl}util/fileupload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const filename = response?.data?.uploadedFiles?.file;
    return filename;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
