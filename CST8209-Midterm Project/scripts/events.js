let requestURL = 'data.json';

$(document).ready(function () {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      itemsArray = JSON.parse(this.responseText);

      buildStore(itemsArray);

      var total = $('.total').data('total');
      //event listener for itemAdd buttons
      $('.itemDiv').find('.itemAdd').each(function () {
        $(this).on('click', function () {
          var subtotal = $(this).siblings('.itemSubtotal').data('subtotal');
          var amount = $(this).siblings('.itemAmount').data('amount');
          var price = $(this).siblings('.itemPrice').data('cost');

          subtotal += price;
          total += price;
          amount++;

          $(this).siblings('.itemSubtotal').data('subtotal', subtotal);
          $(this).siblings('.itemAmount').data('amount', amount);

          //update display
          $(this).siblings('.itemSubtotal').text('SubTotal: $' + subtotal);
          $(this).siblings('.itemAmount').text('Quantity: ' + amount);
          $('.total').val(String(total));
          $('.total').attr('data-total', String(total));
        });
      });
    }
  }

  request.open("GET", requestURL, true);
  request.send();

  //runs the form validation script upon pressing the submit button
  $('form').submit(validateProfile);

  function buildStore(itemsArray) {
    const items = itemsArray.items;
    let newDiv = document.createElement('div');

    //creates the div to populate with items
    $(newDiv).addClass('container');
    $('body').append(newDiv);
    $('.total').data('.total', 0);


    for (let i = 0; i < items.length; i++) {
      var stri = String(i);
      let newH3 = document.createElement('h3');
      let itemDiv = document.createElement('div');
      let pricep = document.createElement('p');
      let itemAmount = document.createElement('p');
      let itemSubtotal = document.createElement('p');
      let image = document.createElement('img');

      //creates item div
      $('.container').append($(itemDiv).attr('id', 'itemDiv' + stri).addClass('itemDiv'));

      //creates names & adds attributes class,id,data
      $('#itemDiv' + stri).append($(newH3).attr('id', 'itemName' + stri).addClass('itemName').data('name', items[i].itemName));
      let name = $('#itemName' + stri).data().name;
      $('#itemName' + stri).text(name);

      //creates images & adds attributes class,id
      $('#itemName' + stri).after($(image).attr('id', 'itemImage' + stri).addClass('itemImage'));
      $('#itemImage' + stri).attr({
        'src': items[i].image,
        'alt': 'item' + stri
      });

      //creates prices & adds attributes class,id,data
      $('#itemDiv' + stri).append($(pricep).attr('id', 'itemPrice' + stri).addClass('itemPrice').data('cost', Number(items[i].price)));
      let cost = $('#itemPrice' + stri).data().cost;
      $('#itemPrice' + stri).text("Price: $" + cost);
      

      //creates amounts & adds attributes class,id,data
      $('#itemDiv' + stri).append($(itemAmount).attr('id', 'itemAmount' + stri).addClass('itemAmount').data('amount', 0));
      let amount = $('#itemAmount' + stri).data().amount;
      $('#itemAmount' + stri).text('Quantity: ' + amount);
      

      //creates subtotals & adds attributes class,id,data
      $('#itemDiv' + stri).append($(itemSubtotal).attr('id', 'itemSubtotal' + stri).addClass('itemSubtotal').data('subtotal', 0));
      let subtotal = $('#itemSubtotal' + stri).data().subtotal;
      $('#itemSubtotal' + stri).text('SubTotal: ' + subtotal);
      

      //create buttons 
      var add = document.createElement('button');
      $('#itemDiv' + stri).append($(add).attr('id', 'itemAdd' + stri).addClass('itemAdd').data('itemNum', i).text('+'));
    }
  }

  //resets all the error spans upon pressing the reset button
  $('input:reset').on('click', function () {
    $('.alert').each(function () {
      $(this).text('');
    });
    $('.ProfileContainer').children().each(function () {
      $(this).remove();
      $('.ProfileContainer').remove();
    });
    $('.itemAmount').data('amount', 0);
    $('.itemAmount').text('Quantity: ' + 0);

    $('.itemSubtotal').data('subtotal', 0);
    $('.itemSubtotal').text('SubTotal: ' + 0);

    $('.total').data('total', 0);
    $('.total').val('0');
    $('.total').attr('data-total', 0);
  });

  //clears the name error span on altering the text
  $('#name').change(function () {
    if ($(this).val()) {
      $('#nameError').text('');
    }
  });

  //clears the address error span on altering the text
  $('#address').change(function () {
    if ($(this).val() !== '') {
      $('#addressError').text('');
    }
  });

  //clears the age error span on altering the number
  $('#age').change(function () {
    if (Number($(this).val()) !== '') {
      $('#ageError').text('');
    }
  });

  //clears the date error span if a proper date is entered
  $('#date').change(function () {
    if ($(this).val() !== '') {
      $('#dateError').text('');
    }
  });

  //clears the list error span on selecting an option that is not the instructions
  $('#dTime').change(function () {
    if ($(this).val() !== '') {
      $('#listError').text('');
    }
  });

  $('#option1, #option2, #option3').change(function () {
    if (Boolean($(this).prop('checked'))) {
      $('#radioError').text('');
    }
  });

  $('#checkBox').change(function () {
    if (Boolean($(this).prop('checked'))) {
      $('#checkboxError').text('');
    }
  });
});
