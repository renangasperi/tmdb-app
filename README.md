# TMDB App

Uma página web responsiva feita com vue para busca de filmes utilizando a API do [TMDB](https://developer.themoviedb.org/).

Acesse por esse [link](https://tmdb-app-delta.vercel.app/).

## Visão Geral

#### Rotas

A página inicial da aplicação contem a listagem de 4 categorias diferentes e cada categoria possui uma rota própria caso o usuário queira ver mais opções da mesma. Além disso, o usuário também pode buscar um filme específico pelo campo de busca ou selecionar um filme da listagem da tela principal ou de categoria e obter mais informações como a sinopse e o elenco.

#### Versão Web

![image](https://github.com/user-attachments/assets/ef73bc16-58ae-4e57-9b2b-22a158e59fe8)
![image](https://github.com/user-attachments/assets/0519222c-3aae-42f2-924c-91e29478eef0)


#### Versão Mobile

![image](https://github.com/user-attachments/assets/c3a2add3-4c93-4bf8-be90-cf87456435c9)
![image](https://github.com/user-attachments/assets/670dd2b6-b0a2-4db3-823a-d76fadde2d8b)



## Tecnologias Utilizadas

- [Vue.js](https://vuejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)

## Dependências

- vue": `^3.5.13`
- vue-router": `4`
- vue-toast-notification: `^3.1.3`
- tailwindcss: `^4.0.3`,

## Dependências de Desenvolvimento

- @vitejs/plugin-vue: `^5.2.1`
- @vue/test-utils: `^2.4.6`
- jsdom: `^26.0.0`
- typescript: `^5.7.3`
- vite: `^6.0.5`
- vitest: `^3.0.4`
- vue-tsc: `^2.2.0`

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

Clone o repositório:

```bash
git clone https://github.com/renangasperi/tmdb-app
```

Atualize as dependências:

```bash
npm install
```

Altere a variável apiKey com a sua chave de acesso no arquivo useApi.ts.

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

## Testes

Os testes unitários são executados com:

```bash
npm run test
```
