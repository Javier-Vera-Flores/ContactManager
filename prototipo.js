const fs = require('fs');
class Contacto{
    constructor(nombre, telPrincipal, telCelular, correo){
        this.nombre = nombre;
        this. telPrincipal = telPrincipal;
        this.telCelular = telCelular;
        this.correo = correo;
    }
}
class Agenda{
    constructor(){
        //definimos un array para almacenar los contactos
        this.contactos = [];
    }
    cargarArchivosContacto(){
        //cargamos el archivo
        const data = fs.readFileSync('Directory.csv','utf8');
        const lineas = data.split('\n'); //cada salto de linea es una linea
        

        //nombre !== null && nombre !== undefined && telPrincipal !== null && telPrincipal !== undefined &&  telCelular !== null && telCelular !== undefined && correo !== null && correo !== undefined)
        //El programa se ejecuta solo si todos los campos son validos
        lineas.forEach(linea =>{

            //Desestructuramos el array
            const [nombre, telPrincipal, telCelular, correo] = linea.split(',');
            
            if(nombre && telPrincipal && telCelular && correo){
                
                //Creamos un nuevo contacto
                const contacto = new Contacto(nombre, telPrincipal, telCelular, correo);
    
                //añadimos el nuevo contacto a la agenda:
                //ocupamos el metodo de agregar que abajo creamos para añadir a la Agenda
                this.agregarContacto(contacto);
    
    
            }
        });
    }
    agregarContacto(contacto){
        this.contactos.push(contacto);
    }
    //se crea metodo para buscar contacto por nombre
    buscarContacto(nombre){
        //Se recorre todo la agenda de contactos
        let contactoEncontrado = this.contactos.find(contacto => contacto.nombre == nombre);
        if(contactoEncontrado == undefined){
            console.log("Contacto no encontrado");
            return;
        }
        return contactoEncontrado;
    }
    eliminarContacto(nombre){
        const index = this.contactos.findIndex(contacto => contacto.nombre == nombre);
        if(index != -1){
            this.contactos.splice(index,1);
        }
    }
    editarContacto(nombre, datoAModificar, opcionModificar){
        /*¨
            opciones de moficación
            1. nombre
            2. telPrincipal
            3. telCelular
            4. correo
        
        */
        let contactoAModificar = this.buscarContacto(nombre);
        if(contactoAModificar == undefined){
            // Se envia mensaje de contacto no encontrado
            console.log("Contacto no encontrado");
            return;
        }
   
        switch(opcionModificar){
            case 1:
                contactoAModificar.nombre = datoAModificar;
                break;
            case 2: 
                contactoAModificar.telPrincipal = datoAModificar;
                break;
            case 3:
                contactoAModificar.telCelular = datoAModificar;
                break;
            case 4:
                contactoAModificar.correo = datoAModificar;
                break;
        }
        
    }
    ordenarContactos(opcionOrdenar){
        switch(opcionOrdenar){
            //Se ordenara por indice alfabetico de acuerdo al nombre
            case 'ordenarPorNombre':
                this.contactos.sort((contactoA,contactoB)=>contactoA.nombre.localeCompare(contactoB.nombre))
                break;

            case 'ordenarPorCorreo':
                //Se ordenara de acuerdo al dominio del correo
                //los que tiene dominio @azc.uam.mx iran primero
                //por ejemplo para los que tiene dominio @outlook.com.mx iran segundo,
                //los que tenga dominio @gmail.com.mx iran tercero 
                this.contactos.sort((contactoA, contactoB) => {
                    const dominioA = contactoA.correo.split('@')[1];
                    const dominioB = contactoB.correo.split('@')[1];
                    //Se manda el resultado de la comparación
                    return dominioA.localeCompare(dominioB);
                });
                break;
            case 'ordenarPorLada':
                this.contactos.sort((contactoA, contactoB) => {
                    //Se extrae la lada de los dos primero disgitos del numero
                    const ladaA = contactoA.telPrincipal.substring(0,2);
                    const ladaB = contactoB.telPrincipal.substring(0,2);
                    //Se envia la comparacion de ambas ladas lexicograficamente
                    return ladaA.localeCompare(ladaB);
                });

                break;
            
        
            
        }
    }
}