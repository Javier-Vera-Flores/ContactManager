const soap = require('soap');
const readline = require('readline');
const url = 'http://192.168.56.1:3000/calculator?wsdl';

// Definimos un interfaz para la captura de datos por teclado
const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
});

// Se muestra un mensaje indicando que se cargó la lista de contactos
// Se recibe del servidor una agenda para poderla imprimir los contactos en consola
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

// Se muestra el menú de opciones en agenda
function mostrarMenu(){
    console.log("1. AgregarContacto \n 2. EliminarContacto \n 3. BuscarContacto \n 4. EditarContacto \n 5. OrdenarContactos \n")
    console.log("\t Ingresa tu opción \n")
}

// Captura los datos de un contacto a añadir
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

// Función para manejar la opción seleccionada
function manejarOpcion(opcion) {
    switch(opcion) {
        case '1':
            agregarContacto();
            break;
        case '2':
            eliminarContacto();
            break;
        case '3':
            buscarContacto();
            break;
        case '4':
            editarContacto();
            break;
        case '5':
            ordenarContactos();
            break;
        default:
            console.log("Opción no válida.");
            preguntarOpcion();
    }
}

// Función para agregar un contacto
function agregarContacto() {
    getContactInputs((contacto) => {
        // Crear un objeto Agenda con el nuevo contacto
        const agenda = { contactList: [contacto] };
        
        // Llamar al servicio SOAP para agregar el contacto
        client.AgregarContacto(agenda, (err, result) => {
            if (err) {
                console.error('Error al agregar contacto:', err);
            } else {
                console.log('Contacto agregado con éxito.');
                preguntarOpcion();
            }
        });
    });
}

// Función para eliminar un contacto
function eliminarContacto() {
    rl.question('Ingrese el nombre del contacto a eliminar: ', (nombre) => {
        // Llamar al servicio SOAP para eliminar el contacto
        client.EliminarContacto({ nombre }, (err, result) => {
            if (err) {
                console.error('Error al eliminar el contacto:', err);
            } else {
                console.log('Contacto eliminado con éxito.');
                preguntarOpcion();
            }
        });
    });
}

// Función para buscar un contacto
function buscarContacto() {
    rl.question('Ingrese el nombre del contacto a buscar: ', (nombre) => {
        client.BuscarContacto({ nombre }, (err, result) => {
            if (err) {
                console.error('Error al buscar el contacto:', err);
            } else {
                if (result.contact) {
                    console.log('Contacto encontrado:');
                    console.log(`Nombre: ${result.contact.nombre}`);
                    console.log(`Teléfono Principal: ${result.contact.telPrincipal}`);
                    console.log(`Teléfono Celular: ${result.contact.telCelular}`);
                    console.log(`Correo: ${result.contact.correo}`);
                } else {
                    console.log('Contacto no encontrado.');
                }
                preguntarOpcion();
            }
        });
    });
}

// Función para editar un contacto
function editarContacto() {
    rl.question('Ingrese el nombre del contacto a editar: ', (nombre) => {
        client.BuscarContacto({ nombre }, (err, result) => {
            if (err) {
                console.error('Error al buscar el contacto:', err);
            } else {
                if (result.contact) {
                    console.log('Contacto encontrado:');
                    console.log(`Nombre: ${result.contact.nombre}`);
                    console.log(`Teléfono Principal: ${result.contact.telPrincipal}`);
                    console.log(`Teléfono Celular: ${result.contact.telCelular}`);
                    console.log(`Correo: ${result.contact.correo}`);

                    // Preguntar por los nuevos datos
                    getContactInputs((nuevoContacto) => {
                        // Llamar al servicio SOAP para editar el contacto
                        client.EditarContacto({ nombre, nuevoContacto }, (err, result) => {
                            if (err) {
                                console.error('Error al editar el contacto:', err);
                            } else {
                                console.log('Contacto editado con éxito.');
                            }
                            preguntarOpcion();
                        });
                    });
                } else {
                    console.log('Contacto no encontrado.');
                    preguntarOpcion();
                }
            }
        });
    });
}

// Función para ordenar los contactos (ejemplo de ordenación por nombre)
function ordenarContactos() {
    client.ObtenerAgenda({}, (err, result) => {
        if (err) {
            console.error('Error al obtener la agenda:', err);
        } else {
            result.contactList.sort((a, b) => a.nombre.localeCompare(b.nombre));
            console.log('Agenda ordenada:');
            imprimirAgenda(result.contactList);
            preguntarOpcion();
        }
    });
}

// Iniciar el ciclo de preguntas
const preguntarOpcion = () => {
    mostrarMenu();
    rl.question('Seleccionar una opción: ', manejarOpcion);
};

// Llamar a la operación ObtenerAgenda al inicio
soap.createClient(url, (err, client) => {
    if (err) {
        console.error('Error al crear el cliente:', err);
        return;
    }

    console.log('Cliente SOAP creado.');
    client.ObtenerAgenda({}, (err, result) => {
        if (err) {
            console.error('Error al obtener la agenda:', err);
        } else {
            imprimirAgenda(result.contactList);
            preguntarOpcion();
        }
    });
});
