document.addEventListener('DOMContentLoaded', () => {
    // FAQ Toggle Logic
    const प्रश्नकीलः = document.getElementById('प्रश्न-कीलः');
    const प्रश्नपात्रम् = document.getElementById('प्रश्न-पात्रम्');
    const उपकरणपात्रम् = document.getElementById('उपकरण-पात्रम्');
    const प्रश्नचिह्नम् = document.getElementById('प्रश्न-चिह्नम्');
    const प्रश्नपाठ्यम् = document.getElementById('प्रश्न-पाठ्यम्');

    प्रश्नकीलः.addEventListener('click', () => {
        if (प्रश्नपात्रम्.style.display === 'none') {
            प्रश्नपात्रम्.style.display = 'block';
            उपकरणपात्रम्.style.display = 'none';
            प्रश्नचिह्नम्.classList.remove('fa-question-circle');
            प्रश्नचिह्नम्.classList.add('fa-times');
            प्रश्नपाठ्यम्.innerText = 'Close';
        } else {
            प्रश्नपात्रम्.style.display = 'none';
            उपकरणपात्रम्.style.display = 'flex'; // Changed to flex since tool-container uses flex
            प्रश्नचिह्नम्.classList.remove('fa-times');
            प्रश्नचिह्नम्.classList.add('fa-question-circle');
            प्रश्नपाठ्यम्.innerText = 'FAQ';
        }
    });

    const पृष्ठशीर्षकम् = document.getElementById('पृष्ठशीर्षकम्');
    const घटीमुखम् = document.getElementById('घटी-मुखम्');
    const सूचिका = document.getElementById('सूचिका');
    const विपरीतसूचिका = document.getElementById('विपरीत-सूचिका');
    
    let वर्तमानमूल्यम् = 0;
    let कुलपदानि = 0; // Tracks total increments/decrements for smooth continuous rotation
    let वर्तमानप्रकारः = 'decimal'; // 'binary' or 'decimal'

    function चक्रमूल्यानिप्राप्तुम्() {
        if (वर्तमानप्रकारः === 'binary') {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        } else {
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
    }

    function घटीनिर्माणम्() {
        // Clear existing ticks
        document.querySelectorAll('.घटी-चिह्निका').forEach(t => t.remove());
        
        const wheelValues = चक्रमूल्यानिप्राप्तुम्();
        const वस्तुसङ्ख्या = wheelValues.length;
        const पद्कोणः = 360 / वस्तुसङ्ख्या;

        for (let i = 0; i < वस्तुसङ्ख्या; i++) {
            const मूल्यम् = wheelValues[i];
            const कोणः = i * पद्कोणः;
            const चिह्निका = document.createElement('div');
            चिह्निका.className = 'घटी-चिह्निका';
            चिह्निका.id = 'tick-' + मूल्यम्;
            
            चिह्निका.style.transform = `rotate(${कोणः}deg) translate(0, -180px) rotate(-${कोणः}deg)`;
            
            const द्विमानशृङ्खला = मूल्यम्.toString(2).padStart(4, '0');
            
            if (वर्तमानप्रकारः === 'binary') {
                चिह्निका.innerHTML = `<span class="चिह्निका-द्विमान" style="font-size:1.2rem; opacity:1;">${द्विमानशृङ्खला}</span>`;
            } else {
                चिह्निका.innerHTML = `<span class="चिह्निका-दशमलव">${मूल्यम्}</span>`;
            }
            
            चिह्निका.addEventListener('click', () => {
                मूल्यंअद्यतनीकरणम्(मूल्यम्);
            });
            
            घटीमुखम्.appendChild(चिह्निका);
        }
        
        // Update header based on mode
        if (वर्तमानप्रकारः === 'binary') {
            पृष्ठशीर्षकम्.innerText = "2's Complement";
        } else {
            पृष्ठशीर्षकम्.innerText = "10's Complement";
        }

        // Reset state on rebuild
        वर्तमानमूल्यम् = 0;
        कुलपदानि = 0;
        प्रदर्शनम्अद्यतनीकरणम्();
    }

    function मूल्यंअद्यतनीकरणम्(newVal) {
        const wheelValues = चक्रमूल्यानिप्राप्तुम्();
        const वस्तुसङ्ख्या = wheelValues.length;
        const प्राचीनसूचकाङ्कः = wheelValues.indexOf(वर्तमानमूल्यम्);
        const नवीनसूचकाङ्कः = wheelValues.indexOf(newVal);
        
        let भेदः = नवीनसूचकाङ्कः - प्राचीनसूचकाङ्कः;
        // Shortest path for the needle
        const अर्धम् = Math.floor(वस्तुसङ्ख्या / 2);
        if (भेदः > अर्धम्) भेदः -= वस्तुसङ्ख्या;
        else if (भेदः < -अर्धम्) भेदः += वस्तुसङ्ख्या;
        
        कुलपदानि += भेदः;
        वर्तमानमूल्यम् = newVal;
        प्रदर्शनम्अद्यतनीकरणम्();
    }

    function प्रदर्शनम्अद्यतनीकरणम्() {
        const wheelValues = चक्रमूल्यानिप्राप्तुम्();
        const वस्तुसङ्ख्या = wheelValues.length;
        const पद्कोणः = 360 / वस्तुसङ्ख्या;
        
        const कोणः = (कुलपदानि * पद्कोणः);
        सूचिका.style.transform = `translate(-50%, -100%) rotate(${कोणः}deg)`;

        // Always show opposite needle
        if (विपरीतसूचिका) {
            विपरीतसूचिका.style.display = 'block';
        }

        // Mathematical 2's/10's complement on a circle is a perfect V-shape reflection!
        // This means the opposite needle simply rotates exactly in the opposite direction.
        // We use -कुलपदानि to ensure it rotates smoothly without spinning wildly.
        const विपरीतकोणः = (-कुलपदानि * पद्कोणः);

        विपरीतसूचिका.style.transform = `translate(-50%, -100%) rotate(${विपरीतकोणः}deg)`;

        // Highlight active number
        document.querySelectorAll('.घटी-चिह्निका').forEach(t => t.classList.remove('सक्रिय'));
        const सक्रियचिह्निका = document.getElementById('tick-' + वर्तमानमूल्यम्);
        if (सक्रियचिह्निका) सक्रियचिह्निका.classList.add('सक्रिय');
    }

    // Mode Selector
    document.getElementById('प्रकार-चयकः').addEventListener('change', (e) => {
        वर्तमानप्रकारः = e.target.value;
        घटीनिर्माणम्();
    });

    // Initialize
    घटीनिर्माणम्();
});
