export default class Blog {
    constructor() {}

    toggleBlog() {
        const divs = document.getElementsByClassName('blog-post-title');

        [...divs].forEach(someDiv => someDiv.addEventListener('click', handler));

        // by default, all projectInHound are hidden
        hideElements("blog-post-body");


        function handler(event) {
            // get the clicked project's index :
            let projectIndex = getClickedProjectIndex(event);

            // toggle the right projectInhoud div :
            toggleDiv(document.getElementsByClassName("blog-post-body")[projectIndex]);
        }

        // hide all elements that have the provided class name
        function hideElements(className) {
            let elements = document.getElementsByClassName(className);

            [...elements].forEach(element => element.style.display = "none");
        }

        function getClickedProjectIndex(event) {
            var elements = document.getElementsByClassName("blog-post-title");
            var projectIndex = 0;

            [...elements].forEach((element, index) => {
                if (element.id == event.currentTarget.id) {
                    projectIndex = index;
                }
            });

            return projectIndex;
        }

        function toggleDiv(element) {

        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}

    // toggleBlog() {
    //     const body = document.querySelector('body');
    //     const toggleBlogBtn = document.querySelector('.fa-sort-down');
    //     const blogTextContent = document.querySelector('.blog-post-body');

    //     if (body.contains(toggleBlogBtn)) {
    //         toggleBlogBtn.addEventListener('click', () => {
    //             if (blogTextContent.style.display === "block") {
    //                 blogTextContent.style.display = "none";
    //             } else {
    //                 blogTextContent.style.display = "block";
    //             }
    //         });
    //     }
    // }
}