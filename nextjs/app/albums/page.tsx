"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import exifr from 'exifr'
import { getLocation, uploadMedia } from "@/lib/actions";

export default function ViewAlbum() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [uploadMsg, setUploadMsg] = useState<string>("");

  async function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let newFiles: any[] = [];
      for (let i = 0; i < e.target.files["length"]; i++) {
        let latitude: any = null
        let longitude: any = null
        let datetime: any = null
        let location: any = null
        try {
          let res = await exifr.parse(e.target.files[i]);
          latitude = res.latitude
          longitude = res.longitude
          if (!latitude || !longitude) {
            throw new Error('No GPS data found')
          }
          datetime = res.DateTimeOriginal
          location = await getLocation(latitude, longitude)
        }
        finally {
          newFiles.push({
            name: e.target.files[i].name,
            latitude: latitude,
            longitude: longitude,
            location: location,
            datetime: datetime,
            file: e.target.files[i]
          });
        }
      }
      setFiles((prevState: any[]) => [...prevState, ...newFiles]);
    }
  }

  function handleSubmitFile(e: any) {
    try{
      e.preventDefault();
      files.forEach(async (file: any) => {
        const data = new FormData();
        data.append("filename", file.name);
        data.append("lat", file.latitude);
        data.append("lon", file.longitude);
        data.append("location", file.location);
        data.append("datetime", file.datetime);
        data.append("file", file.file);
        await uploadMedia(data);
      });
      setFiles([]);
      setUploadMsg("Files uploaded successfully");
      setTimeout(() => {
        setUploadMsg("");
      }
      , 3000);
    }
    catch (error) {
      console.error(error);
      setUploadMsg("Error uploading files");
      setTimeout(() => {
        setUploadMsg("");
      }
      , 3000);
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <form
      className={'animate-in flex-1 flex flex-col items-center justify-center gap-2 text-foreground w-screen h-screen'}
      onDragEnter={handleDragEnter}
      onSubmit={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Home
      </Link>

      <div className="w-1/2">
        <label className={"flex flex-col items-center justify-center w-full h-64 p-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-btn-background-hover " + (dragActive ? "bg-btn-background-hover" : "bg-btn-background")}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="text-center mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">Images or Videos (MAX. 50 MB)</p>
          </div>
          <input
            placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            multiple={true}
            onChange={(e) => {
              try {
                handleChange(e);
              } catch (error: any) {
                setUploadMsg(error.message);
                setTimeout(() => {
                  setUploadMsg("");
                }
                , 3000);
              }
            }}
            /* accept="image/*, video/*" */ /* Commented out because it caused problems with Android Web */
          />
        </label>
      </div>

        <div className="flex flex-col items-center p-3">
          {files.map((file: any, idx: any) => (
            <div key={idx} className="flex flex-row space-x-5 items-center">
              <span>{file.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                <FaXmark />
              </span>
            </div>
          ))}
        </div>
        {files.length > 0 && (
          <button
            className="bg-green-700 text-white rounded-lg p-2 mt-3 w-auto animate-in"
            onClick={handleSubmitFile}
          >
            <span className="p-2">Submit</span>
          </button>
        )}
        <div className="flex flex-col items-center p-3">
          {uploadMsg && <span>{uploadMsg}</span>}
        </div>
    </form>
  );
}