export const metadata = {
  title: "Other Work — Kyra Chhiu-Lim",
};

export default function OtherWorkPage() {
  const otherWorks = [
    "Holiday Card 24",
    "Kitty Craft Beats and Breaks",
    "Khmr Ny Poster 2026",
    "dp4 Release Party",
    "Sea Comedy NYC",
    "Valentines Day Card",
    "20Off Promo",
    "Monin Syrups 2025",
    "Launch Post Hybrids",
    "Minor Figures Oat",
    "Freshh Menu",
    "Holiday Blend Email",
    "Kiosk Mockup",
    "Diamond Torani",
    "Costa Rica Turrialba Stamp",
    "Costa Rica Valle Stamp",
    "Costa Rica West Valley Stamp",
    "Costa Rica Central Valley Stamp",
  ];

  return (
    <div className="px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {otherWorks.map((item, index) => (
            <div key={index} className="aspect-square bg-gray-200 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
