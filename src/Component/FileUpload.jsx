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

  const handleUpload = async () => {
    console.log(selectedFiles);

    // Check if files are selected
    if (selectedFiles) {
        const formData = new FormData();
        Array.from(selectedFiles).forEach((file, index) => {
            formData.append('name', file);
        });

      try {
       
        const response = await axios.post(
          'http://127.0.0.1:8000/api/files/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },

          }
        );
        console.log(response);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    }
  };

  const handleSubmite = async (e) => {
    e.preventDefault();
    await handleUpload();
  };

  return (
    <form onSubmit={handleSubmite}>
      <div className="flex flex-row space-x-[0.7rem]">
        <Input
          type="file"
          name="name"
          placeholder="name"
          inputWidthSize="w-1/2"
          onChange={handleFileChange}
          multiple // Allow selecting multiple files
        />
        
        <Button
          content="Upload"
          text-transform="capitalize"
          filled="true"
          size="small"
          fontSize="text-sm md:text-base text-white"
          radius="md"
          type="submit"
          imgSrc={Uploadhsvg}
          imgClass=""
          interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
        />
      </div>
    </form>
  );
};

export default FileUpload;
