const $siteList = $('.siteList')
const $lastList = $('li.last')

const siteMap = localStorage.getItem('siteMap')
const hashMapObject = JSON.parse(siteMap)
const hashMap = hashMapObject || [
  {logo: 'W', url: 'https://www.w3.org/'},
  {logo: 'V', url: 'https://vuejs.org/'},
  {logo: 'R', url: 'https://reactjs.org/'},
  {logo: 'G', url: 'https://github.com/'},
]

const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //删除/开头的内容
}

const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`
      <li class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </li>
    `).insertBefore($lastList)
    $li.on('click', () => {
      window.open(node.url,'_self')
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index,1)
      render()
    })
  })
}

// 初始化数据
render()

$('.last').on('click', () => {
  let url = window.prompt("请输入要添加的网站")
  if (!url) return
  if(url.indexOf('http') !== 0){
    url = 'https://' + url
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url
  })
  render()
})

// 当窗口即将被卸载（关闭）时触发
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('siteMap',string)
}
