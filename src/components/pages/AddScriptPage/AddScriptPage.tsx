import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { uploadScriptThunk } from "@/redux/thunk/scriptsThunk";
import { restartUploadScriptStatus } from "@/redux/slice/scriptsSlice";

const AddScriptPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const uploadScriptStatus = useAppSelector(
    (state) => state.scripts.uploadScriptStatus
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!file.name.endsWith(".py")) {
        toast.error("Invalid file type\nOnly Python (.py) files are allowed.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File is too large\nMaximum allowed size is ${
            MAX_FILE_SIZE / (1024 * 1024)
          } MB.`
        );
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      if (!file.name.endsWith(".py")) {
        toast.error("Invalid file type. Only Python (.py) files are allowed.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File is too large\nMaximum allowed size is ${
            MAX_FILE_SIZE / (1024 * 1024)
          } MB.`
        );
        return;
      }

      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) return;

    dispatch(uploadScriptThunk(selectedFile));
  };

  useEffect(() => {
    if (uploadScriptStatus === "success") {
      dispatch(restartUploadScriptStatus());
      navigate("/scripts");
    }
  }, [dispatch, uploadScriptStatus, navigate]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Script</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("fileInput")?.click()}
          className={`border-2 border-dashed p-6 rounded-md text-center cursor-pointer ${
            dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}>
          {selectedFile ? (
            <p>Selected file: {selectedFile.name}</p>
          ) : (
            <p>
              Drag and drop your script file here (max 5 MB), or click to select
              one.
            </p>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept=".py"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-full flex justify-end">
          <Button disabled={uploadScriptStatus === "loading"} type="submit">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddScriptPage;
