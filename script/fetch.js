
const movie_id_list = [];
const movie_list = [];

const loading_page = document.querySelector('.loading_page');
const popular_movie_page = document.querySelector('.popular_movie_page');
const like_list_page = document.querySelector('.like_list_page');

const movie_container = document.querySelector('.movie_container');

const box_bar = document.querySelector('.box_bar');
const pre_button = document.querySelector('.pre_button');
const next_button = document.querySelector('.next_button');
const button_text = document.querySelector('.text_botton');

const promise_array = [];
let page_button;
let max_page;

const movie_detail = document.querySelector('.detail');
const detail_bg = document.querySelector('.detail_background');
const detail_img = document.querySelector('.detail_pic');
const detail_content = document.querySelector('.datail_content');
const detail_text = document.querySelector('.detail_text');
const detail_exist = document.querySelector('.exit');


const color = ['red', 'blue', 'green', 'yellow'];
var color_counter = 0;

const like_list = [];
const like_list_bar = document.querySelector('.like_list');
const like_list_bub = document.querySelector('.like_list_length');
const nav_bar = document.querySelector('.nav-bar');

const like_list_container = document.querySelector('.like_list_container');

for (var i = 1; i < 502; i++)(
    promise_array.push(fetch(
       'https://api.themoviedb.org/3/movie/popular?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&page='+i))
)
console.log(promise_array.length);


fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US')
.then(res => 
    {return res.json();}
)
.then(data => count(data))
.catch(error => console.log('error'));

Promise.all(promise_array)
    .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    })
    .then(
        function (data) {
            // console.log(data)
            // console.log(movie_id_list)
             for (var i = 0; i < data.length; i++){
                if (data[i].results){
                    data[i].results.forEach(
                        element => movie_list.push(element)
                    )
                }
            }
            max_page = data.length/500;
            return movie_list;
        }
    )
    .then(resource => indiv(resource))
    .catch(function (error) {console.log('moive_error')})

function count(data){
    // console.log(data['genres'].length);
    let list_number =  data['genres'].length;
    data['genres'].forEach(element => {
        // console.log(element);
        // console.log(list_id);
        movie_id_list.push(element);
    });
    console.log(movie_id_list);
    return movie_id_list;
}

function indiv(data){
    //background.style.backgroundImage = "url(../asset/amc.png)"
    console.log(data)
    loading_page.style.display = "none";
    popular_movie_page.style.display = "flex";
    // var span = document.createElement("SPAN");
    // var text = document.createTextNode("w");
    // span.appendChild(text);
    // background.appendChild(span);
    page_rend();

    box_bar.addEventListener("click", (e) => {
        // e.target
        if (e.target.className!== undefined) {
          page_button = e.target;
          page_rend();
        }
      });
    movie_container.addEventListener("mouseover", (e)=>
    {
        if(e.target.id){
            let item_sellect = movie_container.children[e.target.id];
            var id = e.target.id;
            let sellect_text = item_sellect.firstChild;
            sellect_text.style.display = "flex";
            var transition = setInterval(frame, 10);
            var width = 0;
            function frame() {
              if (width >= 100) {
                clearInterval(transition);
              } else {
                width++;
                sellect_text.firstChild.style.width = width + '%';
              }
            }
            item_sellect.addEventListener("mouseleave", (e)=>
            {
                sellect_text.style.display = "none";
            });
            sellect_text.addEventListener("mousedown", e=> {
                const index = like_list.findIndex(object => object.id === movie_list[id].id);
                if (index === -1){
                    like_list.push(movie_list[id]);
                }
                console.log(like_list);
                if (like_list.length>0){
                    like_list_bar.style.display = "block";
                    like_list_bub.innerHTML = `<a>${like_list.length}</a>`;
                    
                }
            });
            sellect_text.addEventListener("click", e => console.log("hello"))

            item_sellect.addEventListener("click", e=>
            {
                if (e.target.id){
                    movie_detail.style.display = "flex";
                    movie_container.style.display = "none";
                    movie_detail.style.zIndex = "99";
                    detail_bg.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie_list[e.currentTarget.id].backdrop_path}')`;

                    detail_img.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${movie_list[e.currentTarget.id].poster_path}')`;

                    let frag_click = document.createDocumentFragment();

                    let movie_name = document.createElement("DIV");
                    movie_name.innerHTML = `<p>${movie_list[e.currentTarget.id].original_title}</p>`;
                    movie_name.style.fontSize = "2em";

                    let gen_list = document.createElement("DIV");
                    gen_list.style.display = "flex";
                    gen_list.style.justifyContent = "space-between";
                    gen_list.style.gap = "10px";
                    movie_list[e.currentTarget.id].genre_ids.forEach(
                        element => {
                            let item_gener = document.createElement("DIV");
                            let text = `<a style="background-color:${color[color_counter]}">${movie_id_list.find(x => x.id === element).name}</a>`;
                            let result= text.fontcolor("white");
                            item_gener.innerHTML = result;
                            item_gener.style.font = "italic bold 20px arial,serif";
                            color_counter++;
                            if (color_counter === color.length){
                                color_counter = 0;
                            }
                            gen_list.appendChild(item_gener);
                        }
                    )

                    let movie_intro = document.createElement("DIV")
                    movie_intro.innerHTML = `<p>${movie_list[e.currentTarget.id].overview}</p>`
                    movie_intro.style.width = "30vw"; 
                    
                    let logo_list = document.createElement("DIV");
                    logo_list.style.width = "40vw";
                    logo_list.style.minHeight = "10vh";
                    logo_list.style.background = "gray";

                    frag_click.appendChild(movie_name);
                    frag_click.appendChild(gen_list);
                    frag_click.appendChild(movie_intro);
                    frag_click.appendChild(logo_list);
                    console.log(movie_list[e.currentTarget.id]);
                    detail_text.innerHTML = "";
                    detail_text.appendChild(frag_click);

                    let movie_supporter = document.createElement("DIV");
                    movie_supporter.style.display ="flex";
                    movie_supporter.style.flexWrap = "wrap";
                    movie_supporter.style.alignItems = "center";
                    fetch(`https://api.themoviedb.org/3/movie/${movie_list[e.currentTarget.id].id}?api_key=f4fd559b706454d3e7876ad1c9d54257`)
                    .then(res => res.json())
                    .then(data =>{
                        let comp_list = data.production_companies;
                        let logo_frg = document.createDocumentFragment();
                        comp_list.forEach(
                            element => {
                                let logo = element.logo_path;
                                if (logo){
                                    console.log(logo);
                                    let logo_path =  document.createElement('img');
                                    logo_path.src = `https://image.tmdb.org/t/p/w200${logo}`;
                                    logo_path.width = "80";
                                    logo_frg.appendChild(logo_path);
                                }
                            }
                        )
                        detail_text.lastChild.appendChild(logo_frg);
                    }).catch(error => console.log('comp_error'))
                }
                    
            });
            
        }
    })

}
function Pagechange(){
    var page_number = 0;
    return function (){
        var i, j;
        if (!page_button){
            pre_button.disabled = true;
            i = 0;
        } else if (page_button.classList.contains('next_button')){
            page_number++;
            i = page_number * 500;
            if (page_number===max_page) next_button.disabled = true;
            else {
                pre_button.disabled = false;
            };
        } else if (page_button.classList.contains('pre_button')){
            page_number--;
            i = page_number * 500;
            if (page_number===0) pre_button.disabled = true;
            else {
                next_button.disabled = false;
            };
        } else {return;}
        button_text.innerHTML = `Page ${page_number + 1}: total 500 of ${movie_list.length} popular movie`
        let frag = document.createDocumentFragment();
        movie_container.innerHTML = "";
        for (var x = 0; x < 500; x++){
            let item = document.createElement("DIV");
            item.style.position = "relative";
            item.style.display = "flex";
            item.style.flexDirection = "column";
            item.id = x+i;

            let like_it_bar = document.createElement("DIV");
            like_it_bar.style.display = "none";
            like_it_bar.style.width = "100%";
            like_it_bar.style.position = "absolute";

            let like_it_text = document.createElement("a");
            like_it_text.innerHTML = `like it`;
            like_it_text.href = `javascript:add_like_list();`
            like_it_text.style.onclick = add_like_list();
            like_it_text.style.fontColor = "red";
            
            like_it_text.style.backgroundColor = "white";
            like_it_text.style.width = "30%";

            let like_it_process = document.createElement("DIV");
            like_it_process.style.backgroundColor = "white";
            like_it_process.style.width = "0%";

            like_it_bar.appendChild(like_it_text);
            like_it_bar.appendChild(like_it_process);

            let item_image = document.createElement("DIV");
            item_image.style.position = "absoulte"
            item_image.innerHTML = `<img id=${x} src="https://image.tmdb.org/t/p/w500${movie_list[x+i].poster_path}">`
            item_image.style.height = "90%";
            item_image.firstChild.style.width = "100%"
            item_image.firstChild.style.height = "100%"
            
            let item_name = document.createElement("DIV");
            item_name.innerHTML = `<p> ${movie_list[x+i].original_title} </p>`
    
            let item_date = document.createElement("DIV");
            item_date.innerHTML = `<p> ${movie_list[x+i].release_date} </p>`
    
            item.appendChild(like_it_bar);
            item.appendChild(item_image);
            item.appendChild(item_name);
            item.appendChild(item_date);
            frag.appendChild(item);
        }
        movie_container.appendChild(frag);
    }
}

var page_rend = Pagechange();
detail_exist.addEventListener("click", (e) => {
    movie_detail.style.display = "none";
    movie_container.style.display = "grid";
})
function add_like_list(){
    console.log("hello");
}
like_list_bar.addEventListener("click", e =>{
    var transition_like = setInterval(frame_like, 3);
            var deg = 0;
            function frame_like() {
              if (deg >= 90) {
                clearInterval(transition_like);
                popular_movie_page.style.display = "none";
                popular_movie_page.style. transform = `rotateY(0deg)`
                like_list_page.style.display = "flex";
                for (var index = 0; i < like_list.length; i++){
                    console.log(like_list[index]);
                    let likefrag = document.createDocumentFragment();

                }
              } else {
                deg++;
                popular_movie_page.style. transform = `rotateY(${deg}deg)`;
              }
            }
})