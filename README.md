# Employee-Tracker

## Description

# Employee Tracker

![MIT License](https://img.shields.io/badge/license-MIT-important)

## Table of Contents

- [Description](#description)
- [Installation Instructions](#installation-instructions)
- [Usage Instructions](#usage-instructions)
- [License Section](#license)

- [Testing](#testing)
- [Contact Me](#contact-me)

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). This command-line application was built to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Installation Instructions

### node.js installation

Make sure that you have node.js installed on your computer by entering node -v in the command line. If successful, the command prompt will return a version number. If not, try reinstalling Node.js by following this link: https://nodejs.org/en/ and clicking on the LTS version. If you are on Windows, make sure to look for the section that says `Download for Windows (x64)`. If you are using macOS, make sure to look for the section that says `Download for MacOS (x64)`

### Clone the code

Once node.js is downloaded, click on the green code button and copy the link to this repository. Then open up your favorite code editor and open the terminal. In the terminal use `cd` to go to the root directory you want this repository to be cloned to. Finally, in the terminal, type `git clone <file link>` to clone this repository to your directory.

### MySQL

You will also have to install MySQL to write SQL queries. To install, click on this link: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/ and follow the instructions based on your operating system.

### Inquirer

You must also install the Inquirer npm package to see the portfolio. Since Inquirer is an npm package instead of being built directly into node.js, you must type `npm init` into the command line to allow npm packages to be installed. Next, go to the app.js file, and in the command line, type `npm install inquirer` to install Inquirer on your computer. For documentation on Inquirer or other npm packages, follow this link: https://www.npmjs.com/ and type the npm you want to search in the search bar.

### MySQL2

You will also have to install MySQL2 in order to connect to your SQL database. Like Inquirer, MySQL2 is an npm package so you must type `npm init` in the command line if you haven't done so yet. Then type `npm install mysql2` to install MySQL2 into your dependencies. For documentation on MySQL2, follow this link: https://www.npmjs.com/package/mysql2

### Console-Table-Printer

Finally, you will need to install the console-table-printer npm package to print the table with rows to your console. To install, type `npm install console-table-printer` into the command line. For documentation on console-table-printer, follow this link: https://www.npmjs.com/package/console-table-printer

## Usage Instructions

1. Update your mySQL connection properties in the `connection.js` file in the `config` folder

2. Sign into MySQL workbench by typing `mysql -u root -p` in the command line and enter your password for your MySQL Workbench account

3. Type `source db/db.sql` to update the database, then type `source db/schema.sql` to update the tables and finally type `source db/seeds.sql` to update the table information and then type `quit` to exit mySQL Workbench

4. To start the application, type `npm start` in the command line. You should then be given a series of prompts as shown below.

![Prompts](https://user-images.githubusercontent.com/88728912/152414349-805721b6-6943-48a2-9099-4c39299a1c1f.png)

4. To select a prompt, use the up or down arrow keys and press enter on the desired prompt.

5. When you are done, use the arrow keys to scroll to the `quit` prompt and press enter.

### Visual Walkthrough

For a visual walkthrough about how to create the team profile, click on the link: https://watch.screencastify.com/v/g86cAYtiD2uImqYEoNya

## License

Permission to use this application is granted under the MIT license.
Click on the link for more information: [MIT License Information](https://opensource.org/licenses/MIT)

## Tests

If you would like see how the current tests work, type `npm test` in the command line. After running the `npm test` command, you should see a bunch of passing tests in the command line as shown below.

![Successful Test](https://user-images.githubusercontent.com/88728912/152415961-2b916a13-7bbd-4784-aa44-00cce467e9b5.png)

## Contact Me

GitHub Link: (https://github.com/nicnolen)<br>
Email Address: <nicnolen@ymail.com>
