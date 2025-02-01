import React, { useState, useEffect } from "react";
import Logo from "../../../assets/svg/upload.svg";
import LogoDark from "../../../assets/svg/upload_dark.svg";

type FileData = {
  name: string;
  size: number;
  progress: number;
};

interface FileUploadProps {
  allowedFormats: string[];
  maxSizeMB: number;
  onFileUpload: (file: File) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  allowedFormats,
  maxSizeMB,
  onFileUpload,
  error,
}) => {
  const [file, setFile] = useState<FileData | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  console.log(error);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();

      if (!fileExtension || !allowedFormats.includes(fileExtension)) {
        setFile(null);
        return;
      }

      if (fileSizeMB > maxSizeMB) {
        setFile(null);
        return;
      }

      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        progress: 0,
      });
      setUploading(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (uploading && file) {
      interval = setInterval(() => {
        setFile((prevFile) => {
          if (prevFile && prevFile.progress < 100) {
            return {
              ...prevFile,
              progress: prevFile.progress + 10,
            };
          }
          return prevFile!;
        });
      }, 500);

      if (file?.progress >= 100) {
        setUploading(false);
        onFileUpload(
          new File([new Blob([file.name])], file.name, {
            type: "application/octet-stream",
          })
        );
        clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [uploading, file, onFileUpload]);

  return (
    <div
      className={`flex flex-col items-center p-4 border bg-white dark:bg-boxdark rounded-lg mb-4 ${
        error
          ? "border-red-500 dark:border-red-500"
          : "border-stroke dark:border-slate-600"
      }`}
    >
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center cursor-pointer text-gray-500"
      >
        <div className="mb-2 text-2xl text-primary">
          <img src={Logo} alt="Upload Icon" className="w-8 h-8 dark:hidden" />
          <img
            src={LogoDark}
            alt="Upload Icon"
            className="w-8 h-8 hidden dark:block"
          />
        </div>
        <span>Haga clic para cargar</span>
      </label>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex gap-2 mt-2">
        {allowedFormats.map((format) => (
          <span
            key={format}
            className="px-2 bg-[#ebf2fd] text-primary py-1 text-sm border font-semibold rounded-lg"
          >
            {format.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="w-full mt-4">
        {file && (
          <>
            <div className="flex justify-between text-sm text-gray-700 dark:text-white">
              <span>{file.name}</span>
              <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>
            {uploading ? (
              <div className="w-full mt-2 bg-gray-200 rounded-full">
                <div
                  className="bg-primary text-xs font-medium text-center text-white p-0.5 leading-none rounded-l-full"
                  style={{ width: `${file.progress}%` }}
                >
                  {file.progress}%
                </div>
              </div>
            ) : (
              <span className="text-xs text-gray-500 dark:text-white mt-2">
                {file.progress === 100
                  ? "Archivo subido con éxito"
                  : "Esperando..."}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
