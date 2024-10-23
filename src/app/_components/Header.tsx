import { validateUserCookie } from "@/lib/getUser";
import Link from "next/link";
import Logout from "./Logout";

const Header = async () => {
  const user = await validateUserCookie();

  return (
    <nav className="flex h-14 items-center justify-between bg-violet-400 px-8 shadow-md">
      <p>Expenso</p>
      <div className="flex gap-3">{user && <Logout />}</div>
    </nav>
  );
};

export default Header;
