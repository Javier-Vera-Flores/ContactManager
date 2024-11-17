const soap = require('soap');
const express= require('express');

const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;                                      //Puerto para usarse

const service =  {                                      //Creacion de un servicio
    CalculatorService: {                                //Serivicio a utilizar
        CalculatorPort: {                               //Puerto del servicio que se utiliza
            Add: function(args, callback){              //Uso de funcionalidad del servicio
                const intA = args.intA;                 //Asignacion en constantes
                const intB = args.intB;                 //Arriba x2
                const result=intA+intB;                 //Lo que hace el servicio
                callback(null, {AddResult: result});    //Regresa null si esta vacio, en caso contrario el resultado del servicio
            },
            Sub: function(args, callback){
                const intA = args.intA;
                const intB = args.intB;
                const result = intA - intB;
                callback(null, {SubResult: result});
            },
            Mult: function(args, callback){
                const intA = args.intA;
                const intB = args.intB;
                const result = intA * intB;
                callback(null,{MultResult: result});
            },
            Div: function(args, callback){
                const intA = args.intA;
                const intB = args.intB;
                
                //veremos que el denominador intB no sea igual a cero
                if(intB == 0){
                    //enviaremos un mensaje de error usando
                    callback({faultcode: 'SOAP-ENV:Server',
                        faultstring: 'Error: División por cero no permitida.'});
                    //callback({ faultString: 'Error: División por cero no permitida' });    
                }else{
                    const result = intA / intB;
                    callback(null,{DivResult: result});
                }
            }
        }

    }
};


const wsdlPath = path.join(__dirname, 'requirements.wsdl');
const wsdl= fs.readFileSync(wsdlPath, 'utf8');

app.listen(PORT, ()=>{
    soap.listen(app, '/calculator', service, wsdl);
    console.log('Servicio SOAP corriendo en http://192.168.0.213:3000/calculator');
});



