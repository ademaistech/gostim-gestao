/* ============================================================
   👇  LISTA DE PRODUTOS — EDITE AQUI (fonte única)
   ------------------------------------------------------------
   Este arquivo é compartilhado pela landing (index.html) e pelo
   painel (admin.html). Editou aqui, muda nos dois lugares.

   Cada produto tem um ou mais TAMANHOS, cada um com seu preço:
     precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 17.00 } ]

   • MUDAR PREÇO: altere o número em "preco" do tamanho.
   • ADICIONAR TAMANHO: acrescente um { tam: '...', preco: ... } na lista "precos".
   • ADICIONAR PRODUTO: copie um bloco { ... } inteiro e cole abaixo.
   • REMOVER: apague o bloco { ... } (produto) ou a linha do tamanho.
   Use PONTO nos preços (12.00) e mantenha as aspas nos textos.
   "categoria" precisa ser um dos "id" definidos em CATEGORIAS (no index.html).
   O catálogo, o carrinho e o painel se atualizam sozinhos.
   ============================================================ */
const PRODUTOS = [
    // --- Temperos ---
    { nome: 'Alho puro',                          categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 21.00 } ] },
    { nome: 'Alho e sal',                         categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 17.00 }, { tam: '1Kg', preco: 30.00 } ] },
    { nome: 'Alho e sal com pimenta calabresa',   categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 19.00 } ] },
    { nome: 'Alho e sal com cheiro verde',        desc: 'Com ou sem pimenta calabresa', categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 19.00 } ] },
    { nome: 'Alho e sal com cebola',              categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 19.00 } ] },
    { nome: 'Alho e sal com pimenta biquinho',    categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 19.00 } ] },
    { nome: 'Alho e sal com alho-poró',           categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 19.00 } ] },
    { nome: 'Alho puro, alho-poró e cebola',      categoria: 'temperos', precos: [ { tam: '250g', preco: 14.00 }, { tam: '500g', preco: 22.00 } ] },
    { nome: 'Alho e sal, alho-poró e cebola',     categoria: 'temperos', precos: [ { tam: '250g', preco: 14.00 }, { tam: '500g', preco: 22.00 } ] },
    { nome: 'Alho e sal e açafrão',               categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 19.00 } ] },
    { nome: 'Alho e sal completo',                desc: 'Com ou sem pimenta calabresa', categoria: 'temperos', precos: [ { tam: '250g', preco: 12.00 }, { tam: '500g', preco: 19.00 } ] },
    { nome: 'Alho-poró e especiarias',            categoria: 'temperos', precos: [ { tam: '250g', preco: 14.00 }, { tam: '500g', preco: 22.00 } ] },
    { nome: 'Mix de sabores',                     desc: 'Alho-poró, cebola roxa, pimenta biquinho, salsinha, açafrão, louro e noz-moscada', categoria: 'temperos', precos: [ { tam: '250g', preco: 14.00 }, { tam: '500g', preco: 22.00 } ] },
    { nome: 'Alho e sal com especiarias',         desc: 'Embalagem de 1Kg — especiarias a escolher', categoria: 'temperos', precos: [ { tam: '1Kg', preco: 32.00 } ] },

    // --- Patês & Antepastos ---
    { nome: 'Tomate seco',                        categoria: 'antepastos', precos: [ { tam: '250g', preco: 20.00 }, { tam: '450g', preco: 33.00 } ] },
    { nome: 'Antepasto de berinjela',             categoria: 'antepastos', precos: [ { tam: '250g', preco: 18.00 }, { tam: '450g', preco: 28.00 } ] },
    { nome: 'Molho pesto',                        categoria: 'antepastos', precos: [ { tam: '200g', preco: 20.00 }, { tam: '400g', preco: 36.00 } ] },
    { nome: 'Patê de frango defumado com pétalas de cebola', desc: 'Feito com maionese e creme de leite, com passas e azeitona preta', categoria: 'antepastos', precos: [ { tam: '250g', preco: 29.00 }, { tam: '500g', preco: 49.00 } ] },
    { nome: 'Patê de frango defumado sem cebola', desc: 'Feito com maionese e creme de leite, com passas e azeitona preta', categoria: 'antepastos', precos: [ { tam: '250g', preco: 32.00 }, { tam: '500g', preco: 52.00 } ] },
    { nome: 'Patê de tomate seco',                desc: 'Feito com cream cheese e alcaparras', categoria: 'antepastos', precos: [ { tam: '250g', preco: 29.00 }, { tam: '500g', preco: 49.00 } ] },
    { nome: 'Mousse de abacaxi',                  desc: 'Feito com frango defumado', categoria: 'antepastos', precos: [ { tam: '250g', preco: 29.00 }, { tam: '500g', preco: 49.00 } ] },
    { nome: 'Tricolore',                          desc: 'Feito com pesto, cream cheese e tomate seco', categoria: 'antepastos', precos: [ { tam: '200g', preco: 24.00 }, { tam: '400g', preco: 37.00 } ] },

    // --- Pão Sírio ---
    { nome: 'Pão Sírio',                          desc: 'Pacote com 15 pães', categoria: 'paes', precos: [ { tam: 'Pacote', preco: 12.00 } ] }
];

/* Gera as opções de produto no MESMO formato que o carrinho usa:
   produto com mais de um tamanho vira "Nome (tam)"; com um só, fica "Nome".
   Usado pelo painel (admin.html) pra sugerir produtos e preencher o preço. */
function opcoesCardapio() {
    const out = [];
    PRODUTOS.forEach(p => {
        const precos = p.precos || [];
        const multi = precos.length > 1;
        precos.forEach(v => {
            out.push({ nome: multi ? `${p.nome} (${v.tam})` : p.nome, preco: v.preco });
        });
    });
    return out;
}
