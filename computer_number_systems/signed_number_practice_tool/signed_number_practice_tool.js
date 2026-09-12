// JS for Signed Number Practice Tool

document.addEventListener('DOMContentLoaded', function() {
    const सारणीशरीरम् = document.getElementById('सारणीशरीरम्');
    const पङ्क्तिसङ्ख्या = 31;
    const स्तम्भसङ्ख्या = 4;

    function getExpected(sNoValue, type) {
        const absVal = Math.abs(sNoValue);
        let magBits = Math.max(4, absVal.toString(2).length);
        let absStr = absVal.toString(2).padStart(magBits, '0');
        
        if (type === 1) { // SM
            if (sNoValue === 0) return ['00000', '10000'];
            return [(sNoValue < 0 ? '1' : '0') + absStr];
        } else if (type === 3) { // 1's Comp
            if (sNoValue === 0) return ['00000', '11111'];
            if (sNoValue > 0) return ['0' + absStr];
            return ['1' + absStr.split('').map(b => b === '0' ? '1' : '0').join('')];
        } else if (type === 2) { // 2's Comp
            if (sNoValue === 0) return ['00000'];
            if (sNoValue > 0) return ['0' + absStr];
            let bitLen = magBits + 1;
            if (sNoValue === -16) bitLen = 5;
            return [(Math.pow(2, bitLen) + sNoValue).toString(2).padStart(bitLen, '0')];
        }
        return [];
    }

    for (let पङ्क्तिः = 0; पङ्क्तिः < पङ्क्तिसङ्ख्या; पङ्क्तिः++) {
        const नूतनपङ्क्तिः = document.createElement('tr');
        
        const sNoValue = पङ्क्तिः - 15;
        
        for (let स्तम्भः = 0; स्तम्भः < स्तम्भसङ्ख्या; स्तम्भः++) {
            const नूतनकोष्ठकः = document.createElement('td');
            const निवेशनम् = document.createElement('input');
            निवेशनम्.type = 'text';
            निवेशनम्.className = 'अभ्यासनिवेशनम्';
            
            if (स्तम्भः === 0) {
                निवेशनम्.maxLength = 5;
                निवेशनम्.value = (sNoValue > 0 ? '+' : '') + sNoValue;
                निवेशनम्.readOnly = true;
                निवेशनम्.style.textAlign = 'center';
                निवेशनम्.style.color = 'rgba(255, 255, 255, 0.5)';
            } else {
                निवेशनम्.dataset.पङ्क्ति = पङ्क्तिः;
                निवेशनम्.dataset.स्तम्भ = स्तम्भः;
                निवेशनम्.addEventListener('click', function() {
                    this.classList.remove('त्रुटि-निवेशनम्');
                });
                
                if (स्तम्भः >= 1 && स्तम्भः <= 3) {
                    निवेशनम्.maxLength = 6;
                    निवेशनम्.addEventListener('input', function() {
                        this.value = this.value.replace(/[^01]/g, '');
                        const expectedOptions = getExpected(sNoValue, स्तम्भः);
                        if (expectedOptions.includes(this.value.trim())) this.classList.remove('त्रुटि-निवेशनम्');
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
                    if (!प्रथम_त्रुटिः) प्रथम_त्रुटिः = निवेशनम्;
                    सर्वं_पूर्णम् = false;
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
                const वर्तमानपङ्क्तिः = parseInt(निवेशनम्.dataset.पङ्क्ति);
                const sNoValue = वर्तमानपङ्क्तिः - 15;
                const वर्तमानस्तम्भः = parseInt(निवेशनम्.dataset.स्तम्भ);
                
                const expectedOptions = getExpected(sNoValue, वर्तमानस्तम्भः);

                if (!expectedOptions.includes(निवेशनम्.value.trim())) {
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
                if(प्रथम_त्रुटिः) प्रथम_त्रुटिः.focus({ preventScroll: true });
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
});
