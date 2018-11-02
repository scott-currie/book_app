'use strict';


$('.selectButton').on('click', toggleForm);

function toggleForm(event) {
  console.log(event.target.id.replace('button', '#form'));
  $(event.target.id.replace('button', '#form')).toggle();
}