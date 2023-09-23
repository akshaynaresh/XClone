// path: XClone/data.js
import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// tweetInput.addEventListener("keydown", function(event) {
//     const tweetText = tweetInput.value;
//     if(event.key === "Enter" && !event.shiftKey) {
//         event.preventDefault();
//         tweetBtn.click();
//         console.log(tweetText);
//     }
// })

document.addEventListener("click", function(e) {
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    }
    else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    }
    else if(e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    }
    else if(e.target.id === "tweet-btn") {
        handleTweetBtnClick();
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId;
    })[0]
    if(targetTweetObj.isLiked === false) {
        targetTweetObj.likes += 1;
    }
    else {
        targetTweetObj.likes -= 1;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render();
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId;
    })[0]
    if(targetTweetObj.isRetweeted === false) {
        targetTweetObj.retweets += 1;
    }
    else {
        targetTweetObj.retweets -= 1;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render();
}

function handleReplyClick(replyId) {
    const replyBtn = document.querySelector(`#replies-${replyId}`);
    replyBtn.classList.toggle("hidden");
}

function handleTweetBtnClick() {
    const tweetInput = document.querySelector("#tweet-input");
    if(tweetInput.value) {
        tweetsData.unshift({
            handle: `@aksnaresh`,
            profilePic: `images/img.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render();
        tweetInput.value = ""
    }
}

function tweetText() {
    let feedHhtml = ``;
    tweetsData.forEach(function(tweet) {

        let likeIconClass = '';
        if(tweet.isLiked) { 
            likeIconClass = 'liked' 
        }

        let retweetIconClass = '';
        if(tweet.isRetweeted) { 
            retweetIconClass = 'retweeted' 
        }

        let repliesHTMl = '';
        if(tweet.replies.length > 0) {
            tweet.replies.forEach(function(reply) {
                repliesHTMl +=
                `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                    </div>
                `
            })
        }

        feedHhtml += 
        `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" 
                                data-retweet="${tweet.uuid}"></i> 
                                ${tweet.retweets}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHTMl}
                </div>  
            </div>
        `
    })
    return feedHhtml;
}

function render() {
    document.querySelector("#feed").innerHTML = tweetText();
}
render();

