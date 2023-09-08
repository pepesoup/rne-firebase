watchman watch-del './' ; 
watchman watch-project './'
# $1 empty or: 
#   --offline

npx expo start -c $1