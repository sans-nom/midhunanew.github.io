POC Nginx API Gateway
======

## Health check

### To set health status of a deployment, add readinessProbe in containers-spec of deployment.yaml:

    readinessProbe:
        httpGet:
            path: /healthlogs
            port: 63033
            httpHeaders:
            - name: X-Custom-Header
            value: Awesome
        initialDelaySeconds: 3
        periodSeconds: 3

More options are available here - [Configure Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#configure-probes)



## Rate limiting

### To apply rate limiting, add annotations in the following order with quotes on ingress.yaml:

    nginx.ingress.kubernetes.io/limit-connections: "1"
    nginx.ingress.kubernetes.io/limit-rps: "1"
    nginx.ingress.kubernetes.io/rewrite-target: "/"

More details here - [ingress nginx annotations](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/annotations.md#rate-limiting)

## API monitoring

### To install nginx-plus excutable on a single machine, obtain keys from opting trial or paid version.

    wget https://cs.nginx.com/static/install-nginx && sudo chmod +x install-nginx
    sudo ./install-nginx 318a3706bbddc440541055312e9d48cc
                

manual installation here - https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-plus/#install_debian_ubuntu

> find the `nginx-repo.crt` and `nginx-repo.key` files from installation files, those can be used for nginx-plus-ingress controller.


To see the dashboard, add an upstream and enable `/api` location like this:

        upstream backend-ms {
            zone   backend 64k;
            server 127.0.0.1:63033  max_fails=3 fail_timeout=30s;
        }
        
        server {
        ...
            status_zone status_page;

            location / {
                proxy_pass http://backend;
            }
        
            location /api {
                api   write=on;
            }

            location = /dashboard.html {
                root   /usr/share/nginx/html;
            }
        ...
         }

Secure `/api` by reading more options here - [Live Activity Monitoring](https://docs.nginx.com/nginx/admin-guide/monitoring/live-activity-monitoring/#configuring-the-api)  

> This api can be used to dynamically add/modify backend upstreams.


In the same file  enable `swagger` :

        location /swagger-ui {
            root   /usr/share/nginx/html;
        }

### To install nginx-plus ingress follow this instructions and use the key files obtained for single machine.

https://github.com/nginxinc/kubernetes-ingress/blob/master/build/README.md#building-the-image-and-pushing-it-to-the-private-registry
