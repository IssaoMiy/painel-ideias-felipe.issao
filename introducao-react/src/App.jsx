import { useState } from "react"
import "./App.css"

export default function App() {
  const [novaIdeia, setNovaIdeia] = useState("")
  const [listaIdeias, setListaIdeias] = useState([])
  const [mensagem, setMensagem] = useState("")

  function adicionarIdeia(event) {
    event.preventDefault()

    const texto = novaIdeia.trim()

    if (texto === "") {
      setMensagem("Digite uma ideia antes de adicionar.")
      return
    }

    const nova = {
      id: Date.now(),
      texto: texto,
      feita: false
    }

    setListaIdeias((listaAtual) => [
      ...listaAtual,
      nova
    ])

    setNovaIdeia("")
    setMensagem("")
  }

  function atualizarTexto(event) {
    setNovaIdeia(event.target.value)
    setMensagem("")
  }

  function alterarConclusao(id) {
    setListaIdeias((listaAtual) =>
      listaAtual.map((ideia) =>
        ideia.id === id
          ? {
              ...ideia,
              feita: !ideia.feita
            }
          : ideia
      )
    )
  }

  function removerIdeia(id) {
    setListaIdeias((listaAtual) =>
      listaAtual.filter((ideia) => ideia.id !== id)
    )
  }

  const quantidade = listaIdeias.length

  const concluidas = listaIdeias.filter(
    (ideia) => ideia.feita
  ).length

  return (
    <div className="painel">
      <h1>Painel de Ideias</h1>

      <p>Suas ideias em um só lugar.</p>

      <form onSubmit={adicionarIdeia}>
        <input
          value={novaIdeia}
          onChange={atualizarTexto}
          placeholder="Digite uma ideia..."
        />

        <button type="submit">
          Adicionar
        </button>
      </form>

      {mensagem && (
        <p className="erro">
          {mensagem}
        </p>
      )}

      <div className="lista">
        {listaIdeias.map((ideia) => (
          <div
            className="ideia"
            key={ideia.id}
          >
            <input
              type="checkbox"
              checked={ideia.feita}
              onChange={() => alterarConclusao(ideia.id)}
            />

            <span
              className={ideia.feita ? "feita" : ""}
            >
              {ideia.texto}
            </span>

            <button
              type="button"
              aria-label="Excluir ideia"
              onClick={() => removerIdeia(ideia.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <footer>
        {quantidade}{" "}
        {quantidade === 1 ? "ideia" : "ideias"} no painel
        {" · "}
        {concluidas}{" "}
        {concluidas === 1 ? "concluída" : "concluídas"}
      </footer>
    </div>
  )
}
