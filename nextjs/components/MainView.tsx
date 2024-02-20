'use client';

import React, { useState } from 'react'

const MapComponent = React.lazy(() => import('@/components/map/Map'));
const Navbar = React.lazy(() => import('@/components/Navbar'));
const SearchBar = React.lazy(() => import('@/components/SearchBar'));
const Avatar = React.lazy(() => import('@/components/Avatar'));


export default ({gallery, boundaries, query, user} : {gallery: any[], boundaries: number[], query?: string, user?: any}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [files, setFiles] = useState<any>([]);
    const [popUp, setPopUp] = useState<string>("");

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

    return (
        <main 
            className="flex-1 flex" 
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
        >
          <MapComponent gallery={gallery} bounds={boundaries} setIsLoading={setIsLoading}/>
          <div className={`absolute top-0 left-0 w-full flex flex-row justify-between ${!isLoading && "p-3"}`}>
            <Navbar isLoading={isLoading} files={files} setFiles={setFiles} setPopUp={setPopUp} />
            <SearchBar term={query} />
            <Avatar user={user} />
          </div>
        </main>
)}
