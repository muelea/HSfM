const results = [
  [
    "Basketball",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/basketball.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=14.0,18.0,6.0",
      // "&initialCameraLookAt=1.0,10.0,0.0",
      "&initialCameraLookAt=0.0,5.0,0.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/basketball_thumbnail.png",
  ],
  [
    "Bike",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/bike.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=0.0,0.0,1.0",
      // "&initialCameraLookAt=1.0,10.0,0.0",
      "&initialCameraLookAt=0.0,5.0,0.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/bike_thumbnail.png",
  ],
  [
    "Cooking",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/cooking.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      // "&initialCameraPosition=12.0,24.0,5.0",
      "&initialCameraPosition=0.0,0.0,1.0",
      // "&initialCameraLookAt=1.0,10.0,0.0",
      "&initialCameraLookAt=0.0,5.0,0.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/cooking_thumbnail.png",
  ],
  [
    "Covid",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/covid.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=-0.7,-0.7,0.6",
      // "&initialCameraLookAt=1.0,10.0,0.0",
      "&initialCameraLookAt=-0.4,0.5,-0.4",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/covid_thumbnail.png",
  ],
  [
    "Dance",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/dance.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=-0.6,0.0,2.0",
      "&initialCameraLookAt=0.4,4.0,0.7",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/dance_thumbnail.png",
  ],
  [
    "Basketball_2",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/basketball_2.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=10.0,6.0,6.0",
      "&initialCameraLookAt=-0.2,5.0,-1.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/basketball_2_thumbnail.png",
  ],
  [
    "Badminton",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/badminton.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=-14.0,12.0,5.0",
      "&initialCameraLookAt=1.0,10.0,0.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/badminton_thumbnail.png",
  ],
  [
    "Tagging",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/tagging.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=6.0,12.0,5.0",
      "&initialCameraLookAt=1.0,10.0,0.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/tagging_thumbnail.png",
  ],
  [
    "Lego",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/lego.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=-3.0,6.0,1.0",
      "&initialCameraLookAt=1.0,1.0,0.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/lego_thumbnail.png",
  ],
  [
    "Tennis",
    [
      "/hsfm/viser-embed/",
      "?playbackPath=/hsfm/splash-results/tennis.viser",
      // "&synchronizedVideoOverlay=/hsfm/splash-results/feb28_coffeemachine.mp4",
      // "&synchronizedVideoTimeOffset=-0.05",
      "&initialCameraPosition=16.0,8.0,5.0",
      "&initialCameraLookAt=1.0,15.0,0.0",
      "&baseSpeed=1.5",
      "&darkMode",
      "&logCamera",
    ],
    "/hsfm/splash-results/tennis_thumbnail.png",
  ],
];

function initializeResultSelector(resultsElement) {
  const selectorElement = resultsElement.querySelector(".results-selector");
  const resultsThumbnails = selectorElement.querySelector(
    ".results-thumbnails",
  );
  const prevButton = selectorElement.querySelector(".results-prev");
  const nextButton = selectorElement.querySelector(".results-next");
  let currentIndex = 0;

  function createIframe(src) {
    const iframe = document.createElement("iframe");
    console.log("Creating iframe with src", src);
    iframe.src = src;
    return iframe;
  }

  function showIframe(src) {
    const wrapper = resultsElement.querySelector(".iframe-wrapper");
    wrapper.innerHTML = "";
    const iframe = createIframe(Array.isArray(src) ? src.join("") : src);
    wrapper.appendChild(iframe);
  }

  function updateSelection(index) {
    currentIndex = index;
    resultsThumbnails
      .querySelectorAll("a")
      .forEach((a, i) =>
        a.setAttribute("data-selected", i === index ? "true" : "false"),
      );
    showIframe(results[index][1]);
    const selectedThumbnail = resultsThumbnails.children[index];

    // Scroll the selected thumbnail into view
    const thumbnailsContainer = resultsThumbnails;
    const scrollLeft =
      selectedThumbnail.offsetLeft -
      (thumbnailsContainer.clientWidth - selectedThumbnail.clientWidth) / 2;
    thumbnailsContainer.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    // Update URL with the selected result
    const resultName = results[index][0].toLowerCase().replace(/\s+/g, "-");
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}?result=${resultName}`;
    history.pushState(null, "", newUrl);
  }

  results.forEach(([label, src, thumbnail], index) => {
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("data-selected", index === 0 ? "true" : "false");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      updateSelection(index);
    });

    const img = document.createElement("img");
    img.src = thumbnail;
    img.alt =
      "Thumbnail that can be clicked to show a result of our method: " + label;
    img.title = label;

    link.appendChild(img);
    resultsThumbnails.appendChild(link);
  });

  prevButton.addEventListener("click", () => {
    updateSelection((currentIndex - 1 + results.length) % results.length);
  });

  nextButton.addEventListener("click", () => {
    updateSelection((currentIndex + 1) % results.length);
  });

  // Check URL for initial result selection
  const urlParams = new URLSearchParams(window.location.search);
  const initialResult = urlParams.get("result");
  if (initialResult) {
    const index = results.findIndex(
      (result) =>
        result[0].toLowerCase().replace(/\s+/g, "-") === initialResult,
    );
    if (index !== -1) {
      updateSelection(index);
    } else {
      showIframe(results[0][1]);
    }
  } else {
    showIframe(results[0][1]);
  }
}

// Initialize all result on the page
document.querySelectorAll(".results").forEach(initializeResultSelector);
