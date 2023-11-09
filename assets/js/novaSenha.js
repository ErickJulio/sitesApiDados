async function gerarSenha() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }

    const data = {
        login: login,
        senha: senha,
        confirmarSenha: confirmarSenha
    };

    try {
        const response = await fetch('https://api-teste-dados.onrender.com/esqueci-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            exibirSenhaGerada(responseData.novaSenha);
            // Redireciona para a página index.html se a senha for alterada com sucesso
            window.location.href = 'index.html';
        } else {
            alert('Erro ao gerar nova senha. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição. Por favor, tente novamente.');
    }
}

function exibirSenhaGerada(novaSenha) {
    document.getElementById('novaSenha').textContent = novaSenha;
    document.getElementById('senhaGerada').classList.remove('hidden');
}
