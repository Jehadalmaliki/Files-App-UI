// Your React component

import React from "react";
import FileUpload from "./Files/FileUpload";
import FolderNavigation from "./Folder/FolderNavigation";
import FileList from "./Files/FileList";
import Input from "./ui/Input";

import { Breadcrumbs } from "@material-tailwind/react";
import Folderlist from "./Folder/Folderlist";

const Home = () => {
  return (
    <div className="md:container p-2 mx-auto my-1 bg-light-cyan border border-cyan rounded">
      <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between items-center h-16 mx-auto space-y-2 md:space-y-0 md:space-x-2">
          {/* <FileUpload /> */}
          {/* <Breadcrumbs/> */}
          <FolderNavigation />
        </div>
      </header>
      <Folderlist />
      {/* <FileList /> */}
    </div>
  );
};

export default Home;
