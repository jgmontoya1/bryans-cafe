document.addEventListener('DOMContentLoaded', () => {
    loadBranches();
    loadMenu();
});

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
});

function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex'
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none'
}

function loadMenu() {
    fetch('../xml/menu/menu.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            const meals = xmlDoc.getElementsByTagName("meal");
            const mealList = document.querySelector('.meal-list');

            if(mealList!= null){
                for (let meal of meals) {
                    const name = meal.getElementsByTagName("name")[0].textContent;
                    const price = meal.getElementsByTagName("price")[0].textContent;
                    const description = meal.getElementsByTagName("description")[0].textContent;
                    const image = meal.getElementsByTagName("image")[0].textContent;
    
                    const mealDiv = document.createElement('div');
                    mealDiv.className = 'meal';
                    mealDiv.innerHTML = `
                        <strong>${name}</strong> $${price}<br>
                        <p>${description}</p>
                        <img src="${image}" alt="${name}" style="max-width: 100%; height: auto;">
                    `;
                    mealList.appendChild(mealDiv);
                }
            }

            const beverages = xmlDoc.getElementsByTagName("beverage");
            const beverageList = document.querySelector('.beverage-list');

            if(beverageList != null){
                
                for (let beverage of beverages) {
                    const name = beverage.getElementsByTagName("name")[0].textContent;
                    const size = beverage.getElementsByTagName("size")[0].textContent;
                    const price = beverage.getElementsByTagName("price")[0].textContent;
    
                    const beverageDiv = document.createElement('div');
                    beverageDiv.className = 'beverage';
                    if(size!=""){
                        beverageDiv.innerHTML = `
                        <strong>${name} - ${size}</strong> $${price}
                    `;
                    }else{
                        beverageDiv.innerHTML = `
                        <strong>${name}</strong> $${price}
                    `;
                    }
                    beverageList.appendChild(beverageDiv);
                }
            }
        })
        .catch(error => console.error('Error loading menu:', error));
}

function loadBranches(){
    fetch('../xml/branches/branches.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const branches = xmlDoc.getElementsByTagName('branch');
            let branchHtml = '';

            for (let branch of branches) {
                const address = branch.getElementsByTagName('address')[0].textContent;
                const contact = branch.getElementsByTagName('contact')[0].textContent;
                const openingHours = branch.getElementsByTagName('openingHours')[0].textContent;
                const mapLink = branch.getElementsByTagName('mapLink')[0].textContent;

                branchHtml += `
                <div class="branch">
                    <h4>${address}</h4>
                    <p>Phone: ${contact}</p>
                    <p>${openingHours}</p>
                    <a
                      href="${mapLink}"
                      target="_blank"
                      >View on Google Maps</a
                    >
                </div>
                `;

                
            }

            const branch = document.getElementById('branch');

            if(branch != null){
                branch.innerHTML = branchHtml;
            }

            
        })
        .catch(error => console.error('Error fetching the XML file:', error));
}

