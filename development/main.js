document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos da página
    const radioSim = document.getElementById("yes");               // Opção "Sim" do aviso
    const radioNao = document.getElementById("no");               // Opção "Não" do aviso
    const divConsulta = document.querySelector(".consulta");      // Div onde a consulta aparece
    const divAviso = document.querySelector(".warning");          // Div do aviso inicial
    const formAviso = document.getElementById("permissionForm");  // Formulário de permissão
    const formConsulta = document.getElementById("consultForm");  // Formulário da consulta

    const elementoPergunta = document.getElementById("Questions"); // Onde a pergunta será exibida
    const inputResposta = document.getElementById("answerInput"); // Input onde o usuário digita a resposta

    // Array de perguntas da consulta
    const listaPerguntas = [
        "Qual é a sua idade?",
        "Você tem anemia?",
        "Qual é o seu nível de creatina fosfoquinase?",
        "Você tem diabetes?",
        "Qual é a fração de ejeção do seu coração?",
        "Você tem hipertensão arterial?",
        "Qual é a sua contagem de plaquetas?",
        "Qual é o seu nível de creatinina sérica?",
        "Qual é o seu nível de sódio sérico?",
        "Você já teve relações sexuais antes?",
        "Você fuma?",
        "Há quanto tempo você apresenta esses sintomas?",
    ];

    let respostasUsuario = [];     // Array para armazenar as respostas do usuário
    let indicePerguntaAtual = 0;   // Índice da pergunta que está sendo exibida

    // Evento do formulário de permissão
    formAviso.addEventListener("submit", (e) => {
        e.preventDefault();

        if (radioSim.checked) {
            alert("Permissão concedida!");
            divAviso.style.display = "none";   // Esconde o aviso
            divConsulta.style.display = "block"; // Mostra a consulta
            exibirPerguntaAtual();              // Começa a primeira pergunta
        } else if (radioNao.checked) {
            alert("Permissão não concedida. Você não poderá continuar.");
        }
    });

    // Evento do formulário de consulta
    formConsulta.addEventListener("submit", (e) => {
        e.preventDefault();

        const respostaAtual = inputResposta.value;

        // Verifica se o usuário digitou algo
        if (respostaAtual === "") {
            alert("Por favor, digite uma resposta!");
            return;
        }

        respostasUsuario.push(respostaAtual); // Armazena a resposta
        indicePerguntaAtual++;                // Avança para a próxima pergunta

        exibirPerguntaAtual();                // Atualiza a tela
    });

    // Função para exibir a pergunta atual
    function exibirPerguntaAtual() {
        if (indicePerguntaAtual < listaPerguntas.length) {
            elementoPergunta.textContent = listaPerguntas[indicePerguntaAtual];
            inputResposta.value = "";
            inputResposta.focus();
        } else {
            elementoPergunta.textContent = "Consulta finalizada! Obrigado.";
            inputResposta.style.display = "none";
            formConsulta.querySelector("button").style.display = "none";
            console.log("Respostas do usuário:", respostasUsuario); // Ver no console
        }
    }
});