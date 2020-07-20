console.log('SPA')

function ajax(url, metodo) {
    let httpMetodo = metodo || 'get'
    let xhr = new XMLHttpRequest
    xhr.open(httpMetodo, url)
    xhr.send()

    return xhr
}

/* Inyección de la navbar (desde navbar.html) en el HTML pricipal */
let nav = document.querySelector('nav')
let xhr = ajax('navbar.html')
xhr.addEventListener('load', () => {
    if(xhr.status == 200) {
        nav.innerHTML = xhr.response

        //barraNavegacionCargada_SinHistory()
        //barraNavegacionCargada_ConHistoryHash()
        barraNavegacionCargada_ConHistoryPush()
    }
})

function barraNavegacionCargada_SinHistory() {
    let main = document.querySelector('main')
    let links = document.querySelectorAll('a')
    //console.log(links)

    /* cargo eventos de click en cada link a */
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            //console.log(id)
            let archivo = id + '.html'
            console.log(archivo)

            let xhr = ajax(archivo)
            xhr.addEventListener('load', () => {
                if(xhr.status == 200) {
                    main.innerHTML = xhr.response
                }
            })
        })
    })

    /* Cargo página inicial */
    let archivo = 'home.html'
    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })
}

function barraNavegacionCargada_ConHistoryHash() {
    let main = document.querySelector('main')
    let links = document.querySelectorAll('a')
    //console.log(links)

    /* cargo eventos de click en cada link a */
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            location.hash = id
        })
    })

    window.addEventListener('hashchange', () => {
        console.log('Cambió la URL')

        let hash = location.hash
        //console.log(hash)
        let archivo = hash.slice(1) + '.html'
        console.log(archivo)

        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
                main.innerHTML = xhr.response
            }
        })        
    })

    /* Cargo página inicial */
    let hash = location.hash
    let archivo = hash? (hash.slice(1) + '.html') : 'home.html'
    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })
}

function savePage(page) {
    localStorage.setItem('PAGE', page)
}

function getPage() {
    return localStorage.getItem('PAGE')
}

function barraNavegacionCargada_ConHistoryPush() {
    let main = document.querySelector('main')
    let links = document.querySelectorAll('a')
    //console.log(links)

    /* cargo eventos de click en cada link a */
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            let archivo = id + '.html'
            //console.log(archivo)

            let xhr = ajax(archivo)
            savePage(archivo)
            xhr.addEventListener('load', () => {
                if(xhr.status == 200) {
                    main.innerHTML = xhr.response
                   
                    history.pushState({
                        template : xhr.response
                    },'', id)
                }
            })            
        })
    })

    window.addEventListener('popstate', e => {
        console.log('Cambió el historial')

        console.log(e)

        if(e.state.template) {
            main.innerHTML = e.state.template
        }
        else {
            let pathname = location.pathname
            //console.log(hash)
            let archivo = pathname.slice(1) + '.html'
            console.log(archivo)

            let xhr = ajax(archivo)
            savePage(archivo)
            xhr.addEventListener('load', () => {
                if(xhr.status == 200) {
                    main.innerHTML = xhr.response
                }
            })
        }
    })

    /* Cargo página inicial */
    let page = getPage()
    let archivo = page? page : 'home.html'
    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            main.innerHTML = xhr.response
        }
    })
}