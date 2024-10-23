import Link from "next/link";

const Guest = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="mt-32 text-xl">
        Welcome, please sign in or sign up to start tracking your expenses.
      </h1>
      <div className="flex gap-5">
        <Link href="/login" className="rounded-md bg-indigo-700 p-2 text-white">
          Sign in
        </Link>
        <Link
          href="/register"
          className="rounded-md bg-indigo-700 p-2 text-white"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Guest;
