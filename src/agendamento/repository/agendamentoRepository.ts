import { dateToStrBr } from '../../utils/date'
import { AgendamentoResponseDTO } from '../dto/agendamentoResponseDTO'
import {
  Agendamento,
  AgendamentoRepositoryInterface
} from '../interface/agendamentoRepositoryInterface'

export class AgendamentoRepository implements AgendamentoRepositoryInterface {
  async createAgendamento(
    agendamento: Agendamento
  ): Promise<AgendamentoResponseDTO> {
    return {
      data_horario: dateToStrBr(agendamento.data_horario),
      medico: agendamento.medico,
      paciente: agendamento.paciente
    } as AgendamentoResponseDTO
  }
}
