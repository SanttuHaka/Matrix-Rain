var matrix = document.getElementById("matrix");
var m = matrix.getContext('2d');

//Fontin koko
var fonttiKoko = 12;

//Ruudun koko mukautuu nettiselaimen sen hetkisen koon mukaan
matrix.width = window.innerWidth;
matrix.height = window.innerHeight;

//Asetetaan muuttuja sille, kuinka monta kolumnia tippuvaa tekstiä sataa
var kolumnit = matrix.width/fonttiKoko;

//y-koordinaateille omat arrayt 
var y = [];
var y2 = [];

var numero = [];

//Tehdään y-koordinaatteja niin monta, kuin on kolumneja
for (var i = 0; i < kolumnit; i++){
	//jokainen alkamaan random y-koordinaatista
	y[i] = Math.floor(Math.random() * (80 -1 + 1) + 1);
}

for (var j = 0; j < kolumnit; j++){
	y2[j] = Math.floor(Math.random() * (50 - 1 + 1) + 1);
}

for (var d = 0; d < 11; d++){
	//Tämän avulla määrittelen, että randomisti tulee numero kirjaimen sijasta
	numero[d] = Math.floor(Math.random() * (11) + 1);
}

var virta;

//Funktio joka lopulta piirtää virrat
function piirra(){

	//taustaväri mustaksi, alpha tekee tekstivirroille läpinäkyvyys efektin
	m.fillStyle = "rgba(0, 0, 0, 0.1)";
	m.fillRect(0, 0, matrix.width, matrix.height);

	//luodaan kirjainvirrat
	for (var i = 0; i < y.length; i++){

		virta = new Virta();
		//luoKirjaimen attribuutteina x ja y
		virta.luoKirjain(i*fonttiKoko, y[i] * fonttiKoko);
		virta.luo();

		//Kasvatetaan y-koordinaattia yhdellä, jotta virta näyttää liikkuvan
		y[i]++;

		//Jos y on ruudun maks pituuden kohdalla, muutetaan y-koordinaatti nollaksi
		if(y[i]*fonttiKoko >= matrix.height && Math.random() > 0.96)
			y[i] = 0;
	}

	//Tehdään myös toinen looppi, jotta virtoja näyttäisi olevan runsaammin
	for (var i = 0; i < y2.length; i++){
		virta2 = new Virta();
		virta2.luoKirjain(i*fonttiKoko, y2[i] * fonttiKoko);
		virta2.luo();
		y2[i]++;

		if(y2[i]*fonttiKoko >= matrix.height && Math.random() > 0.97)
			y2[i] = 0;
	}
}

function Kirjain(x, y) {
	
	this.x = x;
	this.y = y;
	this.symboli;

	//asetetaan random kirjain (Japanilaisia kirjaimia)
	this.asetaKirjain = function() {
		this.symboli = String.fromCharCode(
			0x30A0 + (Math.floor(Math.random() * 96))
		);
	}

	//asetetaan random numero välillä 1-9
	this.asetaNumero = function() {
		this.symboli = Math.floor(Math.random() * (9) + 1)
	}
}

function Virta() {

	//Luo kirjaimen tai numeron
	this.luoKirjain = function(x, y){
		kirjain = new Kirjain(x, y);

		//Jos numero-arrayn numero sattuu olemaan kaksi tai pienempi, niin tehdään numero
		if(numero[Math.floor(Math.random() * (10) + 1)] <= 2){
			kirjain.asetaNumero();
		//Muuten kirjain
		} else {
			kirjain.asetaKirjain();
		}
	}

	//Asetetaan kirjainten/numeroiden värit, koko ja fontti.
	this.luo = function() {
		m.fillStyle = "#14EB14";
		m.font = fonttiKoko + "px courier";
		m.fillText(kirjain.symboli, kirjain.x, kirjain.y);
	}
}


//Suoritetaan piirra funktio tietyin aikavälein, joka saa kuvan liikkumaan
setInterval(piirra, 50);
