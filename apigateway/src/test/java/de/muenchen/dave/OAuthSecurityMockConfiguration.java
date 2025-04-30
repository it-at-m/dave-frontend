package de.muenchen.dave;

import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.registration.ReactiveClientRegistrationRepository;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;

@TestConfiguration
public class OAuthSecurityMockConfiguration {

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        return Mockito.mock(ReactiveJwtDecoder.class);
    }

    @Bean
    public ReactiveClientRegistrationRepository clientRegistrationRepository() {
        return Mockito.mock(ReactiveClientRegistrationRepository.class);
    }
}
