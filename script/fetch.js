
const movie_id_list = [];
const movie_list = [];

const loading_page = document.querySelector('.loading_page');
const popular_movie_page = document.querySelector('.popular_movie_page');
const like_list_page = document.querySelector('.like_list_page');

const movie_container = document.querySelector('.movie_container');

const pre_button = document.querySelector('.pre_button');
const next_button = document.querySelector('.next_button');
const button_text = document.querySelector('.text_botton');

const promise_array = [];
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
            return movie_list;
        }
    )
    .then(resource => indiv(resource))
    .catch(function (error) {console.log('moive_error')})

function count(data){
    // console.log(data['genres'].length);
    let list_number =  data['genres'].length;
    data['genres'].forEach(element => {
        let list_id = element['id'];
        // console.log(element);
        // console.log(list_id);
        movie_id_list.push(list_id);
    });
    console.log(movie_id_list);
    return movie_id_list;
}

function indiv(data){
    //background.style.backgroundImage = "url(../asset/amc.png)"
    console.log(data)
    loading_page.style.display = "none";
    
    // var span = document.createElement("SPAN");
    // var text = document.createTextNode("w");
    // span.appendChild(text);
    // background.appendChild(span);
    Init(data);
}
function Init(data){
    let frag = document.createDocumentFragment();
    popular_movie_page.style.display = "flex";
    for (var i = 0; i < 500; i++){
        let item = document.createElement("DIV");
        item.style.position = "relative";
        item.style.display = "flex";
        item.style.flexDirection = "column";
        
        let like_it_bar = document.createElement("DIV");
        like_it_bar.style.position = "absolute";
        like_it_bar.style.width = "100%";
        like_it_bar.style.backgroundColor = "#FFFFFF"
        like_it_bar.innerHTML = `<a class="${i}"}>like it</a>`;
        
        let item_image = document.createElement("DIV");
        item_image.style.position = "absoulte"
        item_image.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}">`
        item_image.style.height = "90%";
        item_image.firstChild.style.width = "100%"
        item_image.firstChild.style.height = "100%"
        
        let item_name = document.createElement("DIV");
        item_name.innerHTML = `<p> ${data[i].original_title} </p>`

        let item_date = document.createElement("DIV");
        item_date.innerHTML = `<p> ${data[i].release_date} </p>`

        item.appendChild(like_it_bar);
        item.appendChild(item_image);
        item.appendChild(item_name);
        item.appendChild(item_date);
        frag.appendChild(item);
    }
    movie_container.appendChild(frag);

}
