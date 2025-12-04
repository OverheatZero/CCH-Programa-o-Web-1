let brindes = JSON.parse(localStorage.getItem("brindes")) || [];

const grid = document.getElementById("grid");

brindes.unshift(
    { nome: "Ração de Gado 5kg", custo: 50, quantidade: 15, url: "../imagens-default/racao.png" },
    { nome: "Ração de Gado 20kg", custo: 200, quantidade: 10, url: "../imagens-default/racao.png" },
    { nome: "Ração de Gado 50kg", custo: 500, quantidade: 5, url: "../imagens-default/racao.png" },
);


function formatarCusto(c) {
    if (c == 0) return "GRÁTIS";
    if (c == 1) return "1 ponto";
    return c + " pontos";
}

function carregarGrid() {
    grid.innerHTML = "";

    brindes.forEach(b => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = b.url ? b.url : "https://via.placeholder.com/200x140?text=Brinde";

        const nome = document.createElement("div");
        nome.className = "title";
        nome.textContent = b.nome;

        const quantidade = document.createElement("div");
        quantidade.className = "quantidade";
        quantidade.textContent = "Restante: " + b.quantidade;

        const preco = document.createElement("div");
        preco.className = "price";
        preco.textContent = formatarCusto(b.custo);

        card.addEventListener("click", () => {
            if (pontos >= b.custo) {
                pontos -= b.custo;
                b.quantidade--;

                elPontuacao.textContent = `Pontuação: ${pontos}`;
                quantidade.textContent = "Restante: " + b.quantidade;
                alert("Brinde resgatado!");
            } else {
                alert("Não há pontos necessários para esse brinde!");
            }
        });

        card.appendChild(img);
        card.appendChild(nome);
        card.appendChild(quantidade);
        card.appendChild(preco);

        grid.appendChild(card);
    });
}

carregarGrid();

let pontos = 250;
const elPontuacao = document.getElementById("pontuacao");
elPontuacao.textContent = `Pontuação: ${pontos}`;