const soap = require('soap');
const readline = require('readline');
const url = 'http://192.168.56.1:3000/calculator?wsdl';


//Definimos un interfaz para la captura de datos por teclado
const rl = readline.Interface({
    input: process.stdin,
    output: process.output
});
//Se muestra un mensaje indicando que se cargo la lista de contactos
//Se recibe del servidor un agenda para poderla imprimir lo contacto en consola
// Función para imprimir la lista de contactos
function imprimirAgenda(contactList) {
    console.log('Agenda recibida:');
    contactList.forEach((contact, index) => {
        console.log(`Contacto ${index + 1}:`);
        console.log(`  Nombre: ${contact.nombre}`);
        console.log(`  Teléfono Principal: ${contact.telPrincipal}`);
        console.log(`  Teléfono Celular: ${contact.telCelular}`);
        console.log(`  Correo: ${contact.correo}`);
        console.log("--------------------------------------------------");
    });
}

//Se muestra menu de opciones en agenda
function mostrarMenu(){
    console.log("1. AgregarContacto \n 2. EliminarContacto \n 3. BuscarContacto \n 4. EditarContacto \n 5. OrdenarContactos \n")
    console.log("\t Ingresa tu opcion \n")
}
//Se captura la opcion del cliente


//Funcion para capturar los datos de un contacto a añadir
function getContactInputs(callback) {
    rl.question('Ingrese el nombre: ', (nombre) => {
        rl.question('Ingrese el teléfono: ', (telefono) => {
            rl.question('Ingrese el celular: ', (celular) => {
                rl.question('Ingrese el correo: ', (correo) => {
                    callback({ nombre, telefono, celular, correo });
                });
            });
        });
    });
}

//logica de conexion con server
soap.createClient(url, (err, client) => {
    if (err) {
        console.error('Error al crear el cliente:', err);
        return;
    }

    console.log('Cliente SOAP creado.');
    //Se imprimer lista de contactos recibida:
    const preguntarOpcion = () => {
        mostrarMenu();
        rl.question('Seleccionar una opción: ', manejarOpcion);
    };

    // Llamar a la operación ObtenerAgenda
    client.ObtenerAgenda({}, (err, result) => {
        if (err) {
            console.error('Error al obtener la agenda:', err);
        } else {
            imprimirAgenda(result.contactList);
        }
    });
});
