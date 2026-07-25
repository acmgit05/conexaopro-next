# Banco de Dados - ConexãoPro Next

## Tecnologia

Banco de dados:
PostgreSQL

Backend:
Supabase

Autenticação:
Supabase Auth


# Estrutura inicial


## usuarios

Tabela complementar ao Supabase Auth.

Responsável pelos dados do perfil.

Campos:

- id
- auth_id
- nome
- email
- curso
- turma
- tipo
- foto
- ativo
- created_at


## cursos

Cursos oferecidos.

Campos:

- id
- nome
- descricao
- icone


## turmas

Turmas vinculadas aos cursos.

Campos:

- id
- curso_id
- nome
- turno


## posts

Publicações do feed.

Campos:

- id
- usuario_id
- texto
- imagem
- arquivo
- created_at


## comentarios

Comentários das publicações.

Campos:

- id
- post_id
- usuario_id
- texto
- created_at


## likes

Curtidas.

Campos:

- id
- post_id
- usuario_id


## noticias

Informações exibidas no ticker superior.

Campos:

- id
- titulo
- mensagem
- ativo
- created_at


## eventos

Calendário acadêmico.

Campos:

- id
- titulo
- descricao
- data
- criado_por


# Relacionamentos

usuarios
 |
 ├── posts
 |
 ├── comentarios
 |
 └── likes


cursos
 |
 └── turmas
