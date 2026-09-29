import { firstFit } from "./firstFit.js";
import { bestFit } from "./bestFit.js";
import { worstFit } from "./worstFit.js";

const memoryBlocks = document.getElementById("memoryBlocks");
const memoryProcesses = document.getElementById("memoryProcesses");
const memoryAlgorithm = document.getElementById("memoryAlgorithm");
const runMemorySimulation = document.getElementById("runMemorySimulation");

const generateMemoryScenario =document.getElementById("generateMemoryScenario");
const clearMemoryInputs =document.getElementById("clearMemoryInputs");

runMemorySimulation.addEventListener("click", runSimulation);

generateMemoryScenario.addEventListener(
    "click",
    generateScenario
);

clearMemoryInputs.addEventListener(
    "click",
    clearInputs
);

function generateScenario() {
    const blockCount = 5;
    const processCount = 4;

    const blocks = [];
    const processes = [];

    for (let i = 0; i < blockCount; i++) {
        blocks.push(randomSize(100, 800));
    }

    for (let i = 0; i < processCount; i++) {
        processes.push(randomSize(100, 700));
    }

    memoryBlocks.value = blocks.join(", ");
    memoryProcesses.value = processes.join(", ");
}

function randomSize(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function clearInputs() {
    memoryBlocks.value = "";
    memoryProcesses.value = "";

    document.getElementById(
        "memoryVisualization"
    ).innerHTML = `
        <p class="empty-state">
            Run a simulation to visualize memory allocation.
        </p>
    `;

    document.getElementById(
        "memoryResults"
    ).innerHTML = `
        <p class="empty-state">
            Results will appear here.
        </p>
    `;
}

function runSimulation() {
    const blocks = parseInput(memoryBlocks.value);
    const processes = parseInput(memoryProcesses.value);

    if (blocks.length === 0 || processes.length === 0) {
        alert("Enter memory blocks and process sizes.");
        return;
    }

    const blockData = blocks.map((size, index) => ({
        id: `B${index + 1}`,
        size
    }));

    const processData = processes.map((size, index) => ({
        pid: `P${index + 1}`,
        size
    }));

    let result;

    switch (memoryAlgorithm.value) {
        case "firstFit":
            result = firstFit(blockData, processData);
            break;

        case "bestFit":
            result = bestFit(blockData, processData);
            break;

        case "worstFit":
            result = worstFit(blockData, processData);
            break;

        default:
            return;
    }

    displayMemory(result);
    displayResults(result);
}

function parseInput(value) {
    return value
        .split(",")
        .map(item => Number(item.trim()))
        .filter(item => !isNaN(item) && item > 0);
}

function displayMemory(result) {
    const visualization =
        document.getElementById("memoryVisualization");

    visualization.innerHTML = "";

    result.blocks.forEach(block => {
        const blockElement = document.createElement("div");

        blockElement.className = "memory-block";

        if (block.free) {
            blockElement.classList.add("free");
            blockElement.innerHTML = `
                <strong>${block.id}</strong>
                <span>${block.size} KB</span>
                <small>Free</small>
            `;
        } else {
            blockElement.classList.add("allocated");
            blockElement.innerHTML = `
                <strong>${block.id}</strong>
                <span>${block.size} KB</span>
                <small>${block.processId}</small>
            `;
        }

        visualization.appendChild(blockElement);
    });
}

function displayResults(result) {
    const resultsContainer =
        document.getElementById("memoryResults");

    resultsContainer.innerHTML = "";

    const table = document.createElement("table");

    table.innerHTML = `
        <thead>
            <tr>
                <th>Process</th>
                <th>Process Size</th>
                <th>Memory Block</th>
                <th>Block Size</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    result.results.forEach(process => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${process.pid}</td>
            <td>${process.size} KB</td>
            <td>${process.blockId || "-"}</td>
            <td>${process.blockSize ? process.blockSize + " KB" : "-"}</td>
            <td>${process.allocated ? "Allocated" : "Not Allocated"}</td>
        `;

        tbody.appendChild(row);
    });

    resultsContainer.appendChild(table);
}