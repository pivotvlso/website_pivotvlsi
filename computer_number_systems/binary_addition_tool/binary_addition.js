document.addEventListener('DOMContentLoaded', function() {
    const समस्या_सर्जन_कीलः = document.getElementById('समस्या-सर्जन-कीलः');
    const ताला_कीलः = document.getElementById('ताला-कीलः');
    const दशमलव_प्रथम_मूल्यम्_input = document.getElementById('दशमलव-प्रथम-मूल्यम्');
    const दशमलव_द्वितीय_मूल्यम्_input = document.getElementById('दशमलव-द्वितीय-मूल्यम्');
    const उत्तर_पट्टिका_पात्रम् = document.getElementById('उत्तर-पट्टिका-पात्रम्');
    
    let दशमलव_प्रथम_मूल्यम् = null;
    let दशमलव_द्वितीय_मूल्यम् = null;
    
    const विभाजन_पात्रम्_१ = document.getElementById('विभाजन-पात्रम्-१');
    const विभाजन_सत्यापन_कीलः_१ = document.getElementById('विभाजन-सत्यापन-कीलः-१');
    
    const विभाजन_पात्रम्_२ = document.getElementById('विभाजन-पात्रम्-२');
    const विभाजन_सत्यापन_कीलः_२ = document.getElementById('विभाजन-सत्यापन-कीलः-२');
    
    let प्रथम_समस्या_द्विचर = '';
    let द्वितीय_समस्या_द्विचर = '';
    let प्रथम_पूर्णम् = false;
    let द्वितीय_पूर्णम् = false;
    let सत्यता_सारणी_ताला = false;
    
    const सत्यता_सारणी_ताला_कीलः = document.getElementById('सत्यता-सारणी-ताला-कीलः');

    // Generate random decimal between 32 and 128
    function जनय_यादृच्छिक_दशमलव() {
        return Math.floor(Math.random() * (128 - 32 + 1)) + 32;
    }

    let वर्तमान_चरणम् = 0; // 0: None, 1: Number A, 2: Number B, 3: Addition
    
    const दशमलव_प्रथम_चिह्नम्_select = document.getElementById('दशमलव-प्रथम-चिह्नम्');
    const दशमलव_द्वितीय_चिह्नम्_select = document.getElementById('दशमलव-द्वितीय-चिह्नम्');

    समस्या_सर्जन_कीलः.addEventListener('click', function() {
        if(सत्यता_सारणी_ताला) return;
        
        if (!दशमलव_प्रथम_मूल्यम्_input.value.trim()) {
            let num1 = Math.floor(Math.random() * (128 - 32 + 1)) + 32;
            let sign1 = दशमलव_प्रथम_चिह्नम्_select.value;
            if (!sign1) {
                sign1 = Math.random() < 0.5 ? 'negative' : 'positive';
                दशमलव_प्रथम_चिह्नम्_select.value = sign1;
            }
            if (sign1 === 'negative') num1 = -num1;
            दशमलव_प्रथम_मूल्यम्_input.value = num1;
        }

        if (!दशमलव_द्वितीय_मूल्यम्_input.value.trim()) {
            let num2 = Math.floor(Math.random() * (128 - 32 + 1)) + 32;
            let sign2 = दशमलव_द्वितीय_चिह्नम्_select.value;
            if (!sign2) {
                sign2 = Math.random() < 0.5 ? 'negative' : 'positive';
                दशमलव_द्वितीय_चिह्नम्_select.value = sign2;
            }
            if (sign2 === 'negative') num2 = -num2;
            दशमलव_द्वितीय_मूल्यम्_input.value = num2;
        }
    });
    
    function द्वितीये_पूरक_पदानि_सृजतु(सङ्ख्या_id, द्विचर_सूत्रम्) {
        const सङ्ख्या_id_देवनागरी = सङ्ख्या_id === 1 ? '१' : '२';
        const पूरक_पात्रम् = document.getElementById(`पूरक-पात्रम्-${सङ्ख्या_id_देवनागरी}`);
        पूरक_पात्रम्.style.display = 'flex';
        पूरक_पात्रम्.innerHTML = '';
        
        const अङ्कसङ्ख्या = 8;
        
        const पङ्क्ति१_नामपत्रम् = document.createElement('div');
        पङ्क्ति१_नामपत्रम्.style.fontSize = '0.8rem';
        पङ्क्ति१_नामपत्रम्.style.color = 'gray';
        पङ्क्ति१_नामपत्रम्.style.marginBottom = '-10px';
        पङ्क्ति१_नामपत्रम्.style.marginTop = '10px';
        पङ्क्ति१_नामपत्रम्.textContent = "Original Binary";

        const पङ्क्ति१ = document.createElement('div');
        पङ्क्ति१.className = 'पद-पङ्क्ति';
        
        const पङ्क्ति२_नामपत्रम् = document.createElement('div');
        पङ्क्ति२_नामपत्रम्.style.fontSize = '0.8rem';
        पङ्क्ति२_नामपत्रम्.style.color = 'gray';
        पङ्क्ति२_नामपत्रम्.style.marginBottom = '-10px';
        पङ्क्ति२_नामपत्रम्.style.marginTop = '10px';
        पङ्क्ति२_नामपत्रम्.textContent = "Step 1: 1\'s Complement (Invert Bits)";

        const पङ्क्ति२ = document.createElement('div');
        पङ्क्ति२.className = 'पद-पङ्क्ति';

        const निवेशनानि१ = [];
        const निवेशनानि२ = [];

        for (let i = 0; i < अङ्कसङ्ख्या; i++) {
            const निवेशनम्१ = document.createElement('input');
            निवेशनम्१.type = 'text';
            निवेशनम्१.className = 'पद-निवेशनम्';
            निवेशनम्१.maxLength = 1;
            निवेशनम्१.value = द्विचर_सूत्रम्[i];
            निवेशनम्१.readOnly = true;
            निवेशनम्१.style.width = '30px';
            निवेशनम्१.style.height = '30px';
            निवेशनम्१.style.textAlign = 'center';
            निवेशनम्१.style.margin = '2px';
            पङ्क्ति१.appendChild(निवेशनम्१);
            निवेशनानि१.push(निवेशनम्१);
            
            const निवेशनम्२ = document.createElement('input');
            निवेशनम्२.type = 'text';
            निवेशनम्२.className = 'पद-निवेशनम्';
            निवेशनम्२.maxLength = 1;
            निवेशनम्२.dataset.index = i;
            निवेशनम्२.style.width = '30px';
            निवेशनम्२.style.height = '30px';
            निवेशनम्२.style.textAlign = 'center';
            निवेशनम्२.style.margin = '2px';
            if (i > 0) निवेशनम्२.readOnly = true; 
            पङ्क्ति२.appendChild(निवेशनम्२);
            निवेशनानि२.push(निवेशनम्२);

            निवेशनम्२.addEventListener('focus', function() {
                if (this.readOnly) { this.blur(); return; }
                निवेशनानि१.forEach(स => स.style.border = '');
                निवेशनानि२.forEach(स => स.style.border = '');
                निवेशनानि१[i].style.border = '2px solid yellow';
                this.style.border = '2px solid yellow';
            });

            निवेशनम्२.addEventListener('blur', function() {
                निवेशनानि१.forEach(स => स.style.border = '');
                this.style.border = '';
            });

            निवेशनम्२.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                if (this.value === '') {
                    this.classList.remove('त्रुटि', 'सम्यक्');
                    return;
                }
                
                const अपेक्षितम् = द्विचर_सूत्रम्[i] === '1' ? '0' : '1';
                if (this.value === अपेक्षितम्) {
                    this.classList.remove('त्रुटि');
                    this.classList.add('सम्यक्');
                    this.readOnly = true;
                    this.blur();
                    
                    if (i + 1 < अङ्कसङ्ख्या) {
                        निवेशनानि२[i + 1].readOnly = false;
                        निवेशनानि२[i + 1].focus();
                    } else {
                        द्वितीयपदमारम्भम्(सङ्ख्या_id, निवेशनानि२.map(न => न.value).join(''));
                    }
                } else {
                    this.classList.add('त्रुटि');
                }
            });
        }

        पूरक_पात्रम्.appendChild(पङ्क्ति१_नामपत्रम्);
        पूरक_पात्रम्.appendChild(पङ्क्ति१);
        पूरक_पात्रम्.appendChild(पङ्क्ति२_नामपत्रम्);
        पूरक_पात्रम्.appendChild(पङ्क्ति२);
        
        setTimeout(() => निवेशनानि२[0].focus(), 100);
    }
    
    function द्वितीयपदमारम्भम्(सङ्ख्या_id, पूरक_सूत्रम्) {
        const सङ्ख्या_id_देवनागरी = सङ्ख्या_id === 1 ? '१' : '२';
        const पूरक_पात्रम् = document.getElementById(`पूरक-पात्रम्-${सङ्ख्या_id_देवनागरी}`);
        const अङ्कसङ्ख्या = 8;
        
        const योग_पात्रम् = document.createElement('div');
        योग_पात्रम्.style.width = '100%';
        योग_पात्रम्.style.display = 'flex';
        योग_पात्रम्.style.flexDirection = 'column';
        योग_पात्रम्.style.alignItems = 'center';
        योग_पात्रम्.style.marginTop = '30px';
        योग_पात्रम्.style.borderTop = '1px solid rgba(255,255,255,0.1)';
        योग_पात्रम्.style.paddingTop = '20px';

        const शीर्षकम् = document.createElement('div');
        शीर्षकम्.style.fontSize = '0.8rem';
        शीर्षकम्.style.color = 'gray';
        शीर्षकम्.style.marginBottom = '20px';
        शीर्षकम्.textContent = "Step 2: Add 1 (Binary Addition)";
        योग_पात्रम्.appendChild(शीर्षकम्);

        const वहन_पङ्क्ति_पात्रम् = document.createElement('div');
        वहन_पङ्क्ति_पात्रम्.style.width = '100%';
        वहन_पङ्क्ति_पात्रम्.style.display = 'flex';
        वहन_पङ्क्ति_पात्रम्.style.flexDirection = 'column';
        वहन_पङ्क्ति_पात्रम्.style.alignItems = 'center';
        
        const वहन_शीर्षकम् = document.createElement('div');
        वहन_शीर्षकम्.textContent = 'Carry Row';
        वहन_शीर्षकम्.style.color = 'gray';
        वहन_शीर्षकम्.style.fontSize = '0.8em';
        वहन_शीर्षकम्.style.marginBottom = '5px';
        वहन_पङ्क्ति_पात्रम्.appendChild(वहन_शीर्षकम्);

        const वहन_पङ्क्ति = document.createElement('div');
        वहन_पङ्क्ति.className = 'पद-पङ्क्ति';
        वहन_पङ्क्ति.style.color = '#ff9900';
        वहन_पङ्क्ति_पात्रम्.appendChild(वहन_पङ्क्ति);
        योग_पात्रम्.appendChild(वहन_पङ्क्ति_पात्रम्);

        const प्रथम_पङ्क्ति = document.createElement('div');
        प्रथम_पङ्क्ति.className = 'पद-पङ्क्ति';
        प्रथम_पङ्क्ति.style.marginTop = '10px';
        योग_पात्रम्.appendChild(प्रथम_पङ्क्ति);

        const द्वितीय_पङ्क्ति_पात्रम् = document.createElement('div');
        द्वितीय_पङ्क्ति_पात्रम्.style.position = 'relative';
        द्वितीय_पङ्क्ति_पात्रम्.style.width = '100%';
        द्वितीय_पङ्क्ति_पात्रम्.style.display = 'flex';
        द्वितीय_पङ्क्ति_पात्रम्.style.justifyContent = 'center';
        द्वितीय_पङ्क्ति_पात्रम्.style.marginTop = '10px';
        
        const योग_चिह्नम् = document.createElement('span');
        योग_चिह्नम्.textContent = '+';
        योग_चिह्नम्.style.position = 'absolute';
        योग_चिह्नम्.style.left = '10px';
        योग_चिह्नम्.style.top = '50%';
        योग_चिह्नम्.style.transform = 'translateY(-50%)';
        योग_चिह्नम्.style.fontSize = '1.5rem';
        द्वितीय_पङ्क्ति_पात्रम्.appendChild(योग_चिह्नम्);

        const द्वितीय_पङ्क्ति = document.createElement('div');
        द्वितीय_पङ्क्ति.className = 'पद-पङ्क्ति';
        द्वितीय_पङ्क्ति_पात्रम्.appendChild(द्वितीय_पङ्क्ति);
        योग_पात्रम्.appendChild(द्वितीय_पङ्क्ति_पात्रम्);

        const operand_सत्यापन_कीलः = document.createElement('button');
        operand_सत्यापन_कीलः.className = 'उपकरणकीलः';
        operand_सत्यापन_कीलः.style.marginTop = '15px';
        operand_सत्यापन_कीलः.style.backgroundColor = 'rgba(40, 167, 69, 0.8)';
        operand_सत्यापन_कीलः.innerHTML = 'Proceed';
        योग_पात्रम्.appendChild(operand_सत्यापन_कीलः);

        const योग_पङ्क्ति_पात्रम् = document.createElement('div');
        योग_पङ्क्ति_पात्रम्.style.display = 'flex';
        योग_पङ्क्ति_पात्रम्.style.width = '100%';
        योग_पङ्क्ति_पात्रम्.style.flexDirection = 'column';
        योग_पङ्क्ति_पात्रम्.style.alignItems = 'center';

        const विभाजकः = document.createElement('div');
        विभाजकः.style.width = '400px';
        विभाजकः.style.borderBottom = '2px solid rgba(255,255,255,0.1)';
        विभाजकः.style.margin = '10px 0';
        योग_पङ्क्ति_पात्रम्.appendChild(विभाजकः);

        const योग_शीर्षकम् = document.createElement('div');
        योग_शीर्षकम्.textContent = 'Sum Row';
        योग_शीर्षकम्.style.color = 'gray';
        योग_शीर्षकम्.style.fontSize = '0.8em';
        योग_शीर्षकम्.style.marginBottom = '5px';
        योग_पङ्क्ति_पात्रम्.appendChild(योग_शीर्षकम्);

        const योग_पङ्क्ति = document.createElement('div');
        योग_पङ्क्ति.className = 'पद-पङ्क्ति';
        योग_पङ्क्ति.style.color = '#00d4ff';
        योग_पङ्क्ति_पात्रम्.appendChild(योग_पङ्क्ति);

        const योग_सत्यापन_कीलः = document.createElement('button');
        योग_सत्यापन_कीलः.className = 'उपकरणकीलः';
        योग_सत्यापन_कीलः.style.marginTop = '15px';
        योग_सत्यापन_कीलः.style.backgroundColor = 'rgba(40, 167, 69, 0.8)';
        योग_सत्यापन_कीलः.innerHTML = 'Proceed';
        योग_पङ्क्ति_पात्रम्.appendChild(योग_सत्यापन_कीलः);

        योग_पात्रम्.appendChild(योग_पङ्क्ति_पात्रम्);
        पूरक_पात्रम्.appendChild(योग_पात्रम्);

        const वहन_निवेशनानि = [];
        const योग_निवेशनानि = [];
        const अपेक्षित_वहनम् = Array(अङ्कसङ्ख्या).fill('0');
        const अपेक्षित_योगः = Array(अङ्कसङ्ख्या).fill('0');
        let carry = 1;

        for (let i = अङ्कसङ्ख्या - 1; i >= 0; i--) {
            const bit = parseInt(पूरक_सूत्रम्[i], 10);
            const sum = bit + carry;
            अपेक्षित_योगः[i] = (sum % 2).toString();
            carry = Math.floor(sum / 2);
            if (i > 0) {
                अपेक्षित_वहनम्[i - 1] = carry.toString();
            }
        }

        for (let i = 0; i < अङ्कसङ्ख्या; i++) {
            const वहन_निवेशनम् = document.createElement('input');
            वहन_निवेशनम्.type = 'text';
            वहन_निवेशनम्.className = 'पद-निवेशनम्';
            वहन_निवेशनम्.maxLength = 1;
            वहन_निवेशनम्.dataset.expected = अपेक्षित_वहनम्[i];
            वहन_निवेशनम्.style.width = '30px';
            वहन_निवेशनम्.style.height = '30px';
            वहन_निवेशनम्.style.textAlign = 'center';
            वहन_निवेशनम्.style.margin = '2px';
            if (i === अङ्कसङ्ख्या - 1) {
                वहन_निवेशनम्.style.visibility = 'hidden';
            }
            वहन_पङ्क्ति.appendChild(वहन_निवेशनम्);
            वहन_निवेशनानि.push(वहन_निवेशनम्);

            const निवेशनम्१ = document.createElement('input');
            निवेशनम्१.type = 'text';
            निवेशनम्१.className = 'पद-निवेशनम्';
            निवेशनम्१.value = पूरक_सूत्रम्[i];
            निवेशनम्१.readOnly = true;
            निवेशनम्१.style.width = '30px';
            निवेशनम्१.style.height = '30px';
            निवेशनम्१.style.textAlign = 'center';
            निवेशनम्१.style.margin = '2px';
            प्रथम_पङ्क्ति.appendChild(निवेशनम्१);

            const निवेशनम्२ = document.createElement('input');
            निवेशनम्२.type = 'text';
            निवेशनम्२.className = 'पद-निवेशनम्';
            निवेशनम्२.value = (i === अङ्कसङ्ख्या - 1) ? '1' : '0';
            निवेशनम्२.readOnly = true;
            निवेशनम्२.style.width = '30px';
            निवेशनम्२.style.height = '30px';
            निवेशनम्२.style.textAlign = 'center';
            निवेशनम्२.style.margin = '2px';
            द्वितीय_पङ्क्ति.appendChild(निवेशनम्२);

            const योग_निवेशनम् = document.createElement('input');
            योग_निवेशनम्.type = 'text';
            योग_निवेशनम्.className = 'पद-निवेशनम्';
            योग_निवेशनम्.maxLength = 1;
            योग_निवेशनम्.dataset.expected = अपेक्षित_योगः[i];
            योग_निवेशनम्.style.width = '30px';
            योग_निवेशनम्.style.height = '30px';
            योग_निवेशनम्.style.textAlign = 'center';
            योग_निवेशनम्.style.margin = '2px';
            योग_निवेशनम्.disabled = true; 
            योग_पङ्क्ति.appendChild(योग_निवेशनम्);
            योग_निवेशनानि.push(योग_निवेशनम्);
        }

        [...वहन_निवेशनानि, ...योग_निवेशनानि].forEach(inp => {
            inp.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि-प्रकाशः');
            });
        });

        operand_सत्यापन_कीलः.addEventListener('click', () => {
            let अस्ति_त्रुटिः = false;
            वहन_निवेशनानि.forEach(निवेशनम् => {
                if (निवेशनम्.style.visibility !== 'hidden') {
                    if (निवेशनम्.value === '') {
                        निवेशनम्.classList.add('त्रुटि-प्रकाशः');
                        अस्ति_त्रुटिः = true;
                    } else if (निवेशनम्.value !== निवेशनम्.dataset.expected) {
                        निवेशनम्.classList.add('त्रुटि-प्रकाशः');
                        अस्ति_त्रुटिः = true;
                    }
                }
            });

            if (!अस्ति_त्रुटिः) {
                वहन_निवेशनानि.forEach(निवेशनम् => {
                    निवेशनम्.readOnly = true;
                    निवेशनम्.classList.add('साफल्य-प्रकाशः');
                });
                operand_सत्यापन_कीलः.style.display = 'none';
                योग_निवेशनानि.forEach(निवेशनम् => निवेशनम्.disabled = false);
            }
        });

        योग_सत्यापन_कीलः.addEventListener('click', () => {
            let अस्ति_त्रुटिः = false;
            योग_निवेशनानि.forEach(निवेशनम् => {
                if (निवेशनम्.value === '') {
                    निवेशनम्.classList.add('त्रुटि-प्रकाशः');
                    अस्ति_त्रुटिः = true;
                } else if (निवेशनम्.value !== निवेशनम्.dataset.expected) {
                    निवेशनम्.classList.add('त्रुटि-प्रकाशः');
                    अस्ति_त्रुटिः = true;
                }
            });

            if (!अस्ति_त्रुटिः) {
                योग_निवेशनानि.forEach(निवेशनम् => {
                    निवेशनम्.readOnly = true;
                    निवेशनम्.classList.add('साफल्य-प्रकाशः');
                });
                योग_सत्यापन_कीलः.style.display = 'none';
                
                let final_twos_comp = अपेक्षित_योगः.join('');
                if (सङ्ख्या_id === 1) {
                    प्रथम_समस्या_द्विचर = final_twos_comp;
                    प्रथम_पूर्णम् = true;
                    setTimeout(() => {
                        वर्तमान_चरणम् = 2;
                        दर्श्य_रूपान्तरण_पट्टिकाम्(2, दशमलव_द्वितीय_मूल्यम्);
                    }, 1000);
                } else {
                    द्वितीय_समस्या_द्विचर = final_twos_comp;
                    द्वितीय_पूर्णम् = true;
                    setTimeout(() => {
                        वर्तमान_चरणम् = 3;
                        उत्तर_पट्टिका_पात्रम्.style.display = 'block';
                        सृज_पदानि(प्रथम_समस्या_द्विचर, द्वितीय_समस्या_द्विचर);
                    }, 1000);
                }
            }
        });
    }

    ताला_कीलः.addEventListener('click', function() {
        if(सत्यता_सारणी_ताला) return;
        
        let val1 = parseInt(दशमलव_प्रथम_मूल्यम्_input.value.trim(), 10);
        let val2 = parseInt(दशमलव_द्वितीय_मूल्यम्_input.value.trim(), 10);
        
        if (isNaN(val1) || isNaN(val2)) {
            alert("Please enter valid decimal numbers for both Number A and Number B.");
            return;
        }
        if (val1 < -128 || val1 > 127 || val2 < -128 || val2 > 127) {
            alert("Please enter values between -128 and 127 for 8-bit representation.");
            return;
        }

        दशमलव_प्रथम_मूल्यम् = val1;
        दशमलव_द्वितीय_मूल्यम् = val2;
        
        प्रथम_समस्या_द्विचर = "";
        द्वितीय_समस्या_द्विचर = "";

        सत्यता_सारणी_ताला = true;
        दशमलव_प्रथम_मूल्यम्_input.readOnly = true;
        दशमलव_द्वितीय_मूल्यम्_input.readOnly = true;
        समस्या_सर्जन_कीलः.disabled = true;
        
        this.innerHTML = '<i class="fas fa-lock"></i> Locked';
        this.style.backgroundColor = 'var(--त्रुटि-वर्ण, #dc3545)';
        
        document.getElementById('रूपान्तरण-पट्टिका-१').style.display = 'none';
        document.getElementById('रूपान्तरण-पट्टिका-२').style.display = 'none';
        
        वर्तमान_चरणम् = 1;
        दर्श्य_रूपान्तरण_पट्टिकाम्(1, दशमलव_प्रथम_मूल्यम्);
    });

    const अग्रिम_चरण_कीलः_१ = document.getElementById('अग्रिम-चरण-कीलः-१');
    const अग्रिम_चरण_कीलः_२ = document.getElementById('अग्रिम-चरण-कीलः-२');

    अग्रिम_चरण_कीलः_१.addEventListener('click', () => {
        if (वर्तमान_चरणम् === 1) {
            वर्तमान_चरणम् = 2;
            अग्रिम_चरण_कीलः_१.style.display = 'none'; // hide next button
            दर्श्य_रूपान्तरण_पट्टिकाम्(2, दशमलव_द्वितीय_मूल्यम्);
        }
    });
    
    अग्रिम_चरण_कीलः_२.addEventListener('click', () => {
        if (वर्तमान_चरणम् === 2) {
            वर्तमान_चरणम् = 3;
            अग्रिम_चरण_कीलः_२.style.display = 'none';
            उत्तर_पट्टिका_पात्रम्.style.display = 'block';
            सृज_पदानि(प्रथम_समस्या_द्विचर, द्वितीय_समस्या_द्विचर);
        }
    });

    function दर्श्य_रूपान्तरण_पट्टिकाम्(चरणम्, दशमलव_मूल्यम्) {
        const चरणम्_देवनागरी = चरणम् === 1 ? '१' : '२';
        const रूपान्तरण_पट्टिका = document.getElementById(`रूपान्तरण-पट्टिका-${चरणम्_देवनागरी}`);
        const वर्तमान_दशमलव_मूल्यम् = document.getElementById(`वर्तमान-दशमलव-मूल्यम्-${चरणम्_देवनागरी}`);
        const विभाजन_पात्रम् = document.getElementById(`विभाजन-पात्रम्-${चरणम्_देवनागरी}`);
        const विभाजन_सत्यापन_कीलः = document.getElementById(`विभाजन-सत्यापन-कीलः-${चरणम्_देवनागरी}`);
        const अन्तिम_परिणामम् = document.getElementById(`रूपान्तरण-अन्तिम-परिणामम्-${चरणम्_देवनागरी}`);
        const अग्रिम_चरण_कीलः = document.getElementById(`अग्रिम-चरण-कीलः-${चरणम्_देवनागरी}`);
        
        रूपान्तरण_पट्टिका.style.display = 'flex';
        वर्तमान_दशमलव_मूल्यम्.textContent = दशमलव_मूल्यम्;
        अन्तिम_परिणामम्.style.display = 'none';
        अन्तिम_परिणामम्.innerHTML = '';
        अग्रिम_चरण_कीलः.style.display = 'none';
        
        विभाजनगणकदृश्यं_सृजतु(चरणम्);
        सृज_विभाजन_दृश्यम्(विभाजन_पात्रम्, विभाजन_सत्यापन_कीलः, दशमलव_मूल्यम्, चरणम्);
    }

    
    
    function पङ्क्तिं_पूर्णं_करोतु(पङ्क्ति_तत्त्वम्) {
        पङ्क्ति_तत्त्वम्.dataset.partial = 'false';
        const elements = पङ्क्ति_तत्त्वम्.querySelectorAll('.div-x, .div-bracket, .div-dash, .div-z');
        elements.forEach(el => {
            el.style.visibility = 'visible';
        });
    }

    function सृज_विभाजन_दृश्यम्(पात्रम्, कीलः, दशमलव_मूल्यम्, सङ्ख्या_id) {
        पात्रम्.innerHTML = '';
        कीलः.disabled = false;
        कीलः.innerHTML = 'Proceed <i class="fas fa-check"></i>';
        कीलः.style.backgroundColor = 'transparent';
        
        let भाज्यम् = Math.abs(parseInt(दशमलव_मूल्यम्, 10));
        let भाजकम् = 2; // Converting to binary
        
        // Render Row 0 as complete and NOT readonly, WITH remainder!
        let शेषम्० = भाज्यम् % भाजकम्;
        विभाजनपङ्क्तिं_सृजतु(पात्रम्, 0, भाजकम्, भाज्यम्, शेषम्०, false, false);
        
        // Render Row 1 as partial
        let भागफलम्१ = Math.floor(भाज्यम् / भाजकम्);
        let शेषम्१ = भागफलम्१ % भाजकम्;
        विभाजनपङ्क्तिं_सृजतु(पात्रम्, 1, भाजकम्, भागफलम्१, शेषम्१, true, false);
        
        // Remove old listeners to avoid duplicates
        const newकीलः = कीलः.cloneNode(true);
        कीलः.parentNode.replaceChild(newकीलः, कीलः);
        
        विभाजनसत्यापनकीलम्_सज्जीकरोतु(पात्रम्, newकीलः, भाजकम्, सङ्ख्या_id);
    }

    function विभाजनपङ्क्तिं_सृजतु(पात्रम्, पङ्क्तिसङ्ख्या, अपेक्षितम्_क, अपेक्षितम्_ख, अपेक्षितम्_ग, isPartial = false, isReadonly = false) {
        const पङ्क्ति_तत्त्वम् = document.createElement('div');
        पङ्क्ति_तत्त्वम्.className = 'div-row';
        पङ्क्ति_तत्त्वम्.dataset.row = पङ्क्तिसङ्ख्या;
        पङ्क्ति_तत्त्वम्.style.display = 'flex';
        पङ्क्ति_तत्त्वम्.style.alignItems = 'flex-end';
        पङ्क्ति_तत्त्वम्.style.color = 'white';
        पङ्क्ति_तत्त्वम्.style.marginBottom = '5px';
        if (isPartial) पङ्क्ति_तत्त्वम्.dataset.partial = 'true';
        else पङ्क्ति_तत्त्वम्.dataset.partial = 'false';
        
        const कोष्ठकजालपुटम् = `<div class="div-bracket" style="border-left: 2px solid white; border-bottom: 2px solid white; height: 35px; width: 15px; margin: 0 5px 5px 5px; ${isPartial ? 'visibility: hidden;' : ''}"></div>`;
        
        let जालपुटम् = '';
        const readonlyAttr = isReadonly ? 'readonly' : '';
        const readonlyStyle = isReadonly ? 'opacity: 1;' : '';
        
        जालपुटम् += `<input type="text" class="div-input div-x" data-expected="${अपेक्षितम्_क}" ${readonlyAttr} value="${isReadonly ? अपेक्षितम्_क : ''}" autocomplete="off" style="width: 40px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; margin-bottom: 5px; ${isPartial ? 'visibility: hidden;' : ''} ${readonlyStyle}">`;
        
        जालपुटम् += कोष्ठकजालपुटम्;
        
        जालपुटम् += `<input type="text" class="div-input div-y" data-expected="${अपेक्षितम्_ख}" ${readonlyAttr} value="${isReadonly ? अपेक्षितम्_ख : ''}" autocomplete="off" style="width: 80px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; margin-bottom: 5px; ${readonlyStyle}">`;
        
        if (अपेक्षितम्_ग !== null && अपेक्षितम्_ग !== undefined) {
            जालपुटम् += `<span class="div-dash" style="margin: 0 10px 10px 10px; font-weight: bold; ${isPartial ? 'visibility: hidden;' : ''}">-</span>`;
            जालपुटम् += `<input type="text" class="div-input div-z" data-expected="${अपेक्षितम्_ग}" ${readonlyAttr} value="${isReadonly ? अपेक्षितम्_ग : ''}" autocomplete="off" style="width: 40px; text-align: center; padding: 5px; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none; margin-bottom: 5px; ${isPartial ? 'visibility: hidden;' : ''} ${readonlyStyle}">`;
        }
        
        पङ्क्ति_तत्त्वम्.innerHTML = जालपुटम्;
        
        // restrict inputs to numbers
        पङ्क्ति_तत्त्वम्.querySelectorAll('.div-input').forEach(inp => {
            inp.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
                this.classList.remove('त्रुटि-प्रकाशः', 'त्रुटि');
            });
        });

        पात्रम्.appendChild(पङ्क्ति_तत्त्वम्);
    }

    
    
    function विभाजनसत्यापनकीलम्_सज्जीकरोतु(पात्रम्, सत्यापन_कीलः, भाजकम्, सङ्ख्या_id) {
        सत्यापन_कीलः.addEventListener('click', () => {
            let सक्रियनिवेशनानि = Array.from(पात्रम्.querySelectorAll('.div-input:not([readonly])'));
            // Filter out hidden inputs
            सक्रियनिवेशनानि = सक्रियनिवेशनानि.filter(inp => inp.style.visibility !== 'hidden');
            
            if (सक्रियनिवेशनानि.length === 0) return;
            
            let प्रथमरिक्तम् = null;
            let प्रथमत्रुटिपूर्णम् = null;
            
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.remove('त्रुटि-प्रकाशः', 'त्रुटि');
                const मूल्यशब्दः = निवेशनम्.value.trim().toUpperCase();
                const अपेक्षितशब्दः = निवेशनम्.dataset.expected.toString().toUpperCase();
                
                if (मूल्यशब्दः === '') {
                    if (!प्रथमरिक्तम्) प्रथमरिक्तम् = निवेशनम्;
                } else if (मूल्यशब्दः !== अपेक्षितशब्दः) {
                    if (!प्रथमत्रुटिपूर्णम्) प्रथमत्रुटिपूर्णम् = निवेशनम्;
                }
            });
            
            if (प्रथमरिक्तम्) {
                प्रथमरिक्तम्.classList.add('त्रुटि-प्रकाशः', 'त्रुटि');
                प्रथमरिक्तम्.focus();
                return;
            }
            
            if (प्रथमत्रुटिपूर्णम्) {
                प्रथमत्रुटिपूर्णम्.classList.add('त्रुटि-प्रकाशः', 'त्रुटि');
                प्रथमत्रुटिपूर्णम्.focus();
                return;
            }
            
            सक्रियनिवेशनानि.forEach(निवेशनम् => {
                निवेशनम्.classList.add('साफल्य-प्रकाशः', 'सम्यक्');
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
            
            if (उच्चतमपङ्क्तितत्त्वम्.dataset.partial === 'true') {
                if (वर्तमान_ख < भाजकम्) {
                    // Transition to final result directly!
                    let शेषाणि = वर्तमान_ख > 0 ? वर्तमान_ख.toString(भाजकम्).toUpperCase() : '';
                    const सर्वापङ्क्तयः = पात्रम्.querySelectorAll('.div-row');
                    // Read remainders from bottom to top, skipping the current partial row which has no remainder!
                    for (let i = उच्चतमपङ्क्तिः - 1; i >= 0; i--) {
                        const ग_निवेशनम् = सर्वापङ्क्तयः[i].querySelector('.div-z');
                        if (ग_निवेशनम्) {
                            let शेषमूल्यम् = parseInt(ग_निवेशनम्.dataset.expected, 10);
                            शेषाणि += शेषमूल्यम्.toString(भाजकम्).toUpperCase();
                        }
                    }
                    सत्यापन_कीलः.style.display = 'none';
                    
                    const दशमलव_मूल्यम् = सङ्ख्या_id === 1 ? दशमलव_प्रथम_मूल्यम् : दशमलव_द्वितीय_मूल्यम्;
                    अन्तिमपरिणामदृश्यं_सृजतु(दशमलव_मूल्यम्, "10", शेषाणि, "2", सङ्ख्या_id);
                } else {
                    पङ्क्तिं_पूर्णं_करोतु(उच्चतमपङ्क्तितत्त्वम्);
                    
                    let अग्रिमभागफलम् = Math.floor(वर्तमान_ख / भाजकम्);
                    let अग्रिमशेषम् = वर्तमान_ख % भाजकम्;
                    विभाजनपङ्क्तिं_सृजतु(पात्रम्, उच्चतमपङ्क्तिः + 1, भाजकम्, अग्रिमभागफलम्, अग्रिमशेषम्, true, false);
                    
                    const newlyRevealedX = उच्चतमपङ्क्तितत्त्वम्.querySelector('.div-x');
                    if (newlyRevealedX) newlyRevealedX.focus();
                }
            } else {
                const अग्रिमपङ्क्तिः = पात्रम्.querySelector(`.div-row[data-row="${उच्चतमपङ्क्तिः + 1}"]`);
                if (अग्रिमपङ्क्तिः) {
                    const nextY = अग्रिमपङ्क्तिः.querySelector('.div-y');
                    if (nextY && nextY.style.visibility !== 'hidden') nextY.focus();
                }
            }
        });
    }

    function विभाजनगणकदृश्यं_सृजतु(चरणम्) {
        const चरणम्_देवनागरी = चरणम् === 1 ? '१' : '२';
        const दक्षिण_पटलम् = document.getElementById(`रूपान्तरण-दक्षिण-पटलम्-${चरणम्_देवनागरी}`);
        
        let जालपुटम् = `
        <div style="background-color: var(--card-bg, rgba(255,255,255,0.05)); border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); width: 100%; display: flex; flex-direction: column; align-items: center;">
            <h3 style="color: var(--text-primary, white); margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">Calculator</h3>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 1.5rem; color: white;">
                ( <input type="text" id="गणक_भाज्यम्_${चरणम्_देवनागरी}" autocomplete="off" style="width: 80px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
                /
                ( <input type="text" id="गणक_भाजकम्_${चरणम्_देवनागरी}" autocomplete="off" style="width: 50px; text-align: center; padding: 8px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
                <button id="गणक_समानम्_${चरणम्_देवनागरी}" class="उपकरणकीलः" style="padding: 8px 15px; font-size: 1.2rem;">=</button>
            </div>
            <div id="गणक_परिणामः_${चरणम्_देवनागरी}" style="margin-top: 20px; color: var(--accent-blue, #00d4ff); font-size: 1.2rem; display: none;"></div>
        </div>
        `;
        
        दक्षिण_पटलम्.innerHTML = जालपुटम्;
        
        const गणक_समानम् = document.getElementById(`गणक_समानम्_${चरणम्_देवनागरी}`);
        const गणक_भाज्यम् = document.getElementById(`गणक_भाज्यम्_${चरणम्_देवनागरी}`);
        const गणक_भाजकम् = document.getElementById(`गणक_भाजकम्_${चरणम्_देवनागरी}`);
        const गणक_परिणामः = document.getElementById(`गणक_परिणामः_${चरणम्_देवनागरी}`);
        
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
            
            if (भाजकम् !== 2) {
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
                        Quotient: <input type="text" id="calc-q-${चरणम्_देवनागरी}" value="${भागफलम्}" readonly style="width: 60px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; outline: none;">
                        <button class="उपकरणकीलः copy-btn" data-copy="calc-q-${चरणम्_देवनागरी}" style="padding: 5px 10px; font-size: 0.9rem;" title="Copy Quotient"><i class="fas fa-copy"></i></button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        Remainder: <input type="text" id="calc-r-${चरणम्_देवनागरी}" value="${शेषम्}" readonly style="width: 60px; text-align: center; padding: 5px; font-size: 1.1rem; background-color: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; outline: none;">
                        <button class="उपकरणकीलः copy-btn" data-copy="calc-r-${चरणम्_देवनागरी}" style="padding: 5px 10px; font-size: 0.9rem;" title="Copy Remainder"><i class="fas fa-copy"></i></button>
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

    function अन्तिमपरिणामदृश्यं_सृजतु(स्रोतः_मूल्यम्, स्रोतः_आधारः, परिणाममूल्यम्, लक्ष्य_आधारः, सङ्ख्या_id) {
        const सङ्ख्या_id_देवनागरी = सङ्ख्या_id === 1 ? '१' : '२';
        const अन्तिम_परिणामम् = document.getElementById(`रूपान्तरण-अन्तिम-परिणामम्-${सङ्ख्या_id_देवनागरी}`);
        
        let जालपुटम् = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 1.5rem; color: white;">
            ( <input type="text" class="अन्तिम-निवेशनम्" data-expected="${स्रोतः_मूल्यम्}" autocomplete="off" style="width: 100px; text-align: center; padding: 5px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
            <sub style="margin-top: 15px;"><input type="text" class="अन्तिम-निवेशनम्" data-expected="${स्रोतः_आधारः}" autocomplete="off" style="width: 30px; text-align: center; padding: 2px; font-size: 0.9rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"></sub>
            <span style="margin: 0 10px;">=</span>
            ( <input type="text" class="अन्तिम-निवेशनम्" data-expected="${परिणाममूल्यम्}" autocomplete="off" style="width: 150px; text-align: center; padding: 5px; font-size: 1.2rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"> )
            <sub style="margin-top: 15px;"><input type="text" class="अन्तिम-निवेशनम्" data-expected="${लक्ष्य_आधारः}" autocomplete="off" style="width: 30px; text-align: center; padding: 2px; font-size: 0.9rem; background-color: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; outline: none;"></sub>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 15px;">
            <button id="अन्तिम-सत्यापन-कीलः-${सङ्ख्या_id_देवनागरी}" class="उपकरणकीलः">Verify <i class="fas fa-check"></i></button>
        </div>
        `;
        
        अन्तिम_परिणामम्.innerHTML = जालपुटम्;
        अन्तिम_परिणामम्.style.display = 'flex';
        
        const सत्यापन_कीलः = document.getElementById(`अन्तिम-सत्यापन-कीलः-${सङ्ख्या_id_देवनागरी}`);
        सत्यापन_कीलः.addEventListener('click', () => {
            const निवेशनानि = अन्तिम_परिणामम्.querySelectorAll('.अन्तिम-निवेशनम्');
            
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
                
                let padded_binary = परिणाममूल्यम्.padStart(8, '0');
                let decimal_value = सङ्ख्या_id === 1 ? दशमलव_प्रथम_मूल्यम् : दशमलव_द्वितीय_मूल्यम्;
                
                if (decimal_value < 0) {
                    // Show 2's complement steps
                    द्वितीये_पूरक_पदानि_सृजतु(सङ्ख्या_id, padded_binary);
                } else {
                    // It's positive, just use padded binary
                    if (सङ्ख्या_id === 1) {
                        प्रथम_समस्या_द्विचर = padded_binary;
                        प्रथम_पूर्णम् = true;
                        setTimeout(() => {
                            वर्तमान_चरणम् = 2;
                            दर्श्य_रूपान्तरण_पट्टिकाम्(2, दशमलव_द्वितीय_मूल्यम्);
                        }, 100);
                    } else {
                        द्वितीय_समस्या_द्विचर = padded_binary;
                        द्वितीय_पूर्णम् = true;
                        setTimeout(() => {
                            वर्तमान_चरणम् = 3;
                            उत्तर_पट्टिका_पात्रम्.style.display = 'block';
                            सृज_पदानि(प्रथम_समस्या_द्विचर, द्वितीय_समस्या_द्विचर);
                        }, 100);
                    }
                }
            }
        });
    }

    // Full Adder Truth Table Logic
    const faInputs = document.querySelectorAll('.fa-input');
    const वाम_पटलम् = document.getElementById('वाम-पटलम्');

    faInputs.forEach(निवेशनम् => {
        निवेशनम्.addEventListener('input', function() {
            this.value = this.value.replace(/[^01]/g, '');
            this.classList.remove('त्रुटि');
        });
    });

    सत्यता_सारणी_ताला_कीलः.addEventListener('click', function() {
        let सर्वं_सम्यक् = true;
        
        faInputs.forEach(निवेशनम् => {
            const क = parseInt(निवेशनम्.dataset.a);
            const ख = parseInt(निवेशनम्.dataset.b);
            const ग = parseInt(निवेशनम्.dataset.c);
            const प्रकारः = निवेशनम्.dataset.type; // sum or carry
            
            const योगः = क ^ ख ^ ग;
            const वहनम् = (क & ख) | (ख & ग) | (क & ग);
            
            const अपेक्षितम् = प्रकारः === 'sum' ? योगः.toString() : वहनम्.toString();
            
            if (निवेशनम्.value === अपेक्षितम्) {
                निवेशनम्.classList.add('सम्यक्');
                निवेशनम्.classList.remove('त्रुटि');
            } else {
                निवेशनम्.classList.add('त्रुटि');
                निवेशनम्.classList.remove('सम्यक्');
                सर्वं_सम्यक् = false;
            }
        });

        if (सर्वं_सम्यक्) {
            faInputs.forEach(निवेशनम् => निवेशनम्.readOnly = true);
            this.innerHTML = '<i class="fas fa-check-double"></i> Verified';
            this.disabled = true;
            this.style.cursor = 'default';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            सत्यता_सारणी_ताला = true;
            
            वाम_पटलम्.style.display = 'flex';
            
            // Focus the very first input (which is rightmost Sum input)
            const प्रथम_निवेशनम् = document.querySelector('.योग-निवेशनम्[data-col="0"]');
            if (प्रथम_निवेशनम्) {
                setTimeout(() => प्रथम_निवेशनम्.focus(), 100);
            }
        }
    });

    // Step-by-step Addition Grid Logic
    function सृज_पदानि(प्रथम, द्वितीय) {
        const प्रथम_पङ्क्ति = document.getElementById('प्रथम-पङ्क्ति');
        const द्वितीय_पङ्क्ति = document.getElementById('द्वितीय-पङ्क्ति');
        const वहन_पङ्क्ति = document.getElementById('वहन-पङ्क्ति');
        const योग_पङ्क्ति = document.getElementById('योग-पङ्क्ति');
        const वहन_पात्रम् = document.getElementById('वहन-पङ्क्ति-पात्रम्');
        const योग_पात्रम् = document.getElementById('योग-पङ्क्ति-पात्रम्');
        const अतिरिक्त_सत्यापन_कीलः = document.getElementById('अतिरिक्त-सत्यापन-कीलः');

        प्रथम_पङ्क्ति.innerHTML = '';
        द्वितीय_पङ्क्ति.innerHTML = '';
        वहन_पङ्क्ति.innerHTML = '';
        योग_पङ्क्ति.innerHTML = '';
        
        वहन_पात्रम्.style.display = 'none';
        योग_पात्रम्.style.display = 'none';
        अतिरिक्त_सत्यापन_कीलः.style.display = 'block';
        अतिरिक्त_सत्यापन_कीलः.disabled = false;

        const maxLen = Math.max(प्रथम.length, द्वितीय.length);
        const A = प्रथम.padStart(maxLen, '0');
        const B = द्वितीय.padStart(maxLen, '0');
        
        const कुल_स्तम्भाः = maxLen + 1;

        for (let i = 0; i < कुल_स्तम्भाः; i++) {
            const valA = i === 0 ? '' : A[i - 1];
            const valB = i === 0 ? '' : B[i - 1];

            if (i === 0) {
                const spanA = document.createElement('span');
                spanA.className = 'पद-निवेशनम्';
                spanA.style.border = 'none';
                spanA.style.background = 'transparent';
                प्रथम_पङ्क्ति.appendChild(spanA);

                const spanB = document.createElement('span');
                spanB.className = 'पद-निवेशनम्';
                spanB.style.border = 'none';
                spanB.style.background = 'transparent';
                द्वितीय_पङ्क्ति.appendChild(spanB);
            } else {
                const inputA = document.createElement('input');
                inputA.type = 'text';
                inputA.className = 'पद-निवेशनम् सङ्ख्या-निवेशनम्';
                inputA.maxLength = 1;
                inputA.dataset.expected = valA;
                प्रथम_पङ्क्ति.appendChild(inputA);

                const inputB = document.createElement('input');
                inputB.type = 'text';
                inputB.className = 'पद-निवेशनम् सङ्ख्या-निवेशनम्';
                inputB.maxLength = 1;
                inputB.dataset.expected = valB;
                द्वितीय_पङ्क्ति.appendChild(inputB);
            }

            const carryInput = document.createElement('input');
            carryInput.type = 'text';
            carryInput.className = 'पद-निवेशनम् वहन-निवेशनम्';
            carryInput.maxLength = 1;
            carryInput.dataset.col = कुल_स्तम्भाः - 1 - i;
            carryInput.readOnly = true;
            वहन_पङ्क्ति.appendChild(carryInput);

            const sumInput = document.createElement('input');
            sumInput.type = 'text';
            sumInput.className = 'पद-निवेशनम् योग-निवेशनम्';
            sumInput.maxLength = 1;
            sumInput.dataset.col = कुल_स्तम्भाः - 1 - i;
            sumInput.readOnly = true;
            योग_पङ्क्ति.appendChild(sumInput);
        }

        const lsbCarry = document.querySelector(`.वहन-निवेशनम्[data-col="0"]`);
        const lsbSum = document.querySelector(`.योग-निवेशनम्[data-col="0"]`);
        if (lsbCarry) lsbCarry.readOnly = false;
        if (lsbSum) lsbSum.readOnly = false;

        const सर्व_वहन_निवेशनानि = document.querySelectorAll('.वहन-निवेशनम्');
        const सर्व_योग_निवेशनानि = document.querySelectorAll('.योग-निवेशनम्');

        [...सर्व_वहन_निवेशनानि, ...सर्व_योग_निवेशनानि].forEach(निवेशनम् => {
            निवेशनम्.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि');
                
                const colIndex = parseInt(this.dataset.col);
                परीक्ष_स्तम्भम्(colIndex, A, B);
            });
        });
        
        const सङ्ख्या_निवेशनानि = document.querySelectorAll('.सङ्ख्या-निवेशनम्');
        सङ्ख्या_निवेशनानि.forEach(निवेशनम् => {
            निवेशनम्.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि');
            });
        });

        अतिरिक्त_सत्यापन_कीलः.onclick = function() {
            let allCorrect = true;
            सङ्ख्या_निवेशनानि.forEach(निवेशनम् => {
                if (निवेशनम्.value !== निवेशनम्.dataset.expected) {
                    निवेशनम्.classList.add('त्रुटि');
                    allCorrect = false;
                } else {
                    निवेशनम्.classList.remove('त्रुटि');
                }
            });

            if (allCorrect) {
                सङ्ख्या_निवेशनानि.forEach(निवेशनम् => {
                    निवेशनम्.readOnly = true;
                    निवेशनम्.classList.add('सम्यक्');
                });
                अतिरिक्त_सत्यापन_कीलः.style.display = 'none';
                वहन_पात्रम्.style.display = 'flex';
                योग_पात्रम्.style.display = 'flex';
            }
        };
    }

    function परीक्ष_स्तम्भम्(colIndex, A, B) {
        const currentCarry = document.querySelector(`.वहन-निवेशनम्[data-col="${colIndex}"]`);
        const currentSum = document.querySelector(`.योग-निवेशनम्[data-col="${colIndex}"]`);
        
        if (!currentCarry || !currentSum || currentCarry.value === '' || currentSum.value === '') {
            return; // Not fully filled yet
        }

        // Calculate expected values
        const maxLen = A.length;
        // In string A, LSB is at maxLen - 1. Our colIndex 0 is LSB.
        // So string index = maxLen - 1 - colIndex.
        let bitA = 0;
        let bitB = 0;
        
        if (colIndex < maxLen) {
            bitA = parseInt(A[maxLen - 1 - colIndex]);
            bitB = parseInt(B[maxLen - 1 - colIndex]);
        }

        // Find carry-in value from previous step (colIndex - 1), or 0 if colIndex is 0
        let carryInValue = 0;
        if (colIndex > 0) {
            // In the UI, the user calculates the carry OUT for colIndex-1, which they wrote into the carry IN for colIndex.
            // Actually, wait! The layout is: Carry row, A row, B row, Sum row.
            // The carry above column `colIndex` is the carry generated from column `colIndex - 1`.
            // For colIndex 0 (LSB), the carry above it is 0.
            const prevCarryOut = parseInt(document.querySelector(`.वहन-निवेशनम्[data-col="${colIndex}"]`).value);
            carryInValue = prevCarryOut; // The user input for THIS column's carry IS the carry in.
        } else {
            // LSB carry in should strictly be entered as 0
            carryInValue = 0;
        }

        // Calculate expected sum and carry OUT
        // Wait, what the user enters in `.वहन-निवेशनम्[data-col="${colIndex}"]` is the carry IN for this column!
        // No, in standard addition on paper, you write the carry OVER the next column.
        // So the carry generated from colIndex is written in colIndex + 1.
        // Therefore, user MUST calculate sum for colIndex, AND write the carry into colIndex + 1.
        
        // Let's adjust logic:
        // User inputs:
        // 1. `.वहन-निवेशनम्[data-col="${colIndex}"]` (which is carry IN to this col)
        // 2. `.योग-निवेशनम्[data-col="${colIndex}"]` (which is sum of this col)
        
        // Wait, for LSB, there is no carry in. But I forced them to write a 0.
        const userCarryIn = parseInt(currentCarry.value);
        const userSum = parseInt(currentSum.value);
        
        // Actual correct carry in comes from calculating previous columns.
        let trueCarryIn = 0;
        for (let j = 0; j < colIndex; j++) {
            let a = j < maxLen ? parseInt(A[maxLen - 1 - j]) : 0;
            let b = j < maxLen ? parseInt(B[maxLen - 1 - j]) : 0;
            trueCarryIn = ((a & b) | (b & trueCarryIn) | (a & trueCarryIn));
        }

        if (userCarryIn !== trueCarryIn) {
            currentCarry.classList.add('त्रुटि');
        } else {
            currentCarry.classList.remove('त्रुटि');
            currentCarry.classList.add('सम्यक्');
        }

        const trueSum = bitA ^ bitB ^ trueCarryIn;

        if (userSum !== trueSum) {
            currentSum.classList.add('त्रुटि');
        } else {
            currentSum.classList.remove('त्रुटि');
            currentSum.classList.add('सम्यक्');
        }

        // If both are correct, lock them and unlock the next column (colIndex + 1)
        if (currentCarry.classList.contains('सम्यक्') && currentSum.classList.contains('सम्यक्')) {
            currentCarry.readOnly = true;
            currentSum.readOnly = true;
            
            const nextCarry = document.querySelector(`.वहन-निवेशनम्[data-col="${colIndex + 1}"]`);
            const nextSum = document.querySelector(`.योग-निवेशनम्[data-col="${colIndex + 1}"]`);
            
            if (nextCarry && nextSum) {
                nextCarry.readOnly = false;
                nextSum.readOnly = false;
                nextCarry.focus();
            } else {
                // Done
                अन्तिम_परिणामम्_दर्शय();
            }
        }
    }

    function अन्तिम_परिणामम्_दर्शय() {
        const पद_पात्रम् = document.getElementById('पद-पात्रम्');
        
        const परिणाम_खण्डः = document.createElement('div');
        परिणाम_खण्डः.className = 'परिणाम-सन्देश';
        परिणाम_खण्डः.innerHTML = '<i class="fas fa-check-circle"></i> Addition Verified Successfully!';
        
        const finalEqContainer = document.createElement('div');
        finalEqContainer.style.display = 'flex';
        finalEqContainer.style.alignItems = 'center';
        finalEqContainer.style.justifyContent = 'center';
        finalEqContainer.style.gap = '5px';
        finalEqContainer.style.marginTop = '20px';
        finalEqContainer.style.fontSize = '1.2rem';
        
        const inputStyle = 'width: 60px; text-align: center; padding: 5px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; border-radius: 4px;';
        const baseInputStyle = 'width: 30px; text-align: center; padding: 2px; font-size: 0.8rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; border-radius: 4px;';
        
        finalEqContainer.innerHTML = `
            <span>(</span><input type="text" id="final-a" style="${inputStyle}" maxlength="4"><span>)</span><sub><input type="text" id="final-base-a" style="${baseInputStyle}" maxlength="2"></sub>
            <span style="margin: 0 10px;">+</span>
            <span>(</span><input type="text" id="final-b" style="${inputStyle}" maxlength="4"><span>)</span><sub><input type="text" id="final-base-b" style="${baseInputStyle}" maxlength="2"></sub>
            <span style="margin: 0 10px;">=</span>
            <span>(</span><input type="text" id="final-c" style="width: 120px; text-align: center; padding: 5px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; border-radius: 4px;" maxlength="10"><span>)</span><sub><input type="text" id="final-base-c" style="${baseInputStyle}" maxlength="2"></sub>
        `;
        
        const verifyBtn = document.createElement('button');
        verifyBtn.className = 'उपकरणकीलः';
        verifyBtn.style.marginTop = '15px';
        verifyBtn.innerHTML = 'Verify Final Equation';
        
        const nextBtnContainer = document.createElement('div');
        nextBtnContainer.style.display = 'none';
        nextBtnContainer.style.marginTop = '15px';
        nextBtnContainer.style.textAlign = 'center';
        
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745;"></i> Correct!';
        successMsg.style.marginBottom = '10px';
        
        const अग्रिम_कीलः = document.createElement('button');
        अग्रिम_कीलः.className = 'उपकरणकीलः';
        अग्रिम_कीलः.innerHTML = 'Next problem <i class="fas fa-arrow-right"></i>';
        अग्रिम_कीलः.addEventListener('click', () => location.reload());
        
        nextBtnContainer.appendChild(successMsg);
        nextBtnContainer.appendChild(अग्रिम_कीलः);
        
        verifyBtn.addEventListener('click', () => {
            const valA = document.getElementById('final-a');
            const baseA = document.getElementById('final-base-a');
            const valB = document.getElementById('final-b');
            const baseB = document.getElementById('final-base-b');
            const valC = document.getElementById('final-c');
            const baseC = document.getElementById('final-base-c');
            
            let expected_c = "";
            for (let i = 7; i >= 0; i--) {
                const sumInput = document.querySelector(`.योग-निवेशनम्[data-col="${i}"]`);
                if (sumInput) {
                    expected_c += sumInput.value;
                }
            }
            
            let allCorrect = true;
            
            const check = (el, expected) => {
                if (el.value.trim() === String(expected)) {
                    el.classList.remove('त्रुटिः');
                } else {
                    el.classList.add('त्रुटिः');
                    allCorrect = false;
                }
            };
            
            check(valA, दशमलव_प्रथम_मूल्यम्);
            check(baseA, '10');
            check(valB, दशमलव_द्वितीय_मूल्यम्);
            check(baseB, '10');
            check(valC, expected_c);
            check(baseC, '2');
            
            if (allCorrect) {
                [valA, baseA, valB, baseB, valC, baseC].forEach(el => el.readOnly = true);
                verifyBtn.style.display = 'none';
                nextBtnContainer.style.display = 'block';
            }
        });
        
        // Remove old style error borders on input
        finalEqContainer.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('त्रुटिः');
            });
        });
        
        परिणाम_खण्डः.appendChild(finalEqContainer);
        परिणाम_खण्डः.appendChild(verifyBtn);
        परिणाम_खण्डः.appendChild(nextBtnContainer);
        
        पद_पात्रम्.appendChild(परिणाम_खण्डः);
    }

    // FAQ Toggle
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
