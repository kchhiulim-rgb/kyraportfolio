import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 py-12 md:px-12 md:py-16 bg-white">
      <div className="max-w-[1800px] mx-auto text-center space-y-4">
        <div>
          <Link
            href="/work"
            className="font-body text-sm tracking-widest hover:opacity-60 transition-opacity"
          >
            FEATURED WORK
          </Link>
        </div>
        <div>
          <Link
            href="/other-work"
            className="font-body text-sm tracking-widest hover:opacity-60 transition-opacity"
          >
            Other Works
          </Link>
        </div>
        <div>
          <a
            href="mailto:kyrachhiulim@gmail.com"
            className="font-body text-sm tracking-wide hover:opacity-60 transition-opacity"
          >
            kyrachhiulim@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
