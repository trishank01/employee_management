( async function  () {
    const data = await fetch("./src/data.json");
    const res = await data.json();
    let employees = res;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
  
    const employeesList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");
  
    // Add employee login
  
    // select employee logic
    employeesList.addEventListener("click", (e) => {
      if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
        selectedEmployeeId = e.target.id;
        renderEmplyees();
        renderSingleEmployee();
        //render single employee
      }
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
        employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeEdit">✏️</i> <i class="employeeDelete">❌</i> `;
        employeesList.append(employee);
      });
    };
  
    //Render Single Employee
  
    const renderSingleEmployee = () => {
      //deleting employee
      employeeInfo.innerHTML = `<img src="${selectedEmployee.imageUrl}"/>
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


  