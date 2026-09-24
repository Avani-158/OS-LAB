const STORAGE_KEY = "osLabProcesses";

function randomInt(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


function generateProcesses(count = 5) {

    const processes = [];

    for (let i = 1; i <= count; i++) {

        processes.push({
            pid: `P${i}`,
            arrivalTime: randomInt(0, 10),
            burstTime: randomInt(1, 10),
            priority: randomInt(1, 5)
        });

    }

    return processes;

}


function saveProcesses(processes) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(processes)
    );

}


function loadProcesses() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    return saved
        ? JSON.parse(saved)
        : null;

}


function clearStoredProcesses() {

    localStorage.removeItem(STORAGE_KEY);

}

export {
    randomInt,
    generateProcesses,
    saveProcesses,
    loadProcesses,
    clearStoredProcesses
};