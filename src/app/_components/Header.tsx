import { validateUserCookie } from "@/lib/getUser";
import Link from "next/link";
import Logout from "./Logout";

const Header = async () => {
  const user = await validateUserCookie();

  console.log(user);
  return (
    <nav className="flex h-14 items-center justify-between bg-violet-400 px-8 shadow-md">
      <h2 className="font-extrabold">BUDGET⋅TO</h2>
      <div className="flex gap-3">
        {user ? (
          <Logout />
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full bg-indigo-600 p-2 font-semibold text-white"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-indigo-600 p-2 font-semibold text-white"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
