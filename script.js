let actas = JSON.parse(localStorage.getItem("actas")) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];
let inventario = JSON.parse(localStorage.getItem("inventario")) || [];

function mostrarModulo(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "reporte") mostrarActas();
  if (id === "inventario") mostrarProductos();
  if (id === "clientes") mostrarClientes();
  if (id === "vendedores") mostrarVendedores();
}

// ================= Actas ==================
function generarNumeroActa() {
  return "ACTA-" + String(actas.length + 1).padStart(3, "0");
}

function autocompletarCliente() {
  let codigo = document.getElementById("codigoCliente").value;
  let cliente = clientes.find(c => c.codigo === codigo);
  if (cliente) {
    document.getElementById("nombreCliente").value = cliente.nombre;
    document.getElementById("cedulaCliente").value = cliente.cedula;
    document.getElementById("direccionCliente").value = cliente.direccion;
    document.getElementById("vendedorCliente").value = cliente.vendedor;
    document.getElementById("recibidoCliente").innerText = cliente.nombre;
  }
}

function guardarActa() {
  let acta = {
    numero: generarNumeroActa(),
    fecha: new Date().toLocaleDateString(),
    cliente: document.getElementById("nombreCliente").value,
    producto: document.getElementById("producto").value,
    cantidad: parseInt(document.getElementById("cantidad").value),
    vendedor: document.getElementById("vendedorCliente").value,
    descripcion: document.getElementById("descripcion").value
  };
  actas.push(acta);
  localStorage.setItem("actas", JSON.stringify(actas));
  alert("Acta guardada!");
  mostrarActas();
}

function mostrarActas() {
  let tbody = document.querySelector("#tablaActas tbody");
  tbody.innerHTML = "";
  actas.forEach((a,i) => {
    tbody.innerHTML += `<tr>
      <td>${a.numero}</td><td>${a.cliente}</td><td>${a.producto}</td><td>${a.cantidad}</td><td>${a.vendedor}</td><td>${a.fecha}</td>
      <td><button onclick="eliminarActa(${i})">Eliminar</button></td>
    </tr>`;
  });
}

function eliminarActa(i) {
  if(confirm("¿Eliminar acta?")) {
    actas.splice(i,1);
    resecuenciarActas();
    localStorage.setItem("actas", JSON.stringify(actas));
    mostrarActas();
  }
}

function resecuenciarActas() {
  actas.forEach((a, idx) => a.numero = "ACTA-" + String(idx+1).padStart(3,"0"));
}

function filtrarReporte() {
  let vendedor = document.getElementById("filtroVendedor").value.toLowerCase();
  let producto = document.getElementById("filtroProducto").value.toLowerCase();
  let fecha = document.getElementById("filtroFecha").value;
  let tbody = document.querySelector("#tablaActas tbody");
  tbody.innerHTML = "";
  actas.filter(a => 
    (vendedor=="" || a.vendedor.toLowerCase().includes(vendedor)) &&
    (producto=="" || a.producto.toLowerCase().includes(producto)) &&
    (fecha=="" || a.fecha === new Date(fecha).toLocaleDateString())
  ).forEach(a=>{
    tbody.innerHTML += `<tr>
      <td>${a.numero}</td><td>${a.cliente}</td><td>${a.producto}</td><td>${a.cantidad}</td><td>${a.vendedor}</td><td>${a.fecha}</td>
      <td></td></tr>`;
  });
}

// ================= Inventario ==================
function guardarProducto() {
  let p = {
    codigo: document.getElementById("codigoProducto").value,
    nombre: document.getElementById("nombreProducto").value,
    stock: parseInt(document.getElementById("stockInicial").value)
  };
  inventario.push(p);
  localStorage.setItem("inventario", JSON.stringify(inventario));
  mostrarProductos();
}

function mostrarProductos() {
  let tbody = document.querySelector("#tablaInventario tbody");
  tbody.innerHTML = "";
  inventario.forEach((p,i) => {
    tbody.innerHTML += `<tr>
      <td>${p.codigo}</td><td>${p.nombre}</td><td>${p.stock}</td>
      <td><button onclick="eliminarProducto(${i})">Eliminar</button></td>
    </tr>`;
  });
}

function eliminarProducto(i) {
  inventario.splice(i,1);
  localStorage.setItem("inventario", JSON.stringify(inventario));
  mostrarProductos();
}

// ================= Clientes ==================
function guardarCliente() {
  let c = {
    codigo: document.getElementById("codigoNuevoCliente").value,
    nombre: document.getElementById("nombreNuevoCliente").value,
    cedula: document.getElementById("cedulaNuevoCliente").value,
    direccion: document.getElementById("direccionNuevoCliente").value,
    vendedor: document.getElementById("vendedorNuevoCliente").value
  };
  clientes.push(c);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  mostrarClientes();
}

function mostrarClientes() {
  let tbody = document.querySelector("#tablaClientes tbody");
  tbody.innerHTML = "";
  clientes.forEach((c,i) => {
    tbody.innerHTML += `<tr>
      <td>${c.codigo}</td><td>${c.nombre}</td><td>${c.cedula}</td><td>${c.direccion}</td><td>${c.vendedor}</td>
      <td><button onclick="eliminarCliente(${i})">Eliminar</button></td>
    </tr>`;
  });
}

function eliminarCliente(i) {
  clientes.splice(i,1);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  mostrarClientes();
}

// ================= Vendedores ==================
function guardarVendedor() {
  let v = {
    codigo: document.getElementById("codigoNuevoVendedor").value,
    nombre: document.getElementById("nombreNuevoVendedor").value
  };
  vendedores.push(v);
  localStorage.setItem("vendedores", JSON.stringify(vendedores));
  mostrarVendedores();
}

function mostrarVendedores() {
  let tbody = document.querySelector("#tablaVendedores tbody");
  tbody.innerHTML = "";
  vendedores.forEach((v,i) => {
    tbody.innerHTML += `<tr>
      <td>${v.codigo}</td><td>${v.nombre}</td>
      <td><button onclick="eliminarVendedor(${i})">Eliminar</button></td>
    </tr>`;
  });
}

function eliminarVendedor(i) {
  vendedores.splice(i,1);
  localStorage.setItem("vendedores", JSON.stringify(vendedores));
  mostrarVendedores();
}

// Inicialización
window.onload = () => {
  document.getElementById("numeroActa").value = generarNumeroActa();
  document.getElementById("fecha").value = new Date().toLocaleDateString();
  mostrarActas();
  mostrarProductos();
  mostrarClientes();
  mostrarVendedores();
};
