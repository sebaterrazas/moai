'use client';

import { signOut } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react'

export default function LogoutButton({ user }: { user: any }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        await signOut();
    };

    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
        }
    }, [user]);
    
    return (
        <div onClick={handleSignOut} className="py-2 px-4 rounded-md no-underline bg-red-600 text-white flex items-center gap-2 hover:bg-red-500 cursor-pointer">
            {isLoading && (<Spinner size='sm'/>)} Logout
        </div>
    );
}
