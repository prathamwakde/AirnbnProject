document.addEventListener("DOMContentLoaded", function () {
    const menuScroller = document.getElementById("menuScroller");
    const slideLeft = document.getElementById("slideLeft");
    const slideRight = document.getElementById("slideRight");
    const toggleSwitch = document.getElementById("toggleSwitch");

    if (slideLeft && menuScroller) {
        slideLeft.addEventListener("click", function () {
            menuScroller.scrollBy({ left: -200, behavior: "smooth" });
        });
    }

    if (slideRight && menuScroller) {
        slideRight.addEventListener("click", function () {
            menuScroller.scrollBy({ left: 200, behavior: "smooth" });
        });
    }

    if (toggleSwitch) {
        const taxInfoElements = document.querySelectorAll(".tax-info");
        toggleSwitch.addEventListener("change", function () {
            taxInfoElements.forEach(element => {
                element.style.display = toggleSwitch.checked ? "inline" : "none";
            });
            console.log(toggleSwitch.checked ? "Displaying total before taxes" : "Hiding total before taxes");
        });
    }

    const updateForm = document.getElementById('update-form');
    if (updateForm) {
        updateForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch(`/hotels/update/${document.getElementById('update-id').value}`, {
                method: 'POST',
                body: formData,
            })
                .then(() => {
                    alert('Hotel updated successfully!');
                    window.location.reload();
                })
                .catch(error => console.error('Error updating hotel:', error));
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const listingsContainer = document.getElementById("listings-container");

  // ✅ Stop execution if elements are missing
  if (!searchInput || !listingsContainer) {
      return; // Prevents further errors
  }

  searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();
      const hotels = listingsContainer.getElementsByClassName("card");

      Array.from(hotels).forEach((hotel) => {
          const title = hotel.querySelector("h2")?.innerText.toLowerCase() || "";
          const location = hotel.querySelector("p:nth-of-type(2)")?.innerText.toLowerCase() || "";

          hotel.style.display = title.includes(query) || location.includes(query) ? "block" : "none";
      });
  });
});

  // Function to display hotels
  function displayHotels(hotels) {
    listingsContainer.innerHTML = ""; // Clear previous listings

    if (hotels.length === 0) {
        listingsContainer.innerHTML = "<p>No hotels found for this category.</p>";
    } else {
        hotels.forEach((hotel) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-category", hotel.category);
            card.onclick = () => (window.location.href = `/hotels/${hotel._id}`);

            card.innerHTML = `
                <img src="${hotel.image}" alt="${hotel.title}" />
                <h2>${hotel.title}</h2>
                <p>${hotel.description.substring(0, 100)}...</p>
                <p>${hotel.location}, ${hotel.country}</p>
                <p>₹${hotel.price}/night</p>
            `;

            listingsContainer.appendChild(card);
        });
    }
}

// Fetch and display all hotels on page load
fetchHotels();

// Event listener for category clicks
categoryLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const selectedCategory = this.getAttribute("data-category");

        // Filter hotels based on the selected category
        if (selectedCategory === "ALL") {
            displayHotels(allHotels); // Show all hotels
        } else {
            const filteredHotels = allHotels.filter(hotel => hotel.category === selectedCategory);
            displayHotels(filteredHotels);
        }
    });
});
