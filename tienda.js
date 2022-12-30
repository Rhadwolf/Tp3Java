const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML =`
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;

 shopContent.append(content);

 let comprar = document.createElement("button");
 comprar.innerText = "comprar";
 comprar.className = "comprar";

 content.append(comprar);

 comprar.addEventListener("click", () => {
    carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
    });
    saveLocal();
 });
});

    const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
     <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((product) =>{
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML =`
                   <img src="${product.img}">
                   <h3>${product.nombre}</h3>
                   <p>${product.precio} $</p>
                   <span class="restar"> - </span>
                   <p>cantidad:${product.cantidad}</p>
                   <span class="sumar"> + </span>
                   <p>total:${product.cantidad * product.precio} $</p>
                `;
       
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () =>{
            if(product.cantidad !== 1){
                product.cantidad--;}
            saveLocal();
            pintarCarrito();
              
        });
        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () =>{
            product.cantidad++;
            saveLocal();
            pintarCarrito();
              
        });
        
        let eliminar = document.createElement("span");
        eliminar.innerText = "❌";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar);
        eliminar.addEventListener("click" , eliminarProducto);
    });
    
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "toral-content";
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => { return carritoId !== foundId;

    });
    pintarCarrito();
};

const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify (carrito));
};

