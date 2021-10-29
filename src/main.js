const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);

const hashmap = xObject || [
    { logo: 'F', url: 'https://freecodecamp.org/' },
    { logo: 'J', url: 'https://www.juejin.cn' },
    { logo: 'L', url: 'https://www.lintcode.com/' },
    { logo: 'N', url: 'https://www.nowcoder.com' },
    { logo: 'O', url: 'https://www.oracle.com/cn/' },
    { logo: 'R', url: 'https://www.runoob.com' },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的内容
};

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashmap.forEach((node, index) => {
        const $li = $(`<li>
                    <div class="site">
                        <div class="logo">${node.logo[0].toUpperCase()}</div>
                        <div class="link">${simplifyUrl(node.url)}</div>
                        <div class ="close">
                        <svg t="1635265022572" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6692" width="32px" height="32px"><path d="M517.5 609.2L174.3 952.5c-25.5 24-65.5 23.4-90.3-1.4-24.8-24.8-25.4-64.7-1.5-90.3l343.2-343.2L82.5 174.3c-24.9-25.4-24.7-66.1 0.5-91.3s65.9-25.4 91.3-0.5l343.2 343.2L860.8 82.5c25.4-24.9 66.1-24.7 91.3 0.5s25.4 65.9 0.5 91.3L609.3 517.5l343.2 343.2c24.9 25.4 24.7 66.1-0.5 91.3-25.2 25.2-65.9 25.4-91.3 0.5L517.5 609.2z" p-id="6693"></path></svg>                        </div>
                    </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => { //代替a标签
            window.open(node.url);
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation(); //阻止冒泡
            hashmap.splice(index, 1);
            render();
        })
    })
}

render();

$('.addButton').on('click', () => {
    let url = window.prompt('请问您需要添加的网址是？');
    console.log(url);
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    hashmap.push({ logo: simplifyUrl(url)[0], logoType: 'text', url: url });
    render();
});

window.onbeforeunload = () => { //关闭页面的时候就把hashmap存在本地存储x里
    const string = JSON.stringify(hashmap);
    localStorage.setItem('x', string);
}

$(document).on('keypress', (e) => {
    const { key } = e;
    for (let i = 0; i < hashmap.length; i++) {
        if (hashmap[i].logo.toLowerCase() === key) {
            window.open(hashmap[i].url);
        }
    }
})