"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className=" container mx-auto flex flex-col items-center justify-center h-screen">
      <h2 className=" font-heading text-red-800 mb-10">
        Something went wrong!
      </h2>
      <button onClick={() => reset()} className="btn-primary">
        {" "}
        Try again
      </button>
    </div>
  );
}
