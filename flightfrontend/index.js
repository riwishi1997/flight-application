document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('departure').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        const from = document.getElementById('departureFrom').value;
        const to = document.getElementById('arrival').value;
        let date = document.getElementById('date').value;
        const passengers = document.getElementById('passengers').value;

        // Convert date from YYYY-MM-DD to DDMMYYYY
        const dateParts = date.split('-');
        const formattedDate = dateParts[2] + dateParts[1] + dateParts[0]; // DDMMYYYY format

        // Construct the URL with the formatted date
        const url = `http://localhost:6010/api/flightDetails/getFormDetails?departure_from=${from}&arrival=${to}&date=${formattedDate}&passengers=${passengers}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())  
        .then(data => {
            if (data.length > 0) {
                localStorage.setItem('flightsData', JSON.stringify(data));
                window.location.href = '/resultPage.html';
            } else {
                alert('No flights found for the selected criteria.');
            }
        })
        .catch(err => console.error('Error:', err));  
    });
});