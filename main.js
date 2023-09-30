/* @雷鱼Aurora 制作  */

//获取选择模式元素
const modes = document.querySelector('#modes')
const radios = document.querySelectorAll('#modes div')

let currentLunguage = true

let sineData

//模式
let mode

//最终文件
let finalFile = {}

//获取输出元素
const output = document.querySelectorAll('.output')

//文本高光
let lit = false

//改变文本高光
function light() {
  //获取按钮元素
  const l = document.querySelector('.light')

  //开关状态改变
  lit = !lit

  //对按钮的形态进行修改
  if (lit) {
    l.style.backgroundColor = '#aaf'
    l.innerHTML = currentLunguage?'已启用':'Enabled'
  } else {
    l.style.backgroundColor = '#faa'
    l.innerHTML = currentLunguage?'已禁用':'Disabled'
  }
}
light()

//复制函数
function copy() {
  //创建新的文本域标签
  let textarea = document.createElement("textarea")

  //将最终文件赋值到文本域标签的内容里
  textarea.value = finalFile

  //将文本域标签放到body标签里面
  document.body.appendChild(textarea)

  //复制
  textarea.select()
  document.execCommand("copy")

  //移除文本域标签
  document.body.removeChild(textarea)

  //弹窗
  alert('复制成功！')
}

//将pathData转化成angleData
function pathDataToAngledata(x) {
  angleData = []
  let pathData = x
  let j = 0
  for (let i = 0; i < pathData.length; i++) {
    if (pathData[i] == 'R') {
      angleData[i] = 0
    } else if (pathData[i] == 'L') {
      angleData[i] = 180
    } else if (pathData[i] == 'U') {
      angleData[i] = 90
    } else if (pathData[i] == 'D') {
      angleData[i] = 270
    } else if (pathData[i] == 'F') {
      angleData[i] = 240
    } else if (pathData[i] == 'G') {
      angleData[i] = 120
    } else if (pathData[i] == '!') {
      angleData[i] = 999
    } else if (pathData[i] == 'B') {
      angleData[i] = 300
    } else if (pathData[i] == 'C') {
      angleData[i] = 315
    } else if (pathData[i] == 'Q') {
      angleData[i] = 135
    } else if (pathData[i] == 'E') {
      angleData[i] = 45
    } else if (pathData[i] == 'T') {
      angleData[i] = 60
    } else if (pathData[i] == 'H') {
      angleData[i] = 150
    } else if (pathData[i] == 'N') {
      angleData[i] = 210
    } else if (pathData[i] == 'Z') {
      angleData[i] = 225
    } else if (pathData[i] == 'M') {
      angleData[i] = 330
    } else if (pathData[i] == 'x') {
      angleData[i] = 195
    } else if (pathData[i] == 'J') {
      angleData[i] = 30
    } else if (pathData[i] == 'o') {
      angleData[i] = 75
    } else if (pathData[i] == 'W') {
      angleData[i] = 165
    } else if (pathData[i] == 'Y') {
      angleData[i] = 285
    } else if (pathData[i] == 'A') {
      angleData[i] = 345
    } else if (pathData[i] == 'p') {
      angleData[i] = 15
    } else if (pathData[i] == 'q') {
      angleData[i] = 105
    } else if (pathData[i] == 'V') {
      angleData[i] = 255
    } else if (pathData[i] == '5') {
      angleData[i] = (72 + angleData[i - 1]) % 360
    } else if (pathData[i] == '6') {
      angleData[i] = (288 + angleData[i - 1]) % 360
    } else if (pathData[i] == '7') {
      angleData[i] = (360 / 7 + angleData[i - 1]) % 360
    } else if (pathData[i] == '8') {
      angleData[i] = (angleData[i - 1] + 360 - 360 / 7) % 360
    } else {
      throw new Error(`路径数据中含有未知字符: "${pathData[i]}"`)
    }
  }
  return angleData
}

//获取输入元素
const input = document.querySelectorAll('input')

input[1].value = localStorage.getItem('adofai_LastInput')||''

//给导入文件按钮添加事件，在文件导入后运行内部的代码
input[0].addEventListener('change', function() {

  //获取文件数据
  const fileList = this.files

  //创建新的文件阅读器
  const reader = new FileReader()

  //读取文件
  reader.readAsText(fileList[0])

  //读取后继续执行
  reader.onload = function(event) {

    //将输入框内的文件设置为导入的文件
    input[1].value = event.target.result

    //将文件内容和文件名导入到主函数
    main(event.target.result, fileList[0].name)
  }
})

//为每一个模式添加监听事件
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener('click', () => {
    //动画
    show(i)

    //改变模式
    mode = i
  })
}

//选择模式时的动画
function show(x,distance = 225) {

  //判断是否切换模式
  if (mode !== x) {

    //获取上次和这次点击的按钮
    const last = radios[mode == undefined ? x : mode]
    const _new = radios[x]

    //获取开始播放的时间
    const time = new Date()

    //创建一个新的计时器
    const timer = setInterval(() => {

      //计算误差时间
      const dt = new Date() - time

      //计算需要移动的距离(百分数)
      let dx = 1 - Math.pow(2, -dt / 50)

      //当移动的距离大于99%时关闭计时器
      if (dx > 0.99) {
        dx = 1
      }

      //动画
      if (mode !== undefined) {
        last.style.transform = `translateX(${-30-dx*(distance-30)}px)`
      }
      _new.style.transform = `translateX(${-distance+dx*(distance-30)}px)`

      //关闭
      if (dx === 1) {
        clearInterval(timer)
      }
    }, 0)
  }
}

//判断是否选择模式
function hasMode() {
  if (mode === undefined) {
    alert('请选择模式！')
  }
}

//主函数
function main(files, fileName
, reload = true) {

  //使用try-catch检测是否有错误
  try {
    
    //检测是否选择模式
    if (mode === undefined) {
      throw new Error(currentLunguage?'未选择模式.':'no mode selected.')
    }
    
    if (files == '' || input[1].value == '') {
      throw new Error(currentLunguage?'未找到文件.':'no files found.')
    }
    
    const file = JSON.parse((
      files || input[1].value).replace((/,\s*\}/g), '}'))
      
    if (!(Array.isArray(file.angleData)||(typeof file.pathData === 'string'&&file.pathData !== ''))) {
      throw new Error(currentLunguage?'未找到轨道路径.':'no path found.')
    }

    //将pathData转化成angleData
    if ((file.angleData === undefined) && (file.pathData)) {
      file.angleData = pathDataToAngledata(file.pathData);

      //删除原来的angleData
      delete file.pathData
    }

    if (file.angleData.length === 0) {
      throw new Error(currentLunguage?'需要至少1个轨道.':'At least 1 track required.')
    }
    if (file.angleData.length < 4&&mode === 7) {
      throw new Error(currentLunguage?'当前模式需要至少4个轨道.':'The current mode requires at least 4 tracks.')
    }

    //填充函数
    function arr(filled) {
      return new Array(file.angleData.length).fill(filled)
    }

    //旋转数据
    const swirlData = arr(0)
    
    if (!file.settings) {
      throw new Error(currentLunguage?'未找到关卡设置.':'no settings found.')
    }
    
    if (!file.settings.bpm) {
      throw new Error(currentLunguage?'未找到BPM.':'no Bpm found.')
    }
    
    //BPM数据
    const bpmData = arr(file.settings.bpm)

    //变速事件在所有事件中的位置
    const locationSpeed = arr(-1)

    //行星数据
    const planetData = arr(0)

    if (!Array.isArray(file.actions)) {
      file.actions = []
    }
    
    if (!Array.isArray(file.decorations)) {
      file.decorations = []
    }

    let swirlCount = 0

    //遍历所有事件
    file.actions.forEach((v, i) => {

      //筛选事件
      switch (v.eventType) {

        //多行星事件
        case 'MultiPlanet':
          if (v.planets === 'ThreePlanets') {
            planetData.fill(1, v.floor)
            if (mode === 0) {
              file.actions[i].planets = 'TwoPlanets'
            }
          } else {
            planetData.fill(0, v.floor)
            if (mode === 0) {
              file.actions[i].planets = 'ThreePlanets'
            }
          }
          break

          //旋转事件
        case 'Twirl':
          swirlData.fill((swirlData[swirlData.length - 1] + 1) % 2, v.floor)
          swirlCount++
          break

          //变速事件
        case 'SetSpeed':
          locationSpeed[v.floor] = i
          if (v.speedType === 'Bpm') {
            if (mode === 1) {
            file.actions[i].speedType = 'Multiplier'
            file.actions[i].bpmMultiplier = v.beatsPerMinute / bpmData[bpmData.length - 1]
            }
            bpmData.fill(v.beatsPerMinute, v.floor)
          } else {
            if (mode !== 1) {
            file.actions[i].speedType = 'Bpm'
            file.actions[i].beatsPerMinute = bpmData[bpmData.length - 1] * v.bpmMultiplier
            }
            bpmData.fill(bpmData[bpmData.length - 1] * v.bpmMultiplier, v.floor)
          }

      }
    })

    //中旋事件
    const midData = arr(0)

    //遍历angleData
    const angleData = file.angleData.map((v, i) => {

      let item = Number(v)

      //对中旋进行处理
      if (item === 999) {
        item = file.angleData[i - 1] - 180
        midData[i] = 1
        if (mode === 3||mode === 7||mode === 8) {
          throw new Error(currentLunguage?'当前模式不支持中旋.':'The current mode does not support Midspin Tiles.')
        }
      }

      //输出值
      let s

      //计算s
      if (file.angleData[i - 1] === 999) {
        s = (360 + file.angleData[i - 2] - item) % 360
      } else {
        s = (180 - item + (file.angleData[i - 1] || 0)) % 360
      }
      
      //判断旋转方向并取反
      if (swirlData[i] === 1) {
        s = (360 - s) % 360
      }
      
      //处理三球的情况
      if (planetData[i] === 1) {
        s = s - 60;
      }
      
      //确保s∈(0, 360]
      while (s <= 0) {
        s += 360
      }
      if (isNaN(s)) {
        throw new Error(currentLunguage?'处理轨道路径中出现了问题':'There was a problem processing these angleData.')
      }
      
      return s
    })
    if (mode === 8) {
      sineData = reload?toSine(angleData.length-1):sineData
    }
    let reduce = []
    let random = angleData.slice()
    let multData = arr(1)

    //转换
    const outputValue = angleData.map((v, i) => {
      let s = v
      let mult
      switch (mode) {
        case 0:
          if (i !== 0) {
            planetData[i] = 1 - planetData[i];
            (planetData[i] === 0) ? (multData[i] *= 1.5) : (multData[i] /= 1.5);
            (planetData[i] === 0) ? (s = v * 1.5) : (s = v)
          } else {
            s = v
          }
          if (i === 1 && planetData[1] === 1) {
            file.actions.push({ "floor": 1, "eventType": "MultiPlanet", "planets": "ThreePlanets" })
          }
          if (i !== 0 && (planetData[i] !== planetData[i - 1] || i === 1)) {
            if (planetData[i] === 1) {
              file.actions.push({ "floor": i, "eventType": "SetSpeed", "speedType": "Multiplier", "beatsPerMinute": 100, "bpmMultiplier": 0.6666666 })
            } else {
              file.actions.push({ "floor": i, "eventType": "SetSpeed", "speedType": "Multiplier", "beatsPerMinute": 100, "bpmMultiplier": 1.5 })
            }
          }
          break
        case 1:
          s = v
          swirlData[i] = i % 2//(swirlData[i] + 1)%2
          if (i !== 0) {
            file.actions.push({ "floor": i, "eventType": 'Twirl' })
          }
          break
        case 2:
          s = 180
          multData[i] = 180 / v
          swirlData[i] = 0
          if (multData[i] !== multData[i - 1]) {
            file.actions.push({ "floor": i, "eventType": "SetSpeed", "speedType": "Bpm", "beatsPerMinute": multData[i] * bpmData[i], "bpmMultiplier": 1 })
          }
          break
        case 3:
          s = v
          if (i !== 0) {
            multData[i] = (360 - v % 360) / v
            if (multData[i] !== multData[i - 1]) {
                file.actions.push({ "floor": i, "eventType": "SetSpeed", "speedType": "Bpm", "beatsPerMinute": multData[i] * bpmData[i], "bpmMultiplier": 1 })
            }
          } else {
            file.actions.push({ "floor": 1, "eventType": 'Twirl' })
          }
          break
        case 4:
          if (i !== 0) {
            random[i] = Math.floor(285 * Math.random() + 60)
            multData[i] = random[i] / v
            file.actions.push({ "floor": i, "eventType": "SetSpeed", "speedType": "Bpm", "beatsPerMinute": multData[i] * bpmData[i], "bpmMultiplier": 1 })
          }
          s = random[i]
          break
        case 5:
          s = v
          break
        case 6:
          s = v
          if (i > 0) {
            file.actions.push({ "floor": i, "eventType": "Hold", "duration": 0, "distanceMultiplier": 0, "landingAnimation": "Enabled" })
          }
          break
        case 7: 
          s = i?360 * (1/2 - 1/(angleData.length-1)):180
          multData[i] = s / v
          swirlData[i] = 0
          if (multData[i] !== multData[i - 1]&&i!==0) {
            file.actions.push({ "floor": i, "eventType": "SetSpeed", "speedType": "Bpm", "beatsPerMinute": multData[i] * bpmData[i], "bpmMultiplier": 1 })
          }
          break
        case 8:
          s = sineData[i-1]||180
          multData[i] = s / v
          swirlData[i] = 0
          if (multData[i] !== multData[i - 1]&&i!==0) {
            file.actions.push({ "floor": i, "eventType": "SetSpeed", "speedType": "Bpm", "beatsPerMinute": multData[i] * bpmData[i], "bpmMultiplier": 1 })
          }
          break
        case 9:
          file.decorations.push({"floor": i,  "eventType": "AddText", "decText": String(+(bpmData[i]*(v/180)).toFixed(2)), "font": "Default", "position": [0, 0], "relativeTo": "Tile", "pivotOffset": [0, 0], "rotation": 0, "scale": [70, 70], "color": "ffffff", "opacity": 100, "depth": -1, "parallax": [-1, -1], "tag": ""  })
          break
        case 10:
          swirlData[i] = 0
      }
      if (planetData[i] === 1) {
        s = +(v / 1.5 + 60).toFixed(3)
      }
      s = Number(s)
      if (swirlData[i] === 0) {
        reduce[i] = (reduce[i - 1] || 0) + 540 - s
      } else {
        reduce[i] = (reduce[i - 1] || 0) + s + 180
      }
      if (midData[i] === 0) {
        return (reduce[i] % 360)
      } else {
        return 999
      }
    })
    file.angleData = outputValue
    const act = []
    file.actions.forEach((v,
      i) => {
      if (v.duration) {
        file.actions[i].duration *= multData[v.floor]
      }
      if (mode === 1) {
        if (v.eventType === 'Twirl' &&swirlCount > 0) {
          swirlCount--
        } else {
          act.push(v)
        }
      }
      if (mode === 5) {
        if (v.ease) {
          v.ease = 'Linear'
        }
        const normalActions = ['Twirl', 'SetSpeed', 'CheckPoint', 'MultiPlanet', 'Pause', 'MoveTrack', 'PositionTrack', 'ColorTrack', 'AnimateTrack', 'Hold', 'SetHoldSound', 'FreeRoam', 'FreeRoamTwirl', 'Hide', 'ScaleMargin', 'ScaleRadius', 'FreeRoamWaring', 'Multitap', 'KillPlayer']
        if (normalActions.includes(v.eventType)) {
          act.push(v)
        }
        if (v.eventType === 'moveCamera') {
          v.relativeTo = 'Player'
          v.position = [0,0]
          v.zoom = 100
          
        }
      }
      if (mode === 2||mode === 7||mode === 8) {
        if (v.eventType !== 'MoveTrack'&&v.eventType !== 'PositionTrack'&&v.eventType !== 'Twirl') {
          act.push(v)
        }
      }
      if (mode === 10) {
          if (v.eventType !== 'Twirl') {
            act.push(v)
          }
        }
    })
    if (mode === 5) {
      file.actions = act
      file.settings.zoom = 100
      file.settings.bgImage = ''
      file.settings.relativeTo = 'Player'
      file.settings.rotation = 0
      file.settings.planetEase = 'Linear'
      file.decorations = []
    }
    if (mode === 2||mode === 7||mode === 1||mode === 10) {
      file.actions = act
    }
    const fileName = file.settings.artist + (file.settings.artist ? ' - ' : '') + file.settings.song + '.adofai'
    const str = JSON.stringify(file, (key, value) => {
      if (key === 'angleData') {
        return "[" + value.map(n => String(n)).join(", ") + "]";
      } else {
        return value;
      }
    }, 2).replace('"[', '[').replace(']"', ']')
    if (lit) {
      function keys(obj) {
        const newObj = {}; // 用于储存新的键值对
        for (let key in obj) {
          if (obj[key] === 'Enabled'||obj[key] === 'Disabled'||typeof obj[key] === 'boolean') {
            newObj[`☆<span class='key2'>□□${key}□□</span>☆`] = obj[key]
          } else {
            newObj[`☆<span class='key'>□□${key}□□</span>☆`] = obj[key]
          }
        }
        return newObj;
      }
      file.settings = keys(file.settings)
      file.actions = file.actions.map((v, i) => {
        return keys(v)
      })
      if (file.decorations) {
        file.decorations = file.decorations.map((v, i) => {
          return keys(v)
        })
      }
      output[1].innerHTML = JSON.stringify(keys(file), (key, value) => {
        if ((/^(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/).test(value)) {
          return `☆<span class='number'>□□<div class='color' style='background-color:#${value}'></div>${value}□□</span>☆`
        }
        if ((/<color="?(.+?)"?>(.+?)<\/color>/).test(value)) {
          return `☆${value.replace((/<color="?(.+?)"?>(.+?)<\/color>/g),'<span style=□□color: $1□□>□□$2□□</span>')}☆`
        }
        if (value === 'Enabled'||value === 'Disabled') {
          return `☆<span class='boolean'>□□${value}□□</span>☆`
        }
        if (typeof value == 'boolean') {
          return `☆<span class='boolean'>${value}</span>☆`
        }
        if (typeof value === 'string') {
          return `☆<span class='word'>□□${value}□□</span>☆`
        }
        if (typeof value === 'number') {
          return `☆<span class='number'>${value}</span>☆`
        }
        if (Array.isArray(value) && typeof value[0] !== 'object') {
          return "♢" + value.map(n => (typeof n === 'string')?(`<span class='number'>□□${n}□□</span>`):(`<span class='number'>${String(n)}</span>`)).join(", ") + "♢";
        } else {
          return value;
        }
      }, 2).replace(/"♢/g, '[').replace(/♢"/g, ']').replace(/"☆/g, '').replace(/☆"/g, '').replace(/□□/g, '"')
    } else {
      output[1].innerHTML = str
    }
    output[0].innerHTML = `<h1 style="text-align: center;">${currentLunguage?'转换大成功！':'Conversion successful.'}<span style='font-size: 10px;'>(${currentLunguage?'共':''} ${str.length} ${currentLunguage?'个字符':'characters in total'})</span><br><button onclick='copy()' class='copy' id='copy'>${currentLunguage?'复制':'copy'}</button><button onclick='download("${fileName}")' class='copy' id='download'>${currentLunguage?'下载':'download'}</button></h1>`
    finalFile = str
  } catch (err) {
    if (String(err).indexOf('JSON') !== -1) {
      err = new TypeError(currentLunguage?'文件格式出现问题.(解决方案: "帮助和注意事项"的第一条)':'Problem with file format.')
    } 
    output[0].innerHTML = `<h1 style="text-align: center;">${currentLunguage?'转换失败！':'Convert fails.'}<button onclick='copy()' class='copy' id='copy'>${currentLunguage?'复制':'copy'}</button></h1>`
    finalFile = err
    output[1].innerHTML = err
  } finally {
    output[1].style.height = output[1].scrollHeight + 'px'
  }
}

function download(fileName, fileText, remove = true) {
  const text = fileText || finalFile
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  if (remove) {
    a.click();
    URL.revokeObjectURL(url);
  } else {
    return url
  }
}
function toSine(length) {
  let func
  try {
func = (function (fx) {
  fx = String(fx).replace(/(\^)/g,'**').replace(/(y=)/g,'x=>')
  if (fx.indexOf('=>') === -1) {
    fx = 'x' + "=>" + fx
  }
  alert(`已定义新函数f(${String(fx).split('=>')[0].replace((/\s/g),'')}) = ${String(fx).replace(String(fx).split('=>')[0]+'=>','').replace(/(Math\.)/g,'').replace(/(\*\*)/g,'^')}`)
  return eval(fx.replace(/(\d+)\s?([a-zA-Z]+)/g,'$1 * $2').replace(/(\)\()/g,')*(').replace(/\)(\w+)/g,')*$1'))
})(prompt(currentLunguage?'输入函数(以x为自变量)\n根号x用sqrt(x)表示，支持不写"y="，也可在前面添加这种格式的符号，表示以这个字母为自变量:\n字母+"=>"，例如a=>a+3，qwq=>2qwq-1,\n部分函数可以直接写，例如sin(x)，支持数字和字母或两个括号或一个括号和一个字母之间省略乘号，不支持非函数的字母出现在括号前，乘号使用"*"字符，除号使用"/"字符，乘方使用"^"或者"**"字符\n下列的写法是可行的:\ny=3x+1; y=2x*(x+2); a=>2sin(a/2)+0.3a\n下列写法是不可行的:\ny=2*a-3 (使用了非x的自变量); y=x(x+1) (因为x不是函数，所以不能放在括号前面)\n目前已支持的函数有sum(求和)，格式为sum(函数，起始值，结束值)，int(定积分)，格式int(被积函数，起始值，结束值，被积函数的第二个参数)，不定积分的格式为uint(被积函数)，常数C默认为0。常数有pi(圆周率。约3.14159), e(自然常数，约2.71828)，phi(黄金分割率。约0.618)，常量可以直接当成数字使用，但是不能放在括号前面。例如: y=pi*pow(x,2)+e*x+phi是可行的。求导可以通过d(函数)实现，使用方法为d(函数)(x)，其中d(函数)表示导函数，例如d(sin(x))(x)表示的就是cos(x)。对数使用log(底数, 真数)的格式表示。':'Input function(taking x as the independent variable).')||(() => {alert('由于输入的函数为0或者不存在，自动替换为y=0')
return 0})());
const x1 = +eval(prompt('请填写任意自变量，确保函数能够正常计算。',0))
alert(`f(${x1})=${func(x1)}`)
} catch (e) {
  throw new Error('输入函数时出现错误')
}
let k = (!confirm('是否使用默认步长0.03？\n步长越大，所需的轨道数量越少，但是图像会有一定的不光滑，相反也是同理.')?+prompt('输入步长(大于0)'):0.03);//步长
(isNaN(k)||k<=0)?(() => {
  k = 0.03
  alert('由于输入的步长不大于0或不存在，已自动替换为0.03')
})():''
  const angleData = []//初始化数据
  let x0 = 0//初始化x
  for (let i = 0; i < length; i++) {
    x0 += k * Math.cos(Math.PI*angleData[i-1]/180||0)//计算当前的x
    angleData[i] = 180*Math.atan(d(func)(x0))/Math.PI//计算当前的角度
  }
  return angleData.map((v, i) => {
    
    let s = (180 - v + (angleData[i - 1] || 0)) % 360
    
      //确保s∈(0, 360]
      while (s <= 0) {
        s += 360
      }
      return s
    })
}
input[1].addEventListener('keyup', function () {
  localStorage.setItem('adofai_LastInput',this.value);
  loadSongData()
});
function loadSongData() {
  try {
    const file = JSON.parse((input[1].value).replace((/,\s*\}/g), '}'))
    if (file.settings.artist === undefined||file.settings.song === undefined) {
      throw new Error()
    }
    document.querySelector('#songData').innerHTML = file.settings.artist + (file.settings.artist ? ' - ' : '') + file.settings.song
  } catch (e) {
    document.querySelector('#songData').innerHTML = '未知'
  }
}
window.onload = loadSongData()
function switchLanguage() {
  currentLunguage = !currentLunguage
  document.querySelector('#levelName').innerHTML = currentLunguage?'关卡名称':'the name of the level'
  document.querySelector('.input h3').innerHTML = currentLunguage?'冰与火之舞谱面转换器':'ADOFAI Custom Level Converter'
  document.querySelector('.input h3').className = currentLunguage?'cnTitle':'enTitle'
  document.querySelector('.input h4 span').innerHTML = currentLunguage?'上次更新':'Last Updated'
  document.querySelector('.input a').innerHTML = currentLunguage?'帮助和注意事项':'Help'
  document.querySelector('.input #fileImport').placeholder = currentLunguage?'导入文件':'Import File'
  document.querySelector('.input #convert').innerHTML = currentLunguage?'转换':'convert'
  document.querySelector('.input #ExchangePlanets').innerHTML = currentLunguage?'二三球互换':'Exchange Planets'
  document.querySelector('.input #clear').innerHTML = currentLunguage?'清空':'clear'
  document.querySelector('.input #FullSwirl').innerHTML = currentLunguage?'全旋转':'Full Swirl'
  document.querySelector('.input #FullStraight').innerHTML = currentLunguage?'全直线':'Full Straight'
    document.querySelector('.input #Fool').innerHTML = currentLunguage?'内外圈互换':'April Fools\'Day'
    document.querySelector('.input #random').innerHTML = currentLunguage?'随机角度':'Ramdom Angle'
    document.querySelector('.input #Visual').innerHTML = currentLunguage?'视觉优化':'Visual Optimization'
    document.querySelector('.input #FullHold').innerHTML = currentLunguage?'全长按':'Full Hold'
    document.querySelector('.input #circular').innerHTML = currentLunguage?'环形跑道':'Circluar Track'
    document.querySelector('.input #functionalize').innerHTML = currentLunguage?'函数化':'Functionalize'
    document.querySelector('.input #highlight').innerHTML = currentLunguage?'文本高光(可能会卡顿)':'Highlight the text(which may cause lag)'
    document.querySelector('#showBpm').innerHTML = currentLunguage?'展示Bpm':'Show Bpm'
    document.querySelector('#noSwirl').innerHTML = currentLunguage?'无旋转':'no Swirl'
    light();light()
    document.querySelector('.input a').href = currentLunguage?"javascript: alert('①如果转换时出现错误，可以尝试先导入游戏的编辑器里保存一遍，这时候导入刷新后的文件就行了。\n\n②二三球互换功能正在测试中，如果有三球关卡转化成二球关卡出现错误是正常现象，会在未来版本修复。\n\n③输入的文件是关卡文件(即adofai后缀的文件)。\n\n④由于某些原因，转换后建议先用编辑器保存一遍后重新打开。否则在多次转换时会出现错误。\n\n⑤部分模式暂时不支持中旋。')":"javascript:alert('①If there is an error during the conversion, you can try importing it into the level editor and saving it once. At this point, you can import the refreshed file.\n\n②Exchange Planets is currently being tested. If there is an error converting a three planets level to a two planets level, it is normal and will be fixed in a future version.\n\n③The input file is a level file (that is, a file with the suffix adofai).\n\n④Due to certain reasons, it is recommended to save it in an editor before reopening it after conversion. Otherwise, errors will occur during multiple conversions.\n\n⑤Some modes temporarily do not support Midspin Tiles.')"
    if (output[0].innerHTML !== '') {
    main(undefined,undefined,false)
    }
}
switchLanguage();switchLanguage()
function sum(f,start = 0,end = 0) {
f = format(f)
  let s = 0
  for (let i = start; i <= end; i++) {
    s += f(i)
  }
  return s
}
function format(fx) {
fx = String(fx).replace(/(\^)/g,'**').replace(/(y=)/g,'x=>')
  if (fx.indexOf('=>') === -1) {
    fx = 'x' + "=>" + fx
  }
  return eval(fx.replace(/(\d+)\s?([a-zA-Z]+)/g,'$1 * $2').replace(/(\)\()/g,')*(').replace(/\)(\w+)/g,')*$1'))
}
function int(f,start = 0, end = 0,num) {
  let s = 0
  f = format(f)
  const dx = deltaX*(end-start)
  for (let i = start; Math.abs(i - end) >= deltaX; i += dx) {
    const ds = (f(i+dx,num)+f(i,num))*dx/2
    if (!isNaN(ds)&&abs(ds)!==Infinity)/*abs(x)是Math.abs(x)*/ {
      s += ds
    }
  }
  return s
}//定积分
function uint(f) {
  return x => int(f,0,x,x)
}
const infty = 2 ** 50
function pow(a,b) {
  return Math.pow(a,b)
}
function sin(x) {
  return Math.sin(x)
}
function cos(x) {
  return Math.cos(x)
}
function tan(x) {
  return Math.tan(x)
}
function exp(x) {
  return Math.exp(x)
}
function abs(x) {
  return Math.abs(x)
}
function cot(x) {
  return 1/Math.tan(x)
}
function sqrt(x) {
  return Math.sqrt(x)
}
function factorial(num) {
  if (num < 0) return -1; // 防止传入负数
  else if (num === 0) return 1; // 零的阶乘为1
  else {
    return (num * factorial(num - 1)); // 递归调用自身来计算阶乘
  }
}
function ln(x) {
  return Math.log(x)
}
function log(a,x) {
  return ln(x)/ln(a)
}
function max() {
  return Math.max(...arguments)
}
const deltaX = 0.0001
  function d(f) {
  return x => (f(x + deltaX) - f(x)) / deltaX
}//求导
const e = Math.E
const pi = Math.PI
const phi = (sqrt(5)-1)/2
