#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
const program = new Command();

const questions = [
  {
    type: "input",
    name: "title",
    message: "Please enter course title",
  },
  {
    type: "number",
    name: "price",
    message: "Please enter course price",
  },
];

program
  .name("system-manager")
  .description("CLI to manage the system")
  .version("1.0.2");

program
  .command("add")
  .alias("a")
  .description("Add a course")

  .action((param, option) => {
    inquirer.prompt(questions).then((answers) => {
      if (fs.existsSync("./courses")) {
        fs.readFile("./courses", "utf8", (err, fileContent) => {
          if (err) {
            console.log("error from reading => ", err);
            process.exit();
          }
          console.log("file content: ", fileContent);
          const fileContentAsJson = JSON.parse(fileContent);
          fileContentAsJson.push(answers);
          fs.writeFile(
            "./courses",
            JSON.stringify(fileContentAsJson),
            "utf8",
            () => {
              console.log("course is added successfully!");
            },
          );
        });
      } else {
        fs.writeFile("./courses", JSON.stringify([answers]), "utf8", () => {
          console.log("course is added successfully!");
        });
      }
    });
  });
program
  .command("list")
  .alias("l")
  .description("list all courses")

  .action(() => {
    fs.readFile("./courses", "utf-8", (err, content) => {
      if (err) {
        console.log(err);
        process.exit();
      } else {
        console.table(JSON.parse(content));
      }
    });
  });

program.parse();
