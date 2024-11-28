const flightsData = JSON.parse(localStorage.getItem("flightsData")); // Retrieve the stored JSON data

if (flightsData && flightsData.length > 0) {
  const tableBody = document.getElementById("flightTableBody");
  flightsData.forEach((flight) => {
    const row = `
                    <tr>
                        <td>${flight.flight_name}</td>
                        <td>${flight.departure_from}</td>
                        <td>${flight.duration}</td>
                        <td>${flight.arrival}</td>
                        <td>${flight.price}</td>
                        <td>${flight.date}</td>

                    </tr>
                `;
    tableBody.innerHTML += row;
  });
} else {
  alert("No flight data available.");
}
