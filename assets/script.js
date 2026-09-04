active_sounds = {};
	
options = [
	{
		id: "fireplace",
		title: "Fireplace crackling",
		image: "fireplace.png",
		sound: "fireplace.mp3"
	},
	{
		id: "old_train",
		title: "Old train on rails",
		image: "placeholder.jpg",
		sound: "train.mp3"
	},
	{
		id: "spaceship",
		title: "Spaceship Ambience",
		image: "placeholder.jpg",
		sound: "spaceship.mp3"
	},
	{
		id: "rain",
		title: "Rainfall",
		image: "placeholder.jpg",
		sound: "rain.mp3"
	},
	{
		id: "storm",
		title: "Rain + Thunder",
		image: "placeholder.jpg",
		sound: "storm.mp3"
	},
	{
		id: "grass_in_wind",
		title: "Grass in the wind",
		image: "placeholder.jpg",
		sound: "grass_in_wind.mp3"
	},
	{
		id: "seawaves",
		title: "Sea waves",
		image: "placeholder.jpg",
		sound: "seawaves.mp3"
	},
	{
		id: "seawaves_seagulls",
		title: "Sea waves with seagulls",
		image: "placeholder.jpg",
		sound: "seawaves_seagulls.mp3"
	},
	{
		id: "crickets",
		title: "Crickets",
		image: "placeholder.jpg",
		sound: "crickets.mp3"
	},
	{
		id: "stream_birds",
		title: "Stream and birds",
		image: "placeholder.jpg",
		sound: "stream_birds.mp3"
	},
	{
		id: "forest",
		title: "Forest ambience",
		image: "placeholder.jpg",
		sound: "forest.mp3"
	},
	{
		id: "farm",
		title: "Farm (Bells, sheep and cows)",
		image: "placeholder.jpg",
		sound: "farm.mp3"
	},
];

options.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
let i = 1;
options.forEach((elem) => {elem.order = i++;});


const pool = document.getElementById('options_pool');
const active = document.getElementById('options_active');
const template = document.getElementById('option-card-template').content;
const global_volume = document.getElementById('master-volume');

options.forEach((opt) => {
	let tmpl = template.children[0].outerHTML;	
	
	for(const [key, value] of Object.entries(opt)) {
		tmpl = tmpl.replaceAll("{{"+key+"}}", value);
	}
	
	pool.insertAdjacentHTML( 'beforeend', tmpl );
});

function toggle(id, sound) {
	let box = document.getElementById(id);
	let isActive = box.getAttribute('active');
	
	if(isActive == 0) {
		active.appendChild(box);
		
		// start sound
		if(active_sounds[id] === undefined) {
			var audio = document.createElement('audio');
			audio.setAttribute('src', sound);
			audio.setAttribute('autoplay', 'autoplay');
			audio.loop=true;
			audio.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
			audio.volume = 0;
			active_sounds[id] = {
				obj: audio,
				active: 1,
				volume: 0
			};
		}
		
		active_sounds[id].obj.play(); 
	}
	else {
		pool.appendChild(box);
		
		// end sound
		active_sounds[id].obj.pause();
		active_sounds[id].obj.currentTime = 0;
		active_sounds[id].active = 0;
		
		// set volume to 0
		active_sounds[id].obj.volume = 0;
		active_sounds[id].volume = 0;
		document.getElementById(id).querySelector('.volume-toggle').value = 0;
	}
	
	box.setAttribute('active', 1 - isActive);
}

function volume(elem, id = undefined) {
	if(id === undefined) {
		for(const [key, value] of Object.entries(active_sounds)) {			
			if(value.active == 1) {
				value.obj.volume =  value.volume * global_volume.value / 10000;
			}
		}
	}
	else {
		let vol = elem.value;
		
		active_sounds[id].obj.volume =  elem.value * global_volume.value / 10000;
		active_sounds[id].volume =  elem.value;
	}
}