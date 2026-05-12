import { useState, useEffect } from "react";
import "./Home.css";

/* DATA QUE VOCÊS SE CONHECERAM */
const DATA_INICIO = new Date(2024, 10, 11, 0, 38, 0);
// mês começa do 0 → 10 = novembro

/* ✏️ FOTOS */
const fotos = [
  "/imagem1.jpeg",
  "/imagem2.jpeg",
  "/imagem3.jpeg",
  "/imagem4.jpeg",
  "/imagem5.jpeg",
];

const NOME = "Feliz Aniverário Amorzinho";
const nome1 = "Feliz Aniversário Princesa"
/* QUIZ */
const perguntas = [
  {
  pergunta: "Aonde conversamos(sem ser cumprimento) pela primeira vez?",
  opcoes: ["Igreja", "Sua casa", "Casa da Júlia", "Escola"],
  certa: 1  // 👈 índice da opção certa (0 = primeira, 1 = segunda, etc.)
},
  {
  pergunta: "Quando eu te pedi em namoro?(dia e mês)",
  opcoes: ["11/11", "09/11", "11/09", "10/11"],
  certa: 3  // 👈 índice da opção certa (0 = primeira, 1 = segunda, etc.)
}, 
  {
  pergunta: "Quando saímos pela primeira vez?(qual foi a saída)",
  opcoes: ["Sorvete no seu aniversário", "Comer salgado e andar", "Comida japonesa", "Pizza depois do culto"],
  certa: 0  // 👈 índice da opção certa (0 = primeira, 1 = segunda, etc.)
},
  {
  pergunta: "O que eu falo que mais gosto em você",
  opcoes: ["Cabelo", "Personalidade", "Tamanho", "(to em duvida entre cabelo e personalidade, essa é a resposta kkkkkkkkkkkk)"],
  certa: 3  // 👈 índice da opção certa (0 = primeira, 1 = segunda, etc.)
},
  {
  pergunta: "Qual meu insta? 🙄🙄🙄🙄🙄🙄🙄(nao vale roubar)",
  opcoes: ["Pedro.Aug_", "Aug_Pedro.", "Aug.Pedro_", "Pedro_Aug."],
  certa: 2  // 👈 índice da opção certa (0 = primeira, 1 = segunda, etc.)
},
  {
  pergunta: "Figurinha que eu mais usava no WPP quando começamos a nos falar",
  opcoes: ["Aquele cara super sério que não tem expressão facial", "Homem moreno mandando fazer shiu.", "Gatinho", "Menininha coreana."],
  certa: 0  // 👈 índice da opção certa (0 = primeira, 1 = segunda, etc.)
},
];

const resultados = [
  {
    min: 0, max: 3,
    emoji: "🥺",
    titulo: "Errou mais que 3. Não me ama",
    msg: "Nossa amor"
  },
  {
    min: 4, max: 4,
    emoji: "🙄",
    titulo: "4/6 Errou mais que uma",
    msg: "🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄"
  },
  {
    min: 5, max: 5,
    emoji: "🙄",
    titulo: "5/6 Deve ter errado a do insta né",
    msg: "🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄"
  },
  
  {
    min: 6, max: 6,
    emoji: "🏆",
    titulo: "6/6 Fez o mínimo",
    msg: "Parabéns amorzinho"
  },
];

export default function Home() {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [coracao, setCoracao] = useState(false);
  const [coracoes, setCoracoes] = useState([]);
  const [tempoJuntos, setTempoJuntos] = useState("");

  // Quiz state
  const [quizIniciado, setQuizIniciado] = useState(false);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [animandoResposta, setAnimandoResposta] = useState(false);

  /* CONTADOR DE TEMPO */
  useEffect(() => {
    const atualizarTempo = () => {
      const agora = new Date();
      let diferenca = agora - DATA_INICIO;

      const segundos = Math.floor(diferenca / 1000) % 60;
      const minutos = Math.floor(diferenca / (1000 * 60)) % 60;
      const horas = Math.floor(diferenca / (1000 * 60 * 60)) % 24;
      const diasTotais = Math.floor(diferenca / (1000 * 60 * 60 * 24));

      const anos = Math.floor(diasTotais / 365);
      const meses = Math.floor((diasTotais % 365) / 30);
      const dias = (diasTotais % 365) % 30;

      setTempoJuntos(
        `${anos} ano, ${meses} meses, ${dias} dias, ${horas}h ${minutos}m ${segundos}s`
      );
    };

    atualizarTempo();
    const intervalo = setInterval(atualizarTempo, 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFotoAtual((i) => (i + 1) % fotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function adicionarCoracao(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setCoracoes((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setCoracoes((prev) => prev.filter((c) => c.id !== id));
    }, 1200);
  }

  function responder(idx) {
    if (animandoResposta) return;
    setRespostaSelecionada(idx);
    setAnimandoResposta(true);

    const acertou = idx === perguntas[perguntaAtual].certa;

    setTimeout(() => {
      if (acertou) setPontuacao((p) => p + 1);
      setRespostaSelecionada(null);
      setAnimandoResposta(false);

      if (perguntaAtual + 1 >= perguntas.length) {
        setQuizFinalizado(true);
      } else {
        setPerguntaAtual((p) => p + 1);
      }
    }, 900);
  }

  function reiniciarQuiz() {
    setQuizIniciado(false);
    setQuizFinalizado(false);
    setPerguntaAtual(0);
    setPontuacao(0);
    setRespostaSelecionada(null);
  }

  const resultado = resultados.find(
    (r) => pontuacao >= r.min && pontuacao <= r.max
  ) || resultados[resultados.length - 1];

  return (
    <div className="home">
      {/* HEADER */}
      <header className="hero">
        <div className="petalas">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="petala" style={{ "--i": i }}>
              🌸
            </span>
          ))}
        </div>
        <div className="hero-inner">
          <h1 className="hero-titulo">
            {NOME}
            <span className="coracao-titulo"> 🌸</span>
          </h1>
          <p className="hero-data"></p>
        </div>
      </header>

      {/* GALERIA + CARTA LADO A DO */}
      <section className="secao-dupla">
        {/* COLUNA ESQUERDA — GALERIA STICKY */}
        <div className="galeria-coluna">
          <h2 className="secao-titulo">Fotinhas que eu gosto 📸</h2>
          <div className="galeria-sticky">
            <div className="galeria-main" onClick={adicionarCoracao}>
              {coracoes.map((c) => (
                <span
                  key={c.id}
                  className="coracao-flutuante"
                  style={{ left: c.x, top: c.y }}
                >
                  💕
                </span>
              ))}
              <img
                src={fotos[fotoAtual]}
                alt={`momento ${fotoAtual + 1}`}
                className="foto-destaque"
              />
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA — CARTA */}
        <div className="carta-coluna">
          <div className="carta">
            <div className="carta-header">
              <span>💌</span>
              <h2>Cartinha</h2>
            </div>

            <p className="carta-texto">
              Vamos lá (você já sabe que não sou bom com textos), mas acho que
              digitando a letra não fica tão feia e fica um pouquinho mais
              fácil. "Fiz" esse site, tentando fazer algo bonitinho que você
              goste (estou tendo ajuda de IA, mas não importakkkkkkkkk).
              <br />
              <br />
              Hoje a senhorita está fazendo 17 anos, mas te conheço apenas há{" "}
              <strong>{tempoJuntos}</strong>, porém nesse "pouco" tempo, já
              tenho vivido os melhores dias da minha vida.
              <br />
              <br />
              Quero começar falando que eu te amo muuuito, você é a pessoa mais
              especial que eu tenho, e que eu poderia ter. Mesmo que talvez, as
              vezes eu não faça parecer isso, mas não consigo viver sem você.
              Você é a pessoa que eu quero viver o resto da minha vida, passar
              pelas maiores discussões, pelos maiores problemas, tristezas, mas
              também, passar pelas melhores risadas, maiores alegrias,
              conquistas e tudo de bom.
              <br /><br />
              Quero dizer também que eu sempre vou estar aqui, pra te apoiar, ajudar e consolar. Sei que nesse ultimo ano os dias não estão sendo os melhores possíveis, mas espero que minha presença na sua vida tenha te ajudado, nem que seja um pouco. Pode contar comigo pra tudo (tudo mesmo), e se precisar chorar, rir, ficar quieta ou abraçar, eu estou aqui.
              <br /> <br />
              Por fim, amo cada detalhe seu, dês do sorriso, olhos, cabelo, personalidade(até o ciúme), e tudo que tem dentro desse serzinho que é você kkkkkkk. EU TE AMOOOO!!!
            </p>

            <p className="carta-assinatura">— Com amor: Seu amorzinho</p>
          </div>
        </div>
      </section>

      {/* BOTÃO DE AMOR */}
     
        <center>
      {/* QUIZ DO CASAL */}
      <section className="secao secao-quiz">
        <h2 className="secao-titulo">Quiz, se errar vai ver</h2>
        <p className="secao-desc">Se errar não me ama, ta fácil</p>

        <div className="quiz-card">
          {!quizIniciado && !quizFinalizado && (
            <div className="quiz-inicio">
              <span className="quiz-emoji-grande">💕</span>
              <p className="quiz-intro">
                Um quizinho fofo pra você responder e descobrir o resultado!
              </p>
              <button className="quiz-btn-iniciar" onClick={() => setQuizIniciado(true)}>
                Começar quiz 🌸
              </button>
            </div>
          )}

          {quizIniciado && !quizFinalizado && (
            <div className="quiz-pergunta-wrap">
              <div className="quiz-progresso">
                <div
                  className="quiz-progresso-barra"
                  style={{
                    width: `${((perguntaAtual) / perguntas.length) * 100}%`,
                  }}
                />
              </div>
              <p className="quiz-contador">
                {perguntaAtual + 1} de {perguntas.length}
              </p>
              <p className="quiz-pergunta">
                {perguntas[perguntaAtual].pergunta}
              </p>
              <div className="quiz-opcoes">
                {perguntas[perguntaAtual].opcoes.map((op, idx) => (
                  <button
                    key={idx}
                    className={`quiz-opcao ${respostaSelecionada === idx ? "selecionada" : ""}`}
                    onClick={() => responder(idx)}
                    disabled={animandoResposta}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizFinalizado && (
            <div className="quiz-resultado">
              <span className="quiz-resultado-emoji">{resultado.emoji}</span>
              <h3 className="quiz-resultado-titulo">{resultado.titulo}</h3>
              <p className="quiz-resultado-desc">{resultado.msg}</p>
              <button className="quiz-btn-reiniciar" onClick={reiniciarQuiz}>
                Fazer de novo 🔄
              </button>
            </div>
          )}
        </div>
      </section>
</center>
      <footer className="rodape">
        <p>Feito com muito amor</p>
        <p className="rodape-nome"> {nome1}! ✨</p>
      </footer>
    </div>
  );
}