import React from "react";
import axios from "axios";
import FolderSvg from "../assets/folder.svg";

import Button from "./ui/Button";

const FolderNavigation = ({ currentFolderId, onFolderChange }) => {
  const handleFolderChange = (folderId) => {
    axios
      .get(`http://localhost:8000/api/folders/${folderId}`)
      .then((response) => {
        onFolderChange(response.data);
      })
      .catch((error) => {
        console.error("Error changing folder:", error);
      });
  };

  const handleNewFolder = () => {
    axios
      .post("http://localhost:8000/api/folders/create", {
        name: "New Folder",
        parent_id: currentFolderId,
      })
      .then((response) => {
        onFolderChange(response.data);
      })
      .catch((error) => {
        console.error("Error creating folder:", error);
      });
  };

  const handleDeleteFolder = () => {
    axios
      .delete(`http://localhost:8000/api/folders/${currentFolderId}`)
      .then((response) => {
        onFolderChange(response.data);
      })
      .catch((error) => {
        console.error("Error deleting folder:", error);
      });
  };

  return (
    <div className="flex flex-row  mb-[0.8rem] space-x-[0.7rem]">
      <Button
        content="Create Folder"
        text-transform="capitalize"
        filled="true"
        size="small"
        fontSize="text-sm md:text-base text-white"
        radius="md"
        onClick={handleNewFolder}
        imgSrc={FolderSvg}
        imgClass=""
        interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
     / >
     
      
      {/* <Button
        content="Delete Folder"
        text-transform="capitalize"
        filled="true"
        size="small"
        fontSize="text-sm md:text-base text-white"
        radius="md"
        onClick={handleDeleteFolder}
        interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
      /> */}
    </div>
  );
};

export default FolderNavigation;
