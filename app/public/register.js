document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        console.log("LKASNDKAND");
        
        const response = await fetch("http://localhost:4000/api/usuarios/agregar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Usuario registrado exitosamente!");
            window.location.href = '/'; // Redirigir a la página de login
        } else {
            alert("Error al registrar usuario: " + data.error);
        }
    } catch (error) {
        alert("Hubo un problema con la solicitud.");
        console.error(error);
    }
});
