const contenedor = document.getElementById('contenedorImagenes');
const botonDia = document.getElementById('botonDia');
const botonAleatoria = document.getElementById('botonAleatoria');

const clave = 'cKKtDycx2F9XuVSN8vSpX822glQhmts1i4loaC5S';
const urlBase = 'https://api.nasa.gov/planetary/apod?api_key=';

let intentosRestantes = 3;

function limpiarContenedor() {
    contenedor.innerHTML = '';
}

function mostrarImagen(url, titulo) {
    const img = document.createElement('img');
    img.src = url;
    img.alt = titulo;
    contenedor.appendChild(img);
}

botonDia.onclick = () => {
    limpiarContenedor();  
    fetch(`${urlBase}${clave}`)
        .then(res => res.json())
        .then(data => {
            mostrarImagen(data.url, data.title);
        })
        .catch(err => console.error("Error al obtener imagen del día:", err));
};

botonAleatoria.onclick = () => {
    if (intentosRestantes > 0) {
        limpiarContenedor();  

        const mostrarAleatoria = () => {
           
            const fechaInicio = new Date(1995, 5, 16); 
            const fechaFin = new Date();
            const fechaAleatoria = new Date(fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime()));
            const fechaFormateada = fechaAleatoria.toISOString().split('T')[0];

            fetch(`${urlBase}${clave}&date=${fechaFormateada}`)
                .then(res => res.json())
                .then(data => {
                    if (data.media_type === "image") {
                        mostrarImagen(data.url, data.title);
                    } else {
                        mostrarImagen('https://via.placeholder.com/800x600?text=Contenido+no+disponible', 'Contenido no disponible');
                    }

                    intentosRestantes--; 
                    if (intentosRestantes === 0) {
                        setTimeout(() => {
                            alert("Te quedaste sin intentos.");
                        }, 200);
                    }
                })
                .catch(err => {
                    console.error("Error al obtener imagen aleatoria:", err);
                });
        };

        mostrarAleatoria(); 
    } else {
        alert("Ya no te quedan más intentos.");
    }
};