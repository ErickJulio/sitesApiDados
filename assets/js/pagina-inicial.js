document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const messageElement = document.getElementById("message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        fetch("https://api-teste-dados.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario, senha }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.mensagem === "Login bem-sucedido") {
                messageElement.innerHTML = "Login bem-sucedido!";
                messageElement.style.color = "green";
                // Redirecionar para a página principal após o login bem-sucedido (substitua 'pagina-principal.html' pelo URL correto)
                window.location.href = 'pagina-principal.html';
            } else {
                messageElement.innerHTML = "Credenciais inválidas";
                messageElement.style.color = "red";
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    });
});
