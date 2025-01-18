let transactions = [];

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });
    document.getElementById(tabId).style.display = 'block';
    document.getElementById(tabId).classList.add('active');
    if (tabId === 'spreadsheet') {
        updateSpreadsheet();
    }
}

function addTransaction() {
    const who = document.getElementById('who').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const comment = document.getElementById('comment').value;

    const transaction = { who, date, category, amount, comment };
    transactions.push(transaction);
}

function updateSpreadsheet() {
	const tbody = document.getElementById('spreadsheet-body');
    tbody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.who}</td>
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.comment}</td>
        `;
        tbody.appendChild(row);
    });
}

function exportToCSV() {
    let csv = 'Wie?,Datum,Soort uitgave,Bedrag,Opmerking\n';
    transactions.forEach(transaction => {
        csv += `${transaction.who},${transaction.date},${transaction.category},${transaction.amount},${transaction.comment}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'expenses.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('export-btn').addEventListener('click', exportToCSV);