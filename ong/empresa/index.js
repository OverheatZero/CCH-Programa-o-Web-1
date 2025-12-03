let dialogAberto = null;

function adicionarUsuarios() {

  const nome = "Lorem Ipsum";
  const leiteiro = "Criador de gado leiteiro";
  const corte = "Criador de gado de corte";

  const corpoTabela = document.getElementById("body-usuario");

  if (!corpoTabela) {
    return;
  }

  const linhas = [];

  for (let i = 0; i < 200; i++) {

    const idUsuario = i + 1;
    const html = `
            <tr>
              <td>${idUsuario}</td>
              <td>${nome}</td>
              <td>${i % 2 == 0 ? leiteiro : corte}</td>
              <td class="td-opcoes">
                  <button class="btn-opcoes" title="Abrir menu de opções" onclick="alternarDialog(event, 'dialog-${idUsuario}')">
                    <img src="./opcoes.png" alt"Opções" height="24px"></img>
                  </button>

                  <dialog id="dialog-${idUsuario}" class="menu-dropdown">
                    <button onclick="editarUsuario('${nome}')">Editar</button>
                    <button class="deletar" onclick="deletarUsuario('${nome}')">Excluir</button>
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
  if (confirm(`Deseja excluir o usuário ${nome}?`)) {
    alert("Usuário excluído com sucesso");
  }

  if (dialogAberto) {
    dialogAberto.close();
  }
}


adicionarUsuarios();

