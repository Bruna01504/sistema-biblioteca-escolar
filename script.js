// Listas vazias prontas para receber dados reais informados por você
let bancoLivros = [];
let bancoAlunos = [];

// Executa assim que a página termina de carregar tudo
document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o visual das tabelas vazias
    atualizarTabelaLivros();
    atualizarTabelaAlunos();

    // Lógica para cadastrar Livro Real
    const formLivro = document.getElementById("form-livro");
    if (formLivro) {
        formLivro.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const titulo = document.getElementById("titulo-livro").value;
            const autor = document.getElementById("autor-livro").value;
            const qtd = parseInt(document.getElementById("qtd-livro").value);

            // Adiciona o item real digitado na lista
            bancoLivros.push({ titulo: titulo, autor: autor, total: qtd, disponiveis: qtd });
            
            atualizarTabelaLivros();
            formLivro.reset();
            switchTab('inicio'); // Te leva automaticamente para o Início para ver o Acervo
        });
    }

    // Lógica para cadastrar Aluno Real
    const formAluno = document.getElementById("form-aluno");
    if (formAluno) {
        formAluno.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nome = document.getElementById("nome-aluno").value;
            const turma = document.getElementById("turma-aluno").value;
            const turno = document.getElementById("turno-aluno").value;

            // Adiciona o aluno real digitado na lista
            bancoAlunos.push({ nome: nome, turma: turma, turno: turno });
            
            atualizarTabelaAlunos();
            formAluno.reset();
            switchTab('alunos'); // Mantém você na aba dos alunos para ver a lista atualizada
        });
    }
});

// Atualiza a tabela de livros na página inicial
function atualizarTabelaLivros() {
    const tbody = document.getElementById("corpo-tabela-livros");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    if (bancoLivros.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: #777; padding: 15px;">Nenhum livro cadastrado no acervo.</td></tr>`;
    } else {
        bancoLivros.forEach(livro => {
            tbody.innerHTML += `
                <tr>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.total}</td>
                    <td>${livro.disponiveis}</td>
                </tr>
            `;
        });
    }

    // Atualiza o card de quantidade de livros na home
    const cardContador = document.getElementById("contador-livros-card");
    if (cardContador) cardContador.innerHTML = `📚 ${bancoLivros.length}`;
}

// Atualiza a tabela de alunos na aba de Alunos
function atualizarTabelaAlunos() {
    const tbody = document.getElementById("corpo-tabela-alunos");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    if (bancoAlunos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: #777; padding: 15px;">Nenhum aluno cadastrado ainda.</td></tr>`;
    } else {
        bancoAlunos.forEach(aluno => {
            tbody.innerHTML += `
                <tr>
                    <td>${aluno.nome}</td>
                    <td>${aluno.turma}</td>
                    <td>${aluno.turno}</td>
                </tr>
            `;
        });
    }

    // Atualiza o card de quantidade de alunos na home
    const cardContador = document.getElementById("contador-alunos-card");
    if (cardContador) cardContador.innerHTML = `👤 ${bancoAlunos.length}`;
}

// ESSA É A FUNÇÃO QUE FAZ O SEU MENU E AS ABAS FUNCIONAREM CORRETAMENTE
function switchTab(tabId) {
    // Oculta todas as telas do sistema
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Exibe a tela que você clicou
    const activeTab = document.getElementById('tab-' + tabId);
    if (activeTab) activeTab.classList.add('active');

    // Desativa a cor verde/marcada dos links do menu de cima
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Marca o link ativo correto correspondente à aba aberta
    const activeLink = document.querySelector(`.nav-links a[onclick*="${tabId}"]`);
    if (activeLink) activeLink.classList.add('active');
}