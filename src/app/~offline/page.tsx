import Head from "next/head";
import LazyImage from "@/components/optimization/LazyImage";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>WELCOME TO HOTEL-AV</title>
      </Head>
      <h1>HOTEL MANAGEMENT APP!</h1>

      <LazyImage
        src="/assets/icons/icon-512x512.png"
        alt="Hotel Management App Icon"
        width={600}
        height={400}
        placeholderText="Hotel Management App"
        showPlaceholderText={true}
        priority={true}
        quality={90}
      />
    </div>
  );
}
