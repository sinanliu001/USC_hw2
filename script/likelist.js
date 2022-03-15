import {like_list, popular_movie_page} from 'fetch.js'

const like_list_container = document.querySelector('.like_list_container');
const like_list_drag_button = document.querySelector('.drag_button');

const like_list_drag_container = document.querySelector('.like_list_drag_container');
const drag_quit = document.querySelector('.drag_quit');
const drag_list = document.querySelector('.drag_list');
const drag_content = document.querySelector('.drag_content');

function like_list_order(list){
    let likefrag = document.createDocumentFragment();
    for (var index = 0; index < like_list.length; index++){

        let {poster_path,original_title,release_date} = like_list[index];
        let item = document.createElement("DIV");
        item.style.position = "relative";
        item.style.display = "flex";
        item.style.flexDirection = "column";
        item.id = index;

        let item_image = document.createElement("DIV");
        item_image.style.position = "absoulte"
        item_image.innerHTML = `<img id=${index} src="https://image.tmdb.org/t/p/w500${poster_path}">`
        item_image.style.height = "90%";
        item_image.firstChild.style.width = "100%"
        item_image.firstChild.style.height = "100%"
        
        let item_name = document.createElement("DIV");
        item_name.innerHTML = `<p> ${original_title} </p>`

        let item_date = document.createElement("DIV");
        item_date.innerHTML = `<p> ${release_date} </p>`

        item.appendChild(item_image);
        item.appendChild(item_name);
        item.appendChild(item_date);
        likefrag.appendChild(item);
    }
    like_list_container.appendChild(likefrag);
}
function draglistorder(){
    let dragrag = document.createDocumentFragment();
    for (var index = 0; index < like_list.length; index++){
        let {original_title} = like_list[index];
        let item = document.createElement("DIV");
        item.style.display = "block";
        item.style.borderStyle = "solid";
        item.style.borderRadius = ".5em"
        item.style.width = "400px"
        item.style.textAlign = "center";
        item.style.padding = "10px";
        item.id = index;
        item.className = "element";
        item.draggable = "true";
        // item.ondragstart = (e) => {console.log("hello")};

        item.innerHTML = `${original_title}`

        console.assert(item);
        dragrag.appendChild(item);
    }
    drag_list.appendChild(dragrag);
}
like_list_bar.addEventListener("click", e =>{
    if (popular_movie_page.style.display === ""){
        var like_list_page = setInterval(frame_like, 3);
            var deg = 0;
            function frame_like() {
              if (deg >= 90) {
                clearInterval(transition_like);
                popular_movie_page.style.display = "none";
                popular_movie_page.style. transform = `rotateY(0deg)`
                like_list_page.style.display = "flex";
                like_list_drag_button.style.display = "inline";
                like_list_container.innerHTML = "";
                like_list_order(like_list);
              } else {
                deg++;
                popular_movie_page.style. transform = `rotateY(${deg}deg)`;
              }
            }
    }
})

like_list_drag_button.addEventListener("click", e => {
    like_list_drag_container.style.display = "block";
    like_list_drag_container.style.zIndex = "10";
    drag_list.innerHTML = "";
    draglistorder();
})

// const mouseUpHandler = function(e) {
//     e.removeEventListener('mousemove', mouseMoveHandler);
//     e.removeEventListener('mouseup', mouseUpHandler);
//     console.
// };
function dragaction() {
    var dragged;
    drag_list.addEventListener("drag", (e) => {}, false)
    drag_list.addEventListener("dragstart", function(event) {
        // store a ref. on the dragged elem
        dragged = event.target;
        // make it half transparent
        drag_list.children[dragged.id].style.opacity = 0.5;});
    drag_list.addEventListener("dragend", function(event) {
        var dragged = event.target;
        // make it half transparent
        drag_list.children[dragged.id].style.opacity = 1;});
    drag_list.addEventListener("dragover", function(event) {
        event.preventDefault()});
    drag_list.addEventListener("dragenter", function(event) {
        // highlight potential drop target when the draggable element enters it
        // if (event.target.className == "dropzone") {
        //   event.target.style.background = "purple";
        // }
    });
      
    drag_list.addEventListener("dragleave", function(event) {
        // reset background of potential drop target when the draggable element leaves it
        // if (event.target.className == "dropzone") {
        //   event.target.style.background = "";
        // }
      
    });
    drag_list.addEventListener("drop", function(event) {
        // prevent default action (open as link for some elements)

        event.preventDefault();
        // move dragged elem to the selected drop target
        
        if (event.target.id&&event.id!==dragged.id) {
        //   event.target.style.background = "";
        //   dragged.parentNode.removeChild( dragged );
        //   event.target.appendChild( dragged );
            let frag = document.createDocumentFragment();
            const a = like_list[event.target.id];
            const b = like_list[dragged.id];
            like_list[event.target.id] = b;
            like_list[dragged.id] = a;
            drag_list.innerHTML = "";
            draglistorder();
            like_list_container.innerHTML = "";
            like_list_order(like_list);
    }});
    
}
dragaction();
drag_quit.addEventListener("click", (e)=>{
    like_list_drag_container.style.display = "none";
})