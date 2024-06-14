// Function to dynamically generate input fields based on industry selection
function generateInputFields(industry) {
    const inputFields = document.getElementById("inputFields");
    inputFields.innerHTML = ""; // Clear previous fields
    
    switch (industry) {
      case "carbonTax":
        inputFields.innerHTML = `
          <label for="transactionVolume">Transaction Volume (KSH):</label>
          <input type="number" id="transactionVolume" placeholder="Enter transaction volume">
        `;
        break;
      case "mobilityTransport":
        inputFields.innerHTML = `
          <label for="vehicleType">Vehicle Type:</label>
          <select id="vehicleType">
            <option value="taxi">Taxi Hailing App</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
          </select>
          <label for="distance">Distance (km):</label>
          <input type="number" id="distance" placeholder="Enter distance">
        `;
        break;
      case "financial":
        inputFields.innerHTML = `
          <label for="transactionAmount">Transaction Amount (KSH):</label>
          <input type="number" id="transactionAmount" placeholder="Enter transaction amount">
        `;
        break;
      case "ecoTourism":
        inputFields.innerHTML = `
          <label for="travelDistance">Travel Distance (km):</label>
          <input type="number" id="travelDistance" placeholder="Enter travel distance">
          <label for="stayType">Type of Stay:</label>
          <select id="stayType">
            <option value="hotel">Hotel</option>
            <option value="bnb">BNB</option>
            <option value="camp">Camp</option>
            <option value="lodge">Lodge</option>
          </select>
          <label for="numberOfPeople">Number of People:</label>
          <input type="number" id="numberOfPeople" placeholder="Enter number of people">
        `;
        break;
      case "ecommerce":
        inputFields.innerHTML = `
          <label for="transactionAmount">Transaction Amount (KSH):</label>
          <input type="number" id="transactionAmount" placeholder="Enter transaction amount">
          <label for="deliveryDistance">Delivery Distance (km):</label>
          <input type="number" id="deliveryDistance" placeholder="Enter delivery distance">
        `;
        break;
      case "airlinesBooking":
        inputFields.innerHTML = `
          <label for="departureAirport">Departure Airport:</label>
          <select id="departureAirport"></select>
          <label for="destinationAirport">Destination Airport:</label>
          <select id="destinationAirport"></select>
        `;
        loadAirports();
        break;
      default:
        break;
    }
  }
  
  // Load airports into the select elements
  function loadAirports() {
    const airports = [
      { name: "Jomo Kenyatta International Airport", code: "NBO", lat: -1.319167, lon: 36.9275 },
      { name: "Moi International Airport", code: "MBA", lat: -4.034833, lon: 39.59425 },
      { name: "Wilson Airport", code: "WIL", lat: -1.321667, lon: 36.814722 },
      { name: "Eldoret International Airport", code: "EDL", lat: 0.404458, lon: 35.238917 },
      { name: "Kisumu International Airport", code: "KIS", lat: -0.086139, lon: 34.728892 },
      { name: "Malindi Airport", code: "MYD", lat: -3.229311, lon: 40.101667 },
      { name: "Ukunda Airport", code: "UKA", lat: -4.293333, lon: 39.571389 },
      { name: "Manda Airport", code: "LAU", lat: -2.252417, lon: 40.913097 },
      { name: "Lokichogio Airport", code: "LKG", lat: 4.204117, lon: 34.348175 },
      { name: "Wajir Airport", code: "WJR", lat: 1.733239, lon: 40.091602 }
      // Add more airports as needed
    ];
  
    const departureSelect = document.getElementById("departureAirport");
    const destinationSelect = document.getElementById("destinationAirport");
  
    airports.forEach(airport => {
      const option = document.createElement("option");
      option.value = JSON.stringify({ lat: airport.lat, lon: airport.lon });
      option.text = `${airport.name} (${airport.code})`;
      departureSelect.add(option);
      destinationSelect.add(option.cloneNode(true));
    });
  }
  
  // Function to calculate carbon offsets based on selected industry
  function calculateOffsets() {
    const industry = document.getElementById("industry").value;
    let totalCost = 0, emissions = 0, offsetCost = 0, grandTotal = 0;
  
    switch (industry) {
      case "carbonTax":
        const transactionVolume = parseFloat(document.getElementById("transactionVolume").value);
        totalCost = transactionVolume;
        offsetCost = transactionVolume * 0.005;
        grandTotal = totalCost + offsetCost;
        displayResults(totalCost, 0, offsetCost, grandTotal);
        break;
      case "mobilityTransport":
        const vehicleType = document.getElementById("vehicleType").value;
        const distance = parseFloat(document.getElementById("distance").value);
        totalCost = distance * (vehicleType === "taxi" ? 15 : vehicleType === "bus" ? 5 : 10);
        emissions = distance * (vehicleType === "taxi" ? 130 : vehicleType === "bus" ? 80 : 90);
        offsetCost = totalCost * 0.005;
        grandTotal = totalCost + offsetCost;
        displayResults(totalCost, emissions, offsetCost, grandTotal);
        break;
      case "financial":
        const transactionAmountFinancial = parseFloat(document.getElementById("transactionAmount").value);
        totalCost = transactionAmountFinancial;
        offsetCost = transactionAmountFinancial * 0.005;
        grandTotal = transactionAmountFinancial + offsetCost;
        displayResults(transactionAmountFinancial, 0, offsetCost, grandTotal);
        break;
      case "ecoTourism":
        const travelDistance = parseFloat(document.getElementById("travelDistance").value);
        const stayType = document.getElementById("stayType").value;
        const numberOfPeople = parseFloat(document.getElementById("numberOfPeople").value);
        totalCost = travelDistance * 10 * numberOfPeople; // Simplified cost calculation
        offsetCost = totalCost * 0.005;
        emissions = travelDistance * 115 * numberOfPeople;
        grandTotal = totalCost + offsetCost;
        displayResults(totalCost, emissions, offsetCost, grandTotal);
        break;
      case "ecommerce":
        const transactionAmountEcommerce = parseFloat(document.getElementById("transactionAmount").value);
        const deliveryDistance = parseFloat(document.getElementById("deliveryDistance").value);
        totalCost = transactionAmountEcommerce + (deliveryDistance * 5); // Simplified cost calculation
        offsetCost = totalCost * 0.005;
        emissions = deliveryDistance * 115;
        grandTotal = totalCost + offsetCost;
        displayResults(totalCost, emissions, offsetCost, grandTotal);
        break;
      case "airlinesBooking":
        const departureAirport = JSON.parse(document.getElementById("departureAirport").value);
        const destinationAirport = JSON.parse(document.getElementById("destinationAirport").value);
        const distanceAir = calculateDistance(departureAirport.lat, departureAirport.lon, destinationAirport.lat, destinationAirport.lon);
        totalCost = distanceAir * 50;
        offsetCost = totalCost * 0.005;
        emissions = distanceAir * 115;
        grandTotal = totalCost + offsetCost;
        displayResults(totalCost, emissions, offsetCost, grandTotal);
        break;
      default:
        break;
    }
  }
  
  // Function to display results
  function displayResults(totalCost, emissions, offsetCost, grandTotal) {
    const results = document.getElementById("results");
    results.innerHTML = `
      <p>Total Cost: KSH ${totalCost.toFixed(2)}</p>
      <p>Emissions: ${emissions.toFixed(2)}g CO2</p>
      <p>Offset Cost: KSH ${offsetCost.toFixed(2)}</p>
      <p>Grand Total: KSH ${grandTotal.toFixed(2)}</p>
    `;
  }
  
  // Function to calculate distance between two coordinates using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }
  
  // Function to convert degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  // Event listener to generate input fields on industry selection change
  document.getElementById("industry").addEventListener("change", function() {
    generateInputFields(this.value);
  });
  
  // Initialize default industry input fields
  document.addEventListener("DOMContentLoaded", function() {
    generateInputFields("open");
  });
  