#!/bin/bash
cd `dirname $0`

case $1 in
  "prod")
    site="quadpoint.org"
    ;;
  "beta")
    site="beta.quadpoint.org"
    ;;
  *)
    echo "usage: $0 beta|prod"
    exit 1
    ;;
esac

rsync -avz --delete --progress _site/* quadpoint.org:public/$site
