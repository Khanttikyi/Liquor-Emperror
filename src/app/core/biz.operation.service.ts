import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BizOperationInterface } from './biz.operation.interface';

export abstract class BizOperationService<T, ID> implements BizOperationInterface<T, ID> {

    constructor(
        protected httpClient: HttpClient,
        protected baseUri: string
    ) { }

    save(t: T) {
        try {
            return this.httpClient.post<T>(this.baseUri, t);
        } catch (error) {
            return of(null)
        }
    }

    delete(id: ID) {
        try {
            return this.httpClient.delete<T>(this.baseUri + '/' + id);
        } catch (error) {
            return of(null)
        }
    }

    
    update(id: ID, t: T) {
        try {
            return this.httpClient.put<T>(this.baseUri + "/" + id, t);
        } catch (error) {
            return of(null)
        }
    }

    updateNoID(t: T){
        try {
            return this.httpClient.put<T>(this.baseUri , t);
        } catch (error) {
            return of(null)
        }
    }

    findOne(id: ID ) {
        try {
            return this.httpClient.get<T>(this.baseUri + "/" + id);
        } catch (error) {
            return of(null)
        }
    }

    findAll() {
        try {
            return this.httpClient.get<T[]>(this.baseUri)
        } catch (error) {
            return of(null)
        }
    }

    findAllWithQuery(query: string = "") {
        try {
            return this.httpClient.get<T[]>(this.baseUri + "?" + query)
        } catch (error) {
            return of(null)
        }
    }
}
