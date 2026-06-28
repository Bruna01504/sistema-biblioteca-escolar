let bancoLivros = [];
let bancoAlunos = [];
let bancoEmprestimos = [];
let bancoFila = [];

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa os contadores zerados na tela inicial
    atualizarContadoresCards();
    
    // Inicializa as tabelas das abas específicas
    atualizarTabelaAlunosAba();
    atualizarTabelaEmprestimosAba();

    // Lógica para cadastrar Livro Real
    const formLivro = document.getElementById("form-livro");
    if (formLivro) {
        formLivro.addEventListener("submit", (e) => {
            e.preventDefault();
            const titulo = document.getElementById("titulo-livro").value;
            const autor = document.getElementById("autor-livro").value;
            const qtd = parseInt(document.getElementById("qtd-livro").value);

            bancoLivros.push({ titulo: titulo, autor: autor, total: qtd, disponiveis: qtd });
            formLivro.reset();
            atualizarContadoresCards();
            mostrarRelatorio('livros'); 
            switchTab('inicio');
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

            bancoAlunos.push({ nome: nome, turma: turma, turno: turno });
            formAluno.reset();
            atualizarContadoresCards();
            atualizarTabelaAlunosAba(); 
            switchTab('alunos'); 
        });
    }

    // Lógica para Registrar Empréstimo Real
    const formEmprestimo = document.getElementById("form-emprestimo");
    if (formEmprestimo) {
        formEmprestimo.addEventListener("submit", (e) => {
            e.preventDefault();
            const aluno = document.getElementById("emp-aluno").value;
            const livro = document.getElementById("emp-livro").value;
            const dataEmp = document.getElementById("data-emp").value;
            const dataDev = document.getElementById("data-dev").value;

            bancoEmprestimos.push({ aluno: aluno, livro: livro, dataEmp: dataEmp, dataDev: dataDev });
            formEmprestimo.reset();
            atualizarContadoresCards();
            atualizarTabelaEmprestimosAba(); 
            switchTab('emprestimos');
        });
    }

    // Lógica para Registrar Aluno na Fila de Espera
    const formFila = document.getElementById("form-fila");
    if (formFila) {
        formFila.addEventListener("submit", (e) => {
            e.preventDefault();
            const aluno = document.getElementById("fila-aluno").value;
            const livro = document.getElementById("fila-livro").value;

            bancoFila.push({ aluno: aluno, livro: livro });
            formFila.reset();
            atualizarContadoresCards();
            
            // Redireciona para a home exibindo o relatório da fila atualizado embaixo!
            mostrarRelatorio('fila');
            switchTab('inicio');
        });
    }
});

// Função que atualiza os números exibidos nos cards da Home
function atualizarContadoresCards() {
    const cardLivros = document.getElementById("contador-livros-card");
    if (cardLivros) cardLivros.innerHTML = `📚 ${bancoLivros.length}`;

    const cardAlunos = document.getElementById("contador-alunos-card");
    if (cardAlunos) cardAlunos.innerHTML = `👤 ${bancoAlunos.length}`;

    const cardEmp = document.getElementById("contador-emprestimos-card");
    if (cardEmp) cardEmp.innerHTML = `🔄 ${bancoEmprestimos.length}`;

    // Atualiza o contador do novo card de Fila de Espera!
    const cardFila = document.getElementById("contador-fila-card");
    if (cardFila) cardFila.innerHTML = `⏳ ${bancoFila.length}`;
}

// FUNÇÃO DOS CARDS DA HOME: Abre os relatórios logo abaixo dos blocos de alertas
function mostrarRelatorio(tipo) {
    const container = document.getElementById("container-relatorio-home");
    const titulo = document.getElementById("titulo-relatorio-home");
    const tabelaDiv = document.getElementById("tabela-relatorio-home");

    if (!container || !titulo || !tabelaDiv) return;

    container.style.display = "block"; 

    if (tipo === 'livros') {
        titulo.innerHTML = "📚 Acervo Geral de Livros";
        if (bancoLivros.length === 0) {
            tabelaDiv.innerHTML = "<p style='color:#777;'>Nenhum livro cadastrado no acervo.</p>";
        } else {
            let html = `<table class="tabela-sistema"><thead><tr><th>Título</th><th>Autor</th><th>Total</th><th>Disponíveis</th></tr></thead><tbody>`;
            bancoLivros.forEach(livro => {
                html += `<tr><td>${livro.titulo}</td><td>${livro.autor}</td><td>${livro.total}</td><td>${livro.disponiveis}</td></tr>`;
            });
            html += "</tbody></table>";
            tabelaDiv.innerHTML = html;
        }
    } 
    else if (tipo === 'alunos') {
        titulo.innerHTML = "👤 Alunos Cadastrados";
        if (bancoAlunos.length === 0) {
            tabelaDiv.innerHTML = "<p style='color:#777;'>Nenhum aluno cadastrado ainda.</p>";
        } else {
            let html = `<table class="tabela-sistema"><thead><tr><th>Nome do Aluno</th><th>Turma</th><th>Turno</th></tr></thead><tbody>`;
            bancoAlunos.forEach(aluno => {
                html += `<tr><td>${aluno.nome}</td><td>${aluno.turma}</td><td>${aluno.turno}</td></tr>`;
            });
            html += "</tbody></table>";
            tabelaDiv.innerHTML = html;
        }
    } 
    else if (tipo === 'emprestimos' || tipo === 'atrasos') {
        titulo.innerHTML = tipo === 'atrasos' ? "⚠️ Empréstimos em Atraso" : "🔄 Histórico de Empréstimos Ativos";
        if (bancoEmprestimos.length === 0) {
            tabelaDiv.innerHTML = "<p style='color:#777;'>Nenhum empréstimo registrado.</p>";
        } else {
            let html = `<table class="tabela-sistema"><thead><tr><th>Aluno</th><th>Livro</th><th>Data Empréstimo</th><th>Data Devolução</th><th>Ação</th></tr></thead><tbody>`;
            bancoEmprestimos.forEach((emp, index) => {
                const dEmp = emp.dataEmp.split('-').reverse().join('/');
                const dDev = emp.dataDev.split('-').reverse().join('/');
                html += `<tr><td>${emp.aluno}</td><td>${emp.livro}</td><td>${dEmp}</td><td>${dDev}</td><td><button class="btn-devolver" onclick="devolverLivro(${index})">Devolver</button></td></tr>`;
            });
            html += "</tbody></table>";
            tabelaDiv.innerHTML = html;
        }
    }
    else if (tipo === 'fila') {
        titulo.innerHTML = "⏳ Alunos na Fila de Espera";
        if (bancoFila.length === 0) {
            tabelaDiv.innerHTML = "<p style='color:#777;'>Nenhum aluno aguardando na fila de espera no momento.</p>";
        } else {
            let html = `<table class="tabela-sistema"><thead><tr><th>Posição</th><th>Nome do Aluno</th><th>Livro Solicitado</th></tr></thead><tbody>`;
            bancoFila.forEach((item, index) => {
                html += `<tr><td><strong>${index + 1}º Lugar</strong></td><td>${item.aluno}</td><td>${item.livro}</td></tr>`;
            });
            html += "</tbody></table>";
            tabelaDiv.innerHTML = html;
        }
    }
}

// Ação de Devolução
function devolverLivro(index) {
    bancoEmprestimos.splice(index, 1); 
    atualizarContadoresCards();
    if (document.getElementById("container-relatorio-home").style.display === "block") {
        mostrarRelatorio('emprestimos');
    }
    atualizarTabelaEmprestimosAba();
}

function atualizarTabelaAlunosAba() {
    const tbody = document.getElementById("corpo-tabela-alunos");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (bancoAlunos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#777; padding:15px;">Nenhum aluno cadastrado ainda.</td></tr>`;
    } else {
        bancoAlunos.forEach(aluno => {
            tbody.innerHTML += `<tr><td>${aluno.nome}</td><td>${aluno.turma}</td><td>${aluno.turno}</td></tr>`;
        });
    }
}

function atualizarTabelaEmprestimosAba() {
    const tbody = document.getElementById("corpo-tabela-emprestimos");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (bancoEmprestimos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#777; padding:15px;">Nenhum empréstimo ativo registrado.</td></tr>`;
    } else {
        bancoEmprestimos.forEach((emp, index) => {
            const dEmp = emp.dataEmp.split('-').reverse().join('/');
            const dDev = emp.dataDev.split('-').reverse().join('/');
            tbody.innerHTML += `<tr><td>${emp.aluno}</td><td>${emp.livro}</td><td>${dEmp}</td><td>${dDev}</td><td><button class="btn-devolver" onclick="devolverLivro(${index})">Devolver</button></td></tr>`;
        });
    }
}

function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = document.getElementById('tab-' + tabId);
    if (activeTab) activeTab.classList.add('active');

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`.nav-links a[onclick*="${tabId}"]`);
    if (activeLink) activeLink.classList.add('active');

    if (tabId !== 'inicio') {
        const container = document.getElementById("container-relatorio-home");
        if (container) container.style.display = "none";
    }
}