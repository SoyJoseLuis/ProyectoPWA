// Obtener el token de autenticación
const token = localStorage.getItem('token');

async function obtenerGastos() {
    if (!token) {
        alert('No estás logueado. Por favor, inicia sesión.');
        return;
    }

    try {
        // Llamada al backend
        const response = await fetch('http://localhost:4000/api/gastos/ver', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos de los gastos');
        }

        // Convertimos la respuesta a JSON
        const responseData = await response.json();
        console.log(responseData)
        
        // Extraemos gastos y fotos
        let gastos = responseData.body.gastos || [];
        let fotos = responseData.body.fotos || [];

        console.log("🔹 Gastos recibidos:", gastos);
        console.log("🔹 Fotos recibidas:", fotos);

        // Llamamos a la función para mostrar los datos
        renderizarTabla(gastos, fotos);
    } catch (error) {
        console.error('❌ Error al obtener los gastos:', error);
    }
}

function renderizarTabla(gastos, fotos) {
    const tableBody = document.querySelector('#gastosTable tbody');

    // Limpiar cualquier contenido anterior en la tabla
    tableBody.innerHTML = '';

    if (gastos.length === 0) {
        console.log("⚠️ No hay gastos registrados.");
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No hay gastos registrados.</td></tr>';
        return;
    }

    // Recorremos los gastos y los agregamos a la tabla
    gastos.forEach(gasto => {
        console.log("🟢 Procesando gasto:", gasto);

        const tr = document.createElement('tr');

        // Celda de la glosa
        const glosaTd = document.createElement('td');
        glosaTd.textContent = gasto.glosa;

        // Celda del monto
        const montoTd = document.createElement('td');
        montoTd.textContent = `$${gasto.monto.toFixed(2)}`;

        // Celda de las fotos
        const fotoTd = document.createElement('td');

        // Filtrar fotos correspondientes al gasto actual
        let fotosDelGasto = fotos.filter(foto => foto.id_gasto === gasto.id_gasto);

        // Si existen fotos, agregarlas a la celda
        fotosDelGasto.forEach(foto => {
            const img = document.createElement('img');
            img.src = foto.foto;
            img.alt = 'Foto de gasto';
            img.style.width = '100px'; // Puedes ajustar el tamaño de las imágenes
            fotoTd.appendChild(img);
        });

        // Si no hay fotos asociadas, mostrar una imagen predeterminada
        if (fotosDelGasto.length === 0) {
            const img = document.createElement('img');
            img.src = 'https://via.placeholder.com/100'; // Imagen de reemplazo si no hay foto
            img.alt = 'Foto de gasto';
            img.style.width = '100px';
            fotoTd.appendChild(img);
        }

        // Añadir las celdas a la fila
        tr.appendChild(glosaTd);
        tr.appendChild(montoTd);
        tr.appendChild(fotoTd);

        // Agregar la fila a la tabla
        tableBody.appendChild(tr);
    });
}


// Ejecutar cuando la página cargue
document.addEventListener('DOMContentLoaded', obtenerGastos);
