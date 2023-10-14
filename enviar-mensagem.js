document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("messageForm");
    const responseMessage = document.getElementById("responseMessage");
    const loadingContainer = document.querySelector(".loading-container");
    const recipientInput = document.getElementById("recipient");
    const messageInput = document.getElementById("message");

    messageForm.addEventListener("submit", function (event) {
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

        fetch('https://api-teste-dados.onrender.com/enviar-sms', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(apiResponse => {
            if (apiResponse.mensagem === 'SMS enviado com sucesso') {
                responseMessage.textContent = apiResponse.mensagem;
                responseMessage.classList.add("success-message");

                // Limpar os campos do formulário após o envio bem-sucedido
                recipientInput.value = "";
                messageInput.value = "";
            } else {
                responseMessage.textContent = "Erro ao enviar mensagem.";
                responseMessage.classList.add("error-message");
            }

            // Ocultar o indicador de carregamento
            loadingContainer.style.display = "none";
        })
        .catch(error => {
            console.error('Erro na solicitação à API:', error);
            responseMessage.textContent = "Erro na solicitação à API.";
            responseMessage.classList.add("error-message");

            // Ocultar o indicador de carregamento
            loadingContainer.style.display = "none";
        });
    });
});
