import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FolderNavigation from './CreateFolder';
import Folderlist from './Folderlist';
import foldersvg from "../../assets/folderr.svg"
import Folderchildlist from './Folderchildlist';
import removehsvg from "../../assets/remove.svg";
import Button from "../ui/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUploadFolder from '../Folder/FileUploadFolder';
import { useNavigate } from 'react-router-dom';


const FolderDetails = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState("");
  const navigate = useNavigate();

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
  const handleRemoveFolder = async (folderId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/folders/${folderId}`);
      toast.success('Folder deleted successfully.');

      const parentFolderId = response.data.parentFolderId; // Adjust this according to your API response

      navigate(`/folders/${parentFolderId}`);
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error('Error deleting folder.');
    }
  };
  return (
    <div className="md:container p-2 mx-auto my-1 bg-light-cyan border border-cyan rounded">
   
      <div className="flex flex-col md:flex-row md:justify-between  h-16  space-y-2 md:space-y-0 md:space-x-2">
      <ToastContainer />
        <FolderNavigation currentFolderId={folder.id}/>
        <FileUploadFolder currentFolderId={folder.id} />
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
  
       <img src={foldersvg} alt={folder.name} height={50} width={70} /> {folder.name}
       <Folderchildlist  currentFolderId={folder.id}/>
    </div>
  );
};

export default FolderDetails;
