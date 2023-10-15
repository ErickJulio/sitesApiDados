
function redirecionarParaPaginaPrincipal() {
    window.location.href = "pagina-principal.html";
}

const botao = document.getElementById("botao");
botao.addEventListener("click", redirecionarParaPaginaPrincipal);
