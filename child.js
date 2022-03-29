// Requerimientos
// 1. Recibir por la línea de comando los siguientes argumentos:
// a. Nombre del archivo que se creará.
// b. Extensión del archivo.
// c. Indicador económico que se desea convertir.
// d. Cantidad de pesos que se quiere cambiar.
// 2. Consultar la API con el módulo https y almacenar la respuesta en una variable.
// 3. Crear un archivo con el módulo fs cuyos datos están formados por los argumentos
// recibidos por línea de comando y su contenido basado en el template de la
// descripción.
// 4. Enviar por consola el contenido del archivo luego de que haya sido creado.
// 5. Ejecutar la aplicación desde un archivo externo con el módulo child_process
// enviando los argumentos correspondientes y devolviendo por consola el contenido
// del archivo luego de que haya sido creado.

const https = require ('https');
const fs = require ('fs');


const args = process.argv.slice(2);
let nombre_archivo = args[0];
let extension = args[1];
let moneda = args[2];
let cantidad = Number(args[3]);
let fecha = new Date();
https.get('https://mindicador.cl/api',(resp)=>{
    let data = '';
    resp.on('data', (respDatos)=>{
        data +=respDatos;
    });
    resp.on('end', ()=>{
        // console.log(JSON.parse(data));
        let datApi  = JSON.parse(data);
        console.log(datApi[moneda].valor);
        let calculo = Number((cantidad / datApi[moneda].valor));
        
        fs.writeFile(`${nombre_archivo}.${extension}`,`A la fecha: ${fecha} 
        Fue realizada cotización con los siguientes datos: 
        Cantidad de pesos a convertir: ${cantidad}
        Convertido a "${moneda}" da un total de:
        ${calculo}`,'utf8', () => console.log('Se creó el archivo '+nombre_archivo)
        );
        

    });
}).on('error',(err)=>{
    console.log("Error: "+err.message);
});    


// A la fecha: {Thu Sep 03 2020 18:41:00 GMT-0400 (GMT-04:00)}
// Fue realizada cotización con los siguientes datos:
// Cantidad de pesos a convertir: {250000 pesos}
// Convertido a "{dólar}" da un total de:
// ${324,06}