/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2022
 */
package de.muenchen.dave.filter;

import com.github.tomakehurst.wiremock.http.HttpHeader;
import com.github.tomakehurst.wiremock.http.HttpHeaders;
import de.muenchen.dave.ApiGatewayApplication;
import de.muenchen.dave.OAuthSecurityMockConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static de.muenchen.dave.TestConstants.SPRING_TEST_PROFILE;

@SpringBootTest(classes = { ApiGatewayApplication.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(SPRING_TEST_PROFILE)
@AutoConfigureWireMock
@Import(OAuthSecurityMockConfiguration.class)
class GlobalAuthenticationErrorFilterTest {

    @Autowired
    private WebTestClient webTestClient;

    @BeforeEach
    void setup() {
        stubFor(
                get(urlEqualTo("/remote"))
                        .willReturn(
                                aResponse()
                                        .withStatus(HttpStatus.UNAUTHORIZED.value())
                                        .withHeaders(
                                                new HttpHeaders(
                                                        new HttpHeader("Content-Type", "application/json"),
                                                        new HttpHeader(
                                                                "WWW-Authenticate",
                                                                "Bearer realm=\"Access to the staging site\", charset=\"UTF-8\""),
                                                        new HttpHeader("Expires", "Wed, 21 Oct 2099 07:28:06 GMT")))
                                        .withBody("{ \"testkey\" : \"testvalue\" }")));
    }

    @Test
    @WithMockUser
    void backendAuthenticationError() {
        webTestClient
                .get()
                .uri("/api/dave-backend-service/remote")
                .exchange()
                .expectStatus()
                .isEqualTo(HttpStatus.UNAUTHORIZED)
                .expectHeader()
                .valueMatches("Content-Type", "application/json")
                .expectHeader()
                .doesNotExist("WWW-Authenticate")
                .expectHeader()
                .valueMatches("Expires", "0")
                .expectBody()
                .jsonPath("$.status")
                .isEqualTo("401")
                .jsonPath("$.error")
                .isEqualTo("Authentication Error");
    }
}
