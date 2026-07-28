// JS for Conversion Tool

document.addEventListener('DOMContentLoaded', () => {
    const स्रोतः_प्रणाली = document.getElementById('स्रोतः-प्रणाली');
    const लक्ष्य_प्रणाली = document.getElementById('लक्ष्य-प्रणाली');
    const समस्या_मूल्यम् = document.getElementById('समस्या-मूल्यम्');

    // Handle source system change
    स्रोतः_प्रणाली.addEventListener('change', (e) => {
        const चयनित_स्रोतः = e.target.value;

        // Clear text box on any source change
        समस्या_मूल्यम्.value = "";

        // Enable/disable text input based on selection
        if (चयनित_स्रोतः === "") {
            समस्या_मूल्यम्.readOnly = true;
        } else {
            समस्या_मूल्यम्.readOnly = false;
        }

        // Disable matching option in target dropdown
        const लक्ष्य_विकल्पाः = लक्ष्य_प्रणाली.options;
        for (let i = 0; i < लक्ष्य_विकल्पाः.length; i++) {
            const विकल्पः = लक्ष्य_विकल्पाः[i];
            
            // Don't disable 'Select' so user can pick it again
            if (विकल्पः.value === "") {
                विकल्पः.disabled = false;
                continue;
            }

            if (विकल्पः.value === चयनित_स्रोतः) {
                विकल्पः.disabled = true;
                // If the currently selected target matches the new disabled source, reset it
                if (लक्ष्य_प्रणाली.value === चयनित_स्रोतः) {
                    लक्ष्य_प्रणाली.value = "";
                }
            } else {
                विकल्पः.disabled = false;
            }
        }
    });

    // Filter input based on selected source system
    समस्या_मूल्यम्.addEventListener('input', function() {
        const चयनित_स्रोतः = स्रोतः_प्रणाली.value;
        if (चयनित_स्रोतः === "2") {
            this.value = this.value.replace(/[^01]/g, '');
        } else if (चयनित_स्रोतः === "8") {
            this.value = this.value.replace(/[^0-7]/g, '');
        } else if (चयनित_स्रोतः === "10") {
            this.value = this.value.replace(/[^0-9]/g, '');
        } else if (चयनित_स्रोतः === "16") {
            this.value = this.value.replace(/[^0-9a-fA-F]/g, '');
        }
    });

    // Generate Problem logic
    const समस्या_सर्जन_कीलः = document.getElementById('समस्या-सर्जन-कीलः');
    
    function यादृच्छिकसङ्ख्यास्ट्रिङ्ग_सृजतु(आधारः) {
        let न्यूनदीर्घता = 2, अधिकदीर्घता = 5;
        if (आधारः === "2") { न्यूनदीर्घता = 10; अधिकदीर्घता = 15; }
        else if (आधारः === "8") { न्यूनदीर्घता = 6; अधिकदीर्घता = 10; }
        else if (आधारः === "10") { न्यूनदीर्घता = 4; अधिकदीर्घता = 8; }
        else if (आधारः === "16") { न्यूनदीर्घता = 3; अधिकदीर्घता = 7; }
        
        let दीर्घता = Math.floor(Math.random() * (अधिकदीर्घता - न्यूनदीर्घता + 1)) + न्यूनदीर्घता;
        let परिणामः = '';
        const वर्णाः = {
            "2": "01",
            "8": "01234567",
            "10": "0123456789",
            "16": "0123456789ABCDEF"
        }[आधारः];
        
        const प्रथमअङ्कवर्णाः = वर्णाः === "2" ? "1" : वर्णाः.replace("0", "");
        परिणामः += प्रथमअङ्कवर्णाः[Math.floor(Math.random() * प्रथमअङ्कवर्णाः.length)];
        
        for (let i = 1; i < दीर्घता; i++) {
            परिणामः += वर्णाः[Math.floor(Math.random() * वर्णाः.length)];
        }
        return परिणामः;
    }

    समस्या_सर्जन_कीलः.addEventListener('click', () => {
        const आधाराः = ["2", "8", "10", "16"];
        
        // 1. If left dropdown is in Select, choose a random base
        if (स्रोतः_प्रणाली.value === "") {
            const यादृच्छिकआधारः = आधाराः[Math.floor(Math.random() * आधाराः.length)];
            स्रोतः_प्रणाली.value = यादृच्छिकआधारः;
            स्रोतः_प्रणाली.dispatchEvent(new Event('change')); // Trigger existing disable/clear logic
        }
        
        const वर्तमानस्रोतः_आधारः = स्रोतः_प्रणाली.value;

        // 2. If right dropdown is in Select, choose random base (excluding source)
        if (लक्ष्य_प्रणाली.value === "") {
            let उपलभ्यआधाराः = आधाराः.filter(b => b !== वर्तमानस्रोतः_आधारः);
            const यादृच्छिकलक्ष्यआधारः = उपलभ्यआधाराः[Math.floor(Math.random() * उपलभ्यआधाराः.length)];
            लक्ष्य_प्रणाली.value = यादृच्छिकलक्ष्यआधारः;
        }

        // 3. If text box is empty, enter random value as per left dropdown
        if (समस्या_मूल्यम्.value.trim() === "") {
            समस्या_मूल्यम्.value = यादृच्छिकसङ्ख्यास्ट्रिङ्ग_सृजतु(वर्तमानस्रोतः_आधारः);
        }
    });

    // Lock Feature Logic
    const ताला_कीलः = document.getElementById('ताला-कीलः');
    const विधि_चयनम् = document.getElementById('विधि-चयनम्');
    
    function अवरोहणसूचीं_निवेशनेन_प्रतिस्थापयतु(अवरोहणसूची) {
        const निवेशनम् = document.createElement('input');
        निवेशनम्.type = 'text';
        निवेशनम्.id = अवरोहणसूची.id;
        निवेशनम्.className = अवरोहणसूची.className;
        निवेशनम्.value = अवरोहणसूची.options[अवरोहणसूची.selectedIndex].text;
        निवेशनम्.readOnly = true;
        निवेशनम्.dataset.value = अवरोहणसूची.value; // Store the original base value for future logic
        अवरोहणसूची.parentNode.replaceChild(निवेशनम्, अवरोहणसूची);
        return निवेशनम्;
    }

    let अस्ति_ताला = false;

    ताला_कीलः.addEventListener('click', () => {
        if (अस्ति_ताला) return;
        
        // Validation check
        if (स्रोतः_प्रणाली.value === "" || लक्ष्य_प्रणाली.value === "" || समस्या_मूल्यम्.value.trim() === "") {
            // Highlight generate button
            समस्या_सर्जन_कीलः.classList.remove('ध्यानाकर्षणम्');
            void समस्या_सर्जन_कीलः.offsetWidth; // trigger reflow
            समस्या_सर्जन_कीलः.classList.add('ध्यानाकर्षणम्');
            
            setTimeout(() => {
                समस्या_सर्जन_कीलः.classList.remove('ध्यानाकर्षणम्');
            }, 1500);
            return;
        }

        // Lock everything down
        अस्ति_ताला = true;
        
        // Change lock button to red with locked icon
        ताला_कीलः.classList.add('रक्त-कीलः');
        ताला_कीलः.innerHTML = '<i class="fas fa-lock"></i> Locked';
        
        // Replace dropdowns with readonly textboxes
        अवरोहणसूचीं_निवेशनेन_प्रतिस्थापयतु(स्रोतः_प्रणाली);
        अवरोहणसूचीं_निवेशनेन_प्रतिस्थापयतु(लक्ष्य_प्रणाली);
        
        // Make text box completely unmodified
        समस्या_मूल्यम्.readOnly = true;

        // Show radio buttons down below
        विधि_चयनम्.style.display = 'flex';
    });

    // Proceed button logic
    const रेडियो_समूहः = document.querySelectorAll('input[name="विधिः"]');
    const अग्रे_गच्छ_कीलः = document.getElementById('अग्रे-गच्छ-कीलः');
    const गणितीय_विधि_चयनम् = document.getElementById('गणितीय-विधि-चयनम्');
    const गणितीय_सन्देशः = document.getElementById('गणितीय-सन्देशः');
    const समूहीकरण_विधि_चयनम् = document.getElementById('समूहीकरण-विधि-चयनम्');
    const समूहीकरण_सन्देशः = document.getElementById('समूहीकरण-सन्देशः');
    
    रेडियो_समूहः.forEach(रेडियो => {
        रेडियो.addEventListener('change', () => {
            अग्रे_गच्छ_कीलः.disabled = false;
            अग्रे_गच्छ_कीलः.style.display = ''; // Restore visibility
            
            // Hide any sub-options or messages when switching methods
            गणितीय_विधि_चयनम्.style.display = 'none';
            गणितीय_सन्देशः.style.display = 'none';
            समूहीकरण_विधि_चयनम्.style.display = 'none';
            समूहीकरण_सन्देशः.style.display = 'none';
            
            // Reset layout and sub-menu state
            const दक्षिण_पटलम् = document.getElementById('दक्षिण-पटलम्');
            if (दक्षिण_पटलम्) दक्षिण_पटलम्.style.display = 'none';
            
            const समूहीकरण_अग्रे_गच्छ_कीलः = document.getElementById('समूहीकरण-अग्रे-गच्छ-कीलः');
            const समूहीकरण_त्रुटि_सन्देशः = document.getElementById('समूहीकरण-त्रुटि-सन्देशः');
            if (समूहीकरण_अग्रे_गच्छ_कीलः) {
                समूहीकरण_अग्रे_गच्छ_कीलः.style.display = '';
                समूहीकरण_अग्रे_गच्छ_कीलः.disabled = true;
            }
            if (समूहीकरण_त्रुटि_सन्देशः) समूहीकरण_त्रुटि_सन्देशः.style.display = 'none';
        });
    });

    अग्रे_गच्छ_कीलः.addEventListener('click', () => {
        const चयनित_विधिः = document.querySelector('input[name="विधिः"]:checked').value;
        
        if (चयनित_विधिः === 'mathematical') {
            const स्रोतः_निवेशनम् = document.getElementById('स्रोतः-प्रणाली');
            const लक्ष्य_निवेशनम् = document.getElementById('लक्ष्य-प्रणाली');
            const स्रोतः_आधारः = स्रोतः_निवेशनम्.dataset.value || स्रोतः_निवेशनम्.value;
            const लक्ष्य_आधारः = लक्ष्य_निवेशनम्.dataset.value || लक्ष्य_निवेशनम्.value;
            
            // Remove proceed button (hide it)
            अग्रे_गच्छ_कीलः.style.display = 'none';

            if (स्रोतः_आधारः === "10" || लक्ष्य_आधारः === "10") {
                गणितीय_विधि_चयनम्.style.display = 'flex';
                गणितीय_सन्देशः.style.display = 'none';
                document.querySelectorAll('input[name="विधिः"]').forEach(रेडियो => रेडियो.disabled = true);
                const चयनित_रेडियो = document.querySelector('input[name="विधिः"]:checked');
                if (चयनित_रेडियो && चयनित_रेडियो.parentElement) {
                    चयनित_रेडियो.parentElement.classList.add('चयनित-विकल्पः');
                }
            } else {
                गणितीय_सन्देशः.style.display = 'flex';
                गणितीय_विधि_चयनम्.style.display = 'none';
                const चयनित_रेडियो = document.querySelector('input[name="विधिः"]:checked');
                if (चयनित_रेडियो) चयनित_रेडियो.checked = false;
            }
        } else if (चयनित_विधिः === 'grouping') {
            const स्रोतः_निवेशनम् = document.getElementById('स्रोतः-प्रणाली');
            const लक्ष्य_निवेशनम् = document.getElementById('लक्ष्य-प्रणाली');
            const स्रोतः_आधारः = स्रोतः_निवेशनम्.dataset.value || स्रोतः_निवेशनम्.value;
            const लक्ष्य_आधारः = लक्ष्य_निवेशनम्.dataset.value || लक्ष्य_निवेशनम्.value;
            
            const समूहीकरण_विधि_चयनम् = document.getElementById('समूहीकरण-विधि-चयनम्');
            const समूहीकरण_सन्देशः = document.getElementById('समूहीकरण-सन्देशः');

            // Remove proceed button (hide it)
            अग्रे_गच्छ_कीलः.style.display = 'none';

            if (स्रोतः_आधारः !== "10" && लक्ष्य_आधारः !== "10") {
                समूहीकरण_विधि_चयनम्.style.display = 'flex';
                समूहीकरण_सन्देशः.style.display = 'none';

                const मध्यवर्ती_रेडियो = document.getElementById('intermediate-radio');
                if (मध्यवर्ती_रेडियो) {
                    मध्यवर्ती_रेडियो.disabled = false;
                    document.getElementById('intermediate-label').style.opacity = '1';
                }

                document.querySelectorAll('input[name="विधिः"]').forEach(रेडियो => रेडियो.disabled = true);
                const चयनित_रेडियो = document.querySelector('input[name="विधिः"]:checked');
                if (चयनित_रेडियो && चयनित_रेडियो.parentElement) {
                    चयनित_रेडियो.parentElement.classList.add('चयनित-विकल्पः');
                }
            } else {
                समूहीकरण_सन्देशः.style.display = 'flex';
                समूहीकरण_विधि_चयनम्.style.display = 'none';
                const चयनित_रेडियो = document.querySelector('input[name="विधिः"]:checked');
                if (चयनित_रेडियो) चयनित_रेडियो.checked = false;
            }
        }
    });

    // Sub-menu Proceed button logic for Grouping
    const समूहीकरण_रेडियो = document.querySelectorAll('input[name="समूहीकरण-विधिः"]');
    const समूहीकरण_अग्रे_गच्छ_कीलः = document.getElementById('समूहीकरण-अग्रे-गच्छ-कीलः');
    const समूहीकरण_त्रुटि_सन्देशः = document.getElementById('समूहीकरण-त्रुटि-सन्देशः');
    
    समूहीकरण_रेडियो.forEach(रेडियो => {
        रेडियो.addEventListener('change', (e) => {
            समूहीकरण_अग्रे_गच्छ_कीलः.disabled = false;
            समूहीकरण_अग्रे_गच्छ_कीलः.style.display = 'inline-block';
            if (समूहीकरण_त्रुटि_सन्देशः) समूहीकरण_त्रुटि_सन्देशः.style.display = 'none';
            if (document.getElementById('दक्षिण-पटलम्')) document.getElementById('दक्षिण-पटलम्').style.display = 'none';
        });
    });

    const वाम_पटलम् = document.getElementById('वाम-पटलम्');
    const दक्षिण_पटलम् = document.getElementById('दक्षिण-पटलम्');
    const सत्यता_सारणी_पात्रम् = document.getElementById('सत्यता-सारणी-पात्रम्');

    समूहीकरण_अग्रे_गच्छ_कीलः.addEventListener('click', () => {
        const चयनित_उपविधिः = document.querySelector('input[name="समूहीकरण-विधिः"]:checked').value;
        const स्रोतः_निवेशनम् = document.getElementById('स्रोतः-प्रणाली');
        const लक्ष्य_निवेशनम् = document.getElementById('लक्ष्य-प्रणाली');
        const स्रोतः_आधारः = parseInt(स्रोतः_निवेशनम्.dataset.value || स्रोतः_निवेशनम्.value, 10);
        const लक्ष्य_आधारः = parseInt(लक्ष्य_निवेशनम्.dataset.value || लक्ष्य_निवेशनम्.value, 10);
        
        समूहीकरण_अग्रे_गच्छ_कीलः.style.display = 'none';

        if (चयनित_उपविधिः === 'substitution') {
            if (स्रोतः_आधारः === 2) {
                दक्षिण_पटलम्.style.display = 'flex';
                समूहीकरण_त्रुटि_सन्देशः.style.display = 'none';
                सारणीं_सृजतु(स्रोतः_आधारः, लक्ष्य_आधारः, चयनित_उपविधिः);
                
                document.querySelectorAll('input[name="समूहीकरण-विधिः"]').forEach(रेडियो => रेडियो.disabled = true);
                const चयनित_रेडियो = document.querySelector('input[name="समूहीकरण-विधिः"]:checked');
                if (चयनित_रेडियो && चयनित_रेडियो.parentElement) {
                    चयनित_रेडियो.parentElement.classList.add('चयनित-विकल्पः');
                }
            } else {
                if (स्रोतः_आधारः !== 2 && लक्ष्य_आधारः !== 2) {
                    समूहीकरण_त्रुटि_सन्देशः.textContent = 'Current number or the converted number is not binary';
                } else {
                    समूहीकरण_त्रुटि_सन्देशः.textContent = 'Current number has lower radix value than it is to be converted';
                }
                समूहीकरण_त्रुटि_सन्देशः.style.display = 'flex';
                const चयनित_रेडियो = document.querySelector('input[name="समूहीकरण-विधिः"]:checked');
                if (चयनित_रेडियो) चयनित_रेडियो.checked = false;
            }
        } else if (चयनित_उपविधिः === 'extraction') {
            if (लक्ष्य_आधारः === 2) {
                दक्षिण_पटलम्.style.display = 'flex';
                समूहीकरण_त्रुटि_सन्देशः.style.display = 'none';
                सारणीं_सृजतु(स्रोतः_आधारः, लक्ष्य_आधारः, चयनित_उपविधिः);
                
                document.querySelectorAll('input[name="समूहीकरण-विधिः"]').forEach(रेडियो => रेडियो.disabled = true);
                const चयनित_रेडियो = document.querySelector('input[name="समूहीकरण-विधिः"]:checked');
                if (चयनित_रेडियो && चयनित_रेडियो.parentElement) {
                    चयनित_रेडियो.parentElement.classList.add('चयनित-विकल्पः');
                }
            } else {
                if (स्रोतः_आधारः !== 2 && लक्ष्य_आधारः !== 2) {
                    समूहीकरण_त्रुटि_सन्देशः.textContent = 'Current number or the converted number is not binary';
                } else {
                    समूहीकरण_त्रुटि_सन्देशः.textContent = 'Current number has higher radix value than it is to be converted';
                }
                समूहीकरण_त्रुटि_सन्देशः.style.display = 'flex';
                const चयनित_रेडियो = document.querySelector('input[name="समूहीकरण-विधिः"]:checked');
                if (चयनित_रेडियो) चयनित_रेडियो.checked = false;
            }
        } else if (चयनित_उपविधिः === 'intermediate') {
            if (स्रोतः_आधारः === 2 || लक्ष्य_आधारः === 2) {
                समूहीकरण_त्रुटि_सन्देशः.textContent = 'This shall be selected only if the problem value or converted value is not binary';
                समूहीकरण_त्रुटि_सन्देशः.style.display = 'flex';
                const चयनित_रेडियो = document.querySelector('input[name="समूहीकरण-विधिः"]:checked');
                if (चयनित_रेडियो) चयनित_रेडियो.checked = false;
            } else {
                दक्षिण_पटलम्.style.display = 'flex';
                समूहीकरण_त्रुटि_सन्देशः.style.display = 'none';
                सारणीं_सृजतु(स्रोतः_आधारः, 2, चयनित_उपविधिः, 'सत्यता-सारणी-पात्रम्', लक्ष्य_आधारः);
                
                document.querySelectorAll('input[name="समूहीकरण-विधिः"]').forEach(रेडियो => रेडियो.disabled = true);
                const चयनित_रेडियो = document.querySelector('input[name="समूहीकरण-विधिः"]:checked');
                if (चयनित_रेडियो && चयनित_रेडियो.parentElement) {
                    चयनित_रेडियो.parentElement.classList.add('चयनित-विकल्पः');
                }
            }
        }
    });

    // Sub-menu Proceed button logic for Mathematical
    const गणितीय_रेडियो = document.querySelectorAll('input[name="गणितीय-विधिः"]');
    const गणितीय_अग्रे_गच्छ_कीलः = document.getElementById('गणितीय-अग्रे-गच्छ-कीलः');
    const गणितीय_त्रुटि_सन्देशः = document.getElementById('गणितीय-त्रुटि-सन्देशः');
    
    गणितीय_रेडियो.forEach(रेडियो => {
        रेडियो.addEventListener('change', () => {
            गणितीय_अग्रे_गच्छ_कीलः.disabled = false;
            गणितीय_अग्रे_गच्छ_कीलः.style.display = 'inline-block';
            if (गणितीय_त्रुटि_सन्देशः) गणितीय_त्रुटि_सन्देशः.style.display = 'none';
        });
    });

    गणितीय_अग्रे_गच्छ_कीलः.addEventListener('click', () => {
        const चयनित_उपविधिः = document.querySelector('input[name="गणितीय-विधिः"]:checked').value;
        const स्रोतः_निवेशनम् = document.getElementById('स्रोतः-प्रणाली');
        const लक्ष्य_निवेशनम् = document.getElementById('लक्ष्य-प्रणाली');
        const स्रोतः_आधारः = स्रोतः_निवेशनम्.dataset.value || स्रोतः_निवेशनम्.value;
        const लक्ष्य_आधारः = लक्ष्य_निवेशनम्.dataset.value || लक्ष्य_निवेशनम्.value;
        
        गणितीय_अग्रे_गच्छ_कीलः.style.display = 'none';

        if (चयनित_उपविधिः === 'division') {
            if (स्रोतः_आधारः === "10") {
                गणितीय_त्रुटि_सन्देशः.style.display = 'none';
                document.querySelectorAll('input[name="गणितीय-विधिः"]').forEach(रेडियो => रेडियो.disabled = true);
                const चयनित_रेडियो = document.querySelector('input[name="गणितीय-विधिः"]:checked');
                if (चयनित_रेडियो && चयनित_रेडियो.parentElement) {
                    चयनित_रेडियो.parentElement.classList.add('चयनित-विकल्पः');
                }
                
                const स्रोतः_मूल्यम् = document.getElementById('समस्या-मूल्यम्').value;
                document.getElementById('दक्षिण-पटलम्').style.display = 'flex';
                विभाजनगणकदृश्यं_सृजतु(लक्ष्य_आधारः);
                विभाजनदृश्यं_सृजतु(स्रोतः_मूल्यम्, लक्ष्य_आधारः);
            } else {
                गणितीय_त्रुटि_सन्देशः.textContent = 'Division is used when converting FROM decimal to another base';
                गणितीय_त्रुटि_सन्देशः.style.display = 'flex';
                const चयनित_रेडियो = document.querySelector('input[name="गणितीय-विधिः"]:checked');
                if (चयनित_रेडियो) चयनित_रेडियो.checked = false;
            }
        } else if (चयनित_उपविधिः === 'multiplication') {
            if (लक्ष्य_आधारः === "10") {
                गणितीय_त्रुटि_सन्देशः.style.display = 'none';
                document.querySelectorAll('input[name="गणितीय-विधिः"]').forEach(रेडियो => रेडियो.disabled = true);
                const चयनित_रेडियो = document.querySelector('input[name="गणितीय-विधिः"]:checked');
                if (चयनित_रेडियो && चयनित_रेडियो.parentElement) {
                    चयनित_रेडियो.parentElement.classList.add('चयनित-विकल्पः');
                }
                
                document.getElementById('दक्षिण-पटलम्').style.display = 'flex';
                गुणनगणकदृश्यं_सृजतु();
                const स्रोतः_मूल्यम् = document.getElementById('समस्या-मूल्यम्').value;
                गुणनदृश्यं_सृजतु(स्रोतः_मूल्यम्, स्रोतः_आधारः);
            } else {
                गणितीय_त्रुटि_सन्देशः.textContent = 'Multiplication is used when converting TO decimal from another base';
                गणितीय_त्रुटि_सन्देशः.style.display = 'flex';
                const चयनित_रेडियो = document.querySelector('input[name="गणितीय-विधिः"]:checked');
                if (चयनित_रेडियो) चयनित_रेडियो.checked = false;
            }
        }
    });
    function सारणीं_सृजतु(स्रोतः, लक्ष्य, उपविधिः, पात्रपरिचयः = 'सत्यता-सारणी-पात्रम्', मूललक्ष्यः = null) {
        const लघुआधारः = Math.min(स्रोतः, लक्ष्य);
        const दीर्घआधारः = Math.max(स्रोतः, लक्ष्य);
        const पङ्क्तिसङ्ख्या = दीर्घआधारः;
        const पूरणदीर्घता = दीर्घआधारः === 8 ? 3 : 4;
        
        let लघुनामकम् = लघुआधारः === 2 ? 'Binary' : `Radix ${लघुआधारः}`;
        let दीर्घनामकम् = दीर्घआधारः === 8 ? 'Octal' : (दीर्घआधारः === 16 ? 'Hexadecimal' : `Radix ${दीर्घआधारः}`);
        
        let जालपुटम् = '<table><thead><tr>';
        if (उपविधिः === 'substitution') {
            जालपुटम् += `<th>${लघुनामकम्}</th><th>${दीर्घनामकम्}</th></tr></thead><tbody>`;
        } else { // extraction or intermediate
            जालपुटम् += `<th>${दीर्घनामकम्}</th><th>${लघुनामकम्}</th></tr></thead><tbody>`;
        }
        
        for (let i = 0; i < पङ्क्तिसङ्ख्या; i++) {
            let दीर्घमूल्यम् = i.toString(दीर्घआधारः).toUpperCase();
            let लघुमुल्यम् = i.toString(लघुआधारः).padStart(पूरणदीर्घता, '0');
            
            जालपुटम् += '<tr>';
            if (उपविधिः === 'substitution') {
                जालपुटम् += `
                    <td><input type="text" class="सत्यता-सारणी-निवेशनम्" data-expected="${लघुमुल्यम्}" maxlength="${पूरणदीर्घता}" autocomplete="off"></td>
                    <td><input type="text" class="सत्यता-सारणी-निवेशनम्" data-expected="${दीर्घमूल्यम्}" maxlength="1" autocomplete="off"></td>
                `;
            } else {
                जालपुटम् += `
                    <td><input type="text" class="सत्यता-सारणी-निवेशनम्" data-expected="${दीर्घमूल्यम्}" maxlength="1" autocomplete="off"></td>
                    <td><input type="text" class="सत्यता-सारणी-निवेशनम्" data-expected="${लघुमुल्यम्}" maxlength="${पूरणदीर्घता}" autocomplete="off"></td>
                `;
            }
            जालपुटम् += '</tr>';
        }
        जालपुटम् += '</tbody></table>';
        const सत्यापनकीलपरिचयः = `सत्यापन-कीलः-${पात्रपरिचयः}`;
        जालपुटम् += `<div style="margin-top: 15px; width: 100%; display: flex; justify-content: center;"><button id="${सत्यापनकीलपरिचयः}" class="उपकरणकीलः">Verify <i class="fas fa-check"></i></button></div>`;
        
        const पात्रम् = document.getElementById(पात्रपरिचयः);
        पात्रम्.innerHTML = जालपुटम्;
        
        const सत्यापन_कीलः = document.getElementById(सत्यापनकीलपरिचयः);
        सत्यापन_कीलः.addEventListener('click', () => {
            const निवेशनानि = पात्रम्.querySelectorAll('.सत्यता-सारणी-निवेशनम्');
            
            // Clear previous highlights
            निवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.remove('त्रुटि-प्रकाशः');
                निवेशनम्.classList.remove('साफल्य-प्रकाशः');
            });
            
            let अस्ति_त्रुटिः = false;
            
            for (let i = 0; i < निवेशनानि.length; i++) {
                const निवेशनम् = निवेशनानि[i];
                const अपेक्षितम् = निवेशनम्.dataset.expected;
                const मूल्यम् = निवेशनम्.value.trim().toUpperCase();
                
                if (मूल्यम् === '') {
                    निवेशनम्.classList.add('त्रुटि-प्रकाशः');
                    निवेशनम्.focus();
                    अस्ति_त्रुटिः = true;
                    break;
                }
                
                if (मूल्यम् !== अपेक्षितम्) {
                    निवेशनम्.classList.add('त्रुटि-प्रकाशः');
                    निवेशनम्.focus();
                    अस्ति_त्रुटिः = true;
                    break;
                }
            }
            
            if (!अस्ति_त्रुटिः) {
                निवेशनानि.forEach(निवेशनम् => {
                    निवेशनम्.classList.add('साफल्य-प्रकाशः');
                    निवेशनम्.readOnly = true;
                });
                सत्यापन_कीलः.disabled = true;
                
                if (उपविधिः === 'extraction') {
                    निष्कर्षणदृश्यं_सृजतु(स्रोतः, लक्ष्य);
                } else if (उपविधिः === 'substitution') {
                    // For substitution, मूललक्ष्यः stores the source value if it's intermediate
                    const स्रोतः_मूल्यम् = मूललक्ष्यः !== null ? मूललक्ष्यः : document.getElementById('समस्या-मूल्यम्').value;
                    const वामपटलपरिचयः = पात्रपरिचयः === 'सत्यता-सारणी-पात्रम्-2' ? 'वाम-पटलम्-2' : 'वाम-पटलम्';
                    प्रतिस्थापनदृश्यं_सृजतु(स्रोतः, लक्ष्य, स्रोतः_मूल्यम्, वामपटलपरिचयः, पात्रपरिचयः === 'सत्यता-सारणी-पात्रम्-2');
                } else if (उपविधिः === 'intermediate') {
                    निष्कर्षणदृश्यं_सृजतु(स्रोतः, लक्ष्य, true, मूललक्ष्यः, 'वाम-पटलम्');
                }
            }
        });
    }

    function निष्कर्षणदृश्यं_सृजतु(स्रोतः_आधारः, लक्ष्य_आधारः, अस्ति_मध्यवर्ती = false, अन्तिमलक्ष्य_आधारः = null, पात्रपरिचयः = 'वाम-पटलम्') {
        const स्रोतः_मूल्यम् = document.getElementById('समस्या-मूल्यम्').value;
        const पूरणदीर्घता = स्रोतः_आधारः === 8 ? 3 : 4;
        
        let जालपुटम् = '<div style="display: flex; flex-direction: column; gap: 20px; align-items: center; width: 100%; max-width: 100%; overflow-x: auto; padding-bottom: 10px;">';
        
        let पङ्क्तिः१ = '<div style="display: flex; gap: 15px; justify-content: center;">';
        let पङ्क्तिः२ = '<div style="display: flex; gap: 15px; justify-content: center;">';
        
        for (let i = 0; i < स्रोतः_मूल्यम्.length; i++) {
            const अङ्कः = स्रोतः_मूल्यम्[i];
            const दशमलवमूल्यम् = parseInt(अङ्कः, स्रोतः_आधारः);
            const द्विमानमूल्यम् = दशमलवमूल्यम्.toString(2).padStart(पूरणदीर्घता, '0');
            
            पङ्क्तिः१ += `<input type="text" class="निष्कर्षण-निवेशनम्" data-expected="${अङ्कः}" maxlength="1" autocomplete="off" style="width: 50px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; transition: all 0.3s ease;">`;
            
            पङ्क्तिः२ += `<input type="text" class="निष्कर्षण-निवेशनम्" data-expected="${द्विमानमूल्यम्}" maxlength="${पूरणदीर्घता}" autocomplete="off" style="width: 50px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; transition: all 0.3s ease;">`;
        }
        
        पङ्क्तिः१ += '</div>';
        पङ्क्तिः२ += '</div>';
        
        जालपुटम् += पङ्क्तिः१ + पङ्क्तिः२;
        const सत्यापनकीलपरिचयः = `निष्कर्षण-सत्यापन-कीलः-${पात्रपरिचयः}`;
        जालपुटम् += `<button id="${सत्यापनकीलपरिचयः}" class="उपकरणकीलः" style="margin-top: 15px;">Verify <i class="fas fa-check"></i></button>`;
        जालपुटम् += '</div>';
        
        const पात्रम् = document.getElementById(पात्रपरिचयः);
        पात्रम्.innerHTML = जालपुटम्;
        
        const सत्यापन_कीलः = document.getElementById(सत्यापनकीलपरिचयः);
        सत्यापन_कीलः.addEventListener('click', () => {
            const निवेशनानि = पात्रम्.querySelectorAll('.निष्कर्षण-निवेशनम्');
            
            निवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.remove('त्रुटि-प्रकाशः', 'साफल्य-प्रकाशः');
            });
            
            let अस्ति_त्रुटिः = false;
            
            // Pass 1: Check for empty cells
            let प्रथमरिक्तम् = Array.from(निवेशनानि).find(निवेशनम् => निवेशनम्.value.trim() === '');
            if (प्रथमरिक्तम्) {
                प्रथमरिक्तम्.classList.add('त्रुटि-प्रकाशः');
                प्रथमरिक्तम्.focus();
                अस्ति_त्रुटिः = true;
            } else {
                // Pass 2: Check for incorrect values
                let प्रथमत्रुटिपूर्णम् = Array.from(निवेशनानि).find(निवेशनम् => निवेशनम्.value.trim().toUpperCase() !== निवेशनम्.dataset.expected.toUpperCase());
                if (प्रथमत्रुटिपूर्णम्) {
                    प्रथमत्रुटिपूर्णम्.classList.add('त्रुटि-प्रकाशः');
                    प्रथमत्रुटिपूर्णम्.focus();
                    अस्ति_त्रुटिः = true;
                }
            }
            
            if (!अस्ति_त्रुटिः) {
                निवेशनानि.forEach(निवेशनम् => {
                    निवेशनम्.classList.add('साफल्य-प्रकाशः');
                    निवेशनम्.readOnly = true;
                });
                सत्यापन_कीलः.disabled = true;
                
                let परिणाममूल्यम् = '';
                for (let i = निवेशनानि.length / 2; i < निवेशनानि.length; i++) {
                    परिणाममूल्यम् += निवेशनानि[i].value.trim();
                }
                const मूलस्रोतः_मूल्यम् = document.getElementById('समस्या-मूल्यम्').value;
                if (अस्ति_मध्यवर्ती) {
                    let उत्तरस्थानम् = document.getElementById('उत्तर-स्थानम्');
                    let नूतनपङ्क्तिः = document.createElement('div');
                    नूतनपङ्क्तिः.id = 'गणन-पटलम्-2';
                    नूतनपङ्क्तिः.style = "display: flex; width: 100%; gap: 30px; margin-top: 20px; align-items: flex-start;";
                    नूतनपङ्क्तिः.innerHTML = `
                        <div id="वाम-पटलम्-2" style="flex: 1; transition: all 0.5s ease; display: flex; flex-direction: column; align-items: center;"></div>
                        <div id="दक्षिण-पटलम्-2" style="flex: 1; display: flex; flex-direction: column; align-items: center; transition: all 0.5s ease;">
                            <div id="सत्यता-सारणी-पात्रम्-2" class="सत्यता-सारणी-पात्रम्" style="width: 100%;"></div>
                        </div>
                    `;
                    उत्तरस्थानम्.appendChild(नूतनपङ्क्तिः);
                    सारणीं_सृजतु(2, अन्तिमलक्ष्य_आधारः, 'substitution', 'सत्यता-सारणी-पात्रम्-2', परिणाममूल्यम्);
                } else {
                    अन्तिमपरिणामदृश्यं_सृजतु(मूलस्रोतः_मूल्यम्, स्रोतः_आधारः, परिणाममूल्यम्, लक्ष्य_आधारः);
                }
            }
        });
    }
    function प्रतिस्थापनदृश्यं_सृजतु(स्रोतः_आधारः, लक्ष्य_आधारः, स्रोतः_मूल्यम् = null, पात्रपरिचयः = 'वाम-पटलम्', अस्ति_मध्यवर्ती = false) {
        if (स्रोतः_मूल्यम् === null) {
            स्रोतः_मूल्यम् = document.getElementById('समस्या-मूल्यम्').value;
        }
        const पूरणदीर्घता = लक्ष्य_आधारः === 8 ? 3 : 4;
        
        let पूरितस्रोतः = स्रोतः_मूल्यम्;
        while (पूरितस्रोतः.length % पूरणदीर्घता !== 0) {
            पूरितस्रोतः = '0' + पूरितस्रोतः;
        }
        
        const खण्डाः = [];
        for (let i = 0; i < पूरितस्रोतः.length; i += पूरणदीर्घता) {
            खण्डाः.push(पूरितस्रोतः.substring(i, i + पूरणदीर्घता));
        }
        
        let जालपुटम् = '<div style="display: flex; flex-direction: column; gap: 20px; align-items: center; width: 100%; max-width: 100%; overflow-x: auto; padding-bottom: 10px;">';
        
        let पङ्क्तिः१ = '<div style="display: flex; gap: 15px; justify-content: center;">';
        let पङ्क्तिः२ = '<div style="display: flex; gap: 15px; justify-content: center;">';
        
        for (let i = 0; i < खण्डाः.length; i++) {
            const खण्डः = खण्डाः[i];
            const दशमलवमूल्यम् = parseInt(खण्डः, 2);
            const लक्ष्यवर्णः = दशमलवमूल्यम्.toString(लक्ष्य_आधारः).toUpperCase();
            
            पङ्क्तिः१ += `<input type="text" class="प्रतिस्थापन-निवेशनम्" data-expected="${खण्डः}" maxlength="${पूरणदीर्घता}" autocomplete="off" style="width: 50px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; transition: all 0.3s ease;">`;
            
            पङ्क्तिः२ += `<input type="text" class="प्रतिस्थापन-निवेशनम्" data-expected="${लक्ष्यवर्णः}" maxlength="1" autocomplete="off" style="width: 50px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; transition: all 0.3s ease;">`;
        }
        
        पङ्क्तिः१ += '</div>';
        पङ्क्तिः२ += '</div>';
        
        जालपुटम् += पङ्क्तिः१ + पङ्क्तिः२;
        const सत्यापनकीलपरिचयः = `प्रतिस्थापन-सत्यापन-कीलः-${पात्रपरिचयः}`;
        जालपुटम् += `<button id="${सत्यापनकीलपरिचयः}" class="उपकरणकीलः" style="margin-top: 15px;">Verify <i class="fas fa-check"></i></button>`;
        जालपुटम् += '</div>';
        
        const पात्रम् = document.getElementById(पात्रपरिचयः);
        पात्रम्.innerHTML = जालपुटम्;
        
        const सत्यापन_कीलः = document.getElementById(सत्यापनकीलपरिचयः);
        सत्यापन_कीलः.addEventListener('click', () => {
            const निवेशनानि = पात्रम्.querySelectorAll('.प्रतिस्थापन-निवेशनम्');
            
            निवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.remove('त्रुटि-प्रकाशः', 'साफल्य-प्रकाशः');
            });
            
            let अस्ति_त्रुटिः = false;
            
            let प्रथमरिक्तम् = Array.from(निवेशनानि).find(निवेशनम् => निवेशनम्.value.trim() === '');
            if (प्रथमरिक्तम्) {
                प्रथमरिक्तम्.classList.add('त्रुटि-प्रकाशः');
                प्रथमरिक्तम्.focus();
                अस्ति_त्रुटिः = true;
            } else {
                let प्रथमत्रुटिपूर्णम् = Array.from(निवेशनानि).find(निवेशनम् => निवेशनम्.value.trim().toUpperCase() !== निवेशनम्.dataset.expected.toUpperCase());
                if (प्रथमत्रुटिपूर्णम्) {
                    प्रथमत्रुटिपूर्णम्.classList.add('त्रुटि-प्रकाशः');
                    प्रथमत्रुटिपूर्णम्.focus();
                    अस्ति_त्रुटिः = true;
                }
            }
            
            if (!अस्ति_त्रुटिः) {
                निवेशनानि.forEach(निवेशनम् => {
                    निवेशनम्.classList.add('साफल्य-प्रकाशः');
                    निवेशनम्.readOnly = true;
                });
                सत्यापन_कीलः.disabled = true;
                
                let परिणाममूल्यम् = '';
                for (let i = निवेशनानि.length / 2; i < निवेशनानि.length; i++) {
                    परिणाममूल्यम् += निवेशनानि[i].value.trim();
                }
                const मूलस्रोतः_मूल्यम् = document.getElementById('समस्या-मूल्यम्').value;
                const मूलस्रोतः_आधारः = document.getElementById('स्रोतः-प्रणाली').dataset.value || document.getElementById('स्रोतः-प्रणाली').value;
                const मुख्यपात्रम् = अस्ति_मध्यवर्ती ? document.getElementById('उत्तर-स्थानम्') : document.getElementById('वाम-पटलम्');
                अन्तिमपरिणामदृश्यं_सृजतु(मूलस्रोतः_मूल्यम्, मूलस्रोतः_आधारः, परिणाममूल्यम्, लक्ष्य_आधारः, मुख्यपात्रम्);
            }
        });
    }
    
    function अन्तिमपरिणामदृश्यं_सृजतु(स्रोतः_मूल्यम्, स्रोतः_आधारः, परिणाममूल्यम्, लक्ष्य_आधारः, मुख्यपात्रम् = null) {
        if (!मुख्यपात्रम्) {
            मुख्यपात्रम् = document.getElementById('वाम-पटलम्');
        }
        let जालपुटम् = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 5px; margin-top: 20px; font-size: 1.5rem; color: white;">
            ( <input type="text" class="अन्तिम-निवेशनम्" data-expected="${स्रोतः_मूल्यम्}" autocomplete="off" style="width: 100px; text-align: center; padding: 5px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
            <sub style="margin-top: 15px;"><input type="text" class="अन्तिम-निवेशनम्" data-expected="${स्रोतः_आधारः}" autocomplete="off" style="width: 30px; text-align: center; padding: 2px; font-size: 0.9rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"></sub>
            <span style="margin: 0 10px;">=</span>
            ( <input type="text" class="अन्तिम-निवेशनम्" data-expected="${परिणाममूल्यम्}" autocomplete="off" style="width: 150px; text-align: center; padding: 5px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
            <sub style="margin-top: 15px;"><input type="text" class="अन्तिम-निवेशनम्" data-expected="${लक्ष्य_आधारः}" autocomplete="off" style="width: 30px; text-align: center; padding: 2px; font-size: 0.9rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"></sub>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 15px;">
            <button id="अन्तिम-सत्यापन-कीलः" class="उपकरणकीलः">Verify <i class="fas fa-check"></i></button>
        </div>
        `;
        
        const पात्रम् = document.createElement('div');
        पात्रम्.innerHTML = जालपुटम्;
        मुख्यपात्रम्.appendChild(पात्रम्);
        
        const सत्यापन_कीलः = document.getElementById('अन्तिम-सत्यापन-कीलः');
        सत्यापन_कीलः.addEventListener('click', () => {
            const निवेशनानि = पात्रम्.querySelectorAll('.अन्तिम-निवेशनम्');
            
            निवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.remove('त्रुटि-प्रकाशः', 'साफल्य-प्रकाशः');
            });
            
            let अस्ति_त्रुटिः = false;
            
            let प्रथमरिक्तम् = Array.from(निवेशनानि).find(निवेशनम् => निवेशनम्.value.trim() === '');
            if (प्रथमरिक्तम्) {
                प्रथमरिक्तम्.classList.add('त्रुटि-प्रकाशः');
                प्रथमरिक्तम्.focus();
                अस्ति_त्रुटिः = true;
            } else {
                let प्रथमत्रुटिपूर्णम् = Array.from(निवेशनानि).find(निवेशनम् => निवेशनम्.value.trim().toUpperCase() !== निवेशनम्.dataset.expected.toUpperCase());
                if (प्रथमत्रुटिपूर्णम्) {
                    प्रथमत्रुटिपूर्णम्.classList.add('त्रुटि-प्रकाशः');
                    प्रथमत्रुटिपूर्णम्.focus();
                    अस्ति_त्रुटिः = true;
                }
            }
            
            if (!अस्ति_त्रुटिः) {
                निवेशनानि.forEach(निवेशनम् => {
                    निवेशनम्.classList.add('साफल्य-प्रकाशः');
                    निवेशनम्.readOnly = true;
                });
                सत्यापन_कीलः.disabled = true;
                
                const अग्रिम_कीलः = document.createElement('button');
                अग्रिम_कीलः.id = 'अग्रिम-समस्या-कीलः';
                अग्रिम_कीलः.className = 'उपकरणकीलः';
                अग्रिम_कीलः.style.marginLeft = '15px';
                अग्रिम_कीलः.innerHTML = 'Next problem <i class="fas fa-arrow-right"></i>';
                
                अग्रिम_कीलः.addEventListener('click', () => {
                    location.reload();
                });
                
                सत्यापन_कीलः.parentElement.appendChild(अग्रिम_कीलः);
            }
        });
    }
    
    function गुणनगणकदृश्यं_सृजतु() {
        const दक्षिण_पटलम् = document.getElementById('दक्षिण-पटलम्');
        
        दक्षिण_पटलम्.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; gap: 15px;">
                <h3 style="margin: 0; color: white;">Calculator</h3>
                <div style="display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
                    <input type="text" id="mult-calc-a" style="width: 50px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; outline: none;">
                    <select id="mult-calc-b" style="width: 50px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: rgba(0,0,0,0.8); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; outline: none;">
                        <option value="*">*</option>
                        <option value="+">+</option>
                    </select>
                    <input type="text" id="mult-calc-c" style="width: 50px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; outline: none;">
                    <button id="mult-calc-eq" class="उपकरणकीलः" style="padding: 5px 15px; font-size: 1.2rem; font-weight: bold;">=</button>
                    
                    <div id="mult-calc-result-container" style="display: none; align-items: center; gap: 10px; margin-left: 10px;">
                        <input type="text" id="mult-calc-d" readonly style="width: 80px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: transparent; color: white; border: none; font-weight: bold; outline: none;">
                        <button class="उपकरणकीलः" id="mult-calc-copy" style="padding: 5px 10px; font-size: 0.9rem;" title="Copy Result"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
            </div>
        `;
        
        const क_निवेशनम् = document.getElementById('mult-calc-a');
        const ख_निवेशनम् = document.getElementById('mult-calc-b');
        const ग_निवेशनम् = document.getElementById('mult-calc-c');
        const सम_कीलः = document.getElementById('mult-calc-eq');
        const परिणामपात्रम् = document.getElementById('mult-calc-result-container');
        const घ_निवेशनम् = document.getElementById('mult-calc-d');
        const प्रतिलिपि_कीलः = document.getElementById('mult-calc-copy');
        
        क_निवेशनम्.addEventListener('input', function() { this.value = this.value.replace(/[^0-9]/g, ''); });
        ग_निवेशनम्.addEventListener('input', function() { this.value = this.value.replace(/[^0-9]/g, ''); });
        
        सम_कीलः.addEventListener('click', () => {
            const क = क_निवेशनम्.value.trim();
            const ख = ख_निवेशनम्.value.trim();
            const ग = ग_निवेशनम्.value.trim();
            
            [क_निवेशनम्, ख_निवेशनम्, ग_निवेशनम्].forEach(inp => inp.classList.remove('त्रुटि-प्रकाशः'));
            
            let अस्ति_त्रुटिः = false;
            if (क === '') { क_निवेशनम्.classList.add('त्रुटि-प्रकाशः'); अस्ति_त्रुटिः = true; }
            if (ख === '') { ख_निवेशनम्.classList.add('त्रुटि-प्रकाशः'); अस्ति_त्रुटिः = true; }
            if (ग === '') { ग_निवेशनम्.classList.add('त्रुटि-प्रकाशः'); अस्ति_त्रुटिः = true; }
            
            if (अस्ति_त्रुटिः) return;
            
            const सङ्ख्या_क = parseInt(क, 10);
            const सङ्ख्या_ग = parseInt(ग, 10);
            let परिणामः = 0;
            
            if (ख === '+') परिणामः = सङ्ख्या_क + सङ्ख्या_ग;
            else if (ख === '*') परिणामः = सङ्ख्या_क * सङ्ख्या_ग;
            
            घ_निवेशनम्.value = परिणामः;
            परिणामपात्रम्.style.display = 'flex';
        });
        
        प्रतिलिपि_कीलः.addEventListener('click', (e) => {
            घ_निवेशनम्.select();
            document.execCommand('copy');
            const button = e.currentTarget;
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 1000);
            window.getSelection().removeAllRanges();
        });
    }

    function विभाजनगणकदृश्यं_सृजतु(लक्ष्य_आधारः) {
        const सत्यता_सारणी_पात्रम् = document.getElementById('सत्यता-सारणी-पात्रम्');
        
        let जालपुटम् = `
        <div style="background-color: var(--card-bg); border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); width: 100%; display: flex; flex-direction: column; align-items: center;">
            <h3 style="color: var(--text-primary); margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Calculator</h3>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 1.5rem; color: white;">
                ( <input type="text" id="गणक_भाज्यम्" autocomplete="off" style="width: 80px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
                /
                ( <input type="text" id="गणक_भाजकम्" autocomplete="off" style="width: 50px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
                <button id="गणक_समानम्" class="उपकरणकीलः" style="padding: 8px 15px; font-size: 1.2rem;">=</button>
            </div>
            <div id="गणक_परिणामः" style="margin-top: 20px; color: var(--accent-blue); font-size: 1.2rem; display: none;"></div>
        </div>
        `;
        
        सत्यता_सारणी_पात्रम्.innerHTML = जालपुटम्;
        
        const गणक_समानम् = document.getElementById('गणक_समानम्');
        const गणक_भाज्यम् = document.getElementById('गणक_भाज्यम्');
        const गणक_भाजकम् = document.getElementById('गणक_भाजकम्');
        const गणक_परिणामः = document.getElementById('गणक_परिणामः');
        
        गणक_समानम्.addEventListener('click', () => {
            गणक_भाज्यम्.classList.remove('त्रुटि-प्रकाशः');
            गणक_भाजकम्.classList.remove('त्रुटि-प्रकाशः');
            गणक_परिणामः.style.display = 'none';
            
            const भाज्यमूल्यम् = गणक_भाज्यम्.value.trim();
            const भाजकमूल्यम् = गणक_भाजकम्.value.trim();
            
            if (!भाज्यमूल्यम्) {
                गणक_भाज्यम्.classList.add('त्रुटि-प्रकाशः');
                गणक_भाज्यम्.focus();
                return;
            }
            if (!भाजकमूल्यम्) {
                गणक_भाजकम्.classList.add('त्रुटि-प्रकाशः');
                गणक_भाजकम्.focus();
                return;
            }
            
            const भाज्यम् = parseInt(भाज्यमूल्यम्, 10);
            const भाजकम् = parseInt(भाजकमूल्यम्, 10);
            
            if (भाजकम् !== parseInt(लक्ष्य_आधारः, 10)) {
                गणक_भाजकम्.classList.add('त्रुटि-प्रकाशः');
                गणक_भाजकम्.focus();
                return;
            }
            
            if (भाज्यम् < भाजकम् && भाज्यम् > 0) {
                 गणक_भाज्यम्.classList.add('त्रुटि-प्रकाशः');
                 गणक_भाज्यम्.focus();
                 return;
            }
            
            const भागफलम् = Math.floor(भाज्यम् / भाजकम्);
            const शेषम् = भाज्यम् % भाजकम्;
            
            गणक_परिणामः.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-start;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        Quotient: <input type="text" id="calc-q" value="${भागफलम्}" readonly style="width: 60px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; outline: none;">
                        <button class="उपकरणकीलः copy-btn" data-copy="calc-q" style="padding: 5px 10px; font-size: 0.9rem;" title="Copy Quotient"><i class="fas fa-copy"></i></button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        Remainder: <input type="text" id="calc-r" value="${शेषम्}" readonly style="width: 60px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; outline: none;">
                        <button class="उपकरणकीलः copy-btn" data-copy="calc-r" style="padding: 5px 10px; font-size: 0.9rem;" title="Copy Remainder"><i class="fas fa-copy"></i></button>
                    </div>
                </div>
            `;
            गणक_परिणामः.style.display = 'block';
            
            गणक_परिणामः.querySelectorAll('.copy-btn').forEach(कीलः => {
                कीलः.addEventListener('click', (e) => {
                    const कीलः_वर्तमानः = e.currentTarget;
                    const लक्ष्यपरिचयः = कीलः_वर्तमानः.dataset.copy;
                    const निवेशनतत्त्वम् = document.getElementById(लक्ष्यपरिचयः);
                    if (निवेशनतत्त्वम्) {
                        निवेशनतत्त्वम्.select();
                        document.execCommand('copy');
                        const मूलजालपुटम् = कीलः_वर्तमानः.innerHTML;
                        कीलः_वर्तमानः.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            कीलः_वर्तमानः.innerHTML = मूलजालपुटम्;
                        }, 1000);
                    }
                });
            });
        });
    }

    function विभाजनदृश्यं_सृजतु(स्रोतः_मूल्यम्, लक्ष्य_आधारः) {
        const वाम_पटलम् = document.getElementById('वाम-पटलम्');
        वाम_पटलम्.innerHTML = `
            <div style="max-height: 400px; overflow-y: auto; width: 100%; display: flex; flex-direction: column; align-items: center; padding-right: 10px;">
                <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px; font-family: monospace; font-size: 1.2rem; margin-top: 20px;" id="विभाजन_पात्रम्"></div>
                <button id="विभाजन-सत्यापन-कीलः" class="उपकरणकीलः" style="margin-top: 15px; padding: 6px 12px; font-size: 1rem;">Proceed <i class="fas fa-check"></i></button>
            </div>
        `;
        
        const पात्रम् = document.getElementById('विभाजन_पात्रम्');
        
        let भाज्यम् = parseInt(स्रोतः_मूल्यम्, 10);
        let भाजकम् = parseInt(लक्ष्य_आधारः, 10);
        
        // Render Row 0
        let शेषम्० = भाज्यम् % भाजकम्;
        विभाजनपङ्क्तिं_सृजतु(पात्रम्, 0, भाजकम्, भाज्यम्, शेषम्०);
        
        // Render Row 1
        let भागफलम्१ = Math.floor(भाज्यम् / भाजकम्);
        let शेषम्१ = भागफलम्१ < भाजकम् ? null : भागफलम्१ % भाजकम्;
        विभाजनपङ्क्तिं_सृजतु(पात्रम्, 1, भाजकम्, भागफलम्१, शेषम्१);
        
        विभाजनसत्यापनकीलम्_सज्जीकरोतु(पात्रम्, भाजकम्, लक्ष्य_आधारः, स्रोतः_मूल्यम्);
    }
    
    function विभाजनपङ्क्तिं_सृजतु(पात्रम्, पङ्क्तिसङ्ख्या, अपेक्षितम्_क, अपेक्षितम्_ख, अपेक्षितम्_ग) {
        const पङ्क्ति_तत्त्वम् = document.createElement('div');
        पङ्क्ति_तत्त्वम्.className = 'div-row';
        पङ्क्ति_तत्त्वम्.dataset.row = पङ्क्तिसङ्ख्या;
        पङ्क्ति_तत्त्वम्.style.display = 'flex';
        पङ्क्ति_तत्त्वम्.style.alignItems = 'flex-end'; // Align to bottom for elegant bracket
        पङ्क्ति_तत्त्वम्.style.color = 'white';
        पङ्क्ति_तत्त्वम्.style.marginBottom = '5px';
        
        // Elegant bracket
        const कोष्ठकजालपुटम् = `<div style="border-left: 2px solid white; border-bottom: 2px solid white; height: 35px; width: 15px; margin: 0 5px 5px 5px;"></div>`;
        
        let जालपुटम् = '';
        जालपुटम् += `<input type="text" class="div-input div-x" data-expected="${अपेक्षितम्_क}" autocomplete="off" style="width: 40px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; margin-bottom: 5px;">`;
        जालपुटम् += कोष्ठकजालपुटम्;
        जालपुटम् += `<input type="text" class="div-input div-y" data-expected="${अपेक्षितम्_ख}" autocomplete="off" style="width: 80px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; margin-bottom: 5px;">`;
        
        if (अपेक्षितम्_ग !== null && अपेक्षितम्_ग !== undefined) {
            जालपुटम् += `<span style="margin: 0 10px 10px 10px; font-weight: bold;">-</span>`;
            जालपुटम् += `<input type="text" class="div-input div-z" data-expected="${अपेक्षितम्_ग}" autocomplete="off" style="width: 40px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; margin-bottom: 5px;">`;
        }
        
        पङ्क्ति_तत्त्वम्.innerHTML = जालपुटम्;
        पात्रम्.appendChild(पङ्क्ति_तत्त्वम्);
    }
    
    function विभाजनसत्यापनकीलम्_सज्जीकरोतु(पात्रम्, भाजकम्, लक्ष्य_आधारः, स्रोतः_मूल्यम्) {
        const सत्यापन_कीलः = document.getElementById('विभाजन-सत्यापन-कीलः');
        
        सत्यापन_कीलः.addEventListener('click', () => {
            const सक्रियनिवेशनानि = Array.from(पात्रम्.querySelectorAll('.div-input:not([readonly])'));
            if (सक्रियनिवेशनानि.length === 0) return;
            
            let प्रथमरिक्तम् = null;
            let प्रथमत्रुटिपूर्णम् = null;
            
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.remove('त्रुटि-प्रकाशः');
                const मूल्यशब्दः = निवेशनम्.value.trim().toUpperCase();
                const अपेक्षितशब्दः = निवेशनम्.dataset.expected.toString().toUpperCase();
                
                if (मूल्यशब्दः === '') {
                    if (!प्रथमरिक्तम्) प्रथमरिक्तम् = निवेशनम्;
                } else if (मूल्यशब्दः !== अपेक्षितशब्दः) {
                    if (!प्रथमत्रुटिपूर्णम्) प्रथमत्रुटिपूर्णम् = निवेशनम्;
                }
            });
            
            if (प्रथमरिक्तम्) {
                प्रथमरिक्तम्.classList.add('त्रुटि-प्रकाशः');
                प्रथमरिक्तम्.focus();
                return;
            }
            
            if (प्रथमत्रुटिपूर्णम्) {
                प्रथमत्रुटिपूर्णम्.classList.add('त्रुटि-प्रकाशः');
                प्रथमत्रुटिपूर्णम्.focus();
                return;
            }
            
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.add('साफल्य-प्रकाशः');
                निवेशनम्.readOnly = true;
                निवेशनम्.style.opacity = '1';
            });
            
            let उच्चतमपङ्क्तिः = -1;
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                const पङ्क्तिसूचकाङ्कः = parseInt(निवेशनम्.closest('.div-row').dataset.row, 10);
                if (पङ्क्तिसूचकाङ्कः > उच्चतमपङ्क्तिः) उच्चतमपङ्क्तिः = पङ्क्तिसूचकाङ्कः;
            });
            
            const उच्चतमपङ्क्तितत्त्वम् = पात्रम्.querySelector(`.div-row[data-row="${उच्चतमपङ्क्तिः}"]`);
            const वर्तमान_ख = parseInt(उच्चतमपङ्क्तितत्त्वम्.querySelector('.div-y').dataset.expected, 10);
            
            if (वर्तमान_ख < भाजकम्) {
                let शेषाणि = वर्तमान_ख > 0 ? वर्तमान_ख.toString(लक्ष्य_आधारः).toUpperCase() : '';
                const सर्वापङ्क्तयः = पात्रम्.querySelectorAll('.div-row');
                for (let i = सर्वापङ्क्तयः.length - 1; i >= 0; i--) {
                    const ग_निवेशनम् = सर्वापङ्क्तयः[i].querySelector('.div-z');
                    if (ग_निवेशनम्) {
                        let शेषमूल्यम् = parseInt(ग_निवेशनम्.dataset.expected, 10);
                        शेषाणि += शेषमूल्यम्.toString(लक्ष्य_आधारः).toUpperCase();
                    }
                }
                सत्यापन_कीलः.style.display = 'none';
                अन्तिमपरिणामदृश्यं_सृजतु(स्रोतः_मूल्यम्, "10", शेषाणि, लक्ष्य_आधारः);
            } else {
                let अग्रिमभागफलम् = Math.floor(वर्तमान_ख / भाजकम्);
                let अग्रिमशेषम् = अग्रिमभागफलम् < भाजकम् ? null : अग्रिमभागफलम् % भाजकम्;
                विभाजनपङ्क्तिं_सृजतु(पात्रम्, उच्चतमपङ्क्तिः + 1, भाजकम्, अग्रिमभागफलम्, अग्रिमशेषम्);
                
                const नूतनपङ्क्तिः = पात्रम्.querySelector(`.div-row[data-row="${उच्चतमपङ्क्तिः + 1}"]`);
                const प्रथमनिवेशनम् = नूतनपङ्क्तिः.querySelector('.div-input');
                if (प्रथमनिवेशनम्) प्रथमनिवेशनम्.focus();
            }
        });
    }
    function गुणनदृश्यं_सृजतु(स्रोतः_मूल्यम्, स्रोतः_आधारः) {
        const वाम_पटलम् = document.getElementById('वाम-पटलम्');
        वाम_पटलम्.innerHTML = `
            <div style="max-height: 400px; overflow-y: auto; width: 100%; display: flex; flex-direction: column; align-items: center; padding-right: 10px;">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; font-family: monospace; font-size: 1.2rem; margin-top: 20px;" id="गुणन_पात्रम्"></div>
                <button id="गुणन-सत्यापन-कीलः" class="उपकरणकीलः" style="margin-top: 15px; padding: 6px 12px; font-size: 1rem;">Proceed <i class="fas fa-check"></i></button>
            </div>
        `;
        
        const पात्रम् = document.getElementById('गुणन_पात्रम्');
        let अङ्काः = स्रोतः_मूल्यम्.split('');
        let आधारः = parseInt(स्रोतः_आधारः, 10);
        
        function दशमलवमूल्यम्_प्राप्नोतु(वर्णः) {
            return parseInt(वर्णः, आधारः);
        }
        
        if (अङ्काः.length > 1) {
            let क = दशमलवमूल्यम्_प्राप्नोतु(अङ्काः[0]);
            let ख = आधारः;
            let ग = दशमलवमूल्यम्_प्राप्नोतु(अङ्काः[1]);
            let घ = क * ख + ग;
            गुणनपङ्क्तिं_सृजतु(पात्रम्, 0, क, ख, ग, घ);
        } else {
            अन्तिमपरिणामदृश्यं_सृजतु(स्रोतः_मूल्यम्, स्रोतः_आधारः, दशमलवमूल्यम्_प्राप्नोतु(अङ्काः[0]).toString(), "10");
            document.getElementById('गुणन-सत्यापन-कीलः').style.display = 'none';
            return;
        }
        
        गुणनसत्यापनकीलम्_सज्जीकरोतु(पात्रम्, अङ्काः, आधारः, स्रोतः_मूल्यम्);
    }
    
    function गुणनपङ्क्तिं_सृजतु(पात्रम्, पङ्क्तिसङ्ख्या, अपेक्षितम्_क, अपेक्षितम्_ख, अपेक्षितम्_ग, अपेक्षितम्_घ) {
        const पङ्क्ति_तत्त्वम् = document.createElement('div');
        पङ्क्ति_तत्त्वम्.className = 'mult-row';
        पङ्क्ति_तत्त्वम्.dataset.row = पङ्क्तिसङ्ख्या;
        पङ्क्ति_तत्त्वम्.style.display = 'flex';
        पङ्क्ति_तत्त्वम्.style.alignItems = 'center';
        पङ्क्ति_तत्त्वम्.style.color = 'white';
        पङ्क्ति_तत्त्वम्.style.marginBottom = '5px';
        
        let जालपुटम् = '';
        जालपुटम् += `<input type="text" class="mult-input mult-a" data-expected="${अपेक्षितम्_क}" autocomplete="off" style="width: 50px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;">`;
        जालपुटम् += `<span style="margin: 0 10px; font-weight: bold;">*</span>`;
        जालपुटम् += `<input type="text" class="mult-input mult-b" data-expected="${अपेक्षितम्_ख}" autocomplete="off" style="width: 50px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;">`;
        जालपुटम् += `<span style="margin: 0 10px; font-weight: bold;">+</span>`;
        जालपुटम् += `<input type="text" class="mult-input mult-c" data-expected="${अपेक्षितम्_ग}" autocomplete="off" style="width: 50px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;">`;
        जालपुटम् += `<span style="margin: 0 10px; font-weight: bold;">=</span>`;
        जालपुटम् += `<input type="text" class="mult-input mult-d" data-expected="${अपेक्षितम्_घ}" autocomplete="off" style="width: 70px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;">`;
        
        पङ्क्ति_तत्त्वम्.innerHTML = जालपुटम्;
        पात्रम्.appendChild(पङ्क्ति_तत्त्वम्);
    }
    
    function गुणनसत्यापनकीलम्_सज्जीकरोतु(पात्रम्, अङ्काः, आधारः, स्रोतः_मूल्यम्) {
        const सत्यापन_कीलः = document.getElementById('गुणन-सत्यापन-कीलः');
        
        सत्यापन_कीलः.addEventListener('click', () => {
            const सक्रियनिवेशनानि = Array.from(पात्रम्.querySelectorAll('.mult-input:not([readonly])'));
            if (सक्रियनिवेशनानि.length === 0) return;
            
            let प्रथमरिक्तम् = null;
            let प्रथमत्रुटिपूर्णम् = null;
            
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.remove('त्रुटि-प्रकाशः');
                const मूल्यशब्दः = निवेशनम्.value.trim().toUpperCase();
                const अपेक्षितशब्दः = निवेशनम्.dataset.expected.toString().toUpperCase();
                
                if (मूल्यशब्दः === '') {
                    if (!प्रथमरिक्तम्) प्रथमरिक्तम् = निवेशनम्;
                } else if (मूल्यशब्दः !== अपेक्षितशब्दः) {
                    if (!प्रथमत्रुटिपूर्णम्) प्रथमत्रुटिपूर्णम् = निवेशनम्;
                }
            });
            
            if (प्रथमरिक्तम्) {
                प्रथमरिक्तम्.classList.add('त्रुटि-प्रकाशः');
                प्रथमरिक्तम्.focus();
                return;
            }
            
            if (प्रथमत्रुटिपूर्णम्) {
                प्रथमत्रुटिपूर्णम्.classList.add('त्रुटि-प्रकाशः');
                प्रथमत्रुटिपूर्णम्.focus();
                return;
            }
            
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.add('साफल्य-प्रकाशः');
                निवेशनम्.readOnly = true;
                निवेशनम्.style.opacity = '1';
            });
            
            let उच्चतमपङ्क्तिः = -1;
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                const पङ्क्तिसूचकाङ्कः = parseInt(निवेशनम्.closest('.mult-row').dataset.row, 10);
                if (पङ्क्तिसूचकाङ्कः > उच्चतमपङ्क्तिः) उच्चतमपङ्क्तिः = पङ्क्तिसूचकाङ्कः;
            });
            
            const उच्चतमपङ्क्तितत्त्वम् = पात्रम्.querySelector(`.mult-row[data-row="${उच्चतमपङ्क्तिः}"]`);
            const वर्तमान_घ = parseInt(उच्चतमपङ्क्तितत्त्वम्.querySelector('.mult-d').dataset.expected, 10);
            
            const अग्रिमाङ्कसूचकाङ्कः = उच्चतमपङ्क्तिः + 2;
            
            if (अग्रिमाङ्कसूचकाङ्कः < अङ्काः.length) {
                let अग्रिम_क = वर्तमान_घ;
                let अग्रिम_ख = आधारः;
                let अग्रिम_ग = parseInt(अङ्काः[अग्रिमाङ्कसूचकाङ्कः], आधारः);
                let अग्रिम_घ = अग्रिम_क * अग्रिम_ख + अग्रिम_ग;
                गुणनपङ्क्तिं_सृजतु(पात्रम्, उच्चतमपङ्क्तिः + 1, अग्रिम_क, अग्रिम_ख, अग्रिम_ग, अग्रिम_घ);
                
                const नूतनपङ्क्तिः = पात्रम्.querySelector(`.mult-row[data-row="${उच्चतमपङ्क्तिः + 1}"]`);
                const प्रथमनिवेशनम् = नूतनपङ्क्तिः.querySelector('.mult-input');
                if (प्रथमनिवेशनम्) प्रथमनिवेशनम्.focus();
            } else {
                सत्यापन_कीलः.style.display = 'none';
                अन्तिमपरिणामदृश्यं_सृजतु(स्रोतः_मूल्यम्, आधारः.toString(), वर्तमान_घ.toString(), "10");
            }
        });
    }
});
