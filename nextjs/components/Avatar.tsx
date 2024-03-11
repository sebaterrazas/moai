import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Divider,
    MenuGroup,
    MenuDivider
  } from '@chakra-ui/react'

import { signOut } from "@/lib/actions";

export default function Avatar({user} : {user?: any}) {

  return (
    <div className="py-2">
        {user ? (
            <Menu>
                <MenuButton>
                    <img
                        src={user.user_metadata.avatar_url}
                        alt="User profile picture"
                        className="w-10 h-10 rounded-full"
                    />
                </MenuButton>
                <MenuList className="bg-background m-2 p-3 rounded">
                <MenuGroup title='Trips'>
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Help'>
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                    <div className="flex justify-center mt-3 w-full">
                        <div onClick={signOut} className="py-2 px-4 rounded-md no-underline bg-red-600 text-white hover:bg-red-500">
                            Logout
                        </div>
                    </div>
                </MenuList>
            </Menu>
        ) : (
            <Link
                href="/login"
            >
                <FaCircleUser className="text-background bg-foreground w-10 h-10 rounded-full transition-transform focus:scale-125 hover:scale-125" />
            </Link>
        )}
    </div>
  );
}
