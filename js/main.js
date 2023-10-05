//Get input Element 
var firstNameInput = document.getElementById('firstName');
var lastNameInput = document.getElementById('lastName');
var ageInput = document.getElementById('age');
var emailInput = document.getElementById('email');
var departmentInput = document.getElementById('department');
var mainBtn =document.getElementById('mainBtn');

//Intiallize an array to store information
var data;
var tmp;
//local storage
if(localStorage.getItem('myData') != null) {
    // If 'myProduct' exists in local storage, retrieve and parse it
    data= JSON.parse(localStorage.getItem('myData'));
    displayData(data); // Assuming this function displays the products
} else {
    // If 'myProduct' doesn't exist in local storage, initialize productContainers as an empty array
    data = [];
}

// function to add data
function addData(item){
   if(validateData()){
     //check if add information
     if(mainBtn.innerHTML =="Send"){
        //store information 
    var information={
        firstname:firstNameInput.value,
        lastname:lastNameInput.value,
        age:ageInput.value,
        email:emailInput.value,
        department:departmentInput.value,
    }
    //push the information into the data array
    data.push(information);

    //store data in application 
    localStorage.setItem('myData',JSON.stringify(data));

    //print the data in console
    // console.log(data);

    //calling function display data
    displayData(data);

    //calling function clearFields from input after register
    clearFields();
    }
    //check the buuton if update is enabled
    else if(mainBtn.innerHTML =="Update Informtion"){
        var information={
            firstname:firstNameInput.value,
            lastname:lastNameInput.value,
            age:ageInput.value,
            email:emailInput.value,
            department:departmentInput.value,
        }

       data[tmp]=information;
        }
        displayData(data);

        //store data in application 
        localStorage.setItem('myData',JSON.stringify(data));

     //calling function clearFields from input after register
     clearFields();
    mainBtn.innerHTML="Send";
    
// 
   }
   else{
    alert("please valid first and last name");
   }
};

//function to display data  in table
function displayData(dataList){
     // store data in table
    var tableRecord=``;
    // Loop through the productContainers array to add each product to the table
    for(var i=0;i<dataList.length;i++){
        
        tableRecord +=`
        <tr>
        <td>${i}</td>
        <td>${dataList[i].firstname}</td>
        <td>${dataList[i].lastname}</td>
        <td>${dataList[i].age}</td>
        <td>${dataList[i].email}</td>
        <td>${dataList[i].department}</td>
        <td><button onclick=" updateData(${i})" class="btn btn-secondary">Update</button></td>
        <td><button onclick=" deleteData(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
        `;
    };
    document.getElementById('tableRow').innerHTML= tableRecord;
    
}

//function to delete a record in table
function deleteData(dataIndex){

    //delete by splice
  data.splice(dataIndex ,1);
    localStorage.setItem('myData',JSON.stringify(data));
    //calling function display
    displayData(data);
}

//function to delete fields after register
function clearFields(){
    firstNameInput.value ="";
    lastNameInput.value ="";
    ageInput.value="";
    emailInput.value="";
    departmentInput.value="";
}

//function to update data
function updateData(index){
    firstNameInput.value= data[index].firstname;
    lastNameInput.value = data[index].lastname;
    emailInput.value = data[index].email;
    ageInput.value = data[index].age;
    departmentInput.value = data[index].department;
    mainBtn.innerHTML="Update Informtion";  
    tmp=index;
}

//function for search
function searchOnData(info) {
    // Initializing the search array to store data
    var searchResult = [];

    // Search in every information in the table
    for (var i = 0; i < data.length; i++) {
        // Check if the firstname includes the search term (case-insensitive)
        if (data[i].firstname.toLowerCase().includes(info.toLowerCase())) {
            // Push the data to searchResult array
            searchResult.push(data[i]);
        }
    }

    // Calling display function to display search results
    displayData(searchResult);
}

//function validate
function validateData(){

    var regex =/^[A-Z][a-z]{2,8}$/;

    if(regex.test(firstNameInput.value&& lastNameInput.value)){
        return true;
    }
    else{
        return false;
    }


}
