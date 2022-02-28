// let url = 'https://api.themoviedb.org/3/movie/550?api_key=f4fd559b706454d3e7876ad1c9d54257';
// fetch(url, option).then(res => res.joson()).then(data => console.log(data))
// const fetchData = (url, method) => {
//     let x = new xmlhttprequire();
//     return new promise(() => {
//         x.onreadystatechange = function() {}
//         if (xhr.readystate !== 4) return;
//         if (xhr.status >= 200 && x.stuats <300) resolve(x);
//         else {reject('err')}
//     })
//     x.open(method,url, ture)
//     x.send()
// }
const movie_id_list = [];
const movie_list = [];

let background = document.querySelector('.movie_container');
background.innerHTML = 'loading';

let pre_button = document.querySelector('.pre_button');
let next_button = document.querySelector('.next_button');
let button_text = document.querySelector('.text_botton');


fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US')
.then(res => 
    {return res.json();}
)
.then(data => count(data))
.then(list => {
    movie(list)})
.catch(error => console.log('error'));

function count(data){
    // console.log(data['genres'].length);
    let list_number =  data['genres'].length;
    data['genres'].forEach(element => {
        let list_id = element['id'];
        // console.log(element);
        // console.log(list_id);
        movie_id_list.push(list_id);
    });
    // console.log(movie_id_list);
    return movie_id_list;
}
function movie(list){
    let promise_array = [];
    list.forEach(
        element => promise_array.push(fetch('https://api.themoviedb.org/3/list/'+element+'?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US'))
    )
    // console.log(promise_array)
    Promise.all(promise_array)
    .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    })
    .then(
        function (data) {
             for (var i = 0; i < data.length; i++){
                if (data[i].items){
                    data[i].items.forEach(
                        element => movie_list.push(element)
                    )
                }
            }
            return movie_list;
        }
    )
    .then(resource => indiv(resource))
    .catch(function (error) {console.log('moive_error')})
}
function indiv(data){
    //background.style.backgroundImage = "url(../asset/amc.png)"
    console.log('hello')
}
