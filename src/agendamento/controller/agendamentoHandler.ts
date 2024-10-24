import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { response, response500 } from '../../utils/response'
import { AgendamentoDTO } from '../dto/agendamentoDTO'
import { AgendamentoServiceFactory } from '../service/agendamentoServiceFactory'
import { ValidacaoAgendamentoError } from '../error/validacaoAgendamentoError'


//Função para Post de Agendamentos
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.body === null) {
    return response({ message: 'Nenhuma informação recebida' }, 400)
  }

  const data = JSON.parse(event.body) as AgendamentoDTO
  
  //Utilizando padrão factory para instaciar o service
  const service = AgendamentoServiceFactory.newAgendamentoService()
  try {
    //Chama a o service para criar o agendamento
    const agendamento = await service.createAgendamento(data)

    return response(
      {
        mensagem: 'Agendamento realizado com sucesso',
        agendamento
      },
      200
    )
  } catch (error) {
    console.log(error)

    if (error instanceof ValidacaoAgendamentoError) {
      return response({ message: error.message }, 400)
    }

    return response500()
  }
}
