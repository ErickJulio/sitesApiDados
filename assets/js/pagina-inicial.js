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
        let errorMessage = "";

        switch (response.status) {
            case 400:
                errorMessage = errorData.message || "Requisição inválida.";
                break;
            case 401:
                errorMessage = errorData.message || "Usuário não encontrado, solicitar cadastro, ou senha incorreta.";
                break;
            default:
                errorMessage = "Erro na solicitação.";
        }

        throw new Error(errorMessage);
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
    showError("Senha incorreta."); // Exibe a mensagem específica de "Senha incorreta"
}

function showMessage(message, type) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.classList.remove("hidden", "bg-green-100", "bg-red-100", "text-green-700", "text-red-700");

    if (type === "error") {
        messageElement.classList.add("bg-red-100", "text-red-700");
    } else {
        messageElement.classList.add("bg-green-100", "text-green-700");
    }
}

function showError(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove("hidden");
}

function redirectTo(url) {
    window.location.href = url;
}
