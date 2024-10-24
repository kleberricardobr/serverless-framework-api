import { AgendamentoResponseDTO } from '../dto/agendamentoResponseDTO'

export type Agendamento = {
  medico: string
  paciente: string
  data_horario: Date
}

export interface AgendamentoRepositoryInterface {
  createAgendamento: (
    agendamento: Agendamento
  ) => Promise<AgendamentoResponseDTO>
}
