import Image from "next/image";

export const Header = ({ data }: { data: any }) => {
  return (
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

        <h2 className="text-xl text-gray-700 tracking-tight leading-[1.3]">
          {data.title}
        </h2>

        <div className="text-[13px] text-gray-600 leading-[1.35] space-y-1">
          <p>
            {data.location} | {data.phone} | {data.email}
          </p>

          <div className="flex items-center gap-1">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
              {data.linkedin}
            </a>
            |
            <a href={data.github} target="_blank" rel="noopener noreferrer">
              {data.github}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
