# Workshop :: Observability of NodeJS
* Application Metric
  * Prometheus
  * Grafana
* Distributed Tracing
  * OpenTelemetry
  * Jaeger
* Centralized log
  * ELK stack

## Distributed Tracing
Start Jaeger
```
$docker compose up -d jaeger
$docker compose ps
```
Access to Jaeger
* http://localhost:16686/search

Start Service 1
```
$docker compose up -d service1 --build
$docker compose ps
```

Start Service 2
```
$docker compose up -d service2 --build
$docker compose ps
```

Access to service 1 -> service 2
* http://localhost:3001/dashboard