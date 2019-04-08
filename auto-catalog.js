window.onload=function(){

  if (!Object.assign || !Array.from) return '不支持该浏览器或版本过低, 请切换内核或改用Chrome浏览器.'

  function removeStyleR(e){
    e.style && (e.style = '')
    Array.from(e.childNodes).forEach( childNode => removeStyleR(childNode) )
  }

  document.body.appendChild((_ => {
    const div = document.createElement('div')
    div.className = 'auto-catalog'
    div.innerHTML = `
      <style>
        html{
          background: #e5e5e5;
        }
        body{
          margin: 0;
          padding: 0 0 0  320px;
          max-width: 850px;
          background: #fff;
        }
        .auto-catalog{
          position  : fixed;
          top       : 0px;
          left      : 0px;
          color     : white;
          background: #4f81bd;
          font-size  : 12px !important;
          line-height: 1;
          height    : 100%;
          width     : 300px;
          overflow-y: scroll;
          overflow-x: visible;

        }
        .auto-catalog h1,
        .auto-catalog h2,
        .auto-catalog h3,
        .auto-catalog span,
        .auto-catalog a{
          font-size: 12px;
          margin: 0;
          padding: 0;
          cursor: pointer;
        }
        .auto-catalog h1{ padding-left: 0; border: 1px solid #fff;}
        .auto-catalog h2{ padding-left: .5em; }
        .auto-catalog h3{ padding-left: 1em; }
        
        .auto-catalog a{
          display: block;
          color: inherit;
          text-wrap: none;
          text-decoration: none;
          padding: 3px 0;
          overflow-x: hidden;
        }
  
        .auto-catalog h1:hover,
        .auto-catalog h2:hover,
        .auto-catalog h3:hover,
        .auto-catalog span:hover,
        .auto-catalog a:hover{
          font-size: 12px;
          text-wrap: none;
          background: #2f5b90;
          min-height: 1em;
        }
        
        /*.auto-catalog a:hover{
          position: absolute;
          width: 600px;
          overflow-x: visible;
          z-index: 33;
        }*/
 
      </style>
      <div style="font-weight: bold; text-align: center; font-size: 20px; padding: 10px 0;"> 自动目录(点击可跳转)</div>
      <input type="text" placeholder="搜索(未实现, 请用Ctrl+F代替)" style="width: 100%; padding: 5px; font-size: 14px;;">
    `
    Array
      .from( document.querySelectorAll('h1,h2,h3') )

      .map( (e, i) => {

        const id = document.createAttribute("id")
        id.nodeValue = e.innerText.replace(/\s/g, '')
        e.attributes.setNamedItem(id)
        return e
      })

      .forEach( (e,i) => {
        //for( const c of e.childNodes ){
        //  //i < 3 && console.dir(c)
        //  c.tagName === 'A' && (c.href = '#' + c.name) && (c.name = '')
        //}
        //removeStyleR(e)

        const tag = document.createElement(e.tagName)

        tag.appendChild( (function () {
          const a = document.createElement('a')
          a.href = '#' + e.attributes.id.value
          a.innerText = e.attributes.id.value

          const title = document.createAttribute("title")
          title.nodeValue = e.attributes.id.value
          a.attributes.setNamedItem(title)
          return a
        })() )
        div.appendChild(tag)
      }, '' )
    // \n 替换成br标签
    return div
  })())

  setTimeout( function () {
    const hash = location.hash
    location.href = '#'
    hash && (location.href = hash)
  })
}
