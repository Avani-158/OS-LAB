import { fifo } from "./fifo.js";
import { lru } from "./lru.js";
import { optimal } from "./optimal.js";

const referenceString = document.getElementById("referenceString");
const frameCount = document.getElementById("frameCount");
const pagingAlgorithm = document.getElementById("pagingAlgorithm");
const runPagingSimulation = document.getElementById("runPagingSimulation");


const generatePagingScenario = document.getElementById("generatePagingScenario");

const clearPagingInputs = document.getElementById("clearPagingInputs");

generatePagingScenario.addEventListener("click",generateScenario);

clearPagingInputs.addEventListener("click",clearInputs);

runPagingSimulation.addEventListener("click", runSimulation);

function runSimulation() {
    const pages = parseInput(referenceString.value);
    const frames = Number(frameCount.value);

    if (pages.length === 0 || frames <= 0) {
        alert("Enter a valid reference string and frame count.");
        return;
    }

    let result;

    switch (pagingAlgorithm.value) {
        case "fifo":
            result = fifo(pages, frames);
            break;

        case "lru":
            result = lru(pages, frames);
            break;

        case "optimal":
            result = optimal(pages, frames);
            break;

        default:
            return;
    }

    displayMetrics(result, pages.length);
    displayVisualization(result);
    displayResults(result);
}

function parseInput(value) {
    return value
        .split(",")
        .map(item => Number(item.trim()))
        .filter(item => !isNaN(item));
}

function displayMetrics(result, totalPages) {
    const faultRatio =
        (result.pageFaults / totalPages) * 100;

    const hitRatio =
        (result.pageHits / totalPages) * 100;

    document.getElementById("pageFaults").textContent =
        result.pageFaults;

    document.getElementById("pageHits").textContent =
        result.pageHits;

    document.getElementById("faultRatio").textContent =
        faultRatio.toFixed(2) + "%";

    document.getElementById("hitRatio").textContent =
        hitRatio.toFixed(2) + "%";
}


function displayVisualization(result) {
    const visualization =
        document.getElementById("pagingVisualization");

    visualization.innerHTML = "";

    result.steps.forEach(step => {
        const stepElement = document.createElement("div");
        stepElement.className = "paging-step";

        const pageElement = document.createElement("div");
        pageElement.className = "paging-page";
        pageElement.textContent = `Page ${step.page}`;

        const framesElement = document.createElement("div");
        framesElement.className = "paging-frames";

        step.frames.forEach(frame => {
            const frameElement = document.createElement("div");
            frameElement.className = "frame filled";
            frameElement.textContent = frame;
            framesElement.appendChild(frameElement);
        });

        const frameCountValue =
            Number(frameCount.value);

        for (let i = step.frames.length; i < frameCountValue; i++) {
            const frameElement = document.createElement("div");
            frameElement.className = "frame empty";
            frameElement.textContent = "-";
            framesElement.appendChild(frameElement);
        }

        const statusElement = document.createElement("div");
        statusElement.className = "paging-status";

        if (step.hit) {
            statusElement.classList.add("hit");
            statusElement.textContent = "HIT";
        } else {
            statusElement.classList.add("fault");
            statusElement.textContent = "FAULT";
        }

        stepElement.appendChild(pageElement);
        stepElement.appendChild(framesElement);
        stepElement.appendChild(statusElement);

        visualization.appendChild(stepElement);
    });
}

function displayResults(result) {
    const resultsContainer =
        document.getElementById("pagingResults");

    resultsContainer.innerHTML = "";

    const table = document.createElement("table");

    table.innerHTML = `
        <thead>
            <tr>
                <th>Page</th>
                <th>Frames</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    result.steps.forEach(step => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${step.page}</td>
            <td>${step.frames.join(" | ")}</td>
            <td>${step.hit ? "Hit" : "Fault"}</td>
        `;

        tbody.appendChild(row);
    });

    resultsContainer.appendChild(table);
}


function generateScenario() {
    const pageCount = randomNumber(8, 12);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(randomNumber(0, 7));
    }

    referenceString.value = pages.join(", ");
    frameCount.value = randomNumber(2, 4);
}

function randomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function clearInputs() {
    referenceString.value = "";
    frameCount.value = 3;

    document.getElementById(
        "pagingVisualization"
    ).innerHTML = `
        <p class="empty-state">
            Run a simulation to visualize page replacement.
        </p>
    `;

    document.getElementById("pageFaults").textContent = "—";
    document.getElementById("pageHits").textContent = "—";
    document.getElementById("faultRatio").textContent = "—";
    document.getElementById("hitRatio").textContent = "—";

    document.getElementById("pagingResults").innerHTML = "";
}