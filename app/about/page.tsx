export const metadata = {
  title: "About | Visual Designer — Kyra Chhiu-Lim",
};

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh)] bg-white">
      <div className="px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto py-16 md:py-24">
          <div className="max-w-[1400px] mb-16 md:mb-24 mx-auto">
            <p className="font-body text-[18px] md:text-[36px] leading-relaxed">
              I design for consumer brands and community organizations, and the
              projects I care about most are the ones helping an independent artist
              or a small business owner grow. I enjoy creating designs that uplift stories,
              celebrate culture, and support causes that matter in my community.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Experience */}
            <div>
              <h3 className="font-heading font-bold text-lg md:text-xl uppercase tracking-[-0.02em] mb-6">
                Experience
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="font-heading font-semibold text-base">
                    Seattle Asian American Film Festival
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    Events Manager · July 2022 – June 2025
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    In-house Designer · Feb 2023 – July 2025
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    Art Director · July 2025 – Present
                  </p>
                </div>
                <div>
                  <p className="font-heading font-semibold text-base">
                    Fulcrum Coffee Roasters
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    Visual Designer &amp; Marketing Assistant · June 2024 – Oct 2026
                  </p>
                </div>
                <div>
                  <p className="font-heading font-semibold text-base">
                    Disposable Parts
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    Contributing Designer · Jan 2026 – Present
                  </p>
                </div>
                <div>
                  <p className="font-heading font-semibold text-base">
                    SEA Comedy Collective
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    Graphic Designer · Feb 2026 – Apr 2026
                  </p>
                </div>
                <div>
                  <p className="font-heading font-semibold text-base">
                    Meatspace Art Magazine
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    Staff Artist · 2020 – 2021
                  </p>
                </div>
                <div>
                  <p className="font-heading font-semibold text-base">
                    Hammer Theatre Center
                  </p>
                  <p className="font-body text-sm text-gray-600">
                    Graphic Designer · 2018 – 2020
                  </p>
                </div>
              </div>
            </div>

            {/* Collaborations */}
            <div>
              <h3 className="font-heading font-bold text-lg md:text-xl uppercase tracking-[-0.02em] mb-6">
                Collaborations
              </h3>
              <ul className="font-body space-y-0.5 text-base">
                <li>Filson</li>
                <li>Fulcrum Coffee Roasters</li>
                <li>Goodwill</li>
                <li>Khmer Community of Seattle King County</li>
                <li>Minor Figures</li>
                <li>Monin</li>
                <li>Seattle Asian American Film Festival</li>
                <li>Seattle Parks and Recreation</li>
                <li>Southeast Asian Comedy Club</li>
                <li>The International Examiner</li>
                <li>Torani</li>
                <li>World Coffee Research</li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading font-bold text-lg md:text-xl uppercase tracking-[-0.02em] mb-6">
                Services
              </h3>
              <ul className="font-body space-y-0.5 text-base">
                <li>Brand Identity</li>
                <li>Graphic Design</li>
                <li>Publication</li>
                <li>Motion</li>
                <li>Illustration</li>
                <li>Film Editing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
