'use strict';

$.ajax('./data/page-1.json')
    .then(imgData => {
        // console.log(imgData);
        imgData.forEach(img => {
            // console.log(img);
            let newImage = new Image(img);
            newImage.renderName();

        })
    })

function Image(newImage) {
    this.imageName = newImage.title;
    this.imageUrl = newImage.image_url;
    this.imageDescription = newImage.description;
    this.imageKeyword = newImage.keyword;
    this.imageHorns = newImage.horns;
}

Image.prototype.renderName = function () {

    let imageClone = $('.photo-template').eq(0).clone();
    imageClone.find('h2').text(this.imageName);
    imageClone.find('img').attr('src', this.imageUrl);
    imageClone.find('p').text(this.imageDescription);
    imageClone.find('.keyword').eq(0).text(this.imageKeyword);
    imageClone.find('.horns').eq(0).text(this.imageHorns);
    //
    imageClone.addClass(this.imageKeyword);
    $('select').append(`<option>${this.imageKeyword}</option>`);

    $('main').append(imageClone);
}

// 
$('select').on('change', (event) => {
    let keyword = event.target.value;
    $('.photo-template').hide();
    $(`.${keyword}`).fadeIn();
});
