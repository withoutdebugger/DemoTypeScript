import * as $ from 'jquery'

export interface IRepository<T>{
    GetAll(): JQueryPromise< Array<T> >;
    GetById(id: number): JQueryPromise<T>;
    Delete(id: number) : JQueryPromise<void>;
    Save(entity: T) : JQueryPromise<T>;    
    Update(id:number, entity: T) : JQueryPromise<void>;
}

export class Repository<T> implements IRepository<T>{

    constructor(public serviceUrl: string){}

    getServiceUrl():string {
        return this.serviceUrl;
    }

    GetById(id: number): JQueryPromise<T> {
        return <JQueryPromise<T>>$.ajax({
            type: "GET",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url: this.serviceUrl + "/" + id
        });
    }
    GetAll(): JQueryPromise< Array<T> > {
        $.support.cors=true;
        return <JQueryPromise<Array<T>>>$.ajax({
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',     
            url: this.serviceUrl
        });
    }

    Delete(id: number): JQueryPromise<void> {
        return <JQueryPromise<void>>$.ajax({
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url: this.serviceUrl + "/" + id 
        });
    }
    Save(entity: T): JQueryPromise<T>{
        
        return <JQueryPromise<T>>$.ajax({
            type: "POST",
            url: this.serviceUrl,
            data: JSON.stringify(entity),
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        });
    }
   
    Update(id:number, entity: T): JQueryPromise<void> {
        return <JQueryPromise<void>>$.ajax({
            type: "PUT",
            url: this.serviceUrl + "/" + id ,
            data: JSON.stringify(entity),
            contentType: "application/json; charset=utf-8",
            dataType: 'json' 
        });
    }

 

};