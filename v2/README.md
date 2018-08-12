## Blogger

```
docker build --no-cache=true -t blogger_v2 .

docker run --rm -it \
-v $(pwd)/:/home/node/ \
-v /home/node/node_modules/ \
-p 18660:18660 \
--name blogger_v2_container \
blogger_v2 bash
```

```
docker run --rm -it \
-v $(pwd)/:/home/node/ \
-v /home/node/node_modules/ \
-p 18660:18660 \
--name blogger_v2_container \
node:dev bash
```
