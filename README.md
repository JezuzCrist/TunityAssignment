Create a REST monitoring service that supports TTL checks (see https://www.consul.io/docs/agent/checks.html for a definition of a TTL check)

### API

```
POST /checks/{check_name}?ttl={ttl_in_seconds}
```

will register a new check with the name `check_name` and a TTL of `ttl_in_seconds`
or update an existing check with the new TTL.

if a check is not updated within `ttl_in_seconds` seconds it will trigger an alert.


```
DELETE /checks/{check_name}
```

deletes the specified check

```
GET /checks
```
show the currently registered checks and their status

```
GET /checks/failing
```

show the currently failing checks

### Alerts
the alert should output to console or a predefined callback url
