function validateProfile(e) {
  e.preventDefault();

  var valid = true;

  //perform checks on inputs
  nameCheck(valid);
  addressCheck(valid);
  ageCheck(valid);
  dateCheck(valid);
  radioCheck(valid);
  checkboxCheck(valid);
  listCheck(valid);

  // display a warning if text is not entered, 
  // or if text is less than 3 characters
  function nameCheck(valid) {
    if ($('#name').val() == '') {
      $('#nameError').text('*please enter your name');
      valid = false;
    } else if ($('#name').val().length < 2) {
      $('#nameError').text('*please enter at least 2 characters');
      valid = false;
    }
    return valid;
  }

  // display a warning if text is not entered, 
  // or if text is less than 5 or greater than 30 characters
  function addressCheck() {
    if ($('#address').val() == '') {
      $('#addressError').text('*please enter your address');
      valid = false;
    } else if ($('#address').val().length < 5) {
      $('#addressError').text('*please enter at least 5 characters');
      valid = false;
    } else if ($('#address').val().length > 30) {
      $('#addressError').text('*please enter no more than 30 characters');
      valid = false;
    }
    return valid;
  }

  // display a warning if a number is not entered,
  // or if the number is negative or greater than 149.
  function ageCheck(valid) {
    if ($('#age').val() == '') {
      $('#ageError').text('*please enter anh age');
      valid = false;
    } else if (Number($('#number').val()) < 0) {
      $('#ageError').text('*age must be positive');
      valid = false;
    } else if (Number($('#age').val()) > 149) {
      $('#ageError').text('*age must be below 150');
      valid = false;
    }
    return valid;
  }

  // display a warning if no date is entered
  function dateCheck(valid) {
    if ($('#date').val() == '') {
      $('#dateError').text('*Please enter a date');
      valid = false;
    }
    return valid;
  }

  //display a warning if no radio buttons are selected
  function radioCheck(valid) {
    let option1Checked = Boolean($('#option1').prop('checked'));
    let option2Checked = Boolean($('#option2').prop('checked'));
    let option3Checked = Boolean($('#option3').prop('checked'));

    if (!option1Checked && !option2Checked && !option3Checked) {
      $('#radioError').text('*please select an option');
      valid = false;
    }
    return valid;
  }

  // display a warning if box is unchecked
  function checkboxCheck(valid) {
    if (Boolean($('#checkBox').prop("checked")) == false) {
      $('#checkboxError').text('*You must agree to continue');
      valid = false;
    }
    return valid;
  }

  // display a warning if no option is selected or entered
  function listCheck(valid) {
    if ($('#dTime').val() == '') {
      $('#listError').text('*select an option or type your own');
      valid = false;
    }
    return valid;
  }


  //! hard-coded for 3 items due to time constraints and for full functionality
  // create the Cart class and it's constructor
  class Cart {
    constructor(nOfitem1, nOfitem2, nOfitem3) {
      this.nOfitem1 = nOfitem1;
      this.nOfitem2 = nOfitem2;
      this.nOfitem3 = nOfitem3;
    }
    populate() {
      //populate the ul with the object attributes as list items
      if (this.nOfitem1 > 0) {
        $('.cartOl').append($(document.createElement('li')).text(this.nOfitem1 + ' ' + itemsArray.items[0].itemName));
      }
      if (this.nOfitem2 > 0) {
        $('.cartOl').append($(document.createElement('li')).text(this.nOfitem2 + ' ' + itemsArray.items[1].itemName));
      }
      if (this.nOfitem3 > 0) {
        $('.cartOl').append($(document.createElement('li')).text(this.nOfitem3 + ' ' + itemsArray.items[2].itemName));
      }
    }
  }

  //create the Profile class and it's constructor
  class Profile {
    constructor(name, address, age, date, dTime, serviceTier) {
      this.name = name;
      this.address = address;
      this.age = age;
      this.date = date;
      this.dTime = dTime;
      this.tier = serviceTier;
    }
    populate() {
      //populate the ul with the object attributes as list items
      $('.profileUl').append($(document.createElement('li')).text("Name: " + this.name));
      $('.profileUl').append($(document.createElement('li')).text("Address: " + this.address));
      $('.profileUl').append($(document.createElement('li')).text("Age: " + this.age));
      $('.profileUl').append($(document.createElement('li')).text("Target delivery date: " + this.date));
      $('.profileUl').append($(document.createElement('li')).text("Preferred delivery time: " + this.dTime));
      $('.profileUl').append($(document.createElement('li')).text("Service tier: " + this.tier));
    }
  }

  //definition of a void function to create and populate the html elements to display the entered form info and chosen items
  function displaySummary() {
    const pName = $('#name').val();
    const pAddress = $('#address').val();
    const pAge = $('#age').val();
    const pDate = $('#date').val();
    const pDTime = $('#dTime').val();
    const pTier = $('input:radio[name="radioOption"]').val();

    //create new
    user = new Profile(pName, pAddress, pAge, pDate, pDTime, pTier);
    myCart = new Cart($('#itemAmount0').data('amount'), $('#itemAmount1').data('amount'), $('#itemAmount2').data('amount'));

    
    //User Profile
    let profileUl = document.createElement('ul');
    let profileDiv = document.createElement('div');
    let profileTitle = document.createElement('h3');
    
    
    //user profile elements
    $('.container').after($(profileDiv).addClass('profileContainer'));
    $('.profileContainer').append($(profileTitle).addClass('profileUlTitle').text('User Profile:'));
    $('.profileUlTitle').after($(profileUl).addClass('profileUl'));
    
    //cart/summary 
    let cartDiv = document.createElement('div');
    let cartOl = document.createElement('ol');
    let cartTitle = document.createElement('h3');
    
    //cart/summary elements
    $('.profileContainer').after($(cartDiv).addClass('cartDiv'));
    $('.cartDiv').append($(cartTitle).addClass('cartOlTitle').text('Items Chosen:'));
    $('.cartOlTitle').after($(cartOl).addClass('cartOl'));

    myCart.populate();
    user.populate();
  }

  // check for form validity 
  if (!valid) {
    return false;
  } else {
    displaySummary();
    return true;
  }


}
