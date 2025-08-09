document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("produtos-container");

    function criarProduto(index) {
        return `
        <div class="row produto-item">
            <div class="form-group col-md-1 d-flex align-items-start">
                <i class="fluigicon fluigicon-trash icon-xl trash-icon" style="line-height:1.2; cursor: pointer;" aria-hidden="true"></i>
            </div>
            <div class="form-group col-md-11 separator">
                <div class="row">
                    <span class="legend">Produto - ${index}</span>
                    <div class="form-group col-md-1">
                        <i class="flaticon flaticon-product icon-xl product-icon" aria-hidden="true"></i>
                    </div>
                    <div class="form-group col-md-11">
                        <!-- produto item -->
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Produto <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="descricao" required 
                                    placeholder="Digite a descrição do produto">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 mb-3">
                                <label class="form-label">Unidade de Medida <span class="text-danger">*</span></label>
                                <select class="form-control" name="unidadeMedida" required>
                                    <option value="">Selecione</option>
                                    <option value="UN">Unidade (UN)</option>
                                    <option value="KG">Quilograma (KG)</option>
                                    <option value="L">Litro (L)</option>
                                    <option value="M">Metro (M)</option>
                                    <option value="M2">Metro Quadrado (M²)</option>
                                    <option value="M3">Metro Cúbico (M³)</option>
                                    <option value="CX">Caixa (CX)</option>
                                    <option value="PC">Peça (PC)</option>
                                    <option value="T">Tonelada (T)</option>
                                    <option value="ML">Mililitro (ML)</option>
                                </select>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label">Qtde. em Estoque <span class="text-danger">*</span></label>
                                <input type="number" class="form-control quantidade" required 
                                    min="0" placeholder="0,00">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label">Valor Unitário <span class="text-danger">*</span></label>
                                <input type="number" class="form-control valorUnitario" required 
                                    min="0" step="0.01" placeholder="0,00">
                            </div>
                            <div class="col-md-3 mb-3">
                                <label class="form-label">Valor Total <span class="text-danger">*</span></label>
                                <input type="number" class="form-control valor-total" 
                                    readonly placeholder="0,00" tabindex="-1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    function atualizarNumeracao() {
        document.querySelectorAll("#produtos-container .legend").forEach((el, i) => {
            el.textContent = `Produto - ${i + 1}`;
        });
    }

    function adicionarProduto() {
        const index = document.querySelectorAll("#produtos-container .produto-item").length + 1;
        container.insertAdjacentHTML("beforeend", criarProduto(index));
        bindEventosProduto(container.lastElementChild);
    }

    function bindEventosProduto(produtoEl) {
        const quantidadeEl = produtoEl.querySelector(".quantidade");
        const valorUnitarioEl = produtoEl.querySelector(".valorUnitario");
        const valorTotalEl = produtoEl.querySelector(".valor-total");
        const trashIcon = produtoEl.querySelector(".trash-icon");

        function atualizarValorTotal() {
            const qtd = parseFloat(quantidadeEl.value) || 0;
            const valor = parseFloat(valorUnitarioEl.value) || 0;
            valorTotalEl.value = (qtd * valor).toFixed(2);
        }

        quantidadeEl.addEventListener("input", atualizarValorTotal);
        valorUnitarioEl.addEventListener("input", atualizarValorTotal);

        trashIcon.addEventListener("click", () => {
            produtoEl.remove();
            atualizarNumeracao();
        });
    }

    const btnAdicionar = document.createElement("button");
    btnAdicionar.textContent = "Adicionar Produto";
    btnAdicionar.type = "button";
    btnAdicionar.className = "btn btn-adicionar mt-3";
    btnAdicionar.addEventListener("click", adicionarProduto);

    container.parentElement.appendChild(btnAdicionar);

    adicionarProduto();
});


function getProdutosFornecedor() {
    const produtos = [];
    let erros = [];

    const produtoElements = document.querySelectorAll("#produtos-container .produto-item");

    if (produtoElements.length === 0) {
        alert("Adicione pelo menos um produto.");
        return null;
    }

    produtoElements.forEach((produtoEl, index) => {
        const descricao = produtoEl.querySelector("input[name='descricao']").value.trim();
        const unidadeMedida = produtoEl.querySelector("select[name='unidadeMedida']").value;
        const quantidade = produtoEl.querySelector(".quantidade").value.trim();
        const valorUnitario = produtoEl.querySelector(".valorUnitario").value.trim();
        const valorTotal = produtoEl.querySelector(".valor-total").value.trim();

        if (!descricao) erros.push(`Produto ${index + 1}: descrição é obrigatória.`);
        if (!unidadeMedida) erros.push(`Produto ${index + 1}: unidade de medida é obrigatória.`);
        if (!quantidade) erros.push(`Produto ${index + 1}: quantidade é obrigatória.`);
        if (!valorUnitario) erros.push(`Produto ${index + 1}: valor unitário é obrigatório.`);
        
        produtos.push({
            descricao,
            unidadeMedida,
            quantidade: parseFloat(quantidade) || 0,
            valorUnitario: parseFloat(valorUnitario) || 0,
            valorTotal: parseFloat(valorTotal) || 0
        });
    });

    if (erros.length > 0) {
        alert("Erros nos produtos:\n\n" + erros.join("\n"));
        return null;
    }

    return produtos;
}



