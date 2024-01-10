selected_project = ""
const divs = document.querySelectorAll('.project-link');

divs.forEach(el => el.addEventListener('click', event => {
    console.log(event)
    console.log(event.target.attributes[1].value)
    console.log( event.target.attributes[1].value.nodeValue)
        if(selected_project != event.target.attributes[1].value){
            //Code for specific project
            if(selected_project != ""){
                document.getElementById(selected_project+"-content").style.display = "none";
            }
            selected_project = event.target.attributes[1].value;
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