module.exports = function FF(mod) {
	let unlock = false
	
	mod.hook('S_ABNORMALITY_BEGIN', 4, event => {
		if (!mod.game.me.is(event.target)) return
		if (event.id === 30010000) unlock = true
	})
		
	mod.hook('S_ABNORMALITY_END', 1, event => {
		if (!mod.game.me.is(event.target)) return
		if (event.id === 30010000) unlock = false
	})
	
	mod.game.me.on('change_zone', (zone, quick) => {
		if (zone === 2000 && !unlock) {
			unlock = true
			mod.send('S_ABNORMALITY_BEGIN', 4, {
				target: mod.game.me.gameId,
				source: mod.game.me.gameId,
				id: 30010000,
				duration: 0x7FFFFFFF,
				stacks: 1
			})
		}
		
		if (zone !== 2000 && unlock) {
			unlock = false
			mod.send('S_ABNORMALITY_END', 1, {
				target: mod.game.me.gameId,
				id: 30010000
			})
		}
	})
}
