const postContainer = document.getElementById('post-container');
const filter = document.getElementById('filter');
const loader = document.querySelector('.loader');

let limit = 4;
let page = 1;

// fetch posts from api
async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await res.json();

    return data;
}

// show posts in dom
async function showPosts() {
    const posts = await getPosts();

    posts.forEach((post) => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2>${post.title}</h2>
            </div>
            <p class="post-body">${post.body}</p>
        `;
        postContainer.appendChild(postEl);
    });
}

showPosts();

function showLoader() {
    // adding and removing loader
    loader.classList.add('show');
    setTimeout(() => {
        loader.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);

}

function filterPosts(e) {
    const searchTerm = e.target.value.toLowerCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) => {
        const title = post.querySelector('.post-info').innerText.toLowerCase();
        const body = post.querySelector('.post-body').innerText.toLowerCase();

        if(title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1){
            post.style.display = 'flex';
        }else {
            post.style.display = 'none'
        }
    })
}

// scroll event
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoader();
    }
});

// search event
filter.addEventListener('input', filterPosts)