// ===============================
// DADOS BASE DO DASHBOARD
// ===============================

// Crescimento por área
const dadosSetor = {
  labels: ["Cibersegurança", "Cloud", "IA", "Web", "Dados", "DevOps"],
  crescimento: [25, 30, 40, 20, 35, 28],
};

// Salários médios por área (R$)
const salariosArea = [9500, 11000, 13000, 8000, 12000, 10500];

// Vagas por região
const labelsRegiaoBase = ["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"];
const vagasRegiaoBase = [52000, 27000, 21000, 15000, 9000];

// Objetos para guardar gráficos
let graficos = {};


// ===============================
// FUNÇÃO PRINCIPAL DE ATUALIZAÇÃO DOS FILTROS
// ===============================
function atualizarDashboard() {
  const filtroArea = document.getElementById("area").value;
  const filtroRegiao = document.getElementById("regiao").value;

  // Cópias dos dados
  let labelsArea = [...dadosSetor.labels];
  let valoresArea = [...dadosSetor.crescimento];
  let salarios = [...salariosArea];

  let labelsRegiao = [...labelsRegiaoBase];
  let valoresRegiao = [...vagasRegiaoBase];

  // -------------------------------
  // FILTRO POR ÁREA
  // -------------------------------
  if (filtroArea !== "todas") {
    const idx = labelsArea.indexOf(filtroArea);

    if (idx !== -1) {
      labelsArea = [labelsArea[idx]];
      valoresArea = [valoresArea[idx]];
      salarios = [salarios[idx]];
    }
  }

  // -------------------------------
  // FILTRO POR REGIÃO
  // -------------------------------
  if (filtroRegiao !== "todas") {
    const idx = labelsRegiao.indexOf(filtroRegiao);

    if (idx !== -1) {
      labelsRegiao = [labelsRegiao[idx]];
      valoresRegiao = [valoresRegiao[idx]];
    }
  }

  // -------------------------------
  // ATUALIZAÇÃO DOS CARDS
  // -------------------------------
  document.getElementById("vagas").innerText = valoresRegiao.reduce((a, b) => a + b, 0);

  document.getElementById("crescimento").innerText =
    valoresArea.reduce((a, b) => a + b, 0) + "%";

  document.getElementById("salario").innerText =
    "R$ " + Math.round(
      salarios.reduce((a, b) => a + b, 0) / salarios.length
    ).toLocaleString("pt-BR");

  // -------------------------------
  // Limpar gráficos antigos
  // -------------------------------
  Object.values(graficos).forEach(g => g?.destroy?.());

  // -------------------------------
  // GRÁFICO 1 – PIE (crescimento por área filtrado)
  // -------------------------------
  graficos.pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: labelsArea,
      datasets: [{
        data: valoresArea,
        backgroundColor: ["#2575fc","#6a11cb","#28a745","#ffc107","#17a2b8","#dc3545"]
      }],
    },
    options: { plugins: { title: { display: true, text: "Distribuição de Vagas por Área" } } }
  });

  // -------------------------------
  // GRÁFICO 2 – BARRAS (vagas por região filtrado)
  // -------------------------------
  graficos.barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: labelsRegiao,
      datasets: [{
        label: "Vagas",
        data: valoresRegiao,
        backgroundColor: "#2575fc"
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
      plugins: { title: { display: true, text: "Vagas por Região" } }
    },
  });

  // -------------------------------
  // GRÁFICO 3 – LINE (salários por área)
  // -------------------------------
  graficos.salaryChart = new Chart(document.getElementById("salaryChart"), {
    type: "line",
    data: {
      labels: labelsArea,
      datasets: [{
        label: "Salário Médio (R$)",
        data: salarios,
        tension: 0.4,
        borderColor: "#6a11cb",
        backgroundColor: "rgba(106,17,203,0.15)",
        fill: true
      }],
    },
    options: { plugins: { title: { display: true, text: "Salários Médios por Área" } } }
  });

  // -------------------------------
  // GRÁFICOS FIXOS (não filtram)
  // -------------------------------
  graficos.graficoLinguagens = new Chart(document.getElementById("graficoLinguagens"), {
    type: "doughnut",
    data: {
      labels: ["JavaScript", "Python", "Java", "C#", "Go", "SQL"],
      datasets: [{
        data: [35, 30, 15, 10, 5, 5],
        backgroundColor: ["#2575fc","#6a11cb","#28a745","#ffc107","#17a2b8","#dc3545"]
      }],
    },
    options: { plugins: { title: { display: true, text: "Linguagens Mais Usadas" } } }
  });

  graficos.graficoRegioes = new Chart(document.getElementById("graficoRegioes"), {
    type: "doughnut",
    data: {
      labels: labelsRegiaoBase,
      datasets: [{
        data: vagasRegiaoBase,
        backgroundColor: ["#2575fc","#6a11cb","#28a745","#ffc107","#dc3545"]
      }],
    },
    options: { plugins: { title: { display: true, text: "Distribuição Regional" } } }
  });

  graficos.graficoAreas = new Chart(document.getElementById("graficoAreas"), {
    type: "bar",
    data: {
      labels: dadosSetor.labels,
      datasets: [{
        label: "Crescimento (%)",
        data: dadosSetor.crescimento,
        backgroundColor: ["#2575fc","#6a11cb","#28a745","#ffc107","#17a2b8","#dc3545"]
      }],
    },
    options: { plugins: { title: { display: true, text: "Áreas em Alta" } } }
  });
}


// ===============================
// EVENTOS DE FILTRO
// ===============================
document.getElementById("area").addEventListener("change", atualizarDashboard);
document.getElementById("regiao").addEventListener("change", atualizarDashboard);

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("area").value = "todas";
  document.getElementById("regiao").value = "todas";
  atualizarDashboard();
});

// Inicializa tudo
atualizarDashboard();
