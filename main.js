document.addEventListener('DOMContentLoaded', function () {
    const gerarDadosButton = document.getElementById('gerarDadosButton');
    const apagarHistoricoButton = document.getElementById('apagarHistoricoButton');
    const tabelaCorpo = document.getElementById('tabelaCorpo');

    gerarDadosButton.addEventListener('click', function () {
        fazGet('http://localhost:3000/gerar-dadosAleatorios', function (usuario) {
            atualizarTabela(usuario);
        });
    });

    apagarHistoricoButton.addEventListener('click', function () {
        apagarHistorico();
    });

    function fazGet(url, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const data = JSON.parse(request.responseText);
                callback(data);
            } else {
                console.error('Erro ao fazer a requisição: ' + request.status);
            }
        };

        request.onerror = function () {
            console.error('Erro de conexão');
        };

        request.send();
    }

    function atualizarTabela(usuario) {
        const novaLinha = document.createElement('tr');

        const nomeCell = document.createElement('td');
        nomeCell.textContent = usuario.nome;

        const cpfCell = document.createElement('td');
        cpfCell.textContent = usuario.cpf;

        const dataNascimentoCell = document.createElement('td');
        dataNascimentoCell.textContent = usuario.dataNascimento;

        novaLinha.appendChild(nomeCell);
        novaLinha.appendChild(cpfCell);
        novaLinha.appendChild(dataNascimentoCell);

        tabelaCorpo.appendChild(novaLinha);
    }

    function apagarHistorico() {
        while (tabelaCorpo.firstChild) {
            tabelaCorpo.removeChild(tabelaCorpo.firstChild);
        }
    }

   
    apagarHistorico();
});
