module.exports = {
	sass: {
		src: 'assets/sass/*.{sass,scss}',
		dest: 'assets/css',
		options: {
			dev:{
				css: 'assets/css',
				sass: 'assets/sass',
				image: 'assets/images',
				font: 'assets/fonts',
				// project: '/',
				style: 'expanded',
				comments: true,
				sourcemap: true, 
				environment: 'development'	
			},
			prod:{
				css: 'assets/css',
				sass: 'assets/sass',
				image: 'assets/images',
				font: 'assets/fonts',
				// project: '/',
				style: 'compressed',
				comments: false,
				sourcemap: false, 
				environment: 'production'
			}
			
		} 
	},
	watch: {
        src: {
            sass: './assets/sass/**/*.{sass,scss}',
            css: './assets/css/**/*.css',
            js: ['./assets/js/**/*.js', '!./assets/js/gulp/*.js'],
			jsNOTE: 'esclamation point \'!\' stands for excluding the following dirpath',
            html: './*.html'
        } 
	},
	autoprefixer: {
		browsers: [
		'last 2 versions', 
		'> 5% in IT',
		'ie 9',
        'not ie <= 8'
	  ],
		cascade: true
	},
	optimization: {
		js: {
			src: './assets/js/**/*.css',
			dest: './dist/js/',
			version: {
				'scripts': '1.1'			
			}
		},
		css: {   
			src: './assets/css/**/*.css',
			dest: './dist/css/',
			options: {
				keepSpecialComments: 0
			},
			version: {
				'styles': '1.1'			
			}
		}
	}
};
