function createProcessTable() {
    // Get the number of processes from the user input
    const numProcesses = document.getElementById('num_processes').value;

    // Create the table element
    const table = document.createElement('table');
    table.setAttribute('id', 'process_table');

    // Create the table header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Process</th><th>Burst Time</th>';
    table.appendChild(headerRow);

    // Create rows for process input
    for (let i = 0; i < numProcesses; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>P${i}</td>
            <td><input type="number" id="burst_time_${i}" min="1" ></td>
        `;
        table.appendChild(row);
    }


    // Add the table to the process_table div
    const processTableDiv = document.getElementById('process_table');
    processTableDiv.innerHTML = ''; // Clear existing table content
    processTableDiv.appendChild(table);
}
  
  function calculateSJF() {
    // Get the number of processes from the user input
    const numProcesses = document.getElementById('num_processes').value;
  
    // Get burst times from the table
    const burstTimes = [];
    for (let i = 0; i < numProcesses; i++) {
      const burstTimeInput = document.getElementById(`burst_time_${i}`);
      const burstTime = burstTimeInput.value ? parseInt(burstTimeInput.value) : 1;
      burstTimes.push(burstTime);
    }
  
    // Validate input (all burst times must be positive)
    let allPositive = true;
    for (const burstTime of burstTimes) {
      if (burstTime <= 0) {
        allPositive = false;
        break;
      }
    }
  
    if (!allPositive) {
      document.getElementById('result').innerHTML = 'Error: All burst times must be positive.';
      return;
    }
  
    // Create process data with process ID and burst time
    const processData = [];
    for (let i = 0; i < numProcesses; i++) {
      processData.push({
        id: i,
        burstTime: burstTimes[i],
      });
    }
  
    // Sort processes by burst time in ascending order (SJF)
    processData.sort((a, b) => a.burstTime - b.burstTime);
  
    // Initialize variables for scheduling
    let completedProcesses = [];
    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
  
    // Simulate SJF scheduling
    for (const process of processData) {
      const waitingTime = currentTime;
      const completionTime = currentTime + process.burstTime;
      const turnaroundTime = completionTime;
  
      completedProcesses.push({
        id: process.id,
        burstTime: process.burstTime,
        waitingTime: waitingTime,
        turnaroundTime: turnaroundTime,
        completionTime: completionTime,
      });
  
      currentTime = completionTime;
      totalWaitingTime += waitingTime;
      totalTurnaroundTime += turnaroundTime;
    }

   
    
    function createResultsTable(processData) {
        const resultsTable = document.createElement('table');
        resultsTable.setAttribute('id', 'results_table');
   
     // Create table header row
       const headerRow = document.createElement('tr');
       headerRow.innerHTML = '<th>Process</th><th>Burst Time</th><th>Waiting Time</th><th>Completion Time</th><th>Turnaround Time</th>';
       resultsTable.appendChild(headerRow);
   
     // Create rows for each process
     for (const process of processData) {
        const processRow = document.createElement('tr');
        processRow.innerHTML = `
            <td>P${process.id}</td>
            <td>${process.burstTime}</td>
            <td>${process.waitingTime}</td>
            <td>${process.completionTime}</td>  
            <td>${process.turnaroundTime}</td>
        `;
        resultsTable.appendChild(processRow);
      }
   
     return resultsTable;
   }
    // Calculate average waiting time and turnaround time
    const averageWaitingTime = totalWaitingTime / numProcesses;
    const averageTurnaroundTime = totalTurnaroundTime / numProcesses;


    //return results table
    const resultsTable = createResultsTable(completedProcesses);
    // Display results
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        ${resultsTable.outerHTML}
      <p><b>Average Waiting Time:</b> ${averageWaitingTime.toFixed(2)}%</p>
      <p><b>Average Turnaround Time:</b> ${averageTurnaroundTime.toFixed(2)}%</p>
    `;
  }