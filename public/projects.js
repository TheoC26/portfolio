const projectsButtonsRef = document.querySelectorAll(".projects-button");
const projectImageRef = document.querySelector("#project-image");
const projectNameRef = document.querySelector("#project-name");
const projectLiveRef = document.querySelector("#project-live");
const projectGithubRef = document.querySelector("#project-github");
const projectDescriptionRef = document.querySelector("#project-description");
const projectBgRef = document.querySelector("#project-bg");

projectsData = [
  {
    name: "this teenage life",
    imageUrl: "/project_images/ttl.png",
    liveUrl: "https://thisteenagelife.org/",
    githubUrl: "https://github.com/TheoC26/WYAWebsite",
    description:
      "The website for This Teenage Life, a podcast by teenagers for teenagers.",
    backgroundGradient: "linear-gradient(to top right, #ddaee4, #c8addf)",
  },
  {
    name: "notator",
    imageUrl: "/project_images/notator.png",
    liveUrl: "https://www.notator.app/",
    githubUrl: "https://github.com/TheoC26/annotater.app",
    description:
      "Notator is a website that allows users to summarize and annotate long sources with each",
    backgroundGradient: "linear-gradient(to top right, #d2e2f6, #ead9f3)",
  },
  {
    name: "mnemo",
    imageUrl: "/project_images/mnemo.png",
    liveUrl: "https://mnemoremember.com/",
    githubUrl: "https://github.com/TheoC26/NFT-website/",
    description:
      "Mnemo is an application to rekindle emotional connections between older adults with memory loss and their loved ones.",
    backgroundGradient: "linear-gradient(to top right, #aec6f3, #d3a7eb)",
  },
  {
    name: "evolution",
    imageUrl:
      "https://raw.githubusercontent.com/c25tc/EvolutionSimulation/master/Screen%20Shot%202023-02-23%20at%2010.02.18%20AM.png",
    liveUrl: "https://github.com/c25tc/EvolutionSimulation",
    githubUrl: "https://github.com/c25tc/EvolutionSimulation",
    description:
      "This is a simulation of evolution using genetic algorithms and neural networks.",
    backgroundGradient: "linear-gradient(to top right, #b2d2db, #929fcc)",
  },
  {
    name: "traffic",
    imageUrl: "/project_images/traffic.png",
    liveUrl: "https://github.com/c25tc/TrafficSimulation",
    githubUrl: "https://github.com/c25tc/TrafficSimulation",
    description:
      "This is a traffic simulation that emulates self driving cars using sensors to navigate their environment.",
    backgroundGradient: "linear-gradient(to top right, #c2daf5, #f9ccf0)",
  },
];



projectsButtonsRef.forEach((button) => {
  button.addEventListener("click", () => {
    projectsButtonsRef.forEach((tempButton) => {
      tempButton.style.scale = "1";
    });
    button.style.scale = "1.2";

    const projectData = projectsData.find(
      (project) => project.name === button.innerText.toLowerCase()
    );

    if (projectData) {
      projectImageRef.style.backgroundImage = `url(${projectData.imageUrl})`;
      projectNameRef.innerText = projectData.name;
      projectLiveRef.href = projectData.liveUrl;
      projectGithubRef.href = projectData.githubUrl;
      projectDescriptionRef.innerText = projectData.description;
      projectBgRef.style.backgroundImage = projectData.backgroundGradient;
    }
  });
});
