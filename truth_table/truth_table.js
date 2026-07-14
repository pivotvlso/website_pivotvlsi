let द्वयायामीसरणी = [];
let सरणीदीर्घता = 2;
let सरणीविस्तारः = 2;
let सारणीदत्तांशः = [];
let पङ्क्तिः =[];
let पुटपङ्क्तिः = "";
let कोष्ठकम् = "";
let सारणीशीर्षम् = '';
let सारणीमध्यभागः = '';

function सरणीप्रारम्भीकरणम्() {
    सारणीरिक्तीकरणम्();
}
function पुनर्निर्माणम्() {
    const सारणीमुख्यभागः = document.getElementById('सारणी');
    सारणीमुख्यभागः.innerHTML = "";
    पुटपङ्क्तिः = document.createElement("tr");
    let प्रथमसारणीशीर्षम् = document.createElement("thead");
    for (let च = 0; च <= सरणीदीर्घता; च++) {
        सारणीदत्तांशः[च] = new Array(सरणीविस्तारः).fill(''); 
        
    }
    कोष्ठकम् = document.createElement("th");
    पुटपङ्क्तिः.appendChild(कोष्ठकम्);
    for (let च = 0; च < सरणीविस्तारः; च++) {
        let कोष्ठकम् = document.createElement("th");
        let पुटम् = document.createElement("button");
        पुटम्.innerText = "×";
        पुटम्.className = "स्तम्भनिर्मूलनपुटम्";
        // Pass the index so we know WHICH column to kill
        पुटम्.id = `स्तम्भनिर्मूलनपुटस्वरूपम्-${च}`;
        कोष्ठकम्.appendChild(पुटम्);        
        पुटपङ्क्तिः.appendChild(कोष्ठकम्);
        
    }
    कोष्ठकम् = document.createElement("th");
    let पुटम् = document.createElement("button");
    पुटम्.classList.add("संयोगपुटम्");
    पुटम्.innerText = '+';
    पुटम्.id = "स्तम्भसंयोगः";
    कोष्ठकम्.appendChild(पुटम्);
    पुटपङ्क्तिः.appendChild(कोष्ठकम्);
    प्रथमसारणीशीर्षम्.appendChild(पुटपङ्क्तिः);
    //सारणीमुख्यभागः.innerHTML =  सारणीशीर्षम्.outerHTML;
    
    for (let क = 0; क < सरणीदीर्घता; क++) {
        पङ्क्तिः[क] = document.createElement("tr");
        if (क==0) {
            सारणीशीर्षम् = document.createElement("thead");
            सारणीमध्यभागः = document.createElement("tbody");
            let कोष्ठकम् = document.createElement("th");
            let पुटम् = document.createElement("button");
            पुटम्.innerText = "×";
            पुटम्.className = "स्तम्भनिर्मूलनपुटम्";
            पुटम्.id = `पङ्क्तिनिर्मूलनपुटम्-${क}`;
            कोष्ठकम्.appendChild(पुटम्);
            पङ्क्तिः[क].appendChild(कोष्ठकम्);
            for (let च = 0; च < सरणीविस्तारः; च++) {
                सारणीदत्तांशः[क][च] = document.createElement("th");
                सारणीदत्तांशः[क][च].draggable = true;
                सारणीदत्तांशः[क][च].contentEditable = true;
                सारणीदत्तांशः[क][च].classList.add("सम्पादनीयकोष्ठकम्");
                सारणीदत्तांशः[क][च].innerText = द्वयायामीसरणी[क][च];
                सारणीदत्तांशः[क][च].id = `स्वरूपम्-${क}-${च}`;
                सारणीदत्तांशः[क][च].oninput = function() {
                    द्वयायामीसरणी[क][च] = सारणीदत्तांशः[क][च].innerText;
                };
                पङ्क्तिः[क].appendChild(सारणीदत्तांशः[क][च]);
            }
            सारणीशीर्षम्.appendChild(पङ्क्तिः[क]);            
        } else {
            let कोष्ठकम् = document.createElement("th");
            let पुटम् = document.createElement("button");
            पुटम्.innerText = "×";
            पुटम्.className = "स्तम्भनिर्मूलनपुटम्";
            पुटम्.id = `पङ्क्तिनिर्मूलनपुटम्-${क}`;
            कोष्ठकम्.appendChild(पुटम्);
            पङ्क्तिः[क].appendChild(कोष्ठकम्);
            for (let च = 0; च < सरणीविस्तारः; च++) {
                सारणीदत्तांशः[क][च] = document.createElement("td");
                सारणीदत्तांशः[क][च].draggable = false;
                सारणीदत्तांशः[क][च].contentEditable = true;
                सारणीदत्तांशः[क][च].classList.add("सम्पादनीयकोष्ठकम्");
                सारणीदत्तांशः[क][च].innerText = द्वयायामीसरणी[क][च];
                सारणीदत्तांशः[क][च].id = `स्वरूपम्-${क}-${च}`;
                सारणीदत्तांशः[क][च].onchange = function() {
                    console.log("inside oninput");
                    if (सारणीदत्तांशः[क][च].innerText == '1' || सारणीदत्तांशः[क][च].innerText == '0' || सारणीदत्तांशः[क][च].innerText == 'x') {
                        द्वयायामीसरणी[क][च] = सारणीदत्तांशः[क][च].innerText;
                    } else {
                        सारणीदत्तांशः[क][च].innerText = द्वयायामीसरणी[क][च];
                    }
                };
                पङ्क्तिः[क].appendChild(सारणीदत्तांशः[क][च]);

            }
            सारणीमध्यभागः.appendChild(पङ्क्तिः[क]);
        }
        
    }
    पङ्क्तिः[सरणीदीर्घता] = document.createElement("tr");
    let अन्तिमसारणिदत्तांशः = document.createElement("td");
    पुटम् = document.createElement("button");
    पुटम्.classList.add("संयोगपुटम्");
    पुटम्.innerText = '+';
    पुटम्.id = "पङ्क्तियोगः";
    अन्तिमसारणिदत्तांशः.draggable = false;
    अन्तिमसारणिदत्तांशः.appendChild(पुटम्);
    पङ्क्तिः[सरणीदीर्घता].appendChild(अन्तिमसारणिदत्तांशः);
    सारणीमध्यभागः.appendChild(पङ्क्तिः[सरणीदीर्घता]);
    सारणीमुख्यभागः.innerHTML = प्रथमसारणीशीर्षम्.outerHTML + सारणीशीर्षम्.outerHTML +सारणीमध्यभागः.outerHTML;
    for (let क = 0; क < सरणीदीर्घता; क++) {
        for (let च = 0; च < सरणीविस्तारः; च++) {
            let अभिन्नता = `स्वरूपम्-${क}-${च}`;
            let अस्मिता = document.getElementById(अभिन्नता);
            document.getElementById(अभिन्नता).addEventListener("input", function(e) {

                if (क ==0) {
                    द्वयायामीसरणी[क][च] = अस्मिता.innerText;
                } else {
                    if (e.inputType === "deleteContentBackward" || e.inputType === "deleteContentForward") {
                        द्वयायामीसरणी[क][च] = '';
                        अस्मिता.innerText = द्वयायामीसरणी[क][च];
                    } else if (e.data === '1' || e.data === '0' || e.data === 'x') {
                        console.log(e);
                        द्वयायामीसरणी[क][च] = e.data;
                        अस्मिता.innerText = द्वयायामीसरणी[क][च];
                    } else {

                        अस्मिता.innerText = द्वयायामीसरणी[क][च];
                    }
                }
            });
        }
    }
    for (let च = 0; च < सरणीविस्तारः; च++) {
        let अभिन्नता = `स्तम्भनिर्मूलनपुटस्वरूपम्-${च}`;
        document.getElementById(अभिन्नता).addEventListener("click", function(e) {
            if (सरणीविस्तारः > 1) {
                let त= च;
                while (त < सरणीविस्तारः) {
                    for (let क = 0; क < सरणीदीर्घता; क++) {
                        द्वयायामीसरणी[क][त] =  द्वयायामीसरणी[क][त+1]; 
                    }
                    त = त+1;
                }
                सरणीविस्तारः = सरणीविस्तारः-1;
                पुनर्निर्माणम्(); 
            }

        });
    }
    for (let क = 0; क < सरणीदीर्घता; क++) {
        let अभिन्नता = `पङ्क्तिनिर्मूलनपुटम्-${क}`;
        document.getElementById(अभिन्नता).addEventListener("click", function(e) {
            if (सरणीदीर्घता>1) {
                let त= क;
                while (त < सरणीदीर्घता) {
                    for (let च = 0; च < सरणीविस्तारः; च++) {
                        द्वयायामीसरणी[त][च] =  द्वयायामीसरणी[त+1][च]; 
                    }
                    त = त+1;
                }
                सरणीदीर्घता = सरणीदीर्घता-1;
                पुनर्निर्माणम्(); 
            }

        });
    }        
    document.getElementById("स्तम्भसंयोगः").addEventListener("click", function(e) {
        सरणीविस्तारः = सरणीविस्तारः+1;
        पुनर्निर्माणम्(); 
    });
    document.getElementById("पङ्क्तियोगः").addEventListener("click", function(e) {
        सरणीदीर्घता = सरणीदीर्घता+1;
        पुनर्निर्माणम्(); 
    });
    let आकृष्टसूचकः = null;

    for (let च = 0; च < सरणीविस्तारः; च++) {
        let क = 0;
        let अभिन्नता = `स्वरूपम्-${क}-${च}`;
        let अस्मिता = document.getElementById(अभिन्नता);
        अस्मिता.ondragstart = () => {
            आकृष्टसूचकः = च;
            अस्मिता.style.opacity = "0.5";
            
        };
        अस्मिता.ondragend = () => {
            अस्मिता.style.opacity = "1";
        };
        अस्मिता.ondragover = (त) => त.preventDefault();
            अस्मिता.ondrop = (त) => {
            त.preventDefault();
            let लक्ष्यसूचकः = च;

            if (आकृष्टसूचकः !== लक्ष्यसूचकः) {
                // Swap values in the 2D array 'a'
                for (let र = 0; र < सरणीदीर्घता; र++) {
                    let अस्थायी = द्वयायामीसरणी[र][आकृष्टसूचकः];
                    द्वयायामीसरणी[र][आकृष्टसूचकः] = द्वयायामीसरणी[र][लक्ष्यसूचकः];
                    द्वयायामीसरणी[र][लक्ष्यसूचकः] = अस्थायी;
                }
                // Update the UI text to match the new array order
                पुनर्निर्माणम्();
            }
        };
    }
}

function सारणीरिक्तीकरणम्() {
    for (let च = 0; च <= सरणीदीर्घता; च++) {
        द्वयायामीसरणी[च] = new Array(सरणीविस्तारः).fill(''); 
    }
    पुनर्निर्माणम्();
}

window.onload = सरणीप्रारम्भीकरणम्;