( async function  () {
    const data = await fetch("./src/data.json");
    const res = await data.json();
    let employees = res;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
 
  
    const employeesList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");
    const firstName = document.querySelector(".firstName");
    const lastName = document.querySelector(".lastName");
    const imageUrl = document.querySelector(".imageUrl");
    const email = document.querySelector(".email");
    const contactNumber = document.querySelector(".contactNumber");
    const salary = document.querySelector(".salary");
    const address = document.querySelector(".address");
    const dobInput = document.querySelector(".addEmployee-create--dob")
    const submitBtn = document.querySelector(".addEmployee_create--submit")
    const updateBtn = document.querySelector(".addEmployee_update--submit")

  
    // Add employee logic

    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    let addEmployeeForm = document.querySelector(".addEmployee_create");
    const heading = document.querySelector(".heading");
  
    createEmployee.addEventListener("click" , (e) => {
        if(e.target.className === "createEmployee") 
        addEmployeeModal.style.display = "flex"
        heading.innerHTML = "Add a new Employee"
        firstName.value = ""
        lastName.value = ""
        imageUrl.value = ""
        email.value = ""
        contactNumber.value = ""
        salary.value = ""
        address.value = ""
        dobInput.value = ""
        submitBtn.style.display = "flex"
        submitBtn.value = "create User"
        updateBtn.style.display = "none"
    })

    //  rendering value in form
    employeeInfo.addEventListener("click" , (e) => {
        if(e.target.className === "employeeEdit"){
            addEmployeeModal.style.display = "flex"
            heading.innerHTML = "Edit Employee details"
            firstName.value = selectedEmployee.firstName  
            lastName.value = selectedEmployee.lastName 
            imageUrl.value = selectedEmployee.imageUrl 
            email.value = selectedEmployee.email
            contactNumber.value = selectedEmployee.contactNumber
            salary.value = selectedEmployee.salary
            address.value = selectedEmployee.address
            dobInput.value = selectedEmployee.dob.split("/").reverse().join("-")
            submitBtn.style.display = "none"
            updateBtn.style.display = "flex"
            updateBtn.value = "Update Details"
        }
    })

    addEmployeeModal.addEventListener("click" , (e) => {
        if(e.target.className === "addEmployee"){
            addEmployeeModal.style.display = "none"
        }
    })

    // const dobInput = document.querySelector(".addEmployee-create--dob")
     dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}` 

    addEmployeeForm.addEventListener("submit" , (e) => {
        e.preventDefault()
        const formData = new FormData(addEmployeeForm)
        const values = [...formData.entries()]
        let empData = {}
        values.forEach((val) => {
            empData[val[0]] = val[1]
        })
        empData.id = employees[employees.length - 1].id + 1;
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0 , 4) , 10)
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png"
        employees.push(empData)
        renderEmplyees()
        addEmployeeForm.reset()
        addEmployeeModal.style.display = "none"
    })


    // select employee logic
    employeesList.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
        selectedEmployeeId = e.target.id;
        renderEmplyees();
        renderSingleEmployee();
        //render single employee
      }

      if(e.target.tagName === "I"){
        employees = employees.filter(emp => String(emp.id) !== e.target.parentNode.id)
      }
      if(String(selectedEmployee) === e.target.parentNode.id){
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }

      renderEmplyees();
    });
  
    const renderEmplyees = () => {
      employeesList.innerHTML = "";
      employees.forEach((emp) => {
        const employee = document.createElement("span");
        employee.classList.add("employees__names--item");
        if (parseInt(selectedEmployeeId, 10) === emp.id) {
          employee.classList.add("selected");
          selectedEmployee = emp;
        }
        employee.setAttribute("id", emp.id);
        employee.innerHTML = `
        ${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i> `;
        employeesList.append(employee);
      });
    };

        //update logic
        updateBtn.addEventListener("click" , (e) => {
          employees.forEach((employee) => {
            if(employee.id === Number(selectedEmployeeId)){
               employee.firstName = firstName.value
               employee.lastName = lastName.value
               employee.imageUrl = imageUrl.value
               employee.email = email.value
               employee.address = address.value
               employee.salary  = salary.value
               employee.dob  = dobInput.value
               employee.contactNumber  = contactNumber.value
            }
          })
          renderEmplyees()
          renderSingleEmployee();
          addEmployeeModal.style.display = "none"
        })
        console.log(employees)
    //Render Single Employee
  
    const renderSingleEmployee = () => {
       if(selectedEmployeeId === -1){
        employeeInfo.innerHTML = ""
        return
       }

   
      employeeInfo.innerHTML = `
      <i class="employeeEdit">✏️</i> 
      <img src="${selectedEmployee.imageUrl}"/>
       <span class="employees__single--heading">
       ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
       </span>
       <span>${selectedEmployee.address}</span>
       <span>${selectedEmployee.email}</span>
       <span>Mobile - ${selectedEmployee.contactNumber}</span>
       <span>DOB - ${selectedEmployee.dob}</span>
       `;
    };
    renderEmplyees();
    if (selectedEmployee) renderSingleEmployee();
  })();


  