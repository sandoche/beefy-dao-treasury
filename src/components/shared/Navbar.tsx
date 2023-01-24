import sharedStrings from "@/locales/en/shared";
import Container from "@/components/shared/Container";
import Link from "next/link";

export default function Navbar() {
  return (
    <Container>
      <nav>
        <Link href="/">{sharedStrings.title}</Link>
      </nav>
    </Container>
  );
}
