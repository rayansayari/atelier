document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("addTravelOfferForm");

    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let x = validateForm();

        if (!x) {
            alert("Formulaire validé !");
            
        }
    });

    
    document.getElementById("title").addEventListener("keyup", function() {
        const title = this.value.trim();
        const y = displayRealTimeFeedback(title.length >= 3, "title");
        if (y) {
            y.textContent = title.length >= 3 ? "Correct" : "Le titre doit contenir au moins 3 caractères.";
        }
    });

    document.getElementById("destination").addEventListener("keyup", function() {
        const destination = this.value.trim();
        const destinationRegex = /^[A-Za-z\s]+$/;
        const y = displayRealTimeFeedback(destination.length >= 3 && destinationRegex.test(destination), "destination");
        if (y) {
            y.textContent = (destination.length >= 3 && destinationRegex.test(destination)) ? "Correct" : "La destination doit contenir au moins 3 caractères et ne peut contenir que des lettres et des espaces.";
        }
    });

    function validateForm() {
        
        const title = document.getElementById("title").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const departureDate = new Date(document.getElementById("departure_date").value);
        const returnDate = new Date(document.getElementById("return_date").value);
        const price = parseFloat(document.getElementById("price").value);

    
        const y = document.querySelectorAll(".error-message");
        y.forEach(error => error.remove());

        let x = false;

        
        if (title.length < 3) {
            displayError("Le titre doit contenir au moins 3 caractères.", "title");
            x = true;
        }

        
        const destinationRegex = /^[A-Za-z\s]+$/;
        if (destination.length < 3 || !destinationRegex.test(destination)) {
            displayError("La destination doit contenir au moins 3 caractères et ne peut contenir que des lettres et des espaces.", "destination");
            x = true;
        }

        
        if (isNaN(departureDate.getTime()) || isNaN(returnDate.getTime())) {
            displayError("Veuillez entrer des dates valides.", "departure_date");
            x = true;
        } else if (returnDate <= departureDate) {
            displayError("La date de retour doit être ultérieure à la date de départ.", "return_date");
            x = true;
        }

        
        if (isNaN(price) || price <= 0) {
            displayError("Le prix doit être un nombre positif.", "price");
            x = true;
        }

        return x;
    }

    function displayRealTimeFeedback(isValid, fieldId) {
        const field = document.getElementById(fieldId);
        const existingError = field.parentNode.querySelector(".error-message");
        
        if (existingError) {
            existingError.remove();
        }

        const feedback = document.createElement("div");
        feedback.className = "error-message";
        feedback.style.color = isValid ? "green" : "red";
        field.parentNode.insertBefore(feedback, field.nextSibling);
        
        return feedback;
    }

    function displayError(message, fieldId) {
        const field = document.getElementById(fieldId);
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.style.color = "red";
        errorMessage.textContent = message;
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
});
