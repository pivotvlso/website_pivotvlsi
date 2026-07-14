function तन्तुचिह्नरेखनम्() {
    const तन्तुपटः = document.getElementById('तन्तुचिह्नम्');
    if (!तन्तुपटः) return;

    const सन्दर्भः = तन्तुपटः.getContext('2d');

    // Clear the canvas to ensure a clean slate
    सन्दर्भः.clearRect(0, 0, तन्तुपटः.width, तन्तुपटः.height);

    // Set styling for the wire
    सन्दर्भः.strokeStyle = '#333333'; // Dark grey for the wire
    सन्दर्भः.fillStyle = '#1641c0';   // Theme blue for the connection nodes
    सन्दर्भः.lineWidth = 2;
    सन्दर्भः.lineJoin = 'round';

    // Route a step-shaped wire line
    सन्दर्भः.beginPath();
    सन्दर्भः.moveTo(4, 18);   // Start bottom-left
    सन्दर्भः.lineTo(12, 18);  // Move right
    सन्दर्भः.lineTo(12, 6);   // Move up
    सन्दर्भः.lineTo(20, 6);   // Move right to top-right
    सन्दर्भः.stroke();

    // Draw the starting connection dot (बिन्दुः)
    सन्दर्भः.beginPath();
    सन्दर्भः.arc(4, 18, 2.5, 0, Math.PI * 2);
    सन्दर्भः.fill();

    // Draw the ending connection dot (बिन्दुः)
    सन्दर्भः.beginPath();
    सन्दर्भः.arc(20, 6, 2.5, 0, Math.PI * 2);
    सन्दर्भः.fill();
}


// Function to draw the AND gate icon on the toolbar canvas
function संयोगद्वारचिह्नरेखनम्() {
    const संयोगद्वारपटः = document.getElementById('संयोगद्वारचिह्नम्');
    if (!संयोगद्वारपटः) return;

    const सन्दर्भः = संयोगद्वारपटः.getContext('2d');
    सन्दर्भः.clearRect(0, 0, संयोगद्वारपटः.width, संयोगद्वारपटः.height);

    // Set styling for the AND gate
    सन्दर्भः.strokeStyle = '#333333';
    सन्दर्भः.fillStyle = '#1641c0';   // Theme blue for the connection nodes
    सन्दर्भः.lineWidth = 2;
    सन्दर्भः.lineJoin = 'round';

    // Draw the D-shape AND body
    सन्दर्भः.beginPath();
    सन्दर्भः.moveTo(8, 6);
    सन्दर्भः.lineTo(12, 6);
    सन्दर्भः.arc(12, 12, 6, -Math.PI / 2, Math.PI / 2); // Right semi-circle
    सन्दर्भः.lineTo(8, 18);
    सन्दर्भः.closePath(); // Left vertical back
    सन्दर्भः.stroke();

    // Draw input pins and output pin
    सन्दर्भः.beginPath();
    सन्दर्भः.moveTo(4, 9);
    सन्दर्भः.lineTo(8, 9);
    सन्दर्भः.moveTo(4, 15);
    सन्दर्भः.lineTo(8, 15);
    सन्दर्भः.moveTo(18, 12);
    सन्दर्भः.lineTo(22, 12);
    सन्दर्भः.stroke();
    //Draw pins
    सन्दर्भः.beginPath();
    सन्दर्भः.arc(4, 9, 2.5, 0, Math.PI * 2);
    सन्दर्भः.fill();

    सन्दर्भः.beginPath();
    सन्दर्भः.arc(4, 15, 2.5, 0, Math.PI * 2);
    सन्दर्भः.fill();

    सन्दर्भः.beginPath();
    सन्दर्भः.arc(22, 12, 2.5, 0, Math.PI * 2);
    सन्दर्भः.fill();
}

// Function to draw the Pin icon on the toolbar canvas
function कीलकचिह्नरेखनम्() {
    const कीलकपटः = document.getElementById('कीलकचिह्नम्');
    if (!कीलकपटः) return;

    const सन्दर्भः = कीलकपटः.getContext('2d');
    सन्दर्भः.clearRect(0, 0, कीलकपटः.width, कीलकपटः.height);

    सन्दर्भः.strokeStyle = '#333333';
    सन्दर्भः.fillStyle = 'red';
    सन्दर्भः.lineWidth = 2;
    सन्दर्भः.lineJoin = 'round';

    // Draw the pentagon box (pointing right)
    सन्दर्भः.beginPath();
    सन्दर्भः.moveTo(4, 6);
    सन्दर्भः.lineTo(12, 6);
    सन्दर्भः.lineTo(16, 12);
    सन्दर्भः.lineTo(12, 18);
    सन्दर्भः.lineTo(4, 18);
    सन्दर्भः.closePath();
    सन्दर्भः.fill();
    सन्दर्भः.stroke();

    // Draw the pin line
    सन्दर्भः.beginPath();
    सन्दर्भः.moveTo(16, 12);
    सन्दर्भः.lineTo(22, 12);
    सन्दर्भः.stroke();

    // Draw connection node
    सन्दर्भः.beginPath();
    सन्दर्भः.arc(22, 12, 2.5, 0, Math.PI * 2);
    सन्दर्भः.fill();
}


// --- Sidebar Resizing Logic ---
function पट्टिकाविभाजकस्थापनम्() {
    const विभाजकवस्तु = document.getElementById('पट्टिकाविभाजकः');
    const तर्कद्वारपट्टिकावस्तु = document.getElementById('तर्कद्वारपट्टिका');

    if (!विभाजकवस्तु || !तर्कद्वारपट्टिकावस्तु) return;

    let पुनराकारःचलति = false; // Is Resizing active?

    विभाजकवस्तु.addEventListener('mousedown', function (सम्भवम्) {
        सम्भवम्.preventDefault(); // Prevent text selection while dragging
        पुनराकारःचलति = true;
        document.body.classList.add('पुनराकारः-सक्रियः');
        विभाजकवस्तु.classList.add('सक्रियः');
    });

    document.addEventListener('mousemove', function (सम्भवम्) {
        if (!पुनराकारःचलति) return;

        // सम्भवम्.clientX gives the mouse horizontal position relative to the screen
        const नूतनविस्तारः = सम्भवम्.clientX;
        तर्कद्वारपट्टिकावस्तु.style.width = नूतनविस्तारः + 'px';
    });

    document.addEventListener('mouseup', function () {
        if (पुनराकारःचलति) {
            पुनराकारःचलति = false;
            document.body.classList.remove('पुनराकारः-सक्रियः');
            विभाजकवस्तु.classList.remove('सक्रियः');
        }
    });
}


