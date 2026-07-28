// लेखन-अभ्यास-उपकरणस्य कृते JavaScript (JS for Writing Practice Tool)

document.addEventListener('DOMContentLoaded', function() {
    const सारणीशरीरम् = document.getElementById('सारणीशरीरम्');
    const पङ्क्तिसङ्ख्या = 300;
    const स्तम्भसङ्ख्या = 4;

    for (let पङ्क्तिः = 0; पङ्क्तिः < पङ्क्तिसङ्ख्या; पङ्क्तिः++) {
        const नूतनपङ्क्तिः = document.createElement('tr');
        
        for (let स्तम्भः = 0; स्तम्भः < स्तम्भसङ्ख्या; स्तम्भः++) {
            const नूतनकोष्ठकः = document.createElement('td');
            const निवेशनम् = document.createElement('input');
            निवेशनम्.type = 'text';
            निवेशनम्.className = 'अभ्यासनिवेशनम्';
            
            if (स्तम्भः === 0) {
                निवेशनम्.maxLength = 4;
                निवेशनम्.value = पङ्क्तिः + 1;
                निवेशनम्.readOnly = true;
                निवेशनम्.style.textAlign = 'center';
                निवेशनम्.style.color = 'rgba(255, 255, 255, 0.5)';
            } else {
                निवेशनम्.dataset.पङ्क्ति = पङ्क्तिः;
                निवेशनम्.dataset.स्तम्भ = स्तम्भः;
                निवेशनम्.addEventListener('click', function() {
                    this.classList.remove('त्रुटि-निवेशनम्');
                });
                
                if (स्तम्भः === 1) {
                    निवेशनम्.maxLength = 5;
                    निवेशनम्.addEventListener('input', function() {
                        this.value = this.value.replace(/[^0-7]/g, '');
                        if (this.value.trim() === (पङ्क्तिः + 1).toString(8)) this.classList.remove('त्रुटि-निवेशनम्');
                    });
                } else if (स्तम्भः === 2) {
                    निवेशनम्.maxLength = 10;
                    निवेशनम्.addEventListener('input', function() {
                        this.value = this.value.replace(/[^01]/g, '');
                        if (this.value.trim() === (पङ्क्तिः + 1).toString(2)) this.classList.remove('त्रुटि-निवेशनम्');
                    });
                } else if (स्तम्भः === 3) {
                    निवेशनम्.maxLength = 4;
                    निवेशनम्.addEventListener('input', function() {
                        this.value = this.value.replace(/[^0-9a-fA-F]/g, '');
                        if (this.value.trim().toLowerCase() === (पङ्क्तिः + 1).toString(16)) this.classList.remove('त्रुटि-निवेशनम्');
                    });
                }
            }
            नूतनकोष्ठकः.appendChild(निवेशनम्);
            नूतनपङ्क्तिः.appendChild(नूतनकोष्ठकः);
        }
        
        सारणीशरीरम्.appendChild(नूतनपङ्क्तिः);
    }

    const परीक्षणकीलः = document.getElementById('परीक्षणकीलः');
    if (परीक्षणकीलः) {
        परीक्षणकीलः.addEventListener('click', function() {
            const सर्वाणि_निवेशनानि = Array.from(document.querySelectorAll('input')).filter(तत्त्व => !तत्त्व.readOnly);
            let प्रथम_त्रुटिः = null;
            let सर्वं_पूर्णम् = true;

            // Check for empty fields first
            for (const निवेशनम् of सर्वाणि_निवेशनानि) {
                if (निवेशनम्.value.trim() === '') {
                    निवेशनम्.classList.add('त्रुटि-निवेशनम्');
                    प्रथम_त्रुटिः = निवेशनम्;
                    सर्वं_पूर्णम् = false;
                    break; // highlight only the first empty box
                }
            }

            if (!सर्वं_पूर्णम्) {
                प्रथम_त्रुटिः.scrollIntoView({ behavior: 'smooth', block: 'center' });
                प्रथम_त्रुटिः.focus();
                return; // Stop here if there are empty boxes
            }

            // If all are filled, check if they are correct
            let सर्वं_सम्यक् = true;
            for (const निवेशनम् of सर्वाणि_निवेशनानि) {
                const वर्तमानपङ्क्तिः = parseInt(निवेशनम्.dataset.पङ्क्ति) + 1;
                const वर्तमानस्तम्भः = parseInt(निवेशनम्.dataset.स्तम्भ);
                
                let अपेक्षितमूल्यम् = '';
                if (वर्तमानस्तम्भः === 1) { // Octal
                    अपेक्षितमूल्यम् = वर्तमानपङ्क्तिः.toString(8);
                } else if (वर्तमानस्तम्भः === 2) { // Binary
                    अपेक्षितमूल्यम् = वर्तमानपङ्क्तिः.toString(2);
                } else if (वर्तमानस्तम्भः === 3) { // Hexadecimal
                    अपेक्षितमूल्यम् = वर्तमानपङ्क्तिः.toString(16);
                }

                if (निवेशनम्.value.trim().toLowerCase() !== अपेक्षितमूल्यम्) {
                    निवेशनम्.classList.add('त्रुटि-निवेशनम्');
                    प्रथम_त्रुटिः = निवेशनम्;
                    सर्वं_सम्यक् = false;
                    break;
                }
            }

            if (!सर्वं_सम्यक्) {
                प्रथम_त्रुटिः.scrollIntoView({ behavior: 'smooth', block: 'center' });
                प्रथम_त्रुटिः.focus();
            } else {
                // Everything is correct!
                const उपकरणपट्टिका = document.querySelector('.उपकरणपट्टिका');
                
                let सफलता_सन्देशः = document.getElementById('सफलता-सन्देशः');
                if (!सफलता_सन्देशः) {
                    सफलता_सन्देशः = document.createElement('span');
                    सफलता_सन्देशः.id = 'सफलता-सन्देशः';
                    सफलता_सन्देशः.textContent = ' All correct!';
                    सफलता_सन्देशः.style.color = '#00ff00';
                    सफलता_सन्देशः.style.marginLeft = '15px';
                    सफलता_सन्देशः.style.fontWeight = 'bold';
                    उपकरणपट्टिका.appendChild(सफलता_सन्देशः);
                }

                let स्वच्छकीलः = document.getElementById('स्वच्छकीलः');
                if (!स्वच्छकीलः) {
                    स्वच्छकीलः = document.createElement('button');
                    स्वच्छकीलः.id = 'स्वच्छकीलः';
                    स्वच्छकीलः.className = 'उपकरणकीलः';
                    स्वच्छकीलः.innerHTML = '<i class="fas fa-trash"></i> Clear';
                    स्वच्छकीलः.style.marginLeft = '15px';
                    स्वच्छकीलः.style.backgroundColor = 'rgba(255, 77, 77, 0.8)';
                    स्वच्छकीलः.style.color = '#fff';
                    
                    स्वच्छकीलः.addEventListener('click', function() {
                        for (const निवेशनम् of सर्वाणि_निवेशनानि) {
                            निवेशनम्.value = '';
                            निवेशनम्.classList.remove('त्रुटि-निवेशनम्');
                        }
                        if (सफलता_सन्देशः) सफलता_सन्देशः.remove();
                        this.remove();
                    });
                    
                    उपकरणपट्टिका.appendChild(स्वच्छकीलः);
                }
            }
        });
    }
});

