function SaveProfile() {

  var newprofile = {
    name: document.getElementById('profileName').value,
    surname: document.getElementById('profileSurname').value,
    age: document.getElementById('profileAge').value,
    email: document.getElementById('profileMail').value,
    phone: document.getElementById('profilePhone').value
  };

 // if (form.was-validated) {
    localStorage.setItem('profileinfo', JSON.stringify(newprofile));
  //};
};




function ShowInfoProfile(object) {
  document.getElementById('profileName').value = object.name
  document.getElementById('profileSurname').value = object.surname
  document.getElementById('profileAge').value = object.age
  document.getElementById('profilePhone').value = object.phone
  document.getElementById('profileMail').value = object.email
};




document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.getItem('profileinfo')) {
    let profileobj = JSON.parse(localStorage.getItem('profileinfo'))
    ShowInfoProfile(profileobj);
  } else {
    alert('Por favor ingrese los datos');
    document.getElementById('profileMail').value = localStorage.getItem('user')
  }

  (function () {
    'use strict';
    window.addEventListener('load', function () {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else { 
            SaveProfile();}
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

});


