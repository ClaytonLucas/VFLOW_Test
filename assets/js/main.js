




function getDadosFornecedor(){
    const razaoSocial = document.getElementById("razaoSocial").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();
    const nomeFantasia = document.getElementById("nomeFantasia").value.trim();  
    const ie = document.getElementById("ie").value.trim();
    const im = document.getElementById("im").value.trim();

    const erros = [];

    if (!razaoSocial) erros.push("Razão Social é obrigatória.");
    if (!nomeFantasia) erros.push("Nome Fantasia é obrigatório.");
     if (!cnpj) erros.push("CNPJ é obrigatório.");
    // if (!cnpj || !validarCNPJ(cnpj)) erros.push("CNPJ inválido.");

    if (erros.length > 0) {
    alert("Erros encontrados:\n\n" + erros.join("\n"));
    return null;
    }

    return {
        razaoSocial,
        nomeFantasia,
        cnpj,
        inscricaoEstadual: ie || null,
        inscricaoMunicipal: im || null
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cnpjInput = document.getElementById("cnpj");

    cnpjInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 14) value = value.slice(0, 14);

        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");

        e.target.value = value;
    });

    const foneInput = document.getElementById("telefone");
    foneInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{5})(\d)/, "$1-$2");

        e.target.value = value;
    });

    const cepInput = document.getElementById("cep");
    cepInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);

        value = value.replace(/^(\d{5})(\d)/, "$1-$2");

        e.target.value = value;
    });

});
