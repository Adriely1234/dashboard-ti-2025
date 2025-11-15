// ===============================
// DASHBOARD DE TI BRASIL - 2025
// ===============================
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.responsive = true;
Chart.defaults.plugins.legend.position = "bottom";

// ===============================
// DADOS 2025
// ===============================
const dados2025 = {
  vagasTotais: 184500,
  crescimento: 12.5,
  salarioMedio: 8800,

  distribuicaoPorArea: {
    labels: ["Cibersegurança", "Cloud", "IA", "Web", "Dados", "DevOps"],
    valores: [15, 18, 20, 22, 16, 9]
  },
  distribuicaoPorRegiao: {
    labels: ["Sudeste", "Sul", "Nordeste", "Centro-Oeste", "Norte"],
    valores: [55, 18, 14, 8, 5]
  },
  salariosPorArea: {
    labels: ["Cibersegurança", "Cloud", "IA", "Web", "Dados", "DevOps"],
    valores: [9500, 10200, 11800, 8700, 11000, 9700]
  },
  linguagensMaisUsadas: {
    labels: ["JavaScript", "Python", "Java", "TypeScript", "C#", "Go"],
    valores: [32, 28, 15, 14, 11, 8]
  },
  areasEmAlta: {
    labels: ["IA e Machine Learning", "Cibersegurança", "Cloud", "Mobile", "Data Science"],
    valores: [28, 24, 20, 16, 12]
  }
};

// ===============================
// INSTÂNCIAS DOS GRÁFICOS
// ===============================
let graficos = {
  pie: null,
  bar: null,
  salary: null,
  linguagens: null,
  regioes: null,
  areas: null
};

// ===============================
// ATUALIZA CARDS AO CARREGAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("vagas").textContent = dados2025.vagasTotais.toLocaleString("pt-BR");
  document.getElementById("crescimento").textContent = dados2025.crescimento + "%";
  document.getElementById("salario").textContent = "R$ " + dados2025.salarioMedio.toLocaleString("pt-BR");

  criarGraficos();
});

// ===============================
// FUNÇÃO: CRIAR OS GRÁFICOS
// ===============================
function criarGraficos() {
  // destrói gráficos antigos
  Object.values(graficos).forEach(g => { if (g) g.destroy(); });

  graficos.pie = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: dados2025.distribuicaoPorArea.labels,
      datasets: [{
        data: dados2025.distribuicaoPorArea.valores,
        backgroundColor: ["#2575fc","#6a11cb","#28a745","#ffc107","#17a2b8","#dc3545"]
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Distribuição de Vagas por Área" } }
    }
  });

  graficos.bar = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: dados2025.distribuicaoPorRegiao.labels,
      datasets: [{
        data: dados2025.distribuicaoPorRegiao.valores,
        label: "Vagas (%)",
        backgroundColor: "#2575fc"
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Vagas por Região" } }
    }
  });

  graficos.salary = new Chart(document.getElementById("salaryChart"), {
    type: "line",
    data: {
      labels: dados2025.salariosPorArea.labels,
      datasets: [{
        data: dados2025.salariosPorArea.valores,
        label: "Salário Médio (R$)",
        borderColor: "#6a11cb",
        backgroundColor: "rgba(106,17,203,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Salários Médios por Área" } }
    }
  });

  graficos.linguagens = new Chart(document.getElementById("graficoLinguagens"), {
    type: "bar",
    data: {
      labels: dados2025.linguagensMaisUsadas.labels,
      datasets: [{
        data: dados2025.linguagensMaisUsadas.valores,
        label: "Uso (%)",
        backgroundColor: ["#2575fc","#6a11cb","#28a745","#ffc107","#17a2b8","#dc3545"]
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Linguagens Mais Usadas" } }
    }
  });

  graficos.regioes = new Chart(document.getElementById("graficoRegioes"), {
    type: "doughnut",
    data: {
      labels: dados2025.distribuicaoPorRegiao.labels,
      datasets: [{
        data: dados2025.distribuicaoPorRegiao.valores,
        backgroundColor: ["#2575fc","#6a11cb","#28a745","#ffc107","#dc3545"]
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Distribuição Regional" } }
    }
  });

  graficos.areas = new Chart(document.getElementById("graficoAreas"), {
    type: "line",
    data: {
      labels: dados2025.areasEmAlta.labels,
      datasets: [{
        data: dados2025.areasEmAlta.valores,
        label: "Tendência (%)",
        borderColor: "#28a745",
        backgroundColor: "rgba(40,167,69,0.2)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      plugins: { title: { display: true, text: "Áreas em Alta em 2025" } }
    }
  });
}

// ===============================
// BOTÃO: REDEFINIR
// ===============================
document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("area").value = "todas";
  document.getElementById("regiao").value = "todas";
  criarGraficos();
});
