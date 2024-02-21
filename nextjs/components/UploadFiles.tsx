"use client";

import exifr from 'exifr'
import { FaFileUpload } from "react-icons/fa";
import { getLocation, uploadMedia } from "@/lib/actions";
import { useEffect } from 'react';

export default function UploadFile ({ files, setFiles, setUploadMsg }: { files: any[], setFiles: Function, setUploadMsg: Function }) {

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

    function handleSubmitFile() {
        try{
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
            }, 3000);
        }
        catch (error) {
            console.error(error);
            setUploadMsg("Error uploading files");
            setTimeout(() => {
                setUploadMsg("");
            }, 3000);
        }
    }

    useEffect(() => {
        if (files.length > 0) {
            handleSubmitFile();
        }
    }, [files]);

    return (
        <label className="cursor-pointer">
            <FaFileUpload className="text-2xl transition-transform focus:scale-125 hover:scale-125" />
            <input
                placeholder="fileInput"
                className="hidden"
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
    )
}