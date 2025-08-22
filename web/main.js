document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos da página
    const radioSim = document.getElementById("yes");               
    const radioNao = document.getElementById("no");               
    const divConsulta = document.querySelector(".consulta");      
    const divAviso = document.querySelector(".warning");          
    const formAviso = document.getElementById("permissionForm");  
    const formConsulta = document.getElementById("consultForm");  

    const elementoPergunta = document.getElementById("Questions"); 
    const inputResposta = document.getElementById("answerInput"); 

    // Array de perguntas da consulta
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


    let respostasUsuario = [];     
    let indicePerguntaAtual = 0;   

    // Evento do formulário de permissão
    formAviso.addEventListener("submit", (e) => {
        e.preventDefault();

        if (radioSim.checked) {
            alert("Permissão concedida!");
            divAviso.style.display = "none";   
            divConsulta.style.display = "block"; 
            exibirPerguntaAtual();              
        } else if (radioNao.checked) {
            alert("Permissão não concedida. Você não poderá continuar.");
        }
    });

    // Evento do formulário de consulta
    formConsulta.addEventListener("submit", (e) => {
        e.preventDefault();

        let respostaAtual = inputResposta.value.trim();

        if (respostaAtual === "") {
            alert("Por favor, digite uma resposta!");
            return;
        }

        // Converte resposta para número (float)
        let respostaConvertida = parseFloat(respostaAtual);

        // Se não for número válido, pede novamente
        if (isNaN(respostaConvertida)) {
            alert("Digite um valor numérico válido (use 1 ou 0 para sim/não).");
            return;
        }

        respostasUsuario.push(respostaConvertida); 
        indicePerguntaAtual++;                

        exibirPerguntaAtual();                
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
            console.log("Respostas do usuário:", respostasUsuario); 

            // Envia as respostas para o servidor Flask
            enviarRespostasParaServidor(respostasUsuario);
        }
    }

    // Função para enviar respostas para o servidor Flask
    function enviarRespostasParaServidor(respostas) {
        fetch("/salvar_respostas", {           // Rota no Flask
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: new Date().toISOString(),
                respostas: respostas
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do servidor:", data);

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
            console.error("Erro ao enviar respostas:", error);
            alert("Ocorreu um erro ao enviar suas respostas.");
        });
    }
});
