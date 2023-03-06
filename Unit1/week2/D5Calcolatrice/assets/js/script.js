const display = document.getElementById('display');
const buttons = document.getElementsByTagName('button');

/*La event.target proprietà può essere utilizzata 
per implementare la delega degli eventi .

*/
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(e) {
    let value = e.target.innerText;  
    switch (value) {
      case 'C':
        display.value = '';
        break;

      case '=':
        display.value = eval(display.value);
        break;
      default:
        display.value += value;
        break;
    }
  });
}

window.alert('Accederai alla calcolatrice di Daniele'); 
alert("Cominciamo!")

