document.addEventListener("DOMContentLoaded", function() {
    
    function updateDate() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString(undefined, {
            weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById("Finance-date").textContent = formattedDate;
    }
    updateDate();

    let balance = 0;
    const balanceAmount = document.getElementById("balance-amount");
    const transactionHistory = document.getElementById("transaction-history");

    document.getElementById("add").addEventListener("click", function() {
        const incomeInput = document.getElementById("income");
        const expenseInput = document.getElementById("expense");
        const description = document.getElementById("description").value;
        const amountInput = document.getElementById("amount");

        const income = parseFloat(incomeInput.value) || 0;
        const expense = parseFloat(expenseInput.value) || 0;
        const amount = parseFloat(amountInput.value);

        if (!amount || amount <= 0 || description.trim() === "") {
            alert("Please enter a valid description and amount.");
            return;
        }

        let transactionType = "";
        let transactionColor = "";

        if (income > 0) {
            balance += amount;
            transactionType = "income";
            transactionColor = "income";
        } else if (expense > 0) {
            balance -= amount;
            transactionType = "expense";
            transactionColor = "expense";
        } else {
            alert("Please enter an income or expense value.");
            return;
        }

        balanceAmount.textContent = balance.toFixed(2);

       
        const transactionItem = document.createElement("div");
        transactionItem.classList.add("transaction", transactionColor);
        transactionItem.innerHTML = `
            <span>${description}</span>
            <span>${transactionType === "income" ? "+" : "-"}$${amount.toFixed(2)}</span>
        `;
        transactionHistory.appendChild(transactionItem);

       
        incomeInput.value = "";
        expenseInput.value = "";
        description.value = "";
        amountInput.value = "";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let balance = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    const balanceAmount = document.getElementById("balance-amount");
    const incomeAmount = document.getElementById("total-income");
    const expenseAmount = document.getElementById("total-expense");
    const historyContainer = document.getElementById("transaction-list");
    const addTransactionButton = document.getElementById("add");
    const searchInput = document.getElementById("search");

   

    addTransactionButton.addEventListener("click", function() {
        const description = document.getElementById("description").value.trim();
        const amountInput = document.getElementById("amount");
        let amount = parseFloat(amountInput.value);

        if (!description || isNaN(amount) || amount === 0) {
            alert("Please enter a valid description and amount.");
            return;
        }

        let transactionType = amount > 0 ? "income" : "expense";
        let transactionColor = transactionType === "income" ? "income" : "expense";

        if (amount > 0) {
            totalIncome += amount;
            balance += amount;
        } else {
            totalExpense += Math.abs(amount);
            balance += amount;
        }

        balanceAmount.textContent = `$${balance.toFixed(2)}`;
        incomeAmount.textContent = `$${totalIncome.toFixed(2)}`;
        expenseAmount.textContent = `$${totalExpense.toFixed(2)}`;

        // This is going to get the current date and time for the transaction entry
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();

        // Right here I am going to Create the transaction entry
        const transactionItem = document.createElement("div");
        transactionItem.classList.add("transactionstor", transactionColor);
        transactionItem.innerHTML = `
            <div>
                <span class="transaction-desc"><strong>${description}</strong></span>
                <p class="transaction-time">${formattedDate} | ${formattedTime}</p>
            </div>
            <span>${transactionType === "income" ? "+" : "-"}$${Math.abs(amount).toFixed(2)}</span>
        `;

        transactionItem.dataset.description = description.toLowerCase(); // Store lowercase description for filtering
        historyContainer.appendChild(transactionItem);

        // Show motivational message
        showMotivationalMessage();

        // Clear input fields
        document.getElementById("description").value = "";
        amountInput.value = "";
    });

    // Search Transactions
    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();
        const transactions = document.querySelectorAll(".transactionstor");

        transactions.forEach(transaction => {
            const description = transaction.dataset.description || "";
            transaction.style.display = description.includes(searchTerm) ? "flex" : "none";
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("history-menu-btn");
    const menuDropdown = document.getElementById("history-menu");

    menuBtn.addEventListener("click", function(event) {
        
        menuDropdown.style.display = menuDropdown.style.display === "block" ? "none" : "block";
        event.stopPropagation(); 
    });

   
    document.addEventListener("click", function(event) {
        if (!menuDropdown.contains(event.target) && !menuBtn.contains(event.target)) {
            menuDropdown.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const menuDropdown = document.querySelector(".menu-dropdown");

 
    const iconBackgrounds = {
        "fa-repeat": "#123524", 
        "fa-robot": "black", 
        "fa-money-check-dollar": "#704264", 
        "fa-triangle-exclamation": "#261FB3", 
        "fa-envelopes-bulk": "#3D0301", 
        "fa-chart-simple": "#001F3F",
        "fa-piggy-bank": "#7E6363",
    };

  
    const icons = document.querySelectorAll(".fa-solid");

   
    icons.forEach(icon => {
        icon.addEventListener("mouseenter", function () {
            // Get the class of the hovered icon
            const iconClass = [...this.classList].find(cls => iconBackgrounds[cls]);
            if (iconClass) {
                menuDropdown.style.background = iconBackgrounds[iconClass];
            }
        });

        icon.addEventListener("mouseleave", function () {
            // Reset back to default color
            menuDropdown.style.background = "#2C2222";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu-dropdown ul li");
    const historyContainer = document.getElementById("historycontainer");

    
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "overlay";
    overlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <h2>AutoLoops</h2>
            <p>Bills on beat. No surprises. No stress. AutoLoops tracks your recurring payments and reminds you before they hit—so you stay in control and keep your flow smooth.</p>

            <!-- Company Input -->
            <div class="group">
                <input type="text" id="company" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="company">Company</label>
            </div>

            <!-- Price Input -->
            <div class="group">
                <input type="number" id="price" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="price">Price</label>
            </div>

            <!-- Date Input -->
            <div class="group">
                <input type="date" id="date" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="date"></label>
            </div>

            <!-- Billing Cycle Input -->
            <div class="group">
                <input type="number" id="billingCycle" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="billingCycle">Billing Cycle (Days)</label>
            </div>

            <!-- Submit Button -->
            <button id="submitAutoLoop">Submit</button>

            <!-- Forward Button -->
            <button id="goToEntries" class="forward-btn">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;
    historyContainer.appendChild(overlay);

    const closeOverlay = overlay.querySelector("#closeOverlay");

    // Create AutoLoops Data Display Overlay (Second Overlay)
    const dataOverlay = document.createElement("div");
    dataOverlay.id = "dataOverlay";
    dataOverlay.className = "overlay";
    dataOverlay.innerHTML = `
    <div class="overlay-content">
        <i id="closeDataOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
        <h2>Saved AutoLoops</h2>
        <p>Your scheduled AutoLoops are displayed here.</p>
        
        <div id="autoLoopDataList"></div> <!-- Holds user-submitted data -->

        <!-- Back Button to Navigate to Input Overlay -->
        <button id="backToOverlay" class="back-btn">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
    </div>
`;

historyContainer.appendChild(dataOverlay);


const backToOverlayBtn = dataOverlay.querySelector("#backToOverlay");
backToOverlayBtn.addEventListener("click", function () {
    dataOverlay.classList.remove("active"); 
    overlay.classList.add("active");        
});


    const closeDataOverlay = dataOverlay.querySelector("#closeDataOverlay");
    const autoLoopDataList = dataOverlay.querySelector("#autoLoopDataList");


    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const action = this.getAttribute("data-action");

            if (action === "autoLoops") {
                overlay.classList.add("active");
            }
        });
    });

    
    closeOverlay.addEventListener("click", function () {
        overlay.classList.remove("active");
    });

    
    closeDataOverlay.addEventListener("click", function () {
        dataOverlay.classList.remove("active");
    });

    



    
    
    const submitButton = overlay.querySelector("#submitAutoLoop");
    submitButton.addEventListener("click", function () {
        const company = document.getElementById("company").value;
        const price = document.getElementById("price").value;
        const date = document.getElementById("date").value;
        const billingCycle = document.getElementById("billingCycle").value;

        if (company && price && date && billingCycle) {
            // Create a new entry for the data overlay
            const newEntry = document.createElement("div");
            newEntry.classList.add("autoLoop-entry");

            newEntry.innerHTML = `
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Price:</strong> $${price}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Billing Cycle:</strong> Every ${billingCycle} days</p>
            <p><strong>Time Left:</strong> <span class="countdown" data-date="${date}"></span></p>
            
            
        `;
        
        

          
            autoLoopDataList.appendChild(newEntry);

          
            startCountdown(newEntry.querySelector(".countdown"), date);

           
            document.getElementById("company").value = "";
            document.getElementById("price").value = "";
            document.getElementById("date").value = "";
            document.getElementById("billingCycle").value = "";

            
            overlay.classList.remove("active");
            dataOverlay.classList.add("active");
        } else {
            alert("Please fill in all fields.");
        }
    });

 
    function startCountdown(element, targetDate) {
        function updateTimer() {
            const now = new Date();
            const eventDate = new Date(targetDate);
            const timeDiff = eventDate - now;

            if (timeDiff <= 0) {
                element.innerHTML = "Due Today!";
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            setTimeout(updateTimer, 1000);
        }
        updateTimer();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const goToEntriesBtn = document.getElementById("goToEntries");
    const overlay = document.getElementById("overlay");
    const dataOverlay = document.getElementById("dataOverlay");

    if (goToEntriesBtn) {
        goToEntriesBtn.addEventListener("click", function () {
            overlay.classList.remove("active");  
            dataOverlay.classList.add("active"); 
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const historyContainer = document.getElementById("historycontainer");

    function createFareFloatOverlay() {
        
        if (document.getElementById("fareFloatOverlay")) return;

      
        const overlay = document.createElement("div");
        overlay.id = "fareFloatOverlay";
        overlay.className = "overlay";
        overlay.innerHTML = `
            <div class="overlay-content">
                <i id="closeFareFloatOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
                <h2>Fare Float</h2>
                <img src="/images/Share_the_ride-removebg-preview (4).png">

                <div class="group">
                    <input type="password" id="farePin" maxlength="4" pattern="[0-9]{4}" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label for="farePin">Enter 4-Digit PIN</label>
                </div>

                <button id="submitFareFloat">Login</button>
            </div>
        `;

      
        historyContainer.appendChild(overlay);

        
        overlay.classList.add("active");

        document.getElementById("closeFareFloatOverlay").addEventListener("click", function () {
            overlay.remove();
        });

        document.getElementById("submitFareFloat").addEventListener("click", function () {
            const pin = document.getElementById("farePin").value;

            if (pin.length === 4 && /^\d{4}$/.test(pin)) {
                overlay.remove(); 
                createFareFloatDashboardOverlay(); 
            } else {
                alert("Please enter a valid 4-digit PIN.");
            }
        });
    }

    function createFareFloatDashboardOverlay() {
        if (document.getElementById("fareFloatDashboardOverlay")) return;
    
        const dashboardOverlay = document.createElement("div");
        dashboardOverlay.id = "fareFloatDashboardOverlay";
        dashboardOverlay.className = "overlay";
        dashboardOverlay.innerHTML = `
            <div class="overlay-content">
            <i id="closeFareFloatDashboard" class="fa-solid fa-circle-xmark close-icon"></i>
            <h2>Fare Float Dashboard</h2>
            <p>Welcome to your Fare Float dashboard. You can now send, receive and settle funds.</p>

        <ul class="fare-menu-list">
            <li id="logoutFareFloat"><i class="fa-solid fa-handshake"></i> Start Split</li>
            <li id="viewCurrentSplit"><i class="fa-solid fa-chart-line"></i> Active Splits</li>
            <li id="viewpaySplit"><i class="fa-solid fa-money-check-dollar"></i> Pay Split</li>
            <li id="viewPastSplits"><i class="fa-solid fa-clock-rotate-left"></i> Past Splits</li>
            <li id="viewGroups"><i class="fa-solid fa-users"></i> Groups</li>
        </ul>

</div>

        `;
    
    






        historyContainer.appendChild(dashboardOverlay);
        dashboardOverlay.classList.add("active");
    
        document.getElementById("closeFareFloatDashboard").addEventListener("click", function () {
            dashboardOverlay.remove();
        });
    
        
        document.getElementById("logoutFareFloat").addEventListener("click", function () {
            dashboardOverlay.remove();
            createFareFloatSplitOverlay(); 
        });
    }
    


    document.addEventListener("click", function (event) {
        const clicked = event.target.closest("#viewCurrentSplit");
        if (clicked) {
           
            const dashboardOverlay = document.getElementById("fareFloatDashboardOverlay");
            if (dashboardOverlay) dashboardOverlay.remove();
    
          
            if (document.getElementById("fareFloatActiveSplitsOverlay")) return;
    
            
            const activeSplitsOverlay = document.createElement("div");
            activeSplitsOverlay.id = "fareFloatActiveSplitsOverlay";
            activeSplitsOverlay.className = "overlay";
    
          
            let splitsHTML = fareSplits.map(split => {
                const percentage = Math.min((split.contributed / split.spliWithAmount) * 100, 100).toFixed(0);
                return `
                    <div class="user-tab">
                        <i class="fa-solid fa-circle-user profile-icon"></i>
                        <div class="user-info">
                            <span class="user-name">${split.spliWith}</span>
                            <span class="user-group">${split.splitUnder}</span>
                            <div class="stat-bar">
                                <div class="stat-bar-fill" style="width: ${percentage}%"></div>
                            </div>
                            <small>${percentage}% complete - $${split.contributed.toFixed(2)} contributed of $${split.spliWithAmount}</small>
                        </div>
                    </div>
                `;
            }).join("");
    
            activeSplitsOverlay.innerHTML = `
                <div class="overlay-content">
                    <i id="closeActiveSplitsOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
                    <h2>Active Splits</h2>
                    <p>Here are your current fare splits:</p>
                    ${splitsHTML || "<p>No active splits available.</p>"}
                </div>
            `;
    
            document.getElementById("historycontainer").appendChild(activeSplitsOverlay);
            activeSplitsOverlay.classList.add("active");
    
            
            document.getElementById("closeActiveSplitsOverlay").addEventListener("click", function () {
                activeSplitsOverlay.remove();
            });
        }
    });
    
    


    
    document.querySelectorAll(".menu-dropdown ul li").forEach(item => {
        item.addEventListener("click", function () {
            const action = this.getAttribute("data-action");

            if (action === "fare-float") {
                createFareFloatOverlay();
            }
        });
    });
});

document.addEventListener("click", function (event) {
    if (event.target.id === "submitFareFloat") {
        const amount = document.getElementById("fareAmount").value;
        const recipient = document.getElementById("recipient").value;
        const purpose = document.getElementById("purpose").value;
        const pin = document.getElementById("farePin").value;

        if (amount && recipient && purpose && pin.length === 4 && /^\d{4}$/.test(pin)) {
            alert(`Payment of $${amount} sent to ${recipient} for: ${purpose} (PIN: ****)`);
            document.getElementById("fareFloatOverlay").remove();
        } else {
            alert("Please fill in all fields and enter a valid 4-digit PIN.");
        }
    }
});



let fareSplits = [];

// =======================
// Create Fare Float Split Overlay
// =======================
function createFareFloatSplitOverlay() {
    if (document.getElementById("fareFloatSplitOverlay")) return;

    const splitOverlay = document.createElement("div");
    splitOverlay.id = "fareFloatSplitOverlay";
    splitOverlay.className = "overlay";
    splitOverlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeFareFloatSplitOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <img class="splitlogo" src="/images/Untitled (1).png">
            <p>Enter who you're splitting with and how much:</p>

            <div class="group">
                <input type="text" id="splitUnder" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="splitUnder">Group Name</label>
            </div>

            <div class="group">
                <input type="text" id="spliWith" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="spliWith">Member Name</label>
            </div>

            <div class="group">
                <input type="number" id="spliWithAmount" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="spliWithAmount">Member Contribution ($)</label>
            </div>

            <div class="group">
                <input type="number" id="splitAmount" required />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label for="splitAmount">Group Goal</label>
            </div>

            <button id="submitFareSplit">Send Split</button>
        </div>
    `;

    document.getElementById("historycontainer").appendChild(splitOverlay);
    splitOverlay.classList.add("active");

    
    document.getElementById("closeFareFloatSplitOverlay").addEventListener("click", function () {
        splitOverlay.remove();
    });

    document.getElementById("submitFareSplit").addEventListener("click", function () {
        const groupName = document.getElementById("splitUnder").value;
        const memberName = document.getElementById("spliWith").value;
        const splitWithAmount = parseFloat(document.getElementById("spliWithAmount").value);
        const splitAmountGoal = parseFloat(document.getElementById("splitAmount").value);
    
        if (groupName && memberName && splitWithAmount && splitAmountGoal) {
    
            fareSplits.push({
                splitUnder: groupName,
                spliWith: memberName,
                spliWithAmount: splitWithAmount,
                splitAmountGoal: splitAmountGoal,
                contributed: 0, 
            });
    
            showCustomAlert(`Split created for ${memberName} with a goal of $${splitAmountGoal.toFixed(2)}`);
            document.getElementById("fareFloatSplitOverlay").remove();
        } else {
            showCustomAlert("Please fill in all fields.");
        }
    });
    

   
    function showCustomAlert(message) {
        const alertBox = document.createElement("div");
        alertBox.className = "custom-alert";
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 4000);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        const clicked = event.target.closest("#viewpaySplit");
        if (clicked) {
            const dashboardOverlay = document.getElementById("fareFloatDashboardOverlay");
            if (dashboardOverlay) dashboardOverlay.remove();

           
            if (document.getElementById("fareFloatPaySplitOverlay")) return;

            let groupNames = ["Family Fund", "Friends Pool", "Office Split"];
            let memberNames = ["Dee", "John", "Sarah", "Mike"];

            const paySplitOverlay = document.createElement("div");
            paySplitOverlay.id = "fareFloatPaySplitOverlay";
            paySplitOverlay.className = "overlay";

            paySplitOverlay.innerHTML = `
                <div class="overlay-content">
                    <i id="closeFareFloatPaySplit" class="fa-solid fa-circle-xmark close-icon"></i>
                    <h2>Pay Split</h2>
                    <p>Contribute to your group's split.</p>

                    <!-- Group Name Dropdown -->
                    <div class="group">
                        <select id="paySplitGroupName" required>
                            <option value="" disabled selected>Select Group Name</option>
                            ${groupNames.map(name => `<option value="${name}">${name}</option>`).join("")}
                        </select>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                    </div>

                    <!-- Member Name Dropdown -->
                    <div class="group">
                        <select id="paySplitMemberName" required>
                            <option value="" disabled selected>Select Member Name</option>
                            ${memberNames.map(member => `<option value="${member}">${member}</option>`).join("")}
                        </select>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                    </div>

                    <!-- Contribution Amount Input -->
                    <div class="group">
                        <input type="number" id="paySplitAmount" required />
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label for="paySplitAmount">Contribution Amount ($)</label>
                    </div>

                    <!-- Submit Button -->
                    <button id="submitPaySplit">Submit Payment</button>
                </div>
            `;

         
            document.getElementById("historycontainer").appendChild(paySplitOverlay);
            paySplitOverlay.classList.add("active");

            document.getElementById("closeFareFloatPaySplit").addEventListener("click", function () {
                paySplitOverlay.remove();
            });

            document.getElementById("submitPaySplit").addEventListener("click", function () {
                const groupName = document.getElementById("paySplitGroupName").value;
                const memberName = document.getElementById("paySplitMemberName").value;
                const amount = parseFloat(document.getElementById("paySplitAmount").value);

                if (groupName && memberName && amount && amount > 0) {
                  
                    const splitIndex = fareSplits.findIndex(
                        (split) => split.splitUnder === groupName && split.spliWith === memberName
                    );
            
                    if (splitIndex !== -1) {
                       
                        fareSplits[splitIndex].contributed += amount;
            
                        showCustomAlert(`Payment of $${amount.toFixed(2)} sent by ${memberName} to group: ${groupName}.`);
                    } else {
                        showCustomAlert("No active split found for this group and member.");
                    }
            
                    document.getElementById("fareFloatPaySplitOverlay").remove(); // Close overlay
                } else {
                    showCustomAlert("Please select a valid group, member, and amount.");
                }
            });
        }
    });

    function showCustomAlert(message) {
        const alertBox = document.createElement("div");
        alertBox.className = "custom-alert";
        alertBox.textContent = message;

        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 4000); 
    }
});






document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".menu-dropdown ul li").forEach(item => {
        item.addEventListener("click", function () {
            const action = this.getAttribute("data-action");

            if (action === "nestEgg") {
                createNestEggOverlay(); 
            }
        });
    });
});









function createNestEggOverlay() {
    
    if (document.getElementById("nestEggOverlay")) return;

   
    const nestEggOverlay = document.createElement("div");
    nestEggOverlay.id = "nestEggOverlay";
    nestEggOverlay.className = "overlay";
    nestEggOverlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeNestEggOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <i id="eggOverlayfoward" class="fa-solid fa-arrow-right" title="Continue"></i>


            <img src="/images/nest egg logo.png" alt="Nest Egg Logo" class="nestEggLogo"/>
          

            <img src="/images/real cracked egg.png" alt="pig" class= "pig-image"/>
            <p class="nestEggOverlay" >Set your savings goals, track your progress, and secure your future all in one place.</p>
            <!-- Submit Button -->
            <button id="submitNestEgg">Create Goal</button>
        </div>
    `;

 
    document.getElementById("historycontainer").appendChild(nestEggOverlay);
    nestEggOverlay.classList.add("active");

    
    document.getElementById("closeNestEggOverlay").addEventListener("click", function () {
        nestEggOverlay.remove();
    });

    document.getElementById("eggOverlayfoward").addEventListener("click", function () {
        createNextOverlay(); 
    });

  
    document.getElementById("submitNestEgg").addEventListener("click", function () {
        const goalName = document.getElementById("goalName").value.trim();
        const goalAmount = parseFloat(document.getElementById("goalAmount").value);
        const amountSaved = parseFloat(document.getElementById("amountSaved").value);

        if (goalName && !isNaN(goalAmount) && !isNaN(amountSaved)) {
            if (amountSaved <= goalAmount) {
                showCustomAlert(`Goal "${goalName}" added! You've saved $${amountSaved} out of $${goalAmount}`);
                nestEggOverlay.remove(); 
            } else {
                showCustomAlert("Amount saved cannot exceed the goal amount.");
            }
        } else {
            showCustomAlert("Please fill in all fields with valid data.");
        }
    });
}


document.addEventListener("click", function (event) {
    if (event.target.id === "submitNestEgg") {
        createLoadingOverlay();
    }
});


function showGoalSelectionOverlay() {
    const goalOverlay = document.createElement("div");
    goalOverlay.id = "goalSelectionOverlay";
    goalOverlay.className = "overlay";
    goalOverlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeGoalOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <h2>Select Your Savings Goal</h2>
            <p>Choose the type of goal you want to save towards:</p>

            <ul class="goal-list">
                <li data-goal="emergency"><i class="fa-solid fa-graduation-cap"></i> Emergency Fund</li>
                <li data-goal="home"><i class="fa-solid fa-house"></i> Buying a Home/Down Payment</li>
                <li data-goal="car"><i class="fa-solid fa-car"></i> Car Purchase/Replacement</li>
                <li data-goal="education"><i class="fa-solid fa-school"></i> Education/College Tuition</li>
                <li data-goal="travel"><i class="fa-solid fa-plane"></i> Vacation/Travel</li>
                <li data-goal="children"><i class="fa-solid fa-baby"></i> Children’s Future/Childcare</li>
                <li data-goal="gifts"><i class="fa-solid fa-gift"></i> Holiday Gifts and Special Occasions</li>
                <li data-goal="wedding"><i class="fa-solid fa-ring"></i> Wedding/Engagement</li>
                <li data-goal="renovation"><i class="fa-solid fa-couch"></i> Home Renovation/Improvement</li>
                <li data-goal="medical"><i class="fa-solid fa-heartbeat"></i> Medical Expenses/Health Care</li>
                <li data-goal="debt"><i class="fa-solid fa-money-bill"></i> Debt Payoff</li>
                <li data-goal="retirement"><i class="fa-solid fa-chart-line"></i> Retirement/Long-term Investment</li>
                <li data-goal="fire"><i class="fa-solid fa-umbrella-beach"></i> Early Retirement/Financial Independence</li>
                <li data-goal="business"><i class="fa-solid fa-box"></i> Starting a Business/Side Hustle</li>
                <li data-goal="hobbies"><i class="fa-solid fa-guitar"></i> Hobbies and Passion Projects</li>
            </ul>
        </div>
    `;

    document.body.appendChild(goalOverlay);
    goalOverlay.classList.add("active");

    
    document.getElementById("closeGoalOverlay").addEventListener("click", function () {
        goalOverlay.remove();
    });

    goalOverlay.querySelectorAll(".goal-list li").forEach(item => {
        item.addEventListener("click", function () {
            const goalType = this.getAttribute("data-goal");
            createSelectAmountOverlay(goalType);
            goalOverlay.remove();
        });
    });
}






function createLoadingOverlay() {
    
    if (document.getElementById("loadingOverlay")) return;

 
    const loadingOverlay = document.createElement("div");
    loadingOverlay.id = "loadingOverlay";
    loadingOverlay.className = "overlay";
    loadingOverlay.innerHTML = `
    <div class="dots-container">
        <div class="dots"></div>
        <div class="dots"></div>
        <div class="dots"></div>
        <div class="dots"></div>
        <div class="dots"></div>
       
        <img src="/images/banana.png" alt="Loading" class="loading-image">
         <h2 class="loadingcl"> loading</h2>
    </div>
`;

document.body.appendChild(loadingOverlay);
loadingOverlay.classList.add("active");


setTimeout(() => {
    loadingOverlay.remove();
    showGoalSelectionOverlay();
}, 4000);
}






function showCustomAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.className = "custom-alert";
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    
}




document.querySelectorAll(".goal-list li").forEach(item => {
    item.addEventListener("click", function () {
        const goalType = this.getAttribute("data-goal");

        createSelectAmountOverlay(goalType);

        const goalOverlay = document.getElementById("goalSelectionOverlay");
        if (goalOverlay) {
            goalOverlay.remove();
        }

    });
});


function createSelectAmountOverlay(goalType) {
    const goalNames = {
        emergency: "Emergency Fund",
        home: "Buying a Home/Down Payment",
        car: "Car Purchase",
        education: "Education",
        travel: "Vacation",
        children: "Children’s Future",
        gifts: "Gifts ",
        wedding: "Wedding/Engage",
        renovation: "Home Improvement",
        medical: "Health Care",
        debt: "Debt Payoff",
        retirement: "Retirement",
        fire: "Financial Independence",
        business: "Business/Side Hustle",
        hobbies: "Passion Projects"
    };

    const goalText = goalNames[goalType] || "Goal";

 
    const existingOverlay = document.getElementById("selectAmountOverlay");
    if (existingOverlay) {
        existingOverlay.remove();
    }

    
    const selectAmountOverlay = document.createElement("div");
    selectAmountOverlay.id = "selectAmountOverlay";
    selectAmountOverlay.className = "overlay";

    selectAmountOverlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeSelectAmountOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <h2 class="title">${goalText}</h2>
            <p>Set your savings goal for <strong>${goalText}</strong>.</p>

            <!-- Goal Amount Input -->
            <div class="group">
                <input type="number" id="goalAmount" placeholder="Enter Goal Amount ($)" required />
                <span class="highlight"></span>
                <span class="bar"></span>
            </div>

            <!-- Submit Button -->
            <button id="submitGoalAmount">Set Goal</button>
        </div>
    `;

  
    document.getElementById("historycontainer").appendChild(selectAmountOverlay);
    selectAmountOverlay.classList.add("active");

    document.getElementById("closeSelectAmountOverlay").addEventListener("click", function () {
        selectAmountOverlay.remove(); 
    });

    document.getElementById("submitGoalAmount").addEventListener("click", function () {
        const goalAmount = parseFloat(document.getElementById("goalAmount").value);

        if (goalAmount && goalAmount > 0) {
            selectAmountOverlay.remove(); 
            showGoalConfirmation(goalText, goalAmount);
        } else {
            alert("Please enter a valid goal amount.");
        }
    });
}


function showGoalConfirmation(goalText, goalAmount) {
    const confirmationOverlay = document.createElement("div");
    confirmationOverlay.id = "goalConfirmationOverlay";
    confirmationOverlay.className = "overlay";

    confirmationOverlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeGoalConfirmationOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <h2 class="goalCreated">Goal Created!</h2>
            <p class="paragraph">Your goal for <strong>${goalText}</strong> has been set to <strong>$${goalAmount.toFixed(2)}</strong>.</p>
            <button id="closeConfirmation">OK</button>
        </div>
    `;

    document.getElementById("historycontainer").appendChild(confirmationOverlay);
    confirmationOverlay.classList.add("active");

   
    document.getElementById("closeGoalConfirmationOverlay").addEventListener("click", function () {
        confirmationOverlay.remove();
    });

    document.getElementById("closeConfirmation").addEventListener("click", function () {
        confirmationOverlay.remove(); 
        showGoalTrackingOverlay(goalText, goalAmount); 
    });
    
}

function showGoalTrackingOverlay(goalText, goalAmount) {
    const trackingOverlay = document.createElement("div");
    trackingOverlay.id = "goalTrackingOverlay";
    trackingOverlay.className = "overlay";

    trackingOverlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeGoalTrackingOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <h2>Track Your Goals</h2>
            <div class="goal-card">
                <h3>${goalText}</h3>
                <p>Goal Amount: $${goalAmount.toFixed(2)}</p>
                <p>Amount Saved: $0.00</p>
                <progress value="0" max="${goalAmount}"></progress>
                <!-- Later we can add buttons to add savings here -->
            </div>
        </div>
    `;

    document.getElementById("historycontainer").appendChild(trackingOverlay);
    trackingOverlay.classList.add("active");

    document.getElementById("closeGoalTrackingOverlay").addEventListener("click", function () {
        trackingOverlay.remove();
    });
}



document.addEventListener("DOMContentLoaded", function () {
    const forwardBtn = document.getElementById("eggOverlayfoward");

    if (forwardBtn) {
        forwardBtn.addEventListener("click", function () {
            createNextOverlay(); 
        });
    }
});



function createNextOverlay() {

    if (document.getElementById("nextEggOverlay")) return;

    const nextOverlay = document.createElement("div");
    nextOverlay.id = "nextEggOverlay";
    nextOverlay.className = "overlay";

    nextOverlay.innerHTML = `
        <div class="overlay-content">
            <i id="closeNextOverlay" class="fa-solid fa-circle-xmark close-icon"></i>
            <h2>Next Step</h2>
            <p>Congratulations! on starting your new savings goal. The Tempo team is here to help you every step of the way.</p>
            <button id="addMoneyBtn" class="overlay-button">Add Money</button>
            <button id="trackGoalsBtn" class="overlay-button">Track Goals</button>
        </div>
    `;

    document.body.appendChild(nextOverlay);
    nextOverlay.classList.add("active");

    
    document.getElementById("closeNextOverlay").addEventListener("click", function () {
        nextOverlay.remove();
    });

    
    document.getElementById("trackGoalsBtn").addEventListener("click", function () {
        nextOverlay.remove(); 

        const goalText = "Emergency Fund";     
        const goalAmount = 1000;               

        showGoalTrackingOverlay(goalText, goalAmount);
    });


    document.getElementById("addMoneyBtn").addEventListener("click", function () {
        console.log("Add Money clicked.");
      
    });
}






document.addEventListener("DOMContentLoaded", function () {
    const coachBtn = document.querySelector('[data-action="aiSpendingCoach"]');
  
    coachBtn.addEventListener("click", () => {
      if (document.getElementById("bubbleOverlay")) return;
  
      const overlay = document.createElement("div");
      overlay.id = "bubbleOverlay";
      overlay.className = "bubble-overlay";
  
 
      overlay.innerHTML = `
        <div class="bubble-overlay-content">
          <div class="aiden-intro-text" id="aidenIntroText"></div>
          <div class="animated-bubble" id="aidenBubble"></div>
          <i class="fa-solid fa-circle-xmark bubble-close" id="closeBubbleOverlay"></i>
        </div>
      `;
  
      document.body.appendChild(overlay);
  

      const introMessage = " My name is Aiden. I am your AI spending coach. Click the circle and let's talk.";
      const introElement = document.getElementById("aidenIntroText");
      let i = 0;
  
      function typeIntro() {
        if (i < introMessage.length) {
          introElement.textContent += introMessage.charAt(i);
          i++;
          setTimeout(typeIntro, 50);
        }
      }
  
      typeIntro();
  

      document.getElementById("closeBubbleOverlay").addEventListener("click", () => {
        overlay.remove();
      });
  
   
      document.getElementById("aidenBubble").addEventListener("click", () => {
        overlay.innerHTML = `
          <div class="aiden-overlay-content bounce-in">
            <i class="fa-solid fa-circle-xmark close-aiden-overlay" id="closeAidenOverlay"></i>
            <div class="aiden-welcome-avatar"></div>
            <div class="aiden-welcome-message">Hi! what can I assist you with?</div>
            <form id="aidenWelcomeForm" class="aiden-chat-form">
              <div class="aiden-input-wrapper">
                <input type="text" id="aidenWelcomeInput" placeholder="Send a message..." required />
               
              </div>
            </form>
          </div>
        `;
  
        document.getElementById("closeAidenOverlay").addEventListener("click", () => overlay.remove());
  
      
        document.getElementById("aidenWelcomeInput").addEventListener("focus", () => {
          overlay.innerHTML = `
            <div class="aiden-overlay-content bounce-in">
              <i class="fa-solid fa-circle-xmark close-aiden-overlay" id="closeAidenOverlay"></i>
              <h2 class="aiden-header">Aiden: AI Spending Coach</h2>
  
              <div class="aiden-chat-log" id="aidenChatLog">
                <div class="msg"><span>Aiden:</span> Hey there! Ask me anything about your budget, spending, or saving tips.</div>
              </div>
  
              <form id="aidenForm" class="aiden-chat-form">
                <div class="aiden-input-wrapper">
                  <input type="text" id="aidenInput" placeholder="Ask Aiden something..." required />
                  <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
              </form>
  
              <div class="aiden-button-group inline-buttons">
                <button class="aiden-btn">Tips</button>
                <button class="aiden-btn">Adjust Budget</button>
                <button class="aiden-btn" id="aiden-mute-toggle">Mute Me</button>
              </div>
            </div>
          `;
  
          document.getElementById("closeAidenOverlay").addEventListener("click", () => overlay.remove());
  
          document.getElementById("aidenForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const input = document.getElementById("aidenInput");
            const chatLog = document.getElementById("aidenChatLog");
            const userText = input.value.trim();
            if (userText) {
              chatLog.innerHTML += `<div class="msg"><span>You:</span> ${userText}</div>`;
              chatLog.innerHTML += `<div class="msg"><span>Aiden:</span> Awesome! Let me break that down for you.</div>`;
              chatLog.scrollTop = chatLog.scrollHeight;
              input.value = "";
            }
          });
        });
      });
    });
  });
  










  document.addEventListener("DOMContentLoaded", function () {
    const capBtn = document.querySelector('[data-action="spendingCaps"]');
    const userCaps = [];
  
    capBtn.addEventListener("click", () => {
      if (document.getElementById("spendingCapOverlay")) return;
  
      const overlay = document.createElement("div");
      overlay.id = "spendingCapOverlay";
      overlay.className = "bubble-overlay";
  
      function showToast(text) {
        const box = document.createElement("div");
        box.className = "toast-alert";
        box.innerText = text;
        document.body.appendChild(box);
        setTimeout(() => box.classList.add("visible"), 50);
        setTimeout(() => {
          box.classList.remove("visible");
          setTimeout(() => box.remove(), 300);
        }, 4000);
      }
  
      function sendCapMessage(category, percent) {
        const now = new Date().toLocaleString();
        const message = {
          id: Date.now(),
          sender: "Ping Alert",
          subject: ` ${category} Cap Alert`,
          snippet: `You've reached ${percent}% of your ${category} cap.`,
          timestamp: now,
          status: "unread",
          thread: [
            {
              from: "Ping Alert",
              text: `Heads up! You’ve hit ${percent}% of your ${category} cap.`,
              time: now
            }
          ]
        };
  
        if (window.messages) {
          window.messages.push(message);
          if (typeof renderMessages === "function") renderMessages("inbox");
        }
  
        showToast(` You're ${percent}% into your ${category} cap!`);
      }
  
      function loadMainMenu() {
        overlay.innerHTML = `
          <div class="bubble-overlay-content cap-setup-content">
            <i class="fa-solid fa-circle-xmark bubble-close" id="closeCapOverlay"></i>
            <h2 class="aiden-header spending-cap-title">
              <img src="/images/spending.png" alt="Spending Cap" />
            </h2>
            <p class="aiden-subtext">Let’s keep your spending in check. Choose an option to begin:</p>
            <div class="cap-option-buttons">
              <button class="cap-option-btn" id="startCapSetup">Create New Cap</button>
              <button class="cap-option-btn" id="viewCapTrends">Cap Trends</button>
              <button class="cap-option-btn" id="openPingDashboard">Active Caps</button>
            </div>
          </div>
        `;
  
        document.getElementById("closeCapOverlay").addEventListener("click", () => overlay.remove());
        document.getElementById("startCapSetup").addEventListener("click", loadCreateCapOverlay);
        document.getElementById("viewCapTrends").addEventListener("click", loadCapTrendsOverlay);
        document.getElementById("openPingDashboard").addEventListener("click", loadDashboardOverlay);
      }
  
      function loadCreateCapOverlay() {
        overlay.innerHTML = `
          <div class="bubble-overlay-content cap-setup-content">
            <i class="fa-solid fa-arrow-left bubble-close" id="backToMenu1"></i>
            <h2 class="aiden-header spending-cap-title">
              <img src="/images/spending.png" alt="Spending Cap" />
            </h2>
            <p class="aiden-subtext">Set a cap and we’ll help keep you on track.</p>
  
            <label for="capType">Select Cap Type</label>
            <select id="capType">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
  
            <label for="capCategory">Choose Category</label>
            <select id="capCategory">
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="transportation">Transportation</option>
              <option value="custom">Custom Category</option>
            </select>
  
            <label for="capAmount">Enter Amount</label>
            <input type="number" id="capAmount" placeholder="e.g. $40" />
  
            <label>Cap Behavior</label>
            <div class="cap-behavior-toggle">
              <button class="cap-behavior-btn">Just Warn Me</button>
              <button class="cap-behavior-btn">Block Me</button>
              <button class="cap-behavior-btn">Let Me Break It</button>
            </div>
  
            <div class="reminder-toggle">
              <label for="capReminder">Notify me when I’m 80% there.</label>
              <input type="checkbox" id="capReminder" />
            </div>
  
            <button id="submitCap" class="cap-submit">Lock My Cap</button>
          </div>
        `;
  
        document.getElementById("backToMenu1").addEventListener("click", loadMainMenu);
  
        let selectedBehavior = "Just Warn Me";
        document.querySelectorAll(".cap-behavior-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            document.querySelectorAll(".cap-behavior-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedBehavior = btn.innerText;
          });
        });
  
        document.getElementById("submitCap").addEventListener("click", () => {
          const cap = {
            type: document.getElementById("capType").value,
            category: document.getElementById("capCategory").value,
            amount: parseFloat(document.getElementById("capAmount").value),
            spent: 0,
            behavior: selectedBehavior,
            reminder: document.getElementById("capReminder").checked,
            lastThreshold: 0
          };
          if (isNaN(cap.amount)) return alert("Please enter a valid amount");
          userCaps.push(cap);
          loadDashboardOverlay();
        });
      }
  
      function updateCapProgressDisplay(container, cap) {
        const percent = Math.min((cap.spent / cap.amount) * 100, 100);
        const bar = container.querySelector(".cap-meter-fill");
        const percentText = container.querySelector(".cap-percent");
        bar.style.width = percent + "%";
        percentText.innerText = `${Math.round(percent)}%`;
  
        const thresholds = [25, 50, 75, 90, 100];
        for (let t of thresholds) {
          if (percent >= t && cap.lastThreshold < t) {
            sendCapMessage(cap.category, t);
            cap.lastThreshold = t;
          }
        }
      }
  
      function renderDashboardCaps() {
        const container = document.getElementById("dashboardCaps");
        if (!container) return;
        container.innerHTML = "";
        userCaps.forEach(cap => {
          const percent = Math.min((cap.spent / cap.amount) * 100, 100);
          const capDiv = document.createElement("div");
          capDiv.className = "cap-card";
          capDiv.innerHTML = `
            <h4>${cap.category.toUpperCase()} ($${cap.amount})</h4>
            <div class="cap-progress-bar">
              <div class="cap-meter-fill ${percent >= 75 ? "pulse" : ""}"></div>
            </div>
            <span class="cap-percent">${Math.round(percent)}%</span>
          `;
          container.appendChild(capDiv);
          updateCapProgressDisplay(capDiv, cap);
        });
      }
  
      function loadDashboardOverlay() {
        overlay.innerHTML = `
          <div class="bubble-overlay-content cap-setup-content">
            <i class="fa-solid fa-arrow-left bubble-close" id="backToMenu3"></i>
            <h2 class="aiden-header spending-cap-title">
              <img src="/images/spending.png" alt="Spending Cap" />
            </h2>
            <p class="aiden-subtext">Check how close you are to your cap. Pulsing meter starts at 75%.</p>
            <div class="dashboard-meter-placeholder" id="dashboardCaps"></div>
          </div>
        `;
        document.getElementById("backToMenu3").addEventListener("click", loadMainMenu);
        renderDashboardCaps();
      }
  
      function loadCapTrendsOverlay() {
        overlay.innerHTML = `
          <div class="bubble-overlay-content cap-setup-content">
            <i class="fa-solid fa-arrow-left bubble-close" id="backToMenu2"></i>
            <h2 class="aiden-header spending-cap-title">
              <img src="/images/spending.png" alt="Spending Cap" />
            </h2>
            <p class="aiden-subtext">Your recent cap performance. Keep the streak alive!</p>
            <canvas id="capTrendChart" style="width:100%;max-width:600px;margin-top:20px;"></canvas>
          </div>
        `;
        document.getElementById("backToMenu2").addEventListener("click", loadMainMenu);
        renderCapTrendChart();
      }
  
      function renderCapTrendChart() {
        const ctx = document.getElementById("capTrendChart").getContext("2d");
  
        const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const datasets = userCaps.map(cap => ({
          label: cap.category,
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * cap.amount)),
          fill: false,
          borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
          tension: 0.3
        }));
  
        new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Amount Spent ($)" }
              }
            }
          }
        });
      }
  
      const observer = new MutationObserver(() => {
        const expenses = document.querySelectorAll(".transactionstor.expense");
        const totals = {};
        expenses.forEach(exp => {
          const label = exp.querySelector(".transaction-desc")?.textContent?.toLowerCase();
          const price = exp.querySelector("span:last-child")?.textContent?.replace(/[^\d.-]/g, "");
          const value = parseFloat(price);
          if (!label || isNaN(value)) return;
          totals[label] = (totals[label] || 0) + value;
        });
  
        userCaps.forEach(cap => {
          cap.spent = totals[cap.category] || 0;
        });
  
        renderDashboardCaps();
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
  
      document.body.appendChild(overlay);
      loadMainMenu();
    });
  });
  