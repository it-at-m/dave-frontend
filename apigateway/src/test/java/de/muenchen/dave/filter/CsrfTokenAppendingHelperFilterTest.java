/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2022
 */
package de.muenchen.dave.filter;

import static de.muenchen.dave.TestConstants.SPRING_TEST_PROFILE;

import de.muenchen.dave.ApiGatewayApplication;
import de.muenchen.dave.OAuthSecurityMockConfiguration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(classes = { ApiGatewayApplication.class }, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles(SPRING_TEST_PROFILE)
@Import(OAuthSecurityMockConfiguration.class)
class CsrfTokenAppendingHelperFilterTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    @WithMockUser
    void csrfCookieAppendition() {
        webTestClient
                .get()
                .uri("/")
                .exchange()
                .expectHeader()
                .valueMatches("set-cookie", "XSRF-TOKEN=[a-f\\d]{8}(-[a-f\\d]{4}){3}-[a-f\\d]{12}?;\\sPath=/");
    }
}
