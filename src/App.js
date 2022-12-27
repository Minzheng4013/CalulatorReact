import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import {evaluate} from 'mathjs'
function App() {
  let [expr, setExpr] = useState("")
  let [top, setTop] = useState("")
  let [bot, setBot] = useState("")
  let botTemp
  let topTemp
  useEffect(()=>{
    botTemp = document.getElementById("bottombar")
    topTemp = document.getElementById("expr")
  },[])
  function solve(e){
    setExpr(bot)
    setTop(bot+"=")
    
    topTemp.scrollLeft = top.scrollWidth

    function filter(e){
      e = e.replace("x", '*')
      e = e.replace("sin(", "sin(deg ")
      e = e.replace("cos(", "cos(deg ")
      e = e.replace("tan(", "tan(deg ")
      e = e.replace("E", "*10^")
      console.log(e)
      let new_e = ""
      let stack = []
      let l, r = 0
      for(let i=0;i<e.length;i++){
          if(e[i] === "n" && i>0 && e[i-1] === "l"){
              new_e += "og"
              stack.push((l, r))
              l = 1
              r = 0
              continue
          }else if(e[i]===")"){
              r++
              if(r==l){
                  [l,r] = stack.pop()
                  new_e += ", e)"
                  continue
              }
          }else if(e[i]==="("){
              l++
          }
          new_e += e[i]
      }

      return new_e
    }

    try {
      let ans = evaluate(filter(expr))
      setBot(ans)
      setExpr(ans)
    } catch (error) {
      setBot("ERROR")
      setExpr("")
    }   
  }

  function onClick(input){
    if(input=="AC"){
        setExpr("")
        setBot("")
    }else{
        setExpr(expr+input)
        setBot(expr+input)
    }
    botTemp.scrollLeft = top.scrollWidth
  }
  return (
    <div className="container">
      <div className="calculator">
        <div className="topbar">
          {top}
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg>
          <div id = "expr" className="expression">{expr}</div>
        </div>
        <div id="bottombar" className="bottombar">
          {bot?bot:0}
        </div>
      </div>

      <br/>
      <div className="numberbtn">
        <div >
          <button> <i>Deg</i></button>
          <button onClick={()=>onClick('!')}><i>x!</i></button>
          <button onClick={()=>onClick('(')}><i>(</i></button>
          <button onClick={()=>onClick(')')}><i>)</i></button>
          <button onClick={()=>onClick('%')}><i>%</i></button>
          <button onClick={()=>onClick('AC')} className="AC"><i>AC</i></button>
        </div>

        <div>
          <button onClick={()=>onClick('sin(')}><i>sin</i></button>
          <button onClick={()=>onClick('ln(')}><i>ln </i></button>
          <button onClick={()=>onClick('7')} className="number"><i>7</i></button>
          <button onClick={()=>onClick('8')} className="number"><i>8</i></button>
          <button onClick={()=>onClick('9')} className="number"> <i>9</i></button>
          <button onClick={()=>onClick('/')}> <i>÷</i> </button>
        </div>

        <div>
          <button onClick={()=>onClick('cos(')}><i>cos</i></button>
          <button onClick={()=>onClick('log(')}><i>log</i></button>
          <button onClick={()=>onClick('4')} className="number"> <i>4</i> </button>
          <button onClick={()=>onClick('5')} className="number"> <i>5</i> </button>
          <button onClick={()=>onClick('6')} className="number"> <i>6</i> </button>
          <button onClick={()=>onClick('x')}> <i>x</i> </button>
        </div>

        <div>
          <button onClick={()=>onClick('tan(')}><i>tan</i></button>
          <button onClick={()=>onClick('sqrt(')}> <i>√</i> </button>
          <button onClick={()=>onClick('1')} className="number"> <i>1</i> </button>
          <button onClick={()=>onClick('2')}className="number"> <i>2</i> </button>
          <button onClick={()=>onClick('3')} className="number"> <i>3</i> </button>
          <button onClick={()=>onClick('-')}> - </button>
        </div>

        <div>
          <button onClick={()=>onClick('E')}><i>EXP</i></button>
          <button onClick={()=>onClick('^(')}> <i>x<sup>y</sup></i> </button>
          <button onClick={()=>onClick('0')} className="number"> <i>0</i> </button>
          <button onClick={()=>onClick('.')}> <i>.</i> </button>
          <button onClick={()=>solve()}> <i>=</i> </button>
          <button onClick={()=>onClick('+')}> <i>+</i> </button>
        </div>
      </div>
    </div>  
  );
}

export default App;
