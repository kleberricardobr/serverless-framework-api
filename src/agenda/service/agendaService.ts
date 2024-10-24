import { dateToStrBr } from '../../utils/date'
import { AgendaDTO } from '../dto/agendaDTO'
import { MedicosDTO } from '../dto/medicosDTO'
import { AgendaRepositoryInterface } from '../interface/agendaRepositoryInterface'
import { AgendaServiceInterface } from '../interface/agendaServiceInterface'

export class AgendaService implements AgendaServiceInterface {
  private repository: AgendaRepositoryInterface

  constructor(repository: AgendaRepositoryInterface) {
    this.repository = repository
  }

  //Service para retornar todas a agendas existentes
  getAll = async (): Promise<MedicosDTO> => {
    const agendasDTO: AgendaDTO[] = []

    const medicos = {
      medicos: agendasDTO
    } as MedicosDTO

    const agendas = await this.repository.getAll()
    agendas.forEach((agenda) => {
      const agendaDTO = {
        id: agenda.id,
        especialidade: agenda.especialidade,
        nome: agenda.nome
      } as AgendaDTO

      agendaDTO.horarios_disponiveis = agenda.horariosDisponiveis.map((x) => {
        return dateToStrBr(x)
      })

      medicos.medicos.push(agendaDTO)
    })

    return medicos
  }
}
