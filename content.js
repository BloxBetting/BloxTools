const splash = `
██████╗ ██╗      ██████╗ ██╗  ██╗████████╗ ██████╗  ██████╗ ██╗     ███████╗
██╔══██╗██║     ██╔═══██╗╚██╗██╔╝╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
██████╔╝██║     ██║   ██║ ╚███╔╝    ██║   ██║   ██║██║   ██║██║     ███████╗
██╔══██╗██║     ██║   ██║ ██╔██╗    ██║   ██║   ██║██║   ██║██║     ╚════██║
██████╔╝███████╗╚██████╔╝██╔╝ ██╗   ██║   ╚██████╔╝╚██████╔╝███████╗███████║
╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
`;

const info = `
 _______________________________________________________________________________ 
 |             Features                |             Specifics                 | 
 |_____________________________________|_______________________________________| 
 |                                     |                                       | 
 |  • Track 2v2 battle team totals     |  • Checks DOM for 2v2 battle layout   | 
 |   ⤷ Show score difference           |  • Monitors player score elements     | 
 |   ⤷ Highlight the leading team      |  • Compares team scores and updates   | 
 |   ⤷ Real-time updating score        |  • Creates dynamic score display      | 
 |  • Net gain + loss tracker          |                                       |
 |   ⤷ Calculate total gain / loss     |  • Can reset session using "Clear"    |
 |_____________________________________|_______________________________________| 
`;

const divider = `_________________________________________________________________________________`;

// Function to format numbers with commas
function formatNumber(value) {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Variables to store previous totals for comparison (to reduce unnecessary updates)
let prevTeam1Total = 0;
let prevTeam2Total = 0;
let lastUpdateTime = 0;

// Function to apply gold glow effect to the leading team's players
function highlightLeadingTeam(team1Total, team2Total) {
    // Select all player containers
    const playerContainers = document.querySelectorAll(".battles_battlesGameSlotsSlotInfo__ut8FN");

    // Add smooth transition for glow and slight pulse effect
    const style = document.createElement('style');
    style.innerHTML = `
        .battles_battlesGameSlotsSlotInfoAmount__UEph6 {
            transition: box-shadow 0.3s ease-in-out; /* Smooth transition for glow */
        }
        
        .glowing {
            animation: pulseGlow 3s ease-in-out infinite; /* Slower pulse effect */
        }

        @keyframes pulseGlow {
            0% {
                box-shadow: 0 0 8px 2px rgba(255, 223, 0, 0.7);
            }
            50% {
                box-shadow: 0 0 10px 3px rgba(255, 223, 0, 0.9); /* Increased blur at 50% */
            }
            100% {
                box-shadow: 0 0 8px 2px rgba(255, 223, 0, 0.7);
            }
        }
    `;
    document.head.appendChild(style);

    // Reset any previous glow effect
    playerContainers.forEach(player => {
        const playerTop = player.querySelector(".battles_battlesGameSlotsSlotInfoAmount__UEph6");
        if (playerTop) {
            playerTop.style.boxShadow = ''; // Remove any previous glow
            playerTop.classList.remove("glowing"); // Remove any active pulse effect
        }
    });

    // Determine the leading team based on the scores
    let leadingTeamPlayers = [];
    if (team1Total > team2Total) {
        leadingTeamPlayers = [playerContainers[0], playerContainers[1]]; // Team 1 is leading
    } else if (team2Total > team1Total) {
        leadingTeamPlayers = [playerContainers[2], playerContainers[3]]; // Team 2 is leading
    }

    // Apply the static glow with pulse effect to the leading team's player cards
    leadingTeamPlayers.forEach(player => {
        const playerTop = player.querySelector(".battles_battlesGameSlotsSlotInfoAmount__UEph6");
        if (playerTop) {
            playerTop.classList.add("glowing"); // Add pulse effect
        }
    });
}
const ctRas1 = atob(atob("VDJabWFXTnBZV3dnUjJsMFNIVmlPaUJvZEhSd2N6b3ZMMmRwZEdoMVlpNWpiMjB2UW14dmVFSmxkSFJwYm1jdlFteHZlRlJ2YjJ4ekNrOW1abWxqYVdGc0lFUnBjMk52Y21RNklHaDBkSEJ6T2k4dlpHbHpZMjl5WkM1blp5OXJWVnBWZEhBMU5IRjU="));

// Function to extract the player pulls and check if it's a 2v2
function extractTeamTotals() {
    // Check if the battle is a 2v2 (by detecting the VS element)
    const vsElement = document.querySelector("div[style*='transform: translateX(50%)'] svg");
    if (vsElement) { // If the VS element exists, it's a 2v2 battle
        const playerContainers = document.querySelectorAll(".battles_battlesGameSlotsSlotInfo__ut8FN");

        let team1PullAmounts = [];
        let team2PullAmounts = [];

        playerContainers.forEach((player, index) => {
            const amountElement = player.querySelector(".battles_battlesGameSlotsSlotInfoAmount__UEph6");
            if (amountElement) {
                let playerPullAmount = parseFloat(amountElement.textContent.replace(/[^0-9.-]+/g, "")); // Extract the numeric value
                if (!isNaN(playerPullAmount)) {
                    if (index < 2) {
                        team1PullAmounts.push(playerPullAmount); // First two players in Team 1
                    } else {
                        team2PullAmounts.push(playerPullAmount); // Next two players in Team 2
                    }
                }
            }
        });

        let team1Total = team1PullAmounts.reduce((acc, amount) => acc + amount, 0); // Total for Team 1
        let team2Total = team2PullAmounts.reduce((acc, amount) => acc + amount, 0); // Total for Team 2

        // Only update the display if there is a change in the totals
        if (team1Total !== prevTeam1Total || team2Total !== prevTeam2Total) {
            prevTeam1Total = team1Total;
            prevTeam2Total = team2Total;
            updateTeamTotalDisplay(team1Total, team2Total);
        }
    }
}
const ctRas2 = atob(atob("V1c5MWRIVmlaVG9nYUhSMGNITTZMeTkzZDNjdWVXOTFkSFZpWlM1amIyMHZRRUpzYjNoQ1pYUjBhVzVuQ2tOeVpXRjBiM0k2SUVKc2IzaENaWFIwYVc1bg=="));

// Function to manually update the totals from existing values (used by "Re-Check" button)
const EC = atob(atob(atob("WVVoU01HTklUVFpNZVRrelpETmpkV1ZYT1RGa1NGWnBXbE0xYW1JeU1IWlJSVXB6WWpOb1ExcFlVakJoVnpWdQ==")));
function updateScoreManually() {
    const vsElement = document.querySelector("div[style*='transform: translateX(50%)'] svg");
    if (vsElement) {
        const playerContainers = document.querySelectorAll(".battles_battlesGameSlotsSlotInfo__ut8FN");

        let team1PullAmounts = [];
        let team2PullAmounts = [];

        playerContainers.forEach((player, index) => {
            const amountElement = player.querySelector(".battles_battlesGameSlotsSlotInfoAmount__UEph6");
            if (amountElement) {
                let playerPullAmount = parseFloat(amountElement.textContent.replace(/[^0-9.-]+/g, "")); // Extract the numeric value
                if (!isNaN(playerPullAmount)) {
                    if (index < 2) {
                        team1PullAmounts.push(playerPullAmount); // First two players in Team 1
                    } else {
                        team2PullAmounts.push(playerPullAmount); // Next two players in Team 2
                    }
                }
            }
        });

        let team1Total = team1PullAmounts.reduce((acc, amount) => acc + amount, 0); // Total for Team 1
        let team2Total = team2PullAmounts.reduce((acc, amount) => acc + amount, 0); // Total for Team 2

        // Update the display with the manually calculated totals
        updateTeamTotalDisplay(team1Total, team2Total);
    }
}
const runtime = `
${divider}
${splash}
${info}
${ctRas1}
${ctRas2}
${divider}
`;

// Function to update the display of team totals
function updateTeamTotalDisplay(team1Total, team2Total) {
    const team1TotalDiv = document.getElementById('team1-total-display');
    const team2TotalDiv = document.getElementById('team2-total-display');
    const teamDifferenceDiv = document.getElementById('team-difference-display'); // Display the difference

    if (team1TotalDiv && team2TotalDiv) {
        // Format and update team total amounts
        team1TotalDiv.querySelector('.team-total-value').textContent = `${formatNumber(team1Total)}`;
        team2TotalDiv.querySelector('.team-total-value').textContent = `${formatNumber(team2Total)}`;

        // Set color based on team totals
        if (team1Total > team2Total) {
            team1TotalDiv.querySelector('.team-total-value').style.color = '#4CAF50'; // Green for higher value
            team2TotalDiv.querySelector('.team-total-value').style.color = '#F44336'; // Red for lower value
            teamDifferenceDiv.textContent = `Up by ${formatNumber(team1Total - team2Total)}`;
        } else if (team2Total > team1Total) {
            team1TotalDiv.querySelector('.team-total-value').style.color = '#F44336'; // Red for lower value
            team2TotalDiv.querySelector('.team-total-value').style.color = '#4CAF50'; // Green for higher value
            teamDifferenceDiv.textContent = `Down by ${formatNumber(team2Total - team1Total)}`;
        } else {
            team1TotalDiv.querySelector('.team-total-value').style.color = '#ADD8E6'; // Blue for equal
            team2TotalDiv.querySelector('.team-total-value').style.color = '#ADD8E6'; // Blue for equal
            teamDifferenceDiv.textContent = "Balances are equal";
        }

        // Apply the glow effect for the leading team
        highlightLeadingTeam(team1Total, team2Total);
    }
}

// Function to create or update the display container
function createOrUpdateTeamTotalDisplay() {
    const totalAmountContainer = document.querySelector('.battles_battlesGameHeaderLeftAmount__g66vC');

    // If the total amount container exists and it's a 2v2 battle, create or update the display
    if (totalAmountContainer) {
        const playerContainers = document.querySelectorAll(".battles_battlesGameSlotsSlotInfo__ut8FN");
        const vsElement = document.querySelector("div[style*='transform: translateX(50%)'] svg");

        if (playerContainers.length === 4 && vsElements.length === 1) { // Ensure 4 player containers for 2v2
            if (!document.getElementById('team1-total-display')) {
                createTeamTotalDisplay(totalAmountContainer); // Create display if not already created
            }
        } else {
            const totalsContainer = document.getElementById('team1-total-display')?.parentNode;
            if (totalsContainer) {
                totalsContainer.parentNode.removeChild(totalsContainer); // Remove display if not 2v2
            }
        }
    }
}
if (!runtime.includes(EC)) {
    alert(atob("Q3JlZGl0cyBoYXZlIGJlZW4gbW9kaWZpZWQgb3IgcmVtb3ZlZC4gQmxveFRvb2xzIHdpbGwgbm90IHJ1bi4="));
    throw new Error(atob("Q3JlZGl0cyBoYXZlIGJlZW4gbW9kaWZpZWQgb3IgcmVtb3ZlZC4gQmxveFRvb2xzIHdpbGwgbm90IHJ1bi4="));
}

// Function to create the display container for team totals
function createTeamTotalDisplay(container) {
    const totalsContainer = document.createElement('div');
    totalsContainer.style.position = 'relative';
    totalsContainer.style.backgroundColor = 'rgba(63, 63, 63, 0.3)';
    totalsContainer.style.color = '#e0e0e0';
    totalsContainer.style.padding = '6px'; // Adjusted padding to make the entire container smaller
    totalsContainer.style.borderRadius = '8px'; // Slightly smaller border radius
    totalsContainer.style.boxShadow = '0 7px 15px rgba(0, 0, 0, 0.3)'; // Slightly reduced shadow
    totalsContainer.style.width = '100%';
    totalsContainer.style.marginBottom = '8px'; // Reduced bottom margin
    totalsContainer.style.display = 'flex';
    totalsContainer.style.flexDirection = 'column';
    totalsContainer.style.alignItems = 'flex-start';

    // Add a gold border
    totalsContainer.style.border = '2px solid #B58F20';

    // Team 1 Total Div
    const team1Div = document.createElement('div');
    team1Div.id = 'team1-total-display';
    team1Div.style.color = 'white';
    team1Div.style.fontWeight = 'bold';
    team1Div.style.fontSize = '15px'; // Reduced font size
    team1Div.innerHTML = `Team 1: <span class="team-total-value">0.00</span>`;

    // Team 2 Total Div
    const team2Div = document.createElement('div');
    team2Div.id = 'team2-total-display';
    team2Div.style.color = 'white';
    team2Div.style.fontWeight = 'bold';
    team2Div.style.fontSize = '15px'; // Reduced font size
    team2Div.innerHTML = `Team 2: <span class="team-total-value">0.00</span>`;

    // Team Difference Div
    const teamDifferenceDiv = document.createElement('div');
    teamDifferenceDiv.id = 'team-difference-display';
    teamDifferenceDiv.style.color = 'white';
    teamDifferenceDiv.style.fontWeight = 'bold';
    teamDifferenceDiv.style.fontSize = '10px'; // Reduced font size
    teamDifferenceDiv.style.marginTop = '4px'; // Reduced margin
    teamDifferenceDiv.textContent = "Balances are equal";

    // Insert the totals container above the balance container
    container.parentNode.insertBefore(totalsContainer, container);
    totalsContainer.appendChild(team1Div);
    totalsContainer.appendChild(team2Div);
    totalsContainer.appendChild(teamDifferenceDiv);

    // Create and append "Re-Check" button
    const checkScoreButton = document.createElement('button');
    checkScoreButton.textContent = 'Update';
    checkScoreButton.style.backgroundColor = '#555'; // Subtle dark gray button
    checkScoreButton.style.color = '#e0e0e0'; // Light text for readability
    checkScoreButton.style.padding = '1px 4px'; // Significantly smaller padding
    checkScoreButton.style.marginTop = '3px'; // Smaller margin
    checkScoreButton.style.border = '1px solid #888'; // Subtle border
    checkScoreButton.style.borderRadius = '3px'; // Smaller border radius
    checkScoreButton.style.cursor = 'pointer';
    checkScoreButton.style.fontSize = '9px'; // Smaller font size for a more compact button
    checkScoreButton.style.transition = 'background-color 0.3s ease'; // Smooth hover effect

    // Hover effect to brighten the button slightly
    checkScoreButton.addEventListener('mouseenter', () => {
        checkScoreButton.style.backgroundColor = '#666'; // Slightly lighter on hover
    });
    checkScoreButton.addEventListener('mouseleave', () => {
        checkScoreButton.style.backgroundColor = '#555'; // Reset to original on mouse leave
    });

    // Attach button click event for manual score update
    checkScoreButton.addEventListener('click', updateScoreManually);

    // Append the button to the totals container
    totalsContainer.appendChild(checkScoreButton);
}
console.log(runtime);

// Start the update loop (called every frame)
(function updateLoop() {
    extractTeamTotals(); // Update team totals
    createOrUpdateTeamTotalDisplay(); // Ensure display is created/updated
    requestAnimationFrame(updateLoop); // Continue running the update loop at the next available frame
})();

// Net loss / gain checker
(() => {
  let startingBalance = null;
  let currentBalance = null;
  let tracking = false;

  // Format the number with commas and 2 decimal places
  const formatNumber = (value) => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatNetChange = (value) => {
    if (value > 0) {
      return `<span style="color: rgb(76, 175, 80); font-weight: bold;">↑+${formatNumber(value)}</span>`;
    } else if (value < 0) {
      return `<span style="color: rgb(244, 67, 54); font-weight: bold;">↓${formatNumber(value)}</span>`;
    } else {
      return `<span style="color: gray;">0.00</span>`;
    }
  };

  const createTrackerUI = () => {
    const navElement = document.querySelector(".header_headerNav__weXq1");
    if (!navElement) {
      // Retry after 500ms if the nav element is not yet available
      setTimeout(createTrackerUI, 500);
      return;
    }

    const trackerDiv = document.createElement("div");
    trackerDiv.id = "net-gain-tracker";
    trackerDiv.style.display = "flex";
    trackerDiv.style.alignItems = "center";
    trackerDiv.style.justifyContent = "center";
    trackerDiv.style.padding = "10px 15px";
    trackerDiv.style.borderRadius = "8px";
    trackerDiv.style.backgroundColor = "rgba(63, 63, 63, 0.3)";
    trackerDiv.style.color = "rgb(224, 224, 224)";
    trackerDiv.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 7px 15px";
    trackerDiv.style.border = "2px solid rgb(181, 143, 32)";
    trackerDiv.style.marginLeft = "auto";
    trackerDiv.style.marginRight = "10px";

    trackerDiv.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: flex-start; margin-right: 10px;">
        <span style="font-size: 14px; font-weight: 500; color: rgb(224, 224, 224);">Starting bal:</span>
        <span id="starting-balance" style="font-size: 14px; font-variant-numeric: tabular-nums; color: white;">--</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-start; margin-right: 10px;">
        <span style="font-size: 14px; font-weight: 500; color: rgb(224, 224, 224);">Net Profit:</span>
        <span id="net-profit" style="font-size: 14px; font-variant-numeric: tabular-nums; color: white;">--</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <button id="start-tracker" style="padding: 4px 8px; font-size: 10px; font-weight: 500; background-color: rgb(85, 85, 85); color: rgb(224, 224, 224); border: 1px solid rgb(136, 136, 136); border-radius: 4px; cursor: pointer; transition: background-color 0.3s, transform 0.1s ease; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Start</button>
        <button id="reset-tracker" style="padding: 4px 8px; font-size: 10px; font-weight: 500; background-color: rgb(85, 85, 85); color: rgb(224, 224, 224); border: 1px solid rgb(136, 136, 136); border-radius: 4px; cursor: pointer; transition: background-color 0.3s, transform 0.1s ease; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Clear</button>
      </div>
    `;

    navElement.appendChild(trackerDiv);

    // Add button event listeners
    document.getElementById("start-tracker").addEventListener("click", startTracker);
    document.getElementById("reset-tracker").addEventListener("click", resetTracker);
    
    // Add hover and click effects
    const startButton = document.getElementById("start-tracker");
    startButton.addEventListener("mouseenter", () => startButton.style.backgroundColor = 'rgb(100, 100, 100)');
    startButton.addEventListener("mouseleave", () => startButton.style.backgroundColor = tracking ? 'rgb(76, 175, 80)' : 'rgb(85, 85, 85)');
    startButton.addEventListener("mousedown", () => startButton.style.transform = "scale(0.95)");
    startButton.addEventListener("mouseup", () => startButton.style.transform = "scale(1)");
  };

  const startTracker = () => {
    if (tracking) return;

    const balanceElement = document.querySelector(
      ".text_text__fMaR4 span"
    );
    if (balanceElement) {
      // Extract balance and remove commas before converting to a number
      startingBalance = parseFloat(balanceElement.textContent.replace(/,/g, ''));
      currentBalance = startingBalance;
      tracking = true;

      // Update button to indicate active state
      const startButton = document.getElementById("start-tracker");
      startButton.style.backgroundColor = "rgb(76, 175, 80)"; // Green when active
      startButton.textContent = "Tracking...";

      document.getElementById("starting-balance").textContent = formatNumber(startingBalance);
      document.getElementById("net-profit").innerHTML = formatNetChange(0);

      observeBalanceChanges();
    } else {
      alert("Balance element not found. Please try again.");
    }
  };

  const resetTracker = () => {
    tracking = false;
    startingBalance = null;
    currentBalance = null;

    const startButton = document.getElementById("start-tracker");
    startButton.style.backgroundColor = "rgb(85, 85, 85)"; // Reset to default
    startButton.textContent = "Start";

    document.getElementById("starting-balance").textContent = "--";
    document.getElementById("net-profit").innerHTML = "--";
  };

  const observeBalanceChanges = () => {
    const balanceElement = document.querySelector(
      ".text_text__fMaR4 span"
    );

    if (!balanceElement) return;

    const observer = new MutationObserver(() => {
      if (!tracking) return;

      const newBalance = parseFloat(balanceElement.textContent.replace(/,/g, ''));
      if (newBalance !== currentBalance) {
        currentBalance = newBalance;
        const netChange = currentBalance - startingBalance;

        document.getElementById("net-profit").innerHTML = formatNetChange(netChange);
      }
    });

    observer.observe(balanceElement, { childList: true, subtree: true });
  };

  // Inject tracker UI
setTimeout(function(){
    createTrackerUI();
}, 1500);
})();

