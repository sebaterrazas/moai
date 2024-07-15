'use client';

import React, { Suspense, createContext, useEffect, useState } from 'react';
import Logo from './Logo';
import { SkeletonCircle } from '@chakra-ui/react';
import PopUp from './PopUp';


type MainContextType = {
  gallery: any[];
  boundaries: any[];
  files: any[];
  popUp: any;
  setFiles: Function;
  setPopUp: Function;
  user: any;
};

const defaultValue: MainContextType = {
  gallery: [],
  boundaries: [],
  files: [],
  popUp: { status: 'info', message: '', active: false },
  setFiles: () => {},
  setPopUp: () => {},
  user: null,
};

export const MainContext = createContext(defaultValue);

const MapComponent = React.lazy(() => import('@/components/map/Map'));
const SearchBar = React.lazy(() => import('@/components/SearchBar'));
const Avatar = React.lazy(() => import('@/components/Avatar'));


export default ({gallery, boundaries, query, user } : {gallery: any[], boundaries: number[], query?: string, user?: any }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [files, setFiles] = useState<any>([]);
    const [popUp, setPopUp] = useState<any>({ status: 'info', message: '', active: false });

    useEffect(() => {
      if (popUp?.active) {
        setTimeout(() => {
          setPopUp((popUp: any) => ({ ...popUp, active: false }));
        }, 3000);
      }
    }, [popUp]);

    function handleDrop(e: any) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (!user) {
        setPopUp({ status: 'info', message: 'Login to perfom this action', active: true });
        return;
      }
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
      <MainContext.Provider value={{ gallery, boundaries, files, popUp, setFiles, setPopUp, user }}>
        <main 
            className="flex-1 flex" 
            onDragEnter={handleDragEnter}
            onSubmit={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
        >
          <MapComponent setIsLoading={setIsLoading} />
          {isLoading && 
            <div className="absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center bg-background bg-opacity-90">
              <Logo />
            </div>
          }
          <div className={`absolute top-0 left-0 w-full flex flex-row justify-between align-center p-3`}>
            <SearchBar term={query} isGallery={gallery.length > 0} />
            <Suspense fallback={<div className="py-2" ><SkeletonCircle size="10"/></div>}>
              <Avatar />
            </Suspense>
          </div>
          <PopUp />
        </main>
      </MainContext.Provider>
)}
