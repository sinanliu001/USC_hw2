like_list_bar.addEventListener("click", e =>{
    var transition_like = setInterval(frame_like, 3);
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
})