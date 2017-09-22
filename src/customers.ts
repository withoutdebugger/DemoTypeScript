import * as $ from 'jquery'
import { Repository } from './GenericRepository'


export class ModelCustomer {
    customerId: number;
    firstName: string;
    middleName: string;
    surName: string;
    emailAddress: string;
    customerTypeId: number;
    notes: string;
}

export class ModelPageCustomer {
    countPages: number;
    countCustomers: number;
    actualPage : number;
    customers : Array<ModelCustomer>;
}


export class RepositoryCustomers extends Repository<ModelCustomer>{
  
    constructor(){                
        super("http://localhost:8044/api/customers");        
    }

    GetPage(page: number): JQueryPromise< ModelPageCustomer > {
        
        return <JQueryPromise<ModelPageCustomer>>$.ajax({
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            url: super.getServiceUrl() + "/" + page + "/30"
        });
    }
}