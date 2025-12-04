const btnCadastro = document.getElementById("btnCadastro");

const inputs = document.querySelectorAll("#formContainer input");

let brindes = JSON.parse(localStorage.getItem("brindes"));

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

    alert("Brinde cadastrado com sucesso!");

    inputs.forEach(i => i.value = "");
});
