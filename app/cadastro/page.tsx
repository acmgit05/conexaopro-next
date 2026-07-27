'use client';

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

    if (!nome || !matricula || !dataNascimento) {
      setErro('Preencha todos os campos.');
      return;
    }

    setCarregando(true);

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

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
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
    <main>
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="matricula">Matrícula</label>
          <input
            id="matricula"
            type="text"
            value={matricula}
            onChange={(event) => setMatricula(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dataNascimento">Data de nascimento</label>
          <input
            id="dataNascimento"
            type="date"
            value={dataNascimento}
            onChange={(event) => setDataNascimento(event.target.value)}
          />
        </div>

        {erro && <p>{erro}</p>}
        {sucesso && <p>{sucesso}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <Link href="/">Voltar para o login</Link>
    </main>
  );
}