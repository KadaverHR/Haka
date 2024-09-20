// const { number } = require("yargs");


$(document).ready(function () {





  const Svg = () => {
    let x = [".svg"];
    x.forEach((item) => {
      $(item).each(function () {
        let $img = $(this);
        let imgClass = $img.attr("class");
        let imgURL = $img.attr("src");
        $.get(
          imgURL,
          function (data) {
            let $svg = $(data).find("svg");
            if (typeof imgClass !== "undefined") {
              $svg = $svg.attr("class", imgClass + " replaced-svg");
            }
            $svg = $svg.removeAttr("xmlns:a");
            if (
              !$svg.attr("viewBox") &&
              $svg.attr("height") &&
              $svg.attr("width")
            ) {
              $svg.attr(
                "viewBox",
                "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
              );
            }
            $img.replaceWith($svg);
          },
          ""
        );
      });
    });
  };
  Svg();


  ///работа с формой

  let reset = document.getElementById('reset')
  reset.addEventListener('click', () => {
    location.reload()
  })

  function handleFormSubmit(event) {
    event.preventDefault()
    serializeForm(applicantForm)
    let dn = document.getElementById('settingMap')
    dn.classList.add('d-n')
    let map = document.querySelector('.haka__box')
    map.classList.remove('d-n')
  }

  const applicantForm = document.getElementById('settingMap')
  applicantForm.addEventListener('submit', handleFormSubmit)

  const shuffle = (array) => {
    let m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  function serializeForm(formNode) {
    const { elements } = formNode
    let arr = []
    const data = Array.from(elements)
      .filter((item) => !!item.id)
      .map((element) => {

        const { id, value } = element
        let count = value
        switch (id) {
          case 'miniboss':
            while (count) {
              arr.push('miniBoss')
              count--
            }
            break;
          case 'stone':
            while (count) {
              arr.push('stone')

              count--
            }
            break;
          case 'boss':
            while (count) {
              arr.push('boss')

              count--
            }
            break;

        }
      })
    while ((arr.length + 1) <= 37) {
      arr.push('NULL');
    }
    shuffle(arr)


    function getRandomNumber(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }

    arr.splice(getRandomNumber(0, 40), 0, "bigBoss")
    arr.splice(34, 0, "start")
    arr.splice(getRandomNumber(0, 4), 0, "door")


    let hakaList = arr
    let count = -1
    let i = -1
    let hakaBox = document.querySelector('.haka__box')
    hakaList.forEach(element => {
      i++
      let hakaBlock = document.createElement('button')
      hakaBlock.classList.add('haka__block')

      switch (element) {
        case "NULL":
          hakaBlock.innerHTML = `	<div value="" class="haka">
   
      </div>`
          break;
        case 'miniBoss':
          hakaBlock.innerHTML = `	<div value="block" class="haka">
        <img src="assets/img/MB.png" >
      </div>`
          break;
        case 'stone':
          hakaBlock.innerHTML = `	<div value="block" class="haka">
        <img src="assets/img/S.png" >
      </div>`
          break;
        case 'boss':
          hakaBlock.innerHTML = `	<div value="block" class="haka">
        <img src="assets/img/B.png" >
      </div>`
          break;
        case 'bigBoss':
          hakaBlock.innerHTML = `	<div value="block" class="haka">
        <img src="assets/img/BB.png" >
      </div>`
          break;
        case 'door':
          hakaBlock.innerHTML = `	<div value="" class="haka">
        <img src="assets/img/D.png" >
      </div>`
          break;
        case 'start':
          hakaBlock.innerHTML = `	<div value="start" class="haka start">
       
      </div>`
          break;
      }
      count = count + 1
      hakaBlock.setAttribute('atr', count)
      hakaBlock.setAttribute('clickBlock', 0)
      hakaBlock.setAttribute('kill', 0)
      hakaBlock.setAttribute('disabled', '')


      if ((i == 30) || (i == 36)) {
        hakaBlock.disabled = false
      }

      hakaBox.append(hakaBlock)



    });





    let clickBlock = 0
    let minus = 0




    $(hakaBox).on('click', '.haka__block', function () {

      let openHaka = this.querySelector('.haka')
      ///////////
      let parant = this.parentElement
      let allbtns = parant.querySelectorAll('.haka__block')
      let open1 = Number(this.getAttribute('atr')) - 5
      let open2 = Number(this.getAttribute('atr')) + 5
      let open3 = Number(this.getAttribute('atr')) + 1
      let open4 = Number(this.getAttribute('atr')) - 1


      let topBlock = allbtns[open1]
      let bottomBlock = allbtns[open2]
      let rightBlock = allbtns[open3]
      let leftBlock = allbtns[open4]



      /////////////(!this.classList.contains('disabled'))


      if ((!(openHaka.getAttribute('value') == 'block')) && (!this.disabled)) {

        console.log(this.disabled)

        this.classList.add('open')

        if (topBlock && (!topBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '0')) && (!(this.getAttribute('atr') == '1')) && (!(this.getAttribute('atr') == '2')) && (!(this.getAttribute('atr') == '3')) && (!(this.getAttribute('atr') == '4'))) {
          topBlock.disabled = false
        }
        if (bottomBlock && (!bottomBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '35')) && (!(this.getAttribute('atr') == '36')) && (!(this.getAttribute('atr') == '37')) && (!(this.getAttribute('atr') == '38')) && (!(this.getAttribute('atr') == '39'))) {
          bottomBlock.disabled = false
        }
        if (rightBlock && (!rightBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '4')) && (!(this.getAttribute('atr') == '9')) && (!(this.getAttribute('atr') == '14')) && (!(this.getAttribute('atr') == '19')) && (!(this.getAttribute('atr') == '24')) && (!(this.getAttribute('atr') == '29')) && (!(this.getAttribute('atr') == '34')) && (!(this.getAttribute('atr') == '39'))) {
          rightBlock.disabled = false
        }
        if (leftBlock && (!leftBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '0')) && (!(this.getAttribute('atr') == '5')) && (!(this.getAttribute('atr') == '10')) && (!(this.getAttribute('atr') == '15')) && (!(this.getAttribute('atr') == '20')) && (!(this.getAttribute('atr') == '25')) && (!(this.getAttribute('atr') == '30'))) {
          leftBlock.disabled = false
        }

      }



      if ((openHaka.getAttribute('value') == 'block') && (!this.classList.contains('open')) && (!this.disabled)) {
        this.classList.add('open')
        this.setAttribute('kill', 1)


        if (topBlock && (!topBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '0')) && (!(this.getAttribute('atr') == '1')) && (!(this.getAttribute('atr') == '2')) && (!(this.getAttribute('atr') == '3')) && (!(this.getAttribute('atr') == '4'))) {
          topBlock.disabled = false
        }
        if (bottomBlock && (!bottomBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '35')) && (!(this.getAttribute('atr') == '36')) && (!(this.getAttribute('atr') == '37')) && (!(this.getAttribute('atr') == '38')) && (!(this.getAttribute('atr') == '39'))) {
          bottomBlock.disabled = false
        }
        if (rightBlock && (!rightBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '4')) && (!(this.getAttribute('atr') == '9')) && (!(this.getAttribute('atr') == '14')) && (!(this.getAttribute('atr') == '19')) && (!(this.getAttribute('atr') == '24')) && (!(this.getAttribute('atr') == '29')) && (!(this.getAttribute('atr') == '34')) && (!(this.getAttribute('atr') == '39'))) {
          rightBlock.disabled = false
        }
        if (leftBlock && (!leftBlock.classList.contains('disabled')) && (!(this.getAttribute('atr') == '0')) && (!(this.getAttribute('atr') == '5')) && (!(this.getAttribute('atr') == '10')) && (!(this.getAttribute('atr') == '15')) && (!(this.getAttribute('atr') == '20')) && (!(this.getAttribute('atr') == '25')) && (!(this.getAttribute('atr') == '30'))) {
          leftBlock.disabled = false
        }


        //лев диз
        if (this.previousElementSibling && (!this.previousElementSibling.classList.contains('open')) && (!(this.getAttribute('atr') == '0')) && (!(this.getAttribute('atr') == '5')) && (!(this.getAttribute('atr') == '10')) && (!(this.getAttribute('atr') == '15')) && (!(this.getAttribute('atr') == '20')) && (!(this.getAttribute('atr') == '25')) && (!(this.getAttribute('atr') == '30'))) {


          clickBlock = Number(this.previousElementSibling.getAttribute('clickBlock')) + Number(1)
          this.previousElementSibling.setAttribute('clickBlock', clickBlock)
          this.previousElementSibling.classList.add('disabled')
          this.previousElementSibling.disabled = true

        }

        //прав диз
        if (this.nextElementSibling && (!this.nextElementSibling.classList.contains('open')) && (!(this.getAttribute('atr') == '4')) && (!(this.getAttribute('atr') == '9')) && (!(this.getAttribute('atr') == '14')) && (!(this.getAttribute('atr') == '19')) && (!(this.getAttribute('atr') == '24')) && (!(this.getAttribute('atr') == '29')) && (!(this.getAttribute('atr') == '34')) && (!(this.getAttribute('atr') == '39'))) {


          clickBlock = Number(this.nextElementSibling.getAttribute('clickBlock')) + Number(1)
          this.nextElementSibling.setAttribute('clickBlock', clickBlock)
          this.nextElementSibling.classList.add('disabled')
          this.nextElementSibling.disabled = true

        }


        let parant = this.parentElement

        let count1 = Number(this.getAttribute('atr')) + 5
        let count2 = Number(this.getAttribute('atr')) - 5

        let allbtns = parant.querySelectorAll('.haka__block')

        let top = allbtns[count1]
        let bot = allbtns[count2]


        //верх диз
        if (top && (!top.classList.contains('open')) && (!(top.getAttribute('atr') == '0')) && (!(top.getAttribute('atr') == '1')) && (!(top.getAttribute('atr') == '2')) && (!(top.getAttribute('atr') == '3')) && (!(top.getAttribute('atr') == '4'))) {

          clickBlock = Number(top.getAttribute('clickBlock')) + Number(1)
          top.setAttribute('clickBlock', clickBlock)
          top.classList.add('disabled')
          top.disabled = true


        }
        //низ диз
        if (bot && (!bot.classList.contains('open')) && (!(bot.getAttribute('atr') == '35')) && (!(bot.getAttribute('atr') == '36')) && (!(bot.getAttribute('atr') == '37')) && (!(bot.getAttribute('atr') == '38')) && (!(bot.getAttribute('atr') == '39'))) {


          clickBlock = Number(bot.getAttribute('clickBlock')) + Number(1)
          bot.setAttribute('clickBlock', clickBlock)
          bot.classList.add('disabled')
          bot.disabled = true
        }










        $(parant).on('click', '.open', function () {

          if (this.classList.contains('open') && (this.getAttribute('kill') == '1')) {

            this.classList.add('kill')
            this.setAttribute('kill', 2)

            let parant2 = this.parentElement
            let allbtns2 = parant2.querySelectorAll('.haka__block')
            let open1 = Number(this.getAttribute('atr')) - 5
            let open2 = Number(this.getAttribute('atr')) + 5
            let open3 = Number(this.getAttribute('atr')) + 1
            let open4 = Number(this.getAttribute('atr')) - 1


            let topBlock = allbtns2[open1]
            let bottomBlock = allbtns2[open2]
            let rightBlock = allbtns2[open3]
            let leftBlock = allbtns2[open4]

            if (topBlock && (!(this.getAttribute('atr') == '0')) && (!(this.getAttribute('atr') == '1')) && (!(this.getAttribute('atr') == '2')) && (!(this.getAttribute('atr') == '3')) && (!(this.getAttribute('atr') == '4'))) {
              topBlock.disabled = false
            }
            if (bottomBlock && (!(this.getAttribute('atr') == '35')) && (!(this.getAttribute('atr') == '36')) && (!(this.getAttribute('atr') == '37')) && (!(this.getAttribute('atr') == '38')) && (!(this.getAttribute('atr') == '39'))) {
              bottomBlock.disabled = false
            }
            if (rightBlock && (!(this.getAttribute('atr') == '4')) && (!(this.getAttribute('atr') == '9')) && (!(this.getAttribute('atr') == '14')) && (!(this.getAttribute('atr') == '19')) && (!(this.getAttribute('atr') == '24')) && (!(this.getAttribute('atr') == '29')) && (!(this.getAttribute('atr') == '34')) && (!(this.getAttribute('atr') == '39'))) {
              rightBlock.disabled = false
            }
            if (leftBlock && (!(this.getAttribute('atr') == '0')) && (!(this.getAttribute('atr') == '5')) && (!(this.getAttribute('atr') == '10')) && (!(this.getAttribute('atr') == '15')) && (!(this.getAttribute('atr') == '20')) && (!(this.getAttribute('atr') == '25')) && (!(this.getAttribute('atr') == '30'))) {
              leftBlock.disabled = false
            }


            if (this.previousElementSibling && (!this.previousElementSibling.classList.contains('open')) && (!(this.getAttribute('atr') == '5')) && (!(this.getAttribute('atr') == '10')) && (!(this.getAttribute('atr') == '15')) && (!(this.getAttribute('atr') == '20')) && (!(this.getAttribute('atr') == '25')) && (!(this.getAttribute('atr') == '30'))) {


              minus = Number(this.previousElementSibling.getAttribute('clickBlock')) - Number(1)
              this.previousElementSibling.setAttribute('clickBlock', minus)
              console.log(minus, "я тут слева")
              if (minus == 0) {
                this.previousElementSibling.classList.remove('disabled')
              }
            }




            if (this.nextElementSibling && (!this.nextElementSibling.classList.contains('open')) && (!(this.getAttribute('atr') == '4')) && (!(this.getAttribute('atr') == '9')) && (!(this.getAttribute('atr') == '14')) && (!(this.getAttribute('atr') == '19')) && (!(this.getAttribute('atr') == '24')) && (!(this.getAttribute('atr') == '29')) && (!(this.getAttribute('atr') == '40'))) {

              minus = Number(this.nextElementSibling.getAttribute('clickBlock')) - Number(1)
              this.nextElementSibling.setAttribute('clickBlock', minus)
              console.log(minus, "я тут справа")
              if (minus == 0) {
                this.nextElementSibling.classList.remove('disabled')
              }

            }


            let parant = this.parentElement

            let count1 = Number(this.getAttribute('atr')) + 5
            let count2 = Number(this.getAttribute('atr')) - 5



            let top = allbtns[count1]
            let bot = allbtns[count2]


            if (top && (!top.classList.contains('open')) && (!(top.getAttribute('atr') == '0')) && (!(top.getAttribute('atr') == '1')) && (!(top.getAttribute('atr') == '2')) && (!(top.getAttribute('atr') == '3')) && (!(top.getAttribute('atr') == '4'))) {

              minus = Number(top.getAttribute('clickBlock')) - Number(1)
              top.setAttribute('clickBlock', minus)
              if (minus == 0) {
                top.classList.remove('disabled')
              }

            }

            if (bot && (!bot.classList.contains('open')) && (!(bot.getAttribute('atr') == '35')) && (!(bot.getAttribute('atr') == '36')) && (!(bot.getAttribute('atr') == '37')) && (!(bot.getAttribute('atr') == '38')) && (!(bot.getAttribute('atr') == '39'))) {

              minus = Number(bot.getAttribute('clickBlock')) - Number(1)
              bot.setAttribute('clickBlock', minus)

              if (minus == 0) {
                bot.classList.remove('disabled')
              }

            }
          }




        })

      }












    })



  }




})