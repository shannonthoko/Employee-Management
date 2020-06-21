//create a command line interface application for a employee management
const mysql = require("mysql");
const inquirer = require("inquirer");
//sql, inquirer 

//create connection information
const connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "SThokoK9013",
    database: "employeeManagement_db"

});


//function to view employees
const view = () => {
    console.log("VIEW")

    connection.query("SELECT * FROM employee", (err,data)=>{

        if(err) throw err;
        //console.log(data);
        for (const employee of data){
        console.log(`Employee : ${employee.first_name} ${employee.last_name} Role ID: ${employee.role_id} Manager ID: ${employee.manager_id}`)
        };
    });
    
};

//function to add emplyee
const add = () => {
    //console.log("ADD")

    inquirer.prompt([

        {
            type:"input",
            message: "Employee First Name",
            name: "firstName"

        },

        {
            type:"input",
            message: "Employee Last Name",
            name: "lastName"

        },

        {
            type:"input",
            message: "Role ID",
            name: "role"

        },

        {
            type:"input",
            message: "Manager ID",
            name: "manager"

        }


    ]).then((answers) => {

        connection.query("INSERT INTO employee SET ?", 
        
        {

            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.role,
            manager_id: answers.manager
        },
        (err)=>{

            if(err) throw err;
            console.log(`Employee ${answers.firstName} has been added`)
            
            view();
        }
    )



    })

}

//function to update employee
const update = () => {
    //console.log("UPDATE")



}

const addRole = () =>{

    inquirer.prompt([

        {
            type:"input",
            message: "Title",
            name: "title"

        },

        {
            type:"input",
            message: "Salary",
            name: "salary"

        },

        {
            type:"input",
            message: "Department ID",
            name: "departmentID"

        },



    ]).then((answers) => {

        connection.query("INSERT INTO role SET ?", 
        
        {

            title: answers.title,
            salary: answers.salary,
            department_id: answers.departmentID
            
        },
        (err)=>{

            if(err) throw err;
            console.log(`Role ${answers.title} has been added`);
            viewRole();
            
        }
    )

    
    
    
})

}

const viewRole = () =>{



    connection.query("SELECT * FROM role", (err,data)=>{


        if (err) throw err
        //console.log(data);

        for (const role of data){
            console.log(`Role: ${role.title} Salary: ${role.salary} Department: ${role.department_id}`)
            };
    })



}

const addDepartment = () =>{


    inquirer.prompt([

        {
            type:"input",
            message: "Department name",
            name: "department"

        },

    



    ]).then((answers) => {

        connection.query("INSERT INTO department SET ?", 
        
        {

            name: answers.department
            
        },
        (err)=>{

            if(err) throw err;
            console.log(`Department ${answers.department} has been added`);
            viewDepartment();
            
        }
    )  
    
})


}

const viewDepartment = () => {

    connection.query("SELECT * FROM department", (err,data)=>{


        if (err) throw err
        //console.log(data);

        for (const department of data){
            console.log(`Department: ${department.name}`)
            };
    })




};


const employeeDepartment = () => {

    connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee INNER JOIN department ON employee.id = department.id",
    (err,data) =>{

        if(err) throw err
        console.log(data);

        //console.log(`${data[0].first_name} ${data[0].last_name} ${data[0].name}`)

    })
    



}
//function to kick off app
const start = () => {


    inquirer.prompt([


        {
            type: "list",
            message:"What would you like to do?",
            choices: ["View Employees", "Add Employee", "Update Employee", "Add Role", "View Roles", "Add Department", "View Departments", "Employees By Department"],
            name: "choice"
        
        }
    ]).then((answer) => {

        
         switch(answer.choice) {

            case "View Employees":
                //return //function
                return view();
            case "Add Employee":
                //return //function 
                return add();
            case "Update Employee":
                //return //function 
                return update();
            case "Add Role":
                return addRole();    
            case "View Roles":
                return viewRole();
            case "Add Department":
                return addDepartment();   
            case "View Departments":
                return viewDepartment(); 
            case "Employees By Department":
                return employeeDepartment();
            default:     
            connection.end();

         }


    })

}



//connect to server 
connection.connect((err)=>{

    if(err) throw err
    console.log("connected to database");
    start();
    
});