// Função para exibir mensagem na tela
function exibirMensagem(mensagem, tipo) {
    var mensagemElement = document.getElementById("mensagem");

    // Cria um elemento de parágrafo para a mensagem
    var paragrafo = document.createElement("p");
    paragrafo.textContent = mensagem;

    // Adiciona uma classe com base no tipo de mensagem (opcional)
    paragrafo.className = tipo || "";

    // Remove qualquer mensagem anterior
    mensagemElement.innerHTML = "";

    // Adiciona o novo parágrafo à área de mensagens
    mensagemElement.appendChild(paragrafo);
}

// Função para exibir/ocultar a área de agendamento
function toggleAgendamento() {
    var areaAgendamento = document.getElementById("areaAgendamento");

    // Utilizando getComputedStyle para verificar a propriedade 'display'
    var displayStyle = window.getComputedStyle(areaAgendamento).getPropertyValue('display');

    // Verifica se a área de agendamento está visível
    if (displayStyle === "block" || displayStyle === "") {
        // Se estiver visível ou se a propriedade 'display' não estiver definida, oculta
        areaAgendamento.style.display = "none";
    } else {
        // Se estiver oculta, exibe
        areaAgendamento.style.display = "block";
    }
}

// Função para verificar se todos os campos estão preenchidos
function verificarCamposPreenchidos() {
    var login = document.getElementById("login").value;
    var data = document.getElementById("data").value;
    var horario = document.getElementById("horario").value;
    var procedimento = document.getElementById("procedimento").value;

    // Se o procedimento for "Outros", verificar se o campo de texto foi preenchido
    if (procedimento === "Outros") {
        var outrosProcedimento = document.getElementById("outrosProcedimento").value;
        if (!outrosProcedimento) {
            exibirMensagem("Digite o procedimento na opção 'Outros'.", "erro");
            return false;
        }
    }

    // Verificar se algum campo está vazio
    if (!login || !data || !horario || (!procedimento && procedimento !== "Outros")) {
        exibirMensagem("Preencha todos os campos antes de agendar.", "erro");
        return false;
    }

    // Todos os campos estão preenchidos
    return true;
}

// Função para processar o agendamento
function agendar() {
    // Verificar se todos os campos estão preenchidos
    if (!verificarCamposPreenchidos()) {
        return; // Encerra a função se algum campo estiver vazio
    }

    // Obter os dados do formulário
    var login = document.getElementById("login").value;
    var data = document.getElementById("data").value;
    var horario = document.getElementById("horario").value;
    var procedimento = document.getElementById("procedimento").value;

    // Se o procedimento for "Outros", obter o valor do campo de texto
    if (procedimento === "Outros") {
        procedimento = document.getElementById("outrosProcedimento").value;
    }

    // Dados do agendamento a serem enviados para a API
    var dadosAgendamento = {
        login: login,
        data_agendamento: data,
        horario_agendamento: horario,
        procedimento_desejado: procedimento
    };

    // Enviar dados para a API usando fetch
    fetch('https://api-teste-dados.onrender.com/api/agendamentos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAgendamento),
    })
    .then(response => response.json())
    .then(data => {
        // Tratar a resposta da API aqui
        console.log(data);
        exibirMensagem("Solicitação realizado com sucesso!", "sucesso");
    })
    .catch((error) => {
        console.error('Erro ao enviar dados para a API:', error);
        exibirMensagem("Erro ao agendar. Tente novamente mais tarde.", "erro");
    });
}

// Adicione um ouvinte de evento ao campo 'procedimento' para detectar mudanças
document.getElementById('procedimento').addEventListener('change', function () {
    const outrosProcedimentoInput = document.getElementById('outrosProcedimento');
    if (this.value === 'Outros') {
        outrosProcedimentoInput.classList.remove('hidden');
        outrosProcedimentoInput.focus();
    } else {
        outrosProcedimentoInput.classList.add('hidden');
    }
});

// Função para redirecionar ao clicar em "Sair"
function sair() {
    window.location.href = "index.html";
}

// Evento de clique no link de "Sair"
document.querySelector('.item-sair a').addEventListener('click', sair);
