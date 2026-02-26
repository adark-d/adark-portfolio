import { Fingerprint, Globe2, MapPin, Building2, GraduationCap, Trophy } from 'lucide-react'
import { personalInfo, experience, awards } from '@/data/content'

export default function About() {
  return (
    <section id="about" className="border-y border-stone-200 bg-white px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <h2 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-stone-400 uppercase md:text-sm">
              <Fingerprint className="h-4 w-4" /> The Human Element
            </h2>
            <h3 className="mb-6 font-serif text-3xl leading-tight text-stone-900 md:text-4xl">
              Great engineering is fundamentally personal.
            </h3>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-[#FAF9F6] px-4 py-2 text-xs font-medium text-stone-600 md:text-sm">
                <Globe2 className="h-4 w-4 text-orange-600" /> {personalInfo.heritage} Heritage
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-[#FAF9F6] px-4 py-2 text-xs font-medium text-stone-600 md:text-sm">
                <MapPin className="h-4 w-4 text-orange-600" /> Based in {personalInfo.location}
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-stone prose-base md:prose-lg max-w-none lg:col-span-7">
          <p className="mb-8 text-lg leading-relaxed text-stone-600 md:text-xl">
            {personalInfo.philosophy}
          </p>

          <div className="mt-12 space-y-10 md:mt-16 md:space-y-12">
            {experience.map((exp, idx) => (
              <div key={idx} className="group flex flex-col gap-2 sm:flex-row sm:gap-8">
                <div className="mb-2 flex flex-shrink-0 items-center gap-3 pt-1 text-xs font-bold tracking-widest text-stone-400 uppercase sm:mb-0 sm:w-32 sm:flex-col sm:items-start sm:gap-0 md:text-sm">
                  <span className="rounded-lg border border-stone-100 bg-stone-50 p-2 text-stone-400 sm:mb-2">
                    {exp.type === 'work' ? (
                      <Building2 className="h-4 w-4" />
                    ) : (
                      <GraduationCap className="h-4 w-4" />
                    )}
                  </span>
                  <span>{exp.date}</span>
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold text-stone-900 md:text-xl">{exp.title}</h4>
                  <p className="mb-2 text-sm font-medium text-orange-700 md:mb-3 md:text-base">
                    {exp.org}
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-stone-600 md:text-base">
                    {exp.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-stone-100 px-3 py-1 text-[10px] font-medium text-stone-500 md:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-stone-100 pt-10 md:mt-20 md:pt-12">
            <h3 className="mb-6 flex items-center gap-3 font-serif text-2xl text-stone-900 md:mb-8">
              <Trophy className="h-5 w-5 text-orange-600 md:h-6 md:w-6" /> Hackathons & Recognition
            </h3>
            <div className="space-y-6 md:space-y-8">
              {awards.map((award, idx) => (
                <div key={idx} className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                  <div className="flex-shrink-0 pt-1 text-xs font-bold tracking-widest text-stone-400 uppercase sm:w-32 md:text-sm">
                    {award.date}
                  </div>
                  <div>
                    <h4 className="mb-1 text-base font-bold text-stone-900 md:mb-2 md:text-lg">
                      {award.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-stone-600 md:text-base">
                      {award.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
