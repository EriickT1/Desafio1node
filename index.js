const child = require ('child_process');

function exe (archivo){
    return new Promise((resolve) =>{
        child.exec(`node index.js ${nombreArchivo} ${extension} ${moneda} ${cantidad}`, (err, resultado)=>{
            resolve(resultado);
        });
    }).then()
}
exe()