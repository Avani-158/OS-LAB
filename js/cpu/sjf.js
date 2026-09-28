function sjf(processes) {
    const remainingProcesses = [...processes];
    const results = [];
    const gantt = [];

    let currentTime = 0;

    while (remainingProcesses.length > 0) {
        const availableProcesses = remainingProcesses.filter(
            process => process.arrivalTime <= currentTime
        );

        if (availableProcesses.length === 0) {
            const nextProcess = remainingProcesses.reduce(
                (earliest, process) =>
                    process.arrivalTime < earliest.arrivalTime
                        ? process
                        : earliest
            );

            gantt.push({
                pid: "IDLE",
                start: currentTime,
                end: nextProcess.arrivalTime
            });

            currentTime = nextProcess.arrivalTime;

            continue;
        }

        availableProcesses.sort((a, b) => {
            if (a.burstTime !== b.burstTime) {
                return a.burstTime - b.burstTime;
            }

            return a.arrivalTime - b.arrivalTime;
        });

        const process = availableProcesses[0];

        const startTime = currentTime;
        const completionTime = startTime + process.burstTime;

        const turnaroundTime =
            completionTime - process.arrivalTime;

        const waitingTime =
            turnaroundTime - process.burstTime;

        const responseTime =
            startTime - process.arrivalTime;

        gantt.push({
            pid: process.pid,
            start: startTime,
            end: completionTime
        });

        results.push({
            ...process,
            completionTime,
            turnaroundTime,
            waitingTime,
            responseTime
        });

        currentTime = completionTime;

        const index = remainingProcesses.indexOf(process);
        remainingProcesses.splice(index, 1);
    }

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

export { sjf };