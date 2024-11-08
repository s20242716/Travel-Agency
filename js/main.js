$(document).ready(function(){

  $('.menu').click(function(){
     
       $('.navbar').toggle();
       $('.menu .fa-bars').toggleClass('fa-times');
       $('section').toggleClass('nav-toggle')

  });
  $(window).on('load scroll',function(){
    $('.navbar').hide();
       $('.menu .fa-bars').removeClass('fa-times');
       $('section').removeClass('nav-toggle')


  });


});

// Destination database with base prices and peak seasons
const destinations = {
    paris: {
        name: 'Paris, France',
        basePrice: 150,
        peakSeasons: ['06', '07', '08', '12'] // Jun, Jul, Aug, Dec
    },
    tokyo: {
        name: 'Tokyo, Japan',
        basePrice: 200,
        peakSeasons: ['03', '04', '10', '11'] // Mar, Apr, Oct, Nov
    },
    bali: {
        name: 'Bali, Indonesia',
        basePrice: 100,
        peakSeasons: ['07', '08', '12', '01'] // Jul, Aug, Dec, Jan
    },
    nyc: {
        name: 'New York City, USA',
        basePrice: 180,
        peakSeasons: ['06', '07', '12', '01'] // Jun, Jul, Dec, Jan
    },
    dubai: {
        name: 'Dubai, UAE',
        basePrice: 170,
        peakSeasons: ['11', '12', '01', '02'] // Nov, Dec, Jan, Feb
    },
    rome: {
        name: 'Rome, Italy',
        basePrice: 140,
        peakSeasons: ['05', '06', '07', '08'] // May, Jun, Jul, Aug
    },
    sydney: {
        name: 'Sydney, Australia',
        basePrice: 190,
        peakSeasons: ['12', '01', '02', '03'] // Dec, Jan, Feb, Mar
    },
    london: {
        name: 'London, UK',
        basePrice: 160,
        peakSeasons: ['06', '07', '08', '12'] // Jun, Jul, Aug, Dec
    },
    barcelona: {
        name: 'Barcelona, Spain',
        basePrice: 130,
        peakSeasons: ['06', '07', '08', '09'] // Jun, Jul, Aug, Sep
    },
    cairo: {
        name: 'Cairo, Egypt',
        basePrice: 110,
        peakSeasons: ['10', '11', '12', '01'] // Oct, Nov, Dec, Jan
    },
    singapore: {
        name: 'Singapore',
        basePrice: 160,
        peakSeasons: ['06', '07', '12', '01'] // Jun, Jul, Dec, Jan
    },
    bangkok: {
        name: 'Bangkok, Thailand',
        basePrice: 120,
        peakSeasons: ['11', '12', '01', '02'] // Nov, Dec, Jan, Feb
    },
    vancouver: {
        name: 'Vancouver, Canada',
        basePrice: 150,
        peakSeasons: ['06', '07', '08', '12'] // Jun, Jul, Aug, Dec
    },
    capetown: {
        name: 'Cape Town, South Africa',
        basePrice: 140,
        peakSeasons: ['12', '01', '02', '03'] // Dec, Jan, Feb, Mar
    },
    riodejaneiro: {
        name: 'Rio de Janeiro, Brazil',
        basePrice: 160,
        peakSeasons: ['12', '01', '02', '03'] // Dec, Jan, Feb, Mar
    },
    venice: {
        name: 'Venice, Italy',
        basePrice: 150,
        peakSeasons: ['05', '06', '07', '08'] // May, Jun, Jul, Aug
    },
    amsterdam: {
        name: 'Amsterdam, Netherlands',
        basePrice: 140,
        peakSeasons: ['06', '07', '08', '12'] // Jun, Jul, Aug, Dec
    },
    prague: {
        name: 'Prague, Czech Republic',
        basePrice: 120,
        peakSeasons: ['06', '07', '08', '12'] // Jun, Jul, Aug, Dec
    },
    maldives: {
        name: 'Maldives',
        basePrice: 200,
        peakSeasons: ['12', '01', '02', '03'] // Dec, Jan, Feb, Mar
    },
    santorini: {
        name: 'Santorini, Greece',
        basePrice: 170,
        peakSeasons: ['06', '07', '08', '09'] // Jun, Jul, Aug, Sep
    }
};

// Function to check if date is in peak season
function isInPeakSeason(date, destinationKey) {
    const month = date.getMonth() + 1;
    const monthStr = month.toString().padStart(2, '0');
    return destinations[destinationKey].peakSeasons.includes(monthStr);
}

// Function to calculate trip cost
function calculateCost(event) {
    event.preventDefault();
    
    // Get form values
    const destinationKey = document.getElementById("destination").value;
    const guests = parseInt(document.getElementById("guests").value);
    const arrivalDate = new Date(document.getElementById("arrival").value);
    const leavingDate = new Date(document.getElementById("leaving").value);
    const travelClass = document.getElementById("travelClass").value;

    // Validate dates
    const days = (leavingDate - arrivalDate) / (1000 * 60 * 60 * 24);
    if (days <= 0) {
        alert("Please ensure the leaving date is after the arrival date.");
        return;
    }

    // Get destination data
    const destination = destinations[destinationKey];
    const basePrice = destination.basePrice;

    // Calculate peak season surcharge
    const isPeakArrival = isInPeakSeason(arrivalDate, destinationKey);
    const isPeakDeparture = isInPeakSeason(leavingDate, destinationKey);
    const peakSeasonMultiplier = isPeakArrival || isPeakDeparture ? 1.3 : 1;

    // Travel class multiplier
    const classMultiplier = {
        "economy": 1,
        "business": 1.5,
        "firstClass": 2
    };

    // Calculate total cost
    const dailyCost = basePrice * peakSeasonMultiplier * classMultiplier[travelClass];
    const totalCost = dailyCost * days * guests;

    // Display detailed result in modal
    const modalContent = `
        <h3>Trip Details</h3>
        <p><strong>Destination:</strong> ${destination.name}</p>
        <p><strong>Number of Guests:</strong> ${guests}</p>
        <p><strong>Duration:</strong> ${days} days</p>
        <p><strong>Travel Class:</strong> ${travelClass}</p>
        <p><strong>Base Price Per Day:</strong> $${basePrice}</p>
        ${isPeakArrival || isPeakDeparture ? '<p><strong>Peak Season Surcharge:</strong> 30%</p>' : ''}
        <p><strong>Total Cost:</strong> $${totalCost.toFixed(2)}</p>
    `;

    document.getElementById("modalText").innerHTML = modalContent;
    document.getElementById("costModal").style.display = "flex";
}

// Function to close the modal
function closeModal() {
    document.getElementById("costModal").style.display = "none";
}

// Close modal if user clicks outside
window.onclick = function(event) {
    const modal = document.getElementById("costModal");
    if (event.target === modal) {
        closeModal();
    }
};

// Set minimum date as today for arrival and leaving dates
const today = new Date().toISOString().split('T')[0];
document.getElementById('arrival').min = today;
document.getElementById('leaving').min = today;

// Update leaving date min when arrival date changes
document.getElementById('arrival').addEventListener('change', function() {
    document.getElementById('leaving').min = this.value;
});

function validateForm(event) {
        event.preventDefault(); // Prevent form submission until validation

        // Get the form inputs
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Regular expression for email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // Phone number validation (simple check for numbers)
        const phonePattern = /^[0-9]{10}$/;

        let valid = true;

        // Validate First Name
        if (fname === "") {
            alert("First name is required.");
            valid = false;
        }

        // Validate Last Name
        if (lname === "") {
            alert("Last name is required.");
            valid = false;
        }

        // Validate Email
        if (email === "" || !emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            valid = false;
        }

        // Validate Phone Number
        if (phone === "" || !phonePattern.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            valid = false;
        }

        // Validate Message
        if (message === "") {
            alert("Message cannot be empty.");
            valid = false;
        }

        // If all fields are valid, submit the form
        if (valid) {
            alert("Form submitted successfully.");
            // Here you can add code to actually submit the form data via AJAX or any other method
            // For now, we just reset the form after a successful submission.
            document.getElementById('contactForm').reset();
        }
    }
    
