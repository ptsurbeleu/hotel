FROM alpine:3.4

RUN apk add --update bash nodejs git tmux && \
    npm cache clean && \
    rm -rf /var/cache/apk/*

RUN npm install -gf hotel

CMD [ "/bin/bash" ]

EXPOSE 2000