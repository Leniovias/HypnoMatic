active_sounds = {};
	
		options = [
			{
				id: "paw_slut",
				order: 1,
				title: "Paw slut",
				image: "test.png",
				sound: "test.mp3"
			}
		];
		
		const pool = document.getElementById('options_pool');
		const active = document.getElementById('options_active');
		const template = document.getElementById('option-card-template').content;
		
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
			}
			else {
				pool.appendChild(box);
				// end sound
				// set volume to 0
			}
			
			box.setAttribute('active', 1 - isActive);
		}
		
		function volume(elem, id) {
			// change sound volume
		}