import "subjx/dist/style/subjx.css";

import subjx from "subjx";

var zoom_value_formula = 1;
let scaleValue = 1;

// self executing function here
(function() {
    // your page initialization code here
    // the DOM will be available here

    document.getElementById("cacluate_position").onclick = cacluatePosition;
    document.getElementById("zoom_canvas").onchange = changeZoomCanvas;

    const selected_index = document.getElementById("zoom_canvas").selectedIndex;
    console.log("selected_index ", selected_index)
    defaultSelectedZoomCanvas(selected_index);

    checkAllImagesLoaded();
    // document.addEventListener('click',clickEvent)
    document.addEventListener('mousemove',moveCursor)
    


})();
function clickEvent(event)
{
    
    if(clicked)
    {
        console.log('click event')
        console.log(event.target)
        

    }
    
}
function fitTextToImage()
{
    // const images = document.querySelectorAll(".image_element");
    console.log("divs")
    var divs = document.querySelectorAll('div[id^="imageContainer"]');
    divs.forEach((div) => {
        let text_div=div.getElementsByClassName("image_text")[0];
        let image_div=div.getElementsByClassName("image_element")[0];
        text_div.style.width=image_div.clientWidth-20+"px";

        
    });
    console.log(divs)
}
function transformToFit() {
    const images = document.querySelectorAll(".image_element");
    console.log("images ", images);
    let maxWidth = 0;
    images.forEach((image) => {
      const width = image.clientWidth;
      maxWidth = Math.max(maxWidth, width);
      const height = image.clientHeight;
      console.log(`Image width: ${width}px, height: ${height}px`);
    });
    let container = document.getElementById("stack");
    let offsets_world = document.getElementById("world");
    
    // if(maxWidth>container.clientWidth){
      scaleValue = container.clientWidth / maxWidth;
    if (scaleValue <= 1) {
      // scaleValue = container.clientWidth / maxWidth - 0.01;
      scaleValue=scaleValue- 0.01;
      offsets_world.style.transform = `scale(${scaleValue})`;
    } else {
      // scaleValue = container.clientWidth / maxWidth - 0.2;
      scaleValue=scaleValue- 0.1;
      offsets_world.style.transform = `scale(${scaleValue})`;
    }
    zoom_value_formula = 1 / scaleValue;
    // }
    // else{
    //     scaleValue=maxWidth;
    // offsets_world.style.transform = `scale(${scaleValue})`;
    // }
  
    // if(scaleValue>0){
    // zoom_value_formula = 1/scaleValue;
    // }
    // console.log(container.clientWidth/maxWidth-0.01)
  }
function changeZoomCanvas(event) {
    console.log("doSomething", event);

    const selected_index = event.target.selectedIndex;
    console.log("selected_index ", selected_index);

    defaultSelectedZoomCanvas(selected_index)
}

function defaultSelectedZoomCanvas(selected_index) {

    let offsets_world = document.getElementById('world');

    offsets_world.style.transformOrigin = '0px 0px';
    if (selected_index == 0) {
        zoom_value_formula = 2.5;
        offsets_world.style.transform = 'scale(0.4)';
    } else if (selected_index == 1) {
        zoom_value_formula = 2;
        offsets_world.style.transform = 'scale(0.5)';
    } else if (selected_index == 2) {
        zoom_value_formula = 1.667;
        offsets_world.style.transform = 'scale(0.6)';
    } else if (selected_index == 3) {
        zoom_value_formula = 1.43;
        offsets_world.style.transform = 'scale(0.7)';
    } else if (selected_index == 4) {
        zoom_value_formula = 1.25;
        offsets_world.style.transform = 'scale(0.8)';
    } else if (selected_index == 5) {
        zoom_value_formula = 1.1;
        offsets_world.style.transform = 'scale(0.9)';
    } else if (selected_index == 6) {
        // zoom_value_formula = 1;
        // offsets_world.style.transform = 'scale(1)';
        transformToFit()
    } else if (selected_index == 7) {
        zoom_value_formula = 0.82;
        offsets_world.style.transform = 'scale(1.2)';
    }
}

function cacluatePosition() {

    var pagesOffsetObject = [{"height":3329.05078125,"snapshots_name":"1448/samplepdf-1632023123525/images/sample-1.png","image_height":3303.70361328125,"image_width":2553.70361328125},{"height":3329.05078125,"snapshots_name":"1448/samplepdf-1632023123525/images/sample-2.png","image_height":3303.70361328125,"image_width":2553.70361328125},{"height":1065.0462646484375,"snapshots_name":"1448/SampleJPGImagekbmbjpg-1632023123544/images/SampleJPGImage_200kbmb-1.png","image_height":1039.6990966796875,"image_width":1039.6990966796875}];

    console.log(xDraggable);

    let meta_data = [];
    let margin_gap = 24;

    const array_xDraggable = xDraggable;
    for (let index = 1; index < array_xDraggable.length; index++) 
    {
        const draggable_element = array_xDraggable[index][0];
        
        console.log("draggable_element ", draggable_element);

        const draggable_element_main = draggable_element["el"];

        let page = 0;

        const temp_meta_data_top =
        parseInt($(draggable_element_main).css("top").slice(0, -2)) +
        (parseInt($(draggable_element_main).css("transform").split(",")[5])
            ? parseInt($(draggable_element_main).css("transform").split(",")[5])
            : 0);


        for (let j = 0; j < pagesOffsetObject.length; j++) 
        {
            const snapshots_name = pagesOffsetObject[j].snapshots_name;
            console.log("snapshots_name ", snapshots_name);

            const current_page_image_height = pagesOffsetObject[j].image_height;
            const current_page_image_width = pagesOffsetObject[j].image_width;

            let image_document_element = document.querySelector("[snapshots_name='"+snapshots_name+"']").querySelectorAll('img')[0];
            console.log("image_document_element ", image_document_element);

            let offsets = draggable_element_main.getBoundingClientRect();
            console.log("offsets ", offsets);

            let offsets_document_image = image_document_element.getBoundingClientRect();
            console.log("offsets ", offsets);

            let top = (offsets.top - offsets_document_image.top)*zoom_value_formula;
            const left = (offsets.left - offsets_document_image.left)*zoom_value_formula;
            const width = offsets.width * zoom_value_formula;
            const height = offsets.height * zoom_value_formula;
            const image_width = offsets_document_image.width * zoom_value_formula;
            const image_height = offsets_document_image.height * zoom_value_formula;

            page = j + 1;
                meta_data.push({
                    top: Math.ceil(top),
                    left: Math.ceil(left),
                    width: Math.ceil(width),
                    height: Math.ceil(height),
                    page: page,
                    documents_top: Math.ceil(temp_meta_data_top),
                });
                break;
        }

        // let element_object = {
        //     top : top,
        //     left : left,
        //     // snapshots_name : snapshots_name,
        //     // document_key : document_key,
        //     width : width,
        //     height : height,
        //     // image_width : image_width, 
        //     // image_height : image_height
        // }

        // meta_data.push(element_object);

        if(array_xDraggable.length-1 == index)
        {
            console.log("meta_data ", meta_data);
        }
        
    }
  
}
let clicked = false;
let elementToBeCloned = null;
let elementToBeClonedDup = null;
const xElem = subjx(".draggable");
const options = {
    container: '#world',
    snap: {
        x: 0,
        y: 0,
        angle: 0
    },
    cursorMove: 'move',
    cursorRotate: 'crosshair',
    cursorResize: 'pointer',
    rotatable : false,

    ...methods

}

const methods = {
    onInit(elements) {
        // fires on tool activation
        console.log("onInit ", elements)
    },
    onMove({
        clientX,
        clientY,
        dx,
        dy,
        transform
    }) {
        // fires on moving
        console.log("onMove ", clientX)
    },
    onResize({
        clientX,
        clientY,
        dx,
        dy,
        transform,
        width,
        height
    }) {
        // fires on resizing
        console.log("onResize ", clientX)
    },
    onRotate({
        clientX,
        clientY,
        delta,
        transform
    }) {
        // fires on rotation
        console.log("onRotate ", clientX)
    },
    onDrop({
        clientX,
        clientY
    }) {
        // fires on drop
        console.log("onDrop ", clientX)
    },
    onDestroy(el) {
        // fires on tool deactivation
        console.log("onDestroy ", el)
    }
}
let xDraggable = xElem.drag(options);
// console.log(xDraggable.controls);
function cloneElement(e,el){
    console.log("onDrop e ", e);
        console.log("onDrop el ", el);
        // console.log("onDrop clone ", clone);
        let parent = document.getElementById("world");

        // console.log(xDraggable.length)
        const stack = subjx('#world')[0],
            offset = stack.getBoundingClientRect(),
            drag_div = document.createElement('div');

        // const xDraggable_length = xDraggable.length;

        // drag_div.setAttribute("id", "item_"+(xDraggable_length+1));
        drag_div.setAttribute("class", "draggable");
        drag_div.setAttribute("document_id", e.target.id);
        drag_div.style.top = `${(e.clientY - offset.top)*zoom_value_formula}px`;
        drag_div.style.left = `${(e.clientX - offset.left)*zoom_value_formula}px`;

        console.log("top ", e.clientY, " ", offset.top, " -> ", ((e.clientY - offset.top) * zoom_value_formula));
        console.log("left ", e.clientX, " ", offset.left, " -> ", ((e.clientX - offset.left) * zoom_value_formula));

        // drag_div.style.top = "150px";
        // drag_div.style.left = "600px";

        let drag_img = document.createElement('img');
        drag_img.style.background = "url('https://wesign.com/assets/images_dev/sign_box_2.png') 50% center / contain no-repeat, rgb(255, 214, 91)";
        drag_img.style.opacity = 0.8;
        drag_img.style.border =  '1px solid rgb(255, 255, 118)';
        drag_img.style.borderRadius =  '5px';
        drag_img.style.width = '100%';
        drag_img.style.height =  '100%';


        drag_div.appendChild(drag_img);
        parent.appendChild(drag_div);

        xDraggable.push(
            subjx(drag_div).drag(options)
        );

}
function CloneElementUsingXY(clientX,clientY,target_id)
{
    // console.log("onDrop e ", e);
    //     console.log("onDrop el ", el);
    //     // console.log("onDrop clone ", clone);
    
    
        // console.log("onDrop clone ", clone);
        let parent = document.getElementById("world");

        // console.log(xDraggable.length)
        const stack = subjx('#world')[0],
            offset = stack.getBoundingClientRect(),
            drag_div = document.createElement('div');

        // const xDraggable_length = xDraggable.length;

        // drag_div.setAttribute("id", "item_"+(xDraggable_length+1));
        drag_div.setAttribute("class", "draggable");
        drag_div.setAttribute("document_id", target_id);
        drag_div.style.top = `${(clientY - offset.top)*zoom_value_formula}px`;
        drag_div.style.left = `${(clientX - offset.left)*zoom_value_formula}px`;

        console.log("top ", clientY, " ", offset.top, " -> ", ((clientY - offset.top) * zoom_value_formula));
        console.log("left ", clientX, " ", offset.left, " -> ", ((clientX - offset.left) * zoom_value_formula));

        // drag_div.style.top = "150px";
        // drag_div.style.left = "600px";

        let drag_img = document.createElement('img');
        drag_img.style.background = "url('https://wesign.com/assets/images_dev/sign_box_2.png') 50% center / contain no-repeat, rgb(255, 214, 91)";
        drag_img.style.opacity = 0.8;
        drag_img.style.border =  '1px solid rgb(255, 255, 118)';
        drag_img.style.borderRadius =  '5px';
        drag_img.style.width = '100%';
        drag_img.style.height =  '100%';


        drag_div.appendChild(drag_img);
        parent.appendChild(drag_div);

        xDraggable.push(
            subjx(drag_div).drag(options)
        );


}
subjx('.clone').clone({
    stack: '#container',
    appendTo: '#stack',
    onInit(el) {
        // fires on tool activation;
        console.log("clone init")
    },
    onMove(dx, dy) {
        // fires on moving
        // console.log("fires on moving ", dx, dy)
    },
    onDrop(e, el, clone) {
        // fires on drop
        console.log("onDrop e ", e);
        console.log("onDrop el ", el);
        console.log("onDrop clone ", clone);
        cloneElement(e,el);
        // let parent = document.getElementById("world");

        // // console.log(xDraggable.length)
        // const stack = subjx('#world')[0],
        //     offset = stack.getBoundingClientRect(),
        //     drag_div = document.createElement('div');

        // // const xDraggable_length = xDraggable.length;

        // // drag_div.setAttribute("id", "item_"+(xDraggable_length+1));
        // drag_div.setAttribute("class", "draggable");
        // drag_div.setAttribute("document_id", e.target.id);
        // drag_div.style.top = `${(e.clientY - offset.top)*zoom_value_formula}px`;
        // drag_div.style.left = `${(e.clientX - offset.left)*zoom_value_formula}px`;

        // console.log("top ", e.clientY, " ", offset.top, " -> ", ((e.clientY - offset.top) * zoom_value_formula));
        // console.log("left ", e.clientX, " ", offset.left, " -> ", ((e.clientX - offset.left) * zoom_value_formula));

        // // drag_div.style.top = "150px";
        // // drag_div.style.left = "600px";

        // let drag_img = document.createElement('img');
        // drag_img.style.background = "url('https://wesign.com/assets/images_dev/sign_box_2.png') 50% center / contain no-repeat, rgb(255, 214, 91)";
        // drag_img.style.opacity = 0.8;
        // drag_img.style.border =  '1px solid rgb(255, 255, 118)';
        // drag_img.style.borderRadius =  '5px';
        // drag_img.style.width = '100%';
        // drag_img.style.height =  '100%';


        // drag_div.appendChild(drag_img);
        // parent.appendChild(drag_div);

        // xDraggable.push(
        //     subjx(drag_div).drag(options)
        // );
    },
    onDestroy() {
        // fires on tool deactivation
    }
});
subjx('#container').on('click', async (a) => {
    if(clicked == true)
    {
        clicked = false;
        cloneElement(a,elementToBeCloned);
        // document.removeChild(elementToBeClonedDup);
        let container=document.getElementById("container");
    container.removeChild(elementToBeClonedDup);
    }
});
// subjx('.clone').clone({

// })


function moveCursor(event)
{
    // console.log("moveCursor ", event)
    const mouseY= event.clientY;
    const mouseX= event.clientX;
    // elementToBeCloned.style. = mouseY;
    let element=document.getElementById("container");
    const isHover = e => e.parentElement.querySelector(':hover') === e;
    // if()
    if(clicked == true && isHover(element) )
    {
        elementToBeClonedDup.style.left = mouseX + "px";
    elementToBeClonedDup.style.top = mouseY + "px";
    // clicked = false;
    

    }
    
}

subjx('.clone').on('click', async (a) => {
    console.log("e ", a);
    let el=a.target;
    console.log("el ", el);
    console.log("single");
    if(clicked == true)
    {
        clicked = false;
        let container=document.getElementById("container");
        // container.appendChild(elementToBeClonedDup);
        // elementToBeClonedDup.style.zIndex="-1";
        // elementToBeClonedDup.style.width="100px";
        // elementToBeClonedDup.style.height="100px";
        // elementToBeClonedDup.style.position="fixed";
        // elementToBeClonedDup.style.pointerEvents="none";
        container.removeChild(elementToBeClonedDup);
        // container.appendChild(elementToBeClonedDup)
        
    }
    else
    {
        setTimeout(()=>{clicked = true;},1)
        
        elementToBeCloned = el;
        
        elementToBeClonedDup=elementToBeCloned.cloneNode(true);
        // elementToBeClonedDup.style.position = "absolute";
        // console.log(elementToBeClonedDup.style) 
        // console.log(elementToBeClonedDup)
        // elementToBeClonedDup.style.transition="all 200ms ease-out";
        // elementToBeClonedDup.style.pointerEvents="none";
        let container=document.getElementById("container");
        // container.appendChild(elementToBeClonedDup);
        // elementToBeClonedDup.style.zIndex="-1";
        // elementToBeClonedDup.style.width="100px";
        // elementToBeClonedDup.style.height="100px";
        elementToBeClonedDup.style.position="fixed";
        elementToBeClonedDup.style.pointerEvents="none";

        container.appendChild(elementToBeClonedDup)
        
    }

    

});

subjx('.clone').on('dblclick', async () => {
    function getStartEnd(element)
    {
        let elementRect= element.getBoundingClientRect();
        let elementStart=elementRect.y;
        let elementEnd=elementRect.y + elementRect.height;
        return [elementStart,elementEnd]

    }
    console.log("double click");
    // console.log(document.activeElement)
    var divs = document.querySelectorAll('img[id^="image_element"]');
    let container=document.getElementById('container')
    let [containerStart,containerEnd]=getStartEnd(container)

    let maxPercentage=0
    let maxDiv=null;
    divs.forEach((div) => {
        // let text_div=div.getElementsByClassName("image_text")[0];
        // let image_div=div.getElementsByClassName("image_element")[0];
        // text_div.style.width=image_div.clientWidth-20+"px";
        let [elementStart,elementEnd]=getStartEnd(div)
        console.log(getStartEnd(div))
        elementStart=Math.max(elementStart,containerStart)
        elementEnd=Math.min(elementEnd,containerEnd)
        console.log('elementStart',elementStart)
        console.log('elementEnd',elementEnd)
        if(elementStart<elementEnd)
        {
            let elPercentage=elementEnd-elementStart
            if(elPercentage>maxPercentage)
            {
                maxPercentage=elPercentage
                maxDiv=div
            }
        }
    });
    console.log('max div')
    console.log(maxDiv)
    let maxDivRect=maxDiv.getBoundingClientRect();
    CloneElementUsingXY(maxDivRect.x,maxDivRect.y,maxDiv.id)

});
subjx(".removePointer").on('click',async (a)=>{
    if(clicked == true)
    {
        clicked = false;
        // cloneElement(a,elementToBeCloned);
        // document.removeChild(elementToBeClonedDup);
        let container=document.getElementById("container");
    container.removeChild(elementToBeClonedDup);
    }

})

function checkAllImagesLoaded() {
    var imgs = document.images,
    len = imgs.length,
    counter = 0;

    [].forEach.call( imgs, function( img ) {
        if(img.complete)
        incrementCounter();
        else
        img.addEventListener( 'load', incrementCounter, false );
    } );

    function incrementCounter() {
        counter++;
        if ( counter === len ) {
            console.log( 'All images loaded!' );
            fitToWidth();
        }
    }

}

function fitToWidth() {
    transformToFit()
    fitTextToImage()
    scrollCheck();
    

}
function scrollCheck()
{
    console.log("scrollCheck")
    let container=document.getElementById("stack");
    console.log("container ", container)
    container.addEventListener('scroll', function() {
        var element = document.querySelector('#image_element01');
        var position = element.getBoundingClientRect();
        console.log("position ", position)
    
        // checking whether fully visible
        if(position.top >= 0 && position.bottom <= window.innerHeight) {
            console.log('Element is fully visible in screen');
        }
    
        // checking for partial visibility
        if(position.top < window.innerHeight && position.bottom >= 0) {
            console.log('Element is partially visible in screen');
        }
    });
}


