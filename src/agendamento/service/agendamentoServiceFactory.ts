import { AgendaRepositoryFactory } from '../../agenda/repository/agendaRepositoryFactory'
import { AgendamentoServiceInterface } from '../interface/agendamentoServiceInterface'
import { AgendamentoRepositoryFactory } from '../repository/agendamentoRepositoryFactory'
import { AgendamentoService } from './agendamentoService'

export class AgendamentoServiceFactory {
  static newAgendamentoService = (): AgendamentoServiceInterface => {
    return new AgendamentoService(
      AgendamentoRepositoryFactory.newAgendamentoRepository(),
      AgendaRepositoryFactory.newAgendaRepository()
    )
  }
}
