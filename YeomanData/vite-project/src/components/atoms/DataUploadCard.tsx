import { useState } from "react";
import { getUploadHeaders } from "../../utils/auth";

export const DataUploadCard = () => {
  const handleFile = (event: any) => {
    setFileToUpload(event?.target?.files[0]);
  };
  const [fileToUpload, setFileToUpload] = useState(null);
  const uploadFile = () => {
    const formData = new FormData();
    if (!fileToUpload) return;

    formData.append("UPLOADED_FILE", fileToUpload);

    fetch("http://localhost:5000/api/fileUpload/", {
      method: "POST",
      body: formData,
      headers: getUploadHeaders(),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="flex justify-between text-sm font-bold">
        <div className="flex flex-col">
          <label htmlFor="uploaded_file">Upload data: </label>
          <div className="bg-zinc-800 rounded flex items-center">
            <input
              type="file"
              id="uploaded_file"
              name="UPLOADED_FILE"
              accept=".txt,.csv"
              className="p-[0!important] pl-[0.25rem!important]"
              onChange={handleFile}
            />
            <button
              id="upload-btn"
              onClick={uploadFile}
              className="border-zinc-700"
            >
              Upload File
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
