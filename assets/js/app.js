let app = Vue.createApp({
    data: function () {
        return {
            page: 0,
            category: '',
            posts: '',
            currentPostsSet: '',
            popularPosts: '',
            recentPosts: '',
            currentPost: ''
        }
    },
    async mounted() {
        const posts = await fetch('../assets/data/posts.json?4')
        const posts_data = await posts.json()
        this.posts = posts_data
        this.currentPostsSet = this.posts.slice(0)
        this.setPopular()
        this.setRecent()
    },
    methods: {
        changePage(i) {
            const element = document.querySelector(".page");
            element.scrollIntoView();
            this.page = i;
            this.category = '';
            this.currentPostsSet = this.posts;
        },
        changeCategory(category) {
            this.changePage(1);
            this.category = category;
            this.filterByCategory(category);
        },
        setPopular() {
            this.popularPosts = this.posts.slice(0).sort((a, b) => {
                return b.like - a.like;
            }).slice(0, 5);
        },
        setRecent() {
            this.recentPosts = this.posts.slice(0).sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }).slice(0, 6)
        },
        choosePost(id) {
            this.currentPost = this.posts.slice(0).filter(post => post.id == id)[0];
            this.changePage(2);
        },
        filterByCategory(category) {
            this.currentPostsSet = this.posts.slice(0).filter(post => post.category == category);
        },
        searchPosts() {
            let match = document.querySelector("#search").value;
            this.changePage(1);
            this.currentPostsSet = this.posts
                .slice(0)
                .filter(post =>
                    post.title.toLowerCase().includes(match.toLowerCase()) ||
                    post.content.toLowerCase().includes(match.toLowerCase())
                )
        }
    },
    template: `
        <div class="app">
            <div class="component">
                <top-component :searchPosts="searchPosts" />
            </div>
            <div class="component">
                <header-component :changePage="changePage" />
            </div>
            <div class="component">
                <main-component :page="page" :changeCategory="changeCategory" :popularPosts="popularPosts" :recentPosts="recentPosts"
                                :category="category" :choosePost="choosePost" :currentPostsSet="currentPostsSet" :currentPost="currentPost" />
            </div>
            <div class="component">
                <footer-component />
            </div>
         </div>
    `
})

app.component('top-component', {
    template: `
        <div class="top" id="top">
            <div class="top__outer">
                <div class="container">
                    <div class="top__inner">
                        <socials-component />
                        <div class="top__search-block">
                            <input class="top__input" type="text" placeholder="Search Anything..." id="search">
                            <span class="top__button" @click="searchPosts"><i class="fa fa-search" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ["searchPosts"]
})

app.component('header-component', {
    template: `
        <div class="header">
            <div class="header__inner">
                <div class="container">
                    <div class="header__info">
                        <div class="header__logo" @click="changePage(0)">
                            Tasty Blog
                        </div>
                        <div class="header__menu">
                            <div href="" class="header__item" @click="changePage(0)">Home</div>
                            <a href="#about" class="header__item">About</a>
                            <div href="" class="header__item" @click="changePage(1)">Blog</div>
                            <a href="#categories" class="header__item">Categories</a>
                            <a href="#popular" class="header__item">Popular</a>
                            <a href="#contacts" class="header__item">Contacts</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ["changePage"]
})

app.component('main-component', {
    template: `
        <div class="main">
            <div class="gallery">
                <div class="gallery__inner">
                    <div class="gallery__item">
                        <div class="gallery__info">
                            <div class="gallery__meta">
                                March 11, 2023 | 100 comments
                            </div>
                            <div class="gallery__title">
                                I’ve Come and I’m Gone: A Tribute to Istanbul’s Street
                            </div>
                        </div>
                    </div>
                    <div class="gallery__item">
                        <div class="gallery__info">
                                <div class="gallery__meta">
                                    March 11, 2023 | 100 comments
                                </div>
                                <div class="gallery__title">
                                    I’ve Come and I’m Gone: A Tribute to Istanbul’s Street
                                </div>
                            </div>
                        </div>
                    <div class="gallery__item">
                        <div class="gallery__info">
                                <div class="gallery__meta">
                                    March 11, 2023 | 100 comments
                                </div>
                                <div class="gallery__title">
                                    I’ve Come and I’m Gone: A Tribute to Istanbul’s Street
                                </div>
                            </div>
                        </div>
                    <div class="gallery__item">
                        <div class="gallery__info">
                            <div class="gallery__meta">
                                March 11, 2023 | 100 comments
                            </div>
                            <div class="gallery__title">
                                I’ve Come and I’m Gone: A Tribute to Istanbul’s Street
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="categories" id="categories">
                    <div class="categories__inner">
                        <div class="categories__list">
                            <div class="categories__item">
                                <div class="categories__link" @click="changeCategory('food')">
                                    Food
                                </div>
                            </div>
                            <div class="categories__item">
                                <div class="categories__link" @click="changeCategory('cooking')">
                                    Cooking
                                </div>
                            </div>
                            <div class="categories__item">
                                <div class="categories__link" @click="changeCategory('lifestyle')">
                                    Lifestyle
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <page-component :page="page" :category="category" :choosePost="choosePost" :recentPosts="recentPosts"
                                :currentPostsSet="currentPostsSet" :popularPosts="popularPosts" :currentPost="currentPost" />
            </div>
        </div>
    `,
    props: ["page", "changeCategory", "category", "choosePost",
        "currentPostsSet", "popularPosts", "recentPosts", "currentPost"]
})

app.component('page-component', {
    template: `
        <div class="page">
            <div class="page__inner">
                <div class="content">
                    <div class="content__inner">
                        <div class="component">
                            <home-component v-if="page==0" :choosePost="choosePost"
                                            :popular="popularPosts[0]" :recentPosts="recentPosts" />
                        </div>
                        <div class="component">
                            <blog-component :category="category" v-if="page==1"
                                            :choosePost="choosePost" :currentPostsSet="currentPostsSet" />
                        </div>
                        <div class="component">
                            <blog-page-component v-if="page==2" :choosePost="choosePost"
                                                :currentPostsSet="currentPostsSet" :currentPost="currentPost" />
                        </div>
                    </div>
                </div>
                <sidebar-component :choosePost="choosePost" :popularPosts="popularPosts" />
            </div>
        </div>
    `,
    props: ["page", "category", "choosePost", "currentPostsSet", "popularPosts", "recentPosts", "currentPost"]
})

app.component('home-component', {
    template: `
        <div class="home">
            <div class="home__inner">
                <div class="content">
                    <div class="content__inner">
                        <div class="content__posts">
                        <post-component v-if="popular" :shortDesc="true" :description="true" :author="true" :item="popular"
                                        :read="true" :controller="true" :choosePost="choosePost" />
                        </div>
                        <div class="recent">
                            <div class="recent__inner">
                                <div class="recent__item" v-for="(item, i) in recentPosts">
                                    <post-component :author="true" :controller="true"
                                                    :choosePost="choosePost" :key=i :item="item" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ["choosePost", "popular", "recentPosts"]
})

app.component('sidebar-component', {
    template: `
        <div class="sidebar">
            <div class="sidebar__inner">
                <div class="sidebar__about" id="about">
                    <div class="sidebar__title">
                        About Me
                    </div>
                    <div class="sidebar__about-image"><img src="assets/img/author.jpg" alt=""></div>
                    <div class="sidebar__about-name">Larisa Po</div>
                    <div class="sidebar__about-desc">
                        Introducing Larisa, a talented food blogger sharing their culinary creations and
                        experiences with the world. Follow along for delicious recipes and food inspiration!
                    </div>
                </div>
                <div class="sidebar__socials">
                    <div class="sidebar__title">
                        Subscribe & Follow
                    </div>
                    <socials-component />
                </div>
                <div class="sidebar__popular" id="popular">
                    <div class="sidebar__title">
                        Popular Posts
                    </div>
                    <div class="sidebar__popular-list">
                        <div class="sidebar__popular-item" v-for="(item, i) in popularPosts">
                            <post-component :shortTitle="true" :choosePost="choosePost" :item="item" :key=i />
                        </div>
                    </div>
                </div>
                <div class="sidebar__book">
                    <div class="sidebar__book-info">
                        <div class="sidebar__book-title">Cooking Book</div>
                        <div class="sidebar__book-desc">Buy Book Online Now!</div>
                        <div class="sidebar__book-button">Buy Now</div>
                    </div>
                </div>
                <div class="sidebar__mail">
                    <div class="sidebar__title">
                        Newsletter
                    </div>
                    <div class="sidebar__mail-desc">
                        Subscribe our newsletter gor get notification about new updates, information discount, etc.
                    </div>
                    <div class="sidebar__form">
                        <input type="text" class="sidebar__input" placeholder="Your email">
                        <div class="sidebar__main-button">
                            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ["choosePost", "popularPosts"]
})

app.component('blog-component', {
    template: `
    <div class="blog">
        <div class="blog__inner">
            <div v-if="category == ''" class="blog__title">
                Category: All
            </div>
            <div v-else class="blog__title">
                Category: {{ category }}
            </div>
            <div v-if="currentPostsSet.length > 0" class="blog__list">
                <div class="blog__item" v-for="(item, i) in currentPostsSet">
                    <post-component :shortTitle="true" :shortDesc="true" :choosePost="choosePost"
                                    author="true" read="true" description="true" :item="item" :key=i />
                </div>
            </div>
            <div v-else > Sorry, can't find posts. </div>
        </div>
    </div>
    `,
    props: ["category", "choosePost", "currentPostsSet"]
})

app.component('blog-page-component', {
    template: `
        <div class="blog-page">
            <div class="blog-page__post content__posts">
                <post-component :description="true" :author="true" :controller="true" :item="currentPost" />
            </div>
        </div>
    `,
    props: ["currentPost"]
})

app.component('post-component', {
    methods: {
        imagePath(path) {
            return "assets/img/" + path;
        }
    },
    template: `
        <div class="post">
            <div class="post__inner">
                <div class="post__image">
                    <img :src="imagePath(item.image)" alt="">
                </div>
                <div class="post__info">
                    <div class="post__meta">
                        <div class="post__author-block">
                            <div v-if="author" class="post__author">
                                By {{ item.author }}
                                <span>|</span>
                            </div>
                            <div class="post__date">
                                {{ item.date }}
                            </div>
                        </div>
                        <div v-if="controller" class="post__controller">
                            <div class="post__controller-item post__likes">
                                <i class="fa fa-heart-o" aria-hidden="true"></i> {{ item.like }}
                            </div>
                            <div class="post__controller-item post__views">
                                <i class="fa fa-eye" aria-hidden="true"></i> {{ item.view }}
                            </div>
                            <div class="post__controller-item post__share"><i class="fa fa-share-alt" aria-hidden="true"></i></div>
                        </div>
                    </div>
                    <div class="post__content">
                        <div v-if="shortTitle" class="post__title" @click="choosePost(item.id)">
                           {{ (item.title).substr(0, 55) }}...
                        </div>
                        <div v-else class="post__title" @click="choosePost(item.id)">
                            {{ item.title }}
                        </div>
                        <div v-if="shortDesc && description" class="post__text">
                           {{ (item.content)
                                .substr(0, 130)
                            }}...
                        </div>
                        <div v-else-if="description" class="post__text">
                            {{ item.content }}
                        </div>
                        <div v-if="read" class="post__button" @click="choosePost(item.id)">
                            Continue Reading
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ["description", "author", "read", "controller", "shortTitle", "shortDesc", "choosePost", "item"]
})

app.component('socials-component', {
    template: `
        <div class="socials">
            <a href="#" class="socials__item">
                <i class="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="#" class="socials__item">
                <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="#" class="socials__item">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="#" class="socials__item">
                <i class="fa fa-telegram" aria-hidden="true"></i>
            </a>
            <a href="#" class="socials__item">
                <i class="fa fa-pinterest" aria-hidden="true"></i>
            </a>
        </div>
    `
})

app.component('footer-component', {
    template: `
        <div class="footer" id="contacts">
            <div class="footer__inner">
                <div class="footer__gallery">
                    <div class="footer__gallery-item">
                        <div class="footer__gallery-info">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            Follow me
                        </div>
                    </div>
                    <div class="footer__gallery-item">
                        <div class="footer__gallery-info">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            Follow me
                        </div>
                    </div>
                    <div class="footer__gallery-item">
                        <div class="footer__gallery-info">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            Follow me
                        </div>
                    </div>
                    <div class="footer__gallery-item">
                        <div class="footer__gallery-info">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            Follow me
                        </div>
                    </div>
                    <div class="footer__gallery-item">
                        <div class="footer__gallery-info">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            Follow me
                        </div>
                    </div>
                    <div class="footer__gallery-item">
                        <div class="footer__gallery-info">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            Follow me
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="footer__socials">
                        <a href="#" class="footer__socials-item">
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                            Facebook
                        </a>
                        <a href="#" class="footer__socials-item">
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                            Twitter
                        </a>
                        <a href="#" class="footer__socials-item">
                            <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                            Linkedin
                        </a>
                        <a href="#" class="footer__socials-item">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                            Instagram
                        </a>
                        <a href="#" class="footer__socials-item">
                            <i class="fa fa-telegram" aria-hidden="true"></i>
                            Telegram
                        </a>
                        <a href="#" class="footer__socials-item">
                            <i class="fa fa-youtube-play" aria-hidden="true"></i>
                            Youtube
                        </a>
                    </div>
                    <header-component />
                    <div class="footer__top">
                        <a href="#top" class="footer__top-icon">
                            <i class="fa fa-arrow-up" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div class="footer__copy">
                    This template is made with love by <span> LarisaPomidor.2SPL </span> <br> Copyright @2023 All rights reserved
                    </div>
                </div>
            </div>
        </div>
    `
})

app.mount('#root')