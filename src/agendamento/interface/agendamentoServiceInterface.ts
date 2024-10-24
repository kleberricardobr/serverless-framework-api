import { AgendamentoDTO } from '../dto/agendamentoDTO'
import { AgendamentoResponseDTO } from '../dto/agendamentoResponseDTO'

export interface AgendamentoServiceInterface {
  createAgendamento: (dto: AgendamentoDTO) => Promise<AgendamentoResponseDTO>
}
