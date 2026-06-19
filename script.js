// Dados simulados para o sistema iniciar com dados idênticos aos das fotos
let alunos = [
    { nome: "Ana Beatriz Silva", turma: "5º Ano A", turno: "Manhã" },
    { nome: "Pedro Henrique Costa", turma: "9º Ano B", turno: "Tarde" },
    { nome: "Carla Mendes", turma: "9º Ano A", turno: "Manhã" },
    { nome: "Lucas Oliveira", turma: "4º Ano B", turno: "Tarde" }
];

let livros = [
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", total: 3, disponivel: 2 },
    { titulo: "Dom Casmurro", autor: "Machado de Assis", total: 2, disponivel: 0 },
    { titulo: "A Bolsa Amarela", autor: "Lygia Bojunga", total: 4, disponivel: 3 },
    { titulo: "Vidas Secas", autor: "Graciliano Ramos", total: 2, disponivel: 1 },
    { titulo: "O Cortiço", autor: "Aluísio Azevedo", total: 1, disponivel: 1 }
];

let emprestimos = [
    { livro: "Dom Casmurro", aluno: "Ana Beatriz Silva", turma: "5º Ano A", turno: "Manhã", dataEmp: "19/06/2026", dataDev: "30/06/2026", status: "No prazo" },
    { livro: "Vidas Secas", aluno: "Carla Mendes", turma: "9º Ano A", turno: "Manhã", dataEmp: "20/05/2026", dataDev: "07/06/2026", status: "Atraso 12d" },
    { livro: "A Bolsa Amarela", aluno: "Lucas Oliveira", turma: "4º Ano B", turno: "Tarde", dataEmp: "11/06/2026", dataDev: "19/06/2026", status: "No prazo" },
    { livro: "Dom Casmurro", aluno: "Pedro Henrique Costa", turma: "9º Ano B", turno: "Tarde", dataEmp: "30/05/2026", dataDev: "13/06/2026", status: "Atraso 6d" },
    { livro: "O Pequeno Príncipe", aluno: "Ana Beatriz Silva", turma: "5º Ano A", turno: "Manhã", dataEmp: "09/06/2026", dataDev: "23/06/2026", status: "No prazo" }
];

// 1. FUNÇÃO PARA NAVEGAR ENTRE AS ABAS
function switchTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => link.classList.remove('active'));

    document.getElementById('tab-' + tabId).classList.add('active');
    
    // Oculta o relatório ao mudar de aba para limpar a tela
    document.getElementById('container-relatorio').style.display = 'none';
}

// 2. FUNÇÃO MÁGICA: GERA OS RELATÓRIOS SEPARADOS E FILTRADOS
function mostrarRelatorio(tipo) {
    const container = document.getElementById('container-relatorio');
    const titulo = document.getElementById('titulo-relatorio');
    const conteudo = document.getElementById('conteudo-relatorio');
    
    container.style.display = 'block'; // Torna o painel visível
    conteudo.innerHTML = ""; // Limpa o relatório anterior

    if (tipo === 'livros') {
        titulo.innerText = "📚 Acervo Geral de Livros";
        let tabela = `<table class="relatorio-tabela">
            <tr><th>Título</th><th>Autor</th><th>Total</th><th>Disponíveis</th></tr>`;
        livros.forEach(l => {
            tabela += `<tr><td>${l.titulo}</td><td>${l.autor}</td><td>${l.total}</td><td>${l.disponivel}</td></tr>`;
        });
        tabela += `</table>`;
        conteudo.innerHTML = tabela;

    } else if (tipo === 'alunos') {
        titulo.innerText = "👤 Alunos Cadastrados (Agrupados por Turno/Turma)";
        // Ordena os alunos por turno e depois por turma para ficarem separados organizadamente
        let alunosOrdenados = [...alunos].sort((a, b) => a.turno.localeCompare(b.turno) || a.turma.localeCompare(b.turma));
        
        let tabela = `<table class="relatorio-tabela">
            <tr><th>Turno</th><th>Turma / Série</th><th>Nome do Aluno</th></tr>`;
        alunosOrdenados.forEach(a => {
            tabela += `<tr><td><strong>${a.turno}</strong></td><td>${a.turma}</td><td>${a.nome}</td></tr>`;
        });
        tabela += `</table>`;
        conteudo.innerHTML = tabela;

    } else if (tipo === 'emprestimos') {
        titulo.innerText = "🔄 Relatório Geral de Empréstimos";
        let tabela = `<table class="relatorio-tabela">
            <tr><th>Livro</th><th>Aluno</th><th>Turma</th><th>Turno</th><th>Devolução</th><th>Status</th></tr>`;
        emprestimos.forEach(e => {
            tabela += `<tr><td>${e.livro}</td><td>${e.aluno}</td><td>${e.turma}</td><td>${e.turno}</td><td>${e.dataDev}</td><td>${e.status}</td></tr>`;
        });
        tabela += `</table>`;
        conteudo.innerHTML = tabela;

    } else if (tipo === 'atrasos') {
        titulo.innerText = "⚠️ Alunos com Devoluções em Atraso";
        // Filtra apenas quem tem a palavra "Atraso" no status
        let atrasados = mapAtrasos = emprestimos.filter(e => e.status.includes('Atraso'));
        
        if(atrasados.length === 0) {
            conteudo.innerHTML = "<p>Parabéns! Nenhum empréstimo em atraso no momento.</p>";
            return;
        }

        let tabela = `<table class="relatorio-tabela">
            <tr><th>Turno</th><th>Turma</th><th>Aluno</th><th>Livro em Atraso</th><th>Tempo</th></tr>`;
        atrasados.forEach(e => {
            tabela += `<tr style="color: #e53935;"><td><strong>${e.turno}</strong></td><td>${e.turma}</td><td>${e.aluno}</td><td>${e.livro}</td><td>${e.status}</td></tr>`;
        });
        tabela += `</table>`;
        conteudo.innerHTML = tabela;
    }
}

// 3. CADASTRO DE NOVOS ALUNOS VIA FORMULÁRIO (DINÂMICO)
document.getElementById('form-aluno').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome-aluno').value;
    const turma = document.getElementById('turma-aluno').value;
    const turno = document.getElementById('turno-aluno').value;

    alunos.push({ nome, turma, turno });
    alert(`Aluno ${nome} cadastrado com sucesso!`);
    this.reset();
});