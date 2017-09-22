import { RepositoryCustomers, ModelCustomer, ModelPageCustomer } from './customers';
import { RepositoryCustomersTypes, ModelCustomerType } from './customersTypes';
import * as $ from 'jquery';


$(function(){

    let repCustomers: RepositoryCustomers = new RepositoryCustomers();
    let repCustomersTypes: RepositoryCustomersTypes = new RepositoryCustomersTypes();
    let colCustomersTypes: ModelCustomerType[];

    let rowTemplate: string = "";
    let pagerTemplate: string = "";
    let pageIsCreated: boolean = false;

    $("#btnAdd").on('click', () => {     

        CleanForm();

    });
    
    $("#btnDelete").on('click', () => {        
        
        let id = $("#tblCustomers tbody input:checked").val();

        repCustomers.Delete(id).done(
            () =>{
                      $("#tblCustomers tbody input:checked").parent().parent().remove();
                }
            );
    });
    
    $("#btnSave").on('click', (event) => {    
                
        let customer:ModelCustomer = new ModelCustomer();
        customer.customerId = $("#hdnCustomerId").val();
        customer.firstName =  $("#txtFirst").val()
        customer.middleName = $("#txtMiddle").val();
        customer.surName = $("#txtSurname").val();
        customer.emailAddress = $("#txtEmail").val();
        customer.customerTypeId = $("#dCustomerType").val();
        customer.notes = $("#txtNotes").val();
        
        if(customer.customerId == 0){            
            repCustomers.Save(customer).done(
                () => {
                    
                    

                    jQuery('.bs-example-modal').modal('hide');
                    
                }
            );            
        }else{
            repCustomers.Update(customer.customerId, customer).done(
                () => {
                    
                    let result:JQuery = $("#tblCustomers > tbody").find("#rCustomer[value='" + customer.customerId +"']").parent().parent();
                   
                    result.before(GetRow(customer));
                    result.remove();
                    
                    jQuery('.bs-example-modal').modal('hide');
                    
                }
            );            
        }
    });

    function GetCustomerTypes(){

        repCustomersTypes.GetAll().done(function(data){
                        
            colCustomersTypes = <ModelCustomerType[]> data;
            changePage(1);
            
            //Llenar el combo del form
            for(let ct of colCustomersTypes){
                $("#dCustomerType").append("<option value='" + ct.customerTypeId +"'>" + ct.description  + "</option>");
            }
        });
 
    }

    function changePage(page: number): void{
        
        repCustomers.GetPage(page).done(function(data){
            
            let result:ModelPageCustomer = <ModelPageCustomer> data;

            if(!pageIsCreated){
                DrawPager(result.countPages, result.actualPage);
                pageIsCreated = true;
            }
                       
            $("#tblCustomers > tbody").empty();

            for(let value of result.customers){

                $("#tblCustomers > tbody").append(GetRow(value));
               
            };

            $(".btn-edit").on("click",(event) => {

                repCustomers.GetById(Number( $(event.currentTarget).attr("value") ) )
                .done( (data) => {

                    let customer: ModelCustomer = <ModelCustomer> data;

                    $("#hdnCustomerId").val(customer.customerId);
                    $("#txtFirst").val(customer.firstName);
                    $("#txtMiddle").val(customer.middleName);
                    $("#txtSurname").val(customer.surName);
                    $("#txtEmail").val(customer.emailAddress);
                    $("#dCustomerType").val(customer.customerTypeId);
                    $("#txtNotes").val(customer.notes);
                } );
                
                
            });
            
        });
        
    }

    function GetRow(val: ModelCustomer){

        if( rowTemplate == ""){ rowTemplate = $("#row-template").html(); }

        let tempRow: any = rowTemplate
                    .replace("-0-", val.surName +   ", " + val.firstName + " " + val.middleName)
                    .replace("-1-", val.emailAddress)
                    .replace("-2-", GetCustomerType(val.customerTypeId))
                    .replace("-3-", val.notes)
                    .replace("-id-", val.customerId.toString())
                    .replace("-id-edit-", val.customerId.toString());

                    return tempRow;

    }

    function DrawPager(countPages: number, actualPage: number){
        
        if(pagerTemplate == ""){ pagerTemplate = $("#pager-template").html(); }

        $("#ulPager").attr("actualPage", actualPage);

        for (var i = 1; i < countPages + 1 ; i++) { 
            $("#ulPager > li:last-child").before(
                    pagerTemplate
                        .replace("-0-", i.toString())
                        .replace("-1-", i.toString())
                    );
        }

        $(".numberPage").on('click', (event) =>
        {               
            changePage(
                Number($(event.currentTarget).attr("value"))
            );     
            
        });

    }

    function GetCustomerType(customerTypeId: number):string{
        
        let x: ModelCustomerType[] = colCustomersTypes.filter(function (element, index) {
            return (element.customerTypeId == customerTypeId.toString());
         });

        return x[0].description;       
        
    }

    function CleanForm():void{
        
        $("#hdnCustomerId").val(0);
        $("#txtFirst").val("");
        $("#txtMiddle").val("");
        $("#txtSurname").val("");
        $("#txtEmail").val("");
        $("#dCustomerType").val(1);
        $("#txtNotes").val("");
    }

     GetCustomerTypes();
 
});
