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
const child = require('child_process');

const args = process.argv.slice(4);
let nombreArchivo = args[0];
let extension = args[1];
let moneda = args[2];
let cantidad = args[3];

https.get('https://mindicador.cl/api',(resp)=>{
    let data = '';
    resp.on('data', (respDatos)=>{
        data +=respDatos;
    })
    resp.on('end', ()=>{
        // console.log(JSON.parse(data));
        let datApi  = JSON.parse(data);
        console.log(datApi[`${moneda}`].valor);
        
        

    });
}).on('error',(err)=>{
    console.log("Error: "+err.message);
});    


// fs.writeFile('NombreArchivo.txt','Contenido ','utf8',()=>{
//     console.log('Archivo creado.');
// });
// let unidadejemplo = dataapi.find((elemento) => elemento.unidad_medida == unidadmedida);