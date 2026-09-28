function roundRobin(processes, quantum) {
    const remainingTime = {};

    processes.forEach(process => {
        remainingTime[process.pid] = process.burstTime;
    });

    const firstStartTime = {};
    const completionTimes = {};
    const readyQueue = [];
    const completed = new Set();
    const results = [];
    const gantt = [];

    let currentTime = 0;
    let nextProcessIndex = 0;

    const sortedProcesses = [...processes].sort(
        (a, b) => a.arrivalTime - b.arrivalTime
    );

    while (completed.size < processes.length) {
        while (
            nextProcessIndex < sortedProcesses.length &&
            sortedProcesses[nextProcessIndex].arrivalTime <= currentTime
        ) {
            readyQueue.push(sortedProcesses[nextProcessIndex]);
            nextProcessIndex++;
        }

        if (readyQueue.length === 0) {
            if (nextProcessIndex < sortedProcesses.length) {
                const nextProcess = sortedProcesses[nextProcessIndex];

                gantt.push({
                    pid: "IDLE",
                    start: currentTime,
                    end: nextProcess.arrivalTime
                });

                currentTime = nextProcess.arrivalTime;
                continue;
            }
        }

        const process = readyQueue.shift();

        if (firstStartTime[process.pid] === undefined) {
            firstStartTime[process.pid] = currentTime;
        }

        const executionTime = Math.min(
            quantum,
            remainingTime[process.pid]
        );

        const startTime = currentTime;
        const endTime = currentTime + executionTime;

        gantt.push({
            pid: process.pid,
            start: startTime,
            end: endTime
        });

        currentTime = endTime;
        remainingTime[process.pid] -= executionTime;

        while (
            nextProcessIndex < sortedProcesses.length &&
            sortedProcesses[nextProcessIndex].arrivalTime <= currentTime
        ) {
            readyQueue.push(sortedProcesses[nextProcessIndex]);
            nextProcessIndex++;
        }

        if (remainingTime[process.pid] === 0) {
            completionTimes[process.pid] = currentTime;
            completed.add(process.pid);
        } else {
            readyQueue.push(process);
        }
    }

    processes.forEach(process => {
        const completionTime = completionTimes[process.pid];

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

export { roundRobin };