"use client";

import React from "react";
import { logout } from "@/app/server/actions/userControllers";

const Logout = () => {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-full bg-indigo-600 p-2 font-semibold text-white"
      >
        Log Out
      </button>
    </form>
  );
};

export default Logout;
