package com.ecommerce.backendspring.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Sets the quantity of a product in a customer's cart. A quantity of 0 removes the product.
 */
public record CartUpdateRequest(
        @NotBlank @Email String customerEmail,
        @NotNull Long productId,
        @NotNull @Min(0) @Max(CartUpdateRequest.MAX_QUANTITY) Integer quantity) {

    public static final int MAX_QUANTITY = 5;
}
