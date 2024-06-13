

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




  let hakaList = [`stone`, `miniBoss`, null, 'door', `stone`,
    null, null, null, null, null,
    null, null, `boss`, null, `boss`,
    `boss`, null, null, null, null,
    null, null, `boss`, null, `miniBoss`,
    null, `stone`, null, null, null,
    `miniBoss`, null, `bigBoss`, null, null,
    'statr', null, `stone`, null, `stone`]


  let hakaBox = document.querySelector('.haka__box')
  let count = 0

  hakaList.forEach(element => {
    let hakaBlock = document.createElement('button')
    hakaBlock.classList.add('haka__block')
    switch (element) {
      case null:
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
        hakaBlock.innerHTML = `	<div value="open" class="haka">
        <img src="assets/img/D.png" >
      </div>`
        break;
      case 'statr':
        hakaBlock.innerHTML = `	<div value="statr" class="haka">
       
      </div>`
        break;
    }
    count = count + 1
    hakaBlock.setAttribute('atr', count)
    hakaBox.append(hakaBlock)
      ;
  });



  $(hakaBox).on('click', '.haka__block', function () {
    this.classList.add('open')
    let openHaka = this.querySelector('.haka')

    if (openHaka.getAttribute('value') == 'block') {
      console.log(this.getAttribute('atr'));

      if (this.previousElementSibling && (!this.previousElementSibling.classList.contains('open')) && (!(this.getAttribute('atr') == '6')) && (!(this.getAttribute('atr') == '11')) && (!(this.getAttribute('atr') == '16')) && (!(this.getAttribute('atr') == '21')) && (!(this.getAttribute('atr') == '26')) && (!(this.getAttribute('atr') == '31'))) {
        this.previousElementSibling.setAttribute('disabled', '')
      }




      if (this.nextElementSibling &&(!this.nextElementSibling.classList.contains('open')) && (!(this.getAttribute('atr') == '5')) && (!(this.getAttribute('atr') == '10')) && (!(this.getAttribute('atr') == '15')) && (!(this.getAttribute('atr') == '20')) && (!(this.getAttribute('atr') == '25')) && (!(this.getAttribute('atr') == '30')) && (!(this.getAttribute('atr') == '40'))) {
        this.nextElementSibling.setAttribute('disabled', '')
      }


      let parant = this.parentElement

      let count1 = Number(this.getAttribute('atr')) + 5
      let count2 = Number(this.getAttribute('atr')) - 5

      if (count1 > 39) {
        count1 = 39
      }

      if (count2 < 0) {
        count2 = 0
      }

      let allbtns = parant.querySelectorAll('.haka__block')

      let top = allbtns[count1-1] 
      let bot = allbtns[count2-1]

      console.log(count1, count2)

      if ( top && (!top.classList.contains('open')) && (!(top.getAttribute('atr') == '1')) && (!(top.getAttribute('atr') == '2')) && (!(top.getAttribute('atr') == '3')) && (!(top.getAttribute('atr') == '4')) && (!(top.getAttribute('atr') == '5'))) {
        top.setAttribute('disabled', '')
      }

      if (bot && (!bot.classList.contains('open')) && (!(bot.getAttribute('atr') == '36')) && (!(bot.getAttribute('atr') == '37')) && (!(bot.getAttribute('atr') == '38')) && (!(bot.getAttribute('atr') == '39')) && (!(bot.getAttribute('atr') == '40'))) {
        bot.setAttribute('disabled', '')
      }
      
      
    }


  })



})