import Head from 'next/head';
import Image from 'next/image';

export default function Index() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Head>
        <title>WELCOME TO HOTEL-AV</title>
      </Head>
      <h1>HOTEL MANAGEMENT APP!</h1>

      <Image
        src='/assets/icons/icon-512x512.png'
        alt='random cat'
        width={600}
        height={400}
      />
    </div>
  );
}
