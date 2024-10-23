"use client";

import React from "react";
import { logout } from "@/app/server/actions/userControllers";

const Logout = () => {
  return (
    <form action={logout}>
      <button type="submit" className="rounded-md bg-indigo-700 p-2 text-white">
        Log Out
      </button>
    </form>
  );
};

export default Logout;
