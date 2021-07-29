let videos_div = document.getElementById("videos");
    async function findVideo() {
        videos_div.innerHTML = null;
        let q = document.getElementById("query").value;

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=AIzaSyBRn-8EKid_53KRl9eVR6D4iVp4UQ9g0gA&maxResults=20`);
        let data = await res.json();

        let {items} = data;

        items = items.filter((el)=>{
            return el.id.videoId != undefined;
        });

        items.forEach(({ id: { videoId }, snippet: { title, description } }) => {
            let main_div = document.createElement("div");
            main_div.setAttribute("class", "videoDiv");

            let right_div = document.createElement("div");
            right_div.style.marginTop = "20px";
            
            let title_name = document.createElement("h2");
            title_name.innerText = `${title}`;
            
            let detail = document.createElement("p");
            detail.innerText = `${description}`;

            right_div.append(title_name,detail);

            let left_div = document.createElement("div");
            left_div.style.marginTop = "20px";

            left_div.innerHTML = `<iframe width="360" height="200" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            
            main_div.append(left_div,right_div)
            videos_div.append(main_div);
        
        });
        
    
    }