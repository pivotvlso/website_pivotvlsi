// --- Environment Polyfill (For Node.js / Linters / Automated Testing) ---
if (typeof window === 'undefined') {
    global.window = global;
}
if (typeof document === 'undefined') {
    global.document = {
        addEventListener: function () { },
        getElementById: function () { return null; }
    };
}

// Function to draw the wire icon on the toolbar canvas