import Image from "next/image";
import { CVData } from "@/features/cv/domain/cv.types";

interface CVProps {
  data: CVData;
}

export default function CvPage({ data }: CVProps) {
  return (
    <div className="max-w-3xl mx-auto p-10 space-y-12 text-gray-800">
      {/* HEADER */}
      <header className="flex items-start gap-8">
        <div className="relative w-24 h-24">
          <Image
            src="/assets/photo.jpg"
            alt={data.name}
            fill
            className="object-cover rounded-lg shadow-md"
            sizes="112px"
            priority
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight leading-[1.2]">
            {data.name}
          </h1>

          <h2 className="text-lg text-gray-700 tracking-tight leading-[1.3]">
            {data.title}
          </h2>

          <div className="text-[13px] text-gray-600 leading-[1.35] space-y-1">
            <p>
              {data.location} - {data.phone} - {data.email}
            </p>

            <div className="flex items-center gap-4">
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                {data.linkedin}
              </a>

              <a href={data.github} target="_blank" rel="noopener noreferrer">
                {data.github}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section>
        <h3 className="text-base font-semibold tracking-tight text-gray-800 border-b border-accent pb-1">
          À propos
        </h3>
        <p className="mt-3 text-[14px] text-gray-700 leading-[1.45]">
          {data.about}
        </p>
      </section>

      {/* SKILLS */}
      <section>
        <h3 className="text-base font-semibold tracking-tight text-gray-800 border-b border-accent pb-1">
          Compétences clés
        </h3>

        <div className="mt-3 space-y-4">
          {Object.entries(data.skills).map(([category, items]) => (
            <div key={category} className="space-y-1">
              <h4 className="text-[15px] font-semibold text-gray-800 leading-[1.35]">
                {category}
              </h4>
              <p className="text-[14px] text-gray-700 leading-[1.45]">
                {items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section>
        <h3 className="text-base font-semibold tracking-tight text-gray-800 border-b border-accent pb-1">
          Expérience professionnelle
        </h3>

        <div className="mt-3 space-y-8">
          {data.experience.map((exp) => (
            <div key={exp.company} className="space-y-2">
              <h4 className="text-[15px] font-semibold text-gray-800 leading-[1.35]">
                {exp.company} - <span className="font-normal">{exp.role}</span>
              </h4>

              <p className="text-[13px] text-gray-500 leading-[1.35]">
                {exp.period}
              </p>

              {exp.intro && (
                <p className="text-[14px] text-gray-700 leading-[1.45]">
                  {exp.intro}
                </p>
              )}

              {exp.stack && !exp.missions && (
                <p className="text-[14px] text-gray-700 leading-[1.45]">
                  <span className="font-semibold">Stack :</span>{" "}
                  {exp.stack.join(", ")}
                </p>
              )}

              {!exp.missions && (
                <ul className="list-disc ml-6 space-y-1.5 text-[14px] text-gray-700 leading-[1.45] marker:text-accent">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              {exp.missions && (
                <div className="space-y-6">
                  {exp.missions.map((mission) => (
                    <div key={mission.company} className="space-y-1.5">
                      <h5 className="text-[14px] font-semibold text-gray-800 leading-[1.35]">
                        {mission.company} - {mission.role}
                      </h5>

                      <p className="text-[13px] text-gray-500 leading-[1.35]">
                        {mission.period}
                      </p>

                      <p className="text-[14px] text-gray-700 leading-[1.45]">
                        {mission.intro}
                      </p>

                      <p className="text-[14px] text-gray-700 leading-[1.45]">
                        <span className="font-semibold">Stack :</span>{" "}
                        {mission.stack.join(", ")}
                      </p>

                      <ul className="list-disc ml-6 space-y-1.5 text-[14px] text-gray-700 leading-[1.45] marker:text-accent">
                        {mission.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PREVIOUS EXPERIENCE */}
      <section>
        <h3 className="text-base font-semibold tracking-tight text-gray-800 border-b border-accent pb-1">
          Expériences antérieures
        </h3>

        <div className="mt-3 space-y-6">
          {data.previousExperience.map((exp) => (
            <div key={exp.company} className="space-y-1.5">
              <h4 className="text-[15px] font-semibold text-gray-800 leading-[1.35]">
                {exp.company} - {exp.role}
              </h4>

              <p className="text-[13px] text-gray-500 leading-[1.35]">
                {exp.period}
              </p>

              <p className="text-[14px] text-gray-700 leading-[1.45]">
                {exp.intro}
              </p>

              <ul className="list-disc ml-6 space-y-1.5 text-[14px] text-gray-700 leading-[1.45] marker:text-accent">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section>
        <h3 className="text-base font-semibold tracking-tight text-gray-800 border-b border-accent pb-1">
          Formation
        </h3>

        <div className="mt-3 space-y-1">
          <p className="text-[15px] font-semibold text-gray-800 leading-[1.35]">
            {data.education.school} - {data.education.title}
          </p>
          <p className="text-[14px] text-gray-700 leading-[1.45]">
            {data.education.details}
          </p>
        </div>
      </section>
    </div>
  );
}
