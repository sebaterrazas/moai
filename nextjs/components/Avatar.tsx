

import { FaCircleUser } from "react-icons/fa6";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider
  } from '@chakra-ui/react'

import AuthUI from "./AuthUI";
import LogoutButton from "./LogoutButton";
import { MainContext } from './MainView';
import { useContext } from "react";

export default function Avatar() {
    const mainContext = useContext(MainContext);

    const user = mainContext.user;
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
                            <LogoutButton user={user}/>
                        </div>
                    </MenuList>
                </Menu>
            ) : (
                <Menu>
                    <MenuButton>
                        <FaCircleUser className="text-background bg-foreground w-10 h-10 rounded-full transition-transform focus:scale-125 hover:scale-125" />
                    </MenuButton>
                    <MenuList className="bg-background m-2 p-3 rounded">
                        <AuthUI />
                    </MenuList>
                </Menu>
            )}
        </div>
    );
}
