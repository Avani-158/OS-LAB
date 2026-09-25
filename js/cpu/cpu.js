import {
    generateProcesses,
    saveProcesses,
    loadProcesses,
    clearStoredProcesses
} from "../data.js";

import { fcfs } from "./fcfs.js";
// import { sjf } from "./sjf.js";
// import { srtf } from "./srtf.js";
// import { roundRobin } from "./roundRobin.js";
// import { priority } from "./priority.js";

import { renderGanttChart } from "../visualization/gantt.js";


const processTableBody = document.getElementById("processTableBody");
const manualModeButton = document.getElementById("manualMode");
const generateModeButton = document.getElementById("generateMode");
const algorithmSelect = document.getElementById("algorithmSelect");
const quantumControl = document.getElementById("quantumControl");
const timeQuantum = document.getElementById("timeQuantum");
const runSimulationButton = document.getElementById("runSimulation");

const processCount = document.getElementById("processCount");
const addProcessButton = document.getElementById("addProcess");
const saveProcessesButton = document.getElementById("saveProcesses");
const clearProcessesButton = document.getElementById("clearProcesses");


let currentMode = "manual";
let currentProcesses = [];


initialize();

function initialize() {

    const savedProcesses =
        loadProcesses();

    currentProcesses =
        savedProcesses ||
        generateProcesses(5);

    renderProcessTable();

    setupEvents();

}


function setupEvents() {
    manualModeButton.addEventListener("click", () => switchMode("manual"));
    generateModeButton.addEventListener("click", () => switchMode("generate"));

    algorithmSelect.addEventListener("change", updateQuantumVisibility);
    runSimulationButton.addEventListener("click", runSimulation);

    addProcessButton.addEventListener("click", addProcess);
    saveProcessesButton.addEventListener("click", saveCurrentProcesses);
    clearProcessesButton.addEventListener("click", clearProcesses);

    updateQuantumVisibility();
}


function switchMode(mode) {

    currentMode = mode;

    manualModeButton.classList.toggle("active",mode === "manual");

    generateModeButton.classList.toggle("active", mode === "generate");


    if (mode === "generate") {

       const count =Number(processCount.value);

        currentProcesses =generateProcesses(count);

        renderProcessTable();

    }

}


function renderProcessTable() {

    processTableBody.innerHTML = "";


    currentProcesses.forEach(
        (process, index) => {

            const row =document.createElement("tr");

            row.innerHTML = `
                <td>
                    <input
                        type="text"
                        value="${process.pid}"
                        data-field="pid"
                        data-index="${index}"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        value="${process.arrivalTime}"
                        min="0"
                        data-field="arrivalTime"
                        data-index="${index}"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        value="${process.burstTime}"
                        min="1"
                        data-field="burstTime"
                        data-index="${index}"
                    >
                </td>

                <td>
                    <input
                        type="number"
                        value="${process.priority}"
                        min="1"
                        data-field="priority"
                        data-index="${index}"
                    >
                </td>

                <td>
                    <button
                        class="delete-button"
                        data-delete="${index}"
                        type="button"
                    >
                        ×
                    </button>
                </td>
            `;

            processTableBody.appendChild(row);

        }
    );


    connectInputs();
    connectDeleteButtons();

}

function connectInputs() {

    const inputs =
        processTableBody.querySelectorAll("input");


    inputs.forEach(input => {

        input.addEventListener(
            "input",
            updateProcess
        );

    });

}

function connectDeleteButtons() {
    const buttons = processTableBody.querySelectorAll("[data-delete]");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.delete);

            currentProcesses.splice(index, 1);
            renderProcessTable();
        });
    });
}

function updateProcess(event) {

    const input = event.target;

    const index =
        Number(input.dataset.index);

    const field =
        input.dataset.field;


    currentProcesses[index][field] =
        field === "pid"
            ? input.value
            : Number(input.value);

}

function updateQuantumVisibility() {

    quantumControl.style.display =
        algorithmSelect.value === "rr"
            ? "flex"
            : "none";

}



function addProcess() {

    const nextNumber = currentProcesses.length + 1;

    currentProcesses.push({
        pid: `P${nextNumber}`,
        arrivalTime: 0,
        burstTime: 1,
        priority: 1
    });

    renderProcessTable();

}

function runSimulation() {

    const processes =
        currentProcesses.map(process => ({
            ...process,
            arrivalTime: Number(process.arrivalTime),
            burstTime: Number(process.burstTime),
            priority: Number(process.priority)
        }));


    let result;


    switch (algorithmSelect.value) {

        case "fcfs":
            result = fcfs(processes);
            break;

        case "sjf":
            result = sjf(processes);
            break;

        case "srtf":
            result = srtf(processes);
            break;

        case "rr":

            const quantum =
                Number(timeQuantum.value);

            if (quantum <= 0) {
                alert("Enter a valid time quantum.");
                return;
            }

            result =
                roundRobin(processes, quantum);

            break;

        case "priority":
            result = priority(processes);
            break;

        default:
            alert("Select an algorithm.");
            return;
    }


    displayResult(result);

}

function displayResult(result) {
    const resultsTableBody = document.getElementById("cpuResultsBody");

    resultsTableBody.innerHTML = "";

    result.results.forEach(process => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${process.pid}</td>
            <td>${process.completionTime}</td>
            <td>${process.turnaroundTime}</td>
            <td>${process.waitingTime}</td>
            <td>${process.responseTime}</td>
        `;

        resultsTableBody.appendChild(row);
    });

    const totalWaitingTime = result.results.reduce(
        (total, process) => total + process.waitingTime, 0
    );

    const totalTurnaroundTime = result.results.reduce(
        (total, process) => total + process.turnaroundTime, 0
    );

    const totalResponseTime = result.results.reduce(
        (total, process) => total + process.responseTime, 0
    );

    const averageWaitingTime =
        totalWaitingTime / result.results.length;

    const averageTurnaroundTime =
        totalTurnaroundTime / result.results.length;

    const averageResponseTime =
        totalResponseTime / result.results.length;

    document.getElementById("avgWaitingTime").textContent =
        averageWaitingTime.toFixed(2);

    document.getElementById("avgTurnaroundTime").textContent =
        averageTurnaroundTime.toFixed(2);

    document.getElementById("avgResponseTime").textContent =
        averageResponseTime.toFixed(2);

    document.getElementById("cpuUtilization").textContent =
    Number(result.cpuUtilization).toFixed(2) + "%";

    renderGanttChart(result.gantt);
}

function saveCurrentProcesses() {

    saveProcesses(currentProcesses);

    alert("Processes saved successfully.");

}

function clearProcesses() {

    currentProcesses = [];

    clearStoredProcesses();

    renderProcessTable();

}