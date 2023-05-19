import React from "react"

const Spinner = () => {
  React.useEffect(() => {
    const styleNode = document.createElement("style")
    const styleText = `
      .spinner_white_animation{color:white;display:inline-block;width:64px;height:64px}
      .spinner_white_animation div{transform-origin:32px 32px;animation:spinner_white_animation 1.2s linear infinite}
      .spinner_white_animation div:after{content:" ";display:block;position:absolute;top:3px;left:29px;width:5px;height:14px;border-radius:20%;background:white}
      .spinner_white_animation div:nth-child(1){transform:rotate(0deg);animation-delay:-1.1s}
      .spinner_white_animation div:nth-child(2){transform:rotate(30deg);animation-delay:-1s}
      .spinner_white_animation div:nth-child(3){transform:rotate(60deg);animation-delay:-0.9s}
      .spinner_white_animation div:nth-child(4){transform:rotate(90deg);animation-delay:-0.8s}
      .spinner_white_animation div:nth-child(5){transform:rotate(120deg);animation-delay:-0.7s}
      .spinner_white_animation div:nth-child(6){transform:rotate(150deg);animation-delay:-0.6s}
      .spinner_white_animation div:nth-child(7){transform:rotate(180deg);animation-delay:-0.5s}
      .spinner_white_animation div:nth-child(8){transform:rotate(210deg);animation-delay:-0.4s}
      .spinner_white_animation div:nth-child(9){transform:rotate(240deg);animation-delay:-0.3s}
      .spinner_white_animation div:nth-child(10){transform:rotate(270deg);animation-delay:-0.2s}
      .spinner_white_animation div:nth-child(11){transform:rotate(300deg);animation-delay:-0.1s}
      .spinner_white_animation div:nth-child(12){transform:rotate(330deg);animation-delay:0s}
      @keyframes spinner_white_animation{0%{opacity:1}100%{opacity:0}}
    `
    const styleTextNode = document.createTextNode(styleText)
    styleNode.appendChild(styleTextNode)
    document.getElementsByTagName("head")[0].appendChild(styleNode)

    return () => {
      document.getElementsByTagName("head")[0].removeChild(styleNode)
    }
  }, [])

  return (
    <div className={"spinner_white_animation"}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
