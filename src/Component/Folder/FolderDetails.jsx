import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FolderNavigation from './FolderNavigation';
import Folderlist from './Folderlist';
import folderSvg from "../../assets/folder.svg";
import Folderchildlist from './Folderchildlist';
import removehsvg from "../../assets/remove.svg";
import Button from "../ui/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FolderDetails = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);

  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/folders/${id}`);
        setFolder(response.data.data);
      } catch (error) {
        console.error('Error fetching folder details:', error);
      }
    };

    fetchFolderDetails();
  }, [id]);

  if (!folder) {
    return <div>Loading...</div>;
  }
  const handleRemoveFolder =async (folderId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/folders/${folderId}`);
      setFolder((prevFiles) => prevFiles.filter((file) => file.id !== folderId));
      toast.success('folder deleted successfully.');
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error('Error deleting folder.');
    }
  };
  return (
    <div className="md:container p-2 mx-auto my-1 bg-light-cyan border border-cyan rounded">
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between items-center h-16 mx-auto space-y-2 md:space-y-0 md:space-x-2">
      <ToastContainer />
        <FolderNavigation currentFolderId={folder.id}/>
        <Button
                text-transform="capitalize"
                filled="false"
                size="small"
                radius="md"
                onClick={() => handleRemoveFolder(folder.id)}
                imgSrc={removehsvg}
                interaction="transform  transition hover:scale-75  "
              />
        </div>
        </header>
       <h2>Folder Details:<img src={folderSvg} alt={folder.name} height={50} width={70} /> {folder.name}</h2>
       <Folderchildlist  currentFolderId={folder.id}/>
    </div>
  );
};

export default FolderDetails;
