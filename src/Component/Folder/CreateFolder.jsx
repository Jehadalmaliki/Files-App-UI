import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FolderSvg from "../../assets/folder.svg";
import Input from "../ui/Input";
import Button from "../ui/Button";
import pdfsvg from "../../assets/pdf.svg";
import { useNavigate } from 'react-router';


const FolderNavigation = ({ currentFolderId, onFolderChange }) => {
  const [newFolderName, setNewFolderName] = useState("");
  const navigate = useNavigate();

  const handleCreateFolder = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/folders/create", {
        name: newFolderName,
        parent_id: currentFolderId,
      });

      const newFolder = response.data.data;

      // You may want to do something with the new folder, such as updating the UI
      
      toast.success('Folder created successfully.');
      console.log("Folder created successfully:", newFolder);

      // Trigger a callback to update the folder display (optional)
      if (onFolderChange) {
        onFolderChange(newFolder.id);
      }

      setNewFolderName("");
      if (!currentFolderId) {
        navigate(`/folders`);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error('Error creating folder');
    }
  };

  return (
  
   
    <form onSubmit={handleCreateFolder}>

      <div className="flex  flex-col lg:flex-col xl:flex-row  md:flex-col sm:flex-row mb-[0.8rem] space-x-[0.7rem] ">
      <ToastContainer /> 
        <Input
          type="text"
          name="name"
          placeholder="Folder name"
          inputWidthSize="w-1/2"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <Button
          content="Create Folder"
          textTransform="capitalize"
          filled="true"
          size="large"
          fontSize="text-xl md:text-base text-white"
          radius="md"
          type="submit"
          imgSrc={FolderSvg}
          imgClass=""
          interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
        />
        {/* You can add the delete folder button here */}
      </div>
    </form>

  );
};

export default FolderNavigation;
