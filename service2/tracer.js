const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { PinoInstrumentation } = require('@opentelemetry/instrumentation-pino');

const hostName = process.env.OTEL_TRACE_HOST || 'localhost'

const traceExporter = new OTLPTraceExporter({
  url: `http://${hostName}:4318/v1/traces`,
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: `<service-name>-${process.env.NODE_ENV}`,
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.npm_package_version ?? '0.0.0',
    env: process.env.NODE_ENV || '',
  }),
  instrumentations: [getNodeAutoInstrumentations(), new PinoInstrumentation()],
  spanProcessor: new BatchSpanProcessor(traceExporter),
});

sdk.start();

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.error('Error terminating tracing', error))
    .finally(() => process.exit(0));
});