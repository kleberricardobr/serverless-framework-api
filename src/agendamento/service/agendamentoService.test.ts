import { mock } from '../../agenda/mocks/mocks'
import { Agenda } from '../../agenda/model/agenda'
import { AgendamentoDTO } from '../dto/agendamentoDTO'
import { AgendamentoResponseDTO } from '../dto/agendamentoResponseDTO'
import { horarioNaoDisponivel, medicoNaoEncontrado, mensagemErroFormatoDataHora } from '../error/mensagens'
import { ValidacaoAgendamentoError } from '../error/validacaoAgendamentoError'
import { Agendamento } from '../interface/agendamentoRepositoryInterface'
import {
  AgendamentoService,  
} from './agendamentoService'

jest.mock('../repository/agendamentoRepository')
jest.mock('../../agenda/repository/agendaRepository')
const agendamentoRepositoryMock = require('../repository/agendamentoRepository')
const agendaRepositoryMock = require('../../agenda/repository/agendaRepository')

describe('Teste Service do Agendamento', () => {
  test('Deve retornar erro de validação caso o formato de data esteja fora do padrão (yyyy-dd-dd hh:mm)', async () => {
    agendaRepositoryMock.getByMedicoId = jest.fn(
      (id: number) =>
        new Agenda({
          especialidade: 'Teste',
          horariosDisponiveis: [],
          id: mock.medicos[0].id,
          nome: 'nome'
        })
    )

    const service = new AgendamentoService(
      agendamentoRepositoryMock,
      agendaRepositoryMock
    )
    const dto = {
      data_horario: '05/06/2024 14:23',
      medico_id: mock.medicos[0].id,
      paciente_nome: 'Kleber'
    } as AgendamentoDTO

    let message = ''
    try {
      await service.createAgendamento(dto)
    } catch (error) {
      if (error instanceof ValidacaoAgendamentoError) {
        message = error.message
      }
    }

    expect(message).toMatch(mensagemErroFormatoDataHora)
  })

  test('Deve retornar erro de validação caso não encontre o médico informado', async () => {
    agendaRepositoryMock.getByMedicoId = jest.fn((id: number) => null)

    const service = new AgendamentoService(
      agendamentoRepositoryMock,
      agendaRepositoryMock
    )
    const dto = {
      data_horario: '05/06/2024 14:23',
      medico_id: mock.medicos[0].id,
      paciente_nome: 'Kleber'
    } as AgendamentoDTO

    let message = ''
    try {
      await service.createAgendamento(dto)
    } catch (error) {
      if (error instanceof ValidacaoAgendamentoError) {
        message = error.message
      }
    }

    expect(message.includes(medicoNaoEncontrado)).toBeTruthy();
  })


  test('Deve retornar erro de validação caso o campo (data_horario) não tenha sido informado na requisição', async () => {
    
    const dto = {      
      medico_id: mock.medicos[0].id,
      paciente_nome: 'Kleber'
    } as AgendamentoDTO

    await validarDto(dto);
  })

  test('Deve retornar erro de validação caso o campo (medico_id) não tenha sido informado na requisição', async () => {
    
    const dto = {            
      data_horario: '05/06/2024 14:23',
      paciente_nome: 'Kleber'
    } as AgendamentoDTO

    await validarDto(dto);
  })

  test('Deve retornar erro de validação caso o campo (paciente_nome) não tenha sido informado na requisição', async () => {
    
    const dto = {          
      medico_id: mock.medicos[0].id,  
      data_horario: '05/06/2024 14:23',      
    } as AgendamentoDTO

    await validarDto(dto);
  })

  test('Deve retornar erro de validação caso o horário informado não esteja disponível na agenda', async () => {
    
    const dto = {          
      medico_id: mock.medicos[0].id,  
      data_horario: '1988-06-05 18:30',      
      paciente_nome: 'Kleber'
    } as AgendamentoDTO

    await validarDto(dto, horarioNaoDisponivel);
  })

  test('Deve passar o id correto do médico ao consultar a agenda', async () => {
    
    agendaRepositoryMock.getByMedicoId = jest.fn((id: number) => {
        return new Agenda({
            especialidade: mock.medicos[0].especialidade,
            horariosDisponiveis: mock.medicos[0].horarios_disponiveis.map( x => new Date(x)),
            id: mock.medicos[0].id,
            nome: mock.medicos[0].nome
        });
    });

    const service = new AgendamentoService(
      agendamentoRepositoryMock,
      agendaRepositoryMock
    );

    const dto = {          
        medico_id: mock.medicos[0].id,  
        data_horario: mock.medicos[0].horarios_disponiveis[0],      
        paciente_nome: 'Kleber'
    } as AgendamentoDTO;


    agendamentoRepositoryMock.createAgendamento = jest.fn( (agendamento: Agendamento) => {
        return {
            data_horario: dto.data_horario,
            medico: "Teste",
            paciente: "Teste"
          } as AgendamentoResponseDTO
    } )

      await service.createAgendamento(dto);

      expect(agendaRepositoryMock.getByMedicoId).toHaveBeenCalledWith(dto.medico_id);
  })

})

const validarDto = async (dto: AgendamentoDTO, mensagem: string = 'não informado') => {

    agendaRepositoryMock.getByMedicoId = jest.fn((id: number) => {
        return new Agenda({
            especialidade: mock.medicos[0].especialidade,
            horariosDisponiveis: mock.medicos[0].horarios_disponiveis.map( x => new Date(x)),
            id: mock.medicos[0].id,
            nome: mock.medicos[0].nome
        });
    })

    const service = new AgendamentoService(
      agendamentoRepositoryMock,
      agendaRepositoryMock
    )

    let message = ''
    try {
      await service.createAgendamento(dto)
      console.log('aqui')
    } catch (error) {
        console.log(error)
      if (error instanceof ValidacaoAgendamentoError) {
        message = error.message
      }
    }

    expect(message.includes(mensagem)).toBeTruthy();
}


