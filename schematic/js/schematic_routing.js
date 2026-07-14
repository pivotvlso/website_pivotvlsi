// --- Mode State Management ---
function द्वारसीमापेटीअन्तःअस्ति(विश्व_क, विश्व_त) {
    if (!window.स्थापितानिद्वाराणि) return false;
    for (let द्वार of window.स्थापितानिद्वाराणि) {
        let कोणः = -द्वार.कोणः * Math.PI / 180;
        let ज्या = Math.sin(कोणः);
        let कोज्या = Math.cos(कोणः);
        let भेद_क = विश्व_क - द्वार.क;
        let भेद_त = विश्व_त - द्वार.त;
        let स्थानीय_क = भेद_क * कोज्या - भेद_त * ज्या;
        let स्थानीय_त = भेद_क * ज्या + भेद_त * कोज्या;
        // Bounding box with 15px padding
        if (स्थानीय_क > -35 && स्थानीय_क < 45 && स्थानीय_त > -35 && स्थानीय_त < 35) {
            return true;
        }
    }
    return false;
}

function द्वारस्यतन्तून्अद्यतनीकरणम्(द्वार, oldAngle, oldFlip, newAngle, newFlip) {
    if (!window.स्थापितास्तन्तवः) return;

    function getPoints(angle, flip) {
        let forward_angle = (angle || 0) * Math.PI / 180;
        let fs = Math.sin(forward_angle);
        let fc = Math.cos(forward_angle);
        let flipFactor = flip ? -1 : 1;
        let pts = [
            { x: -20, y: -10 * flipFactor, stub_x: -40, stub_y: -10 * flipFactor },
            { x: -20, y: 10 * flipFactor, stub_x: -40, stub_y: 10 * flipFactor },
            { x: 30, y: 0, stub_x: 50, stub_y: 0 }
        ];
        let res = { pins: [], stubs: [] };
        for (let p of pts) {
            res.pins.push({
                क: Math.round(द्वार.क + p.x * fc - p.y * fs),
                त: Math.round(द्वार.त + p.x * fs + p.y * fc)
            });
            res.stubs.push({
                क: Math.round(द्वार.क + p.stub_x * fc - p.stub_y * fs),
                त: Math.round(द्वार.त + p.stub_x * fs + p.stub_y * fc)
            });
        }
        return res;
    }

    let oldPts = getPoints(oldAngle, oldFlip);
    let newPts = getPoints(newAngle, newFlip);

    let pointOnAnyWire = function (x, y) {
        for (let तन्तु of window.स्थापितास्तन्तवः) {
            let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
            let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;
            if (त1 === त2 && y === त1 && x >= Math.min(क1, क2) && x <= Math.max(क1, क2)) return true;
            if (क1 === क2 && x === क1 && y >= Math.min(त1, त2) && y <= Math.max(त1, त2)) return true;
        }
        return false;
    };

    let overlapsCollinear = function (x1, y1, x2, y2) {
        for (let तन्तु of window.स्थापितास्तन्तवः) {
            let क1 = तन्तु.प्रारम्भः.क, त1 = तन्तु.प्रारम्भः.त;
            let क2 = तन्तु.अन्तम्.क, त2 = तन्तु.अन्तम्.त;
            if (y1 === y2 && त1 === त2 && y1 === त1) {
                if (Math.max(x1, x2) > Math.min(क1, क2) && Math.min(x1, x2) < Math.max(क1, क2)) return true;
            }
            if (x1 === x2 && क1 === क2 && x1 === क1) {
                if (Math.max(y1, y2) > Math.min(त1, त2) && Math.min(y1, y2) < Math.max(त1, त2)) return true;
            }
        }
        return false;
    };

    let isOtherPin = function (x, y, targetX, targetY) {
        if (x === targetX && y === targetY) return false;
        if (!window.स्थापितानिद्वाराणि) return false;
        for (let द्वार of window.स्थापितानिद्वाराणि) {
            let flipFactor = द्वार.लम्बप्रतिबिम्बः ? -1 : 1;
            let कीलाः = [{ x: -20, y: -10 * flipFactor, stub_x: -40, stub_y: -10 * flipFactor },
            { x: -20, y: 10 * flipFactor, stub_x: -40, stub_y: 10 * flipFactor },
            { x: 30, y: 0, stub_x: 50, stub_y: 0 }];
            let अग्रकोणः = (द्वार.कोणः || 0) * Math.PI / 180;
            let अग्रज्या = Math.sin(अग्रकोणः);
            let अग्रकोज्या = Math.cos(अग्रकोणः);

            for (let की of कीलाः) {
                let pin_क = Math.round(द्वार.क + की.x * अग्रकोज्या - की.y * अग्रज्या);
                let pin_त = Math.round(द्वार.त + की.x * अग्रज्या + की.y * अग्रकोज्या);
                let stub_क = Math.round(द्वार.क + की.stub_x * अग्रकोज्या - की.stub_y * अग्रज्या);
                let stub_त = Math.round(द्वार.त + की.stub_x * अग्रज्या + की.stub_y * अग्रकोज्या);

                // If it is on the segment between pin and stub, it's a blocked zone for other wires!
                let min_क = Math.min(pin_क, stub_क);
                let max_क = Math.max(pin_क, stub_क);
                let min_त = Math.min(pin_त, stub_त);
                let max_त = Math.max(pin_त, stub_त);
                if (x >= min_क && x <= max_क && y >= min_त && y <= max_त) {
                    if (min_त === max_त && y === min_त) return true;
                    if (min_क === max_क && x === min_क) return true;
                }
            }
        }
        return false;
    };

    class MinHeap {
        constructor() { this.data = []; }
        push(val) {
            this.data.push(val);
            this.bubbleUp(this.data.length - 1);
        }
        pop() {
            if (this.data.length === 1) return this.data.pop();
            const top = this.data[0];
            this.data[0] = this.data.pop();
            this.sinkDown(0);
            return top;
        }
        bubbleUp(i) {
            while (i > 0) {
                let p = Math.floor((i - 1) / 2);
                if (this.data[p].f <= this.data[i].f) break;
                [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
                i = p;
            }
        }
        sinkDown(i) {
            const len = this.data.length;
            while (true) {
                let left = 2 * i + 1, right = 2 * i + 2, min = i;
                if (left < len && this.data[left].f < this.data[min].f) min = left;
                if (right < len && this.data[right].f < this.data[min].f) min = right;
                if (min === i) break;
                [this.data[i], this.data[min]] = [this.data[min], this.data[i]];
                i = min;
            }
        }
        get length() { return this.data.length; }
    }

    let findOrthogonalPathAStar = function (startX, startY, targetX, targetY) {
        let openSet = new MinHeap();
        openSet.push({ x: startX, y: startY, dir: null, g: 0, f: Math.abs(startX - targetX) + Math.abs(startY - targetY), h: Math.abs(startX - targetX) + Math.abs(startY - targetY), parent: null });
        let closedSet = new Set();
        let gScore = new Map();

        gScore.set(`${startX},${startY},null`, 0);
        let iters = 0;
        while (openSet.length > 0 && iters < 100000) {
            iters++;
            let current = openSet.pop();

            let currentKey = `${current.x},${current.y},${current.dir}`;
            if (closedSet.has(currentKey)) continue;
            closedSet.add(currentKey);

            if (current.x === targetX && current.y === targetY) {
                let path = [];
                let curr = current;
                while (curr) { path.push({ क: curr.x, त: curr.y }); curr = curr.parent; }
                return path.reverse();
            }

            let neighbors = [
                { x: current.x + 10, y: current.y, dir: 'H' },
                { x: current.x - 10, y: current.y, dir: 'H' },
                { x: current.x, y: current.y + 10, dir: 'V' },
                { x: current.x, y: current.y - 10, dir: 'V' }
            ];

            for (let n of neighbors) {
                if (तन्तुखण्डःकुत्रापिसीमापेटीअन्तःअस्ति({ प्रारम्भः: { क: current.x, त: current.y }, अन्तम्: { क: n.x, त: n.y } }, targetX, targetY)) continue;
                if (overlapsCollinear(current.x, current.y, n.x, n.y)) continue;

                let onWire = pointOnAnyWire(n.x, n.y);
                let targetMatch = (n.x === targetX && n.y === targetY);
                let pinPenalty = isOtherPin(n.x, n.y, targetX, targetY) ? 5000 : 0;

                let anchorPenalty = 0;
                if (typeof routingTasks !== 'undefined') {
                    for (let task of routingTasks) {
                        if (n.x === task.anchor.क && n.y === task.anchor.त && !(n.x === startX && n.y === startY) && !(n.x === targetX && n.y === targetY)) {
                            anchorPenalty = 5000;
                            break;
                        }
                    }
                }

                let moveCost = 10;
                let bendCost = (current.dir && current.dir !== n.dir) ? 100 : 0;
                let crossingPenalty = (onWire && !targetMatch) ? 10000 : 0;

                let tentative_g = current.g + moveCost + bendCost + crossingPenalty + pinPenalty + anchorPenalty;

                let nKey = `${n.x},${n.y},${n.dir}`;
                if (gScore.has(nKey) && tentative_g >= gScore.get(nKey)) continue;

                gScore.set(nKey, tentative_g);
                let h = Math.abs(n.x - targetX) + Math.abs(n.y - targetY);
                openSet.push({ x: n.x, y: n.y, dir: n.dir, g: tentative_g, f: tentative_g + h, h: h, parent: current });
            }
        }
        return null;
    };

    let wiresToDelete = new Set();
    let routingTasks = [];
    let newStubWires = [];

    for (let i = 0; i < 3; i++) {
        let oldP = oldPts.pins[i];
        let newP = newPts.pins[i];
        let oldS = oldPts.stubs[i];
        let newS = newPts.stubs[i];

        // Unconditionally recreate the fixed wire between the new pin and the new stub
        newStubWires.push({
            प्रारम्भः: { क: newP.क, त: newP.त },
            अन्तम्: { क: newS.क, त: newS.त }
        });

        let outerAnchors = [];

        for (let wire of window.स्थापितास्तन्तवः) {
            if (wiresToDelete.has(wire)) continue;

            // Delete the old pin-to-stub wire unconditionally
            let isOldStubWire = (Math.abs(wire.प्रारम्भः.क - oldP.क) <= 1 && Math.abs(wire.प्रारम्भः.त - oldP.त) <= 1 && Math.abs(wire.अन्तम्.क - oldS.क) <= 1 && Math.abs(wire.अन्तम्.त - oldS.त) <= 1) ||
                (Math.abs(wire.अन्तम्.क - oldP.क) <= 1 && Math.abs(wire.अन्तम्.त - oldP.त) <= 1 && Math.abs(wire.प्रारम्भः.क - oldS.क) <= 1 && Math.abs(wire.प्रारम्भः.त - oldS.त) <= 1);
            if (isOldStubWire) {
                wiresToDelete.add(wire);
                continue;
            }

            let mP = (Math.abs(wire.प्रारम्भः.क - oldP.क) <= 1 && Math.abs(wire.प्रारम्भः.त - oldP.त) <= 1) ? 'प्रारम्भः' : (Math.abs(wire.अन्तम्.क - oldP.क) <= 1 && Math.abs(wire.अन्तम्.त - oldP.त) <= 1) ? 'अन्तम्' : null;
            let mS = (Math.abs(wire.प्रारम्भः.क - oldS.क) <= 1 && Math.abs(wire.प्रारम्भः.त - oldS.त) <= 1) ? 'प्रारम्भः' : (Math.abs(wire.अन्तम्.क - oldS.क) <= 1 && Math.abs(wire.अन्तम्.त - oldS.त) <= 1) ? 'अन्तम्' : null;

            if (mP || mS) {
                let currentPoint = wire[mP === 'प्रारम्भः' ? 'अन्तम्' : mP === 'अन्तम्' ? 'प्रारम्भः' : mS === 'प्रारम्भः' ? 'अन्तम्' : 'प्रारम्भः'];
                wiresToDelete.add(wire);

                let anchorFound = false;
                while (!anchorFound) {
                    let touchingWires = [];
                    for (let w of window.स्थापितास्तन्तवः) {
                        if (wiresToDelete.has(w)) continue;
                        let sM = (Math.abs(w.प्रारम्भः.क - currentPoint.क) <= 1 && Math.abs(w.प्रारम्भः.त - currentPoint.त) <= 1);
                        let eM = (Math.abs(w.अन्तम्.क - currentPoint.क) <= 1 && Math.abs(w.अन्तम्.त - currentPoint.त) <= 1);
                        if (sM || eM) {
                            touchingWires.push({ wire: w, match: sM ? 'प्रारम्भः' : 'अन्तम्' });
                        }
                    }

                    if (touchingWires.length === 1) {
                        wiresToDelete.add(touchingWires[0].wire);
                        currentPoint = touchingWires[0].wire[touchingWires[0].match === 'प्रारम्भः' ? 'अन्तम्' : 'प्रारम्भः'];
                    } else {
                        anchorFound = true;
                    }
                }

                outerAnchors.push(currentPoint);
            }
        }

        // Remove duplicate anchors (in case both pin and stub traced back to the same anchor)
        let uniqueAnchors = [];
        for (let a of outerAnchors) {
            if (!uniqueAnchors.find(u => Math.abs(u.क - a.क) <= 1 && Math.abs(u.त - a.त) <= 1)) {
                uniqueAnchors.push(a);
            }
        }

        for (let anchor of uniqueAnchors) {
            routingTasks.push({
                anchor: anchor,
                target: newS // ALWAYS route to the new STUB! The Pin is already connected via newStubWires.
            });
        }
    }

    window.स्थापितास्तन्तवः = window.स्थापितास्तन्तवः.filter(w => !wiresToDelete.has(w));
    for (let w of newStubWires) {
        window.स्थापितास्तन्तवः.push(w);
    }

    for (let task of routingTasks) {
        let pathCorners = findOrthogonalPathAStar(task.anchor.क, task.anchor.त, task.target.क, task.target.त);
        if (pathCorners && pathCorners.length >= 2) {
            let simplified = [pathCorners[0]];
            let lastDir = null;
            for (let j = 1; j < pathCorners.length; j++) {
                let dir = (pathCorners[j].क !== pathCorners[j - 1].क) ? 'H' : 'V';
                if (dir !== lastDir && lastDir !== null) simplified.push(pathCorners[j - 1]);
                lastDir = dir;
            }
            simplified.push(pathCorners[pathCorners.length - 1]);

            for (let k = 0; k < simplified.length - 1; k++) {
                window.स्थापितास्तन्तवः.push({
                    प्रारम्भः: { क: simplified[k].क, त: simplified[k].त },
                    अन्तम्: { क: simplified[k + 1].क, त: simplified[k + 1].त }
                });
            }
        } else {
            window.स्थापितास्तन्तवः.push({
                प्रारम्भः: { क: task.anchor.क, त: task.anchor.त },
                अन्तम्: { क: task.anchor.क, त: task.target.त }
            });
            window.स्थापितास्तन्तवः.push({
                प्रारम्भः: { क: task.anchor.क, त: task.target.त },
                अन्तम्: { क: task.target.क, त: task.target.त }
            });
        }
    }
}

function तन्तुखण्डःकुत्रापिसीमापेटीअन्तःअस्ति(segment, targetX, targetY) {
    if (!window.स्थापितानिद्वाराणि) return false;
    let न्यूनतम_क = Math.min(segment.प्रारम्भः.क, segment.अन्तम्.क);
    let अधिकतम_क = Math.max(segment.प्रारम्भः.क, segment.अन्तम्.क);
    let न्यूनतम_त = Math.min(segment.प्रारम्भः.त, segment.अन्तम्.त);
    let अधिकतम_त = Math.max(segment.प्रारम्भः.त, segment.अन्तम्.त);

    // Sample points along the segment every 5px
    for (let क = न्यूनतम_क; क <= अधिकतम_क; क += 5) {
        for (let त = न्यूनतम_त; त <= अधिकतम_त; त += 5) {
            if (द्वारसीमापेटीअन्तःअस्ति(क, त)) {
                // If the point is inside, check if it belongs to a valid stub
                let वैधकीलस्थानम्अस्ति = false;
                for (let द्वार of window.स्थापितानिद्वाराणि) {
                    let flipFactor = द्वार.लम्बप्रतिबिम्बः ? -1 : 1;
                    let कीलाः = [{ x: -20, y: -10 * flipFactor, stub_x: -40, stub_y: -10 * flipFactor },
                    { x: -20, y: 10 * flipFactor, stub_x: -40, stub_y: 10 * flipFactor },
                    { x: 30, y: 0, stub_x: 50, stub_y: 0 }];
                    let अग्रकोणः = (द्वार.कोणः || 0) * Math.PI / 180;
                    let अग्रज्या = Math.sin(अग्रकोणः);
                    let अग्रकोज्या = Math.cos(अग्रकोणः);

                    for (let की of कीलाः) {
                        let pin_क = Math.round(द्वार.क + की.x * अग्रकोज्या - की.y * अग्रज्या);
                        let pin_त = Math.round(द्वार.त + की.x * अग्रज्या + की.y * अग्रकोज्या);
                        let stub_क = Math.round(द्वार.क + की.stub_x * अग्रकोज्या - की.stub_y * अग्रज्या);
                        let stub_त = Math.round(द्वार.त + की.stub_x * अग्रज्या + की.stub_y * अग्रकोज्या);

                        // Check if (क,त) lies on the segment between pin and stub
                        let कील_न्यूनतम_क = Math.min(pin_क, stub_क);
                        let कील_अधिकतम_क = Math.max(pin_क, stub_क);
                        let कील_न्यूनतम_त = Math.min(pin_त, stub_त);
                        let कील_अधिकतम_त = Math.max(pin_त, stub_त);

                        // Exclude the stub zone ONLY if it is the target!
                        if (targetX !== undefined && targetY !== undefined) {
                            if (stub_क === targetX && stub_त === targetY) {
                                if (क >= कील_न्यूनतम_क && क <= कील_अधिकतम_क && त >= कील_न्यूनतम_त && त <= कील_अधिकतम_त) {
                                    if (कील_न्यूनतम_त === कील_अधिकतम_त && त === कील_न्यूनतम_त) वैधकीलस्थानम्अस्ति = true;
                                    if (कील_न्यूनतम_क === कील_अधिकतम_क && क === कील_न्यूनतम_क) वैधकीलस्थानम्अस्ति = true;
                                }
                            }
                        } else {
                            if (क >= कील_न्यूनतम_क && क <= कील_अधिकतम_क && त >= कील_न्यूनतम_त && त <= कील_अधिकतम_त) {
                                if (कील_न्यूनतम_त === कील_अधिकतम_त && त === कील_न्यूनतम_त) वैधकीलस्थानम्अस्ति = true;
                                if (कील_न्यूनतम_क === कील_अधिकतम_क && क === कील_न्यूनतम_क) वैधकीलस्थानम्अस्ति = true;
                            }
                        }
                    }
                }

                if (!वैधकीलस्थानम्अस्ति) {
                    return true;
                }
            }
            if (न्यूनतम_त === अधिकतम_त) break; // horizontal
        }
        if (न्यूनतम_क === अधिकतम_क) break; // vertical
    }
    return false;
}

function द्वारकीलतन्तुप्राप्ति(विश्व_क, विश्व_त) {
    if (!window.स्थापितानिद्वाराणि) return false;
    for (let द्वार of window.स्थापितानिद्वाराणि) {
        let कीलाः = window.getGatePins(द्वार.प्रकारः || 'and', true);
        let कोणः = -द्वार.कोणः * Math.PI / 180;
        let ज्या = Math.sin(कोणः);
        let कोज्या = Math.cos(कोणः);
        let भेद_क = विश्व_क - द्वार.क;
        let भेद_त = विश्व_त - द्वार.त;
        let स्थानीय_क = भेद_क * कोज्या - भेद_त * ज्या;
        let स्थानीय_त = भेद_क * ज्या + भेद_त * कोज्या;

        for (let की of कीलाः) {
            if (Math.hypot(स्थानीय_क - की.x, स्थानीय_त - की.y) < 1) {
                // Pin matched, calculate world coordinates of the stub
                let अग्रकोणः = द्वार.कोणः * Math.PI / 180;
                let अग्रज्या = Math.sin(अग्रकोणः);
                let अग्रकोज्या = Math.cos(अग्रकोणः);
                let कील_विश्व_क = Math.round(द्वार.क + की.stub_x * अग्रकोज्या - की.stub_y * अग्रज्या);
                let कील_विश्व_त = Math.round(द्वार.त + की.stub_x * अग्रज्या + की.stub_y * अग्रकोज्या);
                return { क: कील_विश्व_क, त: कील_विश्व_त };
            }
        }
    }
    return null;
}
function द्वारकीलकःतथाव्याप्तः(क, त) {
    if (!window.स्थापितानिद्वाराणि || !window.स्थापितास्तन्तवः) return false;
    for (let द्वार of window.स्थापितानिद्वाराणि) {
        let कीलाः = window.getGatePins(द्वार.प्रकारः || 'and');
        let कोणः = -द्वार.कोणः * Math.PI / 180;
        let ज्या = Math.sin(कोणः);
        let कोज्या = Math.cos(कोणः);
        let भेद_क = क - द्वार.क;
        let भेद_त = त - द्वार.त;
        let स्थानीय_क = भेद_क * कोज्या - भेद_त * ज्या;
        let स्थानीय_त = भेद_क * ज्या + भेद_त * कोज्या;
        for (let की of कीलाः) {
            if (Math.hypot(स्थानीय_क - की.x, स्थानीय_त - की.y) < 1) {
                let सङ्ख्या = 0;
                if (window.स्थापितास्तन्तवः) {
                    for (let तन्तु of window.स्थापितास्तन्तवः) {
                        if (Math.abs(तन्तु.प्रारम्भः.क - क) < 1 && Math.abs(तन्तु.प्रारम्भः.त - त) < 1) सङ्ख्या++;
                        else if (Math.abs(तन्तु.अन्तम्.क - क) < 1 && Math.abs(तन्तु.अन्तम्.त - त) < 1) सङ्ख्या++;
                    }
                }
                if (सङ्ख्या > 0) return true;

                if (window.अस्थायीतन्तवः && window.अस्थायीतन्तवः.length > 0) {
                    let firstSegment = window.अस्थायीतन्तवः[0];
                    if (Math.abs(firstSegment.प्रारम्भः.क - क) < 1 && Math.abs(firstSegment.प्रारम्भः.त - त) < 1) {
                        return true; // Reject loopbacks
                    }
                }
                return false;
            }
        }
    }
    return false;
}

window.सामान्यस्थित्यागमनम् = function () {
    window.सक्रियतन्तुस्थापनम् = false;
    window.सक्रियकीलकस्थापनम् = false;
    window.मार्जन_प्रकारः = false;
    window.प्रतिकृति_प्रकारः = false;
    window.सक्रियद्वारस्थापनम् = false;
    window.विस्तार_प्रकारः = false;
    window.संकोच_प्रकारः = false;
    window.अस्थायीतन्तवः = [];
    window.प्रतिकृति_अस्थायीतन्तवः = [];
    window.प्रतिकृति_अस्थायीकीलाः = [];
    window.प्रतिकृति_अस्थायीद्वाराणि = [];
    window.तन्तु_मूल_बिन्दुः = null;
    window.समीपस्थबिन्दुः = null;
    window.आकृष्यमाणतन्तुः = null;
    window.कर्षण_मूल_अवस्था = null;
    document.body.classList.remove('तन्तु-प्रकारः');
    const पटः = document.getElementById('तर्कद्वारपटः');
    if (पटः) पटः.style.cursor = '';
    const कीलकसंवादपृष्ठभूमिः = document.getElementById('कीलकसंवादपृष्ठभूमिः');
    if (कीलकसंवादपृष्ठभूमिः) कीलकसंवादपृष्ठभूमिः.classList.add('गुप्तम्');
    const द्वारसंवादपृष्ठभूमिः = document.getElementById('द्वारसंवादपृष्ठभूमिः');
    if (द्वारसंवादपृष्ठभूमिः) द्वारसंवादपृष्ठभूमिः.classList.add('गुप्तम्');
    if (window.द्वाररेखनम्) window.द्वाररेखनम्();
};
