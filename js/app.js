//  Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];



cargarListaCursos();


//  Funciones
function cargarListaCursos(){
    //  Agregando el curso con el evento CLICK
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminacion de cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //  Vaciar el carrito
    btnVaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

function agregarCurso( e ){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}



function eliminarCurso( e ){
    if( e.target.classList.contains('borrar-curso') ){
        const cursoId = e.target.getAttribute('data-id');

        //  Eliminando el id del arreglo
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        mostrarCarrito();
    }
}



function leerDatosCurso( curso ){
    //  Creacion del objeto con la info del curso de manera dinamica
    const informacionCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Si ya existe el curso en la cesta se actualiza
    const existe = articulosCarrito.some(  curso => curso.id === informacionCurso.id );
    if( existe ){
        // Creando Nuevo arreglo con Map
        const cursos = articulosCarrito.map(  curso => {
            if( curso.id === informacionCurso.id ){
                curso.cantidad++;
                return curso;   //  Retornando objeto actualizado(duplicado)
            }else{
                return curso;   //  Retornando objetos no duplicados
            }
        });

        articulosCarrito = [...cursos];
    }else{
        //  Agregando el contenido del objeto al carrito
        articulosCarrito = [...articulosCarrito, informacionCurso];
    }



    const sumar = curso => curso.precio + curso.precio;




    mostrarCarrito();
}



function mostrarCarrito(){
    limpiarHTML();


    //  Iterando-recorriendo cada curso agregado
    articulosCarrito.forEach( curso => {
        // Destructuracion
        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //  Agregando los cursos al final de los previos(actuales)
        contenedorCarrito.appendChild( row );
    });
}


function limpiarHTML(){
    //contenedorCarrito.innerHTML = '';

    while( contenedorCarrito.firstChild ){
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
}