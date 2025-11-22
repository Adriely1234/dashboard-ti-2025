// Dados simulados entre 2020 e 2025
const vagas = [];
const areas = ["Inteligência Artificial", "Cibersegurança", "Cloud Computing", "Ciência de Dados", "DevOps", "Desenvolvimento Web"];
const cargos = ["Júnior", "Pleno", "Sênior"];
const regioes = ["SP","RJ","MG","RS","PR","SC","DF","BA","PE","CE","GO","MT","MS","PA","PB","PI","RN","RO","RR","SE","TO","AC","AL","AM","AP"];

// Gerar 3000 vagas aleatórias (2020-2025)
for(let ano=2020; ano<=2025; ano++){
    for(let i=0; i<500; i++){
        const cargo = cargos[Math.floor(Math.random()*cargos.length)];
        const salario = Math.round((cargo==="Júnior"?8000:cargo==="Pleno"?13000:20000)*(1+(Math.random()-0.5)));
        vagas.push({
            ID: vagas.length+1,
            Area: areas[Math.floor(Math.random()*areas.length)],
            Cargo: cargo,
            Regiao: regioes[Math.floor(Math.random()*regioes.length)],
            Salario: salario,
            Ano: ano
        });
    }
}

// Popular filtros
function popularFiltros(){
    const areaFilter = document.getElementById("area-filter");
    [...new Set(vagas.map(v=>v.Area))].forEach(a=>{
        areaFilter.innerHTML += `<option value="${a}">${a}</option>`;
    });

    const regiaoFilter = document.getElementById("regiao-filter");
    [...new Set(vagas.map(v=>v.Regiao))].forEach(r=>{
        regiaoFilter.innerHTML += `<option value="${r}">${r}</option>`;
    });
}

// Atualizar dashboard
function atualizarDashboard(){
    const area = document.getElementById("area-filter").value;
    const regiao = document.getElementById("regiao-filter").value;

    const filtradas = vagas.filter(v=>
        (area==="all" || v.Area===area) &&
        (regiao==="all" || v.Regiao===regiao)
    );

    document.getElementById("total-vagas").textContent = filtradas.length;
    document.getElementById("salario-medio").textContent = `R$ ${Math.round(filtradas.reduce((a,b)=>a+b.Salario,0)/filtradas.length || 0)}`;
    
    const areaMaisVagas = filtradas.reduce((acc,v,_,arr)=>{
        const countV = arr.filter(x=>x.Area===v.Area).length;
        const countAcc = arr.filter(x=>x.Area===acc).length;
        return countV>countAcc?v.Area:acc;
    },filtradas[0]?.Area || "-");

    document.getElementById("area-mais-vagas").textContent = areaMaisVagas;

    // Top 10 salários
    const top10 = filtradas.sort((a,b)=>b.Salario-a.Salario).slice(0,10);
    const tbody = document.getElementById("top-vagas-body");
    tbody.innerHTML = "";
    top10.forEach(v=>{
        tbody.innerHTML += `<tr>
            <td>${v.ID}</td>
            <td>${v.Area}</td>
            <td>${v.Cargo}</td>
            <td>${v.Regiao}</td>
            <td>R$ ${v.Salario}</td>
            <td>${v.Ano}</td>
        </tr>`;
    });

    gerarGraficos(filtradas);
}

// Gráficos
let areaChart=null, regiaoChart=null, salarioCargoChart=null, anoChart=null;
function gerarGraficos(data){
    const ctxArea = document.getElementById("area-chart").getContext("2d");
    const ctxRegiao = document.getElementById("regiao-chart").getContext("2d");
    const ctxSalarioCargo = document.getElementById("salario-cargo-chart").getContext("2d");
    const ctxAno = document.getElementById("ano-chart").getContext("2d");

    const areaData={}, regiaoData={}, salarioCargoData={}, anoData={};
    data.forEach(v=>{
        areaData[v.Area]=(areaData[v.Area]||0)+1;
        regiaoData[v.Regiao]=(regiaoData[v.Regiao]||0)+1;
        salarioCargoData[v.Cargo]=(salarioCargoData[v.Cargo]||[]).concat(v.Salario);
        anoData[v.Ano]=(anoData[v.Ano]||0)+1;
    });

    const salarioCargoLabels = Object.keys(salarioCargoData);
    const salarioCargoValues = salarioCargoLabels.map(c=>{
        const arr = salarioCargoData[c];
        return Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);
    });

    [areaChart, regiaoChart, salarioCargoChart, anoChart].forEach(c=>{if(c) c.destroy();});

    areaChart = new Chart(ctxArea,{
        type:'doughnut',
        data:{ labels:Object.keys(areaData), datasets:[{data:Object.values(areaData), backgroundColor:["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"]}] },
        options:{ plugins:{ legend:{ position:"bottom" } } }
    });

    regiaoChart = new Chart(ctxRegiao,{
        type:'bar',
        data:{ labels:Object.keys(regiaoData), datasets:[{label:'Vagas',data:Object.values(regiaoData),backgroundColor:'#36A2EB'}] },
        options:{ scales:{ y:{ beginAtZero:true } } }
    });

    salarioCargoChart = new Chart(ctxSalarioCargo,{
        type:'bar',
        data:{ labels:salarioCargoLabels, datasets:[{label:'Salário Médio (R$)', data:salarioCargoValues, backgroundColor:'#FF6384'}] },
        options:{ scales:{ y:{ beginAtZero:true } } }
    });

    anoChart = new Chart(ctxAno,{
        type:'line',
        data:{ labels:Object.keys(anoData), datasets:[{label:'Evolução de Vagas', data:Object.values(anoData), borderColor:'#36A2EB', fill:false, tension:0.3, pointBackgroundColor:"#FF6384"}] },
        options:{
            plugins:{ title:{ display:true, text:"📈 Evolução de Vagas em TI (2020-2025)" } },
            scales:{ y:{ beginAtZero:true } }
        }
    });
}

// Inicialização
popularFiltros();
document.getElementById("area-filter").addEventListener("change", atualizarDashboard);
document.getElementById("regiao-filter").addEventListener("change", atualizarDashboard);
document.getElementById("reset-filters").addEventListener("click", ()=>{
    document.getElementById("area-filter").value="all";
    document.getElementById("regiao-filter").value="all";
    atualizarDashboard();
});
atualizarDashboard();

