window.onload=function(){

  if (!Object.assign || !Array.from) return '不支持该浏览器或版本过低, 请切换内核或改用Chrome浏览器.'

  function removeStyleR(e){
    e.style && (e.style = '')
    Array.from(e.childNodes).forEach( childNode => removeStyleR(childNode) )
  }

  document.body.appendChild((_ => {
    const div = document.createElement('div')
    Object.assign(div.style,{
      position  : 'fixed',
      top       : '0px',
      left      : '0px',
      color     : 'white',
      background: '#4f81bd',
      fontSize  : '12px !important',
      lineHeight: '1',
      height    : '100%',
      width     : '300px',
      overflow  : 'auto',
    })
    document.body.style.paddingLeft = '320px'
    document.body.style.width       = '850px'
    document.body.style.background  = '#fff'
    document.querySelector('html').style.background = '#e5e5e5'
    div.className = 'auto-catalog'
    div.innerHTML = `
      <style>
        .auto-catalog h1,
        .auto-catalog h2,
        .auto-catalog h3,
        .auto-catalog span,
        .auto-catalog a{
          color: inherit;
          font-size: 12px;
          text-wrap: none;
          word-wrap: nowrap;
          text-decoration: none;
        }
        .auto-catalog h1{ padding-left: 1em; border: 1px solid #fff; padding: 5px; }
        .auto-catalog h2{ padding-left: 2em; }
        .auto-catalog h3{ padding-left: 3em; }
       
        .auto-catalog h1:hover,
        .auto-catalog h2:hover,
        .auto-catalog h3:hover,
        .auto-catalog span:hover,
        .auto-catalog a:hover{
          font-size: 12px;
          text-wrap: none;
          word-wrap: nowrap;
        }
      </style>
      <div style="font-weight: bold; text-align: center; font-size: 20px; padding: 10px 0;"> 自动目录(点击可跳转)</div>
      <input type="text" placeholder="搜索(未实现)" style="width: 100%; padding: 5px; font-size: 14px;;">
    `
    Array
      .from( document.querySelectorAll('h1,h2,h3') )

      .map( e => {
        for( const c of e.childNodes )
          c.tagName === 'SPAN' && (c.style['-aw-bookmark-end']) && e.appendChild( _ => {
            const a = document.createElement('a')
            a.name = c.style['-aw-bookmark-end']
          })
        return e.cloneNode(true)
      })

      .forEach( (e,i) => {
        for( const c of e.childNodes ){
          i < 3 && console.dir(c)
          c.tagName === 'A' && (c.href = '#' + c.name) && (c.name = '')
        }
        removeStyleR(e)
        div.appendChild(e)
      }, '' )
    // \n 替换成br标签
    return div
  })())
}
