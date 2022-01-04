//Carrito
localStorage.setItem('cart', JSON.stringify([]))
let divUnidades = document.getElementById("divUnidades")
let btnCart = document.getElementById("btnCart")
let modalBody = document.getElementById("modalBody")
let modalResult = document.getElementById("modalResult")
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra")
let btnDel = document.getElementById("btnDel")
let parrafoCompra = document.getElementById("precioTotal")
let acumulador;
let modalEnd = document.getElementById("modalEnd")

fetch('../js/unidades.json')
.then(Response => Response.json())
.then(dataUnidades => {
        dataUnidades.forEach((unidadEnArray, indice)=> {
            divUnidades.innerHTML += `
            <div class="card border-light mb-3 cardUnit ${unidadEnArray.class}" id="unidad${indice}" style="max-width: 20rem;">
                <div class="card-header">${unidadEnArray.marca}</div>
                <img src="../assets/img/${unidadEnArray.img}" class="card-img-top" alt="${unidadEnArray.modelo}">
                <div class="card-body">
                    <h4 class="card-title">${unidadEnArray.modelo}</h4>
                    <p class="card-text">Precio: $${unidadEnArray.precio}</p>
                    <p class="card-text">Unidades disponibles: ${unidadEnArray.stock}</p>
                    <button id="boton${indice}" class="btn btn-dark">Comprar</button>
                </div>
            </div>
            `
            //let unidad = JSON.parse(unidadEnArray)
            //unidades.push(unidad)
            
        });

        dataUnidades.forEach((unidadEnArray, indice) => {

        document.getElementById(`boton${indice}`).addEventListener('click', () => {
            if(unidades.find(unidad => unidad.marca == unidadEnArray.marca)) {

                let index = unidades.findIndex(unidad => unidad.marca == unidadEnArray.marca)
                unidades[index].quant++
                localStorage.setItem('cart', JSON.stringify(unidades))

            }  else {
            
            let unidad = new units(unidadEnArray.marca, unidadEnArray.modelo, unidadEnArray.precio, unidadEnArray.stock, unidadEnArray.img, unidadEnArray.seal)
            unidades.push(unidad)
            localStorage.setItem('cart', JSON.stringify(unidades))
            
            }
            
     
        })
            
    });
})

btnCart.addEventListener('click', () => {
    let unidadesDeStorage = JSON.parse(localStorage.getItem('cart'))
    
    unidadesDeStorage.forEach((unidadCart, indice) => {
        modalBody.innerHTML += `
    
        <div class="card border-success mb-3" id="unidadesCart${indice}" style="max-width: 20rem;">
            <div class="card-header">${unidadCart.marca}</div>
                    <div class="card-img">
                        <img src="../assets/img/${unidadCart.img}" class="card-img-top" alt="${unidadCart.modelo}">
                    </div>
                    <div class="card-body centered">
                        <h4 class="card-title centered">${unidadCart.modelo}</h4>
                        <p class="card-text">Cantidad: ${unidadCart.quant}</p>
                        <p class="card-text centered">Precio: $${new Intl.NumberFormat("de-DE").format(unidadCart.precio)}</p>
                        <p class="card-text">Valor final: $${new Intl.NumberFormat("de-DE").format(unidadCart.precio * unidadCart.quant)}</p>
                        <button class="btn btn-link" id="btnDel${indice}"><i class="fas fa-trash-alt centered"></i></button>
                    </div>
            </div>
        
        `
        
        function compraTotal(unidadesDeStorage) {
            acumulador = 0;
            unidadesDeStorage.forEach((unidadCart) => {
                acumulador += unidadCart.precio * unidadCart.quant
            })
        
            if(acumulador == 0) {
                parrafoCompra.innerHTML = ""
                modalResult.innerHTML = "<p>No hay productos agregados en el carrito </p>" 
            } else {
                parrafoCompra.innerHTML = `Carrito Completo: $${new Intl.NumberFormat("de-DE").format(acumulador)}`
            }
           
        }

        
    })
         
})
