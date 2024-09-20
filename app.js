const apiKey = 
'80e09e6491d0451cab319babf3f5e08d';

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=80e09e6491d0451cab319babf3f5e08d
`;
        // const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-09-18&to=2024-09-18&sortBy=popularity&apiKey=80e09e6491d0451cab319babf3f5e08d`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data");
        console.log(data);
        
        return data.articles;
        console.log("data");

    }catch(error){
        console.log("error fetching",error);
        return [];

    }
}

searchButton.addEventListener("click",async() => {
    const query = searchField.value.trim();
    if (query !== ""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlog(articles);
        }catch(error){
            console.log("Error fetching news by query?",error);

        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}
        &pageSize=10&apiKey=80e09e6491d0451cab319babf3f5e08d`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("data");
        console.log(data);
        
        return data.articles;
        console.log("data");
        
    }catch(error){
        console.log("error fetching",error);
        return [];
        
    }
}


function displayBlog(articles){
    blogContainer.innerHTML = ""
    articles.forEach((article) =>{
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        console.log(article.urlToImage);
        
        img.alt = article.title;
        const title = document.createElement("h2");
        
        const truncatedTitle = article.title.length > 30? article.title.slice(0,30) + "...." : article.title;
        title.textContent = truncatedTitle;
        
        const description = document.createElement("p");
        
        const truncatedDes = article.description.length > 120? article.description.slice(0,120) + "...." : article.description;
        
        
        description.textContent = truncatedDes;
        
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
            
        });
        blogContainer.appendChild(blogCard);
        
        
    });
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlog(articles);
        
    }catch(error){
        console.log("Error fetching random news",error);
        
    }
})();
// const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
// console.log("hii");