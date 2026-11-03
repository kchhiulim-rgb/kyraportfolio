export default function Home() {
  return (
    <div
      className="min-h-[calc(100vh)] bg-repeat-y flex items-center justify-center"
      style={{ backgroundImage: 'url("/paper-texture.jpg")' }}
    >
      <div className="px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto py-16 md:py-24">
          <h1 className="font-heading font-bold text-[28px] md:text-[50px] tracking-wide mb-4 md:mb-6">
            KYRA CHHIU-LIM
          </h1>
          <div className="max-w-[1400px] space-y-3 md:space-y-4">
            <p className="font-body text-[18px] md:text-[36px] leading-relaxed">
              Art director and brand designer creating cohesive brand systems.
              Currently working with the Seattle Asian American Film Festival and
              Fulcrum Coffee Roasters. Open to freelance/contract or full-time work
              to create visual systems, print and packaging, or content creation.
            </p>
            <p className="font-body text-[18px] md:text-[36px] leading-relaxed">
              ☆ Based in Emeryville, CA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
