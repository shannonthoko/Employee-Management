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

    connection.query("SELECT * FROM employee"), (err,data)=>{

        if(err) throw err;
        console.log(data);
        
    }
    
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
            console.log(`Item ${answers.firstName} has been added`)
            view();
        }
    )



    })

}

//function to update employee
const update = () => {
    //console.log("UPDATE")





}


//function to kick off app
const start = () => {


    inquirer.prompt([


        {
            type: "list",
            message:"What would you like to do?",
            choices: ["View Employees", "Add Employee", "Update Employee"],
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