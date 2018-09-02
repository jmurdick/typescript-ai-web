What is this project?
An experiment to play with AI methods in a browser, typescript, VUE.js environment.

What requirements are there?
I recommend using:
* Yarn instead of npm - https://yarnpkg.com/lang/en/docs/install/
* VSCode - https://code.visualstudio.com/
  * TSLint Extension
  * TSLint Vue Extension
  * TypeScript Hero Exension
  * Vetur Extension
* Vue-js Extension for Chrome - https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd
How do I run it?

1. Open the folder in Visual Studio Code. 

2. Open a powershell command prompt on the source directory to make it easier to run commands. (You can also use the integrated powershell in VSCode, but I prefer external)

3. Run "yarn install" from the powershell prompt
That should install everything else such as NPM and all the other node modules

4. "yarn dev" to start a test webserver on port 8080 (it will pick the next available port if that one's in use.)
Then you can browse as usual. 

5. "yarn jest" will run any unit tests in the project.
