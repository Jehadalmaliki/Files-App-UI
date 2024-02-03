import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Button from "../ui/Button";
import removehsvg from "../../assets/remove.svg";
import foldersvg from "../../assets/folderr.svg"
import docsvg from "../../assets/doc.svg";
import { useNavigate } from 'react-router-dom';
import FolderNavigation from "./CreateFolder";

const Folderlist = () => {
  const [folders, setFolders] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = () => {
    axios
      .get("http://localhost:8000/api/folders")
      .then((response) => {
        setFolders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching folders:", error);
      });
  };

  const renderFolders = (folders) => {
   
  
    return folders.map((folder) => (
      <React.Fragment key={folder.id}>
        {folder.parent_id === null && ( // Only render if the folder is a main folder
          <tr>
            <td className="p-3">{folder.id}</td>
            <td className="p-3">
              <a
                href={`/${folder.id}`}  // Link to the detailed page
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/folders/${folder.id}`);  // Use navigate to go to a detailed page
                }}
                rel="noopener noreferrer"
              >
                <img src={foldersvg} alt={folder.name} height={50} width={70} />
              </a>
              {folder.name}
            </td>
            <td className="p-3">
              <Button
                text-transform="capitalize"
                filled="false"
                size="small"
                radius="md"
                onClick={() => handleRemoveFolder(folder.id)}
                imgSrc={removehsvg}
                interaction="transform  transition hover:scale-75  "
              />
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  // ...

  const handleRemoveFolder =async (folderId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/folders/${folderId}`);
      setFolders((prevFiles) => prevFiles.filter((file) => file.id !== folderId));
      toast.success('folder deleted successfully.');
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error('Error deleting folder.');
    }
  };

  return (
    <div>

      <div className="overflow-x-auto md:container p-2 mx-auto mt-12 bg-white rounded border-2  border-cyan">

        <FolderNavigation/>
        <table className="min-w-full  font-sans ">
          <thead className="bg-cyan  font-small  text-white font-normal  ">
            <tr className="text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>{renderFolders(folders)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Folderlist;
