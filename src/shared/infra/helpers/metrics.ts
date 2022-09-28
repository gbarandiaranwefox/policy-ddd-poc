import * as client from 'prom-client';

const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'policy-ddd-poc-server',
});

client.collectDefaultMetrics({ register });

// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'code', 'endpoint_representation'],
    buckets: [0.05, 0.1, 0.3, 0.5, 1, 3, 5],
});

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds);

export default register;
export { httpRequestDurationMicroseconds };
