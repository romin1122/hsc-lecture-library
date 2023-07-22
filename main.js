let homepage = document.querySelector('#home');
        let subjectsList = document.querySelector('#subjectsList');
        let subjectContainer= document.querySelector("#subjects");
        
        let pages = [home];
        
        //let titles = ['Lecture Library'];
        
        let menuButtons = [document.querySelector('#menubtn0')]
        
        let bg = document.querySelector('#bg');
        
        let menuOpen = false;
        
        let showPage = (index) => {
            for( let i = 0; i < pages.length; i++) {
                if (i == index) { 
                    pages[i].style.display = 'block';
                    menuButtons[i].classList.add('active');
                }
                else {
                    pages[i].style.display = 'none';
                    menuButtons[i].classList.remove('active');
                }
            }
            
            bg.classList = 'c' + index;
            
            if (menuOpen) changemenuiconclass(document.querySelector('#menuicon'));
            
            window.scrollTo(0,0);
            
            //document.querySelector('title').innerHTML = titles[index];
        }
        
        for (let i = 0; i < linksObj.length; i++) {
            let div = document.createElement('div');
            div.id = linksObj[i].id;
            div.style.display = 'none';
            
            subjectContainer.appendChild(div);
            
            let subjectHeading = document.createElement('h3');
            subjectHeading.innerHTML = linksObj[i].subject;
            div.appendChild(subjectHeading);
            
            pages.push(div);
            
            for (let chapter of linksObj[i].chap) {
                let chapterContainer = document.createElement('div');
                
                div.appendChild(chapterContainer);
                
                let showChapter = document.createElement('button');
                showChapter.innerHTML = chapter.name + '<span class="dropdownarrow">↓</span></button>';
                chapterContainer.appendChild(showChapter);
                
                showChapter.classList = 'btn list-group-item list-group-item-action';
                
                let expanded = false;
                
                let linkNodes = [];
                
                showChapter.onclick = () => {
                    if (!expanded) {
                        
                        for (let link of chapter.links) {
                            let yt = document.createElement('lite-youtube');
                            yt.setAttribute("videoid", link);
                            yt.setAttribute("playlabel", "Lecture,,,");
                            linkNodes.push(yt);
                            
                            
                            chapterContainer.appendChild(yt);
                        }
                        
                        showChapter.innerHTML = chapter.name + '<span class="dropdownarrow">↑</span></button>';
                    } else {
                        for (let node of linkNodes) {
                            node.remove()
                        }
                        linkNodes = [];
                    
                        showChapter.innerHTML = chapter.name + '<span class="dropdownarrow">↓</span></button>';
                    }
                    
                    expanded = !expanded;
                }
            }
        }
        
        for(let i = 0; i < linksObj.length; i++) {
            let subject = linksObj[i];
            let name = subject.subject;
            let btn = document.createElement('button');
            btn.innerHTML = name;
            
            btn.classList ='list-group-item list-group-item-action';
            
            subjectsList.appendChild(btn);
            
            btn.onclick = () => {
                showPage(i + 1);
            }
            
            let menuButton = document.createElement('button');
            menuButton.innerHTML = name;
            
            menuButton.classList ='list-group-item list-group-item-action';
            document.querySelector("#menu").appendChild(menuButton);
            menuButtons.push(menuButton);
            
            
            menuButton.onclick = () => {
                showPage(i + 1);
            }
            
            //titles.push(name + ' | Lecture Library');
        }
        


let changemenuiconclass = (x) => {
    x.classList.toggle('change');
    
    if (!menuOpen) document.getElementById("menu").style.width = "250px";
    else document.getElementById("menu").style.width = "0";
    menuOpen = !menuOpen;
}