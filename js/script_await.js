// News API
const articlesUrl =
  "https://newsdata.io/api/1/news?apikey=pub_31977c60d5c693cc12f5003c086592182553b&country=ke,tz,ug&language=en,sw";

// the 'View Articles' button
const btnArticles = document.querySelector("#btn-articles");

// The 'Articles' section
const articlesSection = document.querySelector(".news-articles");

// Function that fetches JSONs from APIs - using await
async function getJSON(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Response is not OK");
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    displayArticles(data);
  } catch (err) {
    console.error("Error: " + err);
  }
}

// Display an array of elements in a span
function arrayToSpan(array, title) {
  let span = document.createElement("span");
  span.innerHTML = `<b>${title}:</b> `;
  if (array !== null) {
    for (let i = 0; i < array.length; i++) {
      if (i !== array.length - 1) {
        span.innerHTML += `${array[i]}, `;
      } else {
        span.innerHTML += array[i];
      }
    }
  }
  return span;
}

// Display the articles
function displayArticles(newsObject) {
  const results = newsObject.results;
  for (let result of results) {
    const articleElement = document.createElement("article");

    // Title
    let articleTitle = document.createElement("h1");
    articleTitle.textContent = result.title;

    // Creators
    let spanCreator = arrayToSpan(result.creator, "Creators");

    // Video
    let spanVideo = document.createElement("span");
    let videoUrl = result.video_url
    if (result.video_url !== null) {
      spanVideo.innerHTML = `
      <b>Video:</b> <a href="${videoUrl}">Click to watch</a>`;
    } else {
      spanVideo.innerHTML = `
      <b>Video:</b> ${videoUrl}`;
    }

    // Description
    let paraDescription = document.createElement("p");
    let newDescription = result.description;
    if (result.description !== null) {
      newDescription = result.description.replace("[...]", "...");
    }
    paraDescription.innerHTML = `
    <b>Description:</b> ${newDescription}`;

    // Content
    let paraContent = document.createElement("p");
    let newContent = result.content;
    if (newContent !== null) {
      newContent = result.content.slice(0, 2000);
      newContent += " ...";
    }

    let articleLink = result.link;
    if (articleLink !== null) {
      paraContent.innerHTML = `
    <b>Content:</b> ${newContent}<a href="${articleLink}">Read More</a>`;
    }else{
      paraContent.innerHTML = `
      <b>Content:</b> ${newContent}`;
    }
    // Published Date
    let spanPublished = document.createElement("span");
    spanPublished.innerHTML = `
    <b>Published:</b> ${result.pubDate}`;

    // Image
    let articleImage = document.createElement("img");
    if (result.image_url !== null) {
      articleImage.src = result.image_url;
    } else {
      articleImage.src = "../img/default-image.jpg";
    }

    // Source id
    let spanSourceId = document.createElement("span");
    spanSourceId.innerHTML = `
    <b>Source ID:</b> ${result.source_id}`;

    // Country
    let spanCountry = arrayToSpan(result.country, "Countries");

    // Category
    let spanCategory = arrayToSpan(result.category, "Categories");

    // Language
    let spanLanguage = document.createElement("span");
    spanLanguage.innerHTML = `
    <b>Language:</b> ${result.language}
    `;

    // Append all sub-elements to the article element
    let subElements = [
      articleTitle,
      articleImage,
      spanSourceId,
      spanCategory,
      spanCreator,
      spanLanguage,
      spanCountry,
      spanPublished,
      spanVideo,
      paraContent,
      paraDescription,
    ];

    for (let subElement of subElements) {
      let br = document.createElement("br"); // Line break
      articleElement.appendChild(subElement);
      articleElement.appendChild(br);
    }
    articlesSection.appendChild(articleElement);
  }
}

// Event listeners
btnArticles.addEventListener("click", (e) => {
  getJSON(articlesUrl);
  e.target.remove(); // Remove the button
});
