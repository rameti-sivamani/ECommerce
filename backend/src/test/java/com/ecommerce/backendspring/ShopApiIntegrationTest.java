package com.ecommerce.backendspring;

import com.ecommerce.backendspring.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(properties = "app.seed-demo-data=true")
class ShopApiIntegrationTest {

    private static final String EMAIL = "asha@example.com";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private CustomerRepository customerRepository;

    private void register(String email) throws Exception {
        mvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"first_name":"Asha","last_name":"Rao","email":"%s","password":"secret123"}
                                """.formatted(email)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value(email.toLowerCase()))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void registerHashesPasswordAndLoginChecksIt() throws Exception {
        register("Login@Example.com");

        String stored = customerRepository.findByEmail("login@example.com").orElseThrow().getPassword();
        assertThat(stored).isNotEqualTo("secret123").startsWith("$2");

        mvc.perform(post("/api/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"login@example.com\",\"password\":\"secret123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        mvc.perform(post("/api/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"login@example.com\",\"password\":\"wrong-password\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));

        mvc.perform(get("/api/customer/profile").param("email", "login@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.first_name").value("Asha"))
                .andExpect(jsonPath("$.password").doesNotExist());
    }

    @Test
    void duplicateEmailIsRejected() throws Exception {
        register("dup@example.com");

        mvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"dup@example.com\",\"password\":\"secret123\"}"))
                .andExpect(status().isConflict());
    }

    @Test
    void productsAreListedWithAllFields() throws Exception {
        mvc.perform(get("/api/products/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(12)))
                .andExpect(jsonPath("$[0].productId").isNumber())
                .andExpect(jsonPath("$[0].name").isString())
                .andExpect(jsonPath("$[0].imageUrls[0]").value(startsWith("/products/")));

        mvc.perform(get("/api/products/category/{name}", "MENS WEAR"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)))
                .andExpect(jsonPath("$[*].categoryName", everyItem(is("mens wear"))));
    }

    @Test
    void cartAddUpdateAndRemove() throws Exception {
        register(EMAIL);

        mvc.perform(post("/api/cart/add").param("customerEmail", EMAIL).param("productId", "1")
                        .param("quantity", "2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(1))
                .andExpect(jsonPath("$.quantity").value(2));

        // Adding the same product again increases the quantity
        mvc.perform(post("/api/cart/add").param("customerEmail", EMAIL).param("productId", "1"))
                .andExpect(jsonPath("$.quantity").value(3));

        mvc.perform(put("/api/cart/update").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"customerEmail\":\"%s\",\"productId\":1,\"quantity\":5}".formatted(EMAIL)))
                .andExpect(status().isNoContent());

        mvc.perform(get("/api/cart/products/{email}", EMAIL))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].quantity").value(5));

        // Quantity above the limit is rejected
        mvc.perform(put("/api/cart/update").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"customerEmail\":\"%s\",\"productId\":1,\"quantity\":9}".formatted(EMAIL)))
                .andExpect(status().isBadRequest());

        // Quantity 0 removes the product
        mvc.perform(put("/api/cart/update").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"customerEmail\":\"%s\",\"productId\":1,\"quantity\":0}".formatted(EMAIL)))
                .andExpect(status().isNoContent());

        mvc.perform(get("/api/cart/products/{email}", EMAIL))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void unknownProductReturnsNotFound() throws Exception {
        register("nf@example.com");

        mvc.perform(post("/api/cart/add").param("customerEmail", "nf@example.com").param("productId", "999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value(containsString("999")));
    }
}
