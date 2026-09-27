# Security & UX additions

From engineering checklist (SQS/queues, encryption, rate limiting, search) — **not** makeup UI.

| Module | Purpose |
|--------|--------|
| rate-limit | login 5/15m, checkout 10/10m, upload 20/h, api 120/min, review 5/h |
| security | headers, httpOnly session cookie, password rules, sensitive keys |
| queue | async email, media.compress, CAPI — UI stays fast |
| search | normalize + tokens for product find |

Middleware on admin + web applies security headers.
API helper returns 429 + Retry-After for calm UX messages.

Skipped: TensorFlow, full microservices, forward-proxy product feature.
