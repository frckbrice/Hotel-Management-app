"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [testResult, setTestResult] = useState<any>(null);

  const testSanityConnection = async () => {
    try {
      const response = await fetch("/api/test-auth");
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Authentication Debug
        </h1>

        {/* Session Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Session Status
          </h2>
          <p className="mb-2">
            <strong>Status:</strong> {status}
          </p>
          {session ? (
            <div>
              <p>
                <strong>User:</strong> {session.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {session.user?.email}
              </p>
              <p>
                <strong>ID:</strong> {session.user?.id}
              </p>
              <button
                onClick={() => signOut()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Not signed in
              </p>
              <button
                onClick={() => signIn()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Test Sanity Connection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Test Sanity Connection
          </h2>
          <button
            onClick={testSanityConnection}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4"
          >
            Test Connection
          </button>
          {testResult && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <pre className="text-sm overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Environment Variables */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Environment Check
          </h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>NEXTAUTH_URL:</strong>{" "}
              {process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Not set"}
            </p>
            <p>
              <strong>NEXT_PUBLIC_SANITY_PROJECT_ID:</strong>{" "}
              {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "Not set"}
            </p>
            <p>
              <strong>NEXT_PUBLIC_SANITY_DATASET:</strong>{" "}
              {process.env.NEXT_PUBLIC_SANITY_DATASET || "Not set"}
            </p>
            <p>
              <strong>GITHUB_CLIENT_ID:</strong>{" "}
              {process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ? "Set" : "Not set"}
            </p>
            <p>
              <strong>GOOGLE_CLIENT_ID:</strong>{" "}
              {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "Set" : "Not set"}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Quick Actions
          </h2>
          <div className="space-x-4">
            <button
              onClick={() => signIn("github")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
            >
              Sign in with GitHub
            </button>
            <button
              onClick={() => signIn("google")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("credentials")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Sign in with Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
