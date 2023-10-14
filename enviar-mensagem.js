document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("messageForm");
    const responseMessage = document.getElementById("responseMessage");
    const loadingContainer = document.querySelector(".loading-container");
    const recipientInput = document.getElementById("recipient");
    const messageInput = document.getElementById("message");

    messageForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const recipient = recipientInput.value;
        const message = messageInput.value;

        // Exibir o indicador de carregamento
        loadingContainer.style.display = "flex";

        // Dados para a solicitação à API
        const data = {
            to: recipient,
            mensagem: message,
        };

        try {
            const response = await fetch('https://api-teste-dados.onrender.com/enviar-sms', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const apiResponse = await response.json();

            if (apiResponse.mensagem === 'SMS enviado com sucesso') {
                responseMessage.textContent = apiResponse.mensagem;
                responseMessage.classList.remove("error-message");
                responseMessage.classList.add("success-message");

                // Limpar os campos do formulário após o envio bem-sucedido
                recipientInput.value = "";
                messageInput.value = "";
            } else {
                responseMessage.textContent = "Erro ao enviar mensagem.";
                responseMessage.classList.remove("success-message");
                responseMessage.classList.add("error-message");
            }
        } catch (error) {
            console.error('Erro na solicitação à API:', error);
            responseMessage.textContent = "Erro na solicitação à API.";
            responseMessage.classList.remove("success-message");
            responseMessage.classList.add("error-message");
        } finally {
            // Ocultar o indicador de carregamento
            loadingContainer.style.display = "none";
        }
    });
});
