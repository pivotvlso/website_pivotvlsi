function पाठ्यक्रमान्_दर्शयतु() {
    const पात्रम् = document.getElementById('पाठ्यक्रम-पात्रम्');
    
    // Simulate a delay (e.g., fetching from GitHub or Zoho)
    setTimeout(() => {
        पात्रम्.innerHTML = `
            <div class="कार्यक्रम-पत्रकम्">ASIC Design & Verification</div>
            <div class="कार्यक्रम-पत्रकम्">FPGA Prototyping</div>
            <div class="कार्यक्रम-पत्रकम्">RTL Design (Verilog/VHDL)</div>
        `;
    }, 1500); // 1.5 second loading feel
}

window.onload = पाठ्यक्रमान्_दर्शयतु;