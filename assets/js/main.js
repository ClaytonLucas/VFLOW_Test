
function getFormularioCompleto() {
  const dados = getDadosFornecedor();
  const contato = getContatoFornecedor();
  const endereco = getEnderecoFornecedor(); 
  const produtos = getProdutosFornecedor();
  const anexos = getAnexosFornecedor();
  if (!dados || !contato || !produtos || !anexos) return null;

  return {
    ...dados,
    ...endereco,
    nomeContato: contato.nome,
    telefoneContato: contato.telefone,
    emailContato: contato.email,
    produtos,
    anexos   
  };
}

document.addEventListener("DOMContentLoaded", () => {
    const btnSalvar = document.getElementById("btnSalvarFornecedor");
    const modal = document.getElementById("loadingModal");

    btnSalvar.addEventListener("click", () => {
        const dados = getFormularioCompleto();
        if (!dados) return;

        modal.style.display = "block";

        setTimeout(() => {
            modal.style.display = "none";
            const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "fornecedor.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 1500);
    });
});

