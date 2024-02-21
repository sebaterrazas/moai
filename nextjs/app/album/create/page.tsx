"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import exifr from 'exifr'
import { getLocation, uploadMedia, getMedia } from "@/lib/actions";
import FilesGrid from "@/components/FilesGrid";
import SearchBar from "@/components/SearchBar";
import FilterFiles from "@/components/FilterFiles";

export default function CreateAlbum() {
  const [files, setFiles] = useState<any>([]);
  const [uploadMsg, setUploadMsg] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { gallery, boundaries } = await getMedia('');
        setFiles(gallery);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    fetchData();
  }, []);

  function handleCreateAlbum(e: any) {
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

  function changeSelection(idx: any) {
    const newArr = [...files];
    newArr[idx].selected = !newArr[idx].selected ?? true;
    setFiles(newArr);
  }

  return (
    <form
      className={'flex flex-col items-center justify-start text-foreground w-full h-dvh py-3 max-h-screen'}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-row justify-between w-full">
        <Link
          href="/"
          className="m-5 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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

        {files.some((file: any) => file.selected) && (
          <button
            className="bg-green-700 text-white m-5 py-2 px-4 rounded-md text-white bg-green-700 hover:bg-green-600 text-sm"
            onClick={handleCreateAlbum}
          >
            <span className="p-2">Create</span>
          </button>
        )}
      </div>

      <FilesGrid files={files} changeSelection={changeSelection} />
    </form>
  );
}