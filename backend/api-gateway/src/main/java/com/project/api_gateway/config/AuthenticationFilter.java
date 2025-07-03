package com.project.api_gateway.config;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    private final WebClient webClient;
    private final JwtUtil jwtUtil;

    public AuthenticationFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
        this.webClient = WebClient.builder().build(); // ✅ clean and safe
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Missing authorization header");
            }

            String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            return webClient
                    .post()
                    .uri("https://auth-service-ivhs.onrender.com/api/auth/validate")
                    .header(HttpHeaders.AUTHORIZATION, authHeader)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .flatMap(isValid -> {
                        if (isValid) {
                            String userId = jwtUtil.extractUserId(authHeader);
                            ServerHttpRequest modifiedRequest = exchange.getRequest()
                                    .mutate()
                                    .header("X-User-ID", userId)
                                    .build();

                            return chain.filter(exchange.mutate().request(modifiedRequest).build());
                        } else {
                            throw new RuntimeException("Invalid token");
                        }
                    })
                    .onErrorResume(ex -> {
                        System.err.println("Auth-service error: " + ex.getMessage());
                        return Mono.error(new RuntimeException("Auth service unavailable"));
                    });
        };
    }

    public static class Config {
    }
}

