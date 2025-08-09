const el = (id) => document.getElementById(id);

function getDadosFornecedor() {
  const razaoSocial = el("razaoSocial").value.trim();
  const nomeFantasia = el("nomeFantasia").value.trim();
  const cnpj = el("cnpj").value.trim();
  const ie = el("ie").value.trim();
  const im = el("im").value.trim();

  const erros = [];

  if (!razaoSocial) erros.push("Razão Social é obrigatória.");
  if (!nomeFantasia) erros.push("Nome Fantasia é obrigatório.");
  if (!cnpj) {
    erros.push("CNPJ é obrigatório.");
  } else {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjRegex.test(cnpj)) erros.push("CNPJ em formato inválido.");
  }

  if (erros.length > 0) {
    alert("Erros encontrados:\n\n" + erros.join("\n"));
    return null;
  }

  return {
    razaoSocial,
    nomeFantasia,
    cnpj,
    inscricaoEstadual: ie || null,
    inscricaoMunicipal: im || null,
  };
}
function getEnderecoFornecedor() {
  const cep = el("cep").value.trim();
  const rua = el("endereco").value.trim();
  const numero = el("numero").value.trim();
  const complemento = el("complemento").value.trim();
  const bairro = el("bairro").value.trim();
  const municipio = el("municipio").value.trim();
  const estado = el("estado").value.trim();

  const erros = [];

  if (!cep || cep.length !== 9) erros.push("CEP inválido ou incompleto.");
  if (!rua) erros.push("Endereço (logradouro) é obrigatório.");
  if (!numero) erros.push("Número é obrigatório.");
  if (!bairro) erros.push("Bairro é obrigatório.");
  if (!municipio) erros.push("Município é obrigatório.");
  if (!estado || estado.length !== 2) erros.push("Estado inválido.");

  if (erros.length > 0) {
    alert("Erros no endereço:\n\n" + erros.join("\n"));
    return null;
  }

  return {
    cep,
    rua,
    numero,
    complemento: complemento || null,
    bairro,
    municipio,
    estado
  };
}

function getContatoFornecedor() {
  const nome = el("contato").value.trim();
  const telefone = el("telefone").value.trim();
  const email = el("email").value.trim();

  const erros = [];

  if (!nome) erros.push("Nome da pessoa de contato é obrigatório.");

  const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!telefone || !telefoneRegex.test(telefone)) {
    erros.push("Telefone é obrigatório ou está em formato inválido.");
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email || !emailRegex.test(email)) {
    erros.push("E-mail é obrigatório ou está em formato inválido.");
  }

  if (erros.length > 0) {
    alert("Erros na seção de contato:\n\n" + erros.join("\n"));
    return null;
  }

  return {
    nome,
    telefone,
    email
  };
}

document.addEventListener("DOMContentLoaded", () => {
  el("cnpj").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 14);
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    e.target.value = value;
  });

  el("telefone").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
  });
  
  el("numero").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  el("cep").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 8);
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
  });

  el("cep").addEventListener("blur", async function () {
    const cep = this.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("CEP inválido.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      el("endereco").value = data.logradouro || "";
      el("bairro").value = data.bairro || "";
      el("municipio").value = data.localidade || "";
      el("estado").value = data.uf || "";

    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar o CEP.");
    }
  });
});