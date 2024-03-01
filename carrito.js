// Variables
const baseDeDatos = [
    { id: 1, nombre: 'Patata', precio: 1, imagen: 'patata.jpg' },
    { id: 2, nombre: 'Cebolla', precio: 1.2, imagen: 'cebolla.jpg' },
    { id: 3, nombre: 'Calabacin', precio: 2.1, imagen: 'calabacin.jpg' },
    { id: 4, nombre: 'Fresas', precio: 0.6, imagen: 'fresas.jpg' }
  ];
  let carrito = [];
  const divisa = '€';
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonVaciar = document.querySelector('#boton-vaciar');
  
  // Funciones
  function renderizarProductos() {
    baseDeDatos.forEach((producto) => {
      // Estructura
      const miNodo = document.createElement('div');
      miNodo.classList.add('card', 'col-sm-4');
      // Body
      const miNodoCardBody = document.createElement('div');
      miNodoCardBody.classList.add('card-body');
      // Titulo
      const miNodoTitle = document.createElement('h5');
      miNodoTitle.classList.add('card-title');
      miNodoTitle.textContent = producto.nombre;
      // Imagen
      const miNodoImagen = document.createElement('img');
      miNodoImagen.classList.add('img-fluid');
      miNodoImagen.setAttribute('src', producto.imagen);
      // Precio
      const miNodoPrecio = document.createElement('p');
      miNodoPrecio.classList.add('card-text');
      miNodoPrecio.textContent = `${producto.precio}${divisa}`;
      // Boton
      const miNodoBoton = document.createElement('button');
      miNodoBoton.classList.add('btn', 'btn-primary');
      miNodoBoton.textContent = '+';
      miNodoBoton.setAttribute('marcador', producto.id);
      miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
      // Insertamos
      miNodoCardBody.appendChild(miNodoImagen);
      miNodoCardBody.appendChild(miNodoTitle);
      miNodoCardBody.appendChild(miNodoPrecio);
      miNodoCardBody.appendChild(miNodoBoton);
      miNodo.appendChild(miNodoCardBody);
      DOMitems.appendChild(miNodo);
    });
  }
  
  function anyadirProductoAlCarrito(evento) {
    // Obtenemos el id del producto
    const id = evento.target.getAttribute('marcador');
    // Buscamos el producto en la base de datos
    const producto = baseDeDatos.filter((producto) => {
      return producto.id === parseInt(id);
    })[0];
    // Comprobamos si el producto ya está en el carrito
    const existe = carrito.filter((producto) => {
      return producto.id === parseInt(id);
    }).length > 0;
    // Si existe, aumentamos la cantidad
    if (existe) {
      const productos = carrito.map((producto) => {
        if (producto.id === parseInt(id)) {
          producto.cantidad = producto.cantidad + 1;
        }
        return producto;
      });
      carrito = [...productos];
    } else {
      // Si no existe, lo agregamos al carrito
      producto.cantidad = 1;
      carrito.push(producto);
    }
    // Renderizamos el carrito
    renderizarCarrito();
    // Guardamos el carrito en el localStorage
    guardarCarritoEnLocalStorage();
  }
  
  function renderizarCarrito() {
    // Vaciamos el contenido del carrito
    carritoDOM.textContent = '';
    // Recorremos el carrito
    carrito.forEach((producto) => {
      // Estructura
      const miNodo = document.createElement('li');
      miNodo.classList.add('list-group-item', 'text-right');
      miNodo.textContent = `${producto.nombre} - ${producto.cantidad} x ${producto.precio}${divisa}`;
      // Boton de eliminar
      const miBoton = document.createElement('button');
      miBoton.classList.add('btn', 'btn-danger', 'mx-5');
      miBoton.textContent = 'X';
      miBoton.style.marginLeft = '1rem';
      miBoton.setAttribute('item', producto.id);
      miBoton.addEventListener('click', eliminarProductoDelCarrito);
      // Insertamos
      miNodo.appendChild(miBoton);
      carritoDOM.appendChild(miNodo);
    });
    // Calculamos el total
    const total = carrito.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
    // Renderizamos el total
    DOMtotal.textContent = `${total.toFixed(2)}${divisa}`;
  }
  
  function eliminarProductoDelCarrito(evento) {
    // Obtenemos el id del producto
    const id = evento.target.getAttribute('item');
    // Eliminamos el producto del carrito
    carrito = carrito.filter((producto) => {
      return producto.id !== parseInt(id);
    });
    // Renderizamos el carrito
    renderizarCarrito();
    // Guardamos el carrito en el localStorage
    guardarCarritoEnLocalStorage();
  }
  
  function vaciarCarrito() {
    // Vaciamos el carrito
    carrito = [];
    // Renderizamos el carrito
    renderizarCarrito();
    // Guardamos el carrito en el localStorage
    guardarCarritoEnLocalStorage();
  }
  
  function guardarCarritoEnLocalStorage() {
    // Convertimos el carrito a JSON
    const carritoJSON = JSON.stringify(carrito);
    // Guardamos el JSON en el localStorage
    localStorage.setItem('carrito', carritoJSON);
  }
  
  function cargarCarritoDeLocalStorage() {
    // Obtenemos el JSON del localStorage
    const carritoJSON = localStorage.getItem('carrito');
    // Comprobamos si el JSON existe
    if (carritoJSON) {
      // Convertimos el JSON a un array
      carrito = JSON.parse(carritoJSON);
      // Renderizamos el carrito
      renderizarCarrito();
    }
  }
  
  // Eventos
  DOMbotonVaciar.addEventListener('click', vaciarCarrito);
  
  // Inicio
  renderizarProductos();
  cargarCarritoDeLocalStorage();
  