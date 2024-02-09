/* import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers"; */

import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { MapComponent } from "@/components/Map";
import { getUser, getMedia } from "@/lib/actions";
import Avatar from "@/components/Avatar";


export default async function Index({
  searchParams
} : {
  searchParams?: { search?: string };
}
) {
  const query = searchParams?.search || "";
  const user = await getUser();
  const gallery = await getMedia(query);

  return (
    <div className="flex-1 w-full flex flex-row">
      <div className="animate-in flex-1 flex opacity-0">
        <main className="flex-1 flex">
          <MapComponent gallery={gallery} />
          <div className="absolute top-0 left-0 p-3 w-full flex flex-row justify-between">
            <Navbar user={user} />
            <SearchBar term={query} />
            <Avatar user={user} />
          </div>
        </main>
      </div>

      {/* <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://sebaterrazas.github.io/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Seba
          </a>
        </p>
      </footer> */}
    </div>
  );
}
