# --- --- --- --- --- INSTRUCTIONS --- --- --- --- ---
# To minify versioning files (production)
# - change versiong number (see 'numFile' variable belove) to the number version to be released
# - exec [PRODUCTION] from project root folder (compass and sass must be installed)
#
# --- --- --- --- --- COMMANDS --- --- --- --- --- ---
# [DEV]           compass compile -c config/config.rb                           (via nodeJs: npm run compassDev)
# [PRODUCTION]    compass compile -c config/config.rb -e production --force     (via nodeJs: npm run compassProd)
#


# GENERAL SETTINGS
# all available options here http://compass-style.org/help/documentation/configuration-reference/

# NOTE if launched from config directory, otherwise you must update it accordigly
project_path="../"  

css_dir="assets/css"                              
sass_dir="assets/sass" 
images_dir="dist/img"         
sprite_load_path = "assets/images/sprite" 
generated_images_dir="dist/img" 
sprite_engine = :chunky_png                                             
chunky_png_option = {:compression => Zlib::BEST_COMPRESSION}                                     
preferred_syntax = :scss  
relative_assets = true    
sourcemap = true  
line_comments = true            
output_style = :expanded       
disable_warnings = false  


if environment == :production
    
    # FILE VERSIONING NUMBER 
    # the one the file must have when has been changed [online version number plus 1]
    numFile = {
        "style" => "1.1"
    }
    
	# overwrite general settings
	line_comments = false            
	output_style = :compressed       
	disable_warnings = true
	css_dir = "dist/css"

	# renaming files
	require 'fileutils'
	on_stylesheet_saved do |file|
		if File.exists?(file)
			filename = File.basename(file, File.extname(file))
			path = File.dirname(file)

			num = numFile["style"]              

			if !num.nil? 
#				newPath = path.sub! 'tmp', 'css'
                newPath = path
				newName = newPath + "/" + filename + ".#{num}.min" + File.extname(file)
				if !File.exists?(newName)
					File.rename(file, newName)
				end # if file doesn't already exist
			end # if 'num' is set   

		end # if file exist
	end # on saving files
    
end # if production