document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await performLogin(usuario, senha);
            await handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    });

    const cadastroButton = document.getElementById("cadastro-button");
    cadastroButton.addEventListener("click", () => {
        redirectTo('cadastro.html');
    });

    const esqueceuSenhaButton = document.getElementById("esqueceusenha-button");
    esqueceuSenhaButton.addEventListener("click", () => {
        redirectTo('novaSenha.html');
    });
});

async function performLogin(usuario, senha) {
    const response = await fetch("https://api-teste-dados.onrender.com/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: usuario, senha }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro na solicitação.");
    }
    return response;
}

async function handleResponse(response) {
    const data = await response.json();
    if (data.message === "Login bem-sucedido!") {
        showMessage("Login bem-sucedido! Redirecionando para a página principal...", "success");
        redirectTo('pagina-principal.html');
    }
}

function handleError(error) {
    console.error("Erro:", error);
    showMessage(error.message, "error");
}

function showMessage(message, type) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.classList.remove("d-none", "alert-success", "alert-danger");
    messageElement.classList.add("alert", type === "error" ? "alert-danger" : "alert-success");
    messageElement.classList.add(type === "error" ? "alert-danger" : "alert-success");
}

function redirectTo(url) {
    window.location.href = url;
}
