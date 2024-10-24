import { APIGatewayProxyResult } from 'aws-lambda'

export const response = (obj: object, code: number): APIGatewayProxyResult => {
  return {
    statusCode: code,
    body: JSON.stringify(obj)
  }
}

export const response500 = (): APIGatewayProxyResult => {
  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Ocorreu um erro inesperado' })
  }
}
