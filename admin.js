document.addEventListener("DOMContentLoaded", function () {
    const adminLoginForm = document.getElementById("adminLoginForm");
    const adminDashboard = document.getElementById("adminDashboard");
    const bookingTable = document.getElementById("bookingTable");
    const bookingChartCanvas = document.getElementById("bookingChart");
    const onlineBookingTable = document.getElementById("onlineBookingTable");

    const adminCredentials = { "admin": "admin123" };

    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let adminId = document.getElementById("adminId").value;
            let adminPassword = document.getElementById("adminPassword").value;

            if (adminCredentials[adminId] && adminCredentials[adminId] === adminPassword) {
                sessionStorage.setItem("adminLoggedIn", "true");
                adminLoginForm.style.display = "none";
                adminDashboard.style.display = "block";
                loadBookingData();
            } else {
                document.getElementById("adminMessage").innerText = "Invalid Admin Credentials!";
            }
        });
    }

    function loadBookingData() {
        let bookedMeals = JSON.parse(localStorage.getItem("bookedMeals")) || {};
        let onlineBookings = JSON.parse(localStorage.getItem("onlineBookings")) || [];

        let mealCount = { "Breakfast": 0, "Lunch": 0, "Dinner": 0 };
        let tableContent = "";
        let onlineTableContent = "";

        // Process offline bookings
        for (let date in bookedMeals) {
            let regNo = Object.keys(bookedMeals[date])[0]; 
            let meal = bookedMeals[date][regNo];

            mealCount[meal]++;

            tableContent += `<tr><td>${regNo}</td><td>${meal}</td><td>${date}</td></tr>`;
        }

        // Process online bookings
        onlineBookings.forEach(booking => {
            mealCount[booking.meal]++;
            onlineTableContent += `
                <tr>
                    <td>${booking.name}</td>
                    <td>${booking.meal}</td>
                    <td>${booking.transactionId}</td>
                    <td>₹${booking.amount}</td>
                </tr>`;
        });

        // Update tables
        bookingTable.innerHTML = tableContent;
        onlineBookingTable.innerHTML = onlineTableContent;

        // Update Chart
        new Chart(bookingChartCanvas, {
            type: "bar",
            data: {
                labels: ["Breakfast", "Lunch", "Dinner"],
                datasets: [{
                    label: "Number of Bookings",
                    data: [mealCount.Breakfast, mealCount.Lunch, mealCount.Dinner],
                    backgroundColor: ["#ffcc00", "#ff6666", "#66b3ff"],
                    borderWidth: 1
                }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });
    }
});