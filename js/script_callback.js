// News API
const articlesUrl =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=a60b30113efe4358b2ec57a610c4a5a8";

// Temporary backup file
const articlesBackup = "news_backup.json";

// the 'View Articles' button
const btnArticles = document.querySelector("#btn-articles");

// The 'Articles' section
const articlesSection = document.querySelector(".news-articles");

// Function that fetches JSONs from APIs - using callbacks
function getJSON(apiUrl, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl);

  xhr.onload = () => {
    if (xhr.status === 200) {
      const responseObject = JSON.parse(xhr.responseText);
      console.log(responseObject);
      return callback(responseObject);
    }
  };
  xhr.send();
}

// Display the articles
function displayArticles(newsObject) {
  const articles = newsObject.articles;
  for (let article of articles) {
    const articleElement = document.createElement("article");
    articlesSection.appendChild(articleElement);

    // Removing the 'chars' from the content
    let pattern = /\[\+\d+ chars\]/; // Regex - mathces '[+... chars]'
    let articleContent = article.content;
    if(articleContent !== null){
        articleContent = article.content.replace(pattern, "");
    }
    else{
      articleContent = '';
    }

    // Remove 'T' and 'Z' from publishedAt
    let articlePublishedAt = article.publishedAt;
    if(articlePublishedAt !== null){
      articlePublishedAt = article.publishedAt.replace('T', ' (Time: ').replace('Z', ')');
    }
    else{
      articlePublishedAt = '';
    }

    let articleAnchor = `<a href="${article.url}" title="Read more">Read more</a>`;
    
    // HTML content
    articleElement.innerHTML = `
        <h1>${article.title}</h1>
        <img src="${article.urlToImage}"><br>
        <span><b>Author(s):</b> ${article.author}</span></br>
        <span><b>Source ID:</b> ${article.source.id}</span><br>
        <span><b>Source Name:</b> ${article.source.name}</span><br>
        <span><b>Published at:</b> ${articlePublishedAt}<span><br><br>
        <span><b>Description:</b> ${article.description}</span><br><br>
        </span><b>Content:</b> ${articleContent}${articleAnchor}</span><br>
        `;
  }
}

// Event listeners
btnArticles.addEventListener("click", (e) => {
  getJSON(articlesUrl, displayArticles);
  e.target.remove(); // Remove the button
});
