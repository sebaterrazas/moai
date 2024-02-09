import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";

export default function Avatar({user} : {user?: any}) {

  return (
    <div className="py-2">
        {user ? (
            <Link
                href="/profile"
            >
                <img
                    src={user.user_metadata.avatar_url}
                    alt="User profile picture"
                    className="w-10 h-10 rounded-full transition-transform focus:scale-125 hover:scale-125"
                />
            </Link>
        ) : (
            <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
                <FaCircleUser className="text-2xl" />
            </Link>
        )}
    </div>
  );
}
