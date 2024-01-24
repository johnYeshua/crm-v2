package com.snva.crmproject.utility;

import java.util.Base64;

public class TestUser {
    public static String getBase64Credentials() {
        return getBase64Credentials("TEST", "1234");
    }

    public static String getBase64Credentials(String username, String password) {
        String credentials = username + ":" + password;
        return "Basic " + Base64.getEncoder().encodeToString(credentials.getBytes());
    }
}
