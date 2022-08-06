import { Observable } from 'rxjs';

export interface BizOperationInterface<T, ID> {
  save(t: T): Observable<T>;

  delete(id: ID): Observable<any>;

  update(id: ID, t: T): Observable<T>;

  findOne(id: ID): Observable<T>;

  findAll(): Observable<T[]>;
}
