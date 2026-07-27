"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Perfil = {
  nome: string;
  cargo: string | null;
};

type Post = {
  id: string;
  conteudo: string;
  created_at: string;
  user_id: string;
};

export default function FeedPage() {
  const router = useRouter();

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [novoPost, setNovoPost] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [publicando, setPublicando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function iniciarFeed() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/");
        return;
      }

      setUserId(session.user.id);

      const { data: perfilData, error: perfilError } = await supabase
        .from("profiles")
        .select("nome, cargo")
        .eq("user_id", session.user.id)
        .single();

      if (perfilError) {
        console.error("Erro ao carregar perfil:", perfilError);
      } else {
        setPerfil(perfilData);
      }

      await carregarPosts();
      setCarregando(false);
    }

    iniciarFeed();
  }, [router]);

  async function carregarPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar posts:", error);
      setErro("Não foi possível carregar as publicações.");
      return;
    }

    setPosts((data as Post[]) || []);
  }

  async function publicar() {
    setErro("");

    const conteudo = novoPost.trim();

    if (!conteudo) {
      setErro("Escreva alguma coisa antes de publicar.");
      return;
    }

    if (!userId) {
      setErro("Sua sessão não foi encontrada.");
      return;
    }

    setPublicando(true);

    const { error } = await supabase.from("posts").insert({
      user_id: userId,
      conteudo,
    });

    setPublicando(false);

    if (error) {
      console.error("Erro ao publicar:", error);
      setErro("Não foi possível publicar agora.");
      return;
    }

    setNovoPost("");
    await carregarPosts();
  }

  async function sair() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  function formatarData(data: string) {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(data));
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">Carregando ConexãoPro...</p>
      </main>
    );
  }

  const primeiroNome = perfil?.nome?.split(" ")[0] || "Aluno";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">ConexãoPro</h1>

            <p className="text-sm text-slate-400">
              Rede social da comunidade SENAI
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="font-semibold text-white">{perfil?.nome}</p>

              <p className="text-sm capitalize text-slate-400">
                {perfil?.cargo || "aluno"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold">
              {primeiroNome.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={sair}
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 font-semibold text-red-300 transition hover:bg-red-500/20"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr_300px]">
        <aside className="hidden lg:block">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Navegação</h2>

            <nav className="mt-5 space-y-2 text-sm">
              <button className="w-full rounded-xl bg-blue-600/20 px-4 py-3 text-left font-medium text-blue-300">
                🏠 Feed
              </button>

              <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5">
                👤 Meu perfil
              </button>

              <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5">
                🎓 Cursos
              </button>

              <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5">
                📅 Eventos
              </button>

              <button className="w-full rounded-xl px-4 py-3 text-left text-slate-300 hover:bg-white/5">
                💼 Oportunidades
              </button>
            </nav>
          </div>
        </aside>

        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Olá, {primeiroNome} 👋</h2>

            <p className="mt-2 text-slate-400">
              Veja o que está acontecendo na comunidade do SENAI.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold">
                {primeiroNome.charAt(0).toUpperCase()}
              </div>

              <div className="w-full">
                <textarea
                  value={novoPost}
                  onChange={(event) => setNovoPost(event.target.value)}
                  placeholder="Compartilhe um projeto, uma dúvida ou uma conquista..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />

                {erro && (
                  <p className="mt-3 text-sm text-red-300">{erro}</p>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={publicar}
                    disabled={publicando}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {publicando ? "Publicando..." : "Publicar"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
                Ainda não há publicações. Seja o primeiro a publicar.
              </div>
            ) : (
              posts.map((post) => {
                const autor =
                  post.user_id === userId
                    ? perfil?.nome || "Membro ConexãoPro"
                    : "Membro ConexãoPro";

                const cargo =
                  post.user_id === userId
                    ? perfil?.cargo || "aluno"
                    : "aluno";

                const inicial = autor.charAt(0).toUpperCase();

                return (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold">
                        {inicial}
                      </div>

                      <div>
                        <h3 className="font-semibold">{autor}</h3>

                        <p className="text-sm capitalize text-slate-400">
                          {cargo} · {formatarData(post.created_at)}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-200">
                      {post.conteudo}
                    </p>

                    <div className="mt-5 flex gap-6 border-t border-white/10 pt-4 text-sm text-slate-400">
                      <button className="transition hover:text-blue-400">
                        👍 Curtir
                      </button>

                      <button className="transition hover:text-blue-400">
                        💬 Comentar
                      </button>

                      <button className="transition hover:text-blue-400">
                        ↗ Compartilhar
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <aside className="hidden xl:block">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="font-semibold">Destaques</h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-slate-900 p-4">
                <p className="text-sm font-semibold text-blue-300">Cursos</p>

                <p className="mt-1 text-sm text-slate-400">
                  Descubra novas formações disponíveis.
                </p>
              </div>

              <div className="rounded-xl bg-slate-900 p-4">
                <p className="text-sm font-semibold text-emerald-300">
                  Projetos
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Conheça trabalhos desenvolvidos pelos alunos.
                </p>
              </div>

              <div className="rounded-xl bg-slate-900 p-4">
                <p className="text-sm font-semibold text-amber-300">
                  Oportunidades
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Vagas, eventos e conexões profissionais.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}