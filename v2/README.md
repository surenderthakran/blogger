## Blogger

### Production
```
docker build --no-cache=true -t blogger_v2 .

docker run --rm -it \
-p 18660:18660 \
--name blogger_v2_container \
--env NODE_ENV=production \
blogger_v2
```

### Development
```
docker build --no-cache=true -t blogger_v2 .

docker run --rm -it \
-v $(pwd)/:/blogger/ \
-v /blogger/node_modules/ \
-p 18660:18660 \
--name blogger_v2_container \
--env NODE_ENV=development \
blogger_v2 bash
```

### Debug
```
docker run --rm -it \
-v $(pwd)/:/blogger/ \
-v /blogger/node_modules/ \
-p 18660:18660 \
--name blogger_v2_container \
node:dev bash
```
