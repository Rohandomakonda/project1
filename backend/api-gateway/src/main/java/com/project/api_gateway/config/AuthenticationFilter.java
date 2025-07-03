package com.project.api_gateway.config;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
    private final WebClient.Builder webClientBuilder;
    private final JwtUtil jwtUtil;

    public AuthenticationFilter(WebClient.Builder webClientBuilder, JwtUtil jwtUtil) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                throw new RuntimeException("Missing authorization header");
            }

            String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

            return webClientBuilder.build()
                    .post()
                    .uri("https://auth-service-ivhs.onrender.com/api/auth/validate")
                    .header(HttpHeaders.AUTHORIZATION, authHeader)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .flatMap(isValid -> {
                        if (isValid) {
                            // Extract userId and add it to headers
                            String userId = jwtUtil.extractUserId(authHeader);
                            ServerHttpRequest modifiedRequest = exchange.getRequest()
                                    .mutate()
                                    .header("X-User-ID", userId) //returning email
                                    .build();

                            return chain.filter(exchange.mutate().request(modifiedRequest).build());
                        } else {
                            throw new RuntimeException("Invalid token");
                        }
                    });
        };
    }

    public static class Config {
    }
}
