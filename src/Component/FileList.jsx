// FileList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./ui/Button";

const FileList = ({ currentFolderId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = () => {
      fetch(`http://127.0.0.1:8000/api/files/index`)
        .then((res) => res.json())
        .then((response) => {
          console.log(response.name);
          setFiles(response.name); // Update state with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          // Handle errors here
        });
    };

    fetchFiles();
  }, [currentFolderId]);
  const viewFileDetails = (fileId) => {
    // Implement file details view functionality
    console.log(`View details for file with id ${fileId}`);
  };

  const deleteFile = async (fileId) => {
    try {
      // Implement file deletion functionality
      await axios.delete(`/api/files/${fileId}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      {/* <Button
              content="View Details"
              text-transform="capitalize"
              filled="true"
              size="small"
              fontSize="text-sm md:text-base text-white"
              radius="md"
              onClick={() => viewFileDetails(file.id)}
              imgClass=""
              interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
            />
            <Button
              content="Delete"
              text-transform="capitalize"
              filled="true"
              size="small"
              fontSize="text-sm md:text-base text-white"
              radius="md"
              onClick={() => deleteFile(file.id)}
              imgClass=""
              interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
            />
     */}

      <div className="overflow-x-auto md:container p-2 mx-auto mt-12 bg-white rounded border-2  border-cyan">
        <table className="min-w-full  font-sans ">
          <thead className="bg-cyan  font-small  text-white font-normal  ">
            <tr className="text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Issued</th>
              <th className="p-3">size</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {files ? (
              files.length > 0 ? (
                files.map((file) => (
                  <tr
                    key={file.id}
                    className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <td className="p-3">
                      <p> {file.id}</p>
                    </td>
                    <td className="p-3">
                      {" "}
                      <p>
                        {" "}
                        <img src={file.name} alt="imag" />
                      </p>
                    </td>
                    <td className="p-3">
                      <p>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }).format(new Date(file.created_at))}
                      </p>
                    </td>
                    <td className="p-3">
                      <p> {file.size} KB</p>
                    </td>
                    <td className="p-3">
                      <Button
                        content="Delete"
                        text-transform="capitalize"
                        filled="true"
                        size="small"
                        fontSize="text-sm md:text-base text-white"
                        radius="md"
                        onClick={() => deleteFile(file.id)}
                        imgClass=""
                        interaction="transform hover:bg-yellow transition hover:scale-75 active:bg-cyan focus:outline-none focus:ring focus:ring-cyan"
                      />
                    </td>
                 
                  </tr>
                ))
              ) : (
                <p>No files available</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
