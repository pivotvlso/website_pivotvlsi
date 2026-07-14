// --- NEW GATES LOGIC ---
window.getGatePins = function(type, withStubs = false) {
    if (type === 'not') {
        return withStubs ? 
            [ { x: -20, y: 0, stub_x: -40, stub_y: 0 }, { x: 30, y: 0, stub_x: 50, stub_y: 0 } ] : 
            [ { x: -20, y: 0 }, { x: 30, y: 0 } ];
    }
    return withStubs ? 
        [ { x: -20, y: -10, stub_x: -40, stub_y: -10 }, { x: -20, y: 10, stub_x: -40, stub_y: 10 }, { x: 30, y: 0, stub_x: 50, stub_y: 0 } ] : 
        [ { x: -20, y: -10 }, { x: -20, y: 10 }, { x: 30, y: 0 } ];
};

window.drawGate = function(सन्दर्भः, type, गुणकः, drawPins = true) {
    सन्दर्भः.beginPath();
    
    if (type === 'and' || type === 'nand') {
        सन्दर्भः.moveTo(-10, -15);
        सन्दर्भः.lineTo(5, -15);
        सन्दर्भः.arc(5, 0, 15, -Math.PI / 2, Math.PI / 2);
        सन्दर्भः.lineTo(-10, 15);
        सन्दर्भः.closePath();
    } else if (type === 'or' || type === 'nor' || type === 'xor' || type === 'xnor') {
        सन्दर्भः.moveTo(-10, -15);
        सन्दर्भः.quadraticCurveTo(5, -15, 15, 0);
        सन्दर्भः.quadraticCurveTo(5, 15, -10, 15);
        सन्दर्भः.quadraticCurveTo(0, 0, -10, -15);
        if (type === 'xor' || type === 'xnor') {
            सन्दर्भः.moveTo(-14, -15);
            सन्दर्भः.quadraticCurveTo(-4, 0, -14, 15);
        }
    } else if (type === 'not') {
        सन्दर्भः.moveTo(-10, -15);
        सन्दर्भः.lineTo(15, 0);
        सन्दर्भः.lineTo(-10, 15);
        सन्दर्भः.closePath();
    }
    सन्दर्भः.fill();
    सन्दर्भः.stroke();

    if (type === 'nand' || type === 'nor' || type === 'xnor' || type === 'not') {
        let circleX = (type === 'nand') ? 23 : 18;
        सन्दर्भः.beginPath();
        सन्दर्भः.arc(circleX, 0, 3, 0, Math.PI * 2);
        सन्दर्भः.fillStyle = 'rgba(22, 65, 192, 0.1)';
        सन्दर्भः.fill();
        सन्दर्भः.stroke();
    }

    if (!drawPins) return;
    // Pins
    सन्दर्भः.beginPath();
    if (type === 'not') {
        सन्दर्भः.moveTo(-20, 0);
        सन्दर्भः.lineTo(-10, 0);
    } else {
        let leftEdge = (type === 'or' || type === 'nor' || type === 'xor' || type === 'xnor') ? -5 : -10;
        let leftEdge2 = (type === 'or' || type === 'nor' || type === 'xor' || type === 'xnor') ? -5 : -10;
        if(type === 'xor' || type === 'xnor') { leftEdge = -9; leftEdge2 = -9; }
        
        सन्दर्भः.moveTo(-20, -10);
        सन्दर्भः.lineTo(leftEdge, -10);
        सन्दर्भः.moveTo(-20, 10);
        सन्दर्भः.lineTo(leftEdge2, 10);
    }
    let outStart = 20;
    if (type === 'nand') outStart = 26;
    else if (type === 'or' || type === 'xor') outStart = 15;
    else if (type === 'nor' || type === 'xnor' || type === 'not') outStart = 21;

    सन्दर्भः.moveTo(outStart, 0);
    सन्दर्भः.lineTo(30, 0);
    सन्दर्भः.stroke();

    सन्दर्भः.fillStyle = '#1641c0';
    सन्दर्भः.beginPath();
    if (type === 'not') {
        सन्दर्भः.arc(-20, 0, 2.5, 0, Math.PI * 2);
        सन्दर्भः.fill();
    } else {
        सन्दर्भः.arc(-20, -10, 2.5, 0, Math.PI * 2);
        सन्दर्भः.fill();
        सन्दर्भः.beginPath();
        सन्दर्भः.arc(-20, 10, 2.5, 0, Math.PI * 2);
        सन्दर्भः.fill();
    }
    सन्दर्भः.beginPath();
    सन्दर्भः.arc(30, 0, 2.5, 0, Math.PI * 2);
    सन्दर्भः.fill();
};

function setupGateButton(id, type, drawFn) {
    let btn = document.getElementById(id);
    if (btn) {
        // Safe binding
        btn.onclick = () => window.द्वारसंवादप्रारम्भः(type);
    }
    drawFn();
}

function drawIcon(id, type) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#333333';
    // Use a transparent fill for toolbar icons to match the original style
    ctx.fillStyle = 'transparent';
    // Use line width 4, because scale(0.5, 0.5) will halve it to 2px, which matches the original icon thickness!
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.save();
    ctx.translate(12, 12);
    ctx.scale(0.35, 0.35);
    window.drawGate(ctx, type, 1, true); // true = draw pins for toolbar icons!
    ctx.restore();
}

// Intercept window load to setup buttons
let oldLoad = window.onload;
window.onload = function(e) {
    if(oldLoad) oldLoad(e);
    
    let btnMap = {
        'संयोगद्वारकुञ्जिका': { id: 'संयोगद्वारचिह्नम्', type: 'and' },
        'विकल्पद्वारकुञ्जिका': { id: 'विकल्पद्वारचिह्नम्', type: 'or' },
        'नद्वारकुञ्जिका': { id: 'नद्वारचिह्नम्', type: 'not' },
        'नसंयोगद्वारकुञ्जिका': { id: 'नसंयोगद्वारचिह्नम्', type: 'nand' },
        'नविकल्पद्वारकुञ्जिका': { id: 'नविकल्पद्वारचिह्नम्', type: 'nor' },
        'विशिष्टविकल्पद्वारकुञ्जिका': { id: 'विशिष्टविकल्पद्वारचिह्नम्', type: 'xor' },
        'विशिष्टनविकल्पद्वारकुञ्जिका': { id: 'विशिष्टनविकल्पद्वारचिह्नम्', type: 'xnor' }
    };
    for (let key in btnMap) {
        setupGateButton(key, btnMap[key].type, () => drawIcon(btnMap[key].id, btnMap[key].type));
    }
    
    let okBtn = document.getElementById('द्वार_स्वीकारकुञ्जिका');
    if (okBtn) {
        let clone = okBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(clone, okBtn);
        clone.addEventListener('click', window.द्वारस्थापनप्रारम्भः || function(){});
    }
    
};

