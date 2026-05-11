document.addEventListener("DOMContentLoaded", function () {

    // KANBAN SCROLL

    const kanban = document.getElementById("kanbanContainer");

    window.moveLeft = function () {
        if (!kanban) return;
        kanban.scrollBy({
            left: -320,
            behavior: "smooth"
        });
    };

    window.moveRight = function () {
        if (!kanban) return;
        kanban.scrollBy({
            left: 320,
            behavior: "smooth"
        });
    };


    // AJAX FILTER SYSTEM

    const form = document.getElementById("filterForm");
    const pipelineData = document.getElementById("pipelineData");
    const clearBtn = document.getElementById("clearBtn");

    if (!form || !pipelineData) return;

    async function loadData() {

        const formData = new FormData(form);
        const params = new URLSearchParams(formData);

        const response = await fetch(`?${params.toString()}`, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        });

        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newData = doc.getElementById("pipelineData");

        if (newData) {
            pipelineData.innerHTML = newData.innerHTML;
        }
    }

    // EVENTS 

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        loadData();
    });

    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            loadData();
        });
    }

    const staffSelect = document.querySelector(".filter-select");
    if (staffSelect) {
        staffSelect.addEventListener("change", function () {
            loadData();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function (e) {
            e.preventDefault();
            form.reset();
            loadData();
        });
    }

});