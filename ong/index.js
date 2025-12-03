const ctxUsuario = document.getElementById("chart-usuarios");
const ctxBrindes = document.getElementById("chart-brindes");
const ctxBezerrosComparacao = document.getElementById("chart-bezerros-comparacao");
const ctxTipoUsuario = document.getElementById("chart-tipo-usuario");

const style = window.getComputedStyle(document.body);
const corPrimaria = style.getPropertyValue("--cor-primaria");
const corSecundaria = style.getPropertyValue("--cor-secundaria");
const corDetalhes = style.getPropertyValue("--cor-detalhes");
const corDetalhesClara = style.getPropertyValue("--cor-detalhes-claro");
const corTexto = style.getPropertyValue("--cor-texto");

function hexParaRGBA(hex, alpha) {

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b}})`;
}

function criarOptions(nomeGrafico) {

  const options = {

    plugins: {
      title: {
        display: true,
        fullSize: true,
        align: "start",
        color: corTexto,
        position: "top",
        padding: 0,
        text: nomeGrafico,
        font: {
          family: "'Montserrat', 'sans-serif'",
          color: corTexto,
          size: 20
        }
      },
      subtitle: null,
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            family: "'Montserrat', 'sans-serif'",
            color: corTexto,
            size: 12
          }
        },
        display: true
      },
      tooltip: {
        mode: "index",
        intersect: false,
        usePointStyle: true,
        backgroundColor: "#ffffff",
        titleColor: "#000000",
        bodyColor: "#000000",
        position: "nearest",
        font: {
          family: "'Montserrat', 'sans-serif'",
          color: corTexto,
          size: 12
        }
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
    scale: {
      x: {
        stacked: false,
        min: 0
      },
      y: {
        stacked: false,
        min: 0
      }
    },
    indexAxis: "x",
    hover: {
      mode: null
    }
  };


  return options;
}


const meses = [
  "Jan.",
  "Fev.",
  "Mar.",
  "Abr.",
  "Mai.",
  "Jun.",
  "Jul.",
  "Ago.",
  "Set.",
  "Out.",
  "Nov.",
  "Dez.",
];

function gerarArrayNumerosAletorios(obj) {

  const array = [];
  for (let i = 0; i < obj.qtdNumeros; i++) {
    let numero = Math.random() * (obj.max - obj.min) + obj.min;
    numero = Math.floor(numero);
    array.push(numero);
  }

  return array;
}


const chartUsuario = new Chart(ctxUsuario, {
  type: "bar",
  data: {
    labels: meses,
    datasets: [{
      label: 'Novos usuários',
      data: gerarArrayNumerosAletorios({ qtdNumeros: 12, min: 10, max: 20 }),
      fill: true,
      borderRadius: 16,
      backgroundColor: [corPrimaria, corSecundaria],
    }],
  },
  responsive: true,
  options: criarOptions("Novos usuários por mês"),
});

const chartBrindes = new Chart(ctxBrindes, {
  type: "bar",
  data: {
    labels: meses,
    datasets: [{
      label: "Brindes entregues",
      data: gerarArrayNumerosAletorios({ qtdNumeros: 12, min: 100, max: 200 }),
      fill: true,
      borderRadius: 16,
      backgroundColor: [corDetalhes, corDetalhesClara],
    }],
  },
  responsive: true,
  options: criarOptions("Brindes entregues por mês"),
});

const chartComparacao = new Chart(ctxBezerrosComparacao, {

  type: 'line',
  data: {
    labels: meses,
    datasets: [
      {
        label: "Bezerros doados",
        data: gerarArrayNumerosAletorios({ qtdNumeros: 12, min: 137, max: 196 }),
        fill: false,
        tension: 0.3,
        backgroundColor: corPrimaria,
        borderColor: corPrimaria
      }, {
        label: "Bezerros em demanda",
        data: gerarArrayNumerosAletorios({ qtdNumeros: 12, min: 125, max: 196 }),
        fill: false,
        tension: 0.5,
        backgroundColor: corDetalhes,
        borderColor: corDetalhes,
      }],
  },
  responsive: false,
  options: criarOptions("Bezerros doados X Bezerros em demanda por mês")
});

const chartTipoUsuario = new Chart(ctxTipoUsuario, {
  type: 'doughnut',
  data: {
    labels: ["Corte", "Leiteiro"],
    datasets: [{
        data: [100, 100],
      fill: true,
      backgroundColor: [corPrimaria, corSecundaria],
    }],
  },
  responsive: true,
  options: criarOptions("Usuários por Tipo")
});
