let brindes = JSON.parse(localStorage.getItem("brindes")) || [];

const grid = document.getElementById("grid");

console.log(brindes)

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

        const preco = document.createElement("div");
        preco.className = "price";
        preco.textContent = formatarCusto(b.custo);

        card.appendChild(img);
        card.appendChild(nome);
        card.appendChild(preco);

        grid.appendChild(card);
    });
}

carregarGrid();
