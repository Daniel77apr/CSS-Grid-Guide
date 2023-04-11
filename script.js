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
        complex: {
            complexInputs: [[selectEls[2], selectEls[3], selectEls[4]], [selectEls[5], selectEls[6], selectEls[7]], [selectEls[8], selectEls[9], selectEls[10]]],
            complexProperty: "gridTemplateAreas",
            complexDiv: document.getElementById("div2")
        },
        simple: {
            simpleInputs: [selectEls[11], selectEls[12], selectEls[13], selectEls[14]],
            simpleProperty: "gridArea",
            simpleDivs: document.getElementsByClassName("dynamic-item0")
        },
        function: changeComplexStyle
    },
    {
        inputs: [selectEls[15], selectEls[16], selectEls[17], selectEls[18], selectEls[19], selectEls[20], selectEls[21], selectEls[22], selectEls[23], selectEls[24], selectEls[25], selectEls[26], inputEls[0], inputEls[1], inputEls[2]],
        complex: {
            complexInputs: [[selectEls[15], selectEls[16], selectEls[17], selectEls[18]], [selectEls[19], selectEls[20], selectEls[21], selectEls[22]], [selectEls[23], selectEls[24], selectEls[25], selectEls[26]]],
            simpleInputs: [inputEls[0], inputEls[1], inputEls[2]],
            complexProperty: "gridArea",
            simpleProperty: "zIndex",
            complexDivs: document.getElementsByClassName("dynamic-item1")
        },
        function: changeComplexStyle
    },
    {
        inputs: [selectEls[27], selectEls[28], selectEls[29], selectEls[30], selectEls[31], selectEls[32], selectEls[33], selectEls[34], selectEls[35], selectEls[36], selectEls[37], selectEls[38], inputEls[3], inputEls[4], inputEls[5]],
        complex: {
            complexInputs: [[[selectEls[27], selectEls[28]], [selectEls[29], selectEls[30]]], [[selectEls[31], selectEls[32]], [selectEls[33], selectEls[34]]], [[selectEls[35], selectEls[36]], [selectEls[37], selectEls[38]]]],
            simpleInputs: [inputEls[3], inputEls[4], inputEls[5]],
            complexProperty: "gridColumn",
            complexProperty2: "gridRow",
            simpleProperty: "zIndex",
            complexDivs: document.getElementsByClassName("dynamic-item2")
        },
        function: changeComplexStyle
    },
    {
        inputs: [selectEls[39]],
        classes: ["no-gap", "small-gap", "small-big-gap", "big-small-gap"],
        div: document.getElementById("div5"),
        function: changeClass
    },
    {
        inputs: [selectEls[40]],
        classes: ["justify-content-stretch", "justify-content-start", "justify-content-center", "justify-content-end","justify-content-space-around",  "justify-content-space-between", "justify-content-space-evenly"],
        div: document.getElementById("div6"),
        function: changeClass
    },
    {
        inputs: [selectEls[41]],
        classes: ["align-content-stretch", "align-content-start", "align-content-center", "align-content-end","align-content-space-around",  "align-content-space-between", "align-content-space-evenly"],
        div: document.getElementById("div7"),
        function: changeClass
    },
    {
        inputs: [selectEls[42]],
        classes: ["justify-items-stretch", "justify-items-start", "justify-items-center", "justify-items-end"],
        div: document.getElementById("div8"),
        function: changeClass
    },
    {
        inputs: [selectEls[43]],
        classes: ["align-items-stretch", "align-items-start", "align-items-center", "align-items-end"],
        div: document.getElementById("div9"),
        function: changeClass
    },
    {
        inputs: [selectEls[44]],
        classes: ["justify-self-stretch", "justify-self-start", "justify-self-center", "justify-self-end"],
        div: document.getElementById("div10"),
        function: changeClass
    },
    {
        inputs: [selectEls[45]],
        classes: ["align-self-stretch", "align-self-start", "align-self-center", "align-self-end"],
        div: document.getElementById("div11"),
        function: changeClass
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

function changeComplexStyle(section) {
    return function() {
        // Complex
        const complexObj = sectionArr[section].complex;

        switch(complexObj.complexProperty) {
            case "gridTemplateAreas":
                const Arr = [];
                for(let i = 0; i < complexObj.complexInputs.length; i++) {
                    let newArr = [];
                    for(let j = 0; j < complexObj.complexInputs[i].length; j++) {
                        newArr.push(complexObj.complexInputs[i][j].value);
                    }
                    let Str = newArr.join(" ")
                    Arr.push(Str);
                }
                const newStr = `"${Arr.join(`" "`)}"`;
                complexObj.complexDiv.style[complexObj.complexProperty] = newStr;
                break;
            case "gridArea":
                for(let i = 0; i < complexObj.complexDivs.length; i++) {
                    const Arr = [];
                    for(let j = 0; j < complexObj.complexInputs[i].length; j++) {
                        Arr.push(complexObj.complexInputs[i][j].value);
                    }
                    const newStr = Arr.join(" / ");
                    complexObj.complexDivs[i].style[complexObj.complexProperty] = newStr;
                    complexObj.complexDivs[i].style[complexObj.simpleProperty] = complexObj.simpleInputs[i].value;
                }
                break;
            case "gridColumn":
                for (let i = 0; i < complexObj.complexDivs.length; i++) {
                    const columnArr = [];
                    const rowArr = [];
                    for(let j = 0; j < complexObj.complexInputs[i].length; j++) {
                        if(j < 1) {
                           columnArr.push(complexObj.complexInputs[i][j][0].value);
                           columnArr.push(complexObj.complexInputs[i][j][1].value);
                        } else {
                            rowArr.push(complexObj.complexInputs[i][j][0].value);
                            rowArr.push(complexObj.complexInputs[i][j][1].value);
                        }
                    }
                    let separator = "";
                    if(i < 2) {
                        separator = " / ";
                    } else {
                        separator = " / span ";
                    }
                    const columnStr = columnArr.join(`${separator}`);
                    const rowStr = rowArr.join(`${separator}`);
                    complexObj.complexDivs[i].style[complexObj.complexProperty] = columnStr;
                    complexObj.complexDivs[i].style[complexObj.complexProperty2] = rowStr;
                    complexObj.complexDivs[i].style[complexObj.simpleProperty] = complexObj.simpleInputs[i].value;
                }
        }

        // Simple
        if(!!sectionArr[section].simple) {
            const simpleObj = sectionArr[section].simple;
            for(let i = 0; i < simpleObj.simpleDivs.length; i++) {
                simpleObj.simpleDivs[i].style[simpleObj.simpleProperty] = simpleObj.simpleInputs[i].value;
            }
        }
    }
}

for(let i = 1; i < sectionArr.length; i++) {
    for(let j = 0; j < sectionArr[i].inputs.length; j++) {
        sectionArr[i].inputs[j].addEventListener("change", sectionArr[i].function(i));
    }
}