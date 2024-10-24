//Classe para identificar que houve erro de validação no service
export class ValidacaoAgendamentoError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
