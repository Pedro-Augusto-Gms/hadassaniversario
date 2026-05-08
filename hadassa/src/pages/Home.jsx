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



export default function Home() {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [coracao, setCoracao] = useState(false);
  const [mensagemIdx, setMensagemIdx] = useState(0);
  const [coracoes, setCoracoes] = useState([]);
  const [velas, setVelas] = useState(Array(5).fill(true));
  const [tempoJuntos, setTempoJuntos] = useState("");

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

  function apagarVela(idx) {
    setVelas((prev) => prev.map((v, i) => (i === idx ? false : v)));
  }

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

      {/* GALERIA + CARTA LADO A LADO */}
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

            {/* THUMBS */}
           
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

            <p className="carta-assinatura">— Para a melhor garota do mundo</p>
          </div>
        </div>
      </section>

      {/* BOTÃO DE AMOR */}
      <section className="secao secao-coracao">
        <h2 className="secao-titulo">Aperta se quiser sentir amor 🥺</h2>
        <button
          className={`btn-coracao ${coracao ? "pulsando" : ""}`}
          onClick={() => {
            setCoracao(true);
            setTimeout(() => setCoracao(false), 1000);
          }}
        >
          {coracao ? "💖" : "🤍"}
        </button>
        {coracao && <p className="coracao-msg">Eu te amo muito! 💕</p>}
      </section>

      <footer className="rodape">
        <p>Feito com muito amor só pra você 🌸</p>
        <p className="rodape-nome"> {NOME}! ✨</p>
      </footer>
    </div>
  );
}