// js/app.js

document.addEventListener("DOMContentLoaded", () => {
    // La ruta es relativa al index.html, por eso es "api/productos.php"
    fetch("api/productos.php")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
    })
    .then(data => {
        let contenedor = document.getElementById("productos");
        contenedor.innerHTML = "";

        if (data.length === 0) {
            contenedor.innerHTML = "<p class='text-center w-100'>No se encontraron productos.</p>";
            return;
        }

        data.forEach(producto => {
            // Aseguramos que el precio sea un número
            let precio = parseFloat(producto.precio).toFixed(2);

            contenedor.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <div class="img-container">
                        <img src="img/${producto.imagen}" class="card-img-top" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300?text=Sin+Imagen'">
                    </div>
                    <div class="card-body text-center d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text text-muted small">ID: ${producto.id}</p>
                        </div>
                        <div class="mt-3">
                            <div class="precio mb-2">$ ${precio}</div>
                            <button class="btn btn-details w-100">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    })
    .catch(error => {
        console.error("Error cargando productos:", error);
        document.getElementById("productos").innerHTML = `<p class='text-danger text-center w-100'>Error cargando productos. Revisa la consola (F12).</p>`;
    });
});