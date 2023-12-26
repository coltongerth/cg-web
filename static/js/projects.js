// const divs = document.querySelectorAll('.project-link');
selected_project = ""
// divs.forEach(el => el.addEventListener('click', event => {
//     if(selected_project != event.target.innerHTML){
//         //Code for specific project
//         selected_project = event.target.innerHTML
//         switch(selected_project) {
//             case "Fuelcast":
//                 document.getElementById("welcome-body").innerHTML = `{% include '/pages/Fuelcast.html' %}`;
//                 break;
//             case "HWPCarbon":
//                 document.getElementById("welcome-body").innerHTML = `{% include '/pages/HWPCarbon.html' %}`;
//                 break;
//             case "Global-Temperature-Visualizer":
//                 document.getElementById("welcome-body").innerHTML = `{% include '/pages/Global-Temperature-Visualizer.html' %}`;
//                 break;
//             case "Covid-DowJones-Visualizer":
//                 document.getElementById("welcome-body").innerHTML = `{% include '/pages/Covid-DowJones-Visualizer.html' %}`;
//                 break;
//             }
//     }
//     else{
//         document.getElementById("welcome-body").innerHTML = `{% include '/pages/welcome.html' %}`
//     }
// }));

const divs = document.querySelectorAll('.project-link');
divs.forEach(el => el.addEventListener('click', event => {
        if(selected_project != event.target.innerHTML){
            //Code for specific project
            if(selected_project != ""){
                document.getElementById(selected_project+"-content").style.display = "none";
            }
            selected_project = event.target.innerHTML;
            document.getElementById("welcome-content").style.display = "none";
            element_selected = document.getElementById(selected_project+"-content");
            element_selected.style.display = element_selected.style.display === 'none' ? '' : 'none';
        }
        else{
            element_selected = document.getElementById(selected_project+"-content");
            element_selected.style.display = "none";
            document.getElementById("welcome-content").style.display = "block";
            selected_project = ""
        }
    }));