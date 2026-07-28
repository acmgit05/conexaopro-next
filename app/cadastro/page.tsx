'use client';
import { MATRICULAS_VALIDAS } from '@/lib/matriculas';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro('');
    setSucesso('');

    if (!nome.trim() || !matricula.trim() || !dataNascimento) {
      setErro('Preencha todos os campos.');
      return;
    }

    setCarregando(true);

    if (!MATRICULAS_VALIDAS.includes(matricula.trim())) {
      setErro('Matrícula não autorizada.');
      setCarregando(false);
      return;
    }

    const email = `${matricula.trim()}@conexaopro.com`;
    const senha = dataNascimento;

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome: nome.trim(),
          matricula: matricula.trim(),
          data_nascimento: dataNascimento,
        },
      },
    });

    if (error) {
      setCarregando(false);
      setErro(error.message);
      return;
    }

    if (!data.user) {
      setCarregando(false);
      setErro('O usuário foi criado, mas o identificador não foi retornado.');
      return;
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      user_id: data.user.id,
      nome: nome.trim(),
      matricula: matricula.trim(),
      data_nascimento: dataNascimento,
      cargo: 'aluno',
    });

    setCarregando(false);

    if (profileError) {
      setErro(
        `Usuário criado, mas o perfil não foi salvo: ${profileError.message}`
      );
      return;
    }

    setSucesso('Cadastro realizado com sucesso.');
    setNome('');
    setMatricula('');
    setDataNascimento('');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold shadow-lg shadow-blue-600/30">
            CP
          </div>

          <h1 className="text-3xl font-bold">Crie sua conta</h1>

          <p className="mt-2 text-sm text-slate-400">
            Entre para a comunidade ConexãoPro
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Nome completo
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Digite seu nome completo"
                autoComplete="name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="matricula"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Matrícula
              </label>

              <input
                id="matricula"
                type="text"
                inputMode="numeric"
                value={matricula}
                onChange={(event) => setMatricula(event.target.value)}
                placeholder="Digite sua matrícula"
                autoComplete="username"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                type="date"
                value={dataNascimento}
                onChange={(event) => setDataNascimento(event.target.value)}
                autoComplete="bday"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {erro && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {erro}
              </div>
            )}

            {sucesso && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {sucesso}
              </div>
            )}

           <button
                 type="submit"
                 disabled={carregando}
                 className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                 >
            {carregando ? "Cadastrando..." : "Criar conta"}
          </button>
            

          </form>

          <div className="my-6 h-px bg-slate-800" />

          <p className="text-center text-sm text-slate-400">
            Já possui uma conta?{' '}
            <Link
              href="/"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Voltar para o login
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Acesso exclusivo para matrículas autorizadas.
        </p>
      </section>
    </main>
  );
}