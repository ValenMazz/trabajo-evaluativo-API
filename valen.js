let contenedor = document.getElementById('contenedorImagenes');
let botonDia = document.getElementById('botonDia');
let botonAleatoria = document.getElementById('botonAleatoria');

let clave = 'cKKtDycx2F9XuVSN8vSpX822glQhmts1i4loaC5S';
let urlBase = 'https://api.nasa.gov/planetary/apod?api_key=';

function limpiarContenedor() {
    contenedor.innerHTML = '';
}

function mostrarImagen(url, titulo) {
    let img = document.createElement('img');
    img.src = url;
    img.alt = titulo;

    let caption = document.createElement('h2');
    caption.textContent = titulo;

    contenedor.appendChild(img);
    contenedor.appendChild(caption);
}

botonDia.onclick = () => {
    limpiarContenedor();
    fetch(`${urlBase}${clave}`)
        .then(res => res.json())
        .then(data => {
            if (data.media_type === "image") {
                mostrarImagen(data.url, data.title);
            } else {
                mostrarImagen('https://via.placeholder.com/800x600?text=Contenido+no+disponible', 'Contenido no disponible');
            }
        })
        .catch(err => console.error("Error al obtener imagen del día:", err));
};

botonAleatoria.onclick = () => {
    limpiarContenedor();

    let fechaInicio = new Date(1995, 5, 16);
    let fechaFin = new Date();
    let fechaAleatoria = new Date(fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime()));
    let fechaFormateada = fechaAleatoria.toISOString().split('T')[0];

    fetch(`${urlBase}${clave}&date=${fechaFormateada}`)
        .then(res => res.json())
        .then(data => {
            if (data.media_type === "image") {
                mostrarImagen(data.url, data.title);
            } else {
                mostrarImagen('https://via.placeholder.com/800x600?text=Contenido+no+disponible', 'Contenido no disponible');
            }
        })
        .catch(err => {
            console.error("Error al obtener imagen aleatoria:", err);
        });
};