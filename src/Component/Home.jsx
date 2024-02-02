// Your React component

import React from "react";
import FileUpload from "./FileUpload";
import FolderNavigation from "./FolderNavigation";
import FileList from "./FileList";
import Input from "./ui/Input";

const YourComponent = () => {
  return (
    <div className="md:container p-2 mx-auto my-1 bg-light-cyan border border-cyan rounded">
      <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between items-center h-16 mx-auto space-y-2 md:space-y-0 md:space-x-2">
         
            <FileUpload />
            <FolderNavigation />
     
          {/* <Input
            type="search"
            name="Search"
            placeholder="Search"
            inputWidthSize="w-full md:w-1/4" 
          /> */}
        </div>
      </header>

      <FileList />
    </div>
  );
};

export default YourComponent;
