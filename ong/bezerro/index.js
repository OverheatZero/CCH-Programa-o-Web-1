let dialogAberto = null;

const racas = ["Jersey", "Holandês", "Pardo Suíço", "Gir", "Girolando", "Guzerá", "Sindi"];

function adicionarBezerros() {

  const doador = "Lorem Ipsum";

  const corpoTabela = document.getElementById("body-bezerro");

  if (!corpoTabela) {
    return;
  }

  const linhas = [];

  for (let i = 0; i < 200; i++) {

    const idRaca = i % racas.length;
    const raca = racas[idRaca];
    const idBezerro = i + 1;

    const html = `
            <tr>
              <td>${idBezerro}</td>
              <td>${raca}</td>
              <td>${doador}</td>
              <td class="td-opcoes">
                  <button class="btn-opcoes" title="Abrir menu de opções" onclick="alternarDialog(event, 'dialog-${idBezerro}')">
                    <img src="./opcoes.png" alt"Opções" height="24px"></img>
                  </button>

                  <dialog id="dialog-${idBezerro}" class="menu-dropdown">
                    <button onclick="editarUsuario(${idBezerro})">Editar</button>
                    <button class="deletar" onclick="deletarUsuario(${idBezerro})">Excluir</button>
                  </dialog>
              </td>
            </tr>
      `;

    linhas.push(html);
  }

  corpoTabela.innerHTML = linhas.join("");
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

function editarUsuario(nome) {
  alert(`Editando ${nome}`);
  if (dialogAberto) {
    dialogAberto.close();
  }
}

function deletarUsuario(nome) {
  if (confirm(`Deseja excluir o bezerro ${id}?`)) {
    alert("Bezerro excluído com sucesso");
  }

  if (dialogAberto) {
    dialogAberto.close();
  }
}


adicionarBezerros();

