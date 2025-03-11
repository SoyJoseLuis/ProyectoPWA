document.addEventListener("DOMContentLoaded", () => {
    const btnTomarFoto = document.getElementById("btnTomarFoto");
    const fotosContenedor = document.getElementById("fotosContenedor");
    const gastoForm = document.getElementById("gasto-form");
    const fotos= []; // Guardará las fotos en Base64

    // 📌 Evento para abrir la cámara y tomar foto
    btnTomarFoto.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.capture = "environment"; // Forzar cámara trasera
        input.style.display = "none";

        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target.result;
                    fotos.push(base64);
                    mostrarFoto(base64);
                };
                reader.readAsDataURL(file);
            }
        });

        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    });

    // 📌 Función para mostrar la foto tomada
    function mostrarFoto(base64) {
        const fotoDiv = document.createElement("div");
        fotoDiv.classList.add("foto-preview");

        const img = document.createElement("img");
        img.src = base64;
        img.classList.add("miniatura");

        // Botón para eliminar la foto
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            fotosContenedor.removeChild(fotoDiv);
            const index = fotos.indexOf(base64);
            if (index !== -1) {
                fotos.splice(index, 1);
            }
        });

        fotoDiv.appendChild(img);
        fotoDiv.appendChild(btnEliminar);
        fotosContenedor.appendChild(fotoDiv);
    }


   


    // 📌 Capturar y enviar los datos del formulario
    gastoForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita el envío automático del formulario

        const glosa = document.getElementById("glosa").value.trim();
        const monto = document.getElementById("monto").value.trim();

        if (!glosa || !monto) {
            alert("Por favor, completa la glosa y el monto.");
            return;
        }

        let foto = [];
        foto[0] = 'foto';
        const token = localStorage.getItem('token'); // O de cookies o donde almacenes el token
        

        try {
            console.log("PROBAANDDDOO");
            console.log("Fotos antes de enviar:", fotos);
            const respuesta = await fetch("http://localhost:4000/api/gastos/agregar", { // 🔴 REEMPLAZAR POR LA URL REAL DE LA API
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Enviar el token JWT en el encabezado
                },
                body: JSON.stringify( {glosa,monto,fotos} )
                
            });
            
            console.log("PROBAANDDDOO2");
            const resultado = await respuesta.json();
            if (respuesta.ok) {
                alert("Registro guardado correctamente.");
                gastoForm.reset();
                fotosContenedor.innerHTML = ""; // Limpia las fotos después de enviar
                fotos.length = 0; // Vacía el array de fotos
            } else {
                throw new Error(resultado.mensaje || "Error al registrar el gasto.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al registrar el gasto.");
        }
    });
});
