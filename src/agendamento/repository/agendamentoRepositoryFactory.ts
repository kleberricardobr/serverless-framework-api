import { AgendamentoRepositoryInterface } from '../interface/agendamentoRepositoryInterface'
import { AgendamentoRepository } from './agendamentoRepository'

export class AgendamentoRepositoryFactory {
  static newAgendamentoRepository = (): AgendamentoRepositoryInterface => {
    return new AgendamentoRepository()
  }
}
