String.prototype.removeClass = function(...str) {
    /* Applied to a string of CSS classes, it accepts multiple classes as arguments and returns an array equal to the original, but without the given classes*/
    const arr = this.split(" ");
    let newArr = [];
    for(let i = 0; i < arr.length; i++) {
        let different = true;
        for(let j = 0; j < str.length; j++) {
            if(arr[i] == str[j]) {
                different = false;
            }
        }
        if(different) {
            newArr.push(arr[i]);
        }
    }
    return newArr.join(" ");
};

// Navigation bar

const guidesButton = document.getElementById("guides");

const guidesDiv = document.getElementById("guides-div");

function slide() {
    guidesDiv.className += " translate";
}

function slideBack() {
    guidesDiv.className = guidesDiv.className.removeClass("translate");
}

guidesDiv.addEventListener("mouseover", slide);
guidesButton.addEventListener("mouseover", slide);
guidesDiv.addEventListener("mouseout", slideBack);
guidesButton.addEventListener("mouseout", slideBack);

// Main

const selectEls = document.getElementsByTagName("select");
const inputEls = document.getElementsByTagName("input");

const sectionArr = [
    {}, // Do NOT remove
    {
        inputs: [selectEls[0], selectEls[1]],
        classes: ["columns-none", "columns-1fr-1fr", "columns-1fr-2fr-1fr", "columns-80px-1fr-2fr", "columns-auto-auto-auto", "columns-50percent-1fr-auto","columns-min-content-auto-max-content", "rows-none", "rows-1fr-1fr", "rows-1fr-2fr-1fr", "rows-80px-1fr-2fr", "rows-auto-auto-auto", "rows-50percent-1fr-auto"],
        div: document.getElementById("div1"),
        function: changeClass
    },
    {
        inputs: [selectEls[2], selectEls[3], selectEls[4], selectEls[5], selectEls[6], selectEls[7], selectEls[8], selectEls[9], selectEls[10], selectEls[11], selectEls[12], selectEls[13], selectEls[14]],
        advancedInputs: [[selectEls[2], selectEls[3], selectEls[4]], [selectEls[5], selectEls[6], selectEls[7]], [selectEls[8], selectEls[9], selectEls[10]]],
        normalInputs: [selectEls[11], selectEls[12], selectEls[13], selectEls[14]],
        advancedProperty: "gridTemplateAreas",
        property: "gridArea",
        advancedDiv: document.getElementById("div2"),
        divs: document.getElementsByClassName("dynamic-item0"),
        function: changeAdvancedStyle
    },
    {
        inputs: [selectEls[15], selectEls[16], selectEls[17], selectEls[18], selectEls[19], selectEls[20], selectEls[21], selectEls[22], selectEls[23], selectEls[24], selectEls[25], selectEls[26], inputEls[0], inputEls[1], inputEls[2]],
        advancedInputs: [[selectEls[15], selectEls[16], selectEls[17], selectEls[18]], [selectEls[19], selectEls[20], selectEls[21], selectEls[22]], [selectEls[23], selectEls[24], selectEls[25], selectEls[26]]],
        normalInputs: [inputEls[0], inputEls[1], inputEls[2]],
        advancedProperty: "grid-area",
        advancedDivs: document.getElementsByClassName("dynamic-item1"),
        function: changeAdvancedStyle
    }
];

function changeClass(section) {
    // Depending on the given section number, removes certain classes from the container div in that section and adds new ones based on the selector values in the code div.
    return function() {
        const currentDiv = sectionArr[section].div
        const currentClasses = sectionArr[section].classes
        const currentInputs =sectionArr[section].inputs
        currentDiv.className = currentDiv.className.removeClass(...currentClasses);
        for(let i = 0; i < currentInputs.length; i++) {
            currentDiv.className += ` ${currentInputs[i].value}`;
        }
    }
}

function changeAdvancedStyle(section) {
    return function() {
        const currentAdvancedDiv = sectionArr[section].advancedDiv;
        const currentDivs = sectionArr[section].divs;
        const currentAdvancedProperty = sectionArr[section].advancedProperty;
        const currentProperty = sectionArr[section].property;
        const currentAdvancedInputs = sectionArr[section].advancedInputs;
        const currentNormalInputs = sectionArr[section].normalInputs;
        const Arr = [];

        for(let i = 0; i < currentAdvancedInputs.length; i++) {
            let newArr = [];
            for(let j = 0; j < currentAdvancedInputs[i].length; j++) {
                newArr.push(currentAdvancedInputs[i][j].value);
            }
            let Str = newArr.join(" ")
            Arr.push(Str);
        }
        const newStr = `"${Arr.join(`" "`)}"`;
        console.log(newStr);
        currentAdvancedDiv.style[currentAdvancedProperty] = newStr;

        for(let i = 0; i < currentDivs.length; i++) {
            currentDivs[i].style[currentProperty] = currentNormalInputs[i].value;
        }
    }
}

for(let i = 1; i < sectionArr.length; i++) {
    for(let j = 0; j < sectionArr[i].inputs.length; j++) {
        sectionArr[i].inputs[j].addEventListener("change", sectionArr[i].function(i));
    }
}