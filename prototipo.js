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
    ordenarContactos(parametro1, parametro2){
        
    }
}