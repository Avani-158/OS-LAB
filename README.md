# OS Lab – Operating System Simulator & Visualizer

## 1. Project Description

OS Lab is an interactive web-based Operating System Simulator designed to visualize and demonstrate fundamental OS algorithms. The project provides simulations for CPU Scheduling, Memory Management, and Page Replacement, allowing users to enter their own inputs or generate scenarios dynamically and observe how different algorithms work.

## 2. Project Goals

- To provide an interactive way to understand Operating System algorithms.
- To visualize algorithm execution instead of relying only on theoretical calculations.
- To compare the behavior and results of different OS algorithms.
- To provide a simple and user-friendly interface for experimenting with different inputs.
- To implement the project using HTML, CSS, and Vanilla JavaScript.

## 3. Key Features

- Interactive CPU Scheduling simulation with Gantt chart visualization.
- Memory allocation simulation using First Fit, Best Fit, and Worst Fit.
- Page Replacement simulation using FIFO, LRU, and Optimal.
- Manual input and dynamically generated scenarios.
- Visual representation of algorithm execution and results.
- CPU performance metrics including waiting time, turnaround time, response time, and CPU utilization.
- CRUD operations and LocalStorage for CPU process data.
- Dark and light theme support.

## 4. Project Specifications

### CPU Scheduling
The CPU Scheduling module includes:
- First Come First Serve (FCFS)
- Shortest Job First (SJF)
- Shortest Remaining Time First (SRTF)
- Round Robin
- Priority Scheduling

The module provides process input, generated scenarios, Gantt charts, ready queue visualization, CPU state visualization, and performance metrics such as waiting time, turnaround time, response time, and CPU utilization.

### Memory Management
The Memory Management module includes:
- First Fit
- Best Fit
- Worst Fit

Users can provide memory blocks and process sizes manually or generate a scenario. The system displays the allocation status of each memory block and process.

### Page Replacement
The Page Replacement module includes:
- FIFO
- LRU
- Optimal

The module visualizes page requests, frame states, and page faults during simulation.

### Data Management
The project uses browser `localStorage` for storing CPU process data. It also supports CRUD operations:
- Create – Add a process
- Read – Display saved processes
- Update – Edit process information
- Delete – Remove a process

## 5. Project Design

The project follows a modular client-side architecture using HTML, CSS, and JavaScript.

### User Interface

The application uses a dashboard-style interface with:
- Sidebar navigation
- Simulator pages
- Input forms
- Algorithm selection controls
- Visualization sections
- Results and performance sections
- Dark and light theme support

### Application Flow
```text
User Input / Generated Scenario  
↓  
Algorithm Selection  
↓  
Simulation  
↓  
Algorithm Processing  
↓  
Visualization  
↓  
Results and Performance Metrics
```

### Project Structure
```text
OS-LAB/
│
├── index.html
├── pages/
│   ├── cpu.html
│   ├── memory.html
│   ├── paging.html
│   ├── help.html
│   └── about.html
│
├── css/
│   ├── style.css
│   ├── components.css
│   ├── dashboard.css
│   ├── simulator.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   │
│   ├── cpu/
│   │   ├── cpu.js
│   │   ├── fcfs.js
│   │   ├── sjf.js
│   │   ├── srtf.js
│   │   ├── roundRobin.js
│   │   └── priority.js
│   │
│   ├── memory/
│   │   ├── memory.js
│   │   ├── firstFit.js
│   │   ├── bestFit.js
│   │   └── worstFit.js
│   │
│   ├── paging/
│   │   ├── paging.js
│   │   ├── fifo.js
│   │   ├── lru.js
│   │   └── optimal.js
│   │
│   └── visualization/
│       ├─ gantt.js
│      
├── README.md
├── LICENSE
└── .gitignore
```


## 6. Technology Stack
- HTML5 – Page structure and interface
- CSS3 – Styling, layout, themes, and responsive design
- Vanilla JavaScript – Algorithms, simulation logic, DOM manipulation, and visualization
- LocalStorage – Client-side process data storage

## 7. Expected Outcome
The final system will provide an interactive environment where students can experiment with OS algorithms, observe their execution visually, and understand their results through simulations and performance metrics.


## 8. How to Run

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a web browser.
4. Navigate through the dashboard and select a simulator.
5. Enter values manually or generate a scenario and run the simulation.
