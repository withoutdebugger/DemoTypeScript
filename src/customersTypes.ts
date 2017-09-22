import * as $ from 'jquery'
import { Repository } from './GenericRepository'

export class ModelCustomerType{
    customerTypeId: string;
    description: string;
}

export class RepositoryCustomersTypes extends Repository<ModelCustomerType>{
    
        constructor(){                    
            super("http://localhost:8044/api/CustomersTypes");
        }
           
    }
