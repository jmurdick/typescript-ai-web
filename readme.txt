Here's the trick with running it...

1. Open the visual studio solution only to run the back end service. 
maybe include a docx in the repo with build instructions since they're tricky?

2.  Open the FrontEnd directory in Visual Studio Code to do all front-end development. 

3. Open a powershell command prompt on the FrontEnd directory to make it easier to run commands. (You can also use the integrated powershell in VSCode, but I prefer external)

4. Install Yarn from https://yarnpkg.com/lang/en/docs/install/

5. Run "yarn install" from the powershell prompt
That should install everything else such as NPM and all the other node modules

6. "yarn dev" to start a test webserver on port 8080 (it will pick the next available port if that one's in use.)
Then you can browse as usual. 
Currently you can no longer actually browse to the vue components, because I haven't figured out how to get ert style dropdowns to work in Vue. I had to remove the javascript in their sample, because it wouldn't compile.

For deployment, we'll run "yarn build" to dump everything to a /build/ directory that we can then publish/include as static website in a normal VS web project.