const dropdownHeader = document.getElementById("dropdown-header");
const dropdownList = document.getElementById("dropdown-list");
const dropdownIcon = document.getElementById("dropdown-icon");

dropdownHeader.addEventListener("click", () => {
    dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
});

const btnCadastro = document.getElementById("btnCadastro");

const inputs = document.querySelectorAll("#formContainer input");

let brindes = [];
let aberto = false;

dropdownHeader.addEventListener("click", () => {
    if (brindes.length === 0) {
        alert("Nenhum brinde cadastrado!");
        return;
    }

    aberto = !aberto;

    dropdownList.style.display = aberto ? "block" : "none";
    dropdownIcon.textContent = aberto ? "⋀" : "⋁";
});

btnCadastro.addEventListener("click", () => {
    const nomeBrinde = inputs[0].value.trim();
    const custo = inputs[1].value.trim();
    const quantidade = inputs[2].value.trim();
    const url = inputs[3].value.trim();

    if (!nomeBrinde || !quantidade || !custo) {
        alert("Preencha todos os campos!");
        return;
    }

    brindes.push({
        nome: nomeBrinde,
        custo: custo,
        quantidade: quantidade,
        url: url
    });

    localStorage.setItem("brindes", JSON.stringify(brindes));

    atualizarDropdown();

    alert("Brinde cadastrado com sucesso!");

    inputs.forEach(i => i.value = "");
});

function atualizarDropdown() {
    dropdownList.innerHTML = "";

    if (aberto) {
        aberto = false;
        dropdownList.style.display = "none";
        dropdownIcon.textContent = "⋁";
    }

    brindes.forEach(b => {
        const li = document.createElement("li");

        let textoCusto;
        if (b.custo == 0) {
            textoCusto = "GRÁTIS!";
        } else if (b.custo == 1) {
            textoCusto = "1 ponto";
        } else {
            textoCusto = `${b.custo} pontos`;
        }

        li.textContent = `${b.nome} | ${textoCusto}`;

        li.addEventListener("click", () => {
            window.location.href = "../../gado-leiteiro/brindes/index.html";
        });

        dropdownList.appendChild(li);
    });

}
