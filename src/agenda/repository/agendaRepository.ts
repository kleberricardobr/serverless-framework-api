import { AgendaRepositoryInterface } from '../interface/agendaRepositoryInterface'
import { mock } from '../mocks/mocks'
import { Agenda } from '../model/agenda'

export class AgendaRepository implements AgendaRepositoryInterface {

  //Recupera a agenda e dados do médico de acordo com id passado
  getByMedicoId = async (id: number): Promise<Agenda | undefined> => {
    if (!mock || mock.medicos === undefined) {
      return
    }

    const medico = mock.medicos.find((x) => x.id === id)
    if (medico) {
      return new Agenda({
        especialidade: medico.especialidade,
        horariosDisponiveis: medico.horarios_disponiveis.map(
          (dh) => new Date(dh)
        ),
        id: medico.id,
        nome: medico.nome
      })
    }
  }

  //Retornar todas as agendas disponíveis 
  getAll = async (): Promise<Agenda[]> => {
    const retorno: Agenda[] = []

    if (mock && mock.medicos !== undefined) {
      const agenda = mock.medicos.map((it) => {
        return new Agenda({
          especialidade: it.especialidade,
          id: it.id,
          nome: it.nome,
          horariosDisponiveis: it.horarios_disponiveis.map((dh) => new Date(dh))
        })
      })

      retorno.push(...agenda)
    }

    return retorno
  }
}
