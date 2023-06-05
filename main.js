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
  
  //mostrar por pantalla datos del paciente

const botonRegistro = document.getElementById("registro");
const datos = document.getElementById("datos");
const paciente = JSON.parse(localStorage.getItem("Paciente"));

botonRegistro.addEventListener("click" , () => {
    let persona = " ";
    console.log(paciente);    
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
const paciente1 = JSON.parse(localStorage.getItem("Paciente"));
console.log(paciente1);

botonCita.addEventListener("click" , () => { 
    
    paciente.forEach(paciente1 => {
        atencion(nombre, apellido, doctor);
    })
});
});

// funcion de atencion al cliente, se asocia al doctor
function atencion(nombrePaciente, apellidoPaciente, id){
    let especialista = parseInt(id);
    const resumen = document.getElementById("resumen");
    switch(especialista){
        case 1:
            resumen.innerHTML = `<p>Bienvenido ${nombrePaciente} ${apellidoPaciente} enseguida lo atenderá el cirujano</p>`;
            break;
        case 2:
            resumen.innerHTML = `<p>Bienvenido ${nombrePaciente} ${apellidoPaciente} enseguida lo atenderá el odontólogo</p>`;
            break;
        case  3:
            resumen.innerHTML = `<p>Bienvenido ${nombrePaciente} ${apellidoPaciente} enseguida lo atenderá el pediatra</p>`;
            break;
        default:
            resumen.innerHTML = `<p>Lo sentimos mucho ${nombrePaciente} ${apellidoPaciente} no hay médico de esa especialidad</p>`;
            break;    
        }
}

// borrar locastorage
let eliminar = document.getElementById("eliminar");
eliminar.addEventListener("click", () => {
    localStorage.clear();
})

