#!/usr/bin/env node
import inquirer from "inquirer";

let todos: string[] = [];
let condition = true;

let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option you want to do:",
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Task",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    } else if (option.choice === "View Task") {
      await viewTask();
    } else if (option.choice === "Exit") {
      condition = false;
    }
  }
};

// ADD TASK
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "Enter your new task: ",
    },
  ]);

  todos.push(newTask.task);
  console.log(`\n ${newTask.task} task added successfully in your list`);
};

// DELETE TASK
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the index of the task you want to delete :",
    },
  ]);
  let deletedTask = todos.splice(taskIndex.index - 1, 1);
  console.log(
    `\n${deletedTask} this task has been deleted successfully from your list`
  );
};

//UPDATE TASK
let updateTask = async () => {
  await viewTask();
  let updateTask = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the index of the task you want to update :",
    },
    {
      name: "new_task",
      type: "input",
      message: "Now enter the new task :",
    },
  ]);
  todos[updateTask.index - 1] = updateTask.new_task;
  console.log(
    `\n Task at index no. ${updateTask.index - 1} has been updated to ${
      updateTask.new_task
    }`
  );
};

// VIEW TASK
let viewTask = () => {
  console.log("\n Your Todo List: \n");
  todos.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};

main();
