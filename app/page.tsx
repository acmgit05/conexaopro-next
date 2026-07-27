"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [matricula, setMatricula] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");

    if (!matricula || !dataNascimento) {
      setErro("Preencha todos os campos.");
      return;
    }

    setCarregando(true);

    const email = `${matricula.trim()}@conexaopro.com`;
    const senha = dataNascimento;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setErro("Matrícula ou data de nascimento inválida.");
      return;
    }

    router.push("/feed");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Entrar no ConexãoPro
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Use sua matrícula e sua data de nascimento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="matricula"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Número da matrícula
            </label>

            <input
              id="matricula"
              name="matricula"
              type="text"
              inputMode="numeric"
              value={matricula}
              onChange={(event) => setMatricula(event.target.value)}
              placeholder="Digite sua matrícula"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="dataNascimento"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Data de nascimento
            </label>

            <input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              value={dataNascimento}
              onChange={(event) => setDataNascimento(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {erro && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Ainda não possui cadastro?{" "}
          <Link
            href="/cadastro"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Faça seu cadastro
          </Link>
        </p>
      </section>
    </main>
  );
}