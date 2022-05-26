// noinspection JSJQueryEfficiency,JSUnresolvedFunction

let mode = localStorage.getItem('scene') || 'main';
let users = JSON.parse(localStorage.getItem('users')) || [];
let goods = JSON.parse(localStorage.getItem('goods')) || [];
let loggined = false;
let askiiTable = [];
let thisSessionImages = [];

for (let i = 0; i !== 256; i++) {
    askiiTable.push(String.fromCharCode(i));
}
let passwordSolve = (password, n = 3) => {
    let chiperPasswoed = '';
    for (let i = 0; i !== password.length; i++) {
        let currentIndex = askiiTable.indexOf(password[i]);
        if (currentIndex + n <= askiiTable.length - 1) {
            currentIndex += n;
            chiperPasswoed += askiiTable[currentIndex]
        } else {
            chiperPasswoed += askiiTable[n - (askiiTable.length - currentIndex)]
        }
    }
    return chiperPasswoed
}

let admin = {
    userName: 'admin',
    password: passwordSolve('admin', 10)
}

let inputPage = (array) => {
    console.log(array)
    if (array.length === 0) {
        $('.phones .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
        $('.tv .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
        $('.laptops .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
        $('.main-page .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
    } else {
        $('.phones .main__row').html('');
        $('.tv .main__row').html('');
        $('.laptops .main__row').html('');
        $('.main-page .main__row').html('');
        for (let i = 0; i !== array.length; i++) {
            let category = array[i].category;
            $('.main-page .main__row').append('<div class="card"><div class="card__img" style="background: transparent url(' + array[i].imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + array[i].name + '</div><div class="card__description">' + array[i].shortDescription + '</div><div class="card__description price">' + array[i].price + '</div><div class="card__row"><a href="' + array[i].urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
            if (category === 'phone') {
                $('.phones .main__row').append('<div class="card"><div class="card__img" style="background: transparent url(' + array[i].imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + array[i].name + '</div><div class="card__description">' + array[i].shortDescription + '</div><div class="card__description price">' + array[i].price + '</div><div class="card__row"><a href="' + array[i].urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
            } else if (category === 'tv') {
                $('.tv .main__row').append('<div class="card"><div class="card__img" style="background: transparent url(' + array[i].imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + array[i].name + '</div><div class="card__description">' + array[i].shortDescription + '</div><div class="card__description price">' + array[i].price + '/div><div class="card__row"><a href="' + array[i].urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
            } else if (category === 'laptop') {
                $('.laptops .main__row').append('<div class="card"><div class="card__img" style="background: transparent url(' + array[i].imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + array[i].name + '</div><div class="card__description">' + array[i].shortDescription + '</div><div class="card__description price">' + array[i].price + '</div><div class="card__row"><a href="' + array[i].urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
            }
        }
    }
}

inputPage(goods);

let setScene = (mode) => {
    switch (mode) {
        case 'main':
            if (loggined) {
                $('#navlogin').text('Unlogin');
            } else {
                $('#navlogin').text('Login');
            }
            localStorage.setItem('scene', 'main');
            $('.main-page').css('display', 'flex');
            $('.phones').css('display', 'none');
            $('.tv').css('display', 'none');
            $('.laptops').css('display', 'none');
            $('.login').css('display', 'none');
            $('#navlogin').css('display', 'flex');
            break;
        case 'phones':
            if (loggined) {
                $('#navlogin').text('Unlogin');
            } else {
                $('#navlogin').text('Login');
            }
            localStorage.setItem('scene', 'phones');
            $('.phones').css('display', 'flex');
            $('.main-page').css('display', 'none');
            $('.tv').css('display', 'none');
            $('.laptops').css('display', 'none');
            $('.login').css('display', 'none');
            $('#navlogin').css('display', 'flex');
            break;
        case 'tv':
            if (loggined) {
                $('#navlogin').text('Unlogin');
            } else {
                $('#navlogin').text('Login');
            }
            localStorage.setItem('scene', 'tv');
            $('.tv').css('display', 'flex');
            $('.main-page').css('display', 'none');
            $('.phones').css('display', 'none');
            $('.laptops').css('display', 'none');
            $('.login').css('display', 'none');
            $('#navlogin').css('display', 'flex');
            break;
        case 'laptops':
            if (loggined) {
                $('#navlogin').text('Unlogin');
            } else {
                $('#navlogin').text('Login');
            }
            localStorage.setItem('scene', 'laptops');
            $('.laptops').css('display', 'flex');
            $('.tv').css('display', 'none');
            $('.main-page').css('display', 'none');
            $('.phones').css('display', 'none');
            $('.login').css('display', 'none');
            $('#navlogin').css('display', 'flex');
            break;
        case 'login':
            localStorage.setItem('scene', 'login');
            $('.login').css('display', 'flex');
            $('.laptops').css('display', 'none');
            $('.tv').css('display', 'none');
            $('.main-page').css('display', 'none');
            $('.phones').css('display', 'none');
            $('#navlogin').css('display', 'none');
            break;
        case 'off':
            $('.login').css('display', 'none');
            $('.laptops').css('display', 'none');
            $('.tv').css('display', 'none');
            $('.main-page').css('display', 'none');
            $('.phones').css('display', 'none');
            $('#navlogin').css('display', 'none');
            break;
    }
}
setScene(mode);
let setLogin = (trigger) => {
    if (trigger === 'user') {
        $('#navlogin').text('Unlogin');
        $('#addBtn').css('display', 'none');
        $('#clearBtn').css('display', 'none');
        $('.card__btn_del').css('display', 'none');
        $('#userName').val('');
        $('#userPassword').val('');
        setScene('main');
    } else if (trigger === 'admin') {
        $('#addBtn').css('display', 'flex');
        $('#clearBtn').css('display', 'block');
        $('.card__btn_del').css('display', 'flex');
        $('#userName').val('');
        $('#userPassword').val('');
    } else if (trigger === 'unlogin') {

    }
}

$('#descriptionAddAsortimentColor').click(function() {
    let count = document.getElementsByClassName('addNewGood__addNewColor-inp').length;
    $('#descriptionGetAsortimentColorRow').prepend('<input type="color" id="descriptionGetAsortimentColor' + count + '" class="addNewGood__addNewColor-inp">')
});

$('#descriptionAddCharacteristik').click(function() {
    let count = document.getElementsByClassName('addNewGood__charcounter').length;
    $('#descriptionGetCharacteristikColumn').prepend('<div class="addNewGood__row addNewGood__charcounter"><input class="addNewGood__input" type="text" id="descriptionGetCharacteristikKey' + count + '" placeholder="name"><p class="addNewGood__tire"> - </p><input class="addNewGood__input" type="text" id="descriptionGetCharacteristikValue' + count + '" placeholder="value"></div>')
})

$('#descriptionAddDeliveryServices').click(function() {
    let count = document.getElementsByClassName('addNewGood__deliveryCounter').length;
    $('#descriptionGetDeliveryColumn').prepend('<div class="addNewGood__row addNewGood__deliveryCounter"><input class="addNewGood__input" type="url" id="descriptionGetDeliveryServicesLogo' + count + '" placeholder="logo url"><input class="addNewGood__input" type="text" id="descriptionGetDeliveryServicesName' + count + '" placeholder="name"><input class="addNewGood__input" type="text" id="descriptionGetDeliveryServicesDate' + count + '" placeholder="count of days to deliver"><input class="addNewGood__input" type="text" id="descriptionGetDeliveryServicesPrice' + count + '" placeholder="price"></div>')
})

$('#descriptionAddAdditionalOptions').click(function() {
    let count = document.getElementsByClassName('addNewGood__optionsCount').length;
    $('#descriptionGetOptionsColumn').prepend('<div class="addNewGood__row addNewGood__optionsCount"><input class="addNewGood__input" type="url" id="descriptionGetAdditionalOptionsLogo' + count + '" placeholder="logo url"><input class="addNewGood__input" type="url" id="descriptionGetAdditionalOptionsOption' + count + '" placeholder="Option name"></div>')
})

$('#navmain').click(function() {
    $('.description-page').css('display', 'none')
    setScene('main');
})
$('#navphohes').click(function() {
    $('.description-page').css('display', 'none')
    setScene('phones')
})
$('#navtv').click(function() {
    $('.description-page').css('display', 'none')
    setScene('tv')
})
$('#navlaptops').click(function() {
    $('.description-page').css('display', 'none')
    setScene('laptops')
})
$('#navlogin').click(function() {
    $('.description-page').css('display', 'none')
    setScene('login');
})

$('#signUpbtn').click(function() {
    let newUser = {
        userName: $('#userName').val(),
        password: passwordSolve($('#userPassword').val(), 10)
    };
    let checker = true;
    if (newUser.userName !== admin.userName) {
        for (let i = 0; i !== users.length; i++) {
            if (users[i].userName === newUser.userName) {
                checker = false;
                alert('this name is taken')
            }
        }
        if (checker && newUser.userName.length > 0) {
            if (newUser.password.length >= 8) {
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                console.log(users);
                $('#userName').val('');
                $('#userPassword').val('');
                alert('User ' + newUser.userName + ' succesfuly registered');
            } else {
                alert('Your password have less then 8 symbols');
            }
        }
    } else {
        alert('this name is declarated');
    }
})

$('#loginbtn').click(function() {
    let loginCandidate = {
        userName: $('#userName').val(),
        password: passwordSolve($('#userPassword').val(), 10)
    }
    let userFound = false;
    let userIndex = -1;
    if (loginCandidate.userName !== admin.userName) {
        for (let i = 0; i !== users.length; i++) {
            if (users[i].userName === loginCandidate.userName) {
                userFound = true;
                userIndex = i;
            }
        }
        if (userFound) {
            if (users[userIndex].password === loginCandidate.password) {
                alert('Hello ' + users[userIndex].userName);
                setLogin('user');
            } else {
                alert('Your password is wrong, try again')
            }
        }
    } else {
        if (loginCandidate.password === admin.password) {
            alert('Welcome admin');
            setLogin('admin')
        } else {
            alert('Admin: your password is wrong')
        }
    }
})

$('#clearBtn').click(function() {
    let conf = confirm('are you sure?')
    if (conf) {
        localStorage.removeItem('users');
        users = [];
        alert('All users deleted');
    } else {
        alert('Ok, canceled!');
    }
});

$('#addBtn').click(function() {
    $('.addNewGood').css('display', 'flex');
});

$('.addNewGoodClose').click(function() {
    $('.addNewGood').css('display', 'none');
});

$('#addNewGoodSetDescPage').click(function() {
    $('.addNewGood__card-set').css('display', 'none');
    $('.addNewGood__description-set').css('display', 'flex');
});
$('#addNewGoodFullDescClose').click(function() {
    $('.addNewGood__card-set').css('display', 'flex');
    $('.addNewGood__description-set').css('display', 'none');
});

$('.card__btn_del').click(function() {
    if (array.length === 0) {
        $('.phones .main__row').html('');
        $('.tv .main__row').html('');
        $('.laptops .main__row').html('');
        $('.main-page .main__row').html('');
        $('.phones .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
        $('.tv .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
        $('.laptops .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
        $('.main-page .main__row').append('<div class="card__name main__empty">Goods catalogue is empty. <br> Login as admin to add new goods</div>')
        $('.card__name.main__empty').css('display', 'block');
    }
    let name = $(this).parent().prev().prev().text();
    console.log(name);
    let arr = goods;
    console.log('orr arr: ', arr)
    let indexOfBadEl = -1;
    for (let i = 0; i !== goods.length; i++) {
        if (goods[i].name === name) {
            indexOfBadEl = i;
        }
    }
    arr.splice(indexOfBadEl, 1);
    console.log(arr);
    localStorage.setItem('goods', JSON.stringify(goods));
    $(this).parent().parent().css('display', 'none');
});

$('#descriptionAddPhoto').click(function() {
    $('.addImage').css('display', 'flex');
    $('.addImage').fadeOut(0);
    $('.addImage').fadeIn(300);
});

$('#addNewPhotoCancelBtn').click(function() {
    $('.addImage').fadeOut(300);
})

$('#addNewPhotoConfirmBtn').click(function() {
    let info = $('#newImageUrlInp').val();
    thisSessionImages.push(info);
    let count = document.getElementsByClassName('addNewGood__addNewPhoto').length;
    $('#descriptionGetPhotoBox').prepend('<div class="addNewGood__addNewPhoto" id="descriptionGetPhoto' + count + '"></div>')
    $('#descriptionGetPhoto' + count).css({
        'background': 'url("' + info + '") center center no-repeat no-repeat',
        'backgroundSize': '90px'
    })
    $('.addImage').fadeOut(300);
})

$('#addNewGoodSubmit').click(function() {
    let colorsElements = document.getElementsByClassName('addNewGood__addNewColor-inp');
    let colorsCount = colorsElements.length;
    let colors = [];
    for (let i = 0; i !== colorsCount; i++) {
        colors.push(colorsElements[i].value);
    }

    let charElements = document.getElementsByClassName('addNewGood__charcounter');
    let charCount = charElements.length;
    let char = [];
    for (let i = 0; i !== charCount; i++) {
        let charItem = {
            name: $('#descriptionGetCharacteristikKey' + i).val(),
            value: $('#descriptionGetCharacteristikValue' + i).val(),
        }
        char.push(charItem);
    }

    let deliveryElements = document.getElementsByClassName('addNewGood__deliveryCounter');
    let deliveryCount = deliveryElements.length;
    let delivery = [];
    for (let i = 0; i !== deliveryCount; i++) {
        let deliveryItem = {
            logo: $('#descriptionGetDeliveryServicesLogo' + i).val(),
            name: $('#descriptionGetDeliveryServicesName' + i).val(),
            days: $('#descriptionGetDeliveryServicesDate' + i).val(),
            price: $('#descriptionGetDeliveryServicesPrice' + i).val()
        }
        delivery.push(deliveryItem);
    }

    let additionalElements = document.getElementsByClassName('addNewGood__optionsCount');
    let additionalCount = additionalElements.length;
    let additional = [];
    for (let i = 0; i !== additionalCount; i++) {
        let additionalItem = {
            logo: $('#descriptionGetAdditionalOptionsLogo' + i).val(),
            name: $('#descriptionGetAdditionalOptionsOption' + i).val()
        }
        additional.push(additionalItem);
    }


    let newG = {
        category: $('#getCategory').val(),
        imageUrl: $('#getImg').val(),
        name: $('#getName').val(),
        shortDescription: $('#getdescription').val(),
        urlToBuy: $('#getBuyUrl').val(),
        price: $('#getPrice').val(),
        description: {
            videoUrl: $('#descriptionGetYoutubeUrl').val(),
            photos: thisSessionImages,
            colorAsortiment: colors,
            characteristic: char,
            deliveryServices: delivery,
            additionalOptions: additional
        }
    }
    console.log(newG);
    if (newG.category.length !== 0 && newG.imageUrl.length !== 0 && newG.shortDescription.length !== 0 && newG.category.length !== 0 && newG.price.length !== 0 && newG.description.length !== 0 && newG.description.videoUrl.length !== 0 && newG.description.photos.length !== 0 && newG.description.colorAsortiment.length !== 0 && newG.description.characteristic.length !== 0 && newG.description.deliveryServices.length !== 0 && newG.description.additionalOptions.length !== 0) {
        thisSessionImages = [];
        $('.card__name.main__empty').css('display', 'none');
        $('#goodsArea').append('<div class="card"><div class="card__img" style="background: transparent url(' + newG.imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + newG.name + '</div><div class="card__description">' + newG.shortDescription + '</div><div class="card__description price">' + newG.price + '</div><div class="card__row"><a href="' + newG.urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
        if (newG.category === 'phone') {
            $('.phones .main__row').append('<div class="card"><div class="card__img" style="background: transparent url(' + newG.imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + newG.name + '</div><div class="card__description">' + newG.shortDescription + '</div><div class="card__description price">' + newG.price + '</div><div class="card__row"><a href="' + newG.urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
        } else if (newG.category === 'tv') {
            $('.tv .main__row').append('<div class="card"><div class="card__img" style="background: transparent url(' + newG.imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + newG.name + '</div><div class="card__description">' + newG.shortDescription + '</div><div class="card__description price">' + newG.price + '</div><div class="card__row"><a href="' + newG.urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
        } else if (newG.category === 'laptop') {
            $('.laptops .main__row').append('<div class="card"><div class="card__img" style="background: transparent url(' + newG.imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + newG.name + '</div><div class="card__description">' + newG.shortDescription + '</div><div class="card__description price">' + newG.price + '</div><div class="card__row"><a href="' + newG.urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button><button class="card__btn card__btn_del">X</button></div></div>');
        }
        goods.push(newG);
        localStorage.setItem('goods', JSON.stringify(goods));
        $('.addNewGood').css('display', 'none');
    } else {
        alert('Information is invalid! Please fill all inputs');
    }
})

$('.card__btn_info').click(function() {
    fetch('https://randomuser.me/api/')
        .then((res) => {
            return res.json()
    })
        .then((data) => {
            let user = data.results[0];
            $('.review__image').css({
                'background': 'url(' + user.picture.large + ') no-repeat center',
                'backgroundSize': 'cover'
            })
            $('.review__name').text(user.name.first + ' ' + user.name.last)
            console.log(user)
        });
    $.getJSON('https://baconipsum.com/api/?callback=?', { 'type':'meat-and-filler', 'start-with-lorem':'1', 'paras':'2' },
        function(baconGoodness) {
            $('.review__text').text('')
            if (baconGoodness && baconGoodness.length > 0) {
                for (let i = 0; i < baconGoodness.length; i++) $('.review__text').text($('.review__text').text() + '\n' + baconGoodness[i])
            }
        });
    let name = $(this).parent().parent().children('.card__name').text();
    let thisGood;

    console.log(name)
    for (let i = 0; i !== goods.length; i++) {
        if (goods[i].name === name) {
            thisGood = goods[i];
        }
    }
    console.log(thisGood);
    setScene('off');
    $('.description-page').css('display', 'block');
    $('.description-page').fadeOut(0);
    $('.description-page').fadeIn(300);
    $('#descriptionNameOfDevice').text(thisGood.name);

    for (let i = 0; i !== thisGood.description.photos.length; i++) {
        if (i === 0) {
            $('.carousel-inner').append('<div class="carousel-item active"><img style="max-height: 60vh; width: auto;" src="' + thisGood.description.photos[i] + '" class="d-block w-100" alt="image not defined"></div>');
        } else {
            $('.carousel-inner').append('<div class="carousel-item"><img style="max-height: 60vh; width: auto;" src="' + thisGood.description.photos[i] + '" class="d-block w-100" alt="image not defined"></div>');
        }
    }

    for (let i = 0; i !== thisGood.description.colorAsortiment.length; i++) {
        $('.description-page__color-container').append('<div class="description-page__color-item" id="color-item' + i + '"></div>');
        $('#color-item' + i).css('background', thisGood.description.colorAsortiment[i])
    }

    for (let i = 0; i !== thisGood.description.characteristic.length; i++) {
        $('.description-page__right').append('<div class="description-page__characteristic-item"><span class="characteristicNameSet">' + thisGood.description.characteristic[i].name + '</span><span class="characteristicValueSet">' + thisGood.description.characteristic[i].value + '</span></div>');
    }
    $('.description-page__video').attr('src', 'https://www.youtube.com/embed/' + thisGood.description.videoUrl.slice(thisGood.description.videoUrl.lastIndexOf('v=') + 2, thisGood.description.videoUrl.length));

    for (let i = 0; i !== thisGood.description.additionalOptions.length; i++) {
        $('#descriptionAdditionalContainer').append('<div class="desc_row"><input type="checkbox" name="additional" id="additonalOptionSet' + i + '"><label for="additonalOptionSet' + i + '"><div class="description__logo" id="descritionLogo' + i + '"></div> ' + thisGood.description.additionalOptions[i].name + '</label></div>');
        $('#descritionLogo' + i).css({
            'background': 'url("' + thisGood.description.additionalOptions[i].logo + '") center no-repeat',
            'backgroundSize': 'contain'
        })
    }

    let date = new Date();
    for (let i = 0; i !== thisGood.description.deliveryServices.length; i++) {
        $('#descriptionDeliveryContainer').append('<div class="desc_row"><input type="radio" name="delivery" id="deliverySet' + i + '"><label for="deliverySet' + i + '"><div class="description__logo" id="descriptionLogo' + i + '"></div><div class="description__name">' + thisGood.description.deliveryServices[i].name + '</div><div class="description__date">' + (date.getDate() + thisGood.description.deliveryServices[i].days) + '.' + (date.getMonth() + 1) + '</div><div class="description__price">' + thisGood.description.deliveryServices[i].price + '</div></label></div>');
        $('#descriptionLogo' + i).css({
            'background': 'url("' + thisGood.description.deliveryServices[i].logo + '") no-repeat center',
            'backgroundSize': 'contain'
        })
    }

    for (let i = 0; i !== goods.length; i++) {
        if (goods[i].category === thisGood.category) {
            $('.desription__same-goods').append('<div class="card"><div class="card__img" style="background: transparent url(' + goods[i].imageUrl + ') no-repeat center; background-size: contain"></div><div class="card__name">' + goods[i].name + '</div><div class="card__description">' + goods[i].shortDescription + '</div><div class="card__description price">' + goods[i].price + '</div><div class="card__row"><a href="' + goods[i].urlToBuy + '" class="card__btn card__btn_buy">Buy</a><button class="card__btn card__btn_info">More info</button></div></div>')
        }
    }

})