"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersListPage() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/users");
      if (!res.ok) throw new Error("Impossible de charger les utilisateurs");
      return res.json();
    },
  });

  if (isLoading)
    return <div className="p-8 text-center">Chargement des profils...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Erreur de chargement.</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Membres de la plateforme</h1>
        <Link href="/signup" className="text-sm text-blue-600 hover:underline">
          Créer un compte
        </Link>
      </div>

      <div className="grid gap-3">
        {users?.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <p className="text-sm text-slate-500">{user.email}</p>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {users?.length === 0 && (
          <p className="text-slate-500 text-center py-8">
            Aucun utilisateur pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
