function renderGanttChart(gantt) {
    const ganttChart = document.getElementById("ganttChart");

    ganttChart.innerHTML = "";

    if (!gantt || gantt.length === 0) {
        ganttChart.innerHTML = `
            <p class="empty-state">No execution timeline available.</p>
        `;
        return;
    }

    const totalTime = gantt[gantt.length - 1].end;

    const chart = document.createElement("div");
    chart.className = "gantt-chart";

    gantt.forEach(block => {
        const duration = block.end - block.start;
        const width = (duration / totalTime) * 100;

        const item = document.createElement("div");
        item.className = "gantt-item";
        item.style.width = `${width}%`;

        item.innerHTML = `
            <div class="gantt-process">${block.pid}</div>
            <div class="gantt-time">${block.start} - ${block.end}</div>
        `;

        chart.appendChild(item);
    });

    ganttChart.appendChild(chart);

    const timeline = document.createElement("div");
    timeline.className = "gantt-timeline";

    const startTime = document.createElement("span");
    startTime.textContent = gantt[0].start;

    timeline.appendChild(startTime);

    gantt.forEach(block => {
        const endTime = document.createElement("span");
        endTime.textContent = block.end;

        timeline.appendChild(endTime);
    });

    ganttChart.appendChild(timeline);
}

export { renderGanttChart };