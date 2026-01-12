const routes = ["dashboard", "control", "analisis", "sostenibilidad"];
function showRoute() {
  const hash = window.location.hash.replace("#", "") || "dashboard";
  routes.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("hidden", id !== hash);
  });
}
window.addEventListener("hashchange", showRoute);
window.addEventListener("DOMContentLoaded", () => {
  showRoute();
  initDashboard();
  initForm();
  initCharts();
  initIA();
});

function initDashboard() {
  const states = ["Estable", "Óptimo", "Variable"];
  const insumos = ["Alta eficiencia", "Eficiencia media", "Mejorable"];
  const riesgo = ["Bajo", "Medio", "Alto"];
  const sosten = ["Bueno", "Muy bueno", "Adecuado"];
  document.getElementById("card-rendimiento").textContent = states[Math.floor(Math.random()*states.length)];
  document.getElementById("card-insumos").textContent = insumos[Math.floor(Math.random()*insumos.length)];
  document.getElementById("card-riesgo").textContent = riesgo[Math.floor(Math.random()*riesgo.length)];
  document.getElementById("card-sostenibilidad").textContent = sosten[Math.floor(Math.random()*sosten.length)];
}

function initForm() {
  const form = document.getElementById("cultivo-form");
  const dialog = document.getElementById("resumen-dialog");
  const content = document.getElementById("resumen-content");
  const closeBtn = document.getElementById("cerrar-resumen");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const resumen = `
      <div class="grid-2">
        <div>
          <strong>Nombre:</strong> ${data.nombre || "-"}<br />
          <strong>Tipo:</strong> ${data.tipo || "-"}<br />
          <strong>Ubicación:</strong> ${data.ubicacion || "-"}<br />
          <strong>Área (ha):</strong> ${data.area || "-"}
        </div>
        <div>
          <strong>Siembra:</strong> ${data.siembra || "-"}<br />
          <strong>Cosecha estimada:</strong> ${data.cosecha || "-"}<br />
          <strong>Fertilización:</strong> ${data.fertilizacion || "-"}<br />
          <strong>Cantidad:</strong> ${data.cantidad || "-"}
        </div>
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div>
          <strong>Frecuencia riego:</strong> ${data.frecuencia || "-"}<br />
          <strong>Tipo riego:</strong> ${data.tipoRiego || "-"}
        </div>
        <div>
          <strong>Plagas:</strong> ${data.plagas || "No"}<br />
          <strong>Tipo de plaga:</strong> ${data.tipoPlaga || "-"}<br />
          <strong>Tratamiento:</strong> ${data.tratamiento || "-"}
        </div>
      </div>
      <div style="margin-top:10px">
        <strong>Observaciones:</strong><br />
        <div>${(data.observaciones || "").replace(/</g, "&lt;")}</div>
      </div>
      <p class="demo-note" style="margin-top:10px">Este registro es una simulación (no se guarda en base de datos).</p>
    `;
    content.innerHTML = resumen;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      alert("Registro simulado. Revisa el resumen en pantalla.");
    }
  });
  closeBtn && closeBtn.addEventListener("click", () => dialog.close());
}

function initCharts() {
  const rendEl = document.getElementById("chartRendimiento");
  const recEl = document.getElementById("chartRecursos");
  if (!rendEl || !recEl) return;
  const rnd = () => Math.round(60 + Math.random()*30);
  new Chart(rendEl, {
    type: "line",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [{
        label: "Rendimiento (%)",
        data: [rnd(), rnd(), rnd(), rnd(), rnd(), rnd()],
        borderColor: "#15ff73",
        backgroundColor: "rgba(21,255,115,.25)",
        tension: .3,
        fill: true
      }]
    },
    options: { plugins: { legend: { display: true } }, scales: { y: { min: 0, max: 100 } } }
  });
  new Chart(recEl, {
    type: "bar",
    data: {
      labels: ["Agua", "Fertilizantes", "Energía", "Mano de obra"],
      datasets: [{
        label: "Uso relativo",
        data: [rnd(), rnd(), rnd(), rnd()],
        backgroundColor: ["#a8e5c8", "#7fe9c0", "#4fe6a8", "#15ff73"],
        borderRadius: 8
      }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } }
  });
}

function initIA() {
  const form = document.getElementById("ia-form");
  const out = document.getElementById("ia-output");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { prompt } = Object.fromEntries(new FormData(form).entries());
    out.innerHTML = "Generando ideas…";

    const simulated = [
      "Ideas de negocio: plataforma de monitoreo hídrico con sensores IoT",
      "Reforestación: vivero comunitario con especies nativas resistentes",
      "Suelos: rotación con leguminosas para fijación de nitrógeno",
      "Optimización: riego por pulsos según humedad del sustrato"
    ];

    try {
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt || "Ideas sostenibles para agrotech" })
      });
      if (!res.ok) throw new Error("Proxy no disponible");
      const data = await res.json();
      const ideas = Array.isArray(data.ideas) && data.ideas.length ? data.ideas : simulated;
      out.innerHTML = ideas.map(i => `<div class=\"ia-card\">${i}</div>`).join("");
    } catch (_) {
      out.innerHTML = simulated.map(i => `<div class=\"ia-card\">${i}</div>`).join("");
    }
  });
}
