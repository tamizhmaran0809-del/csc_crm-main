// kanban carosel
function moveLeft(){

    const kanban =
        document.querySelector('.kanban-container');

    kanban.scrollBy({
        left: -320,
        behavior: 'smooth'
    });
}

function moveRight(){

    const kanban =
        document.querySelector('.kanban-container');

    kanban.scrollBy({
        left: 320,
        behavior: 'smooth'
    });
}


// Reload

const form = document.getElementById("filterForm");
const clearBtn = document.getElementById("clearBtn");
const pipelineData = document.getElementById("pipelineData");

// LOAD DATA
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

    pipelineData.innerHTML = newData.innerHTML;
}

// SUBMIT
form.addEventListener("submit", function(e){
    e.preventDefault();
    loadData();
});

// SEARCH LIVE
document.querySelector(".search-input")
.addEventListener("input", function(){
    loadData();
});

// STAFF FILTER
document.querySelector(".filter-select")
.addEventListener("change", function(){
    loadData();
});

// CLEAR BUTTON
clearBtn.addEventListener("click", function(){

    form.reset();   // reset UI
    loadData();     // reload full data
});