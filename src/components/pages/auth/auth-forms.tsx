"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ZodError } from "zod";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status, update } = useSession(); //  add update
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const inputStyle =
    "border border-gray-300 dark:border-gray-600 sm:text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Debug log
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Auth form session status:", status);
      console.log("Auth form session data:", session);
    }
  }, [session, status]);

  // redirect after login if a callback is passed
  useEffect(() => {
    if (session && callbackUrl !== "/") {
      router.push(callbackUrl);
    }
  }, [session, callbackUrl, router]);

  const githubLoginHandler = async () => {
    try {
      setIsLoading(true);
      await signIn("github", { callbackUrl });
      await update();
    } catch (error) {
      console.error("GitHub OAuth error:", error);
      toast.error("GitHub authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLoginHandler = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl });
      await update();
    } catch (error) {
      console.error("Google OAuth error:", error);
      toast.error("Google authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const credentialsLoginHandler = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Login successful!");

        // Force a session refresh and wait for it to complete
        const updatedSession = await update();
        console.log("Updated session before:", updatedSession);
        // Only redirect after session is confirmed updated
        if (updatedSession) {
          console.log("Updated session after:", updatedSession);
          router.push(callbackUrl);
          router.refresh(); // Refresh the page to update all components
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (isSignUp) {
        const res = await fetch("/api/sanity/signUp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const contentType = res.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          console.error("Non-JSON response:", await res.text());
          toast.error("Server error - please try again");
          return;
        }

        const data = await res.json();
        if (res.ok && data.success) {
          toast.success("Account created successfully! Please login.");
          setIsSignUp(false);
          setFormData(defaultFormData);
        } else {
          const errorMessage =
            data.error instanceof ZodError
              ? data.error.issues[0].message
              : typeof data.error === "string"
                ? data.error
                : "Signup failed";
          toast.error(errorMessage);
        }
      } else {
        await credentialsLoginHandler();
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // If already logged in
  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <section className="container mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto rounded-2xl shadow-xl text-center">
            <h1 className="text-xl font-bold md:text-2xl text-gray-800 dark:text-white mb-4">
              Welcome back, {session.user?.name || session.user?.email}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You are successfully authenticated.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Go to Home
              </button>
              {callbackUrl !== "/" && (
                <button
                  onClick={() => router.push(callbackUrl)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Continue to{" "}
                  {callbackUrl === "/rooms"
                    ? "Rooms"
                    : callbackUrl === "/gallery"
                      ? "Gallery"
                      : "Requested Page"}
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default form
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="container mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto rounded-2xl shadow-xl">
          <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
            <h1 className="text-xl font-bold md:text-2xl text-gray-800 dark:text-white">
              {isSignUp ? "Create an Account" : "Sign In"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">OR</p>
            <span className="inline-flex items-center">
              <AiFillGithub
                className="mr-3 text-4xl cursor-pointer text-gray-800 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
                onClick={githubLoginHandler}
              />{" "}
              |{" "}
              <FcGoogle
                className="ml-3 text-4xl cursor-pointer hover:scale-110 transition-transform"
                onClick={googleLoginHandler}
              />
            </span>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={submitData}>
            {isSignUp && (
              <input
                type="text"
                name="name"
                placeholder="your name"
                required
                className={inputStyle}
                value={formData.name}
                onChange={handleInputChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              required
              className={inputStyle}
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              minLength={6}
              className={inputStyle}
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <button
            type="button"
            className="text-green-600 dark:text-green-400 underline hover:text-green-700 dark:hover:text-green-300 transition-colors"
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={isLoading}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Auth;
