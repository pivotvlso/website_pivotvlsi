// लेखन-अभ्यास-उपकरणस्य कृते JavaScript (JS for Gray Code Practice Tool)

document.addEventListener('DOMContentLoaded', function() {
    let दर्पण_प्रकारः = false;
    const सारणीशरीरम् = document.getElementById('सारणीशरीरम्');
    const पङ्क्तिसङ्ख्या = 31;
    const स्तम्भसङ्ख्या = 3;

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
                निवेशनम्.addEventListener('click', function(e) {
                    if (दर्पण_प्रकारः) {
                        e.preventDefault();
                        if (स्तम्भः === 2) {
                            const tr = this.closest('tr');
                            if (tr) {
                                const isCurrentlyMirror = tr.classList.contains('दर्पण-रेखा');
                                document.querySelectorAll('.दर्पण-रेखा').forEach(row => row.classList.remove('दर्पण-रेखा'));
                                if (!isCurrentlyMirror) {
                                    tr.classList.add('दर्पण-रेखा');
                                }
                                प्रवर्तय_प्रतिबिम्बम्();
                            }
                        }
                        return;
                    }
                    this.classList.remove('त्रुटि-निवेशनम्');
                });
                
                if (स्तम्भः === 1) { // Binary
                    निवेशनम्.maxLength = 10;
                    निवेशनम्.addEventListener('input', function() {
                        this.value = this.value.replace(/[^01]/g, '');
                        if (this.value.trim() === (पङ्क्तिः + 1).toString(2).padStart(5, '0')) this.classList.remove('त्रुटि-निवेशनम्');
                    });
                } else if (स्तम्भः === 2) { // Gray Code
                    निवेशनम्.maxLength = 10;
                    निवेशनम्.addEventListener('input', function() {
                        this.value = this.value.replace(/[^01]/g, '');
                        const grayNum = (पङ्क्तिः + 1) ^ ((पङ्क्तिः + 1) >> 1);
                        if (this.value.trim() === grayNum.toString(2).padStart(5, '0')) this.classList.remove('त्रुटि-निवेशनम्');
                        
                        const mirrorRow = document.querySelector('.दर्पण-रेखा');
                        if (mirrorRow) {
                            const allRows = document.querySelectorAll('#सारणीशरीरम् tr');
                            const r = Array.from(allRows).indexOf(mirrorRow);
                            if (पङ्क्तिः <= r) {
                                प्रवर्तय_प्रतिबिम्बम्();
                            }
                        }
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

            for (const निवेशनम् of सर्वाणि_निवेशनानि) {
                if (निवेशनम्.value.trim() === '') {
                    निवेशनम्.classList.add('त्रुटि-निवेशनम्');
                    प्रथम_त्रुटिः = निवेशनम्;
                    सर्वं_पूर्णम् = false;
                    break;
                }
            }

            if (!सर्वं_पूर्णम्) {
                const container = document.getElementById('अभ्याससारणी-पात्रम्');
                const inputRect = प्रथम_त्रुटिः.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const scrollOffset = inputRect.top - containerRect.top + container.scrollTop - (container.clientHeight / 2) + (inputRect.height / 2);
                container.scrollTo({ top: scrollOffset, behavior: 'smooth' });
                प्रथम_त्रुटिः.focus({ preventScroll: true });
                return;
            }

            let सर्वं_सम्यक् = true;
            for (const निवेशनम् of सर्वाणि_निवेशनानि) {
                const वर्तमानपङ्क्तिः = parseInt(निवेशनम्.dataset.पङ्क्ति) + 1;
                const वर्तमानस्तम्भः = parseInt(निवेशनम्.dataset.स्तम्भ);
                
                let अपेक्षितमूल्यम् = '';
                if (वर्तमानस्तम्भः === 1) { // Binary
                    अपेक्षितमूल्यम् = वर्तमानपङ्क्तिः.toString(2).padStart(5, '0');
                } else if (वर्तमानस्तम्भः === 2) { // Gray Code
                    const grayNum = वर्तमानपङ्क्तिः ^ (वर्तमानपङ्क्तिः >> 1);
                    अपेक्षितमूल्यम् = grayNum.toString(2).padStart(5, '0');
                }

                if (निवेशनम्.value.trim().toLowerCase() !== अपेक्षितमूल्यम्) {
                    निवेशनम्.classList.add('त्रुटि-निवेशनम्');
                    if (!प्रथम_त्रुटिः) प्रथम_त्रुटिः = निवेशनम्;
                    सर्वं_सम्यक् = false;
                }
            }

            if (!सर्वं_सम्यक्) {
                const container = document.getElementById('अभ्याससारणी-पात्रम्');
                const inputRect = प्रथम_त्रुटिः.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const scrollOffset = inputRect.top - containerRect.top + container.scrollTop - (container.clientHeight / 2) + (inputRect.height / 2);
                container.scrollTo({ top: scrollOffset, behavior: 'smooth' });
                प्रथम_त्रुटिः.focus({ preventScroll: true });
            } else {
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

    const faqButton = document.getElementById('faq-button');
    if (faqButton) {
        faqButton.addEventListener('click', function() {
            const faqContainer = document.getElementById('faq-container');
            const toolContainer = document.getElementById('अभ्याससारणी-पात्रम्');
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

    const दर्पणकीलः = document.getElementById('दर्पणकीलः');
    if (दर्पणकीलः) {
        दर्पणकीलः.addEventListener('click', function() {
            दर्पण_प्रकारः = !दर्पण_प्रकारः;
            document.body.classList.toggle('mirror-mode-active', दर्पण_प्रकारः);
            if (दर्पण_प्रकारः) {
                this.style.backgroundColor = 'var(--नील-वर्ण)';
                this.style.color = '#060b1a';
            } else {
                this.style.backgroundColor = 'transparent';
                this.style.color = 'var(--मुख्य-पाठ्य)';
                document.querySelectorAll('.दर्पण-रेखा').forEach(row => row.classList.remove('दर्पण-रेखा'));
                प्रवर्तय_प्रतिबिम्बम्();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && दर्पण_प्रकारः) {
            e.preventDefault();
            if (दर्पणकीलः) दर्पणकीलः.click();
        } else if (e.key.toLowerCase() === 'm') {
            e.preventDefault();
            if (दर्पणकीलः) दर्पणकीलः.click();
        }
    });
    function प्रवर्तय_प्रतिबिम्बम्() {
        document.querySelectorAll('#सारणीशरीरम् td:nth-child(3) input').forEach(inp => inp.placeholder = '');
        
        const mirrorRow = document.querySelector('.दर्पण-रेखा');
        if (!mirrorRow) return;
        const allRows = document.querySelectorAll('#सारणीशरीरम् tr');
        const r = Array.from(allRows).indexOf(mirrorRow);
        if (r === -1) return;
        
        for (let k = 1; k <= r + 1; k++) {
            const aboveRowIdx = r - k + 1;
            const belowRowIdx = r + k;
            if (belowRowIdx < allRows.length) {
                const aboveInput = allRows[aboveRowIdx].querySelector('td:nth-child(3) input');
                const belowInput = allRows[belowRowIdx].querySelector('td:nth-child(3) input');
                if (aboveInput && belowInput) {
                    belowInput.placeholder = aboveInput.value;
                }
            }
        }
    }
});
