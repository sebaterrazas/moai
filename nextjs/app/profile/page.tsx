import Link from "next/link";

import { signOut, getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Profile() {
    const user = await getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div
            className={'animate-in flex-1 flex flex-col items-center justify-center gap-2 text-foreground w-screen h-screen'}
        >
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
                Back
            </Link>
            <h1>Profile</h1>
            <img
                src={user.user_metadata.avatar_url}
                alt="User profile picture"
                className="w-20 h-20 rounded-full"
            />
            <span>{user.user_metadata.full_name}</span>
            <span>{user.user_metadata.email}</span>
            <form action={signOut}>
                <button className="py-2 px-4 rounded-md no-underline bg-red-600 text-white hover:bg-red-500">
                    Logout
                </button>
            </form>
        </div>
    );
}