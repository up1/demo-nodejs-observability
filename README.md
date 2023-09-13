# Workshop :: Observability of NodeJS
* Application Metric
  * Prometheus
  * Grafana
* Distributed Tracing
  * OpenTelemetry
  * Jaeger
* Centralized log
  * ELK stack

## 1. Application metrics

### Start Service 2
```
$docker compose up -d service2 --build
$docker compose ps
```

Access to service 2
* http://localhost:3002/movies

Access to metrics
* http://localhost:3002/metrics

### Start prometheus server
```
$docker compose up -d prometheus
$docker compose ps 
```

Access to prometheus server
* http://localhost:9090

### Start grafana server
```
$docker compose up -d grafana
$docker compose ps 
```

Access to grafana server
* http://localhost:3000
  * user=admin
  * pass=admin

## 2. Distributed Tracing

### Start Jaeger
```
$docker compose up -d jaeger
$docker compose ps
```
Access to Jaeger
* http://localhost:16686/search

### Start Service 1
```
$docker compose up -d service1 --build
$docker compose ps
```

### Start Service 2
```
$docker compose up -d service2 --build
$docker compose ps
```

Access to service 1 -> service 2
* http://localhost:3001/dashboard

## 3. Centralized log with ELK stack

### Start Service 2
```
$docker compose up -d service2 --build
$docker compose ps
$docker compose logs --follow
```

Access to service 2, see log in terminal
* http://localhost:3002/movies