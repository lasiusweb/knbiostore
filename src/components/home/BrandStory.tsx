import { MOCK_HOME_DATA } from '@/data/mock-home';

export function BrandStory() {
  const { brandStory } = MOCK_HOME_DATA;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-snug">{brandStory.headline}</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Founder Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20 bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="w-full md:w-1/3">
                <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden relative shadow-md">
                     {/* Founder Image Placeholder */}
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                        [P. Sudha Reddy Image]
                     </div>
                </div>
            </div>
            <div className="w-full md:w-2/3">
                <h3 className="text-3xl font-bold mb-2 text-foreground">{brandStory.founder.name}</h3>
                <p className="text-primary font-bold text-lg mb-6 uppercase tracking-wide">{brandStory.founder.title}</p>
                <p className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-primary pl-6 py-2 bg-white/50 rounded-r-lg">
                    "{brandStory.founder.bio}"
                </p>
            </div>
        </div>

        {/* Journey & Stats */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="bg-white p-8 rounded-2xl border shadow-sm h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="text-primary">📜</span> Our Journey
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">{brandStory.journey.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-primary p-6 rounded-2xl text-center text-primary-foreground shadow-lg transform hover:-translate-y-1 transition-transform">
                    <div className="text-4xl font-bold mb-2">{brandStory.stats.farmers}</div>
                    <div className="text-sm font-medium opacity-90">Farmers Trusted</div>
                </div>
                <div className="bg-white border border-gray-100 p-6 rounded-2xl text-center shadow-md">
                    <div className="text-4xl font-bold text-primary mb-2">{brandStory.stats.states}</div>
                    <div className="text-sm text-gray-600 font-medium">States Covered</div>
                </div>
                <div className="bg-white border border-gray-100 p-6 rounded-2xl text-center shadow-md">
                    <div className="text-4xl font-bold text-primary mb-2">{brandStory.stats.villages}</div>
                    <div className="text-sm text-gray-600 font-medium">Villages Reached</div>
                </div>
                 <div className="bg-secondary p-6 rounded-2xl text-center text-secondary-foreground shadow-md">
                    <div className="text-4xl font-bold mb-2">{brandStory.stats.womenEmpowered}</div>
                    <div className="text-sm font-medium">Women Empowered</div>
                </div>
            </div>
        </div>

        {/* Certifications */}
        <div className="border-t pt-12 text-center">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Recognized & Certified By</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {brandStory.certifications.map((cert, index) => (
                    <span key={index} className="px-6 py-3 bg-white shadow-sm rounded-full text-sm font-bold text-gray-700 border flex items-center gap-2">
                        <span className="text-green-500">✔</span> {cert}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
