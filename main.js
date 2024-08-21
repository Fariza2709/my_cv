document.addEventListener('DOMContentLoaded', function() {

  function scrollToSection() {
    document.getElementById('contacts').scrollIntoView({ behavior: "smooth" });
  }

  window.scrollToSection = scrollToSection;

  function sendMessage(event) {
    event.preventDefault(); 

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var telephone = document.getElementById('telephone').value;
    var message = document.getElementById('message').value;
  
    var text = 'Имя: ' + name + '\nEmail: ' + email + '\nНомер телефона: ' + telephone + '\nСообщение: ' + message;
  
    var botToken = '7206025006:AAHxtqwp3DOR-3nI_6FALGOkUYQJoSFoFv8';
    var chatId = '470177311';

    var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    const successfulDispatch = document.querySelector('.successfulDispatch');
    const deliveryFailure = document.querySelector('.deliveryFailure');

  
    successfulDispatch.style.display = 'none';
    deliveryFailure.style.display = 'none';

    fetch(url)
      .then(response => {
        if (response.ok) {
          localStorage.setItem('messageStatus', 'success');
          window.location.reload();
        } else {
          document.querySelector('.deliveryFailure').style.display = 'block';
        }
      })
      .catch(error => {
        deliveryFailure.style.display = 'block';
      });
  }

  document.querySelector('form').addEventListener('submit', sendMessage);

  
  if (localStorage.getItem('messageStatus') === 'success') {
    const successfulDispatch = document.querySelector('.successfulDispatch');
    successfulDispatch.style.display = 'block';
    localStorage.removeItem('messageStatus');

    setTimeout(function() {
      successfulDispatch.style.display = 'none';
    }, 6000);
  }
});
