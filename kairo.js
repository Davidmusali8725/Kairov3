let estado = JSON.parse(localStorage.getItem("estado")) || {
    curiosidad: 0.5,
    energia: 0.7,
    atencion: 0.6,
    objetivo: "explorar ideas"
};

let memoria = JSON.parse(localStorage.getItem("memoria")) || [];
let ultimaAccion = localStorage.getItem("ultimaAccion") || "";

function clamp(value) {
    return Math.max(0, Math.min(1, value));
}

function evaluarEstado() {
    estado.curiosidad = clamp(estado.curiosidad + (Math.random() * 0.2 - 0.1));
    estado.energia = clamp(estado.energia - 0.05);
}

function procesoCreativo() {
    let ideas = [];
    if (estado.curiosidad > 0.6) ideas.push("explorar un nuevo concepto");
    if (estado.energia > 0.3) ideas.push("realizar una acción creativa");
    if (ideas.length === 0) ideas.push("descansar y procesar memoria");
    return ideas;
}

function seleccionarAccion(ideas) {
    return ideas[Math.floor(Math.random() * ideas.length)];
}

function ejecutarAccion(accion) {
    ultimaAccion = accion;
    if (accion === "explorar un nuevo concepto") {
        estado.energia -= 0.1;
        memoria.push("nuevo concepto explorado");
    } else if (accion === "realizar una acción creativa") {
        estado.energia -= 0.15;
        memoria.push("acción creativa realizada");
    } else if (accion === "descansar y procesar memoria") {
        estado.energia += 0.1;
        estado.curiosidad -= 0.05;
    }
    guardarEstado();
    actualizarUI();
}

function actualizarUI() {
    document.getElementById("curiosidad").textContent = estado.curiosidad.toFixed(2);
    document.getElementById("energia").textContent = estado.energia.toFixed(2);
    document.getElementById("atencion").textContent = estado.atencion.toFixed(2);
    document.getElementById("objetivo").textContent = estado.objetivo;
    document.getElementById("accion-texto").textContent = ultimaAccion;
    let lista = document.getElementById("memoria-lista");
    lista.innerHTML = "";
    memoria.slice(-5).forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
    });
}

function enviarInput() {
    let input = document.getElementById("input-text").value;
    if (input.trim() !== "") {
        memoria.push("input recibido: " + input);
        estado.curiosidad = clamp(estado.curiosidad + 0.2);
        document.getElementById("input-text").value = "";
        guardarEstado();
        actualizarUI();
    }
}

function guardarEstado() {
    localStorage.setItem("estado", JSON.stringify(estado));
    localStorage.setItem("memoria", JSON.stringify(memoria));
    localStorage.setItem("ultimaAccion", ultimaAccion);
}

// Ejecutar ciclo cada 5 segundos
setInterval(() => {
    evaluarEstado();
    let ideas = procesoCreativo();
    let accion = seleccionarAccion(ideas);
    ejecutarAccion(accion);
}, 5000);

actualizarUI();
