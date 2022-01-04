

function compraTotal(unidadesDeStorage) {
    acumulador = 0;
    unidadesDeStorage.forEach((unidadCart) => {
        acumulador += unidadCart.precio * unidadCart.quant
    })

    if(acumulador == 0) {
        parrafoCompra.innerHTML = ""
        modalBody.innerHTML = "<p>No hay unidades en tu carrito. </p>" 
    } else {
        parrafoCompra.innerHTML = `Importe Final: $${new Intl.NumberFormat("de-DE").format(acumulador)}`
    }
   
}

function cargarEventosModal(unidadesDeStorage) {

    unidadesDeStorage.forEach((unidadCart, indice) => {
        document.getElementById(`btnDel${indice}`).addEventListener('click', () => {
            console.log(`Producto ${unidadCart.nombre} eliminado`)
            document.getElementById(`unidadCart${indice}`).remove()
            unidades.splice(indice, 1)
            localStorage.setItem('cart', JSON.stringify(unidades))
            cargarProductosModal(JSON.parse(localStorage.getItem('cart')))
        })
    })

}

function cargarProductosModal(unidadesDeStorage) {

    modalBody.innerHTML = " "  
    unidadesDeStorage.forEach((unidadCart, indice) => {
        
        modalBody.innerHTML += `
            <div class="card border-primary centered mb-3" id ="unidadCart${indice}" style="max-width: 540px;">
            <div class="card-header">${unidadCart.marca}</div>
            <div class="card-img">
                <img src="../assets/img/${unidadCart.img}" class="card-img-top" alt="${unidadCart.modelo}">
            </div>
            <div class="card-body centered">
                <h4 class="card-title centered">${unidadCart.modelo}</h4>
                <p class="card-text">Cantidad: ${unidadCart.quant}</p>
                <p class="card-text centered">Precio unitario: $${new Intl.NumberFormat("de-DE").format(unidadCart.precio)}</p>
                <p class="card-text">Precio final: $${new Intl.NumberFormat("de-DE").format(unidadCart.precio * unidadCart.quant)}</p>
                <button class= "btn btn-link" id="btnDel${indice}"><i class="fas fa-trash-alt"></i></button>
            </div>
            </div>
            </div>
        </div>
    `
})
cargarEventosModal(unidadesDeStorage)
compraTotal(unidadesDeStorage)
}

btnCart.addEventListener('click', () => {
    let unidadesDeStorage = JSON.parse(localStorage.getItem('cart'))

    cargarProductosModal(unidadesDeStorage)
    
})

btnFinalizarCompra.addEventListener('click', () => {
    
    localStorage.setItem('cart', JSON.stringify([]))
    swal(`¡Gracias por tu compra!¡Ya estamos preparando tu pedido!`,`Tu código de pedido es SAM${Math.floor(Math.random() * 15542) + 348} ¡Toma nota!`, "success",
{button:"Entendido",});
    
})

