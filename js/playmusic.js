

var sound = new Howl({
    src: ['music/01 Talismanic.mp3'],
    autoplay: true,
    loop: true,
    volume: 1,
    onend: function() {
        console.log('Finished!');
    }
});

var play_music = true;



/*
 acontinuacion se agrega un listener a el glyph de sonido. cuando se hace click en el glipho se debe
 cambiar la grafica del glifo y parar la reproduccion de la musica.
*/    

document.getElementById("sound_gly").addEventListener("click", function SoundClick(){
    if(play_music){
        sound.stop();
        document.getElementById("sound_gly").className="glyphicon glyphicon-volume-off";
        play_music = false;
    } else{
        sound.play();
        document.getElementById("sound_gly").className="glyphicon glyphicon-volume-up";
        play_music = true;
    }
});

