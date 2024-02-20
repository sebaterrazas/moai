import React from 'react';

import { getUser, getMedia } from "@/lib/actions";
import MainView from '@/components/MainView';


export default async function Index({
  searchParams
} : {
  searchParams?: { search?: string };
}
) {
  const query = searchParams?.search || "";
  const user = await getUser();
  const { gallery, boundaries } = await getMedia(query);

  return (
    <div className="flex-1 w-full flex flex-row">
      <div className="animate-in flex-1 flex opacity-0">
        <MainView gallery={gallery} boundaries={boundaries || []} query={query} user={user} />
      </div>
    </div>
  );
}
