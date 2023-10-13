document.addEventListener('DOMContentLoaded', function() {
    const consultarCepButton = document.getElementById('consultarCepButton');
    const cepInput = document.getElementById('cepInput');
    const resultadoCep = document.getElementById('resultadoCep');
    const validarCpfButton = document.getElementById('validarCpfButton');
    const cpfInput = document.getElementById('cpfInput');
    const resultadoCpf = document.getElementById('resultadoCpf');

    consultarCepButton.addEventListener('click', function() {
        const cep = cepInput.value;
        if (cep) {
            consultarCep(cep);
        } else {
            resultadoCep.textContent = 'Digite um CEP válido.';
        }
    });

    validarCpfButton.addEventListener('click', function() {
        const cpf = cpfInput.value;
        if (cpf) {
            validarCpf(cpf);
        } else {
            resultadoCpf.textContent = 'Digite um CPF válido.';
        }
    });

    function consultarCep(cep) {
        fetch('https://api-teste-dados.onrender.com/validar-cep', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cep: cep
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensagem) {
                resultadoCep.textContent = data.mensagem;
            } else {
                resultadoCep.innerHTML = `<strong>CEP:</strong> ${cep}<br>`;
                resultadoCep.innerHTML += `<strong>Estado:</strong> ${data.state}<br>`;
                resultadoCep.innerHTML += `<strong>Cidade:</strong> ${data.city}<br>`;
                resultadoCep.innerHTML += `<strong>Bairro:</strong> ${data.neighborhood}<br>`;
                resultadoCep.innerHTML += `<strong>Rua:</strong> ${data.street}<br>`;
                resultadoCep.innerHTML += `<strong>Serviço:</strong> ${data.service}`;
            }
        })
        .catch(error => {
            resultadoCep.textContent = 'Erro na consulta do CEP.';
        });
    }

    function validarCpf(cpf) {
        fetch('https://api-teste-dados.onrender.com/validar-cpf', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf: cpf
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensagem) {
                resultadoCpf.textContent = data.mensagem;
            } else {
                resultadoCpf.textContent = 'CPF válido';
            }
        })
        .catch(error => {
            resultadoCpf.textContent = 'Erro na validação do CPF.';
        });
    }
});
