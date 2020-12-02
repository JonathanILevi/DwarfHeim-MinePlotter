##rsync -r --del --delete-excluded --exclude=".git/" src/packages/* build/
trash build/*
for group in src/*; do
	for package in "$group"/*; do
		rsync -r --exclude=".git/" "$package"/* build/
	done
done

