import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [svgr(), react()],
	resolve: {
		alias: {
			assets: '/src/assets',
			components: '/src/components',
			config: '/src/config',
			context: '/src/context',
			hooks: '/src/hooks',
			pages: '/src/pages',
			providers: '/src/providers',
			store: '/src/store',
			types: '/src/types',
			utils: '/src/utils'
		}
	}
})
