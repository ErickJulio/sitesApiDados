document.addEventListener('DOMContentLoaded', function() {
    const consultarCepButton = document.getElementById('consultarCepButton');
    const cepInput = document.getElementById('cepInput');
    const resultadoCep = document.getElementById('resultadoCep');
    const validarCpfButton = document.getElementById('validarCpfButton');
    const cpfInput = document.getElementById('cpfInput');
    const resultadoCpf = document.getElementById('resultadoCpf');

    consultarCepButton.addEventListener('click', async function() {
        const cep = cepInput.value;
        if (cep) {
            try {
                const data = await consultarCep(cep);
                exibirResultadoCep(data);
            } catch (error) {
                resultadoCep.textContent = 'Erro na consulta do CEP.';
            }
        } else {
            resultadoCep.textContent = 'Digite um CEP válido.';
        }
    });

    validarCpfButton.addEventListener('click', async function() {
        const cpf = cpfInput.value;
        if (cpf) {
            try {
                const data = await validarCpf(cpf);
                exibirResultadoCpf(data);
            } catch (error) {
                resultadoCpf.textContent = 'Erro na validação do CPF.';
            }
        } else {
            resultadoCpf.textContent = 'Digite um CPF válido.';
        }
    });

    async function consultarCep(cep) {
        try {
            const response = await fetch('https://api-teste-dados.onrender.com/validar-cep', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cep: cep })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    function exibirResultadoCep(data) {
        if (data.mensagem) {
            resultadoCep.textContent = data.mensagem;
        } else {
            resultadoCep.innerHTML = `<strong>CEP:</strong> ${data.cep}<br>`;
            resultadoCep.innerHTML += `<strong>Estado:</strong> ${data.state}<br>`;
            resultadoCep.innerHTML += `<strong>Cidade:</strong> ${data.city}<br>`;
            resultadoCep.innerHTML += `<strong>Bairro:</strong> ${data.neighborhood}<br>`;
            resultadoCep.innerHTML += `<strong>Rua:</strong> ${data.street}<br>`;
            resultadoCep.innerHTML += `<strong>Serviço:</strong> ${data.service}`;
        }
    }

    async function validarCpf(cpf) {
        try {
            const response = await fetch('https://api-teste-dados.onrender.com/validar-cpf', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cpf: cpf })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    function exibirResultadoCpf(data) {
        if (data.mensagem) {
            resultadoCpf.textContent = data.mensagem;
        } else {
            resultadoCpf.textContent = 'CPF válido';
        }
    }
});
