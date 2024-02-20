"use client";

import Image from 'next/image';
import { useState } from 'react';

import classes from "./Map.module.css";

import placeholder from '@/public/polaroid_placeholder.png'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const MapPhoto = ({ media, zoom, rotation }: { media: any, zoom: number, rotation: number }) => {
    const [isLoading, setLoading] = useState(true);

    return (
    <a href="#" className={classes.photoContainer} style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease-in-out' }}>
        <div className="bg-gray-200 overflow-hidden" style={{ marginTop: `${zoom}px`, marginLeft: `${zoom}px`, marginRight: `${zoom}px`, width: `${10 * zoom}px`, height: `${10 * zoom}px`, position: "relative" }}>
          {isLoading && (
            <Image
              alt={"placeholder"}
              fill
              sizes="(max-width: 220px) 100vw, (max-width: 220px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              src={placeholder}
              className={'group-hover:opacity-75 duration-700 ease-in-out grayscale-0 blur-0 scale-100'}
            />
          )}
          <Image
            alt={media.location || "location"}
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
      </a>
    );
}