const projectsButtonsRef = document.querySelectorAll('.projects-button');
const projectImageRef = document.querySelector('#project-image');
const projectNameRef = document.querySelector('#project-name');
const projectLiveRef = document.querySelector('#project-live');
const projectGithubRef = document.querySelector('#project-github');
const projectDescriptionRef = document.querySelector("#project-description");

projectsButtonsRef.forEach((button) => {
    button.addEventListener('click', () => {
        projectsButtonsRef.forEach((tempButton) => {
            tempButton.style.scale = "1";
        })
        button.style.scale = '1.2';
        if (button.innerText == "wya") {
          projectImageRef.style.backgroundImage =
            "url(/project_images/wya.png)";
          projectNameRef.innerText = "wya";
          projectLiveRef.href = "https://wyaapp.com/";
          projectGithubRef.href = "https://github.com/TheoC26/WYAWebsite";
          projectDescriptionRef.innerText = "The website for WYA app";
        } else if (button.innerText == "annotater") {
          projectImageRef.style.backgroundImage =
            "url(/project_images/annotater.png";
          projectNameRef.innerText = "annotater";
          projectLiveRef.href = "https://www.annotater.app/";
          projectGithubRef.href = "https://www.annotater.app/";
          projectDescriptionRef.innerText =
            "Annotater.app is a website that allows users to summarize and annotate long sources with each";
        } else if (button.innerText == "crypto ccicks") {
          projectImageRef.style.backgroundImage =
            "url(/project_images/cryptoccicks.png)";
          projectNameRef.innerText = "crypto ccicks";
          projectLiveRef.href = "https://cryptoccicks.netlify.app/";
          projectGithubRef.href = "https://cryptoccicks.netlify.app/";
          projectDescriptionRef.innerText =
            "Crypto Ccicks is an NFT project that allows users to collect and trade digital shoes.";
        } else if (button.innerText == "evolution") {
          projectImageRef.style.backgroundImage =
            "url(https://raw.githubusercontent.com/c25tc/EvolutionSimulation/master/Screen%20Shot%202023-02-23%20at%2010.02.18%20AM.png)";
          projectNameRef.innerText = "evolution";
          projectLiveRef.href = "https://cryptoccicks.netlify.app/";
          projectGithubRef.href = "https://cryptoccicks.netlify.app/";
          projectDescriptionRef.innerText =
            "This is a simulation of evolution using genetic algorithms and neural networks.";
        } else if (button.innerText == "traffic") {
          projectImageRef.style.backgroundImage =
            "url(/project_images/wya.png)";
          projectNameRef.innerText = "traffic";
          projectLiveRef.href = "https://cryptoccicks.netlify.app/";
          projectGithubRef.href = "https://cryptoccicks.netlify.app/";
          projectDescriptionRef.innerText =
            "This is a traffic simulation that emulates self driving cars using sensors to navigate their environment.";
        }
    });
})