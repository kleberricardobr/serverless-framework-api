export type AgendaProps = {
  id: number
  nome: string
  especialidade: string
  horariosDisponiveis: Date[]
}

//Classe representando uma agenda (é utilizada no retorno do repository)
export class Agenda {
  private _id: number
  private _nome: string
  private _especialidade: string
  private _horariosDisponiveis: Date[] = []

  constructor(props: AgendaProps) {
    this._id = props.id
    this._nome = props.nome
    this._especialidade = props.especialidade
    this._horariosDisponiveis.push(...props.horariosDisponiveis)
  }

  get id() {
    return this._id
  }

  get nome() {
    return this._nome
  }

  get especialidade() {
    return this._especialidade
  }

  get horariosDisponiveis() {
    return this._horariosDisponiveis
  }
}
