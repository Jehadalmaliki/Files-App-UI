// FileList.js

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Button from "../ui/Button";
import removehsvg from "../../assets/remove.svg";
import pdfsvg from "../../assets/pdf.svg";
import docsvg from "../../assets/doc.svg";


const FileList = ({ currentFolderId }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = () => {
      fetch(`http://127.0.0.1:8000/api/files`)
        .then((res) => res.json())
        .then((response) => {
          setFiles(response.name);
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
        });
    };

    fetchFiles();
  }, []);

  const deleteFile = async (fileId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/files/delete/${fileId}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      toast.success('File deleted successfully.');
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error('Error deleting file.');
    }
  };

 

  return (
    <div>
       <ToastContainer />
      <div className="overflow-x-auto md:container p-2 mx-auto mt-12 bg-white rounded border-2  border-cyan">
        <table className="min-w-full  font-sans ">
          <thead className="bg-cyan  font-small  text-white font-normal  ">
            <tr className="text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Privew</th>
              <th className="p-3">Name</th>
              
              <th className="p-3">Issued</th>
              <th className="p-3">size</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {files ? (
              files.length > 0 ? (
                files.map((file) => {
                  const fileExtension = file.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  let fileContent;

                  switch (fileExtension) {
                    case "pdf":
                    
                      fileContent = (
                        <div className="flex flex-row">
                            <a
                              href={`http://127.0.0.1:8000/storage/${file.name}`}
                              target="_blank"
                              download={file.name}
                              rel="noopener noreferrer"
                            >
                              
                              <img
                                src={pdfsvg}
                                alt={file.name}
                                height={50}
                                width={70}
                              />
                            
                            </a>  
                                        
                        </div>
                      );
                      break;
                      case "docx":
                    
                      fileContent = (
                        <div className="flex flex-row">
                            <a
                              href={`http://127.0.0.1:8000/storage/${file.name}`}
                              target="_blank"
                              download={file.name}
                              rel="noopener noreferrer"
                            >
                              
                              <img
                                src={docsvg}
                                alt={file.name}
                                height={50}
                                width={70}
                              />
                            
                            </a>  
                                        
                        </div>
                      );
                      break;
                    case "txt":
                      fileContent = <span>Text Content Placeholder</span>;
                      break;
                    case "webp":
                    case "png":
                    case "jpg":
                    case "svg":
                    case "gif":
                    case "jpeg":
                      fileContent = (
                        <img
                          src={`http://127.0.0.1:8000/storage/${file.name}`}
                          alt={file.name}
                          height={50}
                          width={90}
                        />
                      );
                      break;

                    default:
                      fileContent = <span>Unknown File Type</span>;
                  }

                  return (
                    <tr
                      key={file.id}
                      className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900"
                    >
                      <td className="p-3">
                        <p>{file.id}</p>
                      </td>
                      
                      <td className="p-3">
                        <p>{fileContent}</p>
                      </td>
                      <td className="p-3">
                        <p>{file.name}</p>
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
                        <p>{file.size} KB</p>
                      </td>
                      <td className="p-3">
                        <Button
                          text-transform="capitalize"
                          filled="false"
                          size="small"
                          radius="md"
                          onClick={() => deleteFile(file.id)}
                          imgSrc={removehsvg}
                          interaction="transform  transition hover:scale-75  "
                        />
                      </td>
                    </tr>
                  );
                })
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
