import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";
import sharedStrings from "@/locales/en/shared";
import homeStrings from "@/locales/en/home";
import Link from "next/link";

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
      <Navbar />
      <section>
        <Container>
          <>
            <h1 className="text-3xl font-bold">{homeStrings.headline}</h1>
            <Link href="/treasury">{homeStrings.button}</Link>
          </>
        </Container>
      </section>
    </>
  );
}
