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
fetch('https://api.themoviedb.org/3/movie/550?api_key=f4fd559b706454d3e7876ad1c9d54257')
.then(res => 
    res.json()
)
.then(data => 
    console.log(data))
.catch(error => console.log('error'));
