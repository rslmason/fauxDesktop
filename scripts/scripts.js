console.log("Here be kludges!")
let zIndexCounter = 0;

let taskbar = document.getElementById('taskbar')
let desktop = document.getElementById('desktop')

const iconColumnWidth = 120; // needs to match css; value in pixels.
const iconRowHeight = 140;

let iconCounter = 0;
gridColumns = Math.floor(getComputedStyle(desktop).width.replace("px", "") / iconColumnWidth);
gridRows = Math.floor(getComputedStyle(desktop).height.replace("px", "") / iconRowHeight);

let xCounter = Math.floor(gridColumns/2);
let yCounter = Math.floor(gridRows/2);

function windowLevelFocus (program) {

    // What is the functionality of focus?
    // Open a program -> focus on it

    // FUNCTION
    // call unfocus on the focus
    // make argument the focus
    // call focus on the focus.
}

window.addEventListener('resize', ()=>{
    gridColumns = Math.floor(getComputedStyle(desktop).width.replace("px", "") / iconColumnWidth);
    gridRows = Math.floor(getComputedStyle(desktop).height.replace("px", "") / iconRowHeight);
    for (let i = 0; i <= gridColumns; i ++) {
        if (!iconArray[i]) {
            iconArray[i] = [];
        }
    }
    
    for (let i = iconArray.length - 1; i >= gridColumns; i--) {
        for (let j = 0; j < iconArray[i].length; j++) {
            if (iconArray[i][j]) {
                loop: for (let k = 0; k<gridColumns; k++){
                    for (let l = 0; l<gridRows;l++) {
                        if (!iconArray[k][l]) {
                            iconArray[k][l] = iconArray[i][j]
                            iconArray[k][l].style.left = k * iconColumnWidth + "px"
                            iconArray[k][l].style.top = l * iconRowHeight + "px"
                            console.log(iconArray[i][j])
                            iconArray[i][j] = null
                            break loop
                        }
                    }
                }
            }
        }
    }
    for (let i = gridColumns; i >= 0; i --) {
        for (let j = gridRows; j < iconArray[i].length; j ++) {
            if (iconArray[i][j]) {
                loop: for (let k = 0; k < gridColumns; k++){
                    for (let l = 0; l < gridRows; l++) {
                        if (!iconArray[k][l]) {
                            console.log(k,l)
                            iconArray[k][l] = iconArray[i][j];
                            iconArray[k][l].style.left = k * iconColumnWidth + "px";
                            iconArray[k][l].style.top = l * iconRowHeight + "px";
                            console.log(iconArray[i][j])
                            iconArray[i][j] = null
                            break loop
                        }
                    }
                }
            }
        }
    }

})


let iconArray = [];
for (let i = 0; i <= gridColumns; i ++) {
    iconArray[i] = [];
}
// desktop.addEventListener('dragenter', (event) => {
//     event.preventDefault();
//     // console.log(event.target)
// })
let movingIcon;

desktop.addEventListener('dragstart', (event)=>{
    movingIcon = event.target;
})



desktop.addEventListener('dragend', (event) => {
    let myY = Math.min(Math.floor(event.y / iconRowHeight),gridRows-1);
    let myX = Math.min(Math.floor(event.x / iconColumnWidth),gridColumns-1);
    if (iconArray[myX] == undefined) {
        iconArray[myX] = []
    }
    if (iconArray[myX][myY] === null || iconArray[myX][myY] === undefined || iconArray[myX] === undefined){
        // iconArray[movingIcon.style.gridColumnStart][movingIcon.style.gridRowStart] = null;
        // movingIcon.style.gridColumnStart = myX;
        // movingIcon.style.gridRowStart = myY;
        iconArray[movingIcon.style.left.replace("px", "")/iconColumnWidth][movingIcon.style.top.replace("px", "")/iconRowHeight] = null;
        movingIcon.style.left = (myX * iconColumnWidth) + "px"; // 
        movingIcon.style.top = (myY * iconRowHeight) + "px";    //
        iconArray[myX][myY] = movingIcon;
    }
    // console.log(iconArray[myX][myY])
})

const minWidth = 400; //in pixels
const minHeight = 300;

const startMenuButton = document.getElementById('startMenuButton')
const startMenu = document.getElementById('startMenu')

let docFocusArray = [];

startMenuButton.addEventListener('mousedown', (event)=>{
    startMenu.classList.toggle('hidden');

    document.addEventListener('mouseup', function handleMouseUp (event) {
        if (event.target !== startMenuButton) {
            startMenu.classList.add('hidden');
            document.removeEventListener('mouseup', handleMouseUp)
        }
        else {
            document.addEventListener('mousedown', function handleOtherClick () {
                document.removeEventListener('mousedown', handleOtherClick)
            })
        }
    })
    
})



function Program (name, url, imgSource, altText) {
    let running = false;
    
    let msWindow;
    let varFocus;

    this.startProgram = function () {
        if (running) {
            varFocus()
        }
        else {
            running = true;
            msWindow = this.makeMsWindow()
            msWindow.style.zIndex = zIndexCounter++;
                const topBar = this.makeTopBar(name)
                let moveWindow = moveWindowMouseDown()
                topBar.addEventListener('mousedown', moveWindow)
                topBar.addEventListener('dblclick', maximize)
                const iFrame = this.makeIFrame(url)
            msWindow.append(topBar, iFrame)


            
            function moveWindowMouseDown () {

                function moveWindowMouseMoveHandler () {
                    return (event) => {
                        msWindow.style.top = `${parseInt(msWindow.style.top.replace("px", "")) + event.movementY}px`
                        msWindow.style.left = `${parseInt(msWindow.style.left.replace("px", "")) + event.movementX}px`
                    }
                }

                return (event) => {
                    iFrame.classList.add('moving');
                    let callbackFunction = moveWindowMouseMoveHandler()
                    document.addEventListener('mousemove', callbackFunction)
                    document.addEventListener('mouseup', ()=>{
                        msWindow.querySelector('iframe').classList.remove('moving')
                        document.removeEventListener('mousemove', callbackFunction)
                    })
                }
            }

            const sides = ["top", "right", "bottom", "left"];
            for (side in sides) {
                function resizeMouseDown () {
                    
                    function resizeMouseMoveHandler (side) {

                        let x = 0;
                        let y = 0;
                        let top = parseInt(msWindow.style.top);
                        let left = parseInt(msWindow.style.left);
                        let width = parseInt(msWindow.style.width);
                        let height = parseInt(msWindow.style.height);

                        if (side ==='top') {
                            return (event) => {
                                y += event.movementY;
                                if (height - y > minHeight) {
                                    msWindow.style.top = (top + y)  + "px";
                                    msWindow.style.height = (height - y) + "px";
                                }
                            }
                        }
                        else if (side === 'right') {
                            return (event) => {
                                x += event.movementX;
                                if (x + width > minWidth ){
                                    msWindow.style.width = (x + width) + "px"
                                }
                            }
                        }
                        else if (side === 'bottom') {
                            return (event) => {
                                y += event.movementY;
                                if (y + height > minHeight ){
                                    msWindow.style.height = (y + height) + "px"
                                }
                            }
                        }
                        else if (side === 'left') {
                            return (event) => {
                                x += event.movementX;
                                if (width - x > minWidth) {
                                    msWindow.style.left = (left + x)  + "px";
                                    msWindow.style.width = (width - x) + "px";
                                }
                            }
                        }
                    }

                    return (event) =>{
                        for (arg of arguments) {
                            msWindow.querySelector('iframe').classList.add('moving')
                            let callbackFunction = resizeMouseMoveHandler(arg)
                            document.addEventListener('mousemove', callbackFunction)
                            document.addEventListener('mouseup', ()=>{
                                msWindow.querySelector('iframe').classList.remove('moving')
                                document.removeEventListener('mousemove', callbackFunction)
                            })
                        }
                    }
                }

                const newSide = document.createElement('div');
                newSide.classList.add('edge', sides[side]);
                newSide.addEventListener('mousedown', resizeMouseDown(sides[side]))
                msWindow.append(newSide);

                const newCorner = document.createElement('div');
                newCorner.classList.add('corner', sides[side], sides[(parseInt(side) + 1)%4]);
                newCorner.addEventListener('mousedown', resizeMouseDown(sides[side], sides[(parseInt(side) + 1)%4]))
                msWindow.append(newCorner);
            }

            const minButton = this.makeMinButton();
            minButton.addEventListener('click', minimize)
            minButton.addEventListener('mousedown', (event)=> {
                event.stopPropagation();
            })
            
            const maxButton = this.makeMaxButton();
            maxButton.addEventListener('click', ()=>{
                maximize()
            })

            const restoreButton = this.makeRestoreButton();
            restoreButton.addEventListener('click', ()=>{
                restore()
            })

            const closeButton = this.makeCloseButton();
            closeButton.addEventListener('click', close);
            closeButton.addEventListener('mousedown', (event)=> {
                event.stopPropagation();
            })
            topBar.append(minButton, restoreButton, maxButton, closeButton)
            
            msWindow.addEventListener('mousedown', focus)

            const taskBarButton = this.makeTaskBarButton(name);
            taskBarButton.addEventListener('click', focusOrMinimize.bind(this));

            taskBarButton.addEventListener('contextmenu', (event)=>{
                    event.preventDefault()
                    openContextMenu(event)
            })

            function openContextMenu (event) {
                let contextMenu = document.createElement('ul');
                contextMenu.style.zIndex = 1;
                contextMenu.classList.add('contextMenu');

                    // the buttons here can obviously be generalized/abstracted by simply passing in the associated function
                    const closeButton = document.createElement('li');
                    closeButton.innerText = "close";
                    closeButton.addEventListener('click', (event)=>{
                        event.stopPropagation()
                        contextMenu.remove()
                        close()
                    })
                    contextMenu.append(closeButton);

                    const maxButton = document.createElement('li');
                    maxButton.innerText = "maximize";
                    maxButton.addEventListener('click', (event)=>{
                        event.stopPropagation()
                        contextMenu.remove()
                        maximize()
                    })
                    contextMenu.append(maxButton);

                    const minButton = document.createElement('li');
                    minButton.innerText = "minimize";
                    minButton.addEventListener('click', (event)=>{
                        event.stopPropagation()
                        contextMenu.remove()
                        minimize()
                    })
                    contextMenu.append(minButton);

                    const restoreButton = document.createElement('li');
                    restoreButton.innerText = "restore";
                    restoreButton.addEventListener('click', (event)=>{
                        event.stopPropagation()
                        contextMenu.remove()
                        restore()
                    })
                    contextMenu.append(restoreButton);

                event.target.append(contextMenu)
                contextMenu.style.left = event.offsetX + 'px';
                contextMenu.style.top = (event.offsetY - contextMenu.offsetHeight) + 'px';

                document.addEventListener('click', function removeContextMenu() {
                    contextMenu.remove()
                    document.removeEventListener('click', removeContextMenu)
                })
            }

            taskbar.append(taskBarButton)

            running = true;
            desktop.append(msWindow)
            focus()
        
            // function myRun () {
            //     if (running) {
            //         focus()
            //     }
            //     else {
            //         this.startProgram()
            //     }
            // }

            function focus () {
                removeFromFocusArray()
                pushToFocusArray(this)
                

                msWindow.style.visibility = 'visible';

                if (!msWindow.classList.contains('focus')) {
                    msWindow.style.zIndex = zIndexCounter++;
                    taskbar.style.zIndex = zIndexCounter
                }
                for (windowEl of document.querySelectorAll('.msWindow')) {
                    if (windowEl === msWindow) {
                        windowEl.classList.add('focus')
                        // this is hilarious but I will keep it, instead of just 
                        // doing it directly.
                    }
                    else {
                        windowEl.classList.remove('focus')
                    }
                }
                for (taskBarEl of document.querySelectorAll('.taskBarButton')) {
                    if (taskBarEl === taskBarButton) {
                        taskBarEl.classList.add('focus')
                    }
                    else {
                        taskBarEl.classList.remove('focus')
                    }
                }

            }
            varFocus = focus; 

            function close () {
                running = false;
                removeFromFocusArray()
                taskBarButton.remove()
                msWindow.remove()
            }

            function removeFromFocusArray () {
                // let temp = docFocusArray.indexOf(msWindow);
                let temp = docFocusArray.indexOf(this);
                if (temp > -1) {
                    // docFocusArray.splice(docFocusArray.indexOf(msWindow),1)
                    docFocusArray.splice(docFocusArray.indexOf(this),1)
                }
                if (docFocusArray.length) {
                    // docFocusArray[docFocusArray.length-1].classList.add('focus')
                    docFocusArray[docFocusArray.length-1].focus()
                }
            }

            function pushToFocusArray (arg) {
                // docFocusArray.push(msWindow)
                docFocusArray.push(arg)
            }

            function focusOrMinimize () {
                // if (msWindow.style.visibility == 'hidden' || docFocusArray[docFocusArray.length-1] !== msWindow) {
                    console.log(docFocusArray[docFocusArray.length-1])
                    console.log(this)
                if (msWindow.style.visibility === 'hidden' || docFocusArray[docFocusArray.length-1] !== this) {
                    focus()
                }
                else {
                    minimize()
                }
            }
            function minimize () {
                
                console.log('minimize');
                removeFromFocusArray()
                msWindow.style.visibility = 'hidden'
                // added
                // docFocusArray[docFocusArray.length-2].focus()
                console.log(docFocusArray[docFocusArray.length-1])
            }

            function maximize () {
                console.log('maximize');

                topBar.removeEventListener('dblclick', maximize)
                topBar.addEventListener('dblclick', restore)
                topBar.removeEventListener('mousedown', moveWindow)

                msWindow.querySelector('.maxButton').classList.add('hidden');
                msWindow.querySelector('.restoreButton').classList.remove('hidden');
                msWindow.storeTop = msWindow.style.top;
                msWindow.storeLeft = msWindow.style.left;
                msWindow.storeWidth = msWindow.style.width;
                msWindow.storeHeight = msWindow.style.height;
            
                msWindow.style.width = '100%';
                msWindow.style.height = 'calc(100% - 50px)';
                msWindow.style.top = '0px';
                msWindow.style.left = '0px';
                msWindow.classList.add('maximized')
                focus()

            }

            function restore () {
                console.log('restore');

                topBar.addEventListener('dblclick', maximize)
                topBar.removeEventListener('dblclick', restore)
                topBar.addEventListener('mousedown', moveWindow)

                msWindow.querySelector('.restoreButton').classList.add('hidden');
                msWindow.querySelector('.maxButton').classList.remove('hidden');
                            msWindow.style.top = msWindow.storeTop;
                msWindow.style.left = msWindow.storeLeft;
                msWindow.style.width = msWindow.storeWidth;
                msWindow.style.height = msWindow.storeHeight;
                msWindow.classList.remove('maximized')
                for (el of msWindow.querySelectorAll('.edge, .corner')) {
                    el.classList.remove('maximized')
                }
                focus()
            }
        }
    }



    // how much of this can get bundled into the prototype?
    const startMenuButton = this.makeStartMenuButton(name);
    startMenuButton.addEventListener('mouseup', () => {
        this.startProgram()
    })
    document.querySelector('nav ul').append(startMenuButton)
    
    const icon = this.makeIcon(name, imgSource, altText);
    icon.addEventListener('dblclick', () => {
        this.startProgram()
    })
    icon.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            this.startProgram()
        }
    })
    desktop.append(icon)

}

Program.prototype = {

    makeIFrame: function (url) {
        const iFrame = document.createElement('iframe');
        iFrame.src = url;
        return(iFrame)
    },


    makeStartMenuButton: function (name) {
        const menuButton = document.createElement('li');
        menuButton.innerText = name;
        // menuButton.classList.add('hidden');

        return menuButton  
    },
    makeDesktopIcon: function () {
        const desktopIcon = document.createElement('div')
    },
    makeMinButton () {
        const minButton = document.createElement('button');
        minButton.innerText = "-";
        minButton.classList.add('minButton');
        return minButton
    },
    makeCloseButton () {
        const closeButton = document.createElement('button');
        closeButton.innerText = "X";
        closeButton.classList.add('closeButton');
        return closeButton
    },
    makeTopBar (name) {
        const topBar = document.createElement('div');
        topBar.classList.add('topBar');
        topBar.innerText = name;
        return topBar
    },
    makeMsWindow (url, name) {
        const msWindow = document.createElement('div');
        msWindow.classList.add('msWindow');

        let width = getComputedStyle(desktop).width.replace("px", "")
        let height = getComputedStyle(desktop).height.replace("px", "")

        if (yCounter * 50 + 400 > height) {
            yCounter = 1
        }
        if (xCounter * 50 + 600 > width) {
            xCounter = 1
        }

        msWindow.style.top = (yCounter++ * 50) + "px"; 
        msWindow.style.left = (xCounter++ * 50) + "px";
       
        msWindow.style.height = '400px';
        msWindow.style.width = '600px';
        return msWindow
    },
    makeTaskBarButton (name) {
        const taskBarButton = document.createElement('div');
        taskBarButton.innerText = name;
        taskBarButton.classList.add('taskBarButton');
        return taskBarButton
    },
    makeMaxButton () {
        const maxButton = document.createElement('button');
        maxButton.innerText = '[]';
        maxButton.classList.add('maxButton');
        return maxButton;
    },
    makeRestoreButton () {
        const restoreButton = document.createElement('button');
        restoreButton.innerText = '][';
        restoreButton.classList.add('restoreButton');
        restoreButton.classList.add('hidden');
        return restoreButton;
        
    },

    makeIcon (name, source, altText) {
        const overDiv = document.createElement('div')
        overDiv.classList.add('icon')
        overDiv.tabIndex = 0;
        overDiv.draggable = true;
        const icon = document.createElement('img')
        icon.src = source;
        icon.alt = altText;
        icon.draggable = false;
        const div = document.createElement('div');
        div.innerText = name;
        
        // overDiv.style.gridRowStart = ++iconCounter - (Math.ceil(iconCounter / gridRows) - 1) * gridRows;
        // overDiv.style.gridColumnStart = Math.ceil(iconCounter / gridRows);

        // iconArray[overDiv.style.gridColumnStart][overDiv.style.gridRowStart] = overDiv;
        let row = (++iconCounter - (Math.ceil(iconCounter / gridRows) - 1) * gridRows)-1;  
        let column = Math.ceil(iconCounter / gridRows)  - 1;
        // console.log(column, row)
        overDiv.style.left = (column * iconColumnWidth) + "px";
        overDiv.style.top = (row * iconRowHeight) + "px";

        iconArray[column][row] = overDiv;

        // console.log(Math.floor(iconCounter / gridRows)) 
        overDiv.append(icon, div)
        return overDiv



    }
}

// or just add start buttons that initialize these.
// that is, key value pairs of name/urls. Initialize the 
// app by making buttons that generate


new Program('README.txt', 'readMe.html', 'assets/icons/1.bmp', 'icon alt text').startProgram()
new Program('Contact', 'contact.html', 'assets/icons/1.bmp', 'icon alt text')
new Program('OMNI-MIND', 'https://omni-mind.netlify.app', 'assets/icons/1.bmp', 'icon alt text')
new Program('Twilight Imperium', 'https://ti4-battle-sim.netlify.app/', 'assets/icons/1.bmp', 'icon alt text')
new Program('Program 1', 'blank.html', 'assets/icons/1.bmp', 'icon alt text')
new Program('Program 2', 'blank.html', 'assets/icons/1.bmp', 'icon alt text')
new Program('Program 3', 'blank.html', 'assets/icons/1.bmp', 'icon alt text')
new Program('Program 4', 'blank.html', 'assets/icons/1.bmp', 'icon alt text')
