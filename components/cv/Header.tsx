import Image from "next/image";

export const Header = ({ data }: { data: any }) => {
  return (
    <header className="text-slate-500 flex gap-8 items-center">
      <div className="relative w-26 h-26">
        <Image
          src="/assets/photo.jpg"
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold leading-[1]">{data.name}</h1>
        <h2 className="text-xl tracking-tight leading-[1.2]">{data.title}</h2>
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
    </header>
  );
};
