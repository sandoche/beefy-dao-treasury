import Head from "next/head";
import { Inter } from "@next/font/google";
import sharedStrings from "@/locales/en/shared";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>{sharedStrings.title}</title>
        <meta name="description" content={sharedStrings.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">Hello treasury!</h1>
    </>
  );
}
