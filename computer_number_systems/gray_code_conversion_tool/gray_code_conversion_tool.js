document.addEventListener('DOMContentLoaded', function() {
    const रूपान्तरण_दिक् = document.getElementById('रूपान्तरण-दिक्');
    const समस्या_मूल्यम् = document.getElementById('समस्या-मूल्यम्');
    const समस्या_सर्जन_कीलः = document.getElementById('समस्या-सर्जन-कीलः');
    const समस्या_ताला_कीलः = document.getElementById('समस्या-ताला-कीलः');
    const ताला_कीलः = document.getElementById('ताला-कीलः');
    const एक्सओआर_निवेशनानि = document.querySelectorAll('.xor-input');
    const वाम_पटलम् = document.getElementById('वाम-पटलम्');
    const दक्षिण_पटलम् = document.getElementById('दक्षिण-पटलम्');
    const पद_पात्रम् = document.getElementById('पद-पात्रम्');

    let एक्सओआर_ताला = false;
    let वर्तमान_समस्या = "";
    let वर्तमान_रूपान्तरणम् = "";

    // 1. XOR Truth Table Logic
    एक्सओआर_निवेशनानि.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^01]/g, '');
        });
    });

    ताला_कीलः.addEventListener('click', function() {
        if (एक्सओआर_ताला) return;
        
        let सर्वम्_सम्यक् = true;
        let प्रथम_त्रुटि_निवेशनम् = null;
        
        एक्सओआर_निवेशनानि.forEach(input => {
            const a = parseInt(input.dataset.a);
            const b = parseInt(input.dataset.b);
            const अपेक्षितम् = (a ^ b).toString();
            
            if (input.value === अपेक्षितम्) {
                input.classList.remove('त्रुटि');
                input.classList.add('सम्यक्');
            } else {
                input.classList.remove('सम्यक्');
                input.classList.add('त्रुटि');
                सर्वम्_सम्यक् = false;
                if (!प्रथम_त्रुटि_निवेशनम्) प्रथम_त्रुटि_निवेशनम् = input;
            }
        });

        if (सर्वम्_सम्यक्) {
            एक्सओआर_ताला = true;
            एक्सओआर_निवेशनानि.forEach(input => input.readOnly = true);
            this.innerHTML = '<i class="fas fa-check-double"></i> Verified';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            this.style.cursor = 'default';
            
            // If problem already generated, enable first input
            if (वर्तमान_समस्या) {
                const प्रथम_निवेशनम् = document.querySelector('.पद-निवेशनम्');
                if (प्रथम_निवेशनम्) {
                    प्रथम_निवेशनम्.readOnly = false;
                    प्रथम_निवेशनम्.focus();
                }
            } else {
                alert("XOR Table verified! Now generate a problem.");
            }
        } else {
            if (प्रथम_त्रुटि_निवेशनम्) {
                प्रथम_त्रुटि_निवेशनम्.focus();
            }
        }
    });

    // 2. Generate Problem Logic
    समस्या_सर्जन_कीलः.addEventListener('click', function() {
        वर्तमान_रूपान्तरणम् = रूपान्तरण_दिक्.value;
        if (!वर्तमान_रूपान्तरणम्) {
            const रूपान्तरणानि = ['b2g', 'g2b'];
            वर्तमान_रूपान्तरणम् = रूपान्तरणानि[Math.floor(Math.random() * रूपान्तरणानि.length)];
            रूपान्तरण_दिक्.value = वर्तमान_रूपान्तरणम्;
        }

        // Generate 10 to 15 digits
        const दीर्घता = Math.floor(Math.random() * 6) + 10;
        let द्विमान_सूत्रम् = "1"; // Ensure MSB is 1
        for (let i = 1; i < दीर्घता; i++) {
            द्विमान_सूत्रम् += Math.floor(Math.random() * 2).toString();
        }
        
        वर्तमान_समस्या = द्विमान_सूत्रम्;
        समस्या_मूल्यम्.value = वर्तमान_समस्या;
        
        // Show lock button
        समस्या_ताला_कीलः.style.display = 'inline-flex';
    });

    समस्या_ताला_कीलः.addEventListener('click', function() {
        // Lock the mode and generator
        रूपान्तरण_दिक्.disabled = true;
        समस्या_सर्जन_कीलः.disabled = true;
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-lock"></i> Locked';
        this.style.cursor = 'default';

        // Reveal XOR table
        दक्षिण_पटलम्.style.display = 'flex';
        
        // Setup and reveal left pane immediately, but disabled
        वाम_पटलम्.style.display = 'flex';
        पदानि_सज्जीकुरु();
    });

    // 3. Step-by-Step Logic
    function पदानि_सज्जीकुरु() {
        पद_पात्रम्.innerHTML = '';
        
        // Create Top Row (Source)
        const उपरि_पङ्क्ति = document.createElement('div');
        उपरि_पङ्क्ति.className = 'पद-पङ्क्ति';
        
        const अधः_पङ्क्ति = document.createElement('div');
        अधः_पङ्क्ति.className = 'पद-पङ्क्ति';
        
        const शून्य_उपरि = document.createElement('span');
        शून्य_उपरि.textContent = '(0)';
        शून्य_उपरि.style.width = '35px';
        शून्य_उपरि.style.height = '35px';
        शून्य_उपरि.style.lineHeight = '35px';
        शून्य_उपरि.style.textAlign = 'center';
        शून्य_उपरि.style.display = 'inline-block';
        शून्य_उपरि.style.borderRadius = '4px';
        शून्य_उपरि.style.color = 'rgba(255, 255, 255, 0.5)';
        
        const रिक्त_अधः = document.createElement('span');
        रिक्त_अधः.style.width = '35px';
        रिक्त_अधः.style.display = 'inline-block';

        if (वर्तमान_रूपान्तरणम् === 'b2g') {
            उपरि_पङ्क्ति.appendChild(शून्य_उपरि);
            अधः_पङ्क्ति.appendChild(रिक्त_अधः);
        } else {
            उपरि_पङ्क्ति.appendChild(रिक्त_अधः);
            अधः_पङ्क्ति.appendChild(शून्य_उपरि);
        }
        
        const उपरि_निवेशनानि = [];
        const अधः_निवेशनानि = [];

        for (let i = 0; i < वर्तमान_समस्या.length; i++) {
            // Top input
            const उपरि_वर्णः = document.createElement('input');
            उपरि_वर्णः.type = 'text';
            उपरि_वर्णः.className = 'पद-निवेशनम्';
            उपरि_वर्णः.maxLength = 1;
            उपरि_वर्णः.dataset.index = i;
            
            if (!एक्सओआर_ताला || i > 0) {
                उपरि_वर्णः.readOnly = true;
            }
            
            उपरि_पङ्क्ति.appendChild(उपरि_वर्णः);
            उपरि_निवेशनानि.push(उपरि_वर्णः);
            
            उपरि_वर्णः.addEventListener('focus', function() {
                if (this.readOnly) {
                    this.blur();
                    return;
                }
                उपरि_निवेशनानि.forEach(निवेशनम् => निवेशनम्.classList.remove('हाइलाइट-स्रोतः'));
                अधः_निवेशनानि.forEach(निवेशनम् => निवेशनम्.classList.remove('हाइलाइट-स्रोतः'));
                शून्य_उपरि.classList.remove('हाइलाइट-स्रोतः');
                शून्य_उपरि.style.color = 'rgba(255, 255, 255, 0.5)';
            });
            
            उपरि_वर्णः.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                if (this.value === '') {
                    this.classList.remove('त्रुटि', 'सम्यक्');
                    return;
                }
                const सूचकाङ्कः = parseInt(this.dataset.index);
                if (this.value === वर्तमान_समस्या[सूचकाङ्कः]) {
                    this.classList.remove('त्रुटि');
                    this.classList.add('सम्यक्');
                    this.readOnly = true;
                    this.blur();
                    
                    if (सूचकाङ्कः + 1 < उपरि_निवेशनानि.length) {
                        उपरि_निवेशनानि[सूचकाङ्कः + 1].readOnly = false;
                        उपरि_निवेशनानि[सूचकाङ्कः + 1].focus();
                    } else {
                        अधः_निवेशनानि[0].readOnly = false;
                        अधः_निवेशनानि[0].focus();
                    }
                } else {
                    this.classList.remove('सम्यक्');
                    this.classList.add('त्रुटि');
                }
            });

            // Bottom input
            const अधः_वर्णः = document.createElement('input');
            अधः_वर्णः.type = 'text';
            अधः_वर्णः.className = 'पद-निवेशनम्';
            अधः_वर्णः.maxLength = 1;
            अधः_वर्णः.dataset.index = i;
            अधः_वर्णः.readOnly = true; // Wait for top row to finish
            
            अधः_पङ्क्ति.appendChild(अधः_वर्णः);
            अधः_निवेशनानि.push(अधः_वर्णः);
            
            // Input logic
            अधः_वर्णः.addEventListener('focus', function() {
                if (this.readOnly) {
                    this.blur();
                    return;
                }
                
                // Clear all highlights
                उपरि_निवेशनानि.forEach(स => स.classList.remove('हाइलाइट-स्रोतः'));
                अधः_निवेशनानि.forEach(निवेशनम् => निवेशनम्.classList.remove('हाइलाइट-स्रोतः'));
                शून्य_उपरि.classList.remove('हाइलाइट-स्रोतः');
                शून्य_उपरि.style.color = 'rgba(255, 255, 255, 0.5)';
                
                const सूचकाङ्कः = parseInt(this.dataset.index);
                if (सूचकाङ्कः === 0) {
                    उपरि_निवेशनानि[0].classList.add('हाइलाइट-स्रोतः');
                    शून्य_उपरि.classList.add('हाइलाइट-स्रोतः');
                    शून्य_उपरि.style.color = ''; // reset to default highlight color
                } else {
                    if (वर्तमान_रूपान्तरणम् === 'b2g') {
                        // B2G: XOR top[i] and top[i-1]
                        उपरि_निवेशनानि[सूचकाङ्कः].classList.add('हाइलाइट-स्रोतः');
                        उपरि_निवेशनानि[सूचकाङ्कः - 1].classList.add('हाइलाइट-स्रोतः');
                    } else {
                        // G2B: XOR top[i] and bottom[i-1]
                        उपरि_निवेशनानि[सूचकाङ्कः].classList.add('हाइलाइट-स्रोतः');
                        अधः_निवेशनानि[सूचकाङ्कः - 1].classList.add('हाइलाइट-स्रोतः');
                    }
                }
            });
            
            अधः_वर्णः.addEventListener('blur', function() {
                उपरि_निवेशनानि.forEach(स => स.classList.remove('हाइलाइट-स्रोतः'));
                अधः_निवेशनानि.forEach(निवेशनम् => निवेशनम्.classList.remove('हाइलाइट-स्रोतः'));
                शून्य_उपरि.classList.remove('हाइलाइट-स्रोतः');
                शून्य_उपरि.style.color = 'rgba(255, 255, 255, 0.5)';
            });
            
            अधः_वर्णः.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                if (this.value === '') {
                    this.classList.remove('त्रुटि', 'सम्यक्');
                    return;
                }
                
                const सूचकाङ्कः = parseInt(this.dataset.index);
                let अपेक्षितम् = "";
                
                if (सूचकाङ्कः === 0) {
                    अपेक्षितम् = वर्तमान_समस्या[0];
                } else {
                    if (वर्तमान_रूपान्तरणम् === 'b2g') {
                        const क = parseInt(वर्तमान_समस्या[सूचकाङ्कः]);
                        const ख = parseInt(वर्तमान_समस्या[सूचकाङ्कः - 1]);
                        अपेक्षितम् = (क ^ ख).toString();
                    } else {
                        const क = parseInt(वर्तमान_समस्या[सूचकाङ्कः]);
                        const ख = parseInt(अधः_निवेशनानि[सूचकाङ्कः - 1].value);
                        अपेक्षितम् = (क ^ ख).toString();
                    }
                }
                
                if (this.value === अपेक्षितम्) {
                    this.classList.remove('त्रुटि');
                    this.classList.add('सम्यक्');
                    this.readOnly = true;
                    this.blur(); // Remove highlight
                    
                    // Unlock next
                    if (सूचकाङ्कः + 1 < अधः_निवेशनानि.length) {
                        अधः_निवेशनानि[सूचकाङ्कः + 1].readOnly = false;
                        अधः_निवेशनानि[सूचकाङ्कः + 1].focus();
                    } else {
                        अन्तिम_परिणामम्_दर्शय(अधः_निवेशनानि.map(निवेशनम् => निवेशनम्.value).join(''));
                    }
                } else {
                    this.classList.add('त्रुटि');
                }
            });
        }
        
        const उपरि_नामपत्रम् = document.createElement('div');
        उपरि_नामपत्रम्.style.fontSize = '0.8rem';
        उपरि_नामपत्रम्.style.color = 'gray';
        उपरि_नामपत्रम्.style.marginBottom = '-10px';
        उपरि_नामपत्रम्.textContent = वर्तमान_रूपान्तरणम् === 'b2g' ? 'Binary Code' : 'Gray Code';
        
        const अधः_नामपत्रम् = document.createElement('div');
        अधः_नामपत्रम्.style.fontSize = '0.8rem';
        अधः_नामपत्रम्.style.color = 'gray';
        अधः_नामपत्रम्.style.marginBottom = '-10px';
        अधः_नामपत्रम्.style.marginTop = '10px';
        अधः_नामपत्रम्.textContent = वर्तमान_रूपान्तरणम् === 'b2g' ? 'Gray Code' : 'Binary Code';

        पद_पात्रम्.appendChild(उपरि_नामपत्रम्);
        पद_पात्रम्.appendChild(उपरि_पङ्क्ति);
        पद_पात्रम्.appendChild(अधः_नामपत्रम्);
        पद_पात्रम्.appendChild(अधः_पङ्क्ति);
        
        // Focus first input only if XOR is verified
        if (एक्सओआर_ताला) {
            setTimeout(() => उपरि_निवेशनानि[0].focus(), 100);
        }
    }

    function अन्तिम_परिणामम्_दर्शय(अन्तिम_सूत्रम्) {
        const परिणाम_खण्डः = document.createElement('div');
        परिणाम_खण्डः.className = 'परिणाम-सन्देश';
        परिणाम_खण्डः.style.display = 'flex';
        परिणाम_खण्डः.style.alignItems = 'center';
        परिणाम_खण्डः.style.justifyContent = 'center';
        परिणाम_खण्डः.style.gap = '10px';
        परिणाम_खण्डः.style.marginTop = '30px';
        
        const स्रोतः_आधारः = वर्तमान_रूपान्तरणम् === 'b2g' ? '2' : 'gray';
        const लक्ष्यम्_आधारः = वर्तमान_रूपान्तरणम् === 'b2g' ? 'gray' : '2';

        परिणाम_खण्डः.innerHTML = `
            <span style="font-size: 1.5rem;">(</span>
            <input type="text" id="अन्तिम-स्रोतः" style="width: 180px; font-size: 1.2rem; letter-spacing: 2px; text-align: center; background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; padding: 10px; outline: none;">
            <span style="font-size: 1.5rem;">)<sub>${स्रोतः_आधारः}</sub></span>
            <span style="font-size: 1.5rem; margin: 0 15px;">=</span>
            <span style="font-size: 1.5rem;">(</span>
            <input type="text" id="अन्तिम-लक्ष्यम्" style="width: 180px; font-size: 1.2rem; letter-spacing: 2px; text-align: center; background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; padding: 10px; outline: none;">
            <span style="font-size: 1.5rem;">)<sub>${लक्ष्यम्_आधारः}</sub></span>
            <button id="अन्तिम-सत्यापन-कीलः" class="उपकरणकीलः" style="margin-left: 20px; background-color: rgba(40, 167, 69, 0.8);"><i class="fas fa-check"></i> Verify</button>
        `;
        
        पद_पात्रम्.appendChild(परिणाम_खण्डः);

        const अन्तिम_स्रोतः = document.getElementById('अन्तिम-स्रोतः');
        const अन्तिम_लक्ष्यम् = document.getElementById('अन्तिम-लक्ष्यम्');
        const अन्तिम_सत्यापन_कीलः = document.getElementById('अन्तिम-सत्यापन-कीलः');

        setTimeout(() => अन्तिम_स्रोतः.focus(), 100);

        // Allow strictly binary characters (or gray characters)
        [अन्तिम_स्रोतः, अन्तिम_लक्ष्यम्].forEach(निवेशनम् => {
            निवेशनम्.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.style.borderColor = 'rgba(255,255,255,0.3)';
            });
        });

        अन्तिम_सत्यापन_कीलः.addEventListener('click', function() {
            let सम्यक्_अस्ति = true;
            let प्रथम_त्रुटिः = null;
            
            if (अन्तिम_स्रोतः.value === वर्तमान_समस्या) {
                अन्तिम_स्रोतः.style.borderColor = '#00ff00';
            } else {
                अन्तिम_स्रोतः.style.borderColor = 'red';
                सम्यक्_अस्ति = false;
                if (!प्रथम_त्रुटिः) प्रथम_त्रुटिः = अन्तिम_स्रोतः;
            }

            if (अन्तिम_लक्ष्यम्.value === अन्तिम_सूत्रम्) {
                अन्तिम_लक्ष्यम्.style.borderColor = '#00ff00';
            } else {
                अन्तिम_लक्ष्यम्.style.borderColor = 'red';
                सम्यक्_अस्ति = false;
                if (!प्रथम_त्रुटिः) प्रथम_त्रुटिः = अन्तिम_लक्ष्यम्;
            }

            if (सम्यक्_अस्ति) {
                अन्तिम_स्रोतः.readOnly = true;
                अन्तिम_लक्ष्यम्.readOnly = true;
                this.innerHTML = '<i class="fas fa-check-double"></i> Verified';
                this.disabled = true;
                this.style.cursor = 'default';
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';

                const अग्रिम_कीलः = document.createElement('button');
                अग्रिम_कीलः.className = 'उपकरणकीलः';
                अग्रिम_कीलः.style.marginLeft = '15px';
                अग्रिम_कीलः.innerHTML = 'Next problem <i class="fas fa-arrow-right"></i>';
                अग्रिम_कीलः.addEventListener('click', () => location.reload());
                this.parentElement.appendChild(अग्रिम_कीलः);
            } else {
                if (प्रथम_त्रुटिः) प्रथम_त्रुटिः.focus();
            }
        });
    }

    const faqButton = document.getElementById('faq-button');
    if (faqButton) {
        faqButton.addEventListener('click', function() {
            const faqContainer = document.getElementById('faq-container');
            const toolContainer = document.getElementById('tool-container');
            const faqText = document.getElementById('faq-text');
            const faqIcon = document.getElementById('faq-icon');
            
            if (faqContainer.style.display === 'none') {
                faqContainer.style.display = 'block';
                toolContainer.style.display = 'none';
                faqText.textContent = 'Tool';
                faqIcon.className = 'fas fa-wrench';
            } else {
                faqContainer.style.display = 'none';
                toolContainer.style.display = 'block';
                faqText.textContent = 'FAQ';
                faqIcon.className = 'fas fa-question-circle';
            }
        });
    }
});
