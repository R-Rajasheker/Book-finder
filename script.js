
        document.getElementById("searchBtn").addEventListener("click", async function() {
            const query = document.getElementById("search").value;
            if (!query) return;

            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "<p class='text-gray-500 text-center'>Loading...</p>";

            try {
                const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
                const data = await response.json();
                displayResults(data.docs);
            } catch (error) {
                resultsDiv.innerHTML = "<p class='text-red-500 text-center'>Failed to fetch data.</p>";
            }
        });

        function displayResults(books) {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            books.slice(0, 5).forEach(book => {
                resultsDiv.innerHTML += `
                    <div class="p-4 border rounded-lg bg-gray-50 flex flex-col md:flex-row items-center gap-4">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="Book Cover" class="w-24 h-32 object-cover rounded-lg">
                        <div>
                            <h2 class="text-lg font-semibold">${book.title}</h2>
                            <p class="text-sm text-gray-600">Author: ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                            <button class="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg" onclick="viewDetails('${book.key}')">View Details</button>
                        </div>
                    </div>
                `;
            });
        }

        function viewDetails(bookKey) {
            alert("Detailed view not implemented yet: " + bookKey);
        }
    