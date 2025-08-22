// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", () => {

    // Seleção dos elementos do formulário de permissão
    const radioSim = document.getElementById("yes");               // Radio button "Sim"
    const radioNao = document.getElementById("no");                // Radio button "Não"
    const divConsulta = document.querySelector(".consulta");       // Div que contém o formulário de consulta (inicialmente escondida)
    const divAviso = document.querySelector(".warning");           // Div que contém o aviso inicial
    const formAviso = document.getElementById("permissionForm");   // Formulário de aviso
    const formConsulta = document.getElementById("consultForm");   // Formulário de consulta de perguntas

    // Elementos que exibem perguntas e recebem respostas
    const elementoPergunta = document.getElementById("Questions"); // Parágrafo onde a pergunta atual será exibida
    const inputResposta = document.getElementById("answerInput");  // Input para o usuário digitar a resposta

    // Lista de perguntas da consulta, na mesma ordem das features do modelo
    const listaPerguntas = [
        "Qual é a sua idade?",                                      // idade
        "Você tem anemia? (1=Sim, 0=Não)",                          // anemia
        "Qual é o seu nível de creatina fosfoquinase?",             // fosfoquinase_creatinina
        "Você tem diabetes? (1=Sim, 0=Não)",                        // diabetes
        "Qual é a fração de ejeção do seu coração?",                // fracao_ejecao
        "Você tem hipertensão arterial? (1=Sim, 0=Não)",            // pressao_alta
        "Qual é a sua contagem de plaquetas?",                      // plaquetas
        "Qual é o seu nível de creatinina sérica?",                 // creatinina_sanguinea
        "Qual é o seu nível de sódio sérico?",                      // sodio_sanguineo
        "Qual é o seu sexo? (1=Masculino, 0=Feminino)",             // sexo
        "Você fuma? (1=Sim, 0=Não)",                                // fumante
        "Há quanto tempo (em dias) você apresenta esses sintomas?"  // tempo_observacao
    ];

    // Variáveis de controle
    let respostasUsuario = [];     // Armazena as respostas do usuário
    let indicePerguntaAtual = 0;   // Controla qual pergunta está sendo exibida

    // ===============================
    // Evento do formulário de permissão
    // ===============================
    formAviso.addEventListener("submit", (e) => {
        e.preventDefault();  // Evita o envio padrão do formulário (refresh da página)

        if (radioSim.checked) {
            alert("Permissão concedida!");
            divAviso.style.display = "none";     // Esconde o aviso
            divConsulta.style.display = "block"; // Mostra a consulta
            exibirPerguntaAtual();               // Exibe a primeira pergunta
        } else if (radioNao.checked) {
            alert("Permissão não concedida. Você não poderá continuar.");
        }
    });

    // ===============================
    // Evento do formulário de consulta
    // ===============================
    formConsulta.addEventListener("submit", (e) => {
        e.preventDefault();  // Evita refresh da página

        let respostaAtual = inputResposta.value.trim(); // Pega a resposta digitada e remove espaços

        // Validação: não pode estar vazio
        if (respostaAtual === "") {
            alert("Por favor, digite uma resposta!");
            return;
        }

        // Converte resposta para número decimal
        let respostaConvertida = parseFloat(respostaAtual);

        // Validação: deve ser número
        if (isNaN(respostaConvertida)) {
            alert("Digite um valor numérico válido (use 1 ou 0 para sim/não).");
            return;
        }

        // Armazena a resposta do usuário
        respostasUsuario.push(respostaConvertida); 
        indicePerguntaAtual++;  // Avança para a próxima pergunta

        // Exibe a próxima pergunta
        exibirPerguntaAtual();                
    });

    // ===============================
    // Função para exibir a pergunta atual
    // ===============================
    function exibirPerguntaAtual() {
        if (indicePerguntaAtual < listaPerguntas.length) {
            // Mostra a pergunta correspondente ao índice atual
            elementoPergunta.textContent = listaPerguntas[indicePerguntaAtual];
            inputResposta.value = "";     // Limpa o input
            inputResposta.focus();        // Foca o input para digitar rapidamente
        } else {
            // Quando todas as perguntas forem respondidas
            elementoPergunta.textContent = "Consulta finalizada! Obrigado.";
            inputResposta.style.display = "none";                       // Esconde o input
            formConsulta.querySelector("button").style.display = "none"; // Esconde o botão de envio
            console.log("Respostas do usuário:", respostasUsuario);      // Log no console para debug

            // Envia os dados para o servidor Flask
            enviarRespostasParaServidor(respostasUsuario);
        }
    }

    // ===============================
    // Função para enviar respostas para o Flask
    // ===============================
    function enviarRespostasParaServidor(respostas) {
        fetch("/salvar_respostas", {           // Rota Flask que recebe os dados
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Formato JSON
            },
            body: JSON.stringify({
                data: new Date().toISOString(), // Marca temporal da submissão
                respostas: respostas           // Array de respostas
            })
        })
        .then(response => response.json())      // Converte resposta do Flask para JSON
        .then(data => {
            console.log("Resposta do servidor:", data); // Log do retorno

            // Interpreta o resultado do modelo
            if (data.resultado === 1) {
                alert("⚠️ Risco de ataque cardíaco detectado!");
            } else if (data.resultado === 0) {
                alert("✅ Sem risco detectado.");
            } else {
                alert("❓ Não foi possível interpretar o resultado.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar respostas:", error); // Log de erro
            alert("Ocorreu um erro ao enviar suas respostas.");
        });
    }
});