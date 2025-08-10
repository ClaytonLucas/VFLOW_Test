# Cadastro de Fornecedor/Produto

Este projeto é uma aplicação web simples para cadastro de fornecedores, seus produtos e anexos, utilizando apenas **HTML**, **CSS** e **JavaScript**
## 📂 Estrutura de Pastas

```
.
├── index.html                # Página principal
└── assets
    ├── css
    │   └── custom.css         # Estilos customizados
    └── js
        ├── main.js            # Funções gerais e integração
        ├── fornecedor.js      # Funções da seção de fornecedor
        ├── produtos.js        # Funções da seção de produtos
        └── anexos.js          # Funções da seção de anexos
```

## ⚙️ Funcionalidades

- **Cadastro do Fornecedor**
  - Validação de campos obrigatórios
  - Máscaras para CNPJ, telefone e CEP
  - Busca automática de endereço pelo CEP (via API ViaCEP)

- **Cadastro de Produtos**
  - Adição e remoção dinâmica de produtos
  - Cálculo automático do valor total (quantidade × valor unitário)

- **Cadastro de Anexos**
  - Upload de arquivos
  - Visualização e exclusão de anexos
  - Armazenamento temporário no `sessionStorage`

- **Exportação**
  - Salvamento de todos os dados preenchidos em um arquivo `.json`

## 📦 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript** (Vanilla)
- **Fluig Style Guide** (TOTVS)
- **ViaCEP API** para busca de endereço

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador.
2. Preencha os dados do fornecedor.
3. Adicione um ou mais produtos.
4. Inclua um ou mais anexos.
5. Clique em **Salvar Fornecedor** para gerar o arquivo `fornecedor.json`.

## 📋 Observações

- O campo **Número** do endereço aceita apenas números.
- O CEP deve estar no formato `00000-000`.
- O CNPJ deve estar no formato `00.000.000/0000-00`.
- Os anexos não são enviados para nenhum servidor; ficam apenas no `sessionStorage` do navegador.
