

// =========================== Subsidiary functions ===============================

let colors = [
    "#DC143C", "#FF0000", "#C71585", "#FF1493", "#FF4500", "#FFA500", "#FFFF00", 
    "#EE82EE", "#FF00FF", "#BA55D3", "#9370DB", "#8A2BE2", "#9400D3", "#8B008B",
    "#4B0082", "#6A5ACD", "#483D8B", "#800000", "#00FF00", "#008000", "#00FFFF",
    "#008080", "#0000FF", "#000080", "#ADFF2F", "#32CD32", "#00FA9A", "#00FF7F", 
    "#3CB371", "#9ACD32", "#66CDAA", "#20B2AA", "#00FFFF", "#7FFFD4", "#00CED1", 
    "#4682B4", "#87CEEB", "#1E90FF", "#7B68EE", "#990033", "#66CC00", "#3399CC", 
    "#eff542", "#c7cc2b", "#ff7700", "#FF8C00", "#00BFFF", "#4B0082", "#7B68EE", 
    "#98FB98", "#33aa77", "#ff7799",
];

// Random colors ------------------------------------------------------
function randomColor () {

    // Return one random HEX color out of the array of colors
    let rand_index = Math.floor(Math.random() * colors.length);

    return [rand_index, colors[rand_index]];
}

// Convert HEX to RGB -----------------------------------------------
function convertHEX(c) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);

    rgb = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };

    rgb = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    
    return rgb;
}

// Return color and remove used color from colors[] ------------------------
function useColor (alpha = 1) {

    // Get color from colors[]
    let usedColor = randomColor ();

    // Delete from colors[]
    delete usedColor[0];

    // Return RGB if alpha = 1
    if (alpha === 1) {
        return `rgba(${convertHEX(usedColor[1])})`;
    } else if (alpha > 0 && alpha < 1) {
        return [`rgba(${convertHEX(usedColor[1])})`, `rgba(${convertHEX(usedColor[1])}, ${alpha})`];
    } else {
        alert ("Alpha channel may only take value from 0 to 1.");
    }
}

// =========================== Construct functions ===============================

// Find Jam with data attribute ---------------------------------------
function findJam (jamPointer) {

    let found = document.querySelector(`[data-jam = ${jamPointer}]`);

    return found;
}

// Create tapeWrap ----------------------------------------------------
function tapeWrap (jamElems) {

    // Create tapeWrap
    let tapeWrap = document.createElement("div");
    // Give it class tapeWrap
    tapeWrap.classList.add("tapeWrap");

    // Append jamElems to the tapeWrap
    for (let i = 0, length = jamElems.length; i < length; i++) {
        tapeWrap.append(jamElems[0]);
    }

    return tapeWrap;
}

// Create firstFloor ---------------------------------------------------
function firstFloor (jamPointer, tapeWrap) {

    // Create the first floor
    let firstFloor = document.createElement("div");
    // Give it class firstFloor
    firstFloor.classList.add("firstFloor");

    // Append tapeWrap to the firstFloor
    firstFloor.append(tapeWrap);

    // Append it to the Jam
    jamPointer.append(firstFloor);

    return firstFloor;
}

// Create secondFloor ---------------------------------------------------
function secondFloor (jamPointer) {

    // Create the second floor
    let secondFloor = document.createElement("div");
    // Give it class secondFloor
    secondFloor.classList.add("secondFloor");

    // Create arrows
    let leftArrow = document.createElement("a");
    leftArrow.classList.add("leftArrow");
    leftArrow.innerText = "<";

    let rightArrow = document.createElement("a");
    rightArrow.classList.add("rightArrow");
    rightArrow.innerText = ">";

    // Give them random color
    let leftRightCol = useColor(0.5);
    leftArrow.style.backgroundColor = leftRightCol[0];
    leftArrow.style.boxShadow = `3px 3px 3px ${leftRightCol[1]}`;
    
    rightArrow.style.backgroundColor = leftRightCol[0];
    rightArrow.style.boxShadow = `3px 3px 3px ${leftRightCol[1]}`;

    // Jam has the same color as arrows
    jamPointer.style.backgroundColor = leftRightCol[1];
    jamPointer.style.borderColor = leftRightCol[0];

    // Author too (also he loves cats)
    document.getElementById("name").style.color = leftRightCol[1];
    // document.getElementById("human").style.color = leftRightCol[1];

    let spans = document.querySelectorAll("div.docs span");

    for (let i = 0; i < spans.length; i++) {
        spans[i].style.color = leftRightCol[1];
        // spans[i].style.backgroundColor = leftRightCol[0];
    }

    // Append arrows to the secondFloor
    secondFloor.append(leftArrow, rightArrow);

    // Append secondFloor to the Jam
    jamPointer.append(secondFloor);

    return secondFloor;
}

// Create thirdFloor ---------------------------------------------------
function thirdFloor (jamPointer, jamElems) {

    // Create the third floor
    let thirdFloor = document.createElement("div");
    // Give it class thirdFloor
    thirdFloor.classList.add("thirdFloor");

    // Create dots
    let dots = [];

    for (let i = 0; i < jamElems.length; i++) {
        dots[i] = document.createElement("a");
        dots[i].classList.add("dot");

        // Give them random color
        let dotCol = useColor(0.5);

        dots[i].style.borderColor = dotCol[0];
        dots[i].style.backgroundColor = dotCol[0];
        dots[i].style.boxShadow = `3px 3px 3px ${dotCol[1]}`;

        // And their mentors
        jamElems[i].style.borderColor = dotCol[0];
        jamElems[i].style.backgroundColor = dotCol[1];
    }
    

    // Append dots to the thirdFloor
    for (let i = 0; i < dots.length; i++) {
        thirdFloor.append(dots[i]);
    }

    // Append thirdFloor to the Jam
    jamPointer.append(thirdFloor);
    
    return thirdFloor;

}

// ============================== Get New Properties ==============================

// Get elements widths -----------------------------------------------------
function elemsWidth (firstFloor, jamElems, width) {

    let elemsWidth = [];

    // Convert width from %
    if (width.indexOf("%") > 0) {
        // Convert % into px
        width = firstFloor.offsetWidth * (parseInt(width) / 100);
    }
    else  {
        // Convert string into px
        width = parseInt(width);
    }

    // Set elems width
    for (let i = 0; i < jamElems.length; i++) {
        jamElems[i].style.width = `${width}px`;
    };

    // Get elements offset width
    for (let i = 0; i < jamElems.length; i++) {
        elemsWidth.push(jamElems[i].offsetWidth);
    };

    return elemsWidth;
}

// Get elems height
function elemsHeight(jamElems, height) {
    // Convert string into px
    height = parseInt(height);

    // Set elems height
    for (let i = 0; i < jamElems.length; i++) {
        jamElems[i].style.height = `${height}px`;
    };
}

// Set tape transition
function tapeTrans(tapeWrap, transition) {
    tapeWrap.style.transition = `${transition}`;
}

// Get middle of the anyElement
function anyMiddle (element) {

    let middle = element.getBoundingClientRect()["x"] + element.getBoundingClientRect()["width"] / 2;

    return middle;
}

// ============================== Set Event Listeners ==============================

// Set event: click on element ---------------------------------------------
function setEvents (tapeWrap, jamElems, focus, elemsWidth, firstMiddle, secondFloor, thirdFloor) {

    // Set initial values ----------------------------------------------------
    let offset = firstMiddle - anyMiddle(jamElems[focus]);
    tapeWrap.style.transform = `translateX(${offset}px)`;

    secondFloor.children[0].classList.add("disabled");
    thirdFloor.children[focus].classList.add("active");

    // Set events: click on elements ---------------------------------------------
    for (let i = 0; i < jamElems.length; i++) {

        jamElems[i].addEventListener("click", function() {

            for (let a = 0; a < thirdFloor.children.length; a++) {
                thirdFloor.children[a].classList.remove("active");
                jamElems[a].classList.remove("active");
            }

            let oldFocus = focus;
            focus = i;

            // Bind with arrows
            secondFloor.children[0].classList.remove("disabled");
            secondFloor.children[1].classList.remove("disabled");
            
            if (focus <= 0) {
                focus = 0;
                secondFloor.children[0].classList.add("disabled");
            } else if (focus >= jamElems.length - 1) {
                focus = jamElems.length - 1;
                rightArrow.classList.add("disabled");
            } 

            // Calculate the difference
            if (focus > oldFocus) {
                offset -= elemsWidth[oldFocus] / 2;
                for (let currentFocus = oldFocus + 1; currentFocus < focus; currentFocus++) {
                    offset -= elemsWidth[currentFocus];
                }
                offset -= elemsWidth[focus] / 2;
            } 
            else if (focus < oldFocus) {
                offset += elemsWidth[oldFocus] / 2;
                for (let currentFocus = oldFocus - 1; currentFocus > focus; currentFocus--) {
                    offset += elemsWidth[currentFocus];
                }
                offset += elemsWidth[focus] / 2;
            }

            // Use the difference
            tapeWrap.style.transform = `translateX(${offset}px)`;

            thirdFloor.children[i].classList.add("active");
            jamElems[i].classList.add("active");

            return focus;

        });

    }

    // Set events: click on arrows --------------------------------------------
    let leftArrow = secondFloor.children[0], 
        rightArrow = secondFloor.children[1];

    leftArrow.addEventListener("click", function() {

        focus--;

        secondFloor.children[0].classList.remove("disabled");
        secondFloor.children[1].classList.remove("disabled");

        if (focus <= 0) {
            focus = 0;
            secondFloor.children[0].classList.add("disabled");
        }

        // Calculate the difference
        offset += elemsWidth[focus + 1] / 2 + elemsWidth[focus] / 2;

        // Use the difference
        tapeWrap.style.transform = `translateX(${offset}px)`;

        for (let a = 0; a < thirdFloor.children.length; a++) {
            thirdFloor.children[a].classList.remove("active");
            jamElems[a].classList.remove("active");
        }

        thirdFloor.children[focus].classList.add("active");
        jamElems[focus].classList.add("active");

        return focus, offset;
    });

    rightArrow.addEventListener("click", function() {

        focus++;

        leftArrow.classList.remove("disabled");
        rightArrow.classList.remove("disabled");

        if (focus >= jamElems.length - 1) {
            focus = jamElems.length - 1;
            rightArrow.classList.add("disabled");
        } 

        // Calculate the difference
        offset -= elemsWidth[focus - 1] / 2 + elemsWidth[focus] / 2;

        // Use the difference
        tapeWrap.style.transform = `translateX(${offset}px)`;

        for (let a = 0; a < thirdFloor.children.length; a++) {
            thirdFloor.children[a].classList.remove("active");
            jamElems[a].classList.remove("active");
        }

        thirdFloor.children[focus].classList.add("active");
        jamElems[focus].classList.add("active");

        return focus, offset;
    });

    // Set events: click on dots ---------------------------------------------
    for (let i = 0; i < jamElems.length; i++) {

        thirdFloor.children[i].addEventListener("click", function() {

            for (let a = 0; a < thirdFloor.children.length; a++) {
                thirdFloor.children[a].classList.remove("active");
                jamElems[a].classList.remove("active");
            }

            let oldFocus = focus;

            focus = i;

            // Bind with arrows
            secondFloor.children[0].classList.remove("disabled");
            secondFloor.children[1].classList.remove("disabled");
            
            if (focus <= 0) {
                focus = 0;
                secondFloor.children[0].classList.add("disabled");
            } else if (focus >= jamElems.length - 1) {
                focus = jamElems.length - 1;
                rightArrow.classList.add("disabled");
            } 

            // Calculate the difference
            if (focus > oldFocus) {
                offset -= elemsWidth[oldFocus] / 2;
                for (let currentFocus = oldFocus + 1; currentFocus < focus; currentFocus++) {
                    offset -= elemsWidth[currentFocus];
                }
                offset -= elemsWidth[focus] / 2;
            } 
            else if (focus < oldFocus) {
                offset += elemsWidth[oldFocus] / 2;
                for (let currentFocus = oldFocus - 1; currentFocus > focus; currentFocus--) {
                    offset += elemsWidth[currentFocus];
                }
                offset += elemsWidth[focus] / 2;
            }

            // Use the difference
            tapeWrap.style.transform = `translateX(${offset}px)`;

            thirdFloor.children[i].classList.add("active");
            jamElems[i].classList.add("active");

            return focus, offset;
        });

    }

}



// ============================== Class Jam ==============================

class Jam {

    constructor (props) {

        // Step 1. Set initial properties
        // -------------------------------------------------------
        this.jamPointer = props.data ? props.data : alert("Please, specify Jam's data attribute value.");
    
        this.width = props.width ? props.width : "20%";
        this.height = props.height ? props.height : "200px";
        this.transition = props.transition ? props.transition : "all 0.5s ease";
        this.focus = props.focus ? props.focus : 0;

        // Step 2. Set own properties. Construct Jam
        // -------------------------------------------------------

        // Get pointer to the Jam in the DOM
        this.jamPointer = findJam (this.jamPointer);
        // Get pointers to the Jam elements in the DOM
        this.jamElems = this.jamPointer.children;

        // Create tapeWrap and get the pointer to it
        this.tapeWrap = tapeWrap (this.jamElems) 
        // Create firstFloor and get pointer to it in the DOM
        this.firstFloor = firstFloor (this.jamPointer, this.tapeWrap);

        // Renew jamElems pointers after removing them into the firstFloor
        this.jamElems = this.jamPointer.children[0].children[0].children;

        // Create secondFloor
        this.secondFloor = secondFloor (this.jamPointer);

        // Create thirdFloor
        this.thirdFloor = thirdFloor (this.jamPointer, this.jamElems)
        
        // Step 3. Get new properties
        // ---------------------------------------------------------

        // Get elems widths
        this.elemsWidth = elemsWidth (this.firstFloor, this.jamElems, this.width);

        // Set elems height
        elemsHeight(this.jamElems, this.height);

        // Set tape transition
        tapeTrans(this.tapeWrap, this.transition);

        // Middle of the firstFloor
        this.firstMiddle = anyMiddle (this.firstFloor);

        // Step 4. Set event listeners
        // ---------------------------------------------------------
        setEvents (this.tapeWrap, this.jamElems, this.focus, this.elemsWidth, this.firstMiddle, this.secondFloor, this.thirdFloor);
    }

}

// ====================================================================