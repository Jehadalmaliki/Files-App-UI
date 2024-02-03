import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Button from "../ui/Button";
import removehsvg from "../../assets/remove.svg";
import folderSvg from "../../assets/folder.svg";
import docsvg from "../../assets/doc.svg";

import { useNavigate } from 'react-router-dom';

const Folderchildlist = ({ currentFolderId }) => {
  const [folderData, setFolderData] = useState({});
  const [selectedParent, setSelectedParent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchFolderData();
  }, []);

  const fetchFolderData = () => {
    axios
      .get(`http://127.0.0.1:8000/api/folders/${currentFolderId}`)
      .then((response) => {
        setFolderData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching folder data:", error);
      });
  };
  const handleFolderClick = (folderId) => {
   
    navigate(`/folders/${folderId}`);
  };
  const handleFileClick = (fileId) => {
    // Handle click on a file if needed
  };
  return (
    <div>
      <ToastContainer />
      <div className="overflow-x-auto md:container p-2 mx-auto mt-12 bg-white rounded border-2 border-cyan">
        <table className="min-w-full font-sans">
          <thead className="bg-cyan font-small text-white font-normal">
            <tr className="text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Parent ID</th>
              <th className="p-3">Created At</th>
             
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Main Folder */}
            <tr key={folderData.id}>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>
              <td className="p-3"></td>

              
            </tr>

            {/* Children Folders */}
            {(folderData.children ?? []).map((child) => (
              <tr key={child.id} onClick={() => handleFolderClick(child.id)} style={{ cursor: 'pointer' }}>
                <td className="p-3">{child.id}</td>
                <td className="p-3"> <img src={folderSvg} alt={child.name} height={50} width={70} />{child.name}</td>
                <td className="p-3">{child.parent_id}</td>
                <td className="p-3">{child.created_at}</td>
               
                <td className="p-3">
                  <Button
                    text-transform="capitalize"
                    filled="false"
                    size="small"
                    radius="md"
                    onClick={''}
                    imgSrc={removehsvg}
                    interaction="transform transition hover:scale-75"
                  />
                </td>
              </tr>
            ))}

            {/* Files */}
            {(folderData.files ?? []).map((file) => (
              <tr key={file.id} onClick={() => handleFileClick(file.id)} style={{ cursor: 'pointer' }}>
                <td className="p-3">{file.id}</td>
                <td className="p-3">{file.name}</td>
                <td className="p-3">{file.folder_id}</td>
                <td className="p-3">{file.created_at}</td>
                <td className="p-3">
                  <Button
                    text-transform="capitalize"
                    filled="false"
                    size="small"
                    radius="md"
                    onClick={''}
                    imgSrc={removehsvg}
                    interaction="transform transition hover:scale-75"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Folderchildlist;
