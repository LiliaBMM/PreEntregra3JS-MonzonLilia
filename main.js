
// /*Clase constructora de paciente*/
class Pacientes {
    constructor(nombre, apellido, telefono, doctor){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.doctor = doctor;
    }
}
// /*inicializo un arreglo vacio para generar el arreglo de pacientes*/
const listaPacientes = [ ]; 
// console.log(listaPacientes);

// Traer el formulario desde html
const idFormulario = document.getElementById('formulario');

// evento que envia datos de formulario con prenventDefault para evitar que se recargue la pagina
idFormulario.addEventListener('submit', (e) => {
  e.preventDefault();
    
// traigo cada elemento del formulario para hacer el arreglo, usando mi clase constructora  
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const telefono = document.getElementById('telefono').value;
  const doctor = document.getElementById('doctor').value;
  const pacientes = new Pacientes(nombre, apellido, telefono, doctor);
  listaPacientes.push(pacientes);

  //mandar los datos al Storage:
  localStorage.setItem('Paciente', JSON.stringify(listaPacientes));

  //Limpiamos el formulario
    idFormulario.reset();
  
  //mostrar por pantalla datos del paciente que se registra:
    const datos = document.getElementById("datos");
    const paciente = JSON.parse(localStorage.getItem("Paciente"));
    let persona = " ";
    paciente.forEach(paciente => {
        persona += `
            <p>Nombre: ${paciente.nombre}</p>
            <p>Apellido: ${paciente.apellido}</p>
            <p>Teléfono: ${paciente.telefono}</p>
            <hr />`;
        });
    datos.innerHTML = persona;
});

// Mostrar cita del paciente
const botonCita = document.getElementById("cita");
botonCita.addEventListener("click" , () => { 
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const doctor = document.getElementById('doctor').value;
    const paciente = new Pacientes(nombre, apellido, telefono, doctor);
    localStorage.setItem('cita', JSON.stringify(paciente));  
    idFormulario.reset();
    atencion(nombre, apellido, doctor);
});

// funcion de atencion al cliente, se asocia al doctor
function atencion(nombrePaciente, apellidoPaciente, id){
    let especialista = parseInt(id);
    const resumen = document.getElementById("resumen");
    switch(especialista){
        case 1:
            Swal.fire(`Bienvenido ${nombrePaciente} ${apellidoPaciente} enseguida lo atenderá el cirujano`);
            break;
        case 2: 
            Swal.fire(`Bienvenido ${nombrePaciente} ${apellidoPaciente} enseguida lo atenderá el odontólogo`);
            break;
        case  3:
            Swal.fire(`Bienvenido ${nombrePaciente} ${apellidoPaciente} enseguida lo atenderá el pediatra`);
            break;
        default:
            Swal.fire(`Lo sentimos mucho ${nombrePaciente} ${apellidoPaciente} no hay médico de esa especialidad`);
            break;    
        }
}

// lista de pacientes asociado a cada doctor:
let lista = document.getElementById("listado");
let d1 = document.getElementById('pacientes1');
let d2 = document.getElementById('pacientes2');
let d3 = document.getElementById('pacientes3');
let cirujano = document.getElementById('cirujano');
let odontologo = document.getElementById('odontologo');
let pediatra = document.getElementById('pediatra');

// uso del base de datos del
let pacienteNuevo = 
fetch("./pacientes.json")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        datos.forEach((pacientes) => {
            if(pacientes.id === 1){
                cirujano.addEventListener('mousedown', () => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                    <li class="list-group-item">Nombre: ${pacientes.nombre}</li>
                    <li class="list-group-item">Apellido: ${pacientes.apellido}</li>
                    <li class="list-group-item">Teléfono: ${pacientes.telefono}</li>
                    `;
                d1.append(li);
                
                });
            }else if(pacientes.id === 2) {
                odontologo.addEventListener('mousedown', () => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                    <li class="list-group-item">Nombre: ${pacientes.nombre}</li>
                    <li class="list-group-item">Apellido: ${pacientes.apellido}</li>
                    <li class="list-group-item">Teléfono: ${pacientes.telefono}</li>
                    `;
               d2.append(li); 
                })
            }else if (pacientes.id === 3) {
                pediatra.addEventListener('mousedown', () => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                    <li class="list-group-item">Nombre: ${pacientes.nombre}</li>
                    <li class="list-group-item">Apellido: ${pacientes.apellido}</li>
                    <li class="list-group-item">Teléfono: ${pacientes.telefono}</li>
                    `;
                    d3.append(li);
                })
            };
        });
    });



// borrar locastorage y pantalla
let eliminar = document.getElementById("eliminar");
eliminar.addEventListener("click", () => {
    localStorage.clear();
    resumen.innerHTML = " ";
    datos.innerHTML = " ";
})



























