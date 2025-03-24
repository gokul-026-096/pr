document.addEventListener("DOMContentLoaded", function () {
    // Ensure the landing page is the first page to open
    if (!sessionStorage.getItem("visited")) {
        sessionStorage.setItem("visited", "true");
        window.location.href = "landing.html";
    }

    // Landing Page Redirections
    let userLoginBtn = document.getElementById("userLoginBtn");
    if (userLoginBtn) {
        userLoginBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    let adminLoginBtn = document.getElementById("adminLoginBtn");
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener("click", function () {
            window.location.href = "admin.html";
        });
    }

    // Redirect to Login Page when clicking "Login" button on Reset Page
    let loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    // Handle Login Form Submission
    let loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let regNo = document.getElementById("regNo").value.trim();
            let password = document.getElementById("password").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[regNo] && users[regNo] === password) {
                sessionStorage.setItem("regNo", regNo);
                window.location.href = "booking.html";
            } else {
                document.getElementById("loginMessage").innerText = "Invalid credentials!";
            }
        });
    }

    // Booking Page Redirection to Thank You Page
    let bookNowBtn = document.getElementById("bookNow");
    if (bookNowBtn) {
        bookNowBtn.addEventListener("click", function () {
            let meal = document.getElementById("meal").value;
            let quantity = document.getElementById("quantity").value;
            let diningTime = document.getElementById("diningTime").value;

            if (!diningTime) {
                alert("Please select a dining time.");
                return;
            }

            let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
            bookings.push({ meal, quantity, diningTime, status: "Confirmed" });
            localStorage.setItem("bookings", JSON.stringify(bookings));

            window.location.href = "thankyou.html"; // Redirect to thank you page
        });
    }
});