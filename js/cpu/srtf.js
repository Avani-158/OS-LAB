function srtf(processes) {
    const remainingTime = {};
    const firstStartTime = {};

    processes.forEach(process => {
        remainingTime[process.pid] = process.burstTime;
    });

    const completed = new Set();
    const results = [];
    const gantt = [];

    let currentTime = 0;

    while (completed.size < processes.length) {
        const availableProcesses = processes.filter(process => {
            return (
                process.arrivalTime <= currentTime &&
                !completed.has(process.pid) &&
                remainingTime[process.pid] > 0
            );
        });

        if (availableProcesses.length === 0) {
            const nextProcess = processes
                .filter(process => !completed.has(process.pid))
                .sort((a, b) => a.arrivalTime - b.arrivalTime)[0];

            gantt.push({
                pid: "IDLE",
                start: currentTime,
                end: nextProcess.arrivalTime
            });

            currentTime = nextProcess.arrivalTime;
            continue;
        }

        availableProcesses.sort((a, b) => {
            if (remainingTime[a.pid] !== remainingTime[b.pid]) {
                return remainingTime[a.pid] - remainingTime[b.pid];
            }

            return a.arrivalTime - b.arrivalTime;
        });

        const process = availableProcesses[0];

        const startTime = currentTime;

        if (firstStartTime[process.pid] === undefined) {
            firstStartTime[process.pid] = startTime;
        }

        currentTime++;
        remainingTime[process.pid]--;

        const lastBlock = gantt[gantt.length - 1];

        if (
            lastBlock &&
            lastBlock.pid === process.pid &&
            lastBlock.end === startTime
        ) {
            lastBlock.end = currentTime;
        } else {
            gantt.push({
                pid: process.pid,
                start: startTime,
                end: currentTime
            });
        }

        if (remainingTime[process.pid] === 0) {
            const completionTime = currentTime;

            const turnaroundTime =
                completionTime - process.arrivalTime;

            const waitingTime =
                turnaroundTime - process.burstTime;

            const responseTime =
                firstStartTime[process.pid] -
                process.arrivalTime;

            results.push({
                ...process,
                completionTime,
                turnaroundTime,
                waitingTime,
                responseTime
            });

            completed.add(process.pid);
        }
    }

    results.sort((a, b) => {
        return a.arrivalTime - b.arrivalTime;
    });

    const busyTime = gantt.reduce((total, block) => {
        if (block.pid === "IDLE") {
            return total;
        }

        return total + (block.end - block.start);
    }, 0);

    const cpuUtilization =
        (busyTime / currentTime) * 100;

    return {
        results,
        gantt,
        cpuUtilization
    };
}

export { srtf };