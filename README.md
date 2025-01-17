# BloxTools

This is a 3rd party chrome extension developed for both https://bloxgame.com and https://bloxgame.com

## Current Features

- **Track 2v2 battle team totals**:
  - Show the current score for each team.
  - Show the score difference between the teams.
  - Highlight the leading team with a glowing effect.
  - Real-time score updates as the battle progresses.
  
- **Real-time updates**:
  - The score updates automatically every frame, providing a smooth experience.
  
- **Manual score update**:
  - Allows the user to manually trigger a score update using the "Re-Check" button in the event of joining a battle mid way or visiting an old battle.

## Installation

### 1. Download the Files
To get started, download the repository files to your computer by cloning the repo or downloading it as a ZIP file (must extract to a single folder after downloading). Make sure you have all the following files:

- **icons** folder
- **manifest.json**
- **content.js**
- **README.md**
- **LICENSE**

### 2. Set Up the Extension

1. Create a folder on your computer and place all the downloaded files (including the `icons` folder) in that folder (Lets call it BT).
The structure of BT folder should look like:
- **icons** folder
- **manifest.json**
- **content.js**
- **README.md**
- **LICENSE**

3. Open Chrome, and in the URL bar, type `chrome://extensions` and press Enter.

4. On the Extensions page, enable **Developer mode** by toggling the switch in the top-right corner.

5. Once developer mode is enabled, in the upper left corner of the extensions page, Click on the **Load unpacked** button.

6. In the folder navigation window that opened, navigate to the folder where you placed the extension files, and select the folder (In this case, navigate to and click on the BT folder).

7. Once the folder (BT) is selected, click "Select folder" in the navigation window

8. The extension will now be installed and should appear on the Extensions page. You may need to enable it if it isn't already.

### 3. Using the Extension
If wanted, pin the extension so its not hidden in your chrome window.

Once the extension is installed, it should automatically start working when loading up the BloxGame website.

That's it! Your extension is now set up and ready to use.
