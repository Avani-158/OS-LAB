// data generation 

function randomInt(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}


function generateProcesses(count = 5) {

    const processes = [];

    for (let i = 1; i <= count; i++) {

        const process = {
            pid: `P${i}`,
            arrivalTime: randomInt(0, 10),
            burstTime: randomInt(1, 10),
            priority: randomInt(1, 5)
        };

        processes.push(process);
    }

    return processes;
}


export {
    randomInt,
    generateProcesses
};