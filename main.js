#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
const response = await inquirer.prompt([
    {
        type: 'number',
        name: 'userInput',
        message: 'Please enter The amount of seconds',
        validate: (input) => {
            if (isNaN(input)) {
                return 'Please enter a valid number';
            }
            else if (input > 60) {
                return 'Seconds must be less than or equal to 60 seconds';
            }
            else {
                return true;
            }
        }
    }
]);
let input = response.userInput;
function startTime(val) {
    const initailTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initailTime);
    setInterval((() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log('Time is up');
            process.exit();
        }
        const minute = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const second = Math.floor(timeDiff % 60);
        console.log(`${minute.toString().padStart(2, "0")} : ${second.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
