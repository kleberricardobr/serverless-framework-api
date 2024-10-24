//Dados a serem retornados na requisição Agendas
export type AgendaDTO = {
  id: number
  nome: string
  especialidade: string
  horarios_disponiveis: string[]
}
