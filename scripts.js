document.addEventListener("DOMContentLoaded", () => {
  const niveis = [
    { palavras: ["PEDRA", "CARVAO", "SELVA", "LEAO"], letras: "PEDRACAVSLO" },
    { palavras: ["FLORESTA", "RIO", "MAR", "CEU"], letras: "FLORESTARIOMCEU" },
    {
      palavras: ["LUA", "SOL", "ESTRELA", "PLANETA"],
      letras: "LUASOLESTRELAPN",
    },
    { palavras: ["CARRO", "AVIAO", "NAVIO", "TREM"], letras: "CARONVIATREM" },
    {
      palavras: ["PAPEL", "LIVRO", "CANETA", "CADERNO"],
      letras: "PAPELIVROCANTD",
    },
    {
      palavras: ["FUTEBOL", "BASQUETE", "TENIS", "NATACAO"],
      letras: "FUTEBOLBSQTAENIC",
    },
    {
      palavras: ["GATO", "CACHORRO", "PASSARO", "PEIXE"],
      letras: "GATOCACHORROPEIXES",
    },
    {
      palavras: ["CASA", "APARTAMENTO", "SALA", "COZINHA"],
      letras: "CASAAPARTAMENTOSLCZNHI",
    },
    {
      palavras: ["ESCOLA", "FACULDADE", "CURSO", "AULA"],
      letras: "ESCOLAFACULDACRSO",
    },
    {
      palavras: ["MUSICA", "CANTO", "DANCA", "RITMO"],
      letras: "MUSICACANTODNCRITM",
    },
    {
      palavras: ["INVERNO", "VERAO", "OUTONO", "PRIMAVERA"],
      letras: "INVERONVERAOUTPRIMA",
    },
    {
      palavras: ["DOCE", "SALGADO", "AMARGO", "AZEDO"],
      letras: "DOCESLGAMARGAZEO",
    },
    {
      palavras: ["FELICIDADE", "TRISTEZA", "RAIVA", "MEDO"],
      letras: "FELICZDADTROSTERAVIME",
    },
    {
      palavras: ["PRATO", "GARFO", "FACA", "COLHER"],
      letras: "PRTAOGRFACOLHER",
    },
    {
      palavras: ["JARDIM", "FLOR", "PLANTA", "ARVORE"],
      letras: "JADRIMFLORPLENTARVO",
    },
    {
      palavras: ["COMPUTADOR", "MOUSE", "TECLADO", "MONITOR"],
      letras: "COPMUTDAORNOUSETILDR",
    },
    {
      palavras: ["MESA", "CADEIRA", "SOFA", "CAMA"],
      letras: "MSEACADERIASOFACAM",
    },
    {
      palavras: ["CINEMA", "TEATRO", "SHOW", "CONCERTO"],
      letras: "CIENMATETAROSHWC",
    },
    {
      palavras: ["FAMILIA", "AMIGO", "COLEGA", "VIZINHO"],
      letras: "FAMLIEANGIOCHLGVIZ",
    },
    {
      palavras: ["CIDADE", "VILA", "BAIRRO", "ESTADO"],
      letras: "CIADEVLIABAIROEST",
    },
    {
      palavras: ["CAMISETA", "CALÇA", "VESTIDO", "SAPATO"],
      letras: "CAMISETALÇAVESTIDOSAPATO",
    },
    {
      palavras: ["HOSPITAL", "CLINICA", "FARMACIA", "MEDICO"],
      letras: "HOSPCLINTCAFARMEDIC",
    },
    {
      palavras: ["RELOGIO", "CELULAR", "TABLET", "COMPUTADOR"],
      letras: "RELOGCILUTABCDMP",
    },
    {
      palavras: ["CHUVA", "TEMPESTADE", "NEVE", "GRANIZO"],
      letras: "CHVUATEMPSTIDONVZGRA",
    },
    {
      palavras: ["ESTUDANTE", "PROFESSOR", "DIRETOR", "BIBLIOTECARIO"],
      letras: "ESTUDPRACOPDFTNIBL",
    },
    {
      palavras: ["PIZZA", "HAMBURGUER", "SALADA", "SOPA"],
      letras: "PZIUAHDMBUGERSALSOP",
    },
    {
      palavras: ["TELEVISÃO", "RADIO", "INTERNET", "JORNAL"],
      letras: "TELEVISADONTERJ",
    },
    {
      palavras: ["CACHOEIRA", "PRAIA", "MONTANHA", "DESERTO"],
      letras: "CACHOEIRTPRMNHDES",
    },
    { palavras: ["BANANA", "MAÇÃ", "UVA", "LARANJA"], letras: "BANAMUVALARJÇ" },
    {
      palavras: ["VIAGEM", "FERIAS", "PASSPORT", "AVIAO"],
      letras: "VIAGMFERIPASOTAVIO",
    },
  ];

  let nivelAtual = parseInt(localStorage.getItem("nivelAtual")) || 0;
  let pontos = parseInt(localStorage.getItem("pontos")) || 0;
  const gradePalavras = document.getElementById("grade-palavras");
  const circuloLetras = document.getElementById("circulo-letras");
  const mensagem = document.getElementById("mensagem");
  const totalMoedas = document.getElementById("total-moedas");
  const nivelAtualElement = document.getElementById("nivel-atual");
  const canvas = document.getElementById("linha-conexao");
  const ctx = canvas.getContext("2d");
  const botaoDica = document.getElementById("botao-dica");
  const modalDica = document.getElementById("modal-dica");
  const palavrasDica = document.getElementById("palavras-dica");
  const fecharDica = document.getElementById("fechar-dica");
  totalMoedas.textContent = pontos;
  nivelAtualElement.textContent = `${nivelAtual + 1}`;
  let timer;
  let letrasSelecionadas = "";
  let celulasSelecionadas = [];

  function reiniciarSelecao() {
    clearTimeout(timer);
    letrasSelecionadas = "";
    celulasSelecionadas.forEach(
      (celula) => (celula.style.backgroundColor = "#ff4081")
    );

    celulasSelecionadas = [];
  }

  function criarGradePalavras(palavras) {
    gradePalavras.innerHTML = ""; // Limpa a grade de palavras
    palavras.forEach((palavra) => {
      const linha = document.createElement("div");
      linha.classList.add("linha-palavra");

      linha.dataset.palavra = palavra;
      for (let i = 0; i < palavra.length; i++) {
        const celula = document.createElement("div");
        celula.classList.add("celula-palavra", "vazio");
        linha.appendChild(celula);
      }
      gradePalavras.appendChild(linha);
    });
  }

  function criarCirculosLetras(letras) {
    circuloLetras.innerHTML = ""; // Limpa os círculos de letras
    // for (let i = 0; i < letras.length; i++) {
    const circulo = document.createElement("div");

    // Verificar o tamanho da tela
    const isMobile = window.innerWidth <= 768;

    // Definir tamanhos com base no tamanho da tela
    const circuloSize = isMobile ? "250px" : "500px"; // 250px para telas menores, 500px para telas maiores
    const celulaSize = isMobile ? "40px" : "80px"; // 40px para telas menores, 80px para telas maiores
    const celulaFontSize = isMobile ? "14px" : "24px"; // 14px para telas menores, 24px para telas maiores
    const minRadius = isMobile ? 100 : 200; // Reduzir o raio para telas menores
    const maxRadius = isMobile ? 125 : 250;
    const celulaOffset = isMobile ? 20 : 40; // Metade do tamanho da célula para centralizar (40px / 2 = 20px em telas menores)

    circulo.style.width = circuloSize;
    circulo.style.height = circuloSize;

    circulo.style.borderRadius = "50%";
    circulo.style.position = "relative";
    circulo.style.backgroundColor = "#81c784";
    circulo.style.marginBottom = "8px"; // Adiciona margem inferior de 8px

    circuloLetras.appendChild(circulo);

    const numLetters = letras.length;
    const radius = Math.min(maxRadius, minRadius + numLetters * 5);
    const angleStep = (2 * Math.PI) / numLetters;

    // Criar o objeto de áudio
    const clickSound = new Audio("Push_Button_1.wav");

    letras.split("").forEach((letra, index) => {
      const angle = index * angleStep;
      const x =
        radius * Math.cos(angle) + circulo.offsetWidth / 2 - celulaOffset;
      const y =
        radius * Math.sin(angle) + circulo.offsetHeight / 2 - celulaOffset;

      const celula = document.createElement("div");
      celula.textContent = letra;
      celula.style.left = `${x}px`;
      celula.style.top = `${y}px`;
      celula.style.position = "absolute";

      celula.style.width = celulaSize;
      celula.style.height = celulaSize;

      celula.style.borderRadius = "50%";
      celula.style.backgroundColor = "#ff4081";
      celula.style.display = "flex";
      celula.style.alignItems = "center";
      celula.style.fontSize = celulaFontSize;
      celula.style.fontWeight = "bold";
      celula.style.justifyContent = "center";
      celula.style.color = "#fff";
      celula.style.cursor = "pointer";
      celula.style.border = "2px solid #038e3c";
      celula.style.transition = "background-color 0.3s";

      celula.addEventListener("click", (event) => {
        selecionarLetra(event);
        clickSound.play();
      });

      circulo.appendChild(celula);
    });

    canvas.width = circuloLetras.offsetWidth;
    canvas.height = circuloLetras.offsetHeight;
    // }
  }

  function selecionarLetra(event) {
    const letraClicada = event.target;
    letrasSelecionadas += letraClicada.textContent;
    celulasSelecionadas.push(letraClicada);
    letraClicada.style.backgroundColor = "#ffeb3b";

    clearTimeout(timer);

    timer = setTimeout(reiniciarSelecao, 5000);

    verificarPalavra(letrasSelecionadas);
  }

  function verificarPalavra(palavra) {
    const linhas = Array.from(gradePalavras.children);

    let encontrou = false;

    linhas.forEach((linha) => {
      if (linha.dataset.palavra === palavra && !encontrou) {
        preencherPalavraNaGrade(linha, palavra);

        encontrou = true;
      }
    });

    if (encontrou) {
      mensagem.textContent = `Você encontrou a palavra: ${palavra}`;
      const palavras = niveis[nivelAtual].palavras;
      palavras.splice(palavras.indexOf(palavra), 1);
      if (palavras.length === 0) {
        avancarNivel();
      }
      celulasSelecionadas.forEach(
        (celula) => (celula.style.backgroundColor = "#4caf50")
      );

      setTimeout(() => {
        celulasSelecionadas.forEach(
          (celula) => (celula.style.backgroundColor = "#ff4081")
        );
        celulasSelecionadas = [];
      }, 1000);

      letrasSelecionadas = "";
    } else {
      mensagem.textContent = ``;
    }
  }

  function preencherPalavraNaGrade(linha, palavra) {
    const celulas = Array.from(linha.children);
    for (let i = 0; i < palavra.length; i++) {
      celulas[i].textContent = palavra[i];
      celulas[i].classList.remove("vazio");
      celulas[i].classList.add("preenchido");
    }
  }

  function avancarNivel() {
    pontos += 1;
    nivelAtual += 1;
    localStorage.setItem("pontos", pontos);
    localStorage.setItem("nivelAtual", nivelAtual);

    const levelUpSound = new Audio("Crowd_Cheering.wav");

    if (nivelAtual < niveis.length) {
      mensagem.textContent = `Parabéns! Você avançou para o nível ${nivelAtual + 1}`;
      levelUpSound.play();

      setTimeout(() => {
        carregarNivel();

      }, 3000);
    } else {
      mensagem.textContent = "Parabéns! Você completou todos os níveis!";
    }
    totalMoedas.textContent = pontos;
    nivelAtualElement.textContent = `${nivelAtual + 1}`;
  }

  function carregarNivel() {
    const nivel = niveis[nivelAtual];
    criarGradePalavras(nivel.palavras);
    criarCirculosLetras(nivel.letras);

    mensagem.textContent = "";
    celulasSelecionadas = [];
    letrasSelecionadas = "";
  }



  carregarNivel();

  botaoDica.addEventListener("click", () => {
    const nivel = niveis[nivelAtual];
    palavrasDica.innerHTML = `<strong>Palavras:</strong> ${nivel.palavras.join(
      ", "
    )}`;
    modalDica.style.display = "block"; // Limpa as dicas anteriores
  });

  fecharDica.addEventListener("click", () => {
    modalDica.style.display = "none";
  });
});
