"use client";

import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function UserProfilePage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mb-2">
            ID
          </div>
          <CardTitle>Profil de l&apos;utilisateur #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            Bienvenue sur ton espace temporaire ! (Le rôle par défaut est bien
            configuré sur{" "}
            <span className="font-semibold text-slate-800">AUTHOR</span> côté
            BDD).
          </p>
          <div className="pt-4 border-t">
            <Link
              href="/users"
              className="text-sm text-blue-600 hover:underline"
            >
              ← Voir tous les membres
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
