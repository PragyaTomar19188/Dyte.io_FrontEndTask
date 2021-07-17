import React, {useState, useEffect} from 'react';
import Editor from './FileExplorer'
import useLocalStorage from '../LocalSave/useLocalStorage';
import logo from './Dyte.svg'


function App() {
  const[html,setHtml] = useLocalStorage('html','')
  const[css, setCss] = useLocalStorage('css','')
  const[js,setJs] = useLocalStorage('js','')
  const[srcDoc, setSrcDoc] = useState('')
  const[copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
     setSrcDoc(`<html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>`
     )
    }, 250)

    return() => clearTimeout(timeout)

  },[html,css,js])

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }



  return(
    <>
    <div className = "top"> <img src={logo} alt="Logo" />
    <button className = 'sharebtn' onClick={copy}>{!copied ? "Create Share Link" : "URL Copied !"} </button>
    
    
     
      </div>
  
    <div className= "pane top-pane">
      <Editor language = "xml" displayName="Index.HTML"
      value={html} 
      onChange={setHtml}
      />
      <Editor language = "css" displayName="Index.CSS"
      value={css} 
      onChange={setCss}
      />
      <Editor language = "javascript" displayName="Index.JS"
      value={js} 
      onChange={setJs}
      />
      
    </div>
    <div className= "Live"><center><p className="view">Live View</p> </center></div>
    <div className= "pane">
      <iframe 
      srcDoc= {srcDoc}
      title="output"
      sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
      />


    </div>
    </>

  )
}

export default App;
