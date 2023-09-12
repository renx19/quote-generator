const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const instagramButton = document.querySelector('.instagram');
const synth = speechSynthesis;

// Define an array of folders and their associated image file names
const imageSources = [
    { folder: "bg", images: ["q1.jpg", "q2.jpg", "q4.jpg", "q5.jpg", "q6.jpg", "q8.jpg", "q9.jpg", "q10.jpg"] },
    { folder: "bg", images: ["q3.jpg", "q7.jpg"] },
    // Add more folders and images as needed
];

function setRandomBackgroundImage() {
    // Randomly select a folder from the array
    const randomFolder = imageSources[Math.floor(Math.random() * imageSources.length)];

    // Randomly select an image from the selected folder
    const randomImage = randomFolder.images[Math.floor(Math.random() * randomFolder.images.length)];

    // Construct the image URL based on the selected folder and image name
    const randomImageUrl = `./${randomFolder.folder}/${randomImage}`;

    // Set the background image of the body element
    document.body.style.backgroundImage = `url(${randomImageUrl})`;
}

function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    // Change the background image as soon as the button is clicked
    setRandomBackgroundImage();

    fetch("https://api.quotable.io/random") // Use HTTPS here
        .then(response => response.json())
        .then(result => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}


speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} by ${authorName.innerText}`;
    window.open(tweetUrl, "_blank");
});


quoteBtn.addEventListener("click", randomQuote);

// Initial background image setup
setRandomBackgroundImage();

instagramButton.addEventListener('click', () => {
    // Define the Instagram profile URL you want to redirect to
    const instagramProfileURL = 'https://www.instagram.com/';
  
    // Open a new tab or window with the Instagram profile URL
    window.open(instagramProfileURL, '_blank');
  });