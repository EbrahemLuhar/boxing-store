export default class Blog {
    constructor() {}

    toggleBlog() {
        const body = document.querySelector('body');
        const toggleBlogBtn = document.querySelector('.fa-sort-down');
        const blogTextContent = document.querySelector('.blog-post-body');

        if (body.contains(toggleBlogBtn)) {
            toggleBlogBtn.addEventListener('click', () => {
                console.log('hi')
            });
        }
    }
}