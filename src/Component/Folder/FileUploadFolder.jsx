import React, { useState } from "react";
import axios from "axios";
import UploadSvg from "../../assets/upload.svg"; // Assuming Uploadhsvg was a typo
import Button from "../ui/Button";
import Input from "../ui/Input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUploadFolder = ({ currentFolderId, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files); // Set selected files as FileList
    } else {
      setSelectedFiles([]); // Reset/clear if no files selected
    }
  };

  const handleUpload = async () => {
    // Check if files are selected
    if (selectedFiles && selectedFiles.length > 0) {
      const formData = new FormData();
      // Correctly append each file under the same key 'name[]'
      Array.from(selectedFiles).forEach((file) => {
        formData.append("name[]", file); // Use 'name[]' to indicate an array of files
      });

      try {
        const response = await axios.post(
          `http://localhost:8000/api/folders/${currentFolderId}/upload`, // Template literal for URL
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success('Files uploaded successfully.');
        setSelectedFiles([]); // Clear the input after successful upload

        if (onUpload) {
          onUpload(); // Call the onUpload prop callback if provided
        }
      } catch (error) {
        toast.error('Error uploading files.');
        console.error(error);
      }
    } else {
      toast.warn('No files selected.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">       
        <div className="flex flex-row space-x-[0.7rem]">
          <Input
            type="file"
            name="name"
            placeholder="Upload files"
            inputWidthSize="w-1/2"
            onChange={handleFileChange}
            multiple // Allow selecting multiple files
          />
          <Button
            content="Upload"
            filled="true"
            size="small"
            fontSize="text-sm md:text-base text-white"
            radius="md"
            type="submit"
            imgSrc={UploadSvg}
            interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
          />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default FileUploadFolder;