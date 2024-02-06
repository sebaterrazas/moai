"use client";

import Image from 'next/image';
import { useState } from 'react';

import classes from "./Map.module.css";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const MapPhoto = ({ media, zoom, rotation }: { media: any, zoom: number, rotation: number }) => {
    const [isLoading, setLoading] = useState(true);

    return (
    <a href="#" className={classes.photoContainer} style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="bg-gray-200 overflow-hidden" style={{ marginTop: `${zoom}px`, marginLeft: `${zoom}px`, marginRight: `${zoom}px`, width: `${10 * zoom}px`, height: `${10 * zoom}px`, position: "relative" }}>
          {isLoading && (
            <div
              style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ccc', // Placeholder background color
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
            >
              Loading...
            </div>
          )}
          <Image
            alt={media.location || "placeholder"}
            fill
            sizes="(max-width: 220px) 100vw, (max-width: 220px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            src={media.publicUrl || "https://bit.ly/placeholder-img"}
            className={cn(
              'group-hover:opacity-75 duration-700 ease-in-out',
              isLoading
                ? 'grayscale blur-2xl scale-110'
                : 'grayscale-0 blur-0 scale-100'
            )}
            onLoad={() => setLoading(false)}
          />
        </div>
        <h3 className="font-medium text-gray-900" style={{ fontSize: zoom, lineHeight: 2+0.03*zoom }}> lol </h3>
        {/* <h3 className="mt-4 text-sm text-gray-700">Seba</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">@yo</p> */}
      </a>
    );
}