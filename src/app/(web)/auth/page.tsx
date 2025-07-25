"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};
const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = (props: Props) => {
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyle =
    " border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();

  // console.log(session);
  useEffect(() => {
    if (session) router.push("/");
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      //! push the user to the home page
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("something when wrong");
    }
  };

  const submitData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(formData);
      const res = await fetch("/api/sanity/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Success. Please login");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setFormData(defaultFormData);
    }
  };
  return (
    //* leading-tight  space-y-6  tracking-tight
    <section className="container mx-auto ">
      <div className=" p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className=" flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an Account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              className=" mr-3 text-4xl cursor-pointer text-black dark:text-white"
              onClick={loginHandler}
            />{" "}
            |{" "}
            <FcGoogle
              className="ml-3 text-4xl cursor-pointer"
              onClick={loginHandler}
            />
          </span>
        </div>
        <form className=" space-y-4 md:space-y-6" onSubmit={submitData}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="your name"
            required
            className={inputStyle}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@compagny.com"
            required
            className={inputStyle}
            // autoComplete="off"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            minLength={6}
            className={inputStyle}
            // autoComplete="off"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
        </form>
        <button className="text-blue-700 underline" onClick={loginHandler}>
          Login
        </button>
      </div>
    </section>
  );
};

export default Auth;
