import { AgendaRepositoryInterface } from '../../agenda/interface/agendaRepositoryInterface'
import { isValidDateTimeFormat } from '../../utils/date'
import { AgendamentoDTO } from '../dto/agendamentoDTO'
import { AgendamentoResponseDTO } from '../dto/agendamentoResponseDTO'
import { horarioNaoDisponivel, medicoNaoEncontrado, mensagemErroFormatoDataHora } from '../error/mensagens'
import { ValidacaoAgendamentoError } from '../error/validacaoAgendamentoError'
import {
  Agendamento,
  AgendamentoRepositoryInterface
} from '../interface/agendamentoRepositoryInterface'
import { AgendamentoServiceInterface } from '../interface/agendamentoServiceInterface'

export class AgendamentoService implements AgendamentoServiceInterface {
  private agendamentoRepository: AgendamentoRepositoryInterface
  private agendaRepository: AgendaRepositoryInterface
  
  constructor(
    agendamentoRepository: AgendamentoRepositoryInterface,
    agendaRepository: AgendaRepositoryInterface
  ) {
    this.agendamentoRepository = agendamentoRepository
    this.agendaRepository = agendaRepository
  }

  //Função para criar o agendamento após validação dos dados
  createAgendamento = async (
    dto: AgendamentoDTO
  ): Promise<AgendamentoResponseDTO> => {

    //Executa validações do Dto (verificação se todos os campos foram informados)
    this.validarDadosRecebidos(dto)

    //Chamar o repositório para recuperar o médico informado
    const medico = await this.agendaRepository.getByMedicoId(dto.medico_id)
    if (!medico) {
      throw new ValidacaoAgendamentoError(
        `${medicoNaoEncontrado}. Id: ${dto.medico_id}`
      )
    }

    //Converte data/hora informada de String para Texto, após valida se está no formado exigido (yyyy-mm-dd hh:mm)
    const dataHora = this.getDataHora(dto.data_horario)
    if (
      medico.horariosDisponiveis.findIndex((hr) => {
        return hr.getTime() === dataHora.getTime()
      }) === -1
    ) {
      throw new ValidacaoAgendamentoError(
        horarioNaoDisponivel
      )
    }

    const agendamento = {
      data_horario: dataHora,
      medico: medico.nome,
      paciente: dto.paciente_nome
    } as Agendamento

    return this.agendamentoRepository.createAgendamento(agendamento)
  }

  //Valida dados recebidos no POST
  private validarDadosRecebidos = (dto: AgendamentoDTO) => {
    if (!dto.data_horario) {
      throw new ValidacaoAgendamentoError('campo data_horario não informado')
    }

    if (!dto.medico_id) {
      throw new ValidacaoAgendamentoError('campo medico_id não informado')
    }

    if (!dto.paciente_nome) {
      throw new ValidacaoAgendamentoError('campo paciente_nome não informado')
    }
  }

  //Valida formatado da data e converte de String para Date
  private getDataHora = (data: string) => {   

    if (!isValidDateTimeFormat(data)) {
      throw new ValidacaoAgendamentoError(mensagemErroFormatoDataHora)
    }

    try {
      return new Date(data)
    } catch (error) {
      console.log(error)
      throw new ValidacaoAgendamentoError(mensagemErroFormatoDataHora)
    }
  }
}
