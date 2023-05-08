                                     //PRODUCTOS




async function obtenerProductos(){

    const respuesta = await fetch('productos.json');
    const productos = await respuesta.json();
    console.log(productos)
   
    
    function armarProductos(){
        let cards=document.getElementById("cartas")

        for(const producto of productos){
            let carta = document.createElement("div")
            carta.className = "card  col-xs-12 ,col-sm-6, col-md-6, col-lg-2"
            carta.innerHTML =`	
                <img class=" imageProductos card-img-top" src=${productos.imagen}  alt="...">
                <div class="card-body">
                    <h5 class="card-title ">${productos.nombre}</h5>
                    <p class="card-text">$${productos.precio}</p>
                    <button id="btn${productos.id}" class="btn btn-primary aling-button"> Comprar </button>
                </div>
            

            `
        cards.append(carta)
        }
    }

    localStorage.setItem("productos",JSON.stringify(productos));
        
   


    let cards=document.getElementById("cartas")

        for(const producto of productos){
            let carta = document.createElement("div")
            carta.className = "card  col-xs-12 ,col-sm-6, col-md-6, col-lg-2"
            carta.innerHTML =`	
                <img class=" imageProductos card-img-top" src=${producto.imagen}  alt="...">
                <div class="card-body">
                    <h5 class="card-title ">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button id="btn${producto.id}" class="btn btn-primary aling-button"> Comprar </button>
                </div>
            

            `
        cards.append(carta)
        }









                                           //CARRITO


        let carrito = JSON.parse(localStorage.getItem("carrito")) || []
      

        

         //POR CADA PRODUCTO AL TOCAR EL BOTON SALE ALERT Y HACE FUNCION AGREGARALCARRITO
        productos.forEach((producto)=>{
			document.getElementById((`btn${producto.id}`)).addEventListener("click", function(){
				agregarAlCarrito(producto)
				Swal.fire({
					  position: 'top-end',
					  icon: 'success',
					  title: 'Producto agregado al carrito',
					  showConfirmButton: false,
					  timer: 1000
					})
			})

	})




    //ME FIJO SI HAY UN CARRITO EN EL STORAGE Y LO PASO AL INDEX SI ES QUE ESTÁ
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))

    if(productosEnCarrito){
        carrito.forEach((prod)=>{
        const div=	document.getElementById("verCarrito").innerHTML +=  `
					
        <tr>
            <td>${prod.id}</td>
            <td>${prod.nombre}</td>
            <td>$${prod.precio}</td>
            <td></td>
        </tr>

`   
        })
        let totalCarrito = carrito.reduce((acumulador, elementos) => acumulador + elementos.precio, 0)
        console.log(totalCarrito)
        document.getElementById("totalAPagar").innerText = ` Total=$${totalCarrito} `
        localStorage.setItem("carrito", JSON.stringify(carrito))

    }



    //AGREGA AL CARRITO EL PRODUCTO, GENERA LA TABLA CON LOS PRODUCTOS Y SUMA EL TOTAL

function agregarAlCarrito(agregarProducto){
    
	carrito.push(agregarProducto)
	console.table(carrito)
		
	document.getElementById("verCarrito").innerHTML +=  `
					
						<tr>
							<td>${agregarProducto.id}</td>
							<td>${agregarProducto.nombre}</td>
							<td>$${agregarProducto.precio}</td>
							<td></td>
						</tr>
		
	`




	let totalCarrito = carrito.reduce((acumulador, elementos) => acumulador + elementos.precio, 0)
	console.log(totalCarrito)
	document.getElementById("totalAPagar").innerText = ` Total=$${totalCarrito} `
	localStorage.setItem("carrito", JSON.stringify(carrito))


} 






//funcion para eliminar elementos del carro
//Para eliminar prods del carro





//BOTON BORRAR CARRITO
let borrarBtn  = document.getElementById("vaciarCarro")


borrarBtn.onclick=()=>{

    Swal.fire({
        title: 'Estas seguro que quieres borrar el carrito?',
        text: "No vas a poder revertirlo luego!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar todo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Carrito vaciado!',
            'Tu carrito fue borrado.',
            'success'
          ) 
            carrito=[]
        document.getElementById('verCarrito').innerHTML='';
        document.getElementById('totalAPagar').innerText = 'Total a pagar $:';
        localStorage.clear() 
        console.log("carrito vacio")
        }
      })
      
}





//BOTON FINALIZAR COMPRA

let finalizar= document.getElementById("finalizarCompra")
const segundero= document.getElementById("segundos")
 finalizar.onclick=()=>{
    carrito=[];

    document.getElementById("realizarCompra").innerHTML=`
                                            <h3>TIEMPO PARA REALIZAR LA COMPRA</h3>
                                            `

    segundero.innerText="120"
    const cronometro = setInterval(()=>{
        segundero.innerText=parseInt(segundero.innerText)-1
            if(segundero.innerText==0){
       clearInterval(cronometro)
    }
    },1000)


    const { value: email } = Swal.fire({
  title: 'Ingrese su email para ver el detalle de la compra',
  input: 'email',
  inputLabel: '',
  inputPlaceholder: 'Ingrese su mail'


})

    if (email) {
  Swal.fire(`Entered email: ${email}`)

}

    document.getElementById('verCarrito').innerHTML='';
    document.getElementById('totalAPagar').innerText = 'Total a pagar $:';
    localStorage.removeItem("carrito");
}

}
obtenerProductos()






