$(document).ready(function () {
  //search params
  const queryString = window.location.search;

  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('work')) {
      $('#utmInput').attr({
        name: 'id',
        value: urlParams.get('work')
      });
    } else if (urlParams.get('worker')) {
      $('#utmInput').attr({
        name: 'author',
        value: urlParams.get('worker')
      });
    }
  }

  //auth

  let token;
  $.ajax({
    url: 'https://db.smartpeoplemoving.com/wp-json/jwt-auth/v1/token',
    method: 'POST',
    header: {
      'Access-Control-Allow-Origin': '*'
    },
    data: {
      username: 'admin',
      password: 'WDp1 hk2c dzDk 5KN7 y3PU g1bx'
    },
    success: function (data, txtStatus, xhr) {
      token = data.token;
    }
  });
  //селекты
  $('#calcForm select').select2({
    minimumResultsForSearch: -1
  });
  $('#calcForm select, #calcForm input, #calcForm textarea').prop(
    'disabled',
    true
  );
  //$('#calcForm select, #calcForm input, #calcForm textarea').prop('required', false);

  //закрываем траки
  $('#bedroom')
    .prop('disabled', false)
    .on('change', function () {
      $('#truck').prop('disabled', false);
      switch ($(this).find(':selected').attr('id')) {
        case 'studio':
        case 'oneBed':
          $('#twentyTruck, #twentySixTruck').prop('disabled', true);
          $('#sixteenTruck, #twoMovers, #threeMovers').prop('disabled', false);
          break;
        case 'twoBed':
          $('#sixteenTruck').prop('disabled', true);
          $('#twentyTruck, #twentySixTruck, #twoMovers, #threeMovers').prop(
            'disabled',
            false
          );
          break;
        case 'threeBed':
          $('#sixteenTruck, #twentyTruck, #twoMovers').prop('disabled', true);
          $('#twentySixTruck, #twoMovers, #threeMovers').prop(
            'disabled',
            false
          );
          break;
        case 'fourBed':
        case 'fiveBed':
        case 'sixBed':
          $('#sixteenTruck, #twentyTruck, #twoMovers').prop('disabled', true);
          $('#twentySixTruck, #threeMovers').prop('disabled', false);
          break;
      }
    });

  //Активируем payment type
  $('#movers').on('change', function () {
    $('#calcForm select#payment').select2({
      minimumResultsForSearch: -1
    });
  });

  //проверка нужен ли пакинг
  $('#supplies').on('change', function () {
    if ($(this).find(':selected').attr('value') === 'yes') {
      $('#supplies-box').css('display', 'block');
    }
  });

  $(document).on('change', '.change-stairs', function () {
    const count = $(this).find(':selected').val();
    if (count > 2) {
      $('#truckFee').attr(
        'data-stairs',
        Number($('#truckFee').attr('data-stairs')) + count * 5
      );
    }
  });

  $('#truck').on('change', function () {
    $('#movers').prop('disabled', false);
    $('#datepicker').datepicker({
      minDate: new Date(),
      altFormat: 'yymmdd',
      altField: '#alt-date'
    });
    $('#datepicker').prop('disabled', false);
  });

  //выбор даты, проверка на выходной, закрываем слоты со временем
  $('#datepicker').on('change', function () {
    $('#time, #time option').prop('disabled', false);
    const chosenDate = new Date($(this).val());
    const numDate = chosenDate.getDay();
    //будние
    if (numDate > 0 && numDate < 5) {
      $(this).attr('data-price', 0);
      //выходные
    } else {
      $(this).attr('data-price', 10);
      $('.otherDay').prop('disabled', true);
    }

    const moversPrice = $('#movers').find(':selected').data('price');
    const datePrice = $(this).attr('data-price');
    $('#cash').text(`Cash $${Number(moversPrice) + Number(datePrice)}/h`);
    $('#card').text(
      `Credit card $${Number(moversPrice) + Number(datePrice) + 10}/h`
    );
    $('#venmo').text(
      `Venmo $${Number(moversPrice) + Number(datePrice) + 10}/h`
    );
    $('#zelle').text(
      `Zelle $${Number(moversPrice) + Number(datePrice) + 10}/h`
    );
    $('#payment').select2('destroy').select2();
  });

  $('#time').on('change', function () {
    $('#calcForm select, #calcForm input, #calcForm textarea').prop(
      'disabled',
      false
    );
    initialize();
  });

  //калькулятор
  $('#calcForm').on('change', function () {
    let doubleDrive;
    const datePrice = Number($('#datepicker').attr('data-price')),
      moversPrice = Number($('#movers').find(':selected').data('price')),
      moversCount = $('#movers').find(':selected').val(),
      paymentPrice = Number($('#payment').find(':selected').data('price')),
      paymentType = $('#payment').find(':selected').val(),
      heavyItems = Number($('#heavyItems').find(':selected').data('price')),
      truck = $('#truck').find(':selected').data('id');
    stairsPrice = Number($('#truckFee').attr('data-stairs'));
    smallboxes = Number($('#small-boxes').val());
    mediumboxes = Number($('#medium-boxes').val());
    wrappingpaper = Number($('#wrapping-paper').val());
    totalForBox = smallboxes * 3 + mediumboxes * 4 + wrappingpaper * 40;

    const result = moversPrice + datePrice + paymentPrice,
      // total = result * 3 + 50 + heavyItems + totalForBox,
      arriving = truck == '00' ? 50 : 0,
      total = result * 3 + arriving + heavyItems + totalForBox,
      heavyItemstext = '+ $300 for heavy items',
      // formatRes = `For 3 hours minimum with <b>${moversCount} crew</b>, with ${paymentType} payment: <b>$${result}/h x 3 hours + <span id="span-double-drive">$50(truck fee)</span> ${
      //   heavyItems > 1 ? heavyItemstext : ''
      // }${smallboxes > 0 ? ` + $${smallboxes * 3} for ${smallboxes} small boxes` : ''}${
      //   mediumboxes > 0 ? ` + $${mediumboxes * 4} for ${mediumboxes} medium boxes` : ''
      // }${wrappingpaper > 0 ? ` + $${wrappingpaper * 40} for ${wrappingpaper} wrapping paper` : ''} = $${Math.round(
      //   total,
      // )}</b>`;
      formatRes = `For 3 hours minimum with <b>${moversCount} crew</b>, with ${paymentType} payment: <b>$${result}/h x 3 hours ${
        truck == '00'
          ? `+ <span id="span-double-drive">$50(arriving fee)</span>`
          : ''
      } ${heavyItems > 1 ? heavyItemstext : ''}${
        smallboxes > 0
          ? ` + $${smallboxes * 3} for ${smallboxes} small boxes`
          : ''
      }${mediumboxes > 0 ? ` + $${mediumboxes * 4} for ${mediumboxes} medium boxes` : ''}${
        wrappingpaper > 0
          ? ` + $${wrappingpaper * 40} for ${wrappingpaper} wrapping paper`
          : ''
      } = $${Math.round(total)}</b>`;

    if (moversPrice && paymentPrice > -1 && heavyItems > -1 && datePrice > -1) {
      $('#calcRes').html(formatRes);
      $('#inputResult').val(result);
    }
  });

  //отправка данных на сервер
  $('#calcForm').on('submit', function (e) {
    $('button.btn.btn-primary.btn-cust').prop('disabled', true);
    $('#form-spinner').css('display', 'inline');
    const work_id = $('[name="id"]').val() ? $('[name="id"]').val() : '';
    const createUrl = `https://db.smartpeoplemoving.com/wp-json/wp/v2/works/${work_id}`;
    const formData = $(this).serialize();
    $.ajax({
      url: createUrl,
      method: 'POST',
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData,
      success: function (data) {
        getSuccessMessage(data.acf.customer_info, data.acf.date);
        const aTag = $('.alert-success');
        $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
        $('#form-spinner').css('display', 'none');
      }
    }).fail(function (data) {
      $('#form-spinner').css('display', 'none');
    });
    return false;
  });

  function getSuccessMessage(data, date) {
    $('#calcForm').css('display', 'none');
    const el = document.createElement('div');
    el.classList.add('alert', 'alert-success');
    el.innerHTML = `
      <h4 class="alert-heading">Well done!</h4>
      <p>Your order information:</p>
      <hr>
      <h5 class="alert-heading">Contact information</h5>
      <ul class="mb-0">
        <li>Name: ${data.customer_name}</li>
        <li>Phone: ${data.customer_phone}</li>
        <li>Email: ${data.customer_email}</li>
        <li>Pick-Up Address: ${data.pickup_address[0].full_address}</li>
        <li>Drop-Off Address: ${data.dropoff_address[0].full_address}</li>
      </ul>
      <h5 class="alert-heading">Moving information</h5>
      <ul class="mb-0">
        <li>Date: ${date}</li>
        <li>Time: ${data.time}</li>
        <li>Crew size: ${data.movers}</li>
        <li>Payment: ${data.payment}</li>
        <li>Type of residency: ${data.typeofresidency}</li>
        <li>Packing: ${data.packing}</li>
        <li>Small boxes: ${data.small_boxes}</li>
        <li>Medium boxes: ${data.medium_boxes}</li>
        <li>Wrapping paper: ${data.wrapping_paper}</li>
      </ul>
            `;
    document.getElementById('formContainer').append(el);
  }

  //multi acf
  function createEl(count, group, title) {
    const name = field => `acf[customer_info][${group}][${count}][${field}]`;
    return `
    <div class="${group}${count}">
      <div class="section-header col-md-12">
        <b>${title} <span class="delete_group" data-name="${group}${count}">(delete)</span></b>
      </div>
      <div class="form-group col-md-6">
        <input id="pickup_address" required type="text" name="${name(
          'full_address'
        )}" class="form-control google-address" placeholder="Address">
      </div>
      <div class="form-group col-md-3">
        <input id="dropoff_address" type="number" name="${name('unit')}" class="form-control" placeholder="Unit">
      </div>
      <div class="form-group col-md-3">
        <input id="dropoff_address" type="number" name="${name('zip')}" class="form-control" placeholder="Zip Code">
      </div>
    </div>
    `;
  }

  $('.multi-field-add').on('click', function () {
    let count = $(this).attr('data-count');
    $(this).attr('data-count', ++count);
    count = $(this).attr('data-count');
    const group = $(this).data('group');
    const title = $(this).data('title');
    const parent = $(this).parents('.multi-field-box');
    const el = createEl(count, group, title);
    parent.find('.multi-field-new').append(el);
    // initialize();
  });

  $(document).on('click', '.delete_group', function () {
    const parent = $(this).parents('.multi-field-box');
    const button = parent.find('.multi-field-add');
    let count = button.attr('data-count');
    button.attr('data-count', --count);
    const el = parent.find(`.${$(this).data('name')}`);
    $(el).remove();
  });

  //place autocomplete
  function initialize() {
    const dropoff = document.querySelectorAll('.google-address');
    const options = {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      acf: ['formatted_address']
    };
    dropoff.forEach(el => {
      const autocomplete = new google.maps.places.Autocomplete(el, options);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        const place = autocomplete.getPlace();
        el.value = place.formatted_address;
      });
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
});
