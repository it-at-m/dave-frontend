/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2023
 */
package de.muenchen.dave.filter;

import brave.Tracer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;



/**
 * This class adds the sleuth headers "X-B3-SpanId" and "X-B3-TraceId"
 * to each route response.
 */
@Component
@Slf4j
public class DistributedTracingFilter implements WebFilter {

    public static final String XB3_TRACE_ID = "X-B3-TraceId";
    public static final String XB3_SPAN_ID = "X-B3-SpanId";

    @Autowired
    private Tracer tracer;

    /**
     * This method adds the zipkin headers "X-B3-SpanId" and "X-B3-TraceId"
     * to each response in {@link ServerWebExchange}.
     *
     * @param serverWebExchange the current server exchange without zipkin headers
     * @param webFilterChain provides a way to delegate to the next filter
     * @return {@code Mono<Void>} to indicate when request processing for adding zipkin headers is complete
     */
    @Override
    public Mono<Void> filter(ServerWebExchange serverWebExchange,
                             WebFilterChain webFilterChain) {
        ServerHttpResponse response = serverWebExchange.getResponse();
        response.beforeCommit(() -> {
            var span = tracer.currentSpan();
            if (span != null) {
                HttpHeaders headers = response.getHeaders();
                headers.add(XB3_TRACE_ID, span.context().traceIdString());
                headers.add(XB3_SPAN_ID, span.context().spanIdString());
            } else {
                log.debug("Traceinformation missing - Skip Trace Header insertion");
            }
            return Mono.empty();
        });
        return webFilterChain.filter(serverWebExchange);
    }


}
