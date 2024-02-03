import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./Component/Home";
import FileList from "./Component/Files/FileList";
import FileUpload from "./Component/Files/FileUpload";
import 'react-toastify/dist/ReactToastify.css';
import ChildFolder from './Component/Folder/ChildFolder';
import MyBreadcrumbs from './Component/Breadcrumbs';
import Folderlist from './Component/Folder/Folderlist';


function App() {
  return (
    <div className="md:container p-2 mx-auto my-1 bg-light-cyan border border-cyan rounded">
      <Router>
        <MyBreadcrumbs />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folders" element={<Folderlist />} />

          <Route path="/folders/:id" element={<ChildFolder />} />
          <Route path="/files" element={<FileList />} />
          <Route path="/upload" element={<FileUpload />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
