"use client";

import { useState } from "react";
import { Shield, Lock, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.verified) {
        window.location.href = "/admin";
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Senha incorreta");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erro de conexão");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center p-4">
      <motion.div
        className="glass-card rounded-2xl p-8 sm:p-10 w-full max-w-md text-center space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 0.68, 0.35, 1] }}
      >
        {/* Decorative blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cognac/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-cognac/10 border border-cognac/20 flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-cognac" strokeWidth={1.5} />
          </div>

          <h1 className="font-tusker text-2xl sm:text-3xl text-bone">
            Administração
          </h1>
          <p className="text-sm text-bone/40 font-poppins mt-2">
            Digite sua senha para acessar o painel
          </p>

          {/* Error message */}
          {status === "error" && (
            <motion.div
              className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-400 font-poppins">{errorMsg}</p>
            </motion.div>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-bone/25" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-white/5 border border-border/30 rounded-xl pl-11 pr-11 py-3 text-sm text-bone font-poppins outline-none focus:border-cognac/40 transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-bone/25 hover:text-bone/50 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full glow-cognac"
              disabled={status === "loading" || !password.trim()}
            >
              {status === "loading" ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Lock className="mr-2 h-5 w-5" />
              )}
              Entrar
            </Button>
          </form>

          <a
            href="/"
            className="inline-block mt-6 text-xs text-bone/30 hover:text-bone/50 transition-colors font-poppins"
          >
            ← Voltar ao site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
