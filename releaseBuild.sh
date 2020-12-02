##rsync -r --del --delete-excluded --exclude=".git/" src/packages/* build/
sh build.sh
trash public/*
cd builder
npm run build
cd ..
rsync -r --exclude="modules/" build/ public/
python builder/htmlInject.py public/*.html

