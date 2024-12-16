Aplicação de Receitas
Descrição
Esta aplicação permite que os usuários gerenciem suas receitas de forma prática. Você pode criar, editar, deletar e filtrar receitas. Cada receita pode conter informações como foto, ingredientes, tempo de preparo e uma descrição detalhada.

Pré-requisitos
Antes de começar, certifique-se de que você tem as seguintes dependências instaladas em sua máquina:

Node.js (versão recomendada: v14.x ou superior)
npm (gerenciador de pacotes do Node.js)
Expo CLI (para rodar o aplicativo em dispositivos móveis ou simuladores)
Instalação

1. Clone o repositório:

2. Navegue até o diretório do projeto:

3. Instale as dependências com npm:
   bash
   Copiar código
   npm install

4. Instale as dependências do React Query e Supabase:
   bash
   Copiar código
   npm install @tanstack/react-query supabase-js

5. Inicie o servidor com Expo, limpando o cache:
   npx expo start --clear  
   Configuração do Usuário
   Usuário de teste:
   Email: batata@gmail.com
   Senha: batata123
   Caso precise de um usuário alternativo ou tenha problemas com o login, utilize este usuário para acessar a aplicação.

Funcionalidades
React Query:

A aplicação utiliza o React Query para gerenciar o cache e otimizar as requisições de dados. Isso facilita a recuperação de receitas, mantendo os dados atualizados sem sobrecarregar a API.
As chamadas de API para buscar, adicionar, editar e deletar receitas são realizadas de forma eficiente usando o React Query, garantindo um melhor desempenho e uma melhor experiência do usuário.
Supabase:

O Supabase é usado como o backend para armazenamento e gerenciamento dos dados das receitas.
O projeto está integrado ao Supabase, que fornece serviços de autenticação, armazenamento de dados e API REST para realizar operações como buscar receitas, criar, editar e deletar com facilidade.
As requisições são feitas diretamente ao Supabase para gerenciar as receitas armazenadas, garantindo que os dados estejam sincronizados e seguros.
Criar Receitas: Adicionar novas receitas com detalhes como foto, ingredientes, tempo de preparo e descrição.

Editar Receitas: Alterar informações de receitas já existentes.

Deletar Receitas: Remover receitas da lista.

Filtrar Receitas: Buscar por nome ou outros critérios específicos para encontrar rapidamente o que precisa.

Rodando o Aplicativo

Após iniciar o Expo, um servidor local será iniciado.
Abra o aplicativo Expo no seu dispositivo móvel ou use o simulador do Expo no navegador.
Navegue pelas seções da aplicação para visualizar, criar, editar e deletar receitas.
