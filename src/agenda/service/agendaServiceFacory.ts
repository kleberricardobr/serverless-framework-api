import { AgendaServiceInterface } from '../interface/agendaServiceInterface'
import { AgendaRepositoryFactory } from '../repository/agendaRepositoryFactory'
import { AgendaService } from './agendaService'

export class agendaServiceFactory {
  //Padrão factory para criação do Service Agenda, já com injeção do repository
  static newAgendaService = (): AgendaServiceInterface => {
    return new AgendaService(AgendaRepositoryFactory.newAgendaRepository())
  }
}
