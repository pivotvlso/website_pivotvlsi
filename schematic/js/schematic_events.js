function सामान्यस्थित्यागमनम्() {
    window.सामान्यस्थित्यागमनम्();
}

window.गुणकः = 1;
window.अस्थायीतन्तवः = [];
window.स्थापितास्तन्तवः = [];
window.सक्रियतन्तुस्थापनम् = false;
window.चितास्तन्तवः = [];
window.चयनपेटी = null;
window.मार्जन_प्रकारः = false;
window.प्रतिकृति_प्रकारः = false;
window.प्रतिकृति_तन्तवः = [];
window.प्रतिकृति_मूल_बिन्दुः = null;
window.प्रतिकृति_अस्थायीतन्तवः = [];
window.सक्रियकीलकस्थापनम् = false;
window.वर्तमानकीलकनाम = "";
window.वर्तमानकीलकप्रकारः = "निवेशः";
window.स्थापिताःकीलाः = [];
window.चिताःकीलाः = [];
window.प्रतिकृति_कीलाः = [];
window.प्रतिकृति_अस्थायीकीलाः = [];
window.अस्थायीकीलकः = null;
window.सक्रियद्वारस्थापनम् = false;
window.वर्तमानद्वारनाम = "";
window.वर्तमानद्वारकोणः = 0; // 0, 90, 180, 270
window.स्थापितानिद्वाराणि = [];
window.चितानिद्वाराणि = [];
window.प्रतिकृति_द्वाराणि = [];
window.प्रतिकृति_अस्थायीद्वाराणि = [];
window.अस्थायीद्वारम् = null;

window.द्वाररेखनम् = function () {
    const पटः = document.getElementById('तर्कद्वारपटः');
    if (!पटः) return;

    const सन्दर्भः = पटः.getContext('2d');
    // Clear the canvas every time we move the mouse so we don't leave a trail
    सन्दर्भः.clearRect(0, 0, पटः.width, पटः.height);

    सन्दर्भः.save();
    सन्दर्भः.scale(window.गुणकः, window.गुणकः);

    // 1. Draw saved wires
    सन्दर्भः.lineWidth = 2 / window.गुणकः;
    for (let तन्तु of window.स्थापितास्तन्तवः) {
        if (window.चितास्तन्तवः && window.चितास्तन्तवः.includes(तन्तु)) {
            सन्दर्भः.strokeStyle = '#ff0000'; // Red for selected wires
        } else {
            सन्दर्भः.strokeStyle = '#333333';
        }
        सन्दर्भः.beginPath();
        सन्दर्भः.moveTo(तन्तु.प्रारम्भः.क, तन्तु.प्रारम्भः.त);
        सन्दर्भः.lineTo(तन्तु.अन्तम्.क, तन्तु.अन्तम्.त);
        सन्दर्भः.stroke();
    }

    // 1.1 Draw Gates
    let सर्वे_द्वाराणि = [...window.स्थापितानिद्वाराणि];
    if (window.सक्रियद्वारस्थापनम् && window.अस्थायीद्वारम्) {
        सर्वे_द्वाराणि.push(window.अस्थायीद्वारम्);
    }
    if (window.प्रतिकृति_प्रकारः && window.प्रतिकृति_अस्थायीद्वाराणि) {
        सर्वे_द्वाराणि = सर्वे_द्वाराणि.concat(window.प्रतिकृति_अस्थायीद्वाराणि);
    }

    सन्दर्भः.textAlign = 'center';
    सन्दर्भः.textBaseline = 'middle';

    for (let द्वार of सर्वे_द्वाराणि) {
        सन्दर्भः.save();
        सन्दर्भः.translate(द्वार.क, द्वार.त);
        सन्दर्भः.rotate(द्वार.कोणः * Math.PI / 180);

        if (द्वार.लम्बप्रतिबिम्बः) {
            सन्दर्भः.scale(1, -1);
        }

        let isTempCopy = window.प्रतिकृति_अस्थायीद्वाराणि && window.प्रतिकृति_अस्थायीद्वाराणि.includes(द्वार);
        if (isTempCopy) {
            सन्दर्भः.globalAlpha = 0.5;
        }

        सन्दर्भः.strokeStyle = (window.चितानिद्वाराणि && window.चितानिद्वाराणि.includes(द्वार)) ? '#ff0000' : '#333333';
        सन्दर्भः.fillStyle = 'rgba(22, 65, 192, 0.1)';
        सन्दर्भः.lineWidth = 2 / window.गुणकः;
        सन्दर्भः.lineJoin = 'round';

        window.drawGate(सन्दर्भः, द्वार.प्रकारः || 'and', window.गुणकः);

        सन्दर्भः.restore();

        // Draw text unrotated, but offset position based on rotation angle
        let textAngle = (द्वार.कोणः || 0) * Math.PI / 180;
        let textX = -30 * Math.sin(textAngle);
        let textY = 30 * Math.cos(textAngle);

        सन्दर्भः.save();
        सन्दर्भः.translate(द्वार.क + textX, द्वार.त + textY);
        if (isTempCopy) सन्दर्भः.globalAlpha = 0.5;
        सन्दर्भः.fillStyle = '#334155';
        सन्दर्भः.font = (12 / window.गुणकः) + 'px Inter';
        सन्दर्भः.textAlign = 'center';
        सन्दर्भः.textBaseline = 'middle';
        let नाम = द्वार.नाम || '';
        सन्दर्भः.fillText(नाम, 0, 0);
        सन्दर्भः.restore();
    }

    // 1.2. Draw Pins
    सन्दर्भः.font = (12 / window.गुणकः) + 'px Inter';
    सन्दर्भः.textAlign = 'center';
    सन्दर्भः.textBaseline = 'middle';

    let सर्वे_कीलाः = [...window.स्थापिताःकीलाः];
    if (window.सक्रियकीलकस्थापनम् && window.अस्थायीकीलकः) {
        सर्वे_कीलाः.push(window.अस्थायीकीलकः);
    }

    for (let कीलक of सर्वे_कीलाः) {
        let क = कीलक.क;
        let त = कीलक.त;
        let नाम = कीलक.नाम || '';
        let प्रकारः = कीलक.प्रकारः;

        let boxWidth = 20 / window.गुणकः;
        let boxHeight = 20 / window.गुणकः;
        let tipOffset = 8 / window.गुणकः;

        सन्दर्भः.fillStyle = 'red';
        if (window.चिताःकीलाः && window.चिताःकीलाः.includes(कीलक)) {
            सन्दर्भः.strokeStyle = '#ff0000'; // Highlight selected pin
            सन्दर्भः.lineWidth = 2.5 / window.गुणकः;
        } else {
            सन्दर्भः.strokeStyle = '#333333';
            सन्दर्भः.lineWidth = 1.5 / window.गुणकः;
        }

        सन्दर्भः.beginPath();
        if (प्रकारः === 'निवेशः') {
            let rightTipX = क - (10 / window.गुणकः);
            let topY = त - (boxHeight / 2);
            let bottomY = त + (boxHeight / 2);
            let leftX = rightTipX - boxWidth;
            let squareRightX = rightTipX - tipOffset;

            सन्दर्भः.moveTo(leftX, topY);
            सन्दर्भः.lineTo(squareRightX, topY);
            सन्दर्भः.lineTo(rightTipX, त);
            सन्दर्भः.lineTo(squareRightX, bottomY);
            सन्दर्भः.lineTo(leftX, bottomY);
            सन्दर्भः.closePath();
        } else {
            let leftTipX = क + (10 / window.गुणकः);
            let topY = त - (boxHeight / 2);
            let bottomY = त + (boxHeight / 2);
            let rightX = leftTipX + boxWidth;
            let squareLeftX = leftTipX + tipOffset;

            सन्दर्भः.moveTo(rightX, topY);
            सन्दर्भः.lineTo(squareLeftX, topY);
            सन्दर्भः.lineTo(leftTipX, त);
            सन्दर्भः.lineTo(squareLeftX, bottomY);
            सन्दर्भः.lineTo(rightX, bottomY);
            सन्दर्भः.closePath();
        }
        सन्दर्भः.fill();
        सन्दर्भः.stroke();

        // Draw text outside the pad
        सन्दर्भः.fillStyle = '#334155';
        if (प्रकारः === 'निवेशः') {
            सन्दर्भः.textAlign = 'right';
            सन्दर्भः.fillText(नाम, क - (10 / window.गुणकः) - boxWidth - (5 / window.गुणकः), त);
        } else {
            सन्दर्भः.textAlign = 'left';
            सन्दर्भः.fillText(नाम, क + (10 / window.गुणकः) + boxWidth + (5 / window.गुणकः), त);
        }

        // Draw stub
        सन्दर्भः.beginPath();
        if (प्रकारः === 'निवेशः') {
            सन्दर्भः.moveTo(क - (10 / window.गुणकः), त);
            सन्दर्भः.lineTo(क, त);
        } else {
            सन्दर्भः.moveTo(क, त);
            सन्दर्भः.lineTo(क + (10 / window.गुणकः), त);
        }
        सन्दर्भः.stroke();

        // Draw connection blue dot
        सन्दर्भः.beginPath();
        सन्दर्भः.arc(क, त, 2.5 / window.गुणकः, 0, Math.PI * 2);
        सन्दर्भः.fillStyle = '#1641c0';
        सन्दर्भः.fill();

        // Connection point
        if (window.सक्रियतन्तुस्थापनम्) {
            सन्दर्भः.fillStyle = '#1641c0';
            सन्दर्भः.beginPath();
            सन्दर्भः.arc(क, त, 2.5 / window.गुणकः, 0, Math.PI * 2);
            सन्दर्भः.fill();
        }
    }

    // Global drawing configuration dots (blue dots) for junctions >= 3 connections
    let सर्वे_तन्तवः = window.स्थापितास्तन्तवः.concat(window.अस्थायीतन्तवः || []);
    let बिन्दवः = {};
    for (let तन्तु of सर्वे_तन्तवः) {
        if (तन्तु.प्रारम्भः.क === तन्तु.अन्तम्.क && तन्तु.प्रारम्भः.त === तन्तु.अन्तम्.त) continue;
        let बिन्दु१ = तन्तु.प्रारम्भः.क + ',' + तन्तु.प्रारम्भः.त;
        let बिन्दु२ = तन्तु.अन्तम्.क + ',' + तन्तु.अन्तम्.त;
        बिन्दवः[बिन्दु१] = { क: तन्तु.प्रारम्भः.क, त: तन्तु.प्रारम्भः.त };
        बिन्दवः[बिन्दु२] = { क: तन्तु.अन्तम्.क, त: तन्तु.अन्तम्.त };
    }

    सन्दर्भः.fillStyle = '#1641c0';
    for (let कुञ्जी in बिन्दवः) {
        let बिन्दु = बिन्दवः[कुञ्जी];
        let सन्धि_सङ्ख्या = 0;
        let क = बिन्दु.क, त = बिन्दु.त;

        for (let तन्तु of सर्वे_तन्तवः) {
            let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
            let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;

            if (क1 === क2 && त1 === त2) continue;

            let अतिव्याप्तम् = false;
            if (त1 === त2 && त === त1 && क >= Math.min(क1, क2) && क <= Math.max(क1, क2)) {
                अतिव्याप्तम् = true;
            } else if (क1 === क2 && क === क1 && त >= Math.min(त1, त2) && त <= Math.max(त1, त2)) {
                अतिव्याप्तम् = true;
            }

            if (अतिव्याप्तम्) {
                if ((क === क1 && त === त1) || (क === क2 && त === त2)) {
                    सन्धि_सङ्ख्या += 1;
                } else {
                    सन्धि_सङ्ख्या += 2;
                }
            }
        }

        if (सन्धि_सङ्ख्या >= 3) {
            सन्दर्भः.beginPath();
            सन्दर्भः.arc(क, त, 2.5 / window.गुणकः, 0, Math.PI * 2);
            सन्दर्भः.fill();
        }
    }

    // (Moved Hover Snap Indicator to below temporary wires)

    // 1.7 Draw temp copy pins
    if (window.प्रतिकृति_प्रकारः && window.प्रतिकृति_अस्थायीकीलाः) {
        सन्दर्भः.globalAlpha = 0.5;
        for (let कीलक of window.प्रतिकृति_अस्थायीकीलाः) {
            let क = कीलक.क;
            let त = कीलक.त;
            let नाम = कीलक.नाम || '';
            let प्रकारः = कीलक.प्रकारः;

            let boxWidth = 20 / window.गुणकः;
            let boxHeight = 20 / window.गुणकः;
            let tipOffset = 8 / window.गुणकः;

            सन्दर्भः.fillStyle = 'red';
            सन्दर्भः.strokeStyle = '#333333';
            सन्दर्भः.lineWidth = 1.5 / window.गुणकः;

            सन्दर्भः.beginPath();
            if (प्रकारः === 'निवेशः') {
                let rightTipX = क - (10 / window.गुणकः);
                let topY = त - (boxHeight / 2);
                let bottomY = त + (boxHeight / 2);
                let leftX = rightTipX - boxWidth;
                let squareRightX = rightTipX - tipOffset;

                सन्दर्भः.moveTo(leftX, topY);
                सन्दर्भः.lineTo(squareRightX, topY);
                सन्दर्भः.lineTo(rightTipX, त);
                सन्दर्भः.lineTo(squareRightX, bottomY);
                सन्दर्भः.lineTo(leftX, bottomY);
                सन्दर्भः.closePath();
            } else {
                let leftTipX = क + (10 / window.गुणकः);
                let topY = त - (boxHeight / 2);
                let bottomY = त + (boxHeight / 2);
                let rightX = leftTipX + boxWidth;
                let squareLeftX = leftTipX + tipOffset;

                सन्दर्भः.moveTo(rightX, topY);
                सन्दर्भः.lineTo(squareLeftX, topY);
                सन्दर्भः.lineTo(leftTipX, त);
                सन्दर्भः.lineTo(squareLeftX, bottomY);
                सन्दर्भः.lineTo(rightX, bottomY);
                सन्दर्भः.closePath();
            }
            सन्दर्भः.fill();

            सन्दर्भः.beginPath();
            if (प्रकारः === 'निवेशः') {
                सन्दर्भः.moveTo(क - (10 / window.गुणकः), त);
                सन्दर्भः.lineTo(क, त);
            } else {
                सन्दर्भः.moveTo(क, त);
                सन्दर्भः.lineTo(क + (10 / window.गुणकः), त);
            }
            सन्दर्भः.stroke();

            // Draw connection blue dot
            सन्दर्भः.beginPath();
            सन्दर्भः.arc(क, त, 2.5 / window.गुणकः, 0, Math.PI * 2);
            सन्दर्भः.fillStyle = '#1641c0';
            सन्दर्भः.fill();

            // Text
            सन्दर्भः.fillStyle = '#334155';
            if (प्रकारः === 'निवेशः') {
                सन्दर्भः.textAlign = 'right';
                सन्दर्भः.fillText(नाम + '_1', क - (10 / window.गुणकः) - boxWidth - (5 / window.गुणकः), त);
            } else {
                सन्दर्भः.textAlign = 'left';
                सन्दर्भः.fillText(नाम + '_1', क + (10 / window.गुणकः) + boxWidth + (5 / window.गुणकः), त);
            }
        }
        सन्दर्भः.globalAlpha = 1.0;
    }

    // 2. Draw the temporary wires currently following the mouse
    if (window.अस्थायीतन्तवः && window.अस्थायीतन्तवः.length > 0) {
        सन्दर्भः.strokeStyle = '#1641c0'; // Blue for active wire
        सन्दर्भः.lineWidth = 2 / window.गुणकः;
        for (let तन्तु of window.अस्थायीतन्तवः) {
            सन्दर्भः.beginPath();
            सन्दर्भः.moveTo(तन्तु.प्रारम्भः.क, तन्तु.प्रारम्भः.त);
            सन्दर्भः.lineTo(तन्तु.अन्तम्.क, तन्तु.अन्तम्.त);
            सन्दर्भः.stroke();
        }
    }
    // 2.2. Draw Hover Snap Indicator (Moved here to be ON TOP of active wires)
    if (window.सक्रियतन्तुस्थापनम् && window.समीपस्थबिन्दुः) {
        सन्दर्भः.fillStyle = '#FFD700'; // Yellow
        let क = window.समीपस्थबिन्दुः.क;
        let त = window.समीपस्थबिन्दुः.त;
        let आकारः = 5 / window.गुणकः; // Size of the diamond

        सन्दर्भः.beginPath();
        सन्दर्भः.moveTo(क, त - आकारः); // Top
        सन्दर्भः.lineTo(क + आकारः, त); // Right
        सन्दर्भः.lineTo(क, त + आकारः); // Bottom
        सन्दर्भः.lineTo(क - आकारः, त); // Left
        सन्दर्भः.closePath();
        सन्दर्भः.fill();

        सन्दर्भः.strokeStyle = '#333333';
        सन्दर्भः.lineWidth = 1 / window.गुणकः;
        सन्दर्भः.stroke();
    }

    // 2.5. Draw Copy Mode ghost wires
    if (window.प्रतिकृति_प्रकारः && window.प्रतिकृति_अस्थायीतन्तवः && window.प्रतिकृति_अस्थायीतन्तवः.length > 0) {
        सन्दर्भः.strokeStyle = '#00a86b'; // Distinct green/blue for safe drop
        सन्दर्भः.lineWidth = 2 / window.गुणकः;
        सन्दर्भः.setLineDash([5 / window.गुणकः, 5 / window.गुणकः]);
        for (let तन्तु of window.प्रतिकृति_अस्थायीतन्तवः) {
            सन्दर्भः.beginPath();
            सन्दर्भः.moveTo(तन्तु.प्रारम्भः.क, तन्तु.प्रारम्भः.त);
            सन्दर्भः.lineTo(तन्तु.अन्तम्.क, तन्तु.अन्तम्.त);
            सन्दर्भः.stroke();
        }
        सन्दर्भः.setLineDash([]); // Reset line dash
    }

    // 3. Draw Selection Box
    if (window.चयनपेटी) {
        सन्दर्भः.fillStyle = 'rgba(22, 65, 192, 0.2)';
        सन्दर्भः.strokeStyle = 'blue';
        सन्दर्भः.lineWidth = 1 / window.गुणकः;
        सन्दर्भः.setLineDash([5 / window.गुणकः, 5 / window.गुणकः]);

        let minX = Math.min(window.चयनपेटी.प्रारम्भ_क, window.चयनपेटी.वर्तमान_क);
        let minY = Math.min(window.चयनपेटी.प्रारम्भ_त, window.चयनपेटी.वर्तमान_त);
        let width = Math.abs(window.चयनपेटी.वर्तमान_क - window.चयनपेटी.प्रारम्भ_क);
        let height = Math.abs(window.चयनपेटी.वर्तमान_त - window.चयनपेटी.प्रारम्भ_त);

        सन्दर्भः.fillRect(minX, minY, width, height);
        सन्दर्भः.strokeRect(minX, minY, width, height);
        सन्दर्भः.setLineDash([]); // Reset line dash for other drawings
    }

    सन्दर्भः.restore();
}

function तन्तुस्थापनप्रारम्भः() {
    window.सक्रियतन्तुस्थापनम् = true;
    window.सक्रियद्वारस्थापनम् = false;
    window.मार्जन_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    document.body.classList.add('तन्तु-प्रकारः');
    document.getElementById('तर्कद्वारपटः').style.cursor = '';
}

function सामान्यस्थित्यागमनम्() {
    window.सक्रियतन्तुस्थापनम् = false;
    window.मार्जन_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    window.विस्तार_प्रकारः = false;
    window.संकोच_प्रकारः = false;
    window.सक्रियकीलकस्थापनम् = false;
    window.चिताःकीलाः = [];
    window.प्रतिकृति_कीलाः = [];
    window.अस्थायीकीलकः = null;
    window.प्रतिकृति_अस्थायीकीलाः = [];
    window.चितानिद्वाराणि = [];
    window.अस्थायीद्वारम् = null;
    window.सक्रियद्वारस्थापनम् = false;
    window.प्रतिकृति_द्वाराणि = [];
    window.प्रतिकृति_अस्थायीद्वाराणि = [];
    window.अस्थायीतन्तवः = []; // Clear the temporary drawing wires
    window.तन्तु_मूल_बिन्दुः = null;
    window.प्रतिकृति_अस्थायीतन्तवः = [];
    window.समीपस्थबिन्दुः = null; // Clear snap point
    document.body.classList.remove('तन्तु-प्रकारः');
    window.आकृष्यमाणतन्तुः = null;
    window.आकृष्यमाणकीलकः = null;
    window.कर्षण_मूल_अवस्था = null;
    window.सम्पाद्यमानद्वारम् = null;
    document.getElementById('तर्कद्वारपटः').style.cursor = '';

    // Hide Pin and Gate Dialogs if open
    const कीलकसंवादपृष्ठभूमिः = document.getElementById('कीलकसंवादपृष्ठभूमिः');
    if (कीलकसंवादपृष्ठभूमिः) कीलकसंवादपृष्ठभूमिः.classList.add('गुप्तम्');

    const द्वारसंवादपृष्ठभूमिः = document.getElementById('द्वारसंवादपृष्ठभूमिः');
    if (द्वारसंवादपृष्ठभूमिः) द्वारसंवादपृष्ठभूमिः.classList.add('गुप्तम्');

    // Redraw to clear temporary wires off the screen
    if (window.द्वाररेखनम्) window.द्वाररेखनम्();
}

function कीलकसंवादप्रारम्भः() {
    सामान्यस्थित्यागमनम्();
    const कीलकसंवादपृष्ठभूमिः = document.getElementById('कीलकसंवादपृष्ठभूमिः');
    const कीलकनाम = document.getElementById('कीलकनाम');
    if (कीलकसंवादपृष्ठभूमिः) {
        कीलकसंवादपृष्ठभूमिः.classList.remove('गुप्तम्');
        if (कीलकनाम) {
            कीलकनाम.classList.remove('error-highlight');
            कीलकनाम.value = '';
            कीलकनाम.focus();
        }
    }
}

function कीलकस्थापनप्रारम्भः() {
    const कीलकनाम_इन्पुट = document.getElementById('कीलकनाम');
    const कीलकनाम = कीलकनाम_इन्पुट.value.trim();
    const validNameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;
    if (!कीलकनाम || !validNameRegex.test(कीलकनाम)) {
        कीलकनाम_इन्पुट.classList.add('error-highlight');

        // Remove the animation class and re-add it to trigger the shake animation again if clicked multiple times
        कीलकनाम_इन्पुट.classList.remove('error-highlight');
        void कीलकनाम_इन्पुट.offsetWidth; // Trigger reflow
        कीलकनाम_इन्पुट.classList.add('error-highlight');

        कीलकनाम_इन्पुट.focus();
        return;
    }
    कीलकनाम_इन्पुट.classList.remove('error-highlight');
    const कीलकदिशा = document.getElementById('कीलकदिशा').value;

    document.getElementById('कीलकसंवादपृष्ठभूमिः').classList.add('गुप्तम्');

    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियद्वारस्थापनम् = false;
    window.मार्जन_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    window.सक्रियकीलकस्थापनम् = true;
    window.वर्तमानकीलकनाम = कीलकनाम;
    window.वर्तमानकीलकप्रकारः = कीलकदिशा;

    document.getElementById('तर्कद्वारपटः').style.cursor = 'crosshair';
}

function द्वारसंवादप्रारम्भः(प्रकारः) {
    सामान्यस्थित्यागमनम्();

    let gateCount = (window.स्थापितानिद्वाराणि ? window.स्थापितानिद्वाराणि.length : 0) + 1;
    let द्वारनाम = "U" + gateCount;

    let exists = true;
    while (exists) {
        exists = window.स्थापितानिद्वाराणि && window.स्थापितानिद्वाराणि.some(g => g.नाम === द्वारनाम);
        if (exists) {
            gateCount++;
            द्वारनाम = "U" + gateCount;
        }
    }

    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियकीलकस्थापनम् = false;
    window.मार्जन_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    window.सक्रियद्वारस्थापनम् = true;
    window.वर्तमानद्वारनाम = द्वारनाम;
    window.वर्तमानद्वारकोणः = 0;
    if (typeof प्रकारः === 'string') window.वर्तमानद्वारप्रकारः = प्रकारः; // Default orientation (right facing)
    window.वर्तमानद्वारलम्बप्रतिबिम्बः = false;

    document.getElementById('तर्कद्वारपटः').style.cursor = 'crosshair';
}

function द्वारसम्पादनप्रारम्भः() {
    if (window.चितानिद्वाराणि && window.चितानिद्वाराणि.length === 1) {
        let चितद्वार = window.चितानिद्वाराणि[0];
        const द्वारसंवादपृष्ठभूमिः = document.getElementById('द्वारसंवादपृष्ठभूमिः');
        const द्वारनाम = document.getElementById('द्वारनाम');
        if (द्वारसंवादपृष्ठभूमिः && द्वारनाम) {
            द्वारसंवादपृष्ठभूमिः.classList.remove('गुप्तम्');
            द्वारनाम.value = चितद्वार.नाम;
            द्वारनाम.classList.remove('error-highlight');
            द्वारनाम.focus();
            window.सम्पाद्यमानद्वारम् = चितद्वार;
        }
    }
}

function द्वारस्थापनप्रारम्भः() {
    const द्वारनाम_इन्पुट = document.getElementById('द्वारनाम');
    const द्वारनाम = द्वारनाम_इन्पुट.value.trim();
    const validNameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;
    if (!द्वारनाम || !validNameRegex.test(द्वारनाम)) {
        द्वारनाम_इन्पुट.classList.add('error-highlight');
        द्वारनाम_इन्पुट.classList.remove('error-highlight');
        void द्वारनाम_इन्पुट.offsetWidth; // Trigger reflow
        द्वारनाम_इन्पुट.classList.add('error-highlight');
        द्वारनाम_इन्पुट.focus();
        return;
    }
    द्वारनाम_इन्पुट.classList.remove('error-highlight');

    document.getElementById('द्वारसंवादपृष्ठभूमिः').classList.add('गुप्तम्');

    if (window.सम्पाद्यमानद्वारम्) {
        window.सम्पाद्यमानद्वारम्.नाम = द्वारनाम;
        window.सम्पाद्यमानद्वारम् = null;
        if (window.द्वाररेखनम्) window.द्वाररेखनम्();
        return;
    }

    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियकीलकस्थापनम् = false;
    window.मार्जन_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    window.सक्रियद्वारस्थापनम् = true;
    window.वर्तमानद्वारनाम = द्वारनाम;
    window.वर्तमानद्वारकोणः = 0;
    // Removed buggy reference to undefined variable प्रकारः

    document.getElementById('तर्कद्वारपटः').style.cursor = 'crosshair';
}

function विस्तारप्रकारप्रारम्भः() { // Zoom Out
    window.विस्तार_प्रकारः = true;
    window.संकोच_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    window.मार्जन_प्रकारः = false;
    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियद्वारस्थापनम् = false;
    window.अस्थायीतन्तवः = [];
    window.प्रतिकृति_अस्थायीतन्तवः = [];
    window.समीपस्थबिन्दुः = null;
    window.आकृष्यमाणतन्तुः = null;
    window.कर्षण_मूल_अवस्था = null;
    document.body.classList.remove('तन्तु-प्रकारः');
    const svgZoomOut = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M7 9h5v1H7z" fill="black"/></svg>`;
    document.getElementById('तर्कद्वारपटः').style.cursor = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgZoomOut)}") 10 10, zoom-out`;
    window.द्वाररेखनम्();
}

function संकोचप्रकारप्रारम्भः() { // Zoom In
    window.संकोच_प्रकारः = true;
    window.विस्तार_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    window.मार्जन_प्रकारः = false;
    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियद्वारस्थापनम् = false;
    window.अस्थायीतन्तवः = [];
    window.प्रतिकृति_अस्थायीतन्तवः = [];
    window.समीपस्थबिन्दुः = null;
    window.आकृष्यमाणतन्तुः = null;
    window.कर्षण_मूल_अवस्था = null;
    document.body.classList.remove('तन्तु-प्रकारः');
    const svgZoomIn = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" fill="black"/></svg>`;
    document.getElementById('तर्कद्वारपटः').style.cursor = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgZoomIn)}") 10 10, zoom-in`;
    window.द्वाररेखनम्();
}

function अनुकूलविस्तारप्रारम्भः() { // Zoom Fit
    if (!window.स्थापितास्तन्तवः || window.स्थापितास्तन्तवः.length === 0) {
        window.विस्तारप्रतिशतम् = 100;
        if (window.विस्तारप्रयोगः) window.विस्तारप्रयोगः();
        let पटपात्रवस्तु = document.getElementById('पटपात्रम्');
        if (पटपात्रवस्तु) {
            पटपात्रवस्तु.scrollLeft = 0;
            पटपात्रवस्तु.scrollTop = 0;
        }
        return;
    }

    let न्यूनतम_क = Infinity, न्यूनतम_त = Infinity, अधिकतम_क = -Infinity, अधिकतम_त = -Infinity;
    for (let तन्तु of window.स्थापितास्तन्तवः) {
        न्यूनतम_क = Math.min(न्यूनतम_क, तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
        न्यूनतम_त = Math.min(न्यूनतम_त, तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);
        अधिकतम_क = Math.max(अधिकतम_क, तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
        अधिकतम_त = Math.max(अधिकतम_त, तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);
    }

    // Add a bit of padding around the bounding box (e.g., 20px in raw coordinates)
    न्यूनतम_क -= 20; न्यूनतम_त -= 20; अधिकतम_क += 20; अधिकतम_त += 20;
    let पेटीविस्तारः = Math.max(1, अधिकतम_क - न्यूनतम_क);
    let पेटीऔन्नत्यम् = Math.max(1, अधिकतम_त - न्यूनतम_त);

    let पटपात्रवस्तु = document.getElementById('पटपात्रम्');
    if (!पटपात्रवस्तु) return;

    let दृश्यविस्तारः = पटपात्रवस्तु.clientWidth;
    let दृश्यऔन्नत्यम् = पटपात्रवस्तु.clientHeight;

    let क_विस्तारप्रतिशतम् = (दृश्यविस्तारः / पेटीविस्तारः) * 100;
    let त_विस्तारप्रतिशतम् = (दृश्यऔन्नत्यम् / पेटीऔन्नत्यम्) * 100;

    let नूतनप्रतिशतम् = Math.min(क_विस्तारप्रतिशतम्, त_विस्तारप्रतिशतम्);
    // Round to nearest 5 and clamp
    नूतनप्रतिशतम् = Math.round(नूतनप्रतिशतम् / 5) * 5;
    window.विस्तारप्रतिशतम् = Math.max(10, Math.min(1000, नूतनप्रतिशतम्));

    if (window.विस्तारप्रयोगः) window.विस्तारप्रयोगः();

    // Now center the bounding box in the viewport
    let विस्तारित_न्यूनतम_क = न्यूनतम_क * (window.विस्तारप्रतिशतम् / 100);
    let विस्तारित_न्यूनतम_त = न्यूनतम_त * (window.विस्तारप्रतिशतम् / 100);
    let विस्तारितपेटीविस्तारः = पेटीविस्तारः * (window.विस्तारप्रतिशतम् / 100);
    let विस्तारितपेटीऔन्नत्यम् = पेटीऔन्नत्यम् * (window.विस्तारप्रतिशतम् / 100);

    पटपात्रवस्तु.scrollLeft = विस्तारित_न्यूनतम_क - (दृश्यविस्तारः - विस्तारितपेटीविस्तारः) / 2;
    पटपात्रवस्तु.scrollTop = विस्तारित_न्यूनतम_त - (दृश्यऔन्नत्यम् - विस्तारितपेटीऔन्नत्यम्) / 2;
}

function मार्जनप्रकारप्रारम्भः() {
    if (window.चितास्तन्तवः && window.चितास्तन्तवः.length > 0) {
        window.स्थापितास्तन्तवः = window.स्थापितास्तन्तवः.filter(w => !window.चितास्तन्तवः.includes(w));
        window.चितास्तन्तवः = [];
    }
    if (window.चिताःकीलाः && window.चिताःकीलाः.length > 0) {
        window.स्थापिताःकीलाः = window.स्थापिताःकीलाः.filter(p => !window.चिताःकीलाः.includes(p));
        window.चिताःकीलाः = [];
    }

    window.मार्जन_प्रकारः = true;
    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियद्वारस्थापनम् = false;
    window.प्रतिकृति_प्रकारः = false;
    window.अस्थायीतन्तवः = [];
    window.प्रतिकृति_अस्थायीतन्तवः = [];
    window.समीपस्थबिन्दुः = null;
    window.आकृष्यमाणतन्तुः = null;
    window.कर्षण_मूल_अवस्था = null;
    document.body.classList.remove('तन्तु-प्रकारः');

    // Custom red 'X' cursor
    const svgX = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="red"/></svg>`;
    const cursorUrl = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgX)}") 12 12, auto`;
    document.getElementById('तर्कद्वारपटः').style.cursor = cursorUrl;

    window.द्वाररेखनम्();
}

function प्रतिकृतिप्रकारप्रारम्भः() {
    window.प्रतिकृति_प्रकारः = true;
    window.मार्जन_प्रकारः = false;
    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियद्वारस्थापनम् = false;
    window.अस्थायीतन्तवः = [];
    window.समीपस्थबिन्दुः = null;
    window.आकृष्यमाणतन्तुः = null;
    window.कर्षण_मूल_अवस्था = null;
    document.body.classList.remove('तन्तु-प्रकारः');

    let न्यूनतम_क = Infinity, न्यूनतम_त = Infinity;

    if (window.चितास्तन्तवः && window.चितास्तन्तवः.length > 0) {
        // Deep copy the selected wires
        window.प्रतिकृति_तन्तवः = window.चितास्तन्तवः.map(w => ({
            प्रारम्भः: { क: w.प्रारम्भः.क, त: w.प्रारम्भः.त },
            अन्तम्: { क: w.अन्तम्.क, त: w.अन्तम्.त }
        }));

        for (let w of window.प्रतिकृति_तन्तवः) {
            न्यूनतम_क = Math.min(न्यूनतम_क, w.प्रारम्भः.क, w.अन्तम्.क);
            न्यूनतम_त = Math.min(न्यूनतम_त, w.प्रारम्भः.त, w.अन्तम्.त);
        }
    } else {
        window.प्रतिकृति_तन्तवः = [];
    }

    if (window.चिताःकीलाः && window.चिताःकीलाः.length > 0) {
        window.प्रतिकृति_कीलाः = window.चिताःकीलाः.map(p => ({
            क: p.क, त: p.त, नाम: p.नाम, प्रकारः: p.प्रकारः
        }));

        for (let p of window.प्रतिकृति_कीलाः) {
            न्यूनतम_क = Math.min(न्यूनतम_क, p.क);
            न्यूनतम_त = Math.min(न्यूनतम_त, p.त);
        }
    } else {
        window.प्रतिकृति_कीलाः = [];
    }

    if (window.चितानिद्वाराणि && window.चितानिद्वाराणि.length > 0) {
        window.प्रतिकृति_द्वाराणि = window.चितानिद्वाराणि.map(g => ({
            क: g.क, त: g.त, नाम: g.नाम, कोणः: g.कोणः
        }));

        for (let g of window.प्रतिकृति_द्वाराणि) {
            न्यूनतम_क = Math.min(न्यूनतम_क, g.क);
            न्यूनतम_त = Math.min(न्यूनतम_त, g.त);
        }
    } else {
        window.प्रतिकृति_द्वाराणि = [];
    }

    if (न्यूनतम_क !== Infinity) {
        window.प्रतिकृति_मूल_बिन्दुः = { क: न्यूनतम_क, त: न्यूनतम_त };
    }

    const svgCopy = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8C6.9 5 6 5.9 6 7v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#1641c0"/></svg>`;
    document.getElementById('तर्कद्वारपटः').style.cursor = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgCopy)}") 12 12, copy`;

    window.द्वाररेखनम्();
}

function प्रतिकृति_अद्यतनम्(मूल_क, मूल_त) {
    let समीप_क = Math.round(मूल_क / 10) * 10;
    let समीप_त = Math.round(मूल_त / 10) * 10;
    let क_भेद = समीप_क - window.प्रतिकृति_मूल_बिन्दुः.क;
    let त_भेद = समीप_त - window.प्रतिकृति_मूल_बिन्दुः.त;

    // Deep copy with current delta
    if (window.प्रतिकृति_तन्तवः) {
        window.प्रतिकृति_अस्थायीतन्तवः = window.प्रतिकृति_तन्तवः.map(w => ({
            प्रारम्भः: { क: w.प्रारम्भः.क + क_भेद, त: w.प्रारम्भः.त + त_भेद },
            अन्तम्: { क: w.अन्तम्.क + क_भेद, त: w.अन्तम्.त + त_भेद }
        }));
    }
    if (window.प्रतिकृति_कीलाः) {
        window.प्रतिकृति_अस्थायीकीलाः = window.प्रतिकृति_कीलाः.map(p => ({
            क: p.क + क_भेद, त: p.त + त_भेद, नाम: p.नाम, प्रकारः: p.प्रकारः
        }));
    }
    if (window.प्रतिकृति_द्वाराणि) {
        window.प्रतिकृति_अस्थायीद्वाराणि = window.प्रतिकृति_द्वाराणि.map(g => {
            let newName = g.नाम ? g.नाम + '_1' : '_1';
            let i = 1;
            while (window.स्थापितानिद्वाराणि && window.स्थापितानिद्वाराणि.some(existing => existing.नाम === newName)) {
                i++;
                newName = (g.नाम || '') + '_' + i;
            }
            return {
                क: g.क + क_भेद, त: g.त + त_भेद, नाम: newName, कोणः: g.कोणः
            };
        });
    }

    let सङ्घट्टनम् = true;
    let अधिकतम_विमार्गः = 50;

    while (सङ्घट्टनम् && अधिकतम_विमार्गः > 0) {
        सङ्घट्टनम् = false;

        for (let प्रति_तन्तु of window.प्रतिकृति_अस्थायीतन्तवः) {
            let क1 = प्रति_तन्तु.प्रारम्भः.क, त1 = प्रति_तन्तु.प्रारम्भः.त;
            let क2 = प्रति_तन्तु.अन्तम्.क, त2 = प्रति_तन्तु.अन्तम्.त;

            for (let स्थापिततन्तुः of window.स्थापितास्तन्तवः) {
                let स्था_क1 = स्थापिततन्तुः.प्रारम्भः.क, स्था_त1 = स्थापिततन्तुः.प्रारम्भः.त;
                let स्था_क2 = स्थापिततन्तुः.अन्तम्.क, स्था_त2 = स्थापिततन्तुः.अन्तम्.त;

                let बिन्दवः = [स्थापिततन्तुः.प्रारम्भः, स्थापिततन्तुः.अन्तम्];
                for (let बिन्दुः of बिन्दवः) {
                    let अतिव्याप्तम् = false;
                    if (त1 === त2 && बिन्दुः.त === त1 && बिन्दुः.क >= Math.min(क1, क2) && बिन्दुः.क <= Math.max(क1, क2)) अतिव्याप्तम् = true;
                    else if (क1 === क2 && बिन्दुः.क === क1 && बिन्दुः.त >= Math.min(त1, त2) && बिन्दुः.त <= Math.max(त1, त2)) अतिव्याप्तम् = true;
                    if (अतिव्याप्तम्) { सङ्घट्टनम् = true; break; }
                }
                if (सङ्घट्टनम्) break;

                let प्रति_बिन्दवः = [प्रति_तन्तु.प्रारम्भः, प्रति_तन्तु.अन्तम्];
                for (let बिन्दुः of प्रति_बिन्दवः) {
                    let अतिव्याप्तम् = false;
                    if (स्था_त1 === स्था_त2 && बिन्दुः.त === स्था_त1 && बिन्दुः.क >= Math.min(स्था_क1, स्था_क2) && बिन्दुः.क <= Math.max(स्था_क1, स्था_क2)) अतिव्याप्तम् = true;
                    else if (स्था_क1 === स्था_क2 && बिन्दुः.क === स्था_क1 && बिन्दुः.त >= Math.min(स्था_त1, स्था_त2) && बिन्दुः.त <= Math.max(स्था_त1, स्था_त2)) अतिव्याप्तम् = true;
                    if (अतिव्याप्तम्) { सङ्घट्टनम् = true; break; }
                }
                if (सङ्घट्टनम्) break;
            }
            if (सङ्घट्टनम्) break;
        }

        if (सङ्घट्टनम्) {
            let विमार्ग_क = क_भेद >= 0 ? 10 : -10;
            let विमार्ग_त = त_भेद >= 0 ? 10 : -10;

            for (let w of window.प्रतिकृति_अस्थायीतन्तवः) {
                w.प्रारम्भः.क += विमार्ग_क;
                w.प्रारम्भः.त += विमार्ग_त;
                w.अन्तम्.क += विमार्ग_क;
                w.अन्तम्.त += विमार्ग_त;
            }
            क_भेद += विमार्ग_क;
            त_भेद += विमार्ग_त;
            अधिकतम_विमार्गः--;
        }
    }
}

function प्रारम्भः() {
    तन्तुचिह्नरेखनम्();
    // // संयोगद्वारचिह्नरेखनम्();
    कीलकचिह्नरेखनम्();
    पट्टिकाविभाजकस्थापनम्();

    // Ensure the canvas stretches to fill the screen so we have room to draw
    const तर्कद्वारपटवस्तु = document.getElementById('तर्कद्वारपटः');
    const पटपात्रवस्तु = document.getElementById('पटपात्रम्');
    const बिन्दुपटवस्तु = document.getElementById('बिन्दुपटः');
    const पटस्तरपात्रवस्तु = document.getElementById('पटस्तरपात्रम्');
    if (तर्कद्वारपटवस्तु && पटपात्रवस्तु) {
        let महत्तम_आयामः = Math.max(पटपात्रवस्तु.clientWidth, window.innerWidth, पटपात्रवस्तु.clientHeight, window.innerHeight);
        window.मूल_पट_आकारः = महत्तम_आयामः * 3;

        तर्कद्वारपटवस्तु.width = window.मूल_पट_आकारः;
        तर्कद्वारपटवस्तु.height = window.मूल_पट_आकारः;

        if (बिन्दुपटवस्तु) {
            बिन्दुपटवस्तु.width = window.मूल_पट_आकारः;
            बिन्दुपटवस्तु.height = window.मूल_पट_आकारः;
        }
        if (पटस्तरपात्रवस्तु) {
            पटस्तरपात्रवस्तु.style.width = window.मूल_पट_आकारः + 'px';
            पटस्तरपात्रवस्तु.style.height = window.मूल_पट_आकारः + 'px';
        }
    }

    // Zoom Management
    window.विस्तारप्रतिशतम् = 100;

    window.विस्तारप्रयोगः = function () {
        window.गुणकः = window.विस्तारप्रतिशतम् / 100;
        let नूतन_आकारः = Math.round((window.मूल_पट_आकारः * window.विस्तारप्रतिशतम्) / 100);

        if (तर्कद्वारपटवस्तु) {
            तर्कद्वारपटवस्तु.width = नूतन_आकारः;
            तर्कद्वारपटवस्तु.height = नूतन_आकारः;
            तर्कद्वारपटवस्तु.style.width = नूतन_आकारः + 'px';
            तर्कद्वारपटवस्तु.style.height = नूतन_आकारः + 'px';
        }
        if (बिन्दुपटवस्तु) {
            बिन्दुपटवस्तु.width = नूतन_आकारः;
            बिन्दुपटवस्तु.height = नूतन_आकारः;
            बिन्दुपटवस्तु.style.width = नूतन_आकारः + 'px';
            बिन्दुपटवस्तु.style.height = नूतन_आकारः + 'px';
        }

        let पटस्तरपात्रवस्तु = document.getElementById('पटस्तरपात्रम्');
        if (पटस्तरपात्रवस्तु) {
            पटस्तरपात्रवस्तु.style.width = नूतन_आकारः + 'px';
            पटस्तरपात्रवस्तु.style.height = नूतन_आकारः + 'px';
        }

        let विस्तारनिवेशः = document.getElementById('विस्तारप्रतिशतम्');
        if (विस्तारनिवेशः) विस्तारनिवेशः.value = window.विस्तारप्रतिशतम्;

        if (window.द्वाररेखनम्) window.द्वाररेखनम्();
    };

    const विस्तारकुञ्जिका = document.getElementById('विस्तारकुञ्जिका'); // Zoom Out
    if (विस्तारकुञ्जिका) {
        विस्तारकुञ्जिका.addEventListener('click', विस्तारप्रकारप्रारम्भः);
    }

    const संकोचकुञ्जिका = document.getElementById('संकोचकुञ्जिका'); // Zoom In
    if (संकोचकुञ्जिका) {
        संकोचकुञ्जिका.addEventListener('click', संकोचप्रकारप्रारम्भः);
    }

    const अनुकूलविस्तारकुञ्जिका = document.getElementById('अनुकूलविस्तारकुञ्जिका'); // Fit
    if (अनुकूलविस्तारकुञ्जिका) {
        अनुकूलविस्तारकुञ्जिका.addEventListener('click', अनुकूलविस्तारप्रारम्भः);
    }

    const विस्तारनिवेशः = document.getElementById('विस्तारप्रतिशतम्'); // Zoom Textbox
    if (विस्तारनिवेशः) {
        // Strip out any non-numeric letters instantly as the user types
        विस्तारनिवेशः.addEventListener('input', (घटना) => {
            घटना.target.value = घटना.target.value.replace(/\D/g, '');
        });

        // When user hits Enter or clicks away, round to nearest 5 and clamp between 25-250
        विस्तारनिवेशः.addEventListener('change', (घटना) => {
            let मूल्यम् = parseInt(घटना.target.value, 10);
            if (isNaN(मूल्यम्)) मूल्यम् = 100;

            मूल्यम् = Math.round(मूल्यम् / 5) * 5;
            window.विस्तारप्रतिशतम् = Math.max(25, Math.min(250, मूल्यम्));
            if (window.विस्तारप्रयोगः) window.विस्तारप्रयोगः();
        });
    }

    // Button click listeners
    const तन्तुकुञ्जिकावस्तु = document.getElementById('तन्तुकुञ्जिका');
    if (तन्तुकुञ्जिकावस्तु) तन्तुकुञ्जिकावस्तु.addEventListener('click', तन्तुस्थापनप्रारम्भः);

    const सामान्यकुञ्जिकावस्तु = document.getElementById('सामान्यकुञ्जिका');
    if (सामान्यकुञ्जिकावस्तु) सामान्यकुञ्जिकावस्तु.addEventListener('click', () => {
        window.चितास्तन्तवः = [];
        सामान्यस्थित्यागमनम्();
    });

    const शोधनकुञ्जिकावस्तु = document.getElementById('शोधनकुञ्जिका');
    if (शोधनकुञ्जिकावस्तु) शोधनकुञ्जिकावस्तु.addEventListener('click', मार्जनप्रकारप्रारम्भः);

    const प्रतिकृतिकुञ्जिकावस्तु = document.getElementById('प्रतिकृतिकुञ्जिका');
    if (प्रतिकृतिकुञ्जिकावस्तु) प्रतिकृतिकुञ्जिकावस्तु.addEventListener('click', प्रतिकृतिप्रकारप्रारम्भः);

    const कीलककुञ्जिकावस्तु = document.getElementById('कीलककुञ्जिका');
    if (कीलककुञ्जिकावस्तु) कीलककुञ्जिकावस्तु.addEventListener('click', कीलकसंवादप्रारम्भः);

    const कीलक_स्वीकारकुञ्जिका = document.getElementById('कीलक_स्वीकारकुञ्जिका');
    if (कीलक_स्वीकारकुञ्जिका) कीलक_स्वीकारकुञ्जिका.addEventListener('click', कीलकस्थापनप्रारम्भः);

    const कीलक_रद्दकुञ्जिका = document.getElementById('कीलक_रद्दकुञ्जिका');
    if (कीलक_रद्दकुञ्जिका) कीलक_रद्दकुञ्जिका.addEventListener('click', () => {
        document.getElementById('कीलकसंवादपृष्ठभूमिः').classList.add('गुप्तम्');
    });

    const संयोगद्वारकुञ्जिकावस्तु = document.getElementById('संयोगद्वारकुञ्जिका');
    if (संयोगद्वारकुञ्जिकावस्तु) संयोगद्वारकुञ्जिकावस्तु.addEventListener('click', () => द्वारसंवादप्रारम्भः('and'));

    const द्वार_स्वीकारकुञ्जिका = document.getElementById('द्वार_स्वीकारकुञ्जिका');
    if (द्वार_स्वीकारकुञ्जिका) द्वार_स्वीकारकुञ्जिका.addEventListener('click', द्वारस्थापनप्रारम्भः);

    const द्वार_रद्दकुञ्जिका = document.getElementById('द्वार_रद्दकुञ्जिका');
    if (द्वार_रद्दकुञ्जिका) द्वार_रद्दकुञ्जिका.addEventListener('click', () => {
        document.getElementById('द्वारसंवादपृष्ठभूमिः').classList.add('गुप्तम्');
        window.सम्पाद्यमानद्वारम् = null;
    });

    const भ्रमणकुञ्जिकावस्तु = document.getElementById('भ्रमणकुञ्जिका');
    if (भ्रमणकुञ्जिकावस्तु) भ्रमणकुञ्जिकावस्तु.addEventListener('click', () => {
        if (window.सक्रियद्वारस्थापनम्) {
            window.वर्तमानद्वारकोणः = (window.वर्तमानद्वारकोणः + 90 + 360) % 360;
            window.द्वाररेखनम्();
        } else if (window.चितानिद्वाराणि && window.चितानिद्वाराणि.length > 0) {
            for (let द्वार of window.चितानिद्वाराणि) {
                let oldAngle = द्वार.कोणः || 0;
                let newAngle = (oldAngle + 90 + 360) % 360;
                द्वार.कोणः = newAngle;
                if (typeof द्वारस्यतन्तून्अद्यतनीकरणम् === 'function') द्वारस्यतन्तून्अद्यतनीकरणम्(द्वार, oldAngle, द्वार.लम्बप्रतिबिम्बः, newAngle, द्वार.लम्बप्रतिबिम्बः);
            }
            window.द्वाररेखनम्();
        }
    });

    const प्रतिबिम्बकुञ्जिकावस्तु = document.getElementById('प्रतिबिम्बकुञ्जिका');
    if (प्रतिबिम्बकुञ्जिकावस्तु) प्रतिबिम्बकुञ्जिकावस्तु.addEventListener('click', () => {
        if (window.सक्रियद्वारस्थापनम्) {
            window.वर्तमानद्वारलम्बप्रतिबिम्बः = !window.वर्तमानद्वारलम्बप्रतिबिम्बः;
            window.द्वाररेखनम्();
        } else if (window.चितानिद्वाराणि && window.चितानिद्वाराणि.length > 0) {
            for (let द्वार of window.चितानिद्वाराणि) {
                let oldFlip = !!द्वार.लम्बप्रतिबिम्बः;
                let newFlip = !oldFlip;
                द्वार.लम्बप्रतिबिम्बः = newFlip;
                if (typeof द्वारस्यतन्तून्अद्यतनीकरणम् === 'function') द्वारस्यतन्तून्अद्यतनीकरणम्(द्वार, द्वार.कोणः, oldFlip, द्वार.कोणः, newFlip);
            }
            window.द्वाररेखनम्();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (सम्भवम्) => {
        // Prevent shortcuts from triggering while typing in input fields (except Escape and Enter)
        if ((सम्भवम्.target.tagName === 'INPUT' || सम्भवम्.target.tagName === 'SELECT') && सम्भवम्.key !== 'Escape' && सम्भवम्.key !== 'Enter') return;

        // Disable default browser save dialog on Ctrl+R or something else? Wait, Ctrl+R is refresh! 
        // We MUST prevent default if it's Ctrl+R to avoid refreshing the page.
        if (सम्भवम्.ctrlKey && (सम्भवम्.key === 'r' || सम्भवम्.key === 'R')) {
            सम्भवम्.preventDefault();
        }

        if (सम्भवम्.key === 'w' || सम्भवम्.key === 'W') {
            तन्तुस्थापनप्रारम्भः();
        } else if (सम्भवम्.key === 'Escape') {
            window.चितास्तन्तवः = [];
            window.चिताःकीलाः = [];
            window.चितानिद्वाराणि = [];
            सामान्यस्थित्यागमनम्();
        } else if (सम्भवम्.key === 'Enter') {
            const कीलकसंवादपृष्ठभूमिः = document.getElementById('कीलकसंवादपृष्ठभूमिः');
            const द्वारसंवादपृष्ठभूमिः = document.getElementById('द्वारसंवादपृष्ठभूमिः');
            if (कीलकसंवादपृष्ठभूमिः && !कीलकसंवादपृष्ठभूमिः.classList.contains('गुप्तम्')) {
                कीलकस्थापनप्रारम्भः();
            } else if (द्वारसंवादपृष्ठभूमिः && !द्वारसंवादपृष्ठभूमिः.classList.contains('गुप्तम्')) {
                द्वारस्थापनप्रारम्भः();
            }
        } else if (सम्भवम्.key === 'Delete') {
            let changed = false;
            if (window.चिताःकीलाः && window.चिताःकीलाः.length > 0) {
                window.स्थापिताःकीलाः = window.स्थापिताःकीलाः.filter(p => !window.चिताःकीलाः.includes(p));
                window.चिताःकीलाः = [];
                changed = true;
            }
            if (window.चितानिद्वाराणि && window.चितानिद्वाराणि.length > 0) {
                window.स्थापितानिद्वाराणि = window.स्थापितानिद्वाराणि.filter(g => !window.चितानिद्वाराणि.includes(g));
                window.चितानिद्वाराणि = [];
                changed = true;
            }
            if (changed) window.द्वाररेखनम्();
            मार्जनप्रकारप्रारम्भः();
        } else if (सम्भवम्.key === 'c' || सम्भवम्.key === 'C') {
            प्रतिकृतिप्रकारप्रारम्भः();
        } else if (सम्भवम्.key === 'r' || सम्भवम्.key === 'R') {
            let rotationAmount = सम्भवम्.ctrlKey ? -90 : 90;
            if (window.सक्रियद्वारस्थापनम्) {
                window.वर्तमानद्वारकोणः = (window.वर्तमानद्वारकोणः + rotationAmount + 360) % 360;
                window.द्वाररेखनम्();
            } else if (window.चितानिद्वाराणि && window.चितानिद्वाराणि.length > 0) {
                for (let द्वार of window.चितानिद्वाराणि) {
                    let oldAngle = द्वार.कोणः || 0;
                    let newAngle = (oldAngle + rotationAmount + 360) % 360;
                    द्वार.कोणः = newAngle;
                    if (typeof द्वारस्यतन्तून्अद्यतनीकरणम् === 'function') द्वारस्यतन्तून्अद्यतनीकरणम्(द्वार, oldAngle, द्वार.लम्बप्रतिबिम्बः, newAngle, द्वार.लम्बप्रतिबिम्बः);
                }
                window.द्वाररेखनम्();
            }
        } else if (सम्भवम्.key === 'v' || सम्भवम्.key === 'V') {
            if (window.सक्रियद्वारस्थापनम्) {
                window.वर्तमानद्वारलम्बप्रतिबिम्बः = !window.वर्तमानद्वारलम्बप्रतिबिम्बः;
                window.द्वाररेखनम्();
            } else if (window.चितानिद्वाराणि && window.चितानिद्वाराणि.length > 0) {
                for (let द्वार of window.चितानिद्वाराणि) {
                    let oldFlip = !!द्वार.लम्बप्रतिबिम्बः;
                    let newFlip = !oldFlip;
                    द्वार.लम्बप्रतिबिम्बः = newFlip;
                    if (typeof द्वारस्यतन्तून्अद्यतनीकरणम् === 'function') द्वारस्यतन्तून्अद्यतनीकरणम्(द्वार, द्वार.कोणः, oldFlip, द्वार.कोणः, newFlip);
                }
                window.द्वाररेखनम्();
            }
        } else if (सम्भवम्.key === 'z') {
            विस्तारप्रकारप्रारम्भः(); // Zoom Out
        } else if (सम्भवम्.key === 'Z') {
            संकोचप्रकारप्रारम्भः(); // Zoom In (Shift+Z)
        } else if (सम्भवम्.key === 'f' || सम्भवम्.key === 'F') {
            अनुकूलविस्तारप्रारम्भः(); // Zoom Fit
        } else if (सम्भवम्.key === 'p' || सम्भवम्.key === 'P') {
            सम्भवम्.preventDefault();
            कीलकसंवादप्रारम्भः(); // Pin
        } else if (सम्भवम्.key === 'q' || सम्भवम्.key === 'Q') {
            सम्भवम्.preventDefault();
            द्वारसम्पादनप्रारम्भः(); // Edit Gate Name
        }
    });
    // Mouse events for drawing on the canvas
    if (तर्कद्वारपटवस्तु) {


        तर्कद्वारपटवस्तु.addEventListener('mousedown', (सम्भवम्) => {
            if (सम्भवम्.button !== 0) return; // Only process left clicks

            const आयता = तर्कद्वारपटवस्तु.getBoundingClientRect();

            if (window.विस्तार_प्रकारः || window.संकोच_प्रकारः) {
                let पूर्वप्रतिशतम् = window.विस्तारप्रतिशतम्;
                let नूतनप्रतिशतम् = window.विस्तारप्रतिशतम्;

                if (window.संकोच_प्रकारः) { // Zoom In
                    नूतनप्रतिशतम् = Math.min(250, नूतनप्रतिशतम् + 5);
                } else { // Zoom Out
                    नूतनप्रतिशतम् = Math.max(25, नूतनप्रतिशतम् - 5);
                }

                if (पूर्वप्रतिशतम् === नूतनप्रतिशतम्) return;

                let पटपात्रवस्तु = document.getElementById('पटपात्रम्');
                let क_स्थानम् = सम्भवम्.clientX;
                let त_स्थानम् = सम्भवम्.clientY;
                let पात्र_आयता = पटपात्रवस्तु.getBoundingClientRect();

                let पात्रे_क_स्थानम् = क_स्थानम् - पात्र_आयता.left;
                let पात्रे_त_स्थानम् = त_स्थानम् - पात्र_आयता.top;

                // Absolute unscaled coordinates (taking scroll into account)
                let मूल_क_स्थानम् = पटपात्रवस्तु.scrollLeft + पात्रे_क_स्थानम्;
                let मूल_त_स्थानम् = पटपात्रवस्तु.scrollTop + पात्रे_त_स्थानम्;

                // Raw logical coordinates (before ANY zoom)
                let प्रारम्भिक_क = मूल_क_स्थानम् / (पूर्वप्रतिशतम् / 100);
                let प्रारम्भिक_त = मूल_त_स्थानम् / (पूर्वप्रतिशतम् / 100);

                window.विस्तारप्रतिशतम् = नूतनप्रतिशतम्;
                if (window.विस्तारप्रयोगः) window.विस्तारप्रयोगः();

                let नूतन_मूल_क_स्थानम् = प्रारम्भिक_क * (नूतनप्रतिशतम् / 100);
                let नूतन_मूल_त_स्थानम् = प्रारम्भिक_त * (नूतनप्रतिशतम् / 100);

                पटपात्रवस्तु.scrollLeft = नूतन_मूल_क_स्थानम् - पात्रे_क_स्थानम्;
                पटपात्रवस्तु.scrollTop = नूतन_मूल_त_स्थानम् - पात्रे_त_स्थानम्;
                return;
            }

            let मूल_क = (सम्भवम्.clientX - आयता.left) / window.गुणकः;
            let मूल_त = (सम्भवम्.clientY - आयता.top) / window.गुणकः;

            if (window.प्रतिकृति_प्रकारः) {
                if ((!window.प्रतिकृति_तन्तवः || window.प्रतिकृति_तन्तवः.length === 0) &&
                    (!window.प्रतिकृति_अस्थायीकीलाः || window.प्रतिकृति_अस्थायीकीलाः.length === 0) &&
                    (!window.प्रतिकृति_अस्थायीद्वाराणि || window.प्रतिकृति_अस्थायीद्वाराणि.length === 0)) {
                    let स्पृष्टतन्तुः = false;
                    for (let तन्तु of window.स्थापितास्तन्तवः) {
                        let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
                        let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;

                        let रेखीय_अन्तरम्;
                        if (त1 === त2) { // Horizontal
                            if (मूल_क >= Math.min(क1, क2) - 5 && मूल_क <= Math.max(क1, क2) + 5) {
                                रेखीय_अन्तरम् = Math.abs(मूल_त - त1);
                            } else {
                                रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                            }
                        } else if (क1 === क2) { // Vertical
                            if (मूल_त >= Math.min(त1, त2) - 5 && मूल_त <= Math.max(त1, त2) + 5) {
                                रेखीय_अन्तरम् = Math.abs(मूल_क - क1);
                            } else {
                                रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                            }
                        }

                        if (रेखीय_अन्तरम् !== undefined && रेखीय_अन्तरम् <= 5) {
                            window.चितास्तन्तवः = [तन्तु];
                            window.चिताःकीलाः = [];
                            स्पृष्टतन्तुः = true;
                            break;
                        }
                    }

                    if (!स्पृष्टतन्तुः && window.स्थापिताःकीलाः) {
                        for (let कीलक of window.स्थापिताःकीलाः) {
                            let isClicked = (कीलक.प्रकारः === 'निवेशः') ?
                                (मूल_क >= कीलक.क - 30 && मूल_क <= कीलक.क && मूल_त >= कीलक.त - 15 && मूल_त <= कीलक.त + 15) :
                                (मूल_क >= कीलक.क && मूल_क <= कीलक.क + 30 && मूल_त >= कीलक.त - 15 && मूल_त <= कीलक.त + 15);

                            if (isClicked) {
                                window.चिताःकीलाः = [कीलक];
                                window.चितास्तन्तवः = [];
                                window.चितानिद्वाराणि = [];
                                स्पृष्टतन्तुः = true;
                                break;
                            }
                        }
                    }

                    if (!स्पृष्टतन्तुः && window.स्थापितानिद्वाराणि) {
                        for (let द्वार of window.स्थापितानिद्वाराणि) {
                            let isClicked = (मूल_क >= द्वार.क - 25 && मूल_क <= द्वार.क + 35 && मूल_त >= द्वार.त - 20 && मूल_त <= द्वार.त + 20);

                            if (isClicked) {
                                window.चितानिद्वाराणि = [द्वार];
                                window.चिताःकीलाः = [];
                                window.चितास्तन्तवः = [];
                                स्पृष्टतन्तुः = true;
                                break;
                            }
                        }
                    }

                    if (स्पृष्टतन्तुः) {
                        प्रतिकृतिप्रकारप्रारम्भः();
                        return;
                    }

                    window.चितास्तन्तवः = [];
                    window.चयनपेटी = {
                        प्रारम्भ_क: मूल_क,
                        प्रारम्भ_त: मूल_त,
                        वर्तमान_क: मूल_क,
                        वर्तमान_त: मूल_त
                    };
                    window.द्वाररेखनम्();
                    return;
                }

                if ((!window.प्रतिकृति_तन्तवः || window.प्रतिकृति_तन्तवः.length === 0) &&
                    (!window.प्रतिकृति_अस्थायीकीलाः || window.प्रतिकृति_अस्थायीकीलाः.length === 0) &&
                    (!window.प्रतिकृति_अस्थायीद्वाराणि || window.प्रतिकृति_अस्थायीद्वाराणि.length === 0)) {
                    प्रतिकृति_अद्यतनम्(मूल_क, मूल_त);
                }

                if (window.प्रतिकृति_अस्थायीतन्तवः && window.प्रतिकृति_अस्थायीतन्तवः.length > 0) {
                    for (let w of window.प्रतिकृति_अस्थायीतन्तवः) {
                        window.स्थापितास्तन्तवः.push(w);
                    }
                    window.चितास्तन्तवः = [...window.प्रतिकृति_अस्थायीतन्तवः];
                }

                if (window.प्रतिकृति_अस्थायीकीलाः && window.प्रतिकृति_अस्थायीकीलाः.length > 0) {
                    for (let p of window.प्रतिकृति_अस्थायीकीलाः) {
                        p.नाम = p.नाम ? p.नाम + '_1' : '_1'; // Append _1 to label
                        window.स्थापिताःकीलाः.push(p);
                    }
                    window.चिताःकीलाः = [...window.प्रतिकृति_अस्थायीकीलाः];
                }

                if (window.प्रतिकृति_अस्थायीद्वाराणि && window.प्रतिकृति_अस्थायीद्वाराणि.length > 0) {
                    for (let g of window.प्रतिकृति_अस्थायीद्वाराणि) {
                        window.स्थापितानिद्वाराणि.push(g);
                    }
                    window.चितानिद्वाराणि = [...window.प्रतिकृति_अस्थायीद्वाराणि];
                }
                सामान्यस्थित्यागमनम्();
                return;
            }

            if (window.मार्जन_प्रकारः) {
                // Check if we clicked on an existing wire to delete it
                let स्पृष्टतन्तुः = false;
                for (let i = window.स्थापितास्तन्तवः.length - 1; i >= 0; i--) {
                    let तन्तु = window.स्थापितास्तन्तवः[i];
                    let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
                    let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;

                    let रेखीय_अन्तरम्;
                    if (त1 === त2) { // Horizontal
                        if (मूल_क >= Math.min(क1, क2) - 5 && मूल_क >= Math.min(क1, क2) - 5 && मूल_क <= Math.max(क1, क2) + 5) {
                            रेखीय_अन्तरम् = Math.abs(मूल_त - त1);
                        } else {
                            रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                        }
                    } else if (क1 === क2) { // Vertical
                        if (मूल_त >= Math.min(त1, त2) - 5 && मूल_त <= Math.max(त1, त2) + 5) {
                            रेखीय_अन्तरम् = Math.abs(मूल_क - क1);
                        } else {
                            रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                        }
                    }

                    if (रेखीय_अन्तरम् !== undefined && रेखीय_अन्तरम् <= 5) {
                        // Delete this wire
                        window.स्थापितास्तन्तवः.splice(i, 1);

                        // Also remove from selected wires if it was there
                        if (window.चितास्तन्तवः) {
                            const selectedIndex = window.चितास्तन्तवः.indexOf(तन्तु);
                            if (selectedIndex !== -1) window.चितास्तन्तवः.splice(selectedIndex, 1);
                        }
                        स्पृष्टतन्तुः = true;
                        // Do not break, so we delete ALL wires intersecting this point (e.g., joints)
                    }
                }

                if (window.स्थापिताःकीलाः) {
                    for (let i = window.स्थापिताःकीलाः.length - 1; i >= 0; i--) {
                        let कीलक = window.स्थापिताःकीलाः[i];
                        let isClicked = (कीलक.प्रकारः === 'निवेशः') ?
                            (मूल_क >= कीलक.क - 30 && मूल_क <= कीलक.क && मूल_त >= कीलक.त - 15 && मूल_त <= कीलक.त + 15) :
                            (मूल_क >= कीलक.क && मूल_क <= कीलक.क + 30 && मूल_त >= कीलक.त - 15 && मूल_त <= कीलक.त + 15);

                        if (isClicked) {
                            window.स्थापिताःकीलाः.splice(i, 1);
                            if (window.चिताःकीलाः) {
                                const selIdx = window.चिताःकीलाः.indexOf(कीलक);
                                if (selIdx !== -1) window.चिताःकीलाः.splice(selIdx, 1);
                            }
                            स्पृष्टतन्तुः = true;
                        }
                    }
                }

                if (window.स्थापितानिद्वाराणि) {
                    for (let i = window.स्थापितानिद्वाराणि.length - 1; i >= 0; i--) {
                        let द्वार = window.स्थापितानिद्वाराणि[i];
                        let isClicked = (मूल_क >= द्वार.क - 25 && मूल_क <= द्वार.क + 35 && मूल_त >= द्वार.त - 20 && मूल_त <= द्वार.त + 20);

                        if (isClicked) {
                            window.स्थापितानिद्वाराणि.splice(i, 1);
                            if (window.चितानिद्वाराणि) {
                                const selIdx = window.चितानिद्वाराणि.indexOf(द्वार);
                                if (selIdx !== -1) window.चितानिद्वाराणि.splice(selIdx, 1);
                            }
                            स्पृष्टतन्तुः = true;
                        }
                    }
                }

                if (स्पृष्टतन्तुः) {
                    window.द्वाररेखनम्();
                    return; // Successfully deleted single wire or pin, stop processing click
                }

                // If we clicked empty space in delete mode, start drawing a selection box to batch delete!
                window.चितास्तन्तवः = []; // Clear previous selection
                window.चिताःकीलाः = [];
                window.चयनपेटी = {
                    प्रारम्भ_क: मूल_क,
                    प्रारम्भ_त: मूल_त,
                    वर्तमान_क: मूल_क,
                    वर्तमान_त: मूल_त
                };
                window.द्वाररेखनम्();
                return;
            }

            if (!window.सक्रियतन्तुस्थापनम् && !window.सक्रियद्वारस्थापनम् && !window.सक्रियकीलकस्थापनम्) {
                // Check if we clicked on an existing gate to drag it
                let स्पृष्टद्वारम् = null;
                if (window.स्थापितानिद्वाराणि) {
                    for (let द्वार of window.स्थापितानिद्वाराणि) {
                        let isClicked = (मूल_क >= द्वार.क - 25 && मूल_क <= द्वार.क + 35 && मूल_त >= द्वार.त - 20 && मूल_त <= द्वार.त + 20);
                        if (isClicked) {
                            स्पृष्टद्वारम् = द्वार;
                            break;
                        }
                    }
                }

                // Check if we clicked on an existing pin to drag it
                let स्पृष्टकीलकः = null;
                if (!स्पृष्टद्वारम् && window.स्थापिताःकीलाः) {
                    for (let कीलक of window.स्थापिताःकीलाः) {
                        let isClicked = (कीलक.प्रकारः === 'निवेशः') ?
                            (मूल_क >= कीलक.क - 30 && मूल_क <= कीलक.क && मूल_त >= कीलक.त - 15 && मूल_त <= कीलक.त + 15) :
                            (मूल_क >= कीलक.क && मूल_क <= कीलक.क + 30 && मूल_त >= कीलक.त - 15 && मूल_त <= कीलक.त + 15);
                        if (isClicked) {
                            स्पृष्टकीलकः = कीलक;
                            break;
                        }
                    }
                }

                if (स्पृष्टद्वारम् || स्पृष्टकीलकः) {
                    if (स्पृष्टद्वारम् && !window.चितानिद्वाराणि.includes(स्पृष्टद्वारम्)) {
                        window.चितानिद्वाराणि = [स्पृष्टद्वारम्];
                        window.चिताःकीलाः = [];
                        window.चितास्तन्तवः = [];
                    } else if (स्पृष्टकीलकः && !window.चिताःकीलाः.includes(स्पृष्टकीलकः)) {
                        if (!सम्भवम्.shiftKey) {
                            window.चिताःकीलाः = [स्पृष्टकीलकः];
                            window.चितानिद्वाराणि = [];
                            window.चितास्तन्तवः = [];
                        } else {
                            window.चिताःकीलाः.push(स्पृष्टकीलकः);
                        }
                    }
                    window.आकृष्यमाणकीलकः = true;
                    window.कर्षण_प्रारम्भ_क = मूल_क;
                    window.कर्षण_प्रारम्भ_त = मूल_त;
                    document.getElementById('तर्कद्वारपटः').style.cursor = 'grabbing';

                    window.कर्षण_मूल_अवस्था = [];
                    let नूतनतन्तवः = [];

                    if (window.चितास्तन्तवः) {
                        for (let चिततन्तु of window.चितास्तन्तवः) {
                            window.कर्षण_मूल_अवस्था.push({
                                बिन्दुः: चिततन्तु.प्रारम्भः, मूल_क: चिततन्तु.प्रारम्भः.क, मूल_त: चिततन्तु.प्रारम्भः.त, सम्बद्धः: 1
                            });
                            window.कर्षण_मूल_अवस्था.push({
                                बिन्दुः: चिततन्तु.अन्तम्, मूल_क: चिततन्तु.अन्तम्.क, मूल_त: चिततन्तु.अन्तम्.त, सम्बद्धः: 2
                            });
                        }
                    }

                    for (let चितकीलक of window.चिताःकीलाः) {
                        window.कर्षण_मूल_अवस्था.push({
                            बिन्दुः: चितकीलक, मूल_क: चितकीलक.क, मूल_त: चितकीलक.त, सम्बद्धः: 3
                        });

                        // Find connected unselected wires and add them to stretch (orthogonally)
                        for (let अन्यतन्तु of window.स्थापितास्तन्तवः) {
                            if (window.चितास्तन्तवः.includes(अन्यतन्तु)) continue;

                            let isStart = (अन्यतन्तु.प्रारम्भः.क === चितकीलक.क && अन्यतन्तु.प्रारम्भः.त === चितकीलक.त);
                            let isEnd = (अन्यतन्तु.अन्तम्.क === चितकीलक.क && अन्यतन्तु.अन्तम्.त === चितकीलक.त);

                            if (isStart || isEnd) {
                                let स्थिरबिन्दुः = isStart ? अन्यतन्तु.अन्तम् : अन्यतन्तु.प्रारम्भः;
                                let चलबिन्दुः = isStart ? अन्यतन्तु.प्रारम्भः : अन्यतन्तु.अन्तम्;

                                let isHorizontal = (चलबिन्दुः.त === स्थिरबिन्दुः.त);
                                let isVertical = (चलबिन्दुः.क === स्थिरबिन्दुः.क);

                                if (isHorizontal || isVertical) {
                                    let मध्यबिन्दुः = { क: चलबिन्दुः.क, त: चलबिन्दुः.त };
                                    let नूतनतन्तु = { प्रारम्भः: { क: चलबिन्दुः.क, त: चलबिन्दुः.त }, अन्तम्: मध्यबिन्दुः };

                                    // Make chal bindu reference the new point of nutan tantu
                                    if (isStart) {
                                        नूतनतन्तु.प्रारम्भः = चलबिन्दुः;
                                        अन्यतन्तु.प्रारम्भः = मध्यबिन्दुः;
                                    } else {
                                        नूतनतन्तु.प्रारम्भः = मध्यबिन्दुः;
                                        नूतनतन्तु.अन्तम् = चलबिन्दुः;
                                        अन्यतन्तु.अन्तम् = मध्यबिन्दुः;
                                    }
                                    नूतनतन्तवः.push(नूतनतन्तु);

                                    window.कर्षण_मूल_अवस्था.push({
                                        बिन्दुः: चलबिन्दुः, मूल_क: चलबिन्दुः.क, मूल_त: चलबिन्दुः.त, सम्बद्धः: isStart ? 1 : 2
                                    });

                                    window.कर्षण_मूल_अवस्था.push({
                                        बिन्दुः: मध्यबिन्दुः, मूल_क: मध्यबिन्दुः.क, मूल_त: मध्यबिन्दुः.त,
                                        सम्बद्धः: 4, अक्ष_प्रतिबन्धः: isHorizontal ? 'त' : 'क'
                                    });
                                } else {
                                    window.कर्षण_मूल_अवस्था.push({
                                        बिन्दुः: चलबिन्दुः, मूल_क: चलबिन्दुः.क, मूल_त: चलबिन्दुः.त, सम्बद्धः: isStart ? 1 : 2
                                    });
                                }
                            }
                        }
                    }

                    for (let चितद्वार of window.चितानिद्वाराणि) {
                        window.कर्षण_मूल_अवस्था.push({
                            बिन्दुः: चितद्वार, मूल_क: चितद्वार.क, मूल_त: चितद्वार.त, सम्बद्धः: 5
                        });

                        let gatePoints = [];
                        let forward_angle = (चितद्वार.कोणः || 0) * Math.PI / 180;
                        let fs = Math.sin(forward_angle);
                        let fc = Math.cos(forward_angle);
                        let pts = window.getGatePins(चितद्वार.प्रकारः || 'and');
                        for (let p of pts) {
                            gatePoints.push({
                                क: चितद्वार.क + p.x * fc - p.y * fs,
                                त: चितद्वार.त + p.x * fs + p.y * fc
                            });
                        }

                        let outerEndsToSplit = [];

                        // Step 1: Find stubs (wires connected to gate pins), rigidly move them
                        for (let pnt of gatePoints) {
                            for (let अन्यतन्तु of window.स्थापितास्तन्तवः) {
                                if (window.चितास्तन्तवः.includes(अन्यतन्तु)) continue;

                                let isStart = (अन्यतन्तु.प्रारम्भः.क === pnt.क && अन्यतन्तु.प्रारम्भः.त === pnt.त);
                                let isEnd = (अन्यतन्तु.अन्तम्.क === pnt.क && अन्यतन्तु.अन्तम्.त === pnt.त);

                                if (isStart || isEnd) {
                                    // This is the stub! We rigidly move both ends of this stub.
                                    let स्थिरबिन्दुः = isStart ? अन्यतन्तु.अन्तम् : अन्यतन्तु.प्रारम्भः;
                                    let चलबिन्दुः = isStart ? अन्यतन्तु.प्रारम्भः : अन्यतन्तु.अन्तम्; // This is the pin

                                    // Add the pin end to move
                                    window.कर्षण_मूल_अवस्था.push({
                                        बिन्दुः: चलबिन्दुः, मूल_क: चलबिन्दुः.क, मूल_त: चलबिन्दुः.त, सम्बद्धः: isStart ? 1 : 2
                                    });
                                    // Add the outer end to move
                                    window.कर्षण_मूल_अवस्था.push({
                                        बिन्दुः: स्थिरबिन्दुः, मूल_क: स्थिरबिन्दुः.क, मूल_त: स्थिरबिन्दुः.त, सम्बद्धः: isStart ? 2 : 1
                                    });

                                    // Record the outer end so we can split any wire connected to IT
                                    outerEndsToSplit.push({
                                        point: स्थिरबिन्दुः,
                                        ignoreWire: अन्यतन्तु
                                    });
                                }
                            }
                        }

                        // Step 2: Split any unselected wires connected to the outer end of the stubs
                        for (let outer of outerEndsToSplit) {
                            let pnt = outer.point;
                            for (let बाह्यतन्तु of window.स्थापितास्तन्तवः) {
                                if (window.चितास्तन्तवः.includes(बाह्यतन्तु)) continue;
                                if (बाह्यतन्तु === outer.ignoreWire) continue; // Don't split the stub itself again!

                                let isStart = (बाह्यतन्तु.प्रारम्भः.क === pnt.क && बाह्यतन्तु.प्रारम्भः.त === pnt.त);
                                let isEnd = (बाह्यतन्तु.अन्तम्.क === pnt.क && बाह्यतन्तु.अन्तम्.त === pnt.त);

                                if (isStart || isEnd) {
                                    let स्थिरबिन्दुः = isStart ? बाह्यतन्तु.अन्तम् : बाह्यतन्तु.प्रारम्भः;
                                    let चलबिन्दुः = isStart ? बाह्यतन्तु.प्रारम्भः : बाह्यतन्तु.अन्तम्; // This is the outer end of the stub

                                    let isHorizontal = (चलबिन्दुः.त === स्थिरबिन्दुः.त);
                                    let isVertical = (चलबिन्दुः.क === स्थिरबिन्दुः.क);

                                    if (isHorizontal || isVertical) {
                                        let मध्यबिन्दुः = { क: चलबिन्दुः.क, त: चलबिन्दुः.त };
                                        let नूतनतन्तु = { प्रारम्भः: { क: चलबिन्दुः.क, त: चलबिन्दुः.त }, अन्तम्: मध्यबिन्दुः };

                                        if (isStart) {
                                            नूतनतन्तु.प्रारम्भः = चलबिन्दुः;
                                            बाह्यतन्तु.प्रारम्भः = मध्यबिन्दुः;
                                        } else {
                                            नूतनतन्तु.अन्तम् = चलबिन्दुः;
                                            बाह्यतन्तु.अन्तम् = मध्यबिन्दुः;
                                        }
                                        नूतनतन्तवः.push(नूतनतन्तु);

                                        window.कर्षण_मूल_अवस्था.push({
                                            बिन्दुः: चलबिन्दुः, मूल_क: चलबिन्दुः.क, मूल_त: चलबिन्दुः.त, सम्बद्धः: isStart ? 1 : 2
                                        });

                                        window.कर्षण_मूल_अवस्था.push({
                                            बिन्दुः: मध्यबिन्दुः, मूल_क: मध्यबिन्दुः.क, मूल_त: मध्यबिन्दुः.त,
                                            सम्बद्धः: 4, अक्ष_प्रतिबन्धः: isHorizontal ? 'त' : 'क'
                                        });
                                    } else {
                                        window.कर्षण_मूल_अवस्था.push({
                                            बिन्दुः: चलबिन्दुः, मूल_क: चलबिन्दुः.क, मूल_त: चलबिन्दुः.त, सम्बद्धः: isStart ? 1 : 2
                                        });
                                    }
                                }
                            }
                        }
                    }
                    for (let नूतन of नूतनतन्तवः) {
                        window.स्थापितास्तन्तवः.push(नूतन);
                    }
                    window.द्वाररेखनम्();
                    return;
                }

                // Check if we clicked on an existing wire to drag it
                for (let तन्तु of window.स्थापितास्तन्तवः) {
                    let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
                    let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;

                    // Simple distance to line segment check
                    let रेखीय_अन्तरम्;
                    if (त1 === त2) { // Horizontal
                        if (मूल_क >= Math.min(क1, क2) - 5 && मूल_क <= Math.max(क1, क2) + 5) {
                            रेखीय_अन्तरम् = Math.abs(मूल_त - त1);
                        } else {
                            रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                        }
                    } else if (क1 === क2) { // Vertical
                        if (मूल_त >= Math.min(त1, त2) - 5 && मूल_त <= Math.max(त1, त2) + 5) {
                            रेखीय_अन्तरम् = Math.abs(मूल_क - क1);
                        } else {
                            रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                        }
                    }

                    if (रेखीय_अन्तरम् !== undefined && रेखीय_अन्तरम् <= 5 && (क1 !== क2 || त1 !== त2)) {
                        if (!window.चितास्तन्तवः.includes(तन्तु)) {
                            window.चितास्तन्तवः = [तन्तु]; // Select just this one if it wasn't selected
                            window.चिताःकीलाः = []; // Clear pin selection
                        }
                        window.आकृष्यमाणतन्तुः = तन्तु;
                        window.कर्षण_प्रारम्भ_क = मूल_क;
                        window.कर्षण_प्रारम्भ_त = मूल_त;
                        document.getElementById('तर्कद्वारपटः').style.cursor = 'grabbing';

                        window.कर्षण_मूल_अवस्था = [];

                        if (window.चिताःकीलाः) {
                            for (let चितकीलक of window.चिताःकीलाः) {
                                window.कर्षण_मूल_अवस्था.push({
                                    बिन्दुः: चितकीलक, मूल_क: चितकीलक.क, मूल_त: चितकीलक.त, सम्बद्धः: 3
                                });
                            }
                        }

                        for (let चिततन्तु of window.चितास्तन्तवः) {
                            window.कर्षण_मूल_अवस्था.push({
                                बिन्दुः: चिततन्तु.प्रारम्भः, मूल_क: चिततन्तु.प्रारम्भः.क, मूल_त: चिततन्तु.प्रारम्भः.त, सम्बद्धः: 1
                            });
                            window.कर्षण_मूल_अवस्था.push({
                                बिन्दुः: चिततन्तु.अन्तम्, मूल_क: चिततन्तु.अन्तम्.क, मूल_त: चिततन्तु.अन्तम्.त, सम्बद्धः: 2
                            });

                            let स्थिरबिन्दवः = [];

                            // Find Gate pins, they are stationary, but we split at the 15px stub!
                            if (window.स्थापितानिद्वाराणि) {
                                for (let द्वार of window.स्थापितानिद्वाराणि) {
                                    let अग्रकोणः = (द्वार.कोणः || 0) * Math.PI / 180;
                                    let अग्रज्या = Math.sin(अग्रकोणः);
                                    let अग्रकोज्या = Math.cos(अग्रकोणः);
                                    let बिन्दवः = window.getGatePins(द्वार.प्रकारः || 'and', true);
                                    for (let की of बिन्दवः) {
                                        let द्वार_क = Math.round(द्वार.क + की.x * अग्रकोज्या - की.y * अग्रज्या);
                                        let द्वार_त = Math.round(द्वार.त + की.x * अग्रज्या + की.y * अग्रकोज्या);
                                        let कील_क = Math.round(द्वार.क + की.stub_x * अग्रकोज्या - की.stub_y * अग्रज्या);
                                        let कील_त = Math.round(द्वार.त + की.stub_x * अग्रज्या + की.stub_y * अग्रकोज्या);

                                        if ((Math.abs(द्वार_क - चिततन्तु.प्रारम्भः.क) < 1 && Math.abs(द्वार_त - चिततन्तु.प्रारम्भः.त) < 1) || (Math.abs(कील_क - चिततन्तु.प्रारम्भः.क) < 1 && Math.abs(कील_त - चिततन्तु.प्रारम्भः.त) < 1)) {
                                            चिततन्तु.प्रारम्भः.क = कील_क;
                                            चिततन्तु.प्रारम्भः.त = कील_त;
                                            let अवस्था = window.कर्षण_मूल_अवस्था.find(a => a.बिन्दुः === चिततन्तु.प्रारम्भः);
                                            if (अवस्था) { अवस्था.मूल_क = कील_क; अवस्था.मूल_त = कील_त; }
                                            स्थिरबिन्दवः.push({ point: चिततन्तु.प्रारम्भः, x: कील_क, y: कील_त, pin_x: द्वार_क, pin_y: द्वार_त });
                                        }
                                        if ((Math.abs(द्वार_क - चिततन्तु.अन्तम्.क) < 1 && Math.abs(द्वार_त - चिततन्तु.अन्तम्.त) < 1) || (Math.abs(कील_क - चिततन्तु.अन्तम्.क) < 1 && Math.abs(कील_त - चिततन्तु.अन्तम्.त) < 1)) {
                                            चिततन्तु.अन्तम्.क = कील_क;
                                            चिततन्तु.अन्तम्.त = कील_त;
                                            let अवस्था = window.कर्षण_मूल_अवस्था.find(a => a.बिन्दुः === चिततन्तु.अन्तम्);
                                            if (अवस्था) { अवस्था.मूल_क = कील_क; अवस्था.मूल_त = कील_त; }
                                            स्थिरबिन्दवः.push({ point: चिततन्तु.अन्तम्, x: कील_क, y: कील_त, pin_x: द्वार_क, pin_y: द्वार_त });
                                        }
                                    }
                                }
                            }

                            // Find connected pins that are NOT selected, they are stationary
                            if (window.स्थापिताःकीलाः) {
                                for (let कीलक of window.स्थापिताःकीलाः) {
                                    if (window.चिताःकीलाः.includes(कीलक)) continue;
                                    if (कीलक.क === चिततन्तु.प्रारम्भः.क && कीलक.त === चिततन्तु.प्रारम्भः.त) {
                                        स्थिरबिन्दवः.push({ point: चिततन्तु.प्रारम्भः, x: कीलक.क, y: कीलक.त });
                                    }
                                    if (कीलक.क === चिततन्तु.अन्तम्.क && कीलक.त === चिततन्तु.अन्तम्.त) {
                                        स्थिरबिन्दवः.push({ point: चिततन्तु.अन्तम्, x: कीलक.क, y: कीलक.त });
                                    }
                                }
                            }

                            // If the dragged wire is connected to a gate stub, treat the connection as a stationary point
                            for (let अन्यतन्तु of window.स्थापितास्तन्तवः) {
                                if (window.चितास्तन्तवः.includes(अन्यतन्तु)) continue;

                                let connectsStart = (अन्यतन्तु.प्रारम्भः.क === चिततन्तु.प्रारम्भः.क && अन्यतन्तु.प्रारम्भः.त === चिततन्तु.प्रारम्भः.त) || (अन्यतन्तु.अन्तम्.क === चिततन्तु.प्रारम्भः.क && अन्यतन्तु.अन्तम्.त === चिततन्तु.प्रारम्भः.त);
                                let connectsEnd = (अन्यतन्तु.प्रारम्भः.क === चिततन्तु.अन्तम्.क && अन्यतन्तु.प्रारम्भः.त === चिततन्तु.अन्तम्.त) || (अन्यतन्तु.अन्तम्.क === चिततन्तु.अन्तम्.क && अन्यतन्तु.अन्तम्.त === चिततन्तु.अन्तम्.त);

                                if (connectsStart || connectsEnd) {
                                    let other_x = connectsStart ? (अन्यतन्तु.प्रारम्भः.क === चिततन्तु.प्रारम्भः.क && अन्यतन्तु.प्रारम्भः.त === चिततन्तु.प्रारम्भः.त ? अन्यतन्तु.अन्तम्.क : अन्यतन्तु.प्रारम्भः.क) : (अन्यतन्तु.प्रारम्भः.क === चिततन्तु.अन्तम्.क && अन्यतन्तु.प्रारम्भः.त === चिततन्तु.अन्तम्.त ? अन्यतन्तु.अन्तम्.क : अन्यतन्तु.प्रारम्भः.क);
                                    let other_y = connectsStart ? (अन्यतन्तु.प्रारम्भः.क === चिततन्तु.प्रारम्भः.क && अन्यतन्तु.प्रारम्भः.त === चिततन्तु.प्रारम्भः.त ? अन्यतन्तु.अन्तम्.त : अन्यतन्तु.प्रारम्भः.त) : (अन्यतन्तु.प्रारम्भः.क === चिततन्तु.अन्तम्.क && अन्यतन्तु.प्रारम्भः.त === चिततन्तु.अन्तम्.त ? अन्यतन्तु.अन्तम्.त : अन्यतन्तु.प्रारम्भः.त);

                                    // Check if the other end of this connected wire is a gate pin!
                                    if (window.स्थापितानिद्वाराणि) {
                                        for (let द्वार of window.स्थापितानिद्वाराणि) {
                                            let अग्रकोणः = (द्वार.कोणः || 0) * Math.PI / 180;
                                            let अग्रज्या = Math.sin(अग्रकोणः);
                                            let अग्रकोज्या = Math.cos(अग्रकोणः);
                                            let बिन्दवः = window.getGatePins(द्वार.प्रकारः || 'and');
                                            for (let की of बिन्दवः) {
                                                let द्वार_क = Math.round(द्वार.क + की.x * अग्रकोज्या - की.y * अग्रज्या);
                                                let द्वार_त = Math.round(द्वार.त + की.x * अग्रज्या + की.y * अग्रकोज्या);
                                                if (Math.abs(द्वार_क - other_x) < 1 && Math.abs(द्वार_त - other_y) < 1) {
                                                    // It IS a stub! So the connection point MUST be stationary!
                                                    if (connectsStart) {
                                                        स्थिरबिन्दवः.push({ point: चिततन्तु.प्रारम्भः, x: चिततन्तु.प्रारम्भः.क, y: चिततन्तु.प्रारम्भः.त });
                                                    } else {
                                                        स्थिरबिन्दवः.push({ point: चिततन्तु.अन्तम्, x: चिततन्तु.अन्तम्.क, y: चिततन्तु.अन्तम्.त });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            let नूतनतन्तवः = [];
                            
                            // Deduplicate by coordinate
                            let अद्वितीय_स्थिरबिन्दवः = [];
                            let दृष्ट_बिन्दवः = new Set();
                            for (let स्थिर of स्थिरबिन्दवः) {
                                let key = स्थिर.x + ',' + स्थिर.y;
                                if (!दृष्ट_बिन्दवः.has(key)) {
                                    दृष्ट_बिन्दवः.add(key);
                                    अद्वितीय_स्थिरबिन्दवः.push(स्थिर);
                                }
                            }
                            
                            for (let स्थिर of अद्वितीय_स्थिरबिन्दवः) {
                                if (स्थिर.pin_x !== undefined && स्थिर.pin_y !== undefined) {
                                    // Create the permanent 15px stub that stays connected to the gate (if it doesn't already exist)
                                    let विद्यमानकीलतन्तुः = window.स्थापितास्तन्तवः.find(w =>
                                        w !== चिततन्तु &&
                                        ((Math.abs(w.प्रारम्भः.क - स्थिर.pin_x) < 1 && Math.abs(w.प्रारम्भः.त - स्थिर.pin_y) < 1 && Math.abs(w.अन्तम्.क - स्थिर.x) < 1 && Math.abs(w.अन्तम्.त - स्थिर.y) < 1) ||
                                        (Math.abs(w.प्रारम्भः.क - स्थिर.x) < 1 && Math.abs(w.प्रारम्भः.त - स्थिर.y) < 1 && Math.abs(w.अन्तम्.क - स्थिर.pin_x) < 1 && Math.abs(w.अन्तम्.त - स्थिर.pin_y) < 1))
                                    );
                                    if (!विद्यमानकीलतन्तुः) {
                                        let कीलतन्तुः = { प्रारम्भः: { क: स्थिर.pin_x, त: स्थिर.pin_y }, अन्तम्: { क: स्थिर.x, त: स्थिर.y } };
                                        window.स्थापितास्तन्तवः.push(कीलतन्तुः);
                                        नूतनतन्तवः.push(कीलतन्तुः);
                                    } else {
                                        नूतनतन्तवः.push(विद्यमानकीलतन्तुः);
                                    }
                                }

                                let क्षैतिजअस्ति = (चिततन्तु.प्रारम्भः.त === चिततन्तु.अन्तम्.त);
                                let ऊर्ध्वाधरअस्ति = (चिततन्तु.प्रारम्भः.क === चिततन्तु.अन्तम्.क);

                                if (क्षैतिजअस्ति || ऊर्ध्वाधरअस्ति) {
                                    let मध्यबिन्दुः = { क: क्षैतिजअस्ति ? स्थिर.x : स्थिर.point.क, त: क्षैतिजअस्ति ? स्थिर.point.त : स्थिर.y };

                                    let नूतनतन्तु = {
                                        प्रारम्भः: { क: स्थिर.x, त: स्थिर.y },
                                        अन्तम्: मध्यबिन्दुः
                                    };
                                    let नूतनतन्तु2 = {
                                        प्रारम्भः: मध्यबिन्दुः,
                                        अन्तम्: स्थिर.point
                                    };

                                    नूतनतन्तवः.push(नूतनतन्तु, नूतनतन्तु2);
                                    window.स्थापितास्तन्तवः.push(नूतनतन्तु, नूतनतन्तु2);

                                    window.कर्षण_मूल_अवस्था.push({
                                        बिन्दुः: मध्यबिन्दुः, मूल_क: मध्यबिन्दुः.क, मूल_त: मध्यबिन्दुः.त,
                                        सम्बद्धः: 4, अक्ष_प्रतिबन्धः: क्षैतिजअस्ति ? 'क' : 'त'
                                    });
                                    // Re-attach other unselected wires from the moving स्थिर.point to the stationary gate stub
                                    for (let अन्यतन्तु of window.स्थापितास्तन्तवः) {
                                        if (window.चितास्तन्तवः.includes(अन्यतन्तु)) continue;
                                        if (नूतनतन्तवः.includes(अन्यतन्तु)) continue;

                                        if (अन्यतन्तु.प्रारम्भः.क === स्थिर.point.क && अन्यतन्तु.प्रारम्भः.त === स्थिर.point.त) {
                                            अन्यतन्तु.प्रारम्भः = { क: स्थिर.x, त: स्थिर.y };
                                        }
                                        if (अन्यतन्तु.अन्तम्.क === स्थिर.point.क && अन्यतन्तु.अन्तम्.त === स्थिर.point.त) {
                                            अन्यतन्तु.अन्तम् = { क: स्थिर.x, त: स्थिर.y };
                                        }
                                    }

                                } else {
                                    let नूतनतन्तु = {
                                        प्रारम्भः: { क: स्थिर.x, त: स्थिर.y },
                                        अन्तम्: स्थिर.point
                                    };
                                    नूतनतन्तवः.push(नूतनतन्तु);
                                    window.स्थापितास्तन्तवः.push(नूतनतन्तु);

                                    for (let अन्यतन्तु of window.स्थापितास्तन्तवः) {
                                        if (window.चितास्तन्तवः.includes(अन्यतन्तु)) continue;
                                        if (नूतनतन्तवः.includes(अन्यतन्तु)) continue;

                                        if (अन्यतन्तु.प्रारम्भः.क === स्थिर.point.क && अन्यतन्तु.प्रारम्भः.त === स्थिर.point.त) {
                                            अन्यतन्तु.प्रारम्भः = { क: स्थिर.x, त: स्थिर.y };
                                        }
                                        if (अन्यतन्तु.अन्तम्.क === स्थिर.point.क && अन्यतन्तु.अन्तम्.त === स्थिर.point.त) {
                                            अन्यतन्तु.अन्तम् = { क: स्थिर.x, त: स्थिर.y };
                                        }
                                    }
                                }
                            }

                            // Find connected unselected wires and stretch them ONLY IF they are NOT at a stationary point!
                            for (let अन्यतन्तु of window.स्थापितास्तन्तवः) {
                                if (अन्यतन्तु === चिततन्तु) continue; // Skip self
                                if (window.चितास्तन्तवः.includes(अन्यतन्तु)) continue;
                                if (नूतनतन्तवः.includes(अन्यतन्तु)) continue; // Don't stretch the newly added segments

                                let स्थिरेप्रारम्भअस्ति = स्थिरबिन्दवः.some(sp => sp.point === चिततन्तु.प्रारम्भः);
                                let स्थिरेअन्तअस्ति = स्थिरबिन्दवः.some(sp => sp.point === चिततन्तु.अन्तम्);

                                let isOnSegment = (pt, seg) => {
                                    let minK = Math.min(seg.प्रारम्भः.क, seg.अन्तम्.क);
                                    let maxK = Math.max(seg.प्रारम्भः.क, seg.अन्तम्.क);
                                    let minT = Math.min(seg.प्रारम्भः.त, seg.अन्तम्.त);
                                    let maxT = Math.max(seg.प्रारम्भः.त, seg.अन्तम्.त);
                                    if (seg.प्रारम्भः.क === seg.अन्तम्.क) return pt.क === seg.प्रारम्भः.क && pt.त >= minT && pt.त <= maxT;
                                    if (seg.प्रारम्भः.त === seg.अन्तम्.त) return pt.त === seg.प्रारम्भः.त && pt.क >= minK && pt.क <= maxK;
                                    return false;
                                };
                                let checkAndSplitMiddle = (विन्दुः, चिततन्तु, सम्बद्धः) => {
                                    let isStationaryStart = स्थिरबिन्दवः.some(sp => sp.point.क === चिततन्तु.प्रारम्भः.क && sp.point.त === चिततन्तु.प्रारम्भः.त);
                                    let isStationaryEnd = स्थिरबिन्दवः.some(sp => sp.point.क === चिततन्तु.अन्तम्.क && sp.point.त === चिततन्तु.अन्तम्.त);
                                    let ignorePoint = false;
                                    if (isStationaryStart && विन्दुः.क === चिततन्तु.प्रारम्भः.क && विन्दुः.त === चिततन्तु.प्रारम्भः.त) ignorePoint = true;
                                    if (isStationaryEnd && विन्दुः.क === चिततन्तु.अन्तम्.क && विन्दुः.त === चिततन्तु.अन्तम्.त) ignorePoint = true;

                                    if (!ignorePoint && isOnSegment(विन्दुः, चिततन्तु)) {
                                        let स्थिरबिन्दुः = (विन्दुः === अन्यतन्तु.प्रारम्भः) ? अन्यतन्तु.अन्तम् : अन्यतन्तु.प्रारम्भः;
                                        let isHorizontal = (विन्दुः.त === स्थिरबिन्दुः.त);
                                        let isVertical = (विन्दुः.क === स्थिरबिन्दुः.क);

                                        if (isHorizontal || isVertical) {
                                            let मध्यबिन्दुः = { क: विन्दुः.क, त: विन्दुः.त };
                                            let नूतनतन्तु = { प्रारम्भः: { क: विन्दुः.क, त: विन्दुः.त }, अन्तम्: मध्यबिन्दुः };

                                            if (विन्दुः === अन्यतन्तु.प्रारम्भः) {
                                                नूतनतन्तु.प्रारम्भः = विन्दुः;
                                                अन्यतन्तु.प्रारम्भः = मध्यबिन्दुः;
                                            } else {
                                                नूतनतन्तु.प्रारम्भः = मध्यबिन्दुः;
                                                नूतनतन्तु.अन्तम् = विन्दुः;
                                                अन्यतन्तु.अन्तम् = मध्यबिन्दुः;
                                            }
                                            नूतनतन्तवः.push(नूतनतन्तु);
                                            window.स्थापितास्तन्तवः.push(नूतनतन्तु);

                                            window.कर्षण_मूल_अवस्था.push({ बिन्दुः: विन्दुः, मूल_क: विन्दुः.क, मूल_त: विन्दुः.त, सम्बद्धः: 1 });
                                            window.कर्षण_मूल_अवस्था.push({
                                                बिन्दुः: मध्यबिन्दुः, मूल_क: मध्यबिन्दुः.क, मूल_त: मध्यबिन्दुः.त,
                                                सम्बद्धः: 4, अक्ष_प्रतिबन्धः: isHorizontal ? 'त' : 'क'
                                            });
                                        } else {
                                            window.कर्षण_मूल_अवस्था.push({ बिन्दुः: विन्दुः, मूल_क: विन्दुः.क, मूल_त: विन्दुः.त, सम्बद्धः: 1 });
                                        }
                                    }
                                };
                                checkAndSplitMiddle(अन्यतन्तु.प्रारम्भः, चिततन्तु, 1);
                                checkAndSplitMiddle(अन्यतन्तु.अन्तम्, चिततन्तु, 1);

                                // Inject dummy wires for Gate Pins and Key Pins so checkAndSplitMiddle creates elbows for them
                                let dummyPins = [];
                                for (let द्वार of (window.स्थापितानिद्वाराणि || [])) {
                                    let अग्रकोणः = (द्वार.कोणः || 0) * Math.PI / 180;
                                    let अग्रज्या = Math.sin(अग्रकोणः);
                                    let अग्रकोज्या = Math.cos(अग्रकोणः);
                                    let बिन्दवः = window.getGatePins(द्वार.प्रकारः || 'and');
                                    for (let की of बिन्दवः) {
                                        let द्वार_क = Math.round(द्वार.क + की.x * अग्रकोज्या - की.y * अग्रज्या);
                                        let द्वार_त = Math.round(द्वार.त + की.x * अग्रज्या + की.y * अग्रकोज्या);
                                        dummyPins.push({ प्रारम्भः: { क: द्वार_क, त: द्वार_त }, अन्तम्: { क: द्वार_क, त: द्वार_त } });
                                    }
                                }
                                for (let कीलक of (window.स्थापिताःकीलाः || [])) {
                                    dummyPins.push({ प्रारम्भः: { क: कीलक.क, त: कीलक.त }, अन्तम्: { क: कीलक.क, त: कीलक.त } });
                                }
                                for (let pinWire of dummyPins) {
                                    checkAndSplitMiddle(pinWire.प्रारम्भः, चिततन्तु, 1);
                                }

                            let checkHostWire = (चितबिन्दुः, होस्टतन्तु) => {
                                    if ((चितबिन्दुः.क === होस्टतन्तु.प्रारम्भः.क && चितबिन्दुः.त === होस्टतन्तु.प्रारम्भः.त) ||
                                        (चितबिन्दुः.क === होस्टतन्तु.अन्तम्.क && चितबिन्दुः.त === होस्टतन्तु.अन्तम्.त)) {
                                        return;
                                    }
                                    if (isOnSegment(चितबिन्दुः, होस्टतन्तु)) {
                                        let नूतनतन्तु = { प्रारम्भः: चितबिन्दुः, अन्तम्: होस्टतन्तु.अन्तम् };
                                        होस्टतन्तु.अन्तम् = चितबिन्दुः;
                                        नूतनतन्तवः.push(नूतनतन्तु);
                                        window.स्थापितास्तन्तवः.push(नूतनतन्तु);

                                        let isHostHorizontal = (होस्टतन्तु.प्रारम्भः.त === होस्टतन्तु.अन्तम्.त);
                                        let isHostVertical = (होस्टतन्तु.प्रारम्भः.क === होस्टतन्तु.अन्तम्.क);

                                        let अवस्था = window.कर्षण_मूल_अवस्था.find(a => a.बिन्दुः === चितबिन्दुः);
                                        if (अवस्था) {
                                            if (isHostHorizontal) अवस्था.अक्ष_प्रतिबन्धः = 'त';
                                            if (isHostVertical) अवस्था.अक्ष_प्रतिबन्धः = 'क';
                                        }
                                    }
                                };
                                checkHostWire(चिततन्तु.प्रारम्भः, अन्यतन्तु);
                                checkHostWire(चिततन्तु.अन्तम्, अन्यतन्तु);
                            }
                        }
                        window.द्वाररेखनम्();
                        return; // Prevent further mousedown logic
                    }
                }

                // If we reach here, we clicked empty space in normal mode. Start drawing selection box.
                window.चितास्तन्तवः = []; // Clear previous selection
                window.चिताःकीलाः = [];
                window.चयनपेटी = {
                    प्रारम्भ_क: मूल_क,
                    प्रारम्भ_त: मूल_त,
                    वर्तमान_क: मूल_क,
                    वर्तमान_त: मूल_त
                };
                window.द्वाररेखनम्();
                return;
            }

            let क = Math.round((सम्भवम्.clientX - आयता.left) / window.गुणकः / 10) * 10;
            let त = Math.round((सम्भवम्.clientY - आयता.top) / window.गुणकः / 10) * 10;

            if (window.सक्रियकीलकस्थापनम्) {
                if (!स्थानम्_रिक्तम्_अस्ति(क, त, 'कीलक', window.वर्तमानकीलकप्रकारः)) {
                    return; // Prevent placement inside 15px padding
                }
                window.स्थापिताःकीलाः.push({
                    क: क,
                    त: त,
                    नाम: window.वर्तमानकीलकनाम,
                    प्रकारः: window.वर्तमानकीलकप्रकारः
                });
                सामान्यस्थित्यागमनम्();
                return;
            }

            if (window.सक्रियद्वारस्थापनम्) {
                if (!स्थानम्_रिक्तम्_अस्ति(क, त, 'द्वार')) {
                    return; // Prevent placement inside 15px padding
                }
                window.स्थापितानिद्वाराणि.push({ प्रकारः: window.वर्तमानद्वारप्रकारः,
                    क: क,
                    त: त,
                    नाम: window.वर्तमानद्वारनाम,
                    कोणः: window.वर्तमानद्वारकोणः,
                    लम्बप्रतिबिम्बः: window.वर्तमानद्वारलम्बप्रतिबिम्बः
                });
                सामान्यस्थित्यागमनम्();
                return;
            }

            if (window.अस्थायीतन्तवः.length > 0) {
                const प्रारम्भबिन्दुः = window.तन्तु_मूल_बिन्दुः || window.अस्थायीतन्तवः[0].प्रारम्भः;
                if (क === प्रारम्भबिन्दुः.क && त === प्रारम्भबिन्दुः.त) {
                    const मूल_क = (सम्भवम्.clientX - आयता.left) / window.गुणकः;
                    const मूल_त = (सम्भवम्.clientY - आयता.top) / window.गुणकः;
                    const क_भेदः = Math.abs(मूल_क - प्रारम्भबिन्दुः.क);
                    const त_भेदः = Math.abs(मूल_त - प्रारम्भबिन्दुः.त);
                    if (क_भेदः > 2 || त_भेदः > 2) {
                        if (क_भेदः > त_भेदः) {
                            क = प्रारम्भबिन्दुः.क + (मूल_क > प्रारम्भबिन्दुः.क ? 10 : -10);
                        } else {
                            त = प्रारम्भबिन्दुः.त + (मूल_त > प्रारम्भबिन्दुः.त ? 10 : -10);
                        }
                    }
                }
            }


            if (window.अस्थायीतन्तवः.length === 0) {
                // First click: Create the temporary wire starting at the mouse
                if (window.समीपस्थबिन्दुः) {
                    क = window.समीपस्थबिन्दुः.क;
                    त = window.समीपस्थबिन्दुः.त;
                }
                if (द्वारकीलकःतथाव्याप्तः(क, त)) {
                    return; // Ignore click on an already occupied gate pin
                }
                window.तन्तु_मूल_बिन्दुः = { क: क, त: त };
                window.अस्थायीतन्तवः.push({ प्रारम्भः: { क: क, त: त }, अन्तम्: { क: क, त: त } });
            } else {
                if (द्वारकीलकःतथाव्याप्तः(क, त)) {
                    return; // Ignore click on an already occupied gate pin
                }
                // Check if the current endpoint intersects with an existing permanent wire
                let प्रतिच्छेदः = false;
                let सन्धि_सङ्ख्या = 0;
                let नूतन_विभक्त_तन्तवः = [];

                for (let स्थापिततन्तुः of window.स्थापितास्तन्तवः) {
                    let क1 = स्थापिततन्तुः.प्रारम्भः.क, त1 = स्थापिततन्तुः.प्रारम्भः.त;
                    let क2 = स्थापिततन्तुः.अन्तम्.क, त2 = स्थापिततन्तुः.अन्तम्.त;

                    if (क1 === क2 && त1 === त2) continue; // Ignore zero-length points

                    let अतिव्याप्तम् = false;
                    if (त1 === त2 && त === त1 && क >= Math.min(क1, क2) && क <= Math.max(क1, क2)) {
                        अतिव्याप्तम् = true;
                    } else if (क1 === क2 && क === क1 && त >= Math.min(त1, त2) && त <= Math.max(त1, त2)) {
                        अतिव्याप्तम् = true;
                    }

                    if (अतिव्याप्तम्) {
                        प्रतिच्छेदः = true;
                        // More robustly count connections at the intersection point.
                        // If the click is on an endpoint, it's 1 connection from this wire.
                        if ((क === क1 && त === त1) || (क === क2 && त === त2)) {
                            सन्धि_सङ्ख्या += 1;
                        } else {
                            // If the click is in the middle, it represents 2 connections (in and out).
                            सन्धि_सङ्ख्या += 2;
                            // Split the intersected wire into two segments
                            स्थापिततन्तुः.अन्तम् = { क: क, त: त };
                            नूतन_विभक्त_तन्तवः.push({
                                प्रारम्भः: { क: क, त: त },
                                अन्तम्: { क: क2, त: त2 }
                            });
                        }
                    }
                }

                if (नूतन_विभक्त_तन्तवः.length > 0) {
                    window.स्थापितास्तन्तवः.push(...नूतन_विभक्त_तन्तवः);
                }

                if (प्रतिच्छेदः && द्वारसीमापेटीअन्तःअस्ति(क, त)) {
                    return; // No T-junctions of wire allowed within this invisible box
                }

                // Scenario 1: Drawing TO an overloaded junction creates a start-based L-shape detour
                if (सन्धि_सङ्ख्या >= 3) {
                    if (window.अस्थायीतन्तवः.length > 0) {
                        let अन्तिमतन्तुः = window.अस्थायीतन्तवः[window.अस्थायीतन्तवः.length - 1];
                        let दिशा_त = अन्तिमतन्तुः.अन्तम्.त - अन्तिमतन्तुः.प्रारम्भः.त;

                        let विमार्ग_क = अन्तिमतन्तुः.प्रारम्भः.क;
                        let विमार्ग_त = अन्तिमतन्तुः.प्रारम्भः.त;

                        if (दिशा_त !== 0) {
                            // Vertical incoming wire. Step horizontally at the START.
                            विमार्ग_क += 10;
                            क += 10;
                        } else {
                            // Horizontal incoming wire. Step vertically at the START.
                            विमार्ग_त += 10;
                            त += 10;
                        }

                        // First segment: Start point to the detoured step
                        अन्तिमतन्तुः.अन्तम्.क = विमार्ग_क;
                        अन्तिमतन्तुः.अन्तम्.त = विमार्ग_त;

                        // Second segment: Run parallel into the newly shifted end coordinate
                        window.अस्थायीतन्तवः.push({
                            प्रारम्भः: { क: विमार्ग_क, त: विमार्ग_त },
                            अन्तम्: { क: क, त: त }
                        });
                    }
                    प्रतिच्छेदः = false; // Allow routing to continue from this new point
                }

                let invalidRouting = false;
                for (let तन्तु of window.अस्थायीतन्तवः) {
                    if (तन्तु.प्रारम्भः.क === तन्तु.अन्तम्.क && तन्तु.प्रारम्भः.त === तन्तु.अन्तम्.त) continue;
                    if (तन्तुखण्डःकुत्रापिसीमापेटीअन्तःअस्ति(तन्तु)) {
                        let isStub = false;
                        let startStub = द्वारकीलतन्तुप्राप्ति(तन्तु.प्रारम्भः.क, तन्तु.प्रारम्भः.त);
                        let endStub = द्वारकीलतन्तुप्राप्ति(तन्तु.अन्तम्.क, तन्तु.अन्तम्.त);

                        if (startStub && startStub.क === तन्तु.अन्तम्.क && startStub.त === तन्तु.अन्तम्.त) isStub = true;
                        if (endStub && endStub.क === तन्तु.प्रारम्भः.क && endStub.त === तन्तु.प्रारम्भः.त) isStub = true;

                        if (!isStub) {
                            invalidRouting = true;
                            break;
                        }
                    }
                }

                if (invalidRouting) {
                    return; // Reject clicking because wire routes through a boundary
                }

                // Second click: Save the wire permanently and reset
                for (let तन्तु of window.अस्थायीतन्तवः) {
                    // Only save segments that actually have some length
                    if (तन्तु.प्रारम्भः.क !== तन्तु.अन्तम्.क || तन्तु.प्रारम्भः.त !== तन्तु.अन्तम्.त) {
                        window.स्थापितास्तन्तवः.push(तन्तु);
                    }
                }
                if (प्रतिच्छेदः) {
                    window.अस्थायीतन्तवः = []; // Terminate the wire routing
                    window.तन्तु_मूल_बिन्दुः = null;
                } else {
                    // Continue drawing the next wire segment from the end of the previous one
                    window.अस्थायीतन्तवः = [{ प्रारम्भः: { क: क, त: त }, अन्तम्: { क: क, त: त } }];
                    window.तन्तु_मूल_बिन्दुः = { क: क, त: त };
                }
            }
            window.द्वाररेखनम्();
        });


        तर्कद्वारपटवस्तु.addEventListener('mousemove', (सम्भवम्) => {
            const आयता = तर्कद्वारपटवस्तु.getBoundingClientRect();
            let मूल_क = (सम्भवम्.clientX - आयता.left) / window.गुणकः;
            let मूल_त = (सम्भवम्.clientY - आयता.top) / window.गुणकः;

            if (window.विस्तार_प्रकारः || window.संकोच_प्रकारः) {
                return;
            }

            if (window.प्रतिकृति_प्रकारः) {
                if (window.चयनपेटी) {
                    window.चयनपेटी.वर्तमान_क = मूल_क;
                    window.चयनपेटी.वर्तमान_त = मूल_त;
                    window.द्वाररेखनम्();
                    return;
                }
                if ((window.प्रतिकृति_तन्तवः && window.प्रतिकृति_तन्तवः.length > 0) ||
                    (window.प्रतिकृति_कीलाः && window.प्रतिकृति_कीलाः.length > 0) ||
                    (window.प्रतिकृति_द्वाराणि && window.प्रतिकृति_द्वाराणि.length > 0)) {
                    प्रतिकृति_अद्यतनम्(मूल_क, मूल_त);
                }
                window.द्वाररेखनम्();
                return;
            }

            if (window.मार्जन_प्रकारः) {
                if (window.चयनपेटी) {
                    window.चयनपेटी.वर्तमान_क = मूल_क;
                    window.चयनपेटी.वर्तमान_त = मूल_त;
                    window.द्वाररेखनम्();
                }
                return;
            }

            if (window.सक्रियकीलकस्थापनम्) {
                let क = Math.round(मूल_क / 10) * 10;
                let त = Math.round(मूल_त / 10) * 10;
                window.अस्थायीकीलकः = {
                    क: क,
                    त: त,
                    नाम: window.वर्तमानकीलकनाम,
                    प्रकारः: window.वर्तमानकीलकप्रकारः
                };
                window.द्वाररेखनम्();
                return;
            }

            if (window.सक्रियद्वारस्थापनम्) {
                let क = Math.round(मूल_क / 10) * 10;
                let त = Math.round(मूल_त / 10) * 10;
                window.अस्थायीद्वारम् = { क: क, त: त, नाम: window.वर्तमानद्वारनाम, प्रकारः: window.वर्तमानद्वारप्रकारः || 'and', कोणः: window.वर्तमानद्वारकोणः, लम्बप्रतिबिम्बः: window.वर्तमानद्वारलम्बप्रतिबिम्बः };
                window.द्वाररेखनम्();
                return;
            }

            if (!window.सक्रियतन्तुस्थापनम् && !window.सक्रियद्वारस्थापनम्) {
                if (window.चयनपेटी) {
                    window.चयनपेटी.वर्तमान_क = मूल_क;
                    window.चयनपेटी.वर्तमान_त = मूल_त;
                    window.द्वाररेखनम्();
                    return;
                }

                if (window.आकृष्यमाणतन्तुः || window.आकृष्यमाणकीलकः || window.आकृष्यमाणद्वारम्) {
                    let समीप_क = Math.round(मूल_क / 10) * 10;
                    let समीप_त = Math.round(मूल_त / 10) * 10;
                    let प्रारम्भ_समीप_क = Math.round(window.कर्षण_प्रारम्भ_क / 10) * 10;
                    let प्रारम्भ_समीप_त = Math.round(window.कर्षण_प्रारम्भ_त / 10) * 10;

                    let क_भेद = समीप_क - प्रारम्भ_समीप_क;
                    let त_भेद = समीप_त - प्रारम्भ_समीप_त;

                    if (window.आकृष्यमाणतन्तुः) {
                        let तन्तु_अवस्था = window.कर्षण_मूल_अवस्था[0];
                        let क1 = तन्तु_अवस्था.मूल_क, त1 = तन्तु_अवस्था.मूल_त;
                        let तन्तु_अवस्था2 = window.कर्षण_मूल_अवस्था[1];
                        let क2 = तन्तु_अवस्था2.मूल_क, त2 = तन्तु_अवस्था2.मूल_त;

                        // Determine translation direction based on line orientation ONLY for single wire selection
                        if (window.चितास्तन्तवः && window.चितास्तन्तवः.length <= 1) {
                            if (त1 === त2) { // Horizontal line -> translate vertically
                                क_भेद = 0;
                            } else if (क1 === क2) { // Vertical line -> translate horizontally
                                त_भेद = 0;
                            }
                        }
                    }

                    // Helper function to check collision for a given offset
                    let checkCollisionForOffset = (क_विमार्गः, त_विमार्गः) => {
                        for (let अवस्था of window.कर्षण_मूल_अवस्था) {
                            if (अवस्था.अक्ष_प्रतिबन्धः === 'क') {
                                अवस्था.बिन्दुः.क = अवस्था.मूल_क;
                                अवस्था.बिन्दुः.त = अवस्था.मूल_त + त_भेद + त_विमार्गः;
                            } else if (अवस्था.अक्ष_प्रतिबन्धः === 'त') {
                                अवस्था.बिन्दुः.क = अवस्था.मूल_क + क_भेद + क_विमार्गः;
                                अवस्था.बिन्दुः.त = अवस्था.मूल_त;
                            } else {
                                अवस्था.बिन्दुः.क = अवस्था.मूल_क + क_भेद + क_विमार्गः;
                                अवस्था.बिन्दुः.त = अवस्था.मूल_त + त_भेद + त_विमार्गः;
                            }
                        }

                        let सङ्घट्टनम् = false;
                        for (let तन्तु of window.स्थापितास्तन्तवः) {
                            let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
                            let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;

                            let आकृष्यते = false;
                            for (let अवस्था of window.कर्षण_मूल_अवस्था) {
                                if (अवस्था.बिन्दुः === तन्तु.प्रारम्भः || अवस्था.बिन्दुः === तन्तु.अन्तम्) {
                                    आकृष्यते = true; break;
                                }
                            }

                            if (!आकृष्यते) continue;

                            for (let अन्यतन्तु of window.स्थापितास्तन्तवः) {
                                let अन्य_आकृष्यते = false;
                                for (let अवस्था of window.कर्षण_मूल_अवस्था) {
                                    if (अवस्था.बिन्दुः === अन्यतन्तु.प्रारम्भः || अवस्था.बिन्दुः === अन्यतन्तु.अन्तम्) {
                                        अन्य_आकृष्यते = true; break;
                                    }
                                }
                                if (अन्य_आकृष्यते) continue;

                                let बिन्दवः = [अन्यतन्तु.प्रारम्भः, अन्यतन्तु.अन्तम्];
                                for (let बिन्दुः of बिन्दवः) {
                                    // Ignore collision if it exactly matches an un-dragged endpoint of the current wire
                                    let स्थिर_अन्तम्_मिलति१ = false;
                                    let स्थिर_अन्तम्_मिलति२ = false;

                                    let आकृष्यते१ = false;
                                    let आकृष्यते२ = false;
                                    for (let अवस्था of window.कर्षण_मूल_अवस्था) {
                                        if (अवस्था.बिन्दुः === तन्तु.प्रारम्भः) आकृष्यते१ = true;
                                        if (अवस्था.बिन्दुः === तन्तु.अन्तम्) आकृष्यते२ = true;
                                    }

                                    if (बिन्दुः.क === तन्तु.प्रारम्भः.क && बिन्दुः.त === तन्तु.प्रारम्भः.त && !आकृष्यते१) स्थिर_अन्तम्_मिलति१ = true;
                                    if (बिन्दुः.क === तन्तु.अन्तम्.क && बिन्दुः.त === तन्तु.अन्तम्.त && !आकृष्यते२) स्थिर_अन्तम्_मिलति२ = true;

                                    if (स्थिर_अन्तम्_मिलति१ || स्थिर_अन्तम्_मिलति२) continue;

                                    let अतिव्याप्तम् = false;
                                    if (त1 === त2 && बिन्दुः.त === त1 && बिन्दुः.क >= Math.min(क1, क2) && बिन्दुः.क <= Math.max(क1, क2)) {
                                        अतिव्याप्तम् = true;
                                    } else if (क1 === क2 && बिन्दुः.क === क1 && बिन्दुः.त >= Math.min(त1, त2) && बिन्दुः.त <= Math.max(त1, त2)) {
                                        अतिव्याप्तम् = true;
                                    }

                                    if (अतिव्याप्तम्) {
                                        सङ्घट्टनम् = true;
                                        break;
                                    }
                                }
                                if (सङ्घट्टनम्) break;
                            }

                            // Prevent dragged wire segments from entering any gate's invisible bounding box
                            if (!सङ्घट्टनम् && तन्तुखण्डःकुत्रापिसीमापेटीअन्तःअस्ति(तन्तु)) {
                                सङ्घट्टनम् = true;
                            }

                            if (सङ्घट्टनम्) break;
                        }

                        if (!सङ्घट्टनम् && window.चितानिद्वाराणि && window.चितानिद्वाराणि.length > 0) {
                            for (let चितद्वार of window.चितानिद्वाराणि) {
                                let अवस्था = window.कर्षण_मूल_अवस्था.find(s => s.बिन्दुः === चितद्वार);
                                if (अवस्था && !स्थानम्_रिक्तम्_अस्ति(अवस्था.बिन्दुः.क, अवस्था.बिन्दुः.त, 'द्वार', null, चितद्वार)) {
                                    सङ्घट्टनम् = true;
                                    break;
                                }
                            }
                        }

                        if (!सङ्घट्टनम् && window.चिताःकीलाः && window.चिताःकीलाः.length > 0) {
                            for (let चितकीलक of window.चिताःकीलाः) {
                                let अवस्था = window.कर्षण_मूल_अवस्था.find(s => s.बिन्दुः === चितकीलक);
                                if (अवस्था && !स्थानम्_रिक्तम्_अस्ति(अवस्था.बिन्दुः.क, अवस्था.बिन्दुः.त, 'कीलक', चितकीलक.प्रकारः, चितकीलक)) {
                                    सङ्घट्टनम् = true;
                                    break;
                                }
                            }
                        }

                        return सङ्घट्टनम्;
                    };

                    // Auto-detour loop
                    let प्राप्तम् = false;
                    let विमार्गाः = [
                        { क: 0, त: 0 },
                        { क: 0, त: 10 }, { क: 0, त: -10 }, { क: 10, त: 0 }, { क: -10, त: 0 },
                        { क: 0, त: 20 }, { क: 0, त: -20 }, { क: 20, त: 0 }, { क: -20, त: 0 },
                        { क: 0, त: 30 }, { क: 0, त: -30 }, { क: 30, त: 0 }, { क: -30, त: 0 }
                    ];

                    for (let विमार्ग of विमार्गाः) {
                        let सङ्घट्टनम् = checkCollisionForOffset(विमार्ग.क, विमार्ग.त);
                        if (!सङ्घट्टनम्) {
                            प्राप्तम् = true;
                            for (let अवस्था of window.कर्षण_मूल_अवस्था) {
                                अवस्था.अन्तिम_क = अवस्था.बिन्दुः.क;
                                अवस्था.अन्तिम_त = अवस्था.बिन्दुः.त;
                            }
                            break;
                        }
                    }

                    if (!प्राप्तम्) {
                        // If all reasonable detours fail, revert to last known good state
                        for (let अवस्था of window.कर्षण_मूल_अवस्था) {
                            अवस्था.बिन्दुः.क = अवस्था.अन्तिम_क !== undefined ? अवस्था.अन्तिम_क : अवस्था.मूल_क;
                            अवस्था.बिन्दुः.त = अवस्था.अन्तिम_त !== undefined ? अवस्था.अन्तिम_त : अवस्था.मूल_त;
                        }
                    }
                    window.द्वाररेखनम्();
                    return;
                }

                // Hover detection for grabbing cursor
                let स्पर्शः = false;
                for (let तन्तु of window.स्थापितास्तन्तवः) {
                    let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
                    let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;

                    let रेखीय_अन्तरम्;
                    if (त1 === त2) { // Horizontal
                        if (मूल_क >= Math.min(क1, क2) - 5 && मूल_क <= Math.max(क1, क2) + 5) {
                            रेखीय_अन्तरम् = Math.abs(मूल_त - त1);
                        } else {
                            रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                        }
                    } else if (क1 === क2) { // Vertical
                        if (मूल_त >= Math.min(त1, त2) - 5 && मूल_त <= Math.max(त1, त2) + 5) {
                            रेखीय_अन्तरम् = Math.abs(मूल_क - क1);
                        } else {
                            रेखीय_अन्तरम् = Math.min(Math.hypot(मूल_क - क1, मूल_त - त1), Math.hypot(मूल_क - क2, मूल_त - त2));
                        }
                    }

                    if (रेखीय_अन्तरम् !== undefined && रेखीय_अन्तरम् <= 5 && (क1 !== क2 || त1 !== त2)) {
                        स्पर्शः = true;
                        break;
                    }
                }
                document.getElementById('तर्कद्वारपटः').style.cursor = स्पर्शः ? 'grab' : '';
                return;
            }

            if (!window.सक्रियतन्तुस्थापनम्) return;

            // Track endpoint hovering for both starting a wire and ending a wire
            let पूर्व_समीपस्थबिन्दुः = window.समीपस्थबिन्दुः;
            window.समीपस्थबिन्दुः = null;
            let न्यूनतम_अन्तरम् = 5; // 5px snap radius (less than grid size to allow parallel drawing)

            // Check endpoints of all permanent wires
            for (let तन्तु of window.स्थापितास्तन्तवः) {
                if (तन्तु.प्रारम्भः.क === तन्तु.अन्तम्.क && तन्तु.प्रारम्भः.त === तन्तु.अन्तम्.त) continue;

                let अन्तराणि = [
                    { क: तन्तु.प्रारम्भः.क, त: तन्तु.प्रारम्भः.त, d: Math.hypot(मूल_क - तन्तु.प्रारम्भः.क, मूल_त - तन्तु.प्रारम्भः.त) },
                    { क: तन्तु.अन्तम्.क, त: तन्तु.अन्तम्.त, d: Math.hypot(मूल_क - तन्तु.अन्तम्.क, मूल_त - तन्तु.अन्तम्.त) }
                ];

                for (let अ of अन्तराणि) {
                    if (अ.d <= न्यूनतम_अन्तरम्) {
                        // Calculate connections at this endpoint
                        let सन्धि_सङ्ख्या = 0;
                        for (let स्थापिततन्तुः of window.स्थापितास्तन्तवः) {
                            let क1 = स्थापिततन्तुः.प्रारम्भः.क, त1 = स्थापिततन्तुः.प्रारम्भः.त;
                            let क2 = स्थापिततन्तुः.अन्तम्.क, त2 = स्थापिततन्तुः.अन्तम्.त;
                            if (क1 === क2 && त1 === त2) continue;

                            let अतिव्याप्तम् = false;
                            if (त1 === त2 && अ.त === त1 && अ.क >= Math.min(क1, क2) && अ.क <= Math.max(क1, क2)) {
                                अतिव्याप्तम् = true;
                            } else if (क1 === क2 && अ.क === क1 && अ.त >= Math.min(त1, त2) && अ.त <= Math.max(त1, त2)) {
                                अतिव्याप्तम् = true;
                            }

                            if (अतिव्याप्तम्) {
                                if ((अ.क === क1 && अ.त === त1) || (अ.क === क2 && अ.त === त2)) {
                                    सन्धि_सङ्ख्या += 1;
                                } else {
                                    सन्धि_सङ्ख्या += 2;
                                }
                            }
                        }

                        // Only allow snapping if the junction is not full (less than 3 connections) and not inside a gate's bounding box
                        if (सन्धि_सङ्ख्या < 3 && !द्वारसीमापेटीअन्तःअस्ति(अ.क, अ.त)) {
                            न्यूनतम_अन्तरम् = अ.d;
                            window.समीपस्थबिन्दुः = { क: अ.क, त: अ.त };
                        }
                    }
                }
            }

            // Also check snap to pins
            if (window.स्थापिताःकीलाः) {
                for (let कीलक of window.स्थापिताःकीलाः) {
                    let d = Math.hypot(मूल_क - कीलक.क, मूल_त - कीलक.त);
                    if (d <= न्यूनतम_अन्तरम्) {
                        न्यूनतम_अन्तरम् = d;
                        window.समीपस्थबिन्दुः = { क: कीलक.क, त: कीलक.त };
                    }
                }
            }

            // Also check snap to gates (if mouse is within the gate's bounding box, snap to nearest pin)
            if (window.स्थापितानिद्वाराणि) {
                for (let द्वार of window.स्थापितानिद्वाराणि) {
                    let dx = मूल_क - द्वार.क;
                    let dy = मूल_त - द्वार.त;
                    let angle = -द्वार.कोणः * Math.PI / 180;
                    let s = Math.sin(angle);
                    let c = Math.cos(angle);
                    let local_x = dx * c - dy * s;
                    let local_y = dx * s + dy * c;

                    // Gate bounding box is roughly x: -20 to 30, y: -15 to 15. We add a 10px margin.
                    if (local_x >= -30 && local_x <= 40 && local_y >= -25 && local_y <= 25) {
                        let pins = window.getGatePins(द्वार.प्रकारः || 'and');
                        let min_d = Infinity;
                        let nearest_pin = null;
                        for (let p of pins) {
                            let dist = Math.hypot(local_x - p.x, local_y - p.y);
                            if (dist < min_d) {
                                min_d = dist;
                                nearest_pin = p;
                            }
                        }
                        if (nearest_pin) {
                            let forward_angle = द्वार.कोणः * Math.PI / 180;
                            let fs = Math.sin(forward_angle);
                            let fc = Math.cos(forward_angle);
                            let pin_y = द्वार.लम्बप्रतिबिम्बः ? -nearest_pin.y : nearest_pin.y;
                            let world_क = Math.round(द्वार.क + nearest_pin.x * fc - pin_y * fs);
                            let world_त = Math.round(द्वार.त + nearest_pin.x * fs + pin_y * fc);
                            if (!द्वारकीलकःतथाव्याप्तः(world_क, world_त)) {
                                न्यूनतम_अन्तरम् = Infinity; // Guaranteed to override any other 5px snaps
                                window.समीपस्थबिन्दुः = { क: world_क, त: world_त };
                            }
                        }
                    }
                }
            }

            // If the finalized snap point happens to be an already occupied gate pin, clear it so no yellow diamond is shown
            if (window.समीपस्थबिन्दुः && द्वारकीलकःतथाव्याप्तः(window.समीपस्थबिन्दुः.क, window.समीपस्थबिन्दुः.त)) {
                window.समीपस्थबिन्दुः = null;
            }

            // Only re-render if the snap point changed to avoid lag
            let बिन्दु_परिवर्तनम् = false;
            if (!पूर्व_समीपस्थबिन्दुः && window.समीपस्थबिन्दुः) बिन्दु_परिवर्तनम् = true;
            if (पूर्व_समीपस्थबिन्दुः && !window.समीपस्थबिन्दुः) बिन्दु_परिवर्तनम् = true;
            if (पूर्व_समीपस्थबिन्दुः && window.समीपस्थबिन्दुः &&
                (पूर्व_समीपस्थबिन्दुः.क !== window.समीपस्थबिन्दुः.क || पूर्व_समीपस्थबिन्दुः.त !== window.समीपस्थबिन्दुः.त)) {
                बिन्दु_परिवर्तनम् = true;
            }

            // If we are NOT actively drawing a wire, we are done
            if (window.अस्थायीतन्तवः.length === 0) {
                if (बिन्दु_परिवर्तनम्) window.द्वाररेखनम्();
                return;
            }

            // If we ARE actively drawing a wire, update its end position and redraw
            let वर्तमान_क = Math.round((सम्भवम्.clientX - आयता.left) / window.गुणकः / 10) * 10;
            let वर्तमान_त = Math.round((सम्भवम्.clientY - आयता.top) / window.गुणकः / 10) * 10;

            // Snap the drawing endpoint if hovering over a valid junction
            if (window.समीपस्थबिन्दुः) {
                वर्तमान_क = window.समीपस्थबिन्दुः.क;
                वर्तमान_त = window.समीपस्थबिन्दुः.त;
            }


            const प्रारम्भबिन्दुः = window.तन्तु_मूल_बिन्दुः ? { क: window.तन्तु_मूल_बिन्दुः.क, त: window.तन्तु_मूल_बिन्दुः.त } : { क: window.अस्थायीतन्तवः[0].प्रारम्भः.क, त: window.अस्थायीतन्तवः[0].प्रारम्भः.त };

            // Scenario 2: Starting from an overloaded junction dynamically shifts start point
            let प्रारम्भ_सन्धि_सङ्ख्या = 0;
            for (let स्थापिततन्तुः of window.स्थापितास्तन्तवः) {
                let क1 = स्थापिततन्तुः.प्रारम्भः.क, त1 = स्थापिततन्तुः.प्रारम्भः.त;
                let क2 = स्थापिततन्तुः.अन्तम्.क, त2 = स्थापिततन्तुः.अन्तम्.त;
                if (क1 === क2 && त1 === त2) continue;
                if (त1 === त2 && प्रारम्भबिन्दुः.त === त1 && प्रारम्भबिन्दुः.क >= Math.min(क1, क2) && प्रारम्भबिन्दुः.क <= Math.max(क1, क2)) {
                    if ((प्रारम्भबिन्दुः.क === क1 && प्रारम्भबिन्दुः.त === त1) || (प्रारम्भबिन्दुः.क === क2 && प्रारम्भबिन्दुः.त === त2)) प्रारम्भ_सन्धि_सङ्ख्या += 1;
                    else प्रारम्भ_सन्धि_सङ्ख्या += 2;
                } else if (क1 === क2 && प्रारम्भबिन्दुः.क === क1 && प्रारम्भबिन्दुः.त >= Math.min(त1, त2) && प्रारम्भबिन्दुः.त <= Math.max(त1, त2)) {
                    if ((प्रारम्भबिन्दुः.क === क1 && प्रारम्भबिन्दुः.त === त1) || (प्रारम्भबिन्दुः.क === क2 && प्रारम्भबिन्दुः.त === त2)) प्रारम्भ_सन्धि_सङ्ख्या += 1;
                    else प्रारम्भ_सन्धि_सङ्ख्या += 2;
                }
            }
            if (प्रारम्भ_सन्धि_सङ्ख्या >= 3) {
                let प्रारम्भ_क_भेद = Math.abs(वर्तमान_क - प्रारम्भबिन्दुः.क);
                let प्रारम्भ_त_भेद = Math.abs(वर्तमान_त - प्रारम्भबिन्दुः.त);
                if (प्रारम्भ_क_भेद > प्रारम्भ_त_भेद && प्रारम्भ_क_भेद >= 10) {
                    प्रारम्भबिन्दुः.त += 10;
                    वर्तमान_त += 10;
                } else if (प्रारम्भ_त_भेद > प्रारम्भ_क_भेद && प्रारम्भ_त_भेद >= 10) {
                    प्रारम्भबिन्दुः.क += 10;
                    वर्तमान_क += 10;
                }
            }

            if (वर्तमान_क === प्रारम्भबिन्दुः.क && वर्तमान_त === प्रारम्भबिन्दुः.त) {
                const मूल_क = (सम्भवम्.clientX - आयता.left) / window.गुणकः;
                const मूल_त = (सम्भवम्.clientY - आयता.top) / window.गुणकः;
                const क_भेदः = Math.abs(मूल_क - प्रारम्भबिन्दुः.क);
                const त_भेदः = Math.abs(मूल_त - प्रारम्भबिन्दुः.त);
                if (क_भेदः > 2 || त_भेदः > 2) {
                    if (क_भेदः > त_भेदः) {
                        वर्तमान_क = प्रारम्भबिन्दुः.क + (मूल_क > प्रारम्भबिन्दुः.क ? 10 : -10);
                    } else {
                        वर्तमान_त = प्रारम्भबिन्दुः.त + (मूल_त > प्रारम्भबिन्दुः.त ? 10 : -10);
                    }
                }
            }
            let actual_start = { क: प्रारम्भबिन्दुः.क, त: प्रारम्भबिन्दुः.त };
            let actual_end = { क: वर्तमान_क, त: वर्तमान_त };

            let start_stub = द्वारकीलतन्तुप्राप्ति(प्रारम्भबिन्दुः.क, प्रारम्भबिन्दुः.त);
            if (start_stub) {
                actual_start = start_stub;
            }

            let end_stub = null;
            if (window.समीपस्थबिन्दुः) {
                end_stub = द्वारकीलतन्तुप्राप्ति(window.समीपस्थबिन्दुः.क, window.समीपस्थबिन्दुः.त);
                if (end_stub) {
                    actual_end = end_stub;
                }
            }

            const क_भेदः = Math.abs(actual_end.क - actual_start.क);
            const त_भेदः = Math.abs(actual_end.त - actual_start.त);

            let सम्भाव्यतन्तुः१, सम्भाव्यतन्तुः२;

            if (क_भेदः > त_भेदः) {
                सम्भाव्यतन्तुः१ = { प्रारम्भः: actual_start, अन्तम्: { क: actual_end.क, त: actual_start.त } };
                सम्भाव्यतन्तुः२ = { प्रारम्भः: { क: actual_end.क, त: actual_start.त }, अन्तम्: actual_end };
            } else {
                सम्भाव्यतन्तुः१ = { प्रारम्भः: actual_start, अन्तम्: { क: actual_start.क, त: actual_end.त } };
                सम्भाव्यतन्तुः२ = { प्रारम्भः: { क: actual_start.क, त: actual_end.त }, अन्तम्: actual_end };
            }

            // Reset temporary wire segments to avoid a "paintbrush" effect
            window.अस्थायीतन्तवः = [];

            if (start_stub) {
                window.अस्थायीतन्तवः.push({ प्रारम्भः: प्रारम्भबिन्दुः, अन्तम्: start_stub });
            }

            // Check Segment 1 (Ignore if zero-length)
            if (सम्भाव्यतन्तुः१.प्रारम्भः.क !== सम्भाव्यतन्तुः१.अन्तम्.क || सम्भाव्यतन्तुः१.प्रारम्भः.त !== सम्भाव्यतन्तुः१.अन्तम्.त) {
                if (!सरेखअतिव्याप्तिपरीक्षणम्(सम्भाव्यतन्तुः१)) {
                    window.अस्थायीतन्तवः.push(सम्भाव्यतन्तुः१);
                } else {
                    विमार्गकल्पनम्(सम्भाव्यतन्तुः१, actual_end);
                }
            }

            // Check Segment 2 (Ignore if zero-length)
            if (सम्भाव्यतन्तुः२.प्रारम्भः.क !== सम्भाव्यतन्तुः२.अन्तम्.क || सम्भाव्यतन्तुः२.प्रारम्भः.त !== सम्भाव्यतन्तुः२.अन्तम्.त) {
                if (!सरेखअतिव्याप्तिपरीक्षणम्(सम्भाव्यतन्तुः२)) {
                    window.अस्थायीतन्तवः.push(सम्भाव्यतन्तुः२);
                } else {
                    विमार्गकल्पनम्(सम्भाव्यतन्तुः२, actual_end);
                }
            }

            if (end_stub) {
                window.अस्थायीतन्तवः.push({ प्रारम्भः: end_stub, अन्तम्: { क: वर्तमान_क, त: वर्तमान_त } });
            }
            window.द्वाररेखनम्();
        });

        तर्कद्वारपटवस्तु.addEventListener('mouseup', (सम्भवम्) => {
            if (window.चयनपेटी) {
                let वाम = Math.min(window.चयनपेटी.प्रारम्भ_क, window.चयनपेटी.वर्तमान_क);
                let दक्षिण = Math.max(window.चयनपेटी.प्रारम्भ_क, window.चयनपेटी.वर्तमान_क);
                let उपरि = Math.min(window.चयनपेटी.प्रारम्भ_त, window.चयनपेटी.वर्तमान_त);
                let अधः = Math.max(window.चयनपेटी.प्रारम्भ_त, window.चयनपेटी.वर्तमान_त);

                if (window.मार्जन_प्रकारः) {
                    // In delete mode, anything in the box gets deleted!
                    window.स्थापितास्तन्तवः = window.स्थापितास्तन्तवः.filter(तन्तु => {
                        let क1 = Math.min(तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
                        let क2 = Math.max(तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
                        let त1 = Math.min(तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);
                        let त2 = Math.max(तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);
                        // True if it DOES NOT intersect the selection box
                        return !(क1 <= दक्षिण && क2 >= वाम && त1 <= अधः && त2 >= उपरि);
                    });

                    if (window.स्थापिताःकीलाः) {
                        window.स्थापिताःकीलाः = window.स्थापिताःकीलाः.filter(कीलक => {
                            // True if it DOES NOT intersect the selection box
                            return !(कीलक.क <= दक्षिण && कीलक.क >= वाम && कीलक.त <= अधः && कीलक.त >= उपरि);
                        });
                    }
                } else if (window.प्रतिकृति_प्रकारः) {
                    for (let तन्तु of window.स्थापितास्तन्तवः) {
                        let क1 = Math.min(तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
                        let क2 = Math.max(तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
                        let त1 = Math.min(तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);
                        let त2 = Math.max(तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);

                        if (क1 <= दक्षिण && क2 >= वाम && त1 <= अधः && त2 >= उपरि) {
                            if (!window.चितास्तन्तवः.includes(तन्तु)) {
                                window.चितास्तन्तवः.push(तन्तु);
                            }
                        }
                    }
                    if (window.स्थापिताःकीलाः) {
                        for (let कीलक of window.स्थापिताःकीलाः) {
                            if (कीलक.क <= दक्षिण && कीलक.क >= वाम && कीलक.त <= अधः && कीलक.त >= उपरि) {
                                if (!window.चिताःकीलाः.includes(कीलक)) {
                                    window.चिताःकीलाः.push(कीलक);
                                }
                            }
                        }
                    }
                    if (window.चितास्तन्तवः.length > 0 || window.चिताःकीलाः.length > 0) {
                        प्रतिकृतिप्रकारप्रारम्भः();
                    }
                } else if (!window.सक्रियतन्तुस्थापनम् && !window.सक्रियद्वारस्थापनम्) {
                    // Normal selection logic
                    for (let तन्तु of window.स्थापितास्तन्तवः) {
                        let क1 = Math.min(तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
                        let क2 = Math.max(तन्तु.प्रारम्भः.क, तन्तु.अन्तम्.क);
                        let त1 = Math.min(तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);
                        let त2 = Math.max(तन्तु.प्रारम्भः.त, तन्तु.अन्तम्.त);

                        // Check if the wire's bounding box intersects the selection box
                        if (क1 <= दक्षिण && क2 >= वाम && त1 <= अधः && त2 >= उपरि) {
                            if (!window.चितास्तन्तवः.includes(तन्तु)) {
                                window.चितास्तन्तवः.push(तन्तु);
                            }
                        }
                    }
                    if (window.स्थापिताःकीलाः) {
                        for (let कीलक of window.स्थापिताःकीलाः) {
                            if (कीलक.क <= दक्षिण && कीलक.क >= वाम && कीलक.त <= अधः && कीलक.त >= उपरि) {
                                if (!window.चिताःकीलाः.includes(कीलक)) {
                                    window.चिताःकीलाः.push(कीलक);
                                }
                            }
                        }
                    }
                    if (window.स्थापितानिद्वाराणि) {
                        for (let द्वार of window.स्थापितानिद्वाराणि) {
                            if (द्वार.क <= दक्षिण && द्वार.क >= वाम && द्वार.त <= अधः && द्वार.त >= उपरि) {
                                if (!window.चितानिद्वाराणि.includes(द्वार)) {
                                    window.चितानिद्वाराणि.push(द्वार);
                                }
                            }
                        }
                    }
                }

                window.चयनपेटी = null;
                window.द्वाररेखनम्();
                return;
            }

            if (!window.सक्रियतन्तुस्थापनम् && !window.सक्रियद्वारस्थापनम्) {
                if (window.आकृष्यमाणतन्तुः || window.आकृष्यमाणकीलकः || window.आकृष्यमाणद्वारम्) {
                    window.आकृष्यमाणतन्तुः = null;
                    window.आकृष्यमाणकीलकः = null;
                    window.आकृष्यमाणद्वारम् = null;
                    window.कर्षण_मूल_अवस्था = null;

                    // Cleanup zero-length wires generated during orthogonal stretch
                    if (window.स्थापितास्तन्तवः) {
                        window.स्थापितास्तन्तवः = window.स्थापितास्तन्तवः.filter(w => w.प्रारम्भः.क !== w.अन्तम्.क || w.प्रारम्भः.त !== w.अन्तम्.त);
                        
                        // Merge overlapping collinear wires
                        for (let i = 0; i < window.स्थापितास्तन्तवः.length; i++) {
                            for (let j = i + 1; j < window.स्थापितास्तन्तवः.length; j++) {
                                let अ = window.स्थापितास्तन्तवः[i];
                                let ब = window.स्थापितास्तन्तवः[j];
                                let क1 = Math.min(ब.प्रारम्भः.क, ब.अन्तम्.क);
                                let क2 = Math.max(ब.प्रारम्भः.क, ब.अन्तम्.क);
                                let त1 = Math.min(ब.प्रारम्भः.त, ब.अन्तम्.त);
                                let त2 = Math.max(ब.प्रारम्भः.त, ब.अन्तम्.त);

                                let अ_क्षैतिज = अ.प्रारम्भः.त === अ.अन्तम्.त;
                                let ब_क्षैतिज = ब.प्रारम्भः.त === ब.अन्तम्.त;
                                let अ_ऊर्ध्वाधर = अ.प्रारम्भः.क === अ.अन्तम्.क;
                                let ब_ऊर्ध्वाधर = ब.प्रारम्भः.क === ब.अन्तम्.क;

                                if (अ_क्षैतिज && ब_क्षैतिज && अ.प्रारम्भः.त === ब.प्रारम्भः.त) {
                                    let अ_क1 = Math.min(अ.प्रारम्भः.क, अ.अन्तम्.क);
                                    let अ_क2 = Math.max(अ.प्रारम्भः.क, अ.अन्तम्.क);
                                    if (अ_क1 <= क2 && अ_क2 >= क1) {
                                        let touchX = (अ_क2 === क1) ? क1 : (अ_क1 === क2 ? क2 : null);
                                        let hasT = false;
                                        if (touchX !== null) {
                                            let count = 0;
                                            for(let w of window.स्थापितास्तन्तवः) {
                                                if ((w.प्रारम्भः.क === touchX && w.प्रारम्भः.त === अ.प्रारम्भः.त) || (w.अन्तम्.क === touchX && w.अन्तम्.त === अ.प्रारम्भः.त)) count++;
                                            }
                                            if (count > 2) hasT = true;
                                        }
                                        if (!hasT) {
                                            अ.प्रारम्भः = { क: Math.min(अ_क1, क1), त: अ.प्रारम्भः.त };
                                            अ.अन्तम् = { क: Math.max(अ_क2, क2), त: अ.प्रारम्भः.त };
                                            window.स्थापितास्तन्तवः.splice(j, 1);
                                            i--;
                                            break;
                                        }
                                    }
                                } else if (अ_ऊर्ध्वाधर && ब_ऊर्ध्वाधर && अ.प्रारम्भः.क === ब.प्रारम्भः.क) {
                                    let अ_त1 = Math.min(अ.प्रारम्भः.त, अ.अन्तम्.त);
                                    let अ_त2 = Math.max(अ.प्रारम्भः.त, अ.अन्तम्.त);
                                    if (अ_त1 <= त2 && अ_त2 >= त1) {
                                        let touchY = (अ_त2 === त1) ? त1 : (अ_त1 === त2 ? त2 : null);
                                        let hasT = false;
                                        if (touchY !== null) {
                                            let count = 0;
                                            for(let w of window.स्थापितास्तन्तवः) {
                                                if ((w.प्रारम्भः.क === अ.प्रारम्भः.क && w.प्रारम्भः.त === touchY) || (w.अन्तम्.क === अ.प्रारम्भः.क && w.अन्तम्.त === touchY)) count++;
                                            }
                                            if (count > 2) hasT = true;
                                        }
                                        if (!hasT) {
                                            अ.प्रारम्भः = { क: अ.प्रारम्भः.क, त: Math.min(अ_त1, त1) };
                                            अ.अन्तम् = { क: अ.प्रारम्भः.क, त: Math.max(अ_त2, त2) };
                                            window.स्थापितास्तन्तवः.splice(j, 1);
                                            i--;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // The mouse is still hovering over it potentially, so revert to 'grab'
                    document.getElementById('तर्कद्वारपटः').style.cursor = 'grab';
                }
            }
        });

        तर्कद्वारपटवस्तु.addEventListener('mouseleave', (सम्भवम्) => {
            if (!window.सक्रियतन्तुस्थापनम् && !window.सक्रियद्वारस्थापनम्) {
                if (window.चयनपेटी) {
                    window.चयनपेटी = null;
                    window.द्वाररेखनम्();
                }
                if (window.आकृष्यमाणतन्तुः || window.आकृष्यमाणद्वारम्) {
                    window.आकृष्यमाणतन्तुः = null;
                    window.आकृष्यमाणद्वारम् = null;
                    window.कर्षण_मूल_अवस्था = null;
                    document.getElementById('तर्कद्वारपटः').style.cursor = '';
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', प्रारम्भः);

// Helper to check 15px padding collision for gates and pins
function स्थानम्_रिक्तम्_अस्ति(नूतन_क, नूतन_त, प्रकारः, उपप्रकारः, उपेक्षणीयम्) {
    let नूतन_वाम, नूतन_दक्षिण, नूतन_ऊर्ध्व, नूतन_अधः;

    if (प्रकारः === 'द्वार') {
        नूतन_वाम = नूतन_क - 25 - 15;
        नूतन_दक्षिण = नूतन_क + 35 + 15;
        नूतन_ऊर्ध्व = नूतन_त - 20 - 15;
        नूतन_अधः = नूतन_त + 20 + 15;
    } else if (प्रकारः === 'कीलक') {
        if (उपप्रकारः === 'निवेशः') {
            नूतन_वाम = नूतन_क - 30 - 15;
            नूतन_दक्षिण = नूतन_क + 15;
            नूतन_ऊर्ध्व = नूतन_त - 15 - 15;
            नूतन_अधः = नूतन_त + 15 + 15;
        } else {
            नूतन_वाम = नूतन_क - 15;
            नूतन_दक्षिण = नूतन_क + 30 + 15;
            नूतन_ऊर्ध्व = नूतन_त - 15 - 15;
            नूतन_अधः = नूतन_त + 15 + 15;
        }
    } else {
        return true;
    }

    if (window.स्थापितानिद्वाराणि) {
        for (let द्वार of window.स्थापितानिद्वाराणि) {
            if (द्वार === उपेक्षणीयम्) continue;
            let द्वार_वाम = द्वार.क - 25;
            let द्वार_दक्षिण = द्वार.क + 35;
            let द्वार_ऊर्ध्व = द्वार.त - 20;
            let द्वार_अधः = द्वार.त + 20;

            if (!(नूतन_दक्षिण <= द्वार_वाम || नूतन_वाम >= द्वार_दक्षिण || नूतन_अधः <= द्वार_ऊर्ध्व || नूतन_ऊर्ध्व >= द्वार_अधः)) {
                return false;
            }
        }
    }

    if (window.स्थापिताःकीलाः) {
        for (let कीलक of window.स्थापिताःकीलाः) {
            if (कीलक === उपेक्षणीयम्) continue;
            let कीलक_वाम, कीलक_दक्षिण, कीलक_ऊर्ध्व, कीलक_अधः;
            if (कीलक.प्रकारः === 'निवेशः') {
                कीलक_वाम = कीलक.क - 30;
                कीलक_दक्षिण = कीलक.क;
                कीलक_ऊर्ध्व = कीलक.त - 15;
                कीलक_अधः = कीलक.त + 15;
            } else {
                कीलक_वाम = कीलक.क;
                कीलक_दक्षिण = कीलक.क + 30;
                कीलक_ऊर्ध्व = कीलक.त - 15;
                कीलक_अधः = कीलक.त + 15;
            }

            if (!(नूतन_दक्षिण <= कीलक_वाम || नूतन_वाम >= कीलक_दक्षिण || नूतन_अधः <= कीलक_ऊर्ध्व || नूतन_ऊर्ध्व >= कीलक_अधः)) {
                return false;
            }
        }
    }

    return true;
}

function सरेखअतिव्याप्तिपरीक्षणम्(परीक्षणतन्तुः) {
    let क1 = परीक्षणतन्तुः.प्रारम्भः.क, त1 = परीक्षणतन्तुः.प्रारम्भः.त;
    let क2 = परीक्षणतन्तुः.अन्तम्.क, त2 = परीक्षणतन्तुः.अन्तम्.त;

    // Defensive Check: Ensure the test wire itself isn't a zero-length point
    if (क1 === क2 && त1 === त2) return false;

    function अतिव्याप्तिःअस्ति(तन्तवः) {
        for (let स्थापिततन्तुः of तन्तवः) {
            let स्था_क1 = स्थापिततन्तुः.प्रारम्भः.क, स्था_त1 = स्थापिततन्तुः.प्रारम्भः.त;
            let स्था_क2 = स्थापिततन्तुः.अन्तम्.क, स्था_त2 = स्थापिततन्तुः.अन्तम्.त;

            // Ignore zero-length points (markers)
            if (स्था_क1 === स्था_क2 && स्था_त1 === स्था_त2) continue;

            // क्षैतिजसरेखता (Horizontal collinearity and overlap check)
            if (त1 === त2 && स्था_त1 === स्था_त2 && त1 === स्था_त1) {
                let वाम1 = Math.min(क1, क2), दक्षिण1 = Math.max(क1, क2);
                let वाम2 = Math.min(स्था_क1, स्था_क2), दक्षिण2 = Math.max(स्था_क1, स्था_क2);
                if (वाम1 < दक्षिण2 && दक्षिण1 > वाम2) return true;
            }
            // ऊर्ध्वाधरसरेखता (Vertical collinearity and overlap check)
            if (क1 === क2 && स्था_क1 === स्था_क2 && क1 === स्था_क1) {
                let उपरि1 = Math.min(त1, त2), अधः1 = Math.max(त1, त2);
                let उपरि2 = Math.min(स्था_त1, स्था_त2), अधः2 = Math.max(स्था_त1, स्था_त2);
                if (उपरि1 < अधः2 && अधः1 > उपरि2) return true;
            }
        }
        return false;
    }

    // Check against permanently placed wires AND currently drawing temporary wires/detours
    return अतिव्याप्तिःअस्ति(window.स्थापितास्तन्तवः) || अतिव्याप्तिःअस्ति(window.अस्थायीतन्तवः);
}

function विमार्गकल्पनम्(तन्तुः, कर्सरः) {
    let अन्तरम् = 10;
    let प्राप्तम् = false;

    // Determine the PREFERRED initial direction based on cursor.
    let प्रारंभिकदिशा;
    if (तन्तुः.प्रारम्भः.त === तन्तुः.अन्तम्.त) { // Horizontal segment
        // If cursor is below or on the line, prefer down (1). If above, prefer up (-1).
        प्रारंभिकदिशा = (कर्सरः.त >= तन्तुः.प्रारम्भः.त) ? 1 : -1;
    } else { // Vertical segment
        // If cursor is to the right or on the line, prefer right (1). If left, prefer left (-1).
        प्रारंभिकदिशा = (कर्सरः.क >= तन्तुः.प्रारम्भः.क) ? 1 : -1;
    }

    let दिशावैकल्प्यम् = [प्रारंभिकदिशा, -प्रारंभिकदिशा];

    while (!प्राप्तम् && अन्तरम् <= 500) {
        for (let दिशा of दिशावैकल्प्यम्) {
            let पर्यायतन्तवः = [];
            let क1 = तन्तुः.प्रारम्भः.क, त1 = तन्तुः.प्रारम्भः.त;
            let क2 = तन्तुः.अन्तम्.क, त2 = तन्तुः.अन्तम्.त;
            let विस्थापनम् = अन्तरम् * दिशा;

            if (त1 === त2) { // क्षैतिजरेखा (Horizontal line detour)
                पर्यायतन्तवः.push({ प्रारम्भः: { क: क1, त: त1 }, अन्तम्: { क: क1, त: त1 + विस्थापनम् } });
                पर्यायतन्तवः.push({ प्रारम्भः: { क: क1, त: त1 + विस्थापनम् }, अन्तम्: { क: क2, त: त2 + विस्थापनम् } });
                पर्यायतन्तवः.push({ प्रारम्भः: { क: क2, त: त2 + विस्थापनम् }, अन्तम्: { क: क2, त: त2 } });
            } else { // ऊर्ध्वाधररेखा (Vertical line detour)
                पर्यायतन्तवः.push({ प्रारम्भः: { क: क1, त: त1 }, अन्तम्: { क: क1 + विस्थापनम्, त: त1 } });
                पर्यायतन्तवः.push({ प्रारम्भः: { क: क1 + विस्थापनम्, त: त1 }, अन्तम्: { क: क2 + विस्थापनम्, त: त2 } });
                पर्यायतन्तवः.push({ प्रारम्भः: { क: क2 + विस्थापनम्, त: त2 }, अन्तम्: { क: क2, त: त2 } });
            }

            let अतिव्याप्तिः = false;
            for (let प of पर्यायतन्तवः) {
                if (सरेखअतिव्याप्तिपरीक्षणम्(प)) {
                    अतिव्याप्तिः = true;
                    break;
                }
            }

            if (!अतिव्याप्तिः) {
                window.अस्थायीतन्तवः.push(...पर्यायतन्तवः);
                प्राप्तम् = true;
                break;
            }
        }

        if (!प्राप्तम्) {
            // Keep expanding the detour outward by 10 pixels
            अन्तरम् += 10;
        }
    }
}

// Ensure the initial setup runs after everything is loaded

// --- Utility for Test Creation ---
window.dumpTestState = function () {
    let out = "// --- COPY THIS INTO YOUR TEST'S JS BLOCK ---\n";
    out += "window.सामान्यस्थित्यागमनम्();\n";

    if (window.स्थापितानिद्वाराणि && window.स्थापितानिद्वाराणि.length > 0) {
        out += "window.स्थापितानिद्वाराणि = [\n";
        window.स्थापितानिद्वाराणि.forEach(g => {
            out += `    { क: ${g.क}, त: ${g.त}, नाम: '${g.नाम}', कोणः: ${g.कोणः || 0}, लम्बप्रतिबिम्बः: ${g.लम्बप्रतिबिम्बः ? 'true' : 'false'} },\n`;
        });
        out += "];\n";
    }

    if (window.स्थापिताःकीलाः && window.स्थापिताःकीलाः.length > 0) {
        out += "window.स्थापिताःकीलाः = [\n";
        window.स्थापिताःकीलाः.forEach(p => {
            out += `    { क: ${p.क}, त: ${p.त}, नाम: '${p.नाम}', प्रकारः: '${p.प्रकारः}' },\n`;
        });
        out += "];\n";
    }

    if (window.स्थापितास्तन्तवः && window.स्थापितास्तन्तवः.length > 0) {
        out += "window.स्थापितास्तन्तवः = [\n";
        window.स्थापितास्तन्तवः.forEach(w => {
            out += `    { प्रारम्भः: { क: ${w.प्रारम्भः.क}, त: ${w.प्रारम्भः.त} }, अन्तम्: { क: ${w.अन्तम्.क}, त: ${w.अन्तम्.त} } },\n`;
        });
        out += "];\n";
    }

    out += "window.द्वाररेखनम्();\n";
    out += "// -------------------------------------------\n";
    console.log(out);
    return "State dumped to console!";
};
