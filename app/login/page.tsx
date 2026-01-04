"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brown-900 flex flex-col items-center justify-center p-4">
      <div className="bg-cream-50 w-full max-w-md p-8 rounded-xl shadow-2xl border border-cream-200 text-center">
        
        <h1 className="text-2xl font-serif font-bold text-brown-900 mb-2">Espace Privé</h1>
        <p className="text-brown-800/80 mb-8 text-sm">
          Ce site est en cours de démonstration.<br/>
          Veuillez entrer le mot de passe pour accéder.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brown-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-cream-300 focus:outline-none focus:ring-2 focus:ring-brown-800 bg-white"
              placeholder="Mot de passe"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium animate-pulse">
              Mot de passe incorrect
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? "Vérification..." : "Entrer"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-cream-200">
           <p className="text-xs text-brown-400 uppercase tracking-widest">
             Aux 3 Saveurs • Avranches
           </p>
        </div>
      </div>
    </div>
  );
}
