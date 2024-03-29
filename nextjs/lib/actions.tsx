'use server'

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { point, polygon, multiPolygon } from '@turf/helpers';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';


// Media functions

/* export async function getMedia(query: string) {
    const mediaData = await getMediaData(query);
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;
    if (!user_id) throw new Error('User not found');
    const result = mediaData.map((item: any) => {
        const path = `${user_id}/${item.filename}`;
        const { data: media } = supabase.storage.from('gallery').getPublicUrl(path);
        return { ...media, ...item };
    });
    return result
} */

export async function getMedia(query: string) {
    try {
        const cookieStore = cookies()
        const supabase = createServerComponentClient({ cookies: () => cookieStore });
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (query === '') {
            const { data: gallery, error } = await supabase.from("gallery").select().eq('user_id', user?.id)
            if (error) throw error;
            return { gallery, boundaries: null };
        };
        const geojsonString = await getBoundaries(query);
        const geojsonJson = JSON.parse(geojsonString);
        var boundaries: number[] = geojsonJson.boundaries.map(parseFloat);
        boundaries = [ boundaries[3], boundaries[1], boundaries[2], boundaries[0] ];
        if (geojsonJson.type !== 'Polygon' && geojsonJson.type !== 'MultiPolygon') {
            const { data: gallery, error } = await supabase.from("gallery").select().eq('user_id', user?.id).gte('lat', boundaries[0]).lte('lat', boundaries[1]).gte('lon', boundaries[2]).lte('lon', boundaries[3]);
            if (error) throw error;
            return { gallery, boundaries };
        }
        const { data: gallery, error } = await supabase.from("gallery").select().eq('user_id', user?.id)
        if (error) throw error;
        var poly: any;
        if (geojsonJson.type === 'Polygon') {
            poly = polygon(geojsonJson.polygon);
        } else if (geojsonJson.type === 'MultiPolygon') {
            poly = multiPolygon(geojsonJson.polygon);
        }
        const filteredGallery = gallery.filter((item) => {
            const pt = point([item.lon, item.lat]);
            return booleanPointInPolygon(pt, poly);
        });
        return { gallery: filteredGallery, boundaries };
    }
    catch (error) {
        return  { gallery: [], boundaries: [] };
    }
}

export async function uploadMedia(data: any) {
    "use server";

    if (data.get('lat') == 'NaN' || data.get('lon') == 'NaN') throw new Error('GPS not found');

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;
    if (!user_id) throw new Error('User not found');
    const path = `${user_id}/${data.get('filename')}`;
    const { data: media2, error } = await supabase.storage.from('gallery').upload(path, data.get('file'));
    if (error) throw error;
    const { data: media } = supabase.storage.from('gallery').getPublicUrl(path);
    const isoDateString = new Date(data.get('datetime')).toISOString();
    const { data: insert, error: insertError } = await supabase.from('gallery').insert([
        {
            user_id: user_id,
            lat: data.get('lat'),
            lon: data.get('lon'),
            location: data.get('location'),
            datetime: isoDateString,
            filename: data.get('filename'),
            publicUrl: media.publicUrl,
        }
    ]);
    if (insertError) throw insertError;
    return 'Succesfully uploaded media';
}

// Map functions

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
        const location = (await response.json()).display_name;
        return location;
    } catch (error) {
        console.error(error);
        return '';
    }
}

// User functions

export const signOut = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
};

export const getUser = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}