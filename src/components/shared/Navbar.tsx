import sharedStrings from "@/locales/en/shared";
import Container from "@/components/shared/Container";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-6 border-b border-brand mb-8">
      <Container>
        <Link href="/" className="text-xl uppercase">
          (₿) {sharedStrings.title}
        </Link>
      </Container>
    </nav>
  );
}
