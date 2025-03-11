console.log("LOGIINNNJHS")

document.getElementById("login-form").addEventListener("submit", async function(event){
    event.preventDefault();
    console.log("HOLA???");

        // ESTO ES DE PRUEBA PARA ABAJO
        const usuarioInput = document.getElementById("user");
        const passwordInput = document.getElementById("password");

        if (!usuarioInput || !passwordInput) {
            console.error("No se encontraron los inputs en el DOM");
            return;
        }

        const usuario = usuarioInput.value;
        const password = passwordInput.value;

        console.log("Usuario:", usuario);
        console.log("Password:", password);
        //ESTO ES DE PRUEBA PARA ARRIBA

    const response = await fetch("http://localhost:4000/api/auth/login",{
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({usuario,password})
    })

    const data = await response.json();

    if (response.ok) {
        alert("Login exitoso!");
        localStorage.setItem("token", data.body); // Guarda el token en el almacenamiento local

         // Redirigir al home.html después de un login exitoso
        window.location.href = '/home'; // Esto redirige a home.html

    } else {
        alert("Error al iniciar sesión: " + data.error);
    }



});