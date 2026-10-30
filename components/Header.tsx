import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative px-6 py-4 md:px-12 md:py-6">
      <nav className="flex items-center justify-between max-w-[1800px] mx-auto">
        <Link href="/about" className="font-space-grotesk text-sm tracking-wide hover:opacity-60 transition-opacity">
          About
        </Link>
        <Link href="/" className="block flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Kyra Chhiu-Lim"
            width={180}
            height={140}
            className="h-10 w-auto md:h-16"
            priority
          />
        </Link>
        <Link href="/work" className="font-space-grotesk text-sm tracking-wide hover:opacity-60 transition-opacity">
          Featured Work
        </Link>
      </nav>
    </header>
  );
}
