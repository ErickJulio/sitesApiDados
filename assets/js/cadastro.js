document.getElementById('cep').addEventListener('focusout', function () {
  const formData = {
    cep: document.getElementById('cep').value,
  };

  // Chamar a API para obter detalhes do endereço com base no CEP
  fetch(`https://api-teste-dados.onrender.com/validar-cep`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cep: formData.cep })
  })
  .then(response => response.json())
  .then(data => {
    if (data.cep) {
      // Preencher automaticamente os campos
      document.getElementById('rua').value = data.street;
      document.getElementById('estado').value = data.state;
      document.getElementById('cidade').value = data.city;
      // Remova esta linha se o campo de bairro não existir no seu formulário
      // document.getElementById('bairro').value = data.neighborhood;
    } else {
      document.getElementById('responseMessage').textContent = 'CEP inválido. Verifique e tente novamente.';
    }
  })
  .catch(error => {
    document.getElementById('responseMessage').textContent = 'Erro ao obter detalhes do CEP. Tente novamente.';
    console.error('Erro ao obter detalhes do CEP:', error);
  });
});

document.getElementById('clientForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    login: document.getElementById('login').value,
    senha: document.getElementById('senha').value,
    ddd: document.getElementById('ddd').value,
    celular: document.getElementById('celular').value,
    rua: document.getElementById('rua').value,
    numero: document.getElementById('numero').value,
    cep: document.getElementById('cep').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value,
  };

  // Restante do código para enviar os dados do formulário
  fetch('https://api-teste-dados.onrender.com/inserir-dados', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.mensagem) {
      document.getElementById('responseMessage').textContent = data.mensagem;

      if (data.mensagem === 'Dados inseridos com sucesso') {
        // Redirecionar para a página principal (index.html) após um breve atraso (por exemplo, 2 segundos).
        setTimeout(function() {
          window.location.href = 'index.html';
        }, 1000);
      }
    } else {
      document.getElementById('responseMessage').textContent = 'Erro ao cadastrar o cliente. Tente novamente.';
    }
  })
  .catch(error => {
    document.getElementById('responseMessage').textContent = 'Erro ao cadastrar o cliente. Tente novamente.';
    console.error('Erro ao cadastrar o cliente:', error);
  });
});
