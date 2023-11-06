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
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login: usuario, senha }),
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                // Senha incorreta
                messageElement.innerHTML = "Senha incorreta. Tente novamente.";
                messageElement.style.color = "red";
            } else if (response.status === 500) {
                // Erro no servidor
                messageElement.innerHTML = "Erro no servidor. Por favor, tente novamente mais tarde.";
                messageElement.style.color = "red";
            } else {
                throw new Error("Erro na solicitação.");
            }
        })
        .then((data) => {
            if (data.message === "Login bem-sucedido!") {
                messageElement.innerHTML = "Login bem-sucedido! Redirecionando para a página principal...";
                messageElement.style.color = "green";
                // Redirecionar para a página principal após o login bem-sucedido (substitua 'pagina-principal.html' pelo URL correto)
                window.location.href = 'pagina-principal.html';
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    });

    // Adicione um evento de clique ao botão de cadastro
    const cadastroButton = document.getElementById("cadastro-button");
    cadastroButton.addEventListener("click", function () {
        // Redirecionar para a página de cadastro (cadastro.html)
        window.location.href = 'cadastro.html';
    });
});
