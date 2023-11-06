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
      document.getElementById('responseMessage').textContent = 'Cliente cadastrado com sucesso!';
      // Redirecionar para a página principal (index.html) após um breve atraso (por exemplo, 2 segundos).
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 2000);
    })
    .catch(error => {
      document.getElementById('responseMessage').textContent = 'Erro ao cadastrar o cliente. Tente novamente.';
    });
  });
  