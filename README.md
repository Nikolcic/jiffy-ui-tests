# JiffyDemo

- This is demo task to demonstrate some Playwright/TypeScript skills

**1. Installation process**

- Before downloading [this Git repo](https://github.com/Nikolcic/JiffyDemo.git) you should have [Node.js](https://nodejs.org/en/download) installed
- Run following command to install dependencies `npm install`
- Run following command to install PW browsers `npx playwright install`

**2. Run tests**
- To run desired test, please check _'scripts'_ in [package.json](https://github.com/Nikolcic/JiffyDemo/blob/main/package.json) file, (e.g. to run tests execute following comand `npm run chrome:web`)


**3. Tips**
- To see the test execution in your local browser just change 'headless' argument to 'false'
- Tests for execution are located at [tests](https://github.com/Nikolcic/JiffyDemo/tree/main/tests) directory

- Design Pattern used in this project is Page Object Model. Pages are located at [pages](https://github.com/Nikolcic/JiffyDemo/tree/main/pages) directory
- Every page class contains locators and methods that are specific for that page.
- Base class is inherited by BasePage. It contains methods that accept locators as an argument or helper functions that are used in multiple classes. By this approach we'll have less and more organized code in BasePage. 
- BasePage class is inherited by every other page/class. It contains methods and locators which are used multiple times to make our code easier to understand and maintain.

- Environemt variables are not in .gitignore just for demo purpose, otherview it wouldn't be commited and for CI purpose variables will be stored into e.g. Github Secrets
  
- Each test has own isolated set of variables, so all tests can run in parallel

**4. Video**
- To see video after a test, you can write this command into terminal "npx playwright show-report" -> browser will open HTML report -> choose a test -> scroll down -> run video
