## Blogger

```
docker build --no-cache=true -t blogger_v2 .

docker run --rm -it -v $(pwd)/app/:/blogger/app/ -v $(pwd)/package.json:/blogger/package.json -v $(pwd)/package-lock.json:/blogger/package-lock.json -p 18660:18660 --name blogger_v2_1 blogger_v2 bash
```
