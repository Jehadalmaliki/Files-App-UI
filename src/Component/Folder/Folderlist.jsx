import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Button from "../ui/Button";
import removehsvg from "../../assets/remove.svg";
import folderSvg from "../../assets/folder.svg";
import docsvg from "../../assets/doc.svg";

const Folderlist = () => {
  const [folders, setFolders] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);

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

  const handleToggleChildren = (parentFolder) => {
    if (selectedParent === parentFolder.id) {
      // If the parent is already selected, deselect it
      setSelectedParent(null);
    } else {
      // Otherwise, select the parent to show its children
      setSelectedParent(parentFolder.id);
    }
  };

  const renderFolders = (folders) => {
    return folders.map((folder) => (
      <React.Fragment key={folder.id}>
        {folder.parent_id === null && ( // Only render if the folder is a main folder
          <tr>
            <td className="p-3">{folder.id}</td>
            <td className="p-3">
              <img src={folderSvg} alt={folder.name} height={50} width={70} />
              {folder.name}
            </td>
            <td className="p-3">
              <Button
                content="Remove"
                imgSrc={removehsvg}
                imgAlt="Remove Folder"
                onClick={() => handleRemoveFolder(folder.id)}
              />
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  // ...

  const handleRemoveFolder = (folderId) => {
    // Implement the logic to remove the folder
    toast.success(`Folder with ID ${folderId} removed successfully.`);
  };

  return (
    <div>
      <ToastContainer />
      <div className="overflow-x-auto md:container p-2 mx-auto mt-12 bg-white rounded border-2  border-cyan">
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
