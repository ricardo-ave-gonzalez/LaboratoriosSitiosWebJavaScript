console.log('Ajax - Asynchronous Javascript And XML')

/* ----------------- */
/* CÓDIGO SINCRÓNICO */
/* ----------------- */
/*
console.log('inicio de tareas')

console.log('tarea 1 - paso 1'); for(let i=0; i<3e9; i++);
console.log('tarea 1 - paso 2'); for(let i=0; i<3e9; i++);
console.log('tarea 1 - paso 3'); for(let i=0; i<3e9; i++);
console.log('tarea 1 - paso 4'); for(let i=0; i<3e9; i++);

console.log('tarea 2 - paso 1'); for(let i=0; i<3e9; i++);
console.log('tarea 2 - paso 2'); for(let i=0; i<3e9; i++);
console.log('tarea 2 - paso 3'); for(let i=0; i<3e9; i++);
console.log('tarea 2 - paso 4'); for(let i=0; i<3e9; i++);

console.log('otras tareas...')
*/

/* ------------------ */
/* CÓDIGO ASINCRÓNICO */
/* ------------------ */
/*
console.log('inicio de tareas 1')
console.log('tarea 1 - paso 1')
setTimeout(() => {
    console.log('tarea 1 - paso 2')
    setTimeout(() => {
        console.log('tarea 1 - paso 3')
        setTimeout(() => {
            console.log('tarea 1 - paso 4')
        },1000)
    },1000)
},1000)

console.log('inicio de tareas 2')
console.log('tarea 2 - paso 1')
setTimeout(() => {
    console.log('tarea 2 - paso 2')
    setTimeout(() => {
        console.log('tarea 2 - paso 3')
        setTimeout(() => {
            console.log('tarea 2 - paso 4')
        },1500)
    },1500)
},1500)

console.log('otras tareas...')
*/

/* -------------------------------------- */
/* AJAX (Asynchronous Javascript and XML) */
/* -------------------------------------- */
let xhr = new XMLHttpRequest
console.log(xhr.readyState)
/*
---------------------------------------------------
ready state:
0 -> Instancia está creada
1 -> Instancia está configurada
2 -> Intercambio de headers entre cliente y servidor
3 -> Transferencia de información
4 -> Fin de la comunicación (ok o no ok)
---------------------------------------------------
state
200 -> transferencia correcta
otros -> error
---------------------------------------------------
*/

/*
xhr.addEventListener('readystatechange', () => {
    console.log('readystatechange', xhr.readyState)

    if(xhr.readyState == 2) {
        let headers = xhr.getAllResponseHeaders()
        //console.log(headers)
        let tipo = xhr.getResponseHeader('content-type')
        console.log(tipo)

        //if(tipo != 'text/html') {  // da error porque me llego un recurso text/plain
        //if(!tipo.includes('text/plain')) {
        if(tipo.includes('text/plain') == false) {
            xhr.abort()
        }
    }

    if(xhr.readyState == 4) {
        if(xhr.status == 200) {
            console.log('respuesta:', xhr.response)
        }
        else {
            console.error('Error! status:', xhr.status)
        }
    }
})
*/
xhr.addEventListener('load', () => {
    if(xhr.status == 200) {
        console.log(xhr.response)
    }
    else {
        console.error('Error! status:', xhr.status)
    }
})

xhr.addEventListener('timeout', () => {
    console.log('El pedido se ha excedido de tiempo')
})

xhr.open('get','texto.txt')
xhr.timeout = 0//1
xhr.send()
