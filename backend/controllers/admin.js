const Anime = require('../models/Anime');

exports.getIndex = async (req, res) => {
    const anime = await Anime.find((data) => data);
     try {
         console.log(anime);
         res.status(200).render('index', { anime: anime});
     }
     catch (error) {
         console.log(error);
     }
    // code before update file
    // res.status(200).render('index')
};
// question
exports.getAnime = async (req, res) => {
    const animeId = req.params.animeId;
    const anime = await Anime.findById(animeId, (anime) => anime);

    try {
        console.log(anime);
        res.status(200).render('anime', {anime: anime});
    }
    catch (error) {
        console.log(error);
    }
};

exports.getAddAnime = (req, res) => {
    res.status(200).render('edit-anime');
};

exports.postAnime = (req, res) => {
    const { name, image, description } = req.body;
    const anime = new Anime({ name: name, image: image, description: description});
    anime.save();
    console.log('anime added to the database');
    res.status(201).redirect('/')
};

exports.postDelete = async (req, res) => {
    const animeId = req.body.animeId;

    const anime = await Anime.findByIdAndRemove(animeId, (data) => data);

    try {
        console.log(anime);
        console.log('Item deleted');
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
    }
};
