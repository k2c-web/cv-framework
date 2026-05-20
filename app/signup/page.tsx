"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SignUpPage() {
  const router = useRouter();

  // 1. Définition du formulaire via React Hook Form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Mutation React Query pour appeler ton Fastify
  const signupMutation = useMutation({
    mutationFn: async (values) => {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Redirection vers la page profil temporaire de l'utilisateur créé
      router.push(`/users/${data.id}`);
    },
  });

  // 3. Soumission du formulaire
  const onSubmit = (values) => {
    signupMutation.mutate(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            Devenez auteur sur notre magnifique plateforme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <FormControl>
                      <Input placeholder="JohnDoe" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {signupMutation.isError && (
                <p className="text-sm font-medium text-destructive">
                  Une erreur est survenue lors de l'inscription.
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? "Création..." : "S'inscrire"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
