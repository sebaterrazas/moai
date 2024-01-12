'use server'

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import * as turf from '@turf/turf'

export async function getMedia(query: string) {
    try {
        const geojsonString = await getBoundaries(query);
        if (geojsonString === '') return [];
        const cookieStore = cookies()
        const supabase = createClient(cookieStore);
        const geojsonJson = JSON.parse(geojsonString);
        if (geojsonJson.type === 'Point') {
            const boundaries: number[] = geojsonJson.boundaries.map(parseFloat);
            const { data: media, error } = await supabase.from("test").select().gte('lat', boundaries[0]).lte('lat', boundaries[1]).gte('lon', boundaries[2]).lte('lon', boundaries[3]);
            if (error) throw error;
            return media;
        }
        const { data: media, error } = await supabase.from("test").select()
        if (error) throw error;
        var poly: any;
        if (geojsonJson.type === 'Polygon') {
            poly = turf.polygon(geojsonJson.polygon);
        } else if (geojsonJson.type === 'MultiPolygon') {
            poly = turf.multiPolygon(geojsonJson.polygon);
        }
        return media.filter((item) => {
            const pt = turf.point([item.lon, item.lat]);
            return turf.booleanPointInPolygon(pt, poly);
        });
    }
    catch (error) {
        return [];
    }
}

export async function getBoundaries(query: string): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&polygon_geojson=1&q=${query}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json()
        const geojson = res[0].geojson;
        return JSON.stringify({ "type": geojson.type, "polygon": geojson.coordinates, "boundaries": res[0].boundingbox });
    } catch (error) {
        return '';
    }
}

export async function getLocation(latCoordinates: number, lonCoordinates: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latCoordinates}&lon=${lonCoordinates}&zoom=18`;
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const location = await response.json()
        return JSON.stringify(location);
    } catch (error) {
        console.error(error);
        return '';
    }
}