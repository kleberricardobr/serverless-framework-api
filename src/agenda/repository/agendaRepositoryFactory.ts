import { AgendaRepositoryInterface } from '../interface/agendaRepositoryInterface'
import { AgendaRepository } from './agendaRepository'

export class AgendaRepositoryFactory {
  static newAgendaRepository = (): AgendaRepositoryInterface => {
    return new AgendaRepository()
  }
}
