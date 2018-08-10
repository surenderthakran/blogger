## Blogger

```
docker build --no-cache=true -t blogger_v2 .
docker run --rm -it -v $(pwd)/:/blogger/ --name blogger_v2_1 blogger_v2 bash
```
