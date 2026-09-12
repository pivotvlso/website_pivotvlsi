document.addEventListener('DOMContentLoaded', function() {
    const समस्या_मूल्यम् = document.getElementById('समस्या-मूल्यम्');
    const समस्या_सर्जन_कीलः = document.getElementById('समस्या-सर्जन-कीलः');
    const समस्या_ताला_कीलः = document.getElementById('समस्या-ताला-कीलः');
    const वाम_पटलम् = document.getElementById('वाम-पटलम्');
    const पद_पात्रम् = document.getElementById('पद-पात्रम्');

    let वर्तमान_समस्या = "";
    const अङ्कसङ्ख्या = 10;

    // Generate Problem Logic
    समस्या_सर्जन_कीलः.addEventListener('click', function() {
        let द्विमान_सूत्रम् = "";
        for (let i = 0; i < अङ्कसङ्ख्या; i++) {
            द्विमान_सूत्रम् += Math.floor(Math.random() * 2).toString();
        }
        
        वर्तमान_समस्या = द्विमान_सूत्रम्;
        समस्या_मूल्यम्.value = वर्तमान_समस्या;
        
        // Show lock button
        समस्या_ताला_कीलः.style.display = 'inline-flex';
        समस्या_ताला_कीलः.disabled = false;
        समस्या_ताला_कीलः.innerHTML = '<i class="fas fa-lock"></i> Lock';
        समस्या_ताला_कीलः.style.cursor = 'pointer';
        
        वाम_पटलम्.style.display = 'none';
    });

    समस्या_ताला_कीलः.addEventListener('click', function() {
        समस्या_सर्जन_कीलः.disabled = true;
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-lock"></i> Locked';
        this.style.cursor = 'default';
        वाम_पटलम्.style.display = 'flex';
        पदानि_सज्जीकुरु();
    });

    function पदानि_सज्जीकुरु() {
        पद_पात्रम्.innerHTML = '';
        
        // --- STEP 1: 1'S COMPLEMENT UI ---
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
        पङ्क्ति२_नामपत्रम्.textContent = "Step 1: 1's Complement (Invert Bits)";

        const पङ्क्ति२ = document.createElement('div');
        पङ्क्ति२.className = 'पद-पङ्क्ति';

        const निवेशनानि१ = [];
        const निवेशनानि२ = [];

        // Build columns for Step 1
        for (let i = 0; i < अङ्कसङ्ख्या; i++) {
            // Row 1 Input
            const निवेशनम्१ = document.createElement('input');
            निवेशनम्१.type = 'text';
            निवेशनम्१.className = 'पद-निवेशनम्';
            निवेशनम्१.maxLength = 1;
            निवेशनम्१.value = वर्तमान_समस्या[i];
            निवेशनम्१.readOnly = true;
            पङ्क्ति१.appendChild(निवेशनम्१);
            निवेशनानि१.push(निवेशनम्१);
            
            // Row 2 Input
            const निवेशनम्२ = document.createElement('input');
            निवेशनम्२.type = 'text';
            निवेशनम्२.className = 'पद-निवेशनम्';
            निवेशनम्२.maxLength = 1;
            निवेशनम्२.dataset.index = i;
            if (i > 0) निवेशनम्२.readOnly = true; // wait for previous bit
            पङ्क्ति२.appendChild(निवेशनम्२);
            निवेशनानि२.push(निवेशनम्२);

            निवेशनम्२.addEventListener('focus', function() {
                if (this.readOnly) { this.blur(); return; }
                निवेशनानि१.forEach(स => स.classList.remove('हाइलाइट-स्रोतः'));
                निवेशनानि२.forEach(स => स.classList.remove('हाइलाइट-स्रोतः'));
                निवेशनानि१[i].classList.add('हाइलाइट-स्रोतः');
                this.classList.add('हाइलाइट-स्रोतः');
            });

            निवेशनम्२.addEventListener('blur', function() {
                निवेशनानि१.forEach(स => स.classList.remove('हाइलाइट-स्रोतः'));
                this.classList.remove('हाइलाइट-स्रोतः');
            });

            निवेशनम्२.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                if (this.value === '') {
                    this.classList.remove('त्रुटि', 'सम्यक्');
                    return;
                }
                
                const अपेक्षितम् = वर्तमान_समस्या[i] === '1' ? '0' : '1';
                if (this.value === अपेक्षितम्) {
                    this.classList.remove('त्रुटि');
                    this.classList.add('सम्यक्');
                    this.readOnly = true;
                    this.blur();
                    
                    if (i + 1 < अङ्कसङ्ख्या) {
                        निवेशनानि२[i + 1].readOnly = false;
                        निवेशनानि२[i + 1].focus();
                    } else {
                        // Start Step 2 UI
                        द्वितीयपदमारम्भम्(निवेशनानि२.map(न => न.value).join(''));
                    }
                } else {
                    this.classList.add('त्रुटि');
                }
            });
        }

        पद_पात्रम्.appendChild(पङ्क्ति१_नामपत्रम्);
        पद_पात्रम्.appendChild(पङ्क्ति१);
        पद_पात्रम्.appendChild(पङ्क्ति२_नामपत्रम्);
        पद_पात्रम्.appendChild(पङ्क्ति२);
        
        setTimeout(() => निवेशनानि२[0].focus(), 100);
    }

    function द्वितीयपदमारम्भम्(पूरक_सूत्रम्) {
        // Build Binary Addition UI container
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

        // Carry Row
        const वहन_पङ्क्ति_पात्रम् = document.createElement('div');
        वहन_पङ्क्ति_पात्रम्.style.width = '100%';
        वहन_पङ्क्ति_पात्रम्.style.display = 'flex';
        वहन_पङ्क्ति_पात्रम्.style.flexDirection = 'column';
        वहन_पङ्क्ति_पात्रम्.style.alignItems = 'center'; // Center alignment
        
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

        // First Row (1's Complement)
        const प्रथम_पङ्क्ति = document.createElement('div');
        प्रथम_पङ्क्ति.className = 'पद-पङ्क्ति';
        प्रथम_पङ्क्ति.style.marginTop = '10px';
        योग_पात्रम्.appendChild(प्रथम_पङ्क्ति);

        // Second Row (+ 1)
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

        // Operand Verify Button
        const operand_सत्यापन_कीलः = document.createElement('button');
        operand_सत्यापन_कीलः.className = 'उपकरणकीलः';
        operand_सत्यापन_कीलः.style.marginTop = '15px';
        operand_सत्यापन_कीलः.style.backgroundColor = 'rgba(40, 167, 69, 0.8)';
        operand_सत्यापन_कीलः.innerHTML = 'Proceed';
        योग_पात्रम्.appendChild(operand_सत्यापन_कीलः);

        // Sum Row Container (Visible Immediately)
        const योग_पङ्क्ति_पात्रम् = document.createElement('div');
        योग_पङ्क्ति_पात्रम्.style.display = 'flex'; // Visible immediately
        योग_पङ्क्ति_पात्रम्.style.width = '100%';
        योग_पङ्क्ति_पात्रम्.style.flexDirection = 'column';
        योग_पङ्क्ति_पात्रम्.style.alignItems = 'center'; // Center alignment

        const विभाजकः = document.createElement('div');
        विभाजकः.style.width = '400px'; // Set a fixed width for the divider line
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

        // Sum Verify Button
        const योग_सत्यापन_कीलः = document.createElement('button');
        योग_सत्यापन_कीलः.className = 'उपकरणकीलः';
        योग_सत्यापन_कीलः.style.marginTop = '15px';
        योग_सत्यापन_कीलः.style.backgroundColor = 'rgba(40, 167, 69, 0.8)';
        योग_सत्यापन_कीलः.innerHTML = 'Proceed';
        योग_पङ्क्ति_पात्रम्.appendChild(योग_सत्यापन_कीलः);

        योग_पात्रम्.appendChild(योग_पङ्क्ति_पात्रम्);

        पद_पात्रम्.appendChild(योग_पात्रम्);

        // Generate arrays and expected values
        const वहन_निवेशनानि = [];
        const योग_निवेशनानि = [];
        const अपेक्षित_वहनम् = Array(अङ्कसङ्ख्या).fill('0');
        const अपेक्षित_योगः = Array(अङ्कसङ्ख्या).fill('0');
        
        // Row 2 for addition is "0000000001"
        const द्वितीय_सूत्रम् = '0'.repeat(अङ्कसङ्ख्या - 1) + '1';

        // Calculate expected carry and sum mathematically
        let carry = 0;
        for (let i = अङ्कसङ्ख्या - 1; i >= 0; i--) {
            const a = parseInt(पूरक_सूत्रम्[i]);
            const b = parseInt(द्वितीय_सूत्रम्[i]);
            const sum = a + b + carry;
            अपेक्षित_योगः[i] = (sum % 2).toString();
            carry = Math.floor(sum / 2);
            if (i > 0) अपेक्षित_वहनम्[i - 1] = carry.toString();
        }

        const प्र_निवेशनानि = [];
        const द्वि_निवेशनानि = [];

        for (let i = 0; i < अङ्कसङ्ख्या; i++) {
            // Carry Input
            if (i < अङ्कसङ्ख्या - 1) { // No carry input for LSB (rightmost)
                const वहन_निवेशनम् = document.createElement('input');
                वहन_निवेशनम्.type = 'text';
                वहन_निवेशनम्.className = 'पद-निवेशनम्';
                वहन_निवेशनम्.maxLength = 1;
                वहन_निवेशनम्.style.borderColor = '#ff9900';
                वहन_निवेशनम्.style.color = '#ff9900';
                वहन_निवेशनम्.dataset.expected = अपेक्षित_वहनम्[i];
                वहन_निवेशनम्.readOnly = true; // Wait until operands are filled
                वहन_पङ्क्ति.appendChild(वहन_निवेशनम्);
                वहन_निवेशनानि.push(वहन_निवेशनम्);
            } else {
                // Empty placeholder for LSB carry
                const शून्य_वहनम् = document.createElement('div');
                शून्य_वहनम्.className = 'पद-निवेशनम्';
                शून्य_वहनम्.style.visibility = 'hidden';
                वहन_पङ्क्ति.appendChild(शून्य_वहनम्);
            }

            // Row 1 (1's complement) - Interactive after truth table
            const प्र_निवेशनम् = document.createElement('input');
            प्र_निवेशनम्.type = 'text';
            प्र_निवेशनम्.className = 'पद-निवेशनम्';
            प्र_निवेशनम्.maxLength = 1;
            प्र_निवेशनम्.dataset.expected = पूरक_सूत्रम्[i];
            प्र_निवेशनम्.readOnly = true; // Locked until truth table verified
            प्रथम_पङ्क्ति.appendChild(प्र_निवेशनम्);
            प्र_निवेशनानि.push(प्र_निवेशनम्);

            // Row 2 (+1) - Interactive after truth table
            const द्वि_निवेशनम् = document.createElement('input');
            द्वि_निवेशनम्.type = 'text';
            द्वि_निवेशनम्.className = 'पद-निवेशनम्';
            द्वि_निवेशनम्.maxLength = 1;
            द्वि_निवेशनम्.dataset.expected = द्वितीय_सूत्रम्[i];
            द्वि_निवेशनम्.readOnly = true; // Locked until truth table verified
            द्वितीय_पङ्क्ति.appendChild(द्वि_निवेशनम्);
            द्वि_निवेशनानि.push(द्वि_निवेशनम्);

            // Sum Input (Readonly until Carry is done)
            const योग_निवेशनम् = document.createElement('input');
            योग_निवेशनम्.type = 'text';
            योग_निवेशनम्.className = 'पद-निवेशनम्';
            योग_निवेशनम्.maxLength = 1;
            योग_निवेशनम्.style.borderColor = '#00d4ff';
            योग_निवेशनम्.style.color = '#00d4ff';
            योग_निवेशनम्.readOnly = true; // Lock until Carry is verified
            योग_निवेशनम्.dataset.expected = अपेक्षित_योगः[i];
            योग_पङ्क्ति.appendChild(योग_निवेशनम्);
            योग_निवेशनानि.push(योग_निवेशनम्);
        }

        // Reverse to process from right to left
        योग_निवेशनानि.reverse();

        // Add input listeners for Row 1 (Right to Left)
        प्र_निवेशनानि.reverse();
        प्र_निवेशनानि.forEach((निवेशनम्, index) => {
            निवेशनम्.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि', 'सम्यक्');
                if (this.value !== '') {
                    if (index + 1 < प्र_निवेशनानि.length) {
                        प्र_निवेशनानि[index + 1].focus();
                    } else {
                        द्वि_निवेशनानि[0].focus();
                    }
                }
            });
        });

        // Add input listeners for Row 2 (Right to Left)
        द्वि_निवेशनानि.reverse();
        द्वि_निवेशनानि.forEach((निवेशनम्, index) => {
            निवेशनम्.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि', 'सम्यक्');
                if (this.value !== '') {
                    if (index + 1 < द्वि_निवेशनानि.length) {
                        द्वि_निवेशनानि[index + 1].focus();
                    }
                }
            });
        });

        // Operand Verification Button Logic
        operand_सत्यापन_कीलः.addEventListener('click', function() {
            let allCorrect = true;
            let firstWrong = null;

            [...प्र_निवेशनानि, ...द्वि_निवेशनानि].forEach(निवेशनम् => {
                if (निवेशनम्.value !== निवेशनम्.dataset.expected) {
                    allCorrect = false;
                    निवेशनम्.classList.add('त्रुटि');
                    if (!firstWrong) firstWrong = निवेशनम्;
                } else {
                    निवेशनम्.classList.add('सम्यक्');
                }
            });

            if (allCorrect) {
                [...प्र_निवेशनानि, ...द्वि_निवेशनानि].forEach(न => न.readOnly = true);
                this.style.display = 'none';
                
                // Lock all carry and sum inputs initially
                वहन_निवेशनानि.forEach(न => न.readOnly = true);
                योग_निवेशनानि.forEach(न => न.readOnly = true);
                
                // Unlock ONLY the rightmost Sum box initially (LSB)
                if (योग_निवेशनानि.length > 0) {
                    योग_निवेशनानि[0].readOnly = false;
                    setTimeout(() => योग_निवेशनानि[0].focus(), 100);
                }
            } else {
                if (firstWrong) firstWrong.focus();
            }
        });

        // Setup Truth Table Logic
        const दक्षिण_पटलम् = document.getElementById('दक्षिण-पटलम्');
        const सत्यता_सारणी_ताला_कीलः = document.getElementById('सत्यता-सारणी-ताला-कीलः');
        const fa_inputs = document.querySelectorAll('.fa-input');
        
        दक्षिण_पटलम्.style.display = 'flex';

        fa_inputs.forEach(inp => {
            inp.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि', 'सम्यक्');
            });
        });

        सत्यता_सारणी_ताला_कीलः.addEventListener('click', function() {
            let allCorrect = true;
            let firstWrong = null;

            fa_inputs.forEach(inp => {
                const a = parseInt(inp.dataset.a);
                const b = parseInt(inp.dataset.b);
                const c = parseInt(inp.dataset.c);
                const isSum = inp.dataset.type === 'sum';
                
                let expected;
                const total = a + b + c;
                if (isSum) {
                    expected = (total % 2).toString();
                } else {
                    expected = (total >= 2 ? 1 : 0).toString();
                }

                if (inp.value !== expected) {
                    allCorrect = false;
                    inp.classList.add('त्रुटि');
                    if (!firstWrong) firstWrong = inp;
                } else {
                    inp.classList.add('सम्यक्');
                }
            });

            if (allCorrect) {
                fa_inputs.forEach(inp => inp.readOnly = true);
                this.style.display = 'none';
                
                // Unlock Operands
                [...प्र_निवेशनानि, ...द्वि_निवेशनानि].forEach(न => न.readOnly = false);
                setTimeout(() => प्र_निवेशनानि[0].focus(), 100);
            } else {
                if (firstWrong) firstWrong.focus();
            }
        });

        // Handle column-by-column inputs logic
        वहन_निवेशनानि.reverse(); // Reverse to process from right (LSB+1) to left
        
        वहन_निवेशनानि.forEach((निवेशनम्, c) => {
            निवेशनम्.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि', 'सम्यक्');
                if (this.value !== '') {
                    if (योग_निवेशनानि[c + 1].value !== '') {
                        if (c + 1 < 9) {
                            वहन_निवेशनानि[c + 1].readOnly = false;
                            योग_निवेशनानि[c + 2].readOnly = false;
                            वहन_निवेशनानि[c + 1].focus();
                        }
                    } else {
                        योग_निवेशनानि[c + 1].focus();
                    }
                }
            });
        });

        योग_निवेशनानि.forEach((निवेशनम्, k) => {
            निवेशनम्.addEventListener('input', function() {
                this.value = this.value.replace(/[^01]/g, '');
                this.classList.remove('त्रुटि', 'सम्यक्');
                if (this.value !== '') {
                    if (k === 0) {
                        if (वहन_निवेशनानि.length > 0) {
                            वहन_निवेशनानि[0].readOnly = false;
                            योग_निवेशनानि[1].readOnly = false;
                            वहन_निवेशनानि[0].focus();
                        }
                    } else {
                        if (वहन_निवेशनानि[k - 1].value !== '') {
                            if (k < 9) {
                                वहन_निवेशनानि[k].readOnly = false;
                                योग_निवेशनानि[k + 1].readOnly = false;
                                वहन_निवेशनानि[k].focus();
                            }
                        } else {
                            वहन_निवेशनानि[k - 1].focus();
                        }
                    }
                }
            });
        });

        // Sum & Carry Verification Button Logic
        योग_सत्यापन_कीलः.addEventListener('click', function() {
            let allCorrect = true;
            let firstWrong = null;

            // Check Carries
            वहन_निवेशनानि.forEach(निवेशनम् => {
                if (निवेशनम्.value === '' && निवेशनम्.dataset.expected === '0') {
                    // It's acceptable to leave 0 carry blank? 
                    // No, wait, if they didn't fill it, maybe it's wrong, but let's strictly check dataset
                }
                if (निवेशनम्.value !== निवेशनम्.dataset.expected && (निवेशनम्.value !== '' || निवेशनम्.dataset.expected !== '0')) {
                    // Let's force them to fill explicitly, or if blank, treat as wrong unless expected is 0?
                    // Actually, let's strictly require the expected value. If expected is 0, they MUST enter 0.
                    // But if they didn't enter anything, and expected is 0... in binary addition they usually have to enter it.
                }
                
                // Standard strict check:
                if (निवेशनम्.value !== निवेशनम्.dataset.expected) {
                    allCorrect = false;
                    निवेशनम्.classList.add('त्रुटि');
                    if (!firstWrong) firstWrong = निवेशनम्;
                } else {
                    निवेशनम्.classList.add('सम्यक्');
                }
            });

            // Check Sums
            योग_निवेशनानि.forEach(निवेशनम् => {
                if (निवेशनम्.value !== निवेशनम्.dataset.expected) {
                    allCorrect = false;
                    निवेशनम्.classList.add('त्रुटि');
                    if (!firstWrong) firstWrong = निवेशनम्;
                } else {
                    निवेशनम्.classList.add('सम्यक्');
                }
            });

            if (allCorrect) {
                वहन_निवेशनानि.forEach(न => न.readOnly = true);
                योग_निवेशनानि.forEach(न => न.readOnly = true);
                this.style.display = 'none';
                अन्तिम_परिणामम्_दर्शय(योग_निवेशनानि.map(न => न.value).reverse().join(''));
            } else {
                if (firstWrong) firstWrong.focus();
            }
        });
    }

    function अन्तिम_परिणामम्_दर्शय(अन्तिम_सूत्रम्) {
        const परिणाम_खण्डः = document.createElement('div');
        परिणाम_खण्डः.className = 'परिणाम-सन्देश';
        परिणाम_खण्डः.style.display = 'flex';
        परिणाम_खण्डः.style.alignItems = 'center';
        परिणाम_खण्डः.style.justifyContent = 'center';
        परिणाम_खण्डः.style.gap = '10px';
        परिणाम_खण्डः.style.marginTop = '30px';
        
        परिणाम_खण्डः.innerHTML = `
            <span style="font-size: 1.5rem;"><i class="fas fa-check-double"></i> Verified 2's Complement</span>
            <button id="अन्तिम-सत्यापन-कीलः" class="उपकरणकीलः" style="margin-left: 20px;"><i class="fas fa-arrow-right"></i> Next problem</button>
        `;
        
        पद_पात्रम्.appendChild(परिणाम_खण्डः);

        const अन्तिम_सत्यापन_कीलः = document.getElementById('अन्तिम-सत्यापन-कीलः');
        अन्तिम_सत्यापन_कीलः.addEventListener('click', () => location.reload());
    }

    // FAQ logic
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
