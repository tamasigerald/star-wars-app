const main$$ = document.querySelector('main');
let article$$;
let newArticle$$;

// Link list
const links = {
    navBar: [
        {
            text: 'Home',
            path: '/',
            url: '#'
        },
        {
            text: 'Characters',
            path: '/characters',
            url: 'https://swapi.dev/api/people'
        },
        {
            text: 'Planets',
            path: '/planes',
            url: 'https://swapi.dev/api/planets'
        },
        {
            text: 'Vehicles',
            path: '/vehicles',
            url: 'https://swapi.dev/api/vehicles'
        },
    ],
};

// Fetch data
// let dataIndex = {}; 

// const getData = (url) => {
//     fetch(url).then(res => res.json()).then(data => dataIndex = data).then(function(res) {
//         console.log(dataIndex);
//     })
// }

// for (const link in links.navBar) {
//     let url = `${links.navBar[link].url}`;
//     getData(url);
// }


// Create links
const createLink =  (linkTxt, parentNode, myCallback) => {
    const a$$ = document.createElement('a');
    a$$.innerHTML = linkTxt;
    a$$.setAttribute('href', '#');
    parentNode.appendChild(a$$);
    a$$.addEventListener('click', function(event) {
        event.preventDefault();
        myCallback();
    });
};

// Generate Header
const getHeader = () => {
    const header$$ = document.createElement('div');
    const headerImg$$ = document.createElement('img');
    headerImg$$.src = './src/img/logo.svg';
    header$$.appendChild(headerImg$$);
    main$$.appendChild(header$$);
};

// Nav-bar
const getNav = () => {
    const nav$$ = document.createElement('div');
    nav$$.setAttribute('class', 'nav-bar');
    main$$.appendChild(nav$$);

    for (let index = 0; index < links.navBar.length; index++) {
        const element = createLink(links.navBar[index].text, nav$$, function(){
            clearContent(article$$);
            if (newArticle$$) {
                clearContent(newArticle$$);
            }
            getContent(links.navBar[index].text, links.navBar[index].url);
        });
    }
}

// Content
const getContent = (text, url) => {
    article$$ = document.createElement('article');
    let h1$$ = document.createElement('h1');
    if(!text || text == 'Home') {
        h1$$.innerHTML = 'May the force be with you!';
    } else {
        h1$$.innerHTML = text;
    }
    let ul$$ = document.createElement('ul');
    article$$.appendChild(h1$$);
    article$$.appendChild(ul$$);
    main$$.appendChild(article$$);
    if (url != '#') {
        fetch(url).then(res => res.json()).then(function(res) {
        // console.log(res.results);
        for (const key in res.results) {
            createLink(res.results[key].name, ul$$, function() {
                let data = res.results[key];
                article$$.style.display = 'none';
                let h1$$ = document.createElement('h1');
                let ul$$ = document.createElement('ul');
                let button$$ = document.createElement('button');
                button$$.innerHTML = 'BACK';
                newArticle$$ = document.createElement('article');
                newArticle$$.appendChild(h1$$);
                newArticle$$.appendChild(ul$$);
                newArticle$$.appendChild(button$$);
                newArticle$$.classList.add('card-container');
                main$$.appendChild(newArticle$$);
                h1$$.innerHTML = data.name;
                for (const item in data) {
                    let li$$ = document.createElement('li');
                    li$$.innerHTML = `${item}: ${data[item]}`;
                    ul$$.appendChild(li$$);;
                }



                button$$.addEventListener('click', function() {
                    clearContent(newArticle$$);
                    article$$.style.display = 'flex';
                })
            });
        }
    }).catch()
    }
};

function clearContent(props) {
    props.remove();
};

window.onload = function () {
    getHeader();
    getNav();
    getContent();
};