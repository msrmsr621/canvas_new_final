import "subjx/dist/style/subjx.css";

import subjx from "subjx";

var zoom_value_formula = 1;
let scaleValue = 1;

// self executing function here
(function() {
    // your page initialization code here
    // the DOM will be available here

    document.getElementById("cacluate_position").onclick = calculatePosition;
    document.getElementById("zoom_canvas").onchange = changeZoomCanvas;

    const zoom_element = document.getElementById("zoom_canvas");
    let zoom_value = parseInt(zoom_element.value)/100;
    
    defaultSelectedZoomCanvas(zoom_value);

    checkAllImagesLoaded();
    document.addEventListener('mousemove',moveCursor)

})();


function fitTextToImage()
{
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

    let stack_container = document.getElementById("stack");
    let offsets_world = document.getElementById("world");

    scaleValue = stack_container.clientWidth / maxWidth;
    console.log("scaleValue ", scaleValue);
    if (scaleValue <= 1) {
      scaleValue=scaleValue- 0.01;
      offsets_world.style.transform = `scale(${scaleValue})`;
    } else {
      scaleValue=scaleValue- 0.1;
      offsets_world.style.transform = `scale(${scaleValue})`;
    }
    
    zoom_value_formula = 1 / scaleValue;

  }
function changeZoomCanvas(event) {
    console.log("doSomething", event);

    const zoom_element = event.target;
    console.log("zoom_element1 ", zoom_element);

    let zoom_value = parseInt(zoom_element.value)/100;

    defaultSelectedZoomCanvas(zoom_value)
}

function defaultSelectedZoomCanvas(zoom_value) {

    let offsets_world = document.getElementById('world');
    offsets_world.style.transformOrigin = '0px 0px';

    console.log("isNaN(zoom_value) ", isNaN(zoom_value));
    if(isNaN(zoom_value))
    {
        transformToFit();
    }
    else
    {
        zoom_value_formula = 1 / zoom_value;
        console.log("zoom_value_formula ", zoom_value_formula);
        offsets_world.style.transform = 'scale('+zoom_value+')';
    }

}

function calculatePosition() {

    // function getPage(pages,element)
    // {
    //     let page=0
    //     let elementTop=element[0].el.getClientRects()[0].top;
    //     arr.forEach((element,index) => {
    //         if(elementTop>element.getClientRects()[0].top)
    //         {
    //             page=index+1;
    //         }
    //     })
    //     return page;
    // }
    console.log("xDraggable ", xDraggable);
    let coords_combined=[];
    let page= document.getElementsByClassName("full-image");
    var arr = Array.prototype.slice.call( page)
    // console.log("page ", arr);
    let element_tops=[]
    let element_page=[]
    let page_tops=[]
    let pageIndex=0;
    let elementIndex=0;
    xDraggable.forEach((element)=>{
        let elementTop=element[0].el.getClientRects()[0].top;
        element_tops.push( elementTop)
        element_page.push(0)
    })
    arr.forEach((element)=>{
        let elementTop=element.getClientRects()[0].top;
        page_tops.push( elementTop)
    })
    elementIndex=element_tops.length-1
    pageIndex=page_tops.length-1
    while(elementIndex>=0)
    {
        while(elementIndex>=0&& element_tops[elementIndex]>page_tops[pageIndex])
        {
            element_page[elementIndex]=pageIndex;
            elementIndex-=1;
        }
        
            pageIndex-=1;
        
    }
    xDraggable.forEach((element,index) => {
        let coords={
            "top": "300",
            "left": "500",
            "width": "400",
            "height": "100",
            "page": 1,
            "documents_top": "3000",
            "image_height": "2000",
            "image_width": "2500",
            "document_snapshot": "1448/samplepdf-263202311210/images/sample-1.png",
            "document_key": "1448/742942632023112059_sample.pdf",
            "element_id": "signature-fry28YPQQE"
            };
            console.log();
            // console.log("page",getPage(arr,element));
            coords["page"]=element_page[index]+1;
            let page_top=arr[coords["page"]-1].getClientRects()[0].top;
            coords["top"]=(element[0].el.getClientRects()[0].top-page_top)*zoom_value_formula;
            coords["left"]=(element[0].el.getClientRects()[0].left)*zoom_value_formula;
            coords["width"]=element[0].el.getClientRects()[0].width;
            coords["height"]=element[0].el.getClientRects()[0].height;
            coords["documents_top"]=(element[0].el.getClientRects()[0].top-arr[0].getClientRects()[0].top)*zoom_value_formula;
            coords["image_height"]=arr[coords["page"]-1].getClientRects()[0].height;
            coords["image_width"]=arr[coords["page"]-1].getClientRects()[0].width;
            coords["document_snapshot"]=arr[coords["page"]-1].getAttribute("snapshots_name");
            coords["document_key"]=arr[coords["page"]-1].getAttribute("document_key");
            coords["element_id"]=element[0].el.getElementsByTagName("img")[0].getAttribute("id");
            coords_combined.push(coords);



    });
    console.log("coords_combined ", coords_combined);


}

let clicked = false;
let elementToBeCloned = null;
let elementToBeClonedDup = null;

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

let xDraggable = [];

function cloneElement(e,el){

        console.log("onDrop e ", e);
        console.log("onDrop el ", el);
        // console.log("onDrop clone ", clone);
        let parent = document.getElementById("world");

        // console.log(xDraggable.length)
        const stack = subjx('#world')[0],
            offset = stack.getBoundingClientRect(),
            drag_div = document.createElement('div');

        // drag_div.setAttribute("id", "item_"+(xDraggable_length+1));
        drag_div.setAttribute("class", "draggable");
        drag_div.setAttribute("document_id", e.target.id);
        drag_div.style.top = `${(e.clientY - offset.top)*zoom_value_formula}px`;
        drag_div.style.left = `${(e.clientX - offset.left)*zoom_value_formula}px`;

        console.log("top ", e.clientY, " ", offset.top, " -> ", ((e.clientY - offset.top) * zoom_value_formula));
        console.log("left ", e.clientX, " ", offset.left, " -> ", ((e.clientX - offset.left) * zoom_value_formula));

        let drag_img = document.createElement('img');
        drag_img.style.background = "url('https://wesign.com/assets/images_dev/sign_box_2.png') 50% center / contain no-repeat, rgb(255, 214, 91)";
        drag_img.style.opacity = 0.8;
        drag_img.style.border =  '1px solid rgb(255, 255, 118)';
        drag_img.style.borderRadius =  '5px';
        drag_img.style.width = '100%';
        drag_img.style.height =  '100%';

        const drag_element_name = el.getAttribute("drag_element_name");
        drag_img.id = makeId(drag_element_name);

        drag_div.appendChild(drag_img);
        parent.appendChild(drag_div);

        xDraggable.push(
            subjx(drag_div).drag(options)
        );

}
function CloneElementUsingXY(clientX,clientY,target_id)
{

        // console.log("onDrop clone ", clone);
        let parent = document.getElementById("world");

        // console.log(xDraggable.length)
        const stack = subjx('#world')[0],
            offset = stack.getBoundingClientRect(),
            drag_div = document.createElement('div');

        // drag_div.setAttribute("id", "item_"+(xDraggable_length+1));
        drag_div.setAttribute("class", "draggable");
        drag_div.setAttribute("document_id", target_id);
        drag_div.style.top = `${(clientY - offset.top)*zoom_value_formula}px`;
        drag_div.style.left = `${(clientX - offset.left)*zoom_value_formula}px`;

        console.log("top ", clientY, " ", offset.top, " -> ", ((clientY - offset.top) * zoom_value_formula));
        console.log("left ", clientX, " ", offset.left, " -> ", ((clientX - offset.left) * zoom_value_formula));

        let drag_img = document.createElement('img');
        drag_img.style.background = "url('https://wesign.com/assets/images_dev/sign_box_2.png') 50% center / contain no-repeat, rgb(255, 214, 91)";
        drag_img.style.opacity = 0.8;
        drag_img.style.border =  '1px solid rgb(255, 255, 118)';
        drag_img.style.borderRadius =  '5px';
        drag_img.style.width = '100%';
        drag_img.style.height =  '100%';

        const drag_element_name = el.getAttribute("drag_element_name");
        drag_img.id = makeId(drag_element_name);
        
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

        
        // let drag_div = document.createElement('div');
        // let drag_img = document.createElement('img');
        // drag_img.style.background = "url('https://wesign.com/assets/images_dev/sign_box_2.png') 50% center / contain no-repeat, rgb(255, 214, 91)";
        // drag_img.style.opacity = 0.8;
        // drag_img.style.border =  '1px solid rgb(255, 255, 118)';
        // drag_img.style.borderRadius =  '5px';
        // drag_img.style.width = '100%';
        // drag_img.style.height =  '100%';
        // drag_div.appendChild(drag_img);
        // drag_div.setAttribute("class", "draggable");
        // elementToBeCloned = el;
        // elementToBeClonedDup=elementToBeCloned.cloneNode(true);
        // elementToBeClonedDup.textContent="";
        // elementToBeClonedDup.style.zIndex=1000;
        // elementToBeClonedDup.appendChild(drag_div);
        // let container=document.getElementById("container");
        // elementToBeClonedDup.style.display="none";
        // elementToBeClonedDup.style.position="fixed";
        // elementToBeClonedDup.style.pointerEvents="none";
        // elementToBeClonedDup.style.transform = `scale(${scaleValue})`;
        // container.appendChild(elementToBeClonedDup);
        
        
    },
    onMove(dx, dy) {
        
        // clicked = true;
    },
    onDrop(e, el, clone) {
        // fires on drop
        console.log("onDrop e ", e);
        console.log("onDrop el ", el);
        console.log("onDrop clone ", clone);
        cloneElement(e,el);
        clicked = false;
        
    },
    onDestroy() {
        // fires on tool deactivation
        clicked = false;
    }
});

subjx('#container').on('click', async (a) => {
    console.log("a ", a);
    console.log("elementToBeCloned ", elementToBeCloned);
    if(clicked == true)
    {
        clicked = false;
        cloneElement(a,elementToBeCloned);
        let container=document.getElementById("container");
        container.removeChild(elementToBeClonedDup);
    }
});


function moveCursor(event)
{
    // console.log("moveCursor ", event)
    const mouseY= event.clientY;
    const mouseX= event.clientX;
    let element=document.getElementById("container");
    const isHover = e => e.parentElement.querySelector(':hover') === e;
    if(clicked == true && isHover(element) && elementToBeClonedDup)
    {
        elementToBeClonedDup.style.left = mouseX + "px";
        elementToBeClonedDup.style.top = mouseY + "px";
        elementToBeClonedDup.style.display="block";
        elementToBeClonedDup.style.zIndex=1000;
    }
    else if(elementToBeClonedDup)
    {
        elementToBeClonedDup.style.display="none";
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
        container.removeChild(elementToBeClonedDup);        
    }
    else
    {
        setTimeout(()=>{clicked = true;},1)
        let drag_div = document.createElement('div');
        let drag_img = document.createElement('img');
        drag_img.style.background = "url('https://wesign.com/assets/images_dev/sign_box_2.png') 50% center / contain no-repeat, rgb(255, 214, 91)";
        drag_img.style.opacity = 0.8;
        drag_img.style.border =  '1px solid rgb(255, 255, 118)';
        drag_img.style.borderRadius =  '5px';
        drag_img.style.width = '100%';
        drag_img.style.height =  '100%';
        drag_div.appendChild(drag_img);
        drag_div.setAttribute("class", "draggable");
        
        // drag_div.style.top = `${(clientY - offset.top)*zoom_value_formula}px`;
        // drag_div.style.left = `${(clientX - offset.left)*zoom_value_formula}px`;
        
        elementToBeCloned = el;
        elementToBeClonedDup=elementToBeCloned.cloneNode(true);
        elementToBeClonedDup.textContent="";
        elementToBeClonedDup.appendChild(drag_div);
        let container=document.getElementById("container");
        elementToBeClonedDup.style.display="none";
        elementToBeClonedDup.style.position="fixed";
        elementToBeClonedDup.style.pointerEvents="none";
        elementToBeClonedDup.style.zIndex=1000;
        elementToBeClonedDup.style.transform = `scale(${scaleValue})`;


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
    let containerMid=containerStart+(containerEnd-containerStart)/2

    let maxPercentage=0
    let maxDiv=null;
    divs.forEach((div) => {

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
    let visibleStart=Math.max(containerStart,maxDivRect.y)
    CloneElementUsingXY(maxDivRect.x,visibleStart,maxDiv.id)

});

subjx(".removePointer").on('click',async (a)=>{
    if(clicked == true)
    {
        clicked = false;
        let container=document.getElementById("container");
        // container.removeChild(elementToBeClonedDup);
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
    // transformToFit()
    fitTextToImage()
}

function makeId(prefix) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix + "-" + result;
}


