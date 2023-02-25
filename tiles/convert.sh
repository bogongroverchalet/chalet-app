for file in **/*.png ; do convert "${file}" -quality 35% "${file%.*}.jpg" ; rm "${file}"; done

mb-util . Bogong_High_Plains.mbtiles --image_format=jpg

du -sch Bogong_High_Plains.mbtiles

pmtiles convert Bogong_High_Plains.mbtiles ../public/Bogong_High_Plains.pmtiles
