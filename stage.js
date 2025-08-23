// Données des technologies
const techData = {
  docker: {
    title: "Docker",
    icon: "fab fa-docker",
    description:
      "Plateforme de conteneurisation qui permet d'empaqueter des applications avec leurs dépendances dans des conteneurs légers et portables.",
    context:
      "Utilisé pour migrer les microservices IPC hors des machines virtuelles, permettant une meilleure scalabilité et portabilité.",
  },
  kubernetes: {
    title: "Kubernetes",
    icon: "fas fa-dharmachakra",
    description:
      "Système d'orchestration de conteneurs open-source qui automatise le déploiement, la mise à l'échelle et la gestion des applications conteneurisées.",
    context: "Exploré pour l'orchestration des microservices dockerisés et la gestion automatisée des déploiements.",
  },
  gitlab: {
    title: "GitLab CI/CD",
    icon: "fab fa-gitlab",
    description:
      "Plateforme DevOps complète qui intègre la gestion de code source avec des pipelines d'intégration et de déploiement continus.",
    context:
      "Implémenté pour automatiser le processus de build et de déploiement, garantissant une intégration continue robuste.",
  },
  azure: {
    title: "Microsoft Azure",
    icon: "fab fa-microsoft",
    description:
      "Plateforme cloud de Microsoft offrant des services de calcul, stockage, réseau et intelligence artificielle.",
    context:
      "Utilisé comme plateforme de stockage des images satellitaires, nécessitant une intégration avec les microservices Docker.",
  },
  blobfuse: {
    title: "BlobFuse",
    icon: "fas fa-link",
    description:
      "Driver de système de fichiers virtuel pour Azure Blob Storage, permettant d'accéder aux données cloud comme à un système de fichiers local.",
    context:
      "Configuré pour établir la communication entre le stockage Azure et les microservices Docker, facilitant l'accès aux images.",
  },
  sql: {
    title: "SQL",
    icon: "fas fa-database",
    description: "Langage de requête structuré pour gérer et manipuler les bases de données relationnelles.",
    context:
      "Utilisé pour analyser la structure des bases de données, comprendre les relations entre tables et effectuer du debugging.",
  },
  microservices: {
    title: "Architecture Microservices",
    icon: "fas fa-cubes",
    description:
      "Approche architecturale qui structure une application comme un ensemble de services faiblement couplés et déployables indépendamment.",
    context:
      "Architecture utilisée pour la chaîne IPC, permettant une meilleure modularité et facilité de maintenance des services de traitement d'images.",
  },
  imageprocessing: {
    title: "Traitement d'Images",
    icon: "fas fa-image",
    description:
      "Ensemble de techniques pour analyser, modifier et extraire des informations à partir d'images numériques.",
    context:
      "Cœur métier d'EarthDaily Agro : calibration et analyse des images satellitaires pour l'agriculture de précision.",
  },
}

// Gestion des tooltips
let currentTooltip = null

function showTooltip(element, techKey) {
  const tooltip = document.getElementById("tooltip")
  const content = document.getElementById("tooltipContent")
  const tech = techData[techKey]

  if (!tech) return

  // Fermer le tooltip précédent
  if (currentTooltip) {
    currentTooltip.classList.remove("active")
  }

  // Contenu du tooltip
  content.innerHTML = `
        <h4><i class="${tech.icon}"></i>${tech.title}</h4>
        <p>${tech.description}</p>
        <div class="context">
            <strong>Dans mon stage :</strong><br>
            <span>${tech.context}</span>
        </div>
    `

  // Position du tooltip par rapport à l'élément cliqué
  const rect = element.getBoundingClientRect()
  const container = element.closest(".skills-container")
  const containerRect = container.getBoundingClientRect()

  // Calculer la position en tenant compte de l'espace disponible
  let leftPos = rect.left - containerRect.left
  const topPos = rect.bottom - containerRect.top + 10

  // Ajuster si le tooltip dépasse à droite
  if (leftPos + 320 > container.offsetWidth) {
    leftPos = container.offsetWidth - 320 - 10
  }

  // Ajuster si le tooltip dépasse à gauche
  if (leftPos < 0) {
    leftPos = 10
  }

  tooltip.style.left = leftPos + "px"
  tooltip.style.top = topPos + "px"

  // Afficher le tooltip
  tooltip.classList.add("show")
  element.classList.add("active")
  currentTooltip = element
}

function closeTooltip() {
  const tooltip = document.getElementById("tooltip")
  tooltip.classList.remove("show")

  if (currentTooltip) {
    currentTooltip.classList.remove("active")
    currentTooltip = null
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const skillTags = document.querySelectorAll(".skill-tag[data-tech]")

  skillTags.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      e.stopPropagation()
      const techKey = this.getAttribute("data-tech")

      if (currentTooltip === this) {
        closeTooltip()
      } else {
        showTooltip(this, techKey)
      }
    })
  })

  // Fermer le tooltip en cliquant ailleurs
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".tooltip") && !e.target.closest(".skill-tag")) {
      closeTooltip()
    }
  })

  // Fermer le tooltip avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTooltip()
    }
  })
})

// Animation au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Effet de parallaxe léger
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})
