import "subjx/dist/style/subjx.css";

import subjx from "subjx";

var zoom_value_formula = 1;

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


})();

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
    let scaleValue = 1;
    // if(maxWidth>container.clientWidth){
      scaleValue = container.clientWidth / maxWidth;
    if (scaleValue <= 1) {
      // scaleValue = container.clientWidth / maxWidth - 0.01;
      offsets_world.style.transform = `scale(${scaleValue-0.01})`;
    } else {
      // scaleValue = container.clientWidth / maxWidth - 0.2;
      
      offsets_world.style.transform = `scale(${scaleValue -0.1})`;
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
        zoom_value_formula = 1;
        offsets_world.style.transform = 'scale(1)';
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
    },
    onDestroy() {
        // fires on tool deactivation
    }
});


subjx('.clone').on('click', async () => {
    console.log("single");

});

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
    

}


