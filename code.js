figma.showUI(__html__, { width: 200, height: 174 });

let allTextNodes = [];
let textNodes = []
let main = false;
let instance = false;

//减去重叠
function adb(arr1, arr2) {
    for (var i = arr1.length - 1; i >= 0; i--) {
        let a = arr1[i];
        for (var j = arr2.length - 1; j >= 0; j--) {
            let b = arr2[j];
            if (a == b) {
                arr1.splice(i, 1);
                arr2.splice(j, 1);
                break;
            }
        }
    }
}

function Run() {
    allTextNodes.map(item => {
        item.autoRename = true
    })
    // figma.closePlugin();
}

figma.ui.onmessage = msg => {
    console.log(msg)

    if (msg.type === "main" && msg.status) {
        textNodes = [];
        main = true
        textNodes = figma.currentPage.findAll((node) => node.type === "TEXT" && node.parent.type != "INSTANCE");
        textNodes.forEach(i => {
            allTextNodes.push(i)
        });
        console.log(allTextNodes.length)
    }

    if (msg.type === "main" && !msg.status) {
        main = false
        adb(allTextNodes, textNodes)
        textNodes = [];
    }


    if (msg.type === "instance" && msg.status) {
        textNodes = [];
        instance = true
        textNodes = figma.currentPage.findAll((node) => node.type === "TEXT" && node.parent.type != "COMPONENT");
        textNodes.forEach(i => {
            allTextNodes.push(i)
        });
        console.log(allTextNodes.length)
    }

    if (msg.type === "instance" && !msg.status) {
        instance = false
        adb(allTextNodes, textNodes)
        textNodes = [];
    }


    if (!(main && instance)) {
        allTextNodes = figma.currentPage.findAll((node) => node.type === "TEXT" && node.parent.type != "INSTANCE" && node.parent.type != "COMPONENT");
    }
    if (main && instance) {
        allTextNodes = figma.currentPage.findAll((node) => node.type === "TEXT");
    }
    if (msg.type === "runBtn") {
        console.log(allTextNodes.length)
        allTextNodes.forEach(item => {
            console.log(item.name)
        })
        // Run()
    }
};



