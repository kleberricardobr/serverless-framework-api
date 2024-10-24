import { Agenda } from '../model/agenda'

export interface AgendaRepositoryInterface {
  getAll: () => Promise<Agenda[]>
  
  //Função utilizada para verificar se o médico existe (Post Agendamento)
  getByMedicoId: (id: number) => Promise<Agenda | undefined>
}
