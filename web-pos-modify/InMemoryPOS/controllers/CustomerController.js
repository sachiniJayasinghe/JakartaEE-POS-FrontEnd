
var customerFormVar =document.querySelector("#customerForm");
var itemFormVar =document.querySelector("#itemForm");
var orderrFormVar =document.querySelector("#orderForm");
var homeFormVar = document.querySelector("#homeeeeee");

homeFormVar.style.display='inline'
customerFormVar.style.display='none';
itemFormVar.style.display='none';
orderrFormVar.style.display='none';

$("#homeNav").click(function (){
    homeFormVar.style.display='inline'
    customerFormVar.style.display='none';
    itemFormVar.style.display='none';
    orderrFormVar.style.display='none';
});

$("#customerNav").click(function (){
    homeFormVar.style.display='none'
    customerFormVar.style.display='inline';
    itemFormVar.style.display='none';
    orderrFormVar.style.display='none';
    updateCustomerTable();
});


$("#itemNav").click(function (){
    homeFormVar.style.display='none'
    customerFormVar.style.display='none';
    itemFormVar.style.display='inline';
    orderrFormVar.style.display='none';
});


$("#orderNav").click(function (){
    homeFormVar.style.display='none'
    customerFormVar.style.display='none';
    itemFormVar.style.display='none';
    orderrFormVar.style.display='inline';
});



var $tblCustomer = $("#tblCustomer");
var $cIdTxt = $("#cIdTxt");
var $cNameTxt = $("#cNameTxt");
var $cAddressTxt = $("#cAddressTxt");
var $cSalaryText = $("#cSalaryText");


$("#cSavebtn").click(() => {
    saveCustomer();
    updateCustomerTable();
});

$("#cUpdateBtn").click(() => {
    updateCustomer();
    updateCustomerTable();

});

function updateCustomerTable(){
    $("#tblCustomer").empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/test/CustomerServletAPI",
        success: function (customers) {
            for(let i in customers){
                let cusID = customers[i].cusID;
                let cusName = customers[i].cusName;
                let cusAddress = customers[i].cusAddress;
                let cusSalary = customers[i].cusSalary;
                let row = `<tr><td>${cusID}</td><td>${cusName}</td><td>${cusAddress}</td><td>${cusSalary}</td></tr>`;
                $("#tblCustomer").append(row);
            }
        },
        error: function (resp) {
            alert("Failed to load the customer");
        }
    });
}
$("#clearBtn").click(() => {
    $cNameTxt.val("");
    $cIdTxt.val("");
    $cAddressTxt.val("");
    $cSalaryText.val("");
});

$("#cDeleteBtn").click(() => {
    deleteCustomer();
    updateCustomerTable();
});

$("#cSearchBtn").click(function () {
    searchCustomer();
});

function saveCustomer(){
    let newCustomer = Object.assign({},customer);
    newCustomer.cusID = $cIdTxt.val();
    newCustomer.cusName = $cNameTxt.val();
    newCustomer.cusAddress = $cAddressTxt.val();
    newCustomer.cusSalary = $cSalaryText.val();

    $.ajax({
        url: "http://localhost:8080/test/CustomerServletAPI",
        type: "POST",
        data: JSON.stringify(newCustomer),
        headers: {"Content-Type": "application/json"},
        success: function(res) {
            console.log("Response from server: " + JSON.stringify(res));
        },
        error: function(res) {
           // console.error("Error from server: " + JSON.stringify(res));
        }
    });
}

function updateCustomer(){
    let newCustomer = Object.assign({},customer);
    newCustomer.cusID = $cIdTxt.val();
    newCustomer.cusName = $cNameTxt.val();
    newCustomer.cusAddress = $cAddressTxt.val();
    newCustomer.cusSalary= $cSalaryText.val();

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/test/CustomerServletAPI",
        contentType: JSON.stringify(newCustomer),
        data: JSON.stringify(newCustomer),
        success: function (resp) {
            alert("Customer Updated");
        },
        error: function (resp) {
            alert("Failed to update the customer");
        }
    })
}

function deleteCustomer() {
   var cusID = $cIdTxt.val();

    $.ajax({
        type: "DELETE",
        url: 'http://localhost:8080/test/CustomerServletAPI/' + cusID,
        success: function (resp) {
            alert("Customer Deleted");
            clearForm();
        },
        error: function (resp) {
            alert("Failed to delete the customer");
        }
    });
}


function searchCustomer() {
    var cusID = $("#cSearchTxt").val();
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/test/CustomerServletAPI",
        async: true,
        dataType: 'json',
        data: {
            cusID: cusID
        },
        success: function (resp) {
            const customer = resp[0];
            $cIdTxt.val(customer.cusID);
            $cNameTxt.val(customer.cusName);
            $cAddressTxt.val(customer.cusAddress);
            $cSalaryText.val(customer.cusSalary);
        },
        error: function (resp) {
            alert("Failed to find the customer");
        }
    });
}

function clearForm() {
    $cIdTxt.val("");
    $cNameTxt.val("");
    $cAddressTxt.val("");
    $cSalaryText.val("");
}

export { saveCustomer, updateCustomer ,deleteCustomer };

// $(document).ready(function () {
//     // Search customer by ID
//     $('#cSearchBtn').click(function () {
//         var customerId = $('#cSearchTxt').val();
//         $.ajax({
//             url: 'http://localhost:8080/test/CustomerServletAPI', // Change this to your server endpoint
//             type: 'GET',
//             data: { cusId: customerId },
//             success: function (data) {
//                 $('#cIdTxt').val(data.cusId);
//                 $('#cNameTxt').val(data.cusName);
//                 $('#cAddressTxt').val(data.cusAddress);
//                 $('#cSalaryText').val(data.cusSalary);
//             },
//             error: function () {
//                 alert('Customer not found.');
//             }
//         });
//     });

//     // Save new customer
//     $('#cSavebtn').click(function () {
//         var customerData = {
//             cusId: $('#cIdTxt').val(),
//             cusName: $('#cNameTxt').val(),
//             cusAddress: $('#cAddressTxt').val(),
//             cusSalary: $('#cSalaryText').val()
//         };

//         $.ajax({
//             url: "http://localhost:8080/test/CustomerServletAPI",
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(customerData),
//             success: function () {
//                 alert('Customer saved successfully.');
//                 clearFields();
//                 updateCustomerTable();
//             },
//             error: function () {
//                 alert('Error saving customer.');
//             }
//         });
//     });

//     // Update customer
//     $('#cUpdateBtn').click(function () {
//         var customerData = {
//             id: $('#cIdTxt').val(),
//             name: $('#cNameTxt').val(),
//             address: $('#cAddressTxt').val(),
//             salary: $('#cSalaryText').val()
//         };

//         $.ajax({
//             url: 'http://localhost:8080/test/CustomerServletAPI', // Change this to your server endpoint
//             type: 'PUT',
//             contentType: 'application/json',
//             data: JSON.stringify(customerData),
//             success: function () {
//                 alert('Customer updated successfully.');
//                 clearFields();
//                 updateCustomerTable();
//             },
//             error: function () {
//                 alert('Error updating customer.');
//             }
//         });
//     });

//     // Delete customer
//     $('#cDeleteBtn').click(function () {
//         var customerId = $('#cIdTxt').val();

//         $.ajax({
//             url: 'http://localhost:8080/test/CustomerServletAPI', // Change this to your server endpoint
//             type: 'DELETE',
//             data: { id: customerId },
//             success: function () {
//                 alert('Customer deleted successfully.');
//                 clearFields();
//                 updateCustomerTable();
//             },
//             error: function () {
//                 alert('Error deleting customer.');
//             }
//         });
//     });

//     // Clear all fields
//     $('#clearBtn').click(function () {
//         clearFields();
//     });

//     // Function to clear form fields
//     function clearFields() {
//         $('#cIdTxt').val('');
//         $('#cNameTxt').val('');
//         $('#cAddressTxt').val('');
//         $('#cSalaryText').val('');
//     }

//     // Function to update customer table
//     function updateCustomerTable() {
//         $.ajax({
//             url: 'http://localhost:8080/test/CustomerServletAPI', // Change this to your server endpoint for fetching all customers
//             type: 'GET',
//             success: function (data) {
//                 var customerTable = $('#tblCustomer');
//                 customerTable.empty(); // Clear the table before adding new data
//                 data.forEach(function (customer) {
//                     var row = `<tr>
//                         <td>${customer.name}</td>
//                         <td>${customer.id}</td>
//                         <td>${customer.address}</td>
//                         <td>${customer.salary}</td>
//                     </tr>`;
//                     customerTable.append(row);
//                 });
//             },
//             error: function () {
//                 alert('Error retrieving customer data.');
//             }
//         });
//     }

//     // Initial table update
//     updateCustomerTable();
// });
