# Decisões Técnicas - ConexãoPro Next


## Framework

Foi escolhido Next.js por:

- organização por componentes;
- performance;
- facilidade de deploy;
- grande ecossistema.


## Linguagem

TypeScript será utilizado para:

- segurança de tipos;
- redução de erros;
- melhor manutenção.


## Banco e Backend

Supabase foi escolhido por fornecer:

- PostgreSQL;
- autenticação;
- armazenamento de arquivos;
- recursos em tempo real.


## Autenticação

O sistema utilizará Supabase Auth.

A senha nunca será armazenada em tabelas próprias.

Fluxo:

Usuário
↓
Supabase Auth
↓
Tabela usuarios


## Cadastro

O ConexãoPro não terá cadastro público.

Usuários serão cadastrados por administradores.


## Segurança

As tabelas utilizarão Row Level Security (RLS)
para controlar acesso aos dados.


## Interface

O sistema terá identidade própria:

- azul institucional;
- visual moderno;
- responsivo;
- inspirado em redes sociais profissionais.
