import { APIGatewayProxyResult } from 'aws-lambda'
import { response, response500 } from '../../utils/response'
import { agendaServiceFactory } from '../service/agendaServiceFacory'


//Função para retornar todas a Agendas (Médico x Horários Disponíveis)
export const handler = async (): Promise<APIGatewayProxyResult> => {

  //Utilizando o padrão factory para instaciar o service
  const service = agendaServiceFactory.newAgendaService()

  try {
    const medicos = await service.getAll()

    //Caso nenhum médico tenha sido encontrado retorna 204 (No Content)
    const codigo = medicos.medicos.length === 0 ? 204 : 200

    return response(medicos, codigo)
  } catch (error) {
    console.log(error)
    return response500()
  }
}
