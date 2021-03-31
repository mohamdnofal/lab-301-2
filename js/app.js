'use strict';
let imageData = [];

function fetchData(page) {
    imageData = [];
    $.ajax(page).then(imgData => {
        imgData.forEach(item => {
            imageData.push(item);
        });
        console.log(imageData);
        init();
    });
}
fetchData('./data/page-1.json');

function init() {
    $('.photo-template').remove();
    $('#keywordSelect option').remove();
    imageData.forEach(img => {
        // console.log(img);
        let newImage = new Image(img);
        newImage.renderName();

    });
}

function Image(newImage) {
    this.imageName = newImage.title;
    this.imageUrl = newImage.image_url;
    this.imageDescription = newImage.description;
    this.imageKeyword = newImage.keyword;
    this.imageHorns = newImage.horns;
    this.imageData = [];
}

function sortResults(prop, asc) {
    imageData.sort(function (a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

Image.prototype.renderName = function () {
    let imageClone = $('#photo-template').html();
    let dataSet = Mustache.render(imageClone, this);
    // return dataSet;
    // imageClone.find('h2').text(this.imageName);
    // imageClone.find('img').attr('src', this.imageUrl);
    // imageClone.find('p').text(this.imageDescription);
    // imageClone.find('.keyword').eq(0).text(this.imageKeyword);
    // imageClone.find('.horns').eq(0).text(this.imageHorns);
    // //
    // imageClone.addClass(this.imageKeyword);
    $('#keywordSelect').append(`<option>${this.imageKeyword}</option>`);
    $('main').append(dataSet);
}

// 
$('#keywordSelect').on('change', (event) => {
    let keyword = event.target.value;
    $('.photo-template').hide();
    $(`.${keyword}`).fadeIn();
});


$('#sortSelect').on('change', function () {
    let selected = $('#sortSelect').val();
    sortResults(selected, 'asc');
    init();
});

$('.nav').on('click', function () {
    let page = $(this).val();
    console.log(page);
    fetchData(page);
    init();
});
