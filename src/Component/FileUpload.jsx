import React, { useState } from "react";
import axios from "axios";
import Uploadhsvg from "../assets/upload.svg";
import Button from "./ui/Button";
import Input from "./ui/Input";
const FileUpload = ({ currentFolderId, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (e) => {
  
    setSelectedFiles(e.target.files || null);
  };

  const handleUpload = () => {
    if (!selectedFiles) {
      // No files selected
      return;
    }

    const formData = new FormData();
    formData.append("folder_id", currentFolderId);

    for (const file of selectedFiles) {
      formData.append("files[]", file);
    }

    axios
      .post("http://127.0.0.1:8000/api/files/upload", formData)
      .then((response) => {
        // Handle successful upload
        onUpload();
      })
      .catch((error) => {
        // Handle upload error
        console.error("Error uploading files:", error);
      });
  };

  return (
    <div className="flex flex-row   space-x-[0.7rem] ">
      <Input
        type="file"
        name="name"
        placeholder="name"
        inputWidthSize="w-1/2"
      />
      <Button
        content="Upload"
        text-transform="capitalize"
        filled="true"
        size="small"
        fontSize="text-sm md:text-base text-white"
        radius="md"
        onClick={handleUpload}
        imgSrc={Uploadhsvg}
        imgClass=""
        interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
      />
    </div>
  );
};

export default FileUpload;
