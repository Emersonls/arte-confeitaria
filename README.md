# Arte Confeitaria — site

Site responsivo para **Arte Confeitaria — Doçura que Conquista**.

## Incluído
- Página inicial em rosa, marrom e dourado.
- Catálogo por Bolos, Doces, Tortas e Encomendas Especiais.
- Botão de encomenda direto para WhatsApp com mensagem pronta.
- Instagram: @Arte.confeitaria.012026.
- Painel administrativo de protótipo para cadastrar/excluir produtos.
- Layout mobile.
- Logo/arte fornecida pelo cliente em `public/arte-confeitaria-logo.png`.

## Rodar no computador
1. Instale Node.js 18+.
2. Na pasta do projeto:
   `npm install`
3. Execute:
   `npm run dev`
4. Abra `http://localhost:3000`.

## Publicar na Vercel
Suba esta pasta para um repositório GitHub e importe o repositório na Vercel. O framework é Next.js.

## Importante sobre o painel
Esta primeira versão usa `localStorage`, portanto é um MVP de demonstração: os produtos ficam salvos no navegador em que foram cadastrados. Para um painel realmente privado e com pedidos compartilhados entre celular/computador, a próxima etapa deve usar autenticação + banco de dados (por exemplo, Supabase).
