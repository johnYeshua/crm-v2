package com.snva.crmproject.controller;

import com.snva.crmproject.entity.userDetails.User;
import com.snva.crmproject.service.AuthServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/*
TODO Temporary copy of AuthenticationController which serves only one purpose - user login
 */

@CrossOrigin(origins = "${fontEnd.origins}")
@RequestMapping("api/v1/authentication")
@RestController
public class AuthenticationBController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationBController.class);

    @Autowired
    private AuthServiceImpl authenticationService;

    @RequestMapping
    public User login(Principal user) {
        LOGGER.info("in login method");
        return authenticationService.getUserDetailsbyUserName(user.getName());
    }

}
