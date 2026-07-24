Essa é uma preocupação muito válida. Vamos resolver isso agora para não depender da memória desta conversa.

Eu não consigo garantir que esta conversa ficará disponível para sempre, principalmente considerando que você está no modo gratuito e pode haver limitações de histórico, modelo ou acesso. Então o melhor caminho é criar um documento de continuidade do projeto.

Vou deixar aqui um "documento de passagem" que você pode copiar e salvar em um arquivo chamado:

CONEXAOPRO_NEXT_PLANO.md


ou no próprio GitHub dentro de uma pasta docs/.

ConexãoPro Next — Documento do Projeto
Visão

O ConexãoPro é uma rede social acadêmica para o SENAI Barreto.

Objetivo:

conectar alunos e professores;
compartilhar projetos;
divulgar cursos e eventos;
criar um portfólio acadêmico dos alunos.

Domínio:

conexaopro.dev.com.br

Decisão do projeto

Não continuar o protótipo antigo.

Criar novo projeto:

conexaopro-next


O projeto antigo permanece:

conexaopro


como histórico/protótipo.

Stack definida

Frontend:

Next.js 15
TypeScript
TailwindCSS
Shadcn/UI
Lucide Icons
Framer Motion

Backend:

Supabase
PostgreSQL
Supabase Auth
Storage
Realtime

Deploy:

Vercel
Arquitetura de autenticação

Usar:

Supabase Auth

       ↓

auth.users

       ↓

usuarios/profile

       ↓

posts
comentarios
likes
eventos


Não armazenar senha em tabela própria.

Cadastro:

Administrador cria usuários.

Usuário solicita acesso ou recebe credenciais iniciais.

Tela inicial

Conceito:

Inspirada no Facebook moderno, porém institucional.

Layout:

------------------------------------------------

CARROSSEL DE IMAGENS       LOGIN

Projetos SENAI             ConexãoPro

Robótica                   Email

Mecânica                   Senha

Elétrica                   Entrar

Projetos                   Primeiro acesso

------------------------------------------------


Carrossel:

projetos;
laboratórios;
alunos;
cursos;
eventos.

Frases:

"Transformando conhecimento em oportunidades"

"Conectando talentos"

"Seu projeto começa aqui"

Dashboard após login

Estrutura:

------------------------------------------------
Logo       Notícias correndo       Perfil

------------------------------------------------

Menu        Feed                 Calendário

Cursos      Posts                Eventos

Perfil                           Usuários online

Mensagens

Vagas

Certificados

------------------------------------------------

Funcionalidades MVP

Entrega inicial:

Login
Cadastro admin
Perfis
Feed
Posts
Curtidas
Comentários
Notícias estilo B3
Calendário
Painel administrativo

Futuro:

Chat realtime
Notificações
Portfólio completo
Vagas
Certificados
Banco inicial

Tabelas:

usuarios

id
auth_id
nome
email
curso
turma
tipo
foto
ativo


posts

id
usuario_id
texto
imagem
arquivo
created_at


comentarios

id
post_id
usuario_id
texto


likes

id
post_id
usuario_id


noticias

id
titulo
texto
ativo


eventos

id
titulo
data
descricao


cursos

id
nome


turmas

id
curso_id
nome

Organização de pastas
conexaopro-next

app/

components/

lib/

hooks/

services/

types/

public/

supabase/

docs/

Método de trabalho

Desenvolver por etapas:

Sprint 1

Fundação

criar Next.js
