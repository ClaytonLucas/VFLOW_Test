document.addEventListener("DOMContentLoaded", () => {
    const btnIncluir = document.getElementById("btnIncluirAnexo");
    const inputAnexos = document.getElementById("inputAnexos");
    const container = document.getElementById("anexos-container");

    let listaAnexos = JSON.parse(sessionStorage.getItem("anexosFornecedor") || "[]");

    renderAnexos();

    btnIncluir.addEventListener("click", () => {
        inputAnexos.click();
    });

    inputAnexos.addEventListener("change", () => {
        for (let file of inputAnexos.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                listaAnexos.push({
                    name: file.name,
                    type: file.type,
                    data: e.target.result
                });
                salvarNoSession();
                renderAnexos();
            };
            reader.readAsDataURL(file);
        }
        inputAnexos.value = "";
    });

    function renderAnexos() {
        container.innerHTML = "";
        listaAnexos.forEach((file, index) => {
            const item = document.createElement("div");
            item.classList.add("anexo-item");

            const excluirIcon = document.createElement("i");
            excluirIcon.className = "fluigicon fluigicon-trash icon-md trash-icon";
            excluirIcon.style.cursor = "pointer";
            excluirIcon.title = "Excluir";
            excluirIcon.addEventListener("click", () => {
                listaAnexos.splice(index, 1);
                salvarNoSession();
                renderAnexos();
            });

            const visualizarIcon = document.createElement("i");
            visualizarIcon.className = "fluigicon fluigicon-eye-open icon-md eye-icon";
            visualizarIcon.style.cursor = "pointer";
            visualizarIcon.title = "Visualizar";
            visualizarIcon.addEventListener("click", () => {
                const blob = base64ToBlob(file.data, file.type);
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            const nome = document.createElement("span");
            nome.classList.add("anexo-nome");
            nome.textContent = file.name;

            item.appendChild(excluirIcon);
            item.appendChild(visualizarIcon);
            item.appendChild(nome);

            container.appendChild(item);
        });
    }

    function salvarNoSession() {
        sessionStorage.setItem("anexosFornecedor", JSON.stringify(listaAnexos));
    }

    function base64ToBlob(base64, type) {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: type });
    }

    window.getAnexosFornecedor = function () {
        if (listaAnexos.length === 0) {
            alert("Adicione ao menos um anexo.");
            return null;
        }
        return listaAnexos;
    };
});
