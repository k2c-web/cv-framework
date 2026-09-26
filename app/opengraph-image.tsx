import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import profile from "@/data/profile.json";

/**
 * Carte Open Graph 1200x630, generee au build par next/og
 * (Satori + Resvg, embarques dans Next : aucune dependance a installer).
 *
 * Contraintes Satori a garder en tete en editant ce fichier :
 * - flexbox uniquement, pas de CSS Grid ;
 * - tout element a plusieurs enfants a besoin d'un `display: flex` explicite
 *   et d'un `flexDirection`, sinon Satori n'applique pas le layout ;
 * - pas de classes Tailwind, uniquement des styles inline ;
 * - les polices sechargent par fichier, d'ou les TTF dans assets/fonts/.
 */

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CHIPS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Design Systems",
];

// Palette reprise de app/globals.css (@theme) pour que la carte et le CV
// parlent vraiment la meme langue visuelle.
const INK = "#111827"; // gray-900
const INK_SOFT = "#374151"; // gray-700
const MUTED = "#6b7280"; // gray-500
const HAIRLINE = "#e5e7eb"; // gray-200
const SURFACE = "#fafafa"; // gray-50
const ACCENT = "#4f6fa9"; // --accent-dark de sprint-board

export default async function Image() {
  const [regular, medium, bold, photo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Geist-Medium.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Geist-Bold.ttf")),
    readFile(join(process.cwd(), "public/assets/photo.jpg")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: SURFACE,
          backgroundImage: `linear-gradient(135deg, ${SURFACE} 0%, #ffffff 45%, #eef1f5 100%)`,
          padding: "64px 72px",
          fontFamily: "Geist",
        }}
      >
        {/* Filet d'accent en haut de carte */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundImage: `linear-gradient(90deg, ${ACCENT} 0%, #7c96c4 50%, ${HAIRLINE} 100%)`,
          }}
        />

        {/* Identite : photo + nom + titre */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div
            style={{
              display: "flex",
              width: 168,
              height: 168,
              borderRadius: 28,
              overflow: "hidden",
              border: `1px solid ${HAIRLINE}`,
              backgroundColor: "#ffffff",
            }}
          >
            {/* Data URL plutot qu'un ArrayBuffer : `src` reste type `string`,
                donc aucun cast ni @ts-expect-error. Satori decode le base64. */}
            <img
              src={`data:image/jpeg;base64,${photo.toString("base64")}`}
              width={168}
              height={168}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 62,
                fontWeight: 700,
                color: INK,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: ACCENT,
                lineHeight: 1.2,
              }}
            >
              {profile.title}
            </div>
            <div style={{ fontSize: 24, color: MUTED, lineHeight: 1.3 }}>
              {profile.subtitle}
            </div>
          </div>
        </div>

        {/* Compétences, une ligne de pastilles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {CHIPS.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                borderRadius: 999,
                border: `1px solid ${HAIRLINE}`,
                backgroundColor: "rgba(255,255,255,0.78)",
                fontSize: 21,
                fontWeight: 500,
                color: INK_SOFT,
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Pied de carte : separator + coordonnees */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              height: 1,
              backgroundColor: HAIRLINE,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 21,
              color: MUTED,
            }}
          >
            <div style={{ display: "flex", gap: 18 }}>
              <span>{profile.location}</span>
              <span style={{ color: HAIRLINE }}>|</span>
              <span>8+ ans d&apos;expérience</span>
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              <span>{profile.github}</span>
              <span style={{ color: HAIRLINE }}>|</span>
              <span>cv.kamil.dev</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
