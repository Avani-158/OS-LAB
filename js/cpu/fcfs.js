function fcfs(processes) {
    const sortedProcesses = [...processes].sort(
        (a, b) => a.arrivalTime - b.arrivalTime
    );

    let currentTime = 0;
    const results = [];
    const gantt = [];

    for (const process of sortedProcesses) {
        if (currentTime < process.arrivalTime) {
            gantt.push({
                pid: "IDLE",
                start: currentTime,
                end: process.arrivalTime
            });

            currentTime = process.arrivalTime;
        }

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
    }
    
    const busyTime = gantt.reduce((total, block) => {
        if (block.pid === "IDLE") {
            return total;
        }

        return total + (block.end - block.start);
    }, 0);

    const totalTime = currentTime;

    const cpuUtilization = (busyTime / totalTime) * 100;

    return {
        results,
        gantt,
        cpuUtilization
    };
}

export { fcfs };