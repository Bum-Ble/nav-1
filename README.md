# nav-1
前端导航网站

# 开发
npm install -g parcel-bundler
parcel src/index.html

# build 命令
rm -rf dist
parcel build src/index.html --no-minify --public-url ./
