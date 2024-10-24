import { MedicosDTO } from '../dto/medicosDTO'

export interface AgendaServiceInterface {
  getAll: () => Promise<MedicosDTO>
}
