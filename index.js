const child = require ('child_process');
const fs = require ('fs');
const args = process.argv.slice(2);
let nombre_archivo = args[0];
let extension = args[1];
let moneda = args[2];
let cantidad = Number(args[3]);

function exe (){
    return new Promise((resolve) =>{
        child.exec(`node child.js ${nombre_archivo} ${extension} ${moneda} ${cantidad}`, (err, resultado)=>{
            resolve(resultado);
        });
    });
};
 
exe().then(() =>{
    fs.readFile(`${nombre_archivo}.${extension}`,'utf8',(err,data) =>{
        console.log(data);
    });
});