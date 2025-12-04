let dialogAberto = null;
let brindes = JSON.parse(localStorage.getItem("brindes")) || [];

function inicializarLista() {

  if (brindes.length <= 0) {
    brindes.unshift(
      { nome: "Ração de Gado 5kg", custo: 50, quantidade: 15, url: "../imagens-default/racao.png" },
      { nome: "Ração de Gado 20kg", custo: 200, quantidade: 10, url: "../imagens-default/racao.png" },
      { nome: "Ração de Gado 50kg", custo: 500, quantidade: 5, url: "../imagens-default/racao.png" },
    );
  }

  document.getElementsByClassName("")

  const corpoTabela = document.getElementById("body-usuario");

  if (!corpoTabela) {
    return;
  }

  const linhas = [];

  for (let i = 0; i < brindes.length; i++) {

    const brinde = brindes[i];
    const idBrinde = i + 1;
    const html = `
            <tr>
              <td>${idBrinde}</td>
              <td>${brinde.nome}</td>
              <td>${brinde.quantidade}</td>
              <td>${brinde.custo}</td>
              <td class="td-opcoes">
                  <button class="btn-opcoes" title="Abrir menu de opções" onclick="alternarDialog(event, 'dialog-${idBrinde}')">
                    <img src="./opcoes.png" alt"Opções" height="24px"></img>
                  </button>

                  <dialog id="dialog-${idBrinde}" class="menu-dropdown">
                    <button onclick="editarBrinde('${brinde.nome}')">Editar</button>
                    <button class="deletar" onclick="deletarBrinde('${brinde.nome}')">Excluir</button>
                  </dialog>
              </td>
            </tr>
      `;

    linhas.push(html);
  }

  corpoTabela.innerHTML = linhas.join("");
  brindes
}

function alternarDialog(event, idDialog) {
  event.stopPropagation();
  const dialog = document.getElementById(idDialog);

  if (dialogAberto && dialogAberto !== dialog) {
    dialogAberto.close();
    dialogAberto = null;
  }

  if (dialog.open) {
    dialog.close();
    dialogAberto = null;
    return;
  }
  dialog.show();
  dialogAberto = dialog;
}

document.addEventListener('click', function(event) {
  if (dialogAberto) {
    const rect = dialogAberto.getBoundingClientRect();
    const clicouDentro = (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );

    if (!clicouDentro) {
      dialogAberto.close();
      dialogAberto = null;
    }
  }
});

function editarBrinde() {
  if (dialogAberto) {
    dialogAberto.close();
  }
  redirecionarCadastro()
}

function deletarBrinde(nome) {
  if (confirm(`Deseja excluir o brinde ${nome}?`)) {
    alert("Usuário excluído com sucesso");
  }

  if (dialogAberto) {
    dialogAberto.close();
  }
}

function redirecionarCadastro() {

  let path = window.location.pathname
  path = path.replace("index.html", "");
  path += "cadastro/index.html";
  window.location.pathname = path;
}

inicializarLista();

